import asyncio
from typing import AsyncGenerator, Optional

from loguru import logger

import lnbits.wallets.breez_sdk_files.breez_sdk as breez_sdk
from lnbits import bolt11 as lnbits_bolt11
from lnbits.settings import settings

from .base import (
    InvoiceResponse,
    PaymentResponse,
    PaymentStatus,
    StatusResponse,
    Unsupported,
    Wallet,
)

breez_event_queue: asyncio.Queue = asyncio.Queue()


class SDKListener(breez_sdk.EventListener):
    def on_event(self, event):
        logger.debug(event)
        breez_event_queue.put_nowait(event)


class BreezSdkWallet(Wallet):
    def __init__(self):
        assert settings.breez_greenlight_seed, "missing Greenlight seed"
        self.breez_greenlight_seed = breez_sdk.mnemonic_to_seed(
            settings.breez_greenlight_seed
        )
        assert settings.breez_api_key, "missing Breez api key"
        self.breez_api_key = settings.breez_api_key
        assert settings.breez_greenlight_invite_code, "missing Greenlight invite code"
        self.breez_greenlight_invite_code = settings.breez_greenlight_invite_code

        self.config = breez_sdk.default_config(
            breez_sdk.EnvironmentType.PRODUCTION,
            self.breez_api_key,
            breez_sdk.NodeConfig.GREENLIGHT(
                config=breez_sdk.GreenlightNodeConfig(
                    partner_credentials=None,
                    invite_code=self.breez_greenlight_invite_code,
                )
            ),
        )
        self.sdk_services = breez_sdk.connect(
            self.config, self.breez_greenlight_seed, SDKListener()
        )

    async def cleanup(self):
        self.sdk_services.disconnect()

    async def status(self) -> StatusResponse:
        try:
            node_info: breez_sdk.NodeState = self.sdk_services.node_info()
        except Exception as exc:
            return StatusResponse(f"Failed to connect to breez, got: '{exc}...'", 0)

        return StatusResponse(None, int(node_info.max_payable_msat))

    async def create_invoice(
        self,
        amount: int,
        memo: Optional[str] = None,
        description_hash: Optional[bytes] = None,
        unhashed_description: Optional[bytes] = None,
        **kwargs,
    ) -> InvoiceResponse:
        # if description_hash or unhashed_description:
        #     raise Unsupported("description_hash and unhashed_description")

        breez_invoice: breez_sdk.ReceivePaymentResponse = (
            self.sdk_services.receive_payment(
                breez_sdk.ReceivePaymentRequest(
                    amount,
                    memo,
                    preimage=kwargs.get("preimage"),
                    opening_fee_params=None,
                )
            )
        )

        return InvoiceResponse(
            True,
            breez_invoice.ln_invoice.payment_hash,
            breez_invoice.ln_invoice.bolt11,
            None,
        )

    async def pay_invoice(self, bolt11: str, fee_limit_msat: int) -> PaymentResponse:
        try:
            payment: breez_sdk.Payment = self.sdk_services.send_payment(
                bolt11,
                None,
            )
        except Exception as exc:
            logger.info(exc)
            # assume that payment failed?
            return PaymentResponse(False, None, None, None, f"payment failed: {exc}")

        assert not payment.pending, "payment is pending"
        # let's use the payment_hash as the checking_id
        invoice = lnbits_bolt11.decode(bolt11)
        checking_id = invoice.payment_hash

        return PaymentResponse(
            True,
            checking_id,
            payment.fee_msat,
            payment.details.data.payment_preimage,
            None,
        )

    async def get_invoice_status(self, checking_id: str) -> PaymentStatus:
        invoice = self.sdk_services.payment_by_hash(checking_id)
        if invoice is None:
            return PaymentStatus(None)
        assert invoice.payment_type == breez_sdk.PaymentType.RECEIVED
        return PaymentStatus(True)

    async def get_payment_status(self, checking_id: str) -> PaymentStatus:
        invoice = self.sdk_services.payment_by_hash(checking_id)
        if invoice is None:
            return PaymentStatus(None)
        assert invoice.payment_type == breez_sdk.PaymentType.SENT
        if invoice.pending is False:
            return PaymentStatus(
                True, invoice.fee_msat, invoice.details.data.payment_preimage
            )
        else:
            return PaymentStatus(None)

    async def paid_invoices_stream(self) -> AsyncGenerator[str, None]:
        while True:
            event = await breez_event_queue.get()
            if event.is_invoice_paid():
                yield event.details.payment_hash
