import { defineComponent as xt, ref as Ie, onMounted as mo, onUnmounted as vo, computed as Et, watch as Ot, toRefs as yo, openBlock as Rt, createElementBlock as Ft, createElementVNode as rt, normalizeStyle as go, withDirectives as wo, vShow as bo, renderSlot as Or, withModifiers as nt } from "vue";
var Dr = (r, i, o) => {
  if (!i.has(r))
    throw TypeError("Cannot " + o);
}, wr = (r, i, o) => (Dr(r, i, "read from private field"), o ? o.call(r) : i.get(r)), Co = (r, i, o) => {
  if (i.has(r))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(r) : i.set(r, o);
}, _o = (r, i, o, u) => (Dr(r, i, "write to private field"), u ? u.call(r, o) : i.set(r, o), o);
const br = [
  "aztec",
  "code_128",
  "code_39",
  "code_93",
  "codabar",
  "data_matrix",
  "ean_13",
  "ean_8",
  "itf",
  "pdf417",
  "qr_code",
  "upc_a",
  "upc_e",
  "unknown"
];
function $o(r) {
  if (Mr(r))
    return {
      width: r.naturalWidth,
      height: r.naturalHeight
    };
  if (Ar(r))
    return {
      width: r.width.baseVal.value,
      height: r.height.baseVal.value
    };
  if (xr(r))
    return {
      width: r.videoWidth,
      height: r.videoHeight
    };
  if (Fr(r))
    return {
      width: r.width,
      height: r.height
    };
  if (Ir(r))
    return {
      width: r.displayWidth,
      height: r.displayHeight
    };
  if (Rr(r))
    return {
      width: r.width,
      height: r.height
    };
  if (kr(r))
    return {
      width: r.width,
      height: r.height
    };
  throw new TypeError(
    "The provided value is not of type '(Blob or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or ImageData or OffscreenCanvas or SVGImageElement or VideoFrame)'."
  );
}
function Mr(r) {
  try {
    return r instanceof HTMLImageElement;
  } catch (i) {
    return !1;
  }
}
function Ar(r) {
  try {
    return r instanceof SVGImageElement;
  } catch (i) {
    return !1;
  }
}
function xr(r) {
  try {
    return r instanceof HTMLVideoElement;
  } catch (i) {
    return !1;
  }
}
function Rr(r) {
  try {
    return r instanceof HTMLCanvasElement;
  } catch (i) {
    return !1;
  }
}
function Fr(r) {
  try {
    return r instanceof ImageBitmap;
  } catch (i) {
    return !1;
  }
}
function kr(r) {
  try {
    return r instanceof OffscreenCanvas;
  } catch (i) {
    return !1;
  }
}
function Ir(r) {
  try {
    return r instanceof VideoFrame;
  } catch (i) {
    return !1;
  }
}
function jr(r) {
  try {
    return r instanceof Blob;
  } catch (i) {
    return !1;
  }
}
function So(r) {
  try {
    return r instanceof ImageData;
  } catch (i) {
    return !1;
  }
}
function Po(r, i) {
  try {
    const o = new OffscreenCanvas(r, i);
    if (o.getContext("2d") instanceof OffscreenCanvasRenderingContext2D)
      return o;
    throw void 0;
  } catch (o) {
    const u = document.createElement("canvas");
    return u.width = r, u.height = i, u;
  }
}
async function Ur(r) {
  if (Mr(r) && !await Do(r))
    throw new DOMException(
      "Failed to load or decode HTMLImageElement.",
      "InvalidStateError"
    );
  if (Ar(r) && !await Mo(r))
    throw new DOMException(
      "Failed to load or decode SVGImageElement.",
      "InvalidStateError"
    );
  if (Ir(r) && Ao(r))
    throw new DOMException("VideoFrame is closed.", "InvalidStateError");
  if (xr(r) && (r.readyState === 0 || r.readyState === 1))
    throw new DOMException("Invalid element or state.", "InvalidStateError");
  if (Fr(r) && Ro(r))
    throw new DOMException(
      "The image source is detached.",
      "InvalidStateError"
    );
  const { width: i, height: o } = $o(r);
  if (i === 0 || o === 0)
    return null;
  const u = Po(i, o).getContext("2d");
  u.drawImage(r, 0, 0);
  try {
    return u.getImageData(0, 0, i, o);
  } catch (f) {
    throw new DOMException("Source would taint origin.", "SecurityError");
  }
}
async function To(r) {
  let i;
  try {
    if (createImageBitmap)
      i = await createImageBitmap(r);
    else if (Image) {
      i = new Image();
      let o = "";
      try {
        o = URL.createObjectURL(r), i.src = o, await i.decode();
      } finally {
        URL.revokeObjectURL(o);
      }
    } else
      return r;
  } catch (o) {
    throw new DOMException(
      "Failed to load or decode Blob.",
      "InvalidStateError"
    );
  }
  return await Ur(i);
}
function Eo(r) {
  const { width: i, height: o } = r;
  if (i === 0 || o === 0)
    return null;
  const u = r.getContext("2d");
  try {
    return u.getImageData(0, 0, i, o);
  } catch (f) {
    throw new DOMException("Source would taint origin.", "SecurityError");
  }
}
async function Oo(r) {
  if (jr(r))
    return await To(r);
  if (So(r)) {
    if (xo(r))
      throw new DOMException(
        "The image data has been detached.",
        "InvalidStateError"
      );
    return r;
  }
  return Rr(r) || kr(r) ? Eo(r) : await Ur(r);
}
async function Do(r) {
  try {
    return await r.decode(), !0;
  } catch (i) {
    return !1;
  }
}
async function Mo(r) {
  var i;
  try {
    return await ((i = r.decode) == null ? void 0 : i.call(r)), !0;
  } catch (o) {
    return !1;
  }
}
function Ao(r) {
  return r.format === null;
}
function xo(r) {
  return r.data.buffer.byteLength === 0;
}
function Ro(r) {
  return r.width === 0 && r.height === 0;
}
function Cr(r, i) {
  return r instanceof DOMException ? new DOMException(`${i}: ${r.message}`, r.name) : r instanceof Error ? new r.constructor(`${i}: ${r.message}`) : new Error(`${i}: ${r}`);
}
const _r = (r) => {
  let i;
  const o = /* @__PURE__ */ new Set(), u = (m, w) => {
    const b = typeof m == "function" ? m(i) : m;
    if (!Object.is(b, i)) {
      const v = i;
      i = (w != null ? w : typeof b != "object") ? b : Object.assign({}, i, b), o.forEach((_) => _(i, v));
    }
  }, f = () => i, p = { setState: u, getState: f, subscribe: (m) => (o.add(m), () => o.delete(m)), destroy: () => {
    o.clear();
  } };
  return i = r(u, f, p), p;
}, Fo = (r) => r ? _r(r) : _r, ko = {
  locateFile: (r, i) => {
    var o;
    const u = (o = r.match(/_(.+?)\.wasm$/)) == null ? void 0 : o[1];
    return u ? `https://fastly.jsdelivr.net/npm/@sec-ant/zxing-wasm@2.1.5/dist/${u}/${r}` : i + r;
  }
}, we = Fo()(() => ({
  zxingModuleWeakMap: /* @__PURE__ */ new WeakMap(),
  zxingModuleOverrides: ko
}));
function Fi(r) {
  we.setState({
    zxingModuleOverrides: r
  });
}
function kt(r, i = we.getState().zxingModuleOverrides) {
  const { zxingModuleWeakMap: o } = we.getState(), u = o.get(
    r
  );
  if (u && Object.is(i, we.getState().zxingModuleOverrides))
    return u;
  {
    we.setState({
      zxingModuleOverrides: i
    });
    const f = r(i);
    return o.set(r, f), f;
  }
}
const $r = [
  "Aztec",
  "Codabar",
  "Code128",
  "Code39",
  "Code93",
  "DataBar",
  "DataBarExpanded",
  "DataMatrix",
  "EAN-13",
  "EAN-8",
  "ITF",
  "Linear-Codes",
  "Matrix-Codes",
  "MaxiCode",
  "MicroQRCode",
  "None",
  "PDF417",
  "QRCode",
  "UPC-A",
  "UPC-E"
], Z = {
  tryHarder: !0,
  formats: [],
  maxSymbols: 255
};
async function Io(r, {
  tryHarder: i = Z.tryHarder,
  formats: o = Z.formats,
  maxSymbols: u = Z.maxSymbols
} = Z, f) {
  const p = await kt(
    f,
    we.getState().zxingModuleOverrides
  ), { size: m } = r, w = new Uint8Array(await r.arrayBuffer()), b = p._malloc(m);
  p.HEAP8.set(w, b);
  const v = p.readBarcodesFromImage(
    b,
    m,
    i,
    Hr(o),
    u
  );
  p._free(b);
  const _ = [];
  for (let S = 0; S < v.size(); ++S) {
    const $ = v.get(S);
    _.push({
      ...$,
      format: Lr($.format)
    });
  }
  return _;
}
async function jo(r, {
  tryHarder: i = Z.tryHarder,
  formats: o = Z.formats,
  maxSymbols: u = Z.maxSymbols
} = Z, f) {
  const p = await kt(
    f,
    we.getState().zxingModuleOverrides
  ), {
    data: m,
    width: w,
    height: b,
    data: { byteLength: v }
  } = r, _ = p._malloc(v);
  p.HEAP8.set(m, _);
  const S = p.readBarcodesFromPixmap(
    _,
    w,
    b,
    i,
    Hr(o),
    u
  );
  p._free(_);
  const $ = [];
  for (let H = 0; H < S.size(); ++H) {
    const j = S.get(H);
    $.push({
      ...j,
      format: Lr(j.format)
    });
  }
  return $;
}
function Hr(r) {
  return r.join("|");
}
function Lr(r) {
  const i = Sr(r);
  let o = 0, u = $r.length - 1;
  for (; o <= u; ) {
    const f = Math.floor((o + u) / 2), p = $r[f], m = Sr(p);
    if (m === i)
      return p;
    m < i ? o = f + 1 : u = f - 1;
  }
  return "None";
}
function Sr(r) {
  return r.toLowerCase().replace(/_-\[\]/g, "");
}
var It = (() => {
  var r = import.meta.url;
  return function(i = {}) {
    var o = i, u, f;
    o.ready = new Promise((e, t) => {
      u = e, f = t;
    });
    var p = Object.assign({}, o), m = "./this.program", w = typeof window == "object", b = typeof importScripts == "function";
    typeof process == "object" && typeof process.versions == "object" && process.versions.node;
    var v = "";
    function _(e) {
      return o.locateFile ? o.locateFile(e, v) : v + e;
    }
    var S;
    (w || b) && (b ? v = self.location.href : typeof document < "u" && document.currentScript && (v = document.currentScript.src), r && (v = r), v.indexOf("blob:") !== 0 ? v = v.substr(0, v.replace(/[?#].*/, "").lastIndexOf("/") + 1) : v = "", b && (S = (e) => {
      var t = new XMLHttpRequest();
      return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
    })), o.print || console.log.bind(console);
    var $ = o.printErr || console.error.bind(console);
    Object.assign(o, p), p = null, o.arguments && o.arguments, o.thisProgram && (m = o.thisProgram), o.quit && o.quit;
    var H;
    o.wasmBinary && (H = o.wasmBinary), o.noExitRuntime, typeof WebAssembly != "object" && _e("no native wasm support detected");
    var j, L = !1, U, E, k, N, B, I, be, Ce;
    function Te() {
      var e = j.buffer;
      o.HEAP8 = U = new Int8Array(e), o.HEAP16 = k = new Int16Array(e), o.HEAPU8 = E = new Uint8Array(e), o.HEAPU16 = N = new Uint16Array(e), o.HEAP32 = B = new Int32Array(e), o.HEAPU32 = I = new Uint32Array(e), o.HEAPF32 = be = new Float32Array(e), o.HEAPF64 = Ce = new Float64Array(e);
    }
    var Ee = [], Oe = [], Ue = [];
    function ct() {
      if (o.preRun)
        for (typeof o.preRun == "function" && (o.preRun = [o.preRun]); o.preRun.length; )
          De(o.preRun.shift());
      pt(Ee);
    }
    function ut() {
      pt(Oe);
    }
    function lt() {
      if (o.postRun)
        for (typeof o.postRun == "function" && (o.postRun = [o.postRun]); o.postRun.length; )
          dt(o.postRun.shift());
      pt(Ue);
    }
    function De(e) {
      Ee.unshift(e);
    }
    function He(e) {
      Oe.unshift(e);
    }
    function dt(e) {
      Ue.unshift(e);
    }
    var ae = 0, X = null;
    function re(e) {
      ae++, o.monitorRunDependencies && o.monitorRunDependencies(ae);
    }
    function ft(e) {
      if (ae--, o.monitorRunDependencies && o.monitorRunDependencies(ae), ae == 0 && X) {
        var t = X;
        X = null, t();
      }
    }
    function _e(e) {
      o.onAbort && o.onAbort(e), e = "Aborted(" + e + ")", $(e), L = !0, e += ". Build with -sASSERTIONS for more info.";
      var t = new WebAssembly.RuntimeError(e);
      throw f(t), t;
    }
    var ht = "data:application/octet-stream;base64,";
    function Le(e) {
      return e.startsWith(ht);
    }
    var oe;
    o.locateFile ? (oe = "zxing_reader.wasm", Le(oe) || (oe = _(oe))) : oe = new URL("/reader/zxing_reader.wasm", self.location).href;
    function We(e) {
      if (e == oe && H)
        return new Uint8Array(H);
      if (S)
        return S(e);
      throw "both async and sync fetching of the wasm failed";
    }
    function en(e) {
      return !H && (w || b) && typeof fetch == "function" ? fetch(e, { credentials: "same-origin" }).then((t) => {
        if (!t.ok)
          throw "failed to load wasm binary file at '" + e + "'";
        return t.arrayBuffer();
      }).catch(() => We(e)) : Promise.resolve().then(() => We(e));
    }
    function jt(e, t, n) {
      return en(e).then((a) => WebAssembly.instantiate(a, t)).then((a) => a).then(n, (a) => {
        $(`failed to asynchronously prepare wasm: ${a}`), _e(a);
      });
    }
    function tn(e, t, n, a) {
      return !e && typeof WebAssembly.instantiateStreaming == "function" && !Le(t) && typeof fetch == "function" ? fetch(t, { credentials: "same-origin" }).then((s) => {
        var c = WebAssembly.instantiateStreaming(s, n);
        return c.then(a, function(l) {
          return $(`wasm streaming compile failed: ${l}`), $("falling back to ArrayBuffer instantiation"), jt(t, n, a);
        });
      }) : jt(t, n, a);
    }
    function rn() {
      var e = { a: ka };
      function t(a, s) {
        return z = a.exports, j = z.qa, Te(), Zt = z.ua, He(z.ra), ft(), z;
      }
      re();
      function n(a) {
        t(a.instance);
      }
      if (o.instantiateWasm)
        try {
          return o.instantiateWasm(e, t);
        } catch (a) {
          $(`Module.instantiateWasm callback failed with error: ${a}`), f(a);
        }
      return tn(H, oe, e, n).catch(f), {};
    }
    var pt = (e) => {
      for (; e.length > 0; )
        e.shift()(o);
    }, Ve = [], ze = 0, nn = (e) => {
      var t = new Be(e);
      return t.get_caught() || (t.set_caught(!0), ze--), t.set_rethrown(!1), Ve.push(t), hr(t.excPtr), t.get_exception_ptr();
    }, ie = 0, an = () => {
      D(0, 0);
      var e = Ve.pop();
      fr(e.excPtr), ie = 0;
    };
    function Be(e) {
      this.excPtr = e, this.ptr = e - 24, this.set_type = function(t) {
        I[this.ptr + 4 >> 2] = t;
      }, this.get_type = function() {
        return I[this.ptr + 4 >> 2];
      }, this.set_destructor = function(t) {
        I[this.ptr + 8 >> 2] = t;
      }, this.get_destructor = function() {
        return I[this.ptr + 8 >> 2];
      }, this.set_caught = function(t) {
        t = t ? 1 : 0, U[this.ptr + 12 >> 0] = t;
      }, this.get_caught = function() {
        return U[this.ptr + 12 >> 0] != 0;
      }, this.set_rethrown = function(t) {
        t = t ? 1 : 0, U[this.ptr + 13 >> 0] = t;
      }, this.get_rethrown = function() {
        return U[this.ptr + 13 >> 0] != 0;
      }, this.init = function(t, n) {
        this.set_adjusted_ptr(0), this.set_type(t), this.set_destructor(n);
      }, this.set_adjusted_ptr = function(t) {
        I[this.ptr + 16 >> 2] = t;
      }, this.get_adjusted_ptr = function() {
        return I[this.ptr + 16 >> 2];
      }, this.get_exception_ptr = function() {
        var t = mr(this.get_type());
        if (t)
          return I[this.excPtr >> 2];
        var n = this.get_adjusted_ptr();
        return n !== 0 ? n : this.excPtr;
      };
    }
    var on = (e) => {
      throw ie || (ie = e), ie;
    }, mt = (e) => {
      var t = ie;
      if (!t)
        return ke(0), 0;
      var n = new Be(t);
      n.set_adjusted_ptr(t);
      var a = n.get_type();
      if (!a)
        return ke(0), t;
      for (var s in e) {
        var c = e[s];
        if (c === 0 || c === a)
          break;
        var l = n.ptr + 16;
        if (pr(c, a, l))
          return ke(c), t;
      }
      return ke(a), t;
    }, sn = () => mt([]), cn = (e) => mt([e]), un = (e, t) => mt([e, t]), ln = (e) => {
      var t = new Be(e).get_exception_ptr();
      return t;
    }, dn = () => {
      var e = Ve.pop();
      e || _e("no exception to throw");
      var t = e.excPtr;
      throw e.get_rethrown() || (Ve.push(e), e.set_rethrown(!0), e.set_caught(!1), ze++), ie = t, ie;
    }, fn = (e, t, n) => {
      var a = new Be(e);
      throw a.init(t, n), ie = e, ze++, ie;
    }, hn = () => ze, Ge = {}, Ut = (e) => {
      for (; e.length; ) {
        var t = e.pop(), n = e.pop();
        n(t);
      }
    };
    function vt(e) {
      return this.fromWireType(B[e >> 2]);
    }
    var $e = {}, ve = {}, Ne = {}, Ht, qe = (e) => {
      throw new Ht(e);
    }, ye = (e, t, n) => {
      e.forEach(function(d) {
        Ne[d] = t;
      });
      function a(d) {
        var h = n(d);
        h.length !== e.length && qe("Mismatched type converter count");
        for (var y = 0; y < e.length; ++y)
          se(e[y], h[y]);
      }
      var s = new Array(t.length), c = [], l = 0;
      t.forEach((d, h) => {
        ve.hasOwnProperty(d) ? s[h] = ve[d] : (c.push(d), $e.hasOwnProperty(d) || ($e[d] = []), $e[d].push(() => {
          s[h] = ve[d], ++l, l === c.length && a(s);
        }));
      }), c.length === 0 && a(s);
    }, pn = (e) => {
      var t = Ge[e];
      delete Ge[e];
      var n = t.rawConstructor, a = t.rawDestructor, s = t.fields, c = s.map((l) => l.getterReturnType).concat(s.map((l) => l.setterArgumentType));
      ye([e], c, (l) => {
        var d = {};
        return s.forEach((h, y) => {
          var C = h.fieldName, T = l[y], O = h.getter, x = h.getterContext, W = l[y + s.length], Y = h.setter, V = h.setterContext;
          d[C] = { read: (J) => T.fromWireType(O(x, J)), write: (J, g) => {
            var P = [];
            Y(V, J, W.toWireType(P, g)), Ut(P);
          } };
        }), [{ name: t.name, fromWireType: (h) => {
          var y = {};
          for (var C in d)
            y[C] = d[C].read(h);
          return a(h), y;
        }, toWireType: (h, y) => {
          for (var C in d)
            if (!(C in y))
              throw new TypeError(`Missing field: "${C}"`);
          var T = n();
          for (C in d)
            d[C].write(T, y[C]);
          return h !== null && h.push(a, T), T;
        }, argPackAdvance: ce, readValueFromPointer: vt, destructorFunction: a }];
      });
    }, mn = (e, t, n, a, s) => {
    }, vn = () => {
      for (var e = new Array(256), t = 0; t < 256; ++t)
        e[t] = String.fromCharCode(t);
      Lt = e;
    }, Lt, Q = (e) => {
      for (var t = "", n = e; E[n]; )
        t += Lt[E[n++]];
      return t;
    }, Se, R = (e) => {
      throw new Se(e);
    };
    function yn(e, t, n = {}) {
      var a = t.name;
      if (e || R(`type "${a}" must have a positive integer typeid pointer`), ve.hasOwnProperty(e)) {
        if (n.ignoreDuplicateRegistrations)
          return;
        R(`Cannot register type '${a}' twice`);
      }
      if (ve[e] = t, delete Ne[e], $e.hasOwnProperty(e)) {
        var s = $e[e];
        delete $e[e], s.forEach((c) => c());
      }
    }
    function se(e, t, n = {}) {
      if (!("argPackAdvance" in t))
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
      return yn(e, t, n);
    }
    var ce = 8, gn = (e, t, n, a) => {
      t = Q(t), se(e, { name: t, fromWireType: function(s) {
        return !!s;
      }, toWireType: function(s, c) {
        return c ? n : a;
      }, argPackAdvance: ce, readValueFromPointer: function(s) {
        return this.fromWireType(E[s]);
      }, destructorFunction: null });
    }, wn = (e) => ({ count: e.count, deleteScheduled: e.deleteScheduled, preservePointerOnDelete: e.preservePointerOnDelete, ptr: e.ptr, ptrType: e.ptrType, smartPtr: e.smartPtr, smartPtrType: e.smartPtrType }), yt = (e) => {
      function t(n) {
        return n.$$.ptrType.registeredClass.name;
      }
      R(t(e) + " instance already deleted");
    }, gt = !1, Wt = (e) => {
    }, bn = (e) => {
      e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
    }, Vt = (e) => {
      e.count.value -= 1;
      var t = e.count.value === 0;
      t && bn(e);
    }, zt = (e, t, n) => {
      if (t === n)
        return e;
      if (n.baseClass === void 0)
        return null;
      var a = zt(e, t, n.baseClass);
      return a === null ? null : n.downcast(a);
    }, Bt = {}, Cn = () => Object.keys(xe).length, _n = () => {
      var e = [];
      for (var t in xe)
        xe.hasOwnProperty(t) && e.push(xe[t]);
      return e;
    }, Me = [], wt = () => {
      for (; Me.length; ) {
        var e = Me.pop();
        e.$$.deleteScheduled = !1, e.delete();
      }
    }, Ae, $n = (e) => {
      Ae = e, Me.length && Ae && Ae(wt);
    }, Sn = () => {
      o.getInheritedInstanceCount = Cn, o.getLiveInheritedInstances = _n, o.flushPendingDeletes = wt, o.setDelayFunction = $n;
    }, xe = {}, Pn = (e, t) => {
      for (t === void 0 && R("ptr should not be undefined"); e.baseClass; )
        t = e.upcast(t), e = e.baseClass;
      return t;
    }, Tn = (e, t) => (t = Pn(e, t), xe[t]), Ye = (e, t) => {
      (!t.ptrType || !t.ptr) && qe("makeClassHandle requires ptr and ptrType");
      var n = !!t.smartPtrType, a = !!t.smartPtr;
      return n !== a && qe("Both smartPtrType and smartPtr must be specified"), t.count = { value: 1 }, Re(Object.create(e, { $$: { value: t } }));
    };
    function En(e) {
      var t = this.getPointee(e);
      if (!t)
        return this.destructor(e), null;
      var n = Tn(this.registeredClass, t);
      if (n !== void 0) {
        if (n.$$.count.value === 0)
          return n.$$.ptr = t, n.$$.smartPtr = e, n.clone();
        var a = n.clone();
        return this.destructor(e), a;
      }
      function s() {
        return this.isSmartPointer ? Ye(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: t, smartPtrType: this, smartPtr: e }) : Ye(this.registeredClass.instancePrototype, { ptrType: this, ptr: e });
      }
      var c = this.registeredClass.getActualType(t), l = Bt[c];
      if (!l)
        return s.call(this);
      var d;
      this.isConst ? d = l.constPointerType : d = l.pointerType;
      var h = zt(t, this.registeredClass, d.registeredClass);
      return h === null ? s.call(this) : this.isSmartPointer ? Ye(d.registeredClass.instancePrototype, { ptrType: d, ptr: h, smartPtrType: this, smartPtr: e }) : Ye(d.registeredClass.instancePrototype, { ptrType: d, ptr: h });
    }
    var Re = (e) => typeof FinalizationRegistry > "u" ? (Re = (t) => t, e) : (gt = new FinalizationRegistry((t) => {
      Vt(t.$$);
    }), Re = (t) => {
      var n = t.$$, a = !!n.smartPtr;
      if (a) {
        var s = { $$: n };
        gt.register(t, s, t);
      }
      return t;
    }, Wt = (t) => gt.unregister(t), Re(e)), On = () => {
      Object.assign(Je.prototype, { isAliasOf(e) {
        if (!(this instanceof Je) || !(e instanceof Je))
          return !1;
        var t = this.$$.ptrType.registeredClass, n = this.$$.ptr;
        e.$$ = e.$$;
        for (var a = e.$$.ptrType.registeredClass, s = e.$$.ptr; t.baseClass; )
          n = t.upcast(n), t = t.baseClass;
        for (; a.baseClass; )
          s = a.upcast(s), a = a.baseClass;
        return t === a && n === s;
      }, clone() {
        if (this.$$.ptr || yt(this), this.$$.preservePointerOnDelete)
          return this.$$.count.value += 1, this;
        var e = Re(Object.create(Object.getPrototypeOf(this), { $$: { value: wn(this.$$) } }));
        return e.$$.count.value += 1, e.$$.deleteScheduled = !1, e;
      }, delete() {
        this.$$.ptr || yt(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && R("Object already scheduled for deletion"), Wt(this), Vt(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
      }, isDeleted() {
        return !this.$$.ptr;
      }, deleteLater() {
        return this.$$.ptr || yt(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && R("Object already scheduled for deletion"), Me.push(this), Me.length === 1 && Ae && Ae(wt), this.$$.deleteScheduled = !0, this;
      } });
    };
    function Je() {
    }
    var Dn = 48, Mn = 57, Gt = (e) => {
      if (e === void 0)
        return "_unknown";
      e = e.replace(/[^a-zA-Z0-9_]/g, "$");
      var t = e.charCodeAt(0);
      return t >= Dn && t <= Mn ? `_${e}` : e;
    };
    function Nt(e, t) {
      return e = Gt(e), { [e]: function() {
        return t.apply(this, arguments);
      } }[e];
    }
    var qt = (e, t, n) => {
      if (e[t].overloadTable === void 0) {
        var a = e[t];
        e[t] = function() {
          return e[t].overloadTable.hasOwnProperty(arguments.length) || R(`Function '${n}' called with an invalid number of arguments (${arguments.length}) - expects one of (${e[t].overloadTable})!`), e[t].overloadTable[arguments.length].apply(this, arguments);
        }, e[t].overloadTable = [], e[t].overloadTable[a.argCount] = a;
      }
    }, Yt = (e, t, n) => {
      o.hasOwnProperty(e) ? ((n === void 0 || o[e].overloadTable !== void 0 && o[e].overloadTable[n] !== void 0) && R(`Cannot register public name '${e}' twice`), qt(o, e, e), o.hasOwnProperty(n) && R(`Cannot register multiple overloads of a function with the same number of arguments (${n})!`), o[e].overloadTable[n] = t) : (o[e] = t, n !== void 0 && (o[e].numArguments = n));
    };
    function An(e, t, n, a, s, c, l, d) {
      this.name = e, this.constructor = t, this.instancePrototype = n, this.rawDestructor = a, this.baseClass = s, this.getActualType = c, this.upcast = l, this.downcast = d, this.pureVirtualFunctions = [];
    }
    var bt = (e, t, n) => {
      for (; t !== n; )
        t.upcast || R(`Expected null or instance of ${n.name}, got an instance of ${t.name}`), e = t.upcast(e), t = t.baseClass;
      return e;
    };
    function xn(e, t) {
      if (t === null)
        return this.isReference && R(`null is not a valid ${this.name}`), 0;
      t.$$ || R(`Cannot pass "${$t(t)}" as a ${this.name}`), t.$$.ptr || R(`Cannot pass deleted object as a pointer of type ${this.name}`);
      var n = t.$$.ptrType.registeredClass, a = bt(t.$$.ptr, n, this.registeredClass);
      return a;
    }
    function Rn(e, t) {
      var n;
      if (t === null)
        return this.isReference && R(`null is not a valid ${this.name}`), this.isSmartPointer ? (n = this.rawConstructor(), e !== null && e.push(this.rawDestructor, n), n) : 0;
      t.$$ || R(`Cannot pass "${$t(t)}" as a ${this.name}`), t.$$.ptr || R(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && t.$$.ptrType.isConst && R(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
      var a = t.$$.ptrType.registeredClass;
      if (n = bt(t.$$.ptr, a, this.registeredClass), this.isSmartPointer)
        switch (t.$$.smartPtr === void 0 && R("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
          case 0:
            t.$$.smartPtrType === this ? n = t.$$.smartPtr : R(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
            break;
          case 1:
            n = t.$$.smartPtr;
            break;
          case 2:
            if (t.$$.smartPtrType === this)
              n = t.$$.smartPtr;
            else {
              var s = t.clone();
              n = this.rawShare(n, fe.toHandle(() => s.delete())), e !== null && e.push(this.rawDestructor, n);
            }
            break;
          default:
            R("Unsupporting sharing policy");
        }
      return n;
    }
    function Fn(e, t) {
      if (t === null)
        return this.isReference && R(`null is not a valid ${this.name}`), 0;
      t.$$ || R(`Cannot pass "${$t(t)}" as a ${this.name}`), t.$$.ptr || R(`Cannot pass deleted object as a pointer of type ${this.name}`), t.$$.ptrType.isConst && R(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);
      var n = t.$$.ptrType.registeredClass, a = bt(t.$$.ptr, n, this.registeredClass);
      return a;
    }
    function Jt(e) {
      return this.fromWireType(I[e >> 2]);
    }
    var kn = () => {
      Object.assign(Qe.prototype, { getPointee(e) {
        return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
      }, destructor(e) {
        this.rawDestructor && this.rawDestructor(e);
      }, argPackAdvance: ce, readValueFromPointer: Jt, deleteObject(e) {
        e !== null && e.delete();
      }, fromWireType: En });
    };
    function Qe(e, t, n, a, s, c, l, d, h, y, C) {
      this.name = e, this.registeredClass = t, this.isReference = n, this.isConst = a, this.isSmartPointer = s, this.pointeeType = c, this.sharingPolicy = l, this.rawGetPointee = d, this.rawConstructor = h, this.rawShare = y, this.rawDestructor = C, !s && t.baseClass === void 0 ? a ? (this.toWireType = xn, this.destructorFunction = null) : (this.toWireType = Fn, this.destructorFunction = null) : this.toWireType = Rn;
    }
    var Qt = (e, t, n) => {
      o.hasOwnProperty(e) || qe("Replacing nonexistant public symbol"), o[e].overloadTable !== void 0 && n !== void 0 ? o[e].overloadTable[n] = t : (o[e] = t, o[e].argCount = n);
    }, In = (e, t, n) => {
      var a = o["dynCall_" + e];
      return n && n.length ? a.apply(null, [t].concat(n)) : a.call(null, t);
    }, Ze = [], Zt, F = (e) => {
      var t = Ze[e];
      return t || (e >= Ze.length && (Ze.length = e + 1), Ze[e] = t = Zt.get(e)), t;
    }, jn = (e, t, n) => {
      if (e.includes("j"))
        return In(e, t, n);
      var a = F(t).apply(null, n);
      return a;
    }, Un = (e, t) => {
      var n = [];
      return function() {
        return n.length = 0, Object.assign(n, arguments), jn(e, t, n);
      };
    }, te = (e, t) => {
      e = Q(e);
      function n() {
        return e.includes("j") ? Un(e, t) : F(t);
      }
      var a = n();
      return typeof a != "function" && R(`unknown function pointer with signature ${e}: ${t}`), a;
    }, Hn = (e, t) => {
      var n = Nt(t, function(a) {
        this.name = t, this.message = a;
        var s = new Error(a).stack;
        s !== void 0 && (this.stack = this.toString() + `
` + s.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      return n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype.toString = function() {
        return this.message === void 0 ? this.name : `${this.name}: ${this.message}`;
      }, n;
    }, Kt, Xt = (e) => {
      var t = dr(e), n = Q(t);
      return ue(t), n;
    }, Ke = (e, t) => {
      var n = [], a = {};
      function s(c) {
        if (!a[c] && !ve[c]) {
          if (Ne[c]) {
            Ne[c].forEach(s);
            return;
          }
          n.push(c), a[c] = !0;
        }
      }
      throw t.forEach(s), new Kt(`${e}: ` + n.map(Xt).join([", "]));
    }, Ln = (e, t, n, a, s, c, l, d, h, y, C, T, O) => {
      C = Q(C), c = te(s, c), d && (d = te(l, d)), y && (y = te(h, y)), O = te(T, O);
      var x = Gt(C);
      Yt(x, function() {
        Ke(`Cannot construct ${C} due to unbound types`, [a]);
      }), ye([e, t, n], a ? [a] : [], function(W) {
        W = W[0];
        var Y, V;
        a ? (Y = W.registeredClass, V = Y.instancePrototype) : V = Je.prototype;
        var J = Nt(x, function() {
          if (Object.getPrototypeOf(this) !== g)
            throw new Se("Use 'new' to construct " + C);
          if (P.constructor_body === void 0)
            throw new Se(C + " has no accessible constructor");
          var tt = P.constructor_body[arguments.length];
          if (tt === void 0)
            throw new Se(`Tried to invoke ctor of ${C} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(P.constructor_body).toString()}) parameters instead!`);
          return tt.apply(this, arguments);
        }), g = Object.create(V, { constructor: { value: J } });
        J.prototype = g;
        var P = new An(C, J, g, O, Y, c, d, y);
        P.baseClass && (P.baseClass.__derivedClasses === void 0 && (P.baseClass.__derivedClasses = []), P.baseClass.__derivedClasses.push(P));
        var G = new Qe(C, P, !0, !1, !1), q = new Qe(C + "*", P, !1, !1, !1), ge = new Qe(C + " const*", P, !1, !0, !1);
        return Bt[e] = { pointerType: q, constPointerType: ge }, Qt(x, J), [G, q, ge];
      });
    }, Ct = (e, t) => {
      for (var n = [], a = 0; a < e; a++)
        n.push(I[t + a * 4 >> 2]);
      return n;
    };
    function _t(e, t, n, a, s, c) {
      var l = t.length;
      l < 2 && R("argTypes array size mismatch! Must at least get return value and 'this' types!");
      for (var d = t[1] !== null && n !== null, h = !1, y = 1; y < t.length; ++y)
        if (t[y] !== null && t[y].destructorFunction === void 0) {
          h = !0;
          break;
        }
      var C = t[0].name !== "void", T = l - 2, O = new Array(T), x = [], W = [];
      return function() {
        arguments.length !== T && R(`function ${e} called with ${arguments.length} arguments, expected ${T}`), W.length = 0;
        var Y;
        x.length = d ? 2 : 1, x[0] = s, d && (Y = t[1].toWireType(W, this), x[1] = Y);
        for (var V = 0; V < T; ++V)
          O[V] = t[V + 2].toWireType(W, arguments[V]), x.push(O[V]);
        var J = a.apply(null, x);
        function g(P) {
          if (h)
            Ut(W);
          else
            for (var G = d ? 1 : 2; G < t.length; G++) {
              var q = G === 1 ? Y : O[G - 2];
              t[G].destructorFunction !== null && t[G].destructorFunction(q);
            }
          if (C)
            return t[0].fromWireType(P);
        }
        return g(J);
      };
    }
    var Wn = (e, t, n, a, s, c) => {
      var l = Ct(t, n);
      s = te(a, s), ye([], [e], function(d) {
        d = d[0];
        var h = `constructor ${d.name}`;
        if (d.registeredClass.constructor_body === void 0 && (d.registeredClass.constructor_body = []), d.registeredClass.constructor_body[t - 1] !== void 0)
          throw new Se(`Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${d.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
        return d.registeredClass.constructor_body[t - 1] = () => {
          Ke(`Cannot construct ${d.name} due to unbound types`, l);
        }, ye([], l, (y) => (y.splice(1, 0, null), d.registeredClass.constructor_body[t - 1] = _t(h, y, null, s, c), [])), [];
      });
    }, Vn = (e, t, n, a, s, c, l, d, h) => {
      var y = Ct(n, a);
      t = Q(t), c = te(s, c), ye([], [e], function(C) {
        C = C[0];
        var T = `${C.name}.${t}`;
        t.startsWith("@@") && (t = Symbol[t.substring(2)]), d && C.registeredClass.pureVirtualFunctions.push(t);
        function O() {
          Ke(`Cannot call ${T} due to unbound types`, y);
        }
        var x = C.registeredClass.instancePrototype, W = x[t];
        return W === void 0 || W.overloadTable === void 0 && W.className !== C.name && W.argCount === n - 2 ? (O.argCount = n - 2, O.className = C.name, x[t] = O) : (qt(x, t, T), x[t].overloadTable[n - 2] = O), ye([], y, function(Y) {
          var V = _t(T, Y, C, c, l);
          return x[t].overloadTable === void 0 ? (V.argCount = n - 2, x[t] = V) : x[t].overloadTable[n - 2] = V, [];
        }), [];
      });
    };
    function zn() {
      Object.assign(er.prototype, { get(e) {
        return this.allocated[e];
      }, has(e) {
        return this.allocated[e] !== void 0;
      }, allocate(e) {
        var t = this.freelist.pop() || this.allocated.length;
        return this.allocated[t] = e, t;
      }, free(e) {
        this.allocated[e] = void 0, this.freelist.push(e);
      } });
    }
    function er() {
      this.allocated = [void 0], this.freelist = [];
    }
    var ee = new er(), tr = (e) => {
      e >= ee.reserved && --ee.get(e).refcount === 0 && ee.free(e);
    }, Bn = () => {
      for (var e = 0, t = ee.reserved; t < ee.allocated.length; ++t)
        ee.allocated[t] !== void 0 && ++e;
      return e;
    }, Gn = () => {
      ee.allocated.push({ value: void 0 }, { value: null }, { value: !0 }, { value: !1 }), ee.reserved = ee.allocated.length, o.count_emval_handles = Bn;
    }, fe = { toValue: (e) => (e || R("Cannot use deleted val. handle = " + e), ee.get(e).value), toHandle: (e) => {
      switch (e) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          return ee.allocate({ refcount: 1, value: e });
      }
    } }, Nn = (e, t) => {
      t = Q(t), se(e, { name: t, fromWireType: (n) => {
        var a = fe.toValue(n);
        return tr(n), a;
      }, toWireType: (n, a) => fe.toHandle(a), argPackAdvance: ce, readValueFromPointer: vt, destructorFunction: null });
    }, $t = (e) => {
      if (e === null)
        return "null";
      var t = typeof e;
      return t === "object" || t === "array" || t === "function" ? e.toString() : "" + e;
    }, qn = (e, t) => {
      switch (t) {
        case 4:
          return function(n) {
            return this.fromWireType(be[n >> 2]);
          };
        case 8:
          return function(n) {
            return this.fromWireType(Ce[n >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${t}): ${e}`);
      }
    }, Yn = (e, t, n) => {
      t = Q(t), se(e, { name: t, fromWireType: (a) => a, toWireType: (a, s) => s, argPackAdvance: ce, readValueFromPointer: qn(t, n), destructorFunction: null });
    }, Jn = (e, t, n, a, s, c, l) => {
      var d = Ct(t, n);
      e = Q(e), s = te(a, s), Yt(e, function() {
        Ke(`Cannot call ${e} due to unbound types`, d);
      }, t - 1), ye([], d, function(h) {
        var y = [h[0], null].concat(h.slice(1));
        return Qt(e, _t(e, y, null, s, c), t - 1), [];
      });
    }, Qn = (e, t, n) => {
      switch (t) {
        case 1:
          return n ? (a) => U[a >> 0] : (a) => E[a >> 0];
        case 2:
          return n ? (a) => k[a >> 1] : (a) => N[a >> 1];
        case 4:
          return n ? (a) => B[a >> 2] : (a) => I[a >> 2];
        default:
          throw new TypeError(`invalid integer width (${t}): ${e}`);
      }
    }, Zn = (e, t, n, a, s) => {
      t = Q(t);
      var c = (C) => C;
      if (a === 0) {
        var l = 32 - 8 * n;
        c = (C) => C << l >>> l;
      }
      var d = t.includes("unsigned"), h = (C, T) => {
      }, y;
      d ? y = function(C, T) {
        return h(T, this.name), T >>> 0;
      } : y = function(C, T) {
        return h(T, this.name), T;
      }, se(e, { name: t, fromWireType: c, toWireType: y, argPackAdvance: ce, readValueFromPointer: Qn(t, n, a !== 0), destructorFunction: null });
    }, Kn = (e, t, n) => {
      var a = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], s = a[t];
      function c(l) {
        var d = I[l >> 2], h = I[l + 4 >> 2];
        return new s(U.buffer, h, d);
      }
      n = Q(n), se(e, { name: n, fromWireType: c, argPackAdvance: ce, readValueFromPointer: c }, { ignoreDuplicateRegistrations: !0 });
    }, rr = (e, t, n, a) => {
      if (!(a > 0))
        return 0;
      for (var s = n, c = n + a - 1, l = 0; l < e.length; ++l) {
        var d = e.charCodeAt(l);
        if (d >= 55296 && d <= 57343) {
          var h = e.charCodeAt(++l);
          d = 65536 + ((d & 1023) << 10) | h & 1023;
        }
        if (d <= 127) {
          if (n >= c)
            break;
          t[n++] = d;
        } else if (d <= 2047) {
          if (n + 1 >= c)
            break;
          t[n++] = 192 | d >> 6, t[n++] = 128 | d & 63;
        } else if (d <= 65535) {
          if (n + 2 >= c)
            break;
          t[n++] = 224 | d >> 12, t[n++] = 128 | d >> 6 & 63, t[n++] = 128 | d & 63;
        } else {
          if (n + 3 >= c)
            break;
          t[n++] = 240 | d >> 18, t[n++] = 128 | d >> 12 & 63, t[n++] = 128 | d >> 6 & 63, t[n++] = 128 | d & 63;
        }
      }
      return t[n] = 0, n - s;
    }, Xn = (e, t, n) => rr(e, E, t, n), nr = (e) => {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var a = e.charCodeAt(n);
        a <= 127 ? t++ : a <= 2047 ? t += 2 : a >= 55296 && a <= 57343 ? (t += 4, ++n) : t += 3;
      }
      return t;
    }, ar = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, ea = (e, t, n) => {
      for (var a = t + n, s = t; e[s] && !(s >= a); )
        ++s;
      if (s - t > 16 && e.buffer && ar)
        return ar.decode(e.subarray(t, s));
      for (var c = ""; t < s; ) {
        var l = e[t++];
        if (!(l & 128)) {
          c += String.fromCharCode(l);
          continue;
        }
        var d = e[t++] & 63;
        if ((l & 224) == 192) {
          c += String.fromCharCode((l & 31) << 6 | d);
          continue;
        }
        var h = e[t++] & 63;
        if ((l & 240) == 224 ? l = (l & 15) << 12 | d << 6 | h : l = (l & 7) << 18 | d << 12 | h << 6 | e[t++] & 63, l < 65536)
          c += String.fromCharCode(l);
        else {
          var y = l - 65536;
          c += String.fromCharCode(55296 | y >> 10, 56320 | y & 1023);
        }
      }
      return c;
    }, St = (e, t) => e ? ea(E, e, t) : "", ta = (e, t) => {
      t = Q(t);
      var n = t === "std::string";
      se(e, { name: t, fromWireType(a) {
        var s = I[a >> 2], c = a + 4, l;
        if (n)
          for (var d = c, h = 0; h <= s; ++h) {
            var y = c + h;
            if (h == s || E[y] == 0) {
              var C = y - d, T = St(d, C);
              l === void 0 ? l = T : (l += String.fromCharCode(0), l += T), d = y + 1;
            }
          }
        else {
          for (var O = new Array(s), h = 0; h < s; ++h)
            O[h] = String.fromCharCode(E[c + h]);
          l = O.join("");
        }
        return ue(a), l;
      }, toWireType(a, s) {
        s instanceof ArrayBuffer && (s = new Uint8Array(s));
        var c, l = typeof s == "string";
        l || s instanceof Uint8Array || s instanceof Uint8ClampedArray || s instanceof Int8Array || R("Cannot pass non-string to std::string"), n && l ? c = nr(s) : c = s.length;
        var d = Tt(4 + c + 1), h = d + 4;
        if (I[d >> 2] = c, n && l)
          Xn(s, h, c + 1);
        else if (l)
          for (var y = 0; y < c; ++y) {
            var C = s.charCodeAt(y);
            C > 255 && (ue(h), R("String has UTF-16 code units that do not fit in 8 bits")), E[h + y] = C;
          }
        else
          for (var y = 0; y < c; ++y)
            E[h + y] = s[y];
        return a !== null && a.push(ue, d), d;
      }, argPackAdvance: ce, readValueFromPointer: Jt, destructorFunction(a) {
        ue(a);
      } });
    }, or = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, ra = (e, t) => {
      for (var n = e, a = n >> 1, s = a + t / 2; !(a >= s) && N[a]; )
        ++a;
      if (n = a << 1, n - e > 32 && or)
        return or.decode(E.subarray(e, n));
      for (var c = "", l = 0; !(l >= t / 2); ++l) {
        var d = k[e + l * 2 >> 1];
        if (d == 0)
          break;
        c += String.fromCharCode(d);
      }
      return c;
    }, na = (e, t, n) => {
      if (n === void 0 && (n = 2147483647), n < 2)
        return 0;
      n -= 2;
      for (var a = t, s = n < e.length * 2 ? n / 2 : e.length, c = 0; c < s; ++c) {
        var l = e.charCodeAt(c);
        k[t >> 1] = l, t += 2;
      }
      return k[t >> 1] = 0, t - a;
    }, aa = (e) => e.length * 2, oa = (e, t) => {
      for (var n = 0, a = ""; !(n >= t / 4); ) {
        var s = B[e + n * 4 >> 2];
        if (s == 0)
          break;
        if (++n, s >= 65536) {
          var c = s - 65536;
          a += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
        } else
          a += String.fromCharCode(s);
      }
      return a;
    }, ia = (e, t, n) => {
      if (n === void 0 && (n = 2147483647), n < 4)
        return 0;
      for (var a = t, s = a + n - 4, c = 0; c < e.length; ++c) {
        var l = e.charCodeAt(c);
        if (l >= 55296 && l <= 57343) {
          var d = e.charCodeAt(++c);
          l = 65536 + ((l & 1023) << 10) | d & 1023;
        }
        if (B[t >> 2] = l, t += 4, t + 4 > s)
          break;
      }
      return B[t >> 2] = 0, t - a;
    }, sa = (e) => {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var a = e.charCodeAt(n);
        a >= 55296 && a <= 57343 && ++n, t += 4;
      }
      return t;
    }, ca = (e, t, n) => {
      n = Q(n);
      var a, s, c, l, d;
      t === 2 ? (a = ra, s = na, l = aa, c = () => N, d = 1) : t === 4 && (a = oa, s = ia, l = sa, c = () => I, d = 2), se(e, { name: n, fromWireType: (h) => {
        for (var y = I[h >> 2], C = c(), T, O = h + 4, x = 0; x <= y; ++x) {
          var W = h + 4 + x * t;
          if (x == y || C[W >> d] == 0) {
            var Y = W - O, V = a(O, Y);
            T === void 0 ? T = V : (T += String.fromCharCode(0), T += V), O = W + t;
          }
        }
        return ue(h), T;
      }, toWireType: (h, y) => {
        typeof y != "string" && R(`Cannot pass non-string to C++ string type ${n}`);
        var C = l(y), T = Tt(4 + C + t);
        return I[T >> 2] = C >> d, s(y, T + 4, C + t), h !== null && h.push(ue, T), T;
      }, argPackAdvance: ce, readValueFromPointer: vt, destructorFunction(h) {
        ue(h);
      } });
    }, ua = (e, t, n, a, s, c) => {
      Ge[e] = { name: Q(t), rawConstructor: te(n, a), rawDestructor: te(s, c), fields: [] };
    }, la = (e, t, n, a, s, c, l, d, h, y) => {
      Ge[e].fields.push({ fieldName: Q(t), getterReturnType: n, getter: te(a, s), getterContext: c, setterArgumentType: l, setter: te(d, h), setterContext: y });
    }, da = (e, t) => {
      t = Q(t), se(e, { isVoid: !0, name: t, argPackAdvance: 0, fromWireType: () => {
      }, toWireType: (n, a) => {
      } });
    }, fa = {}, ha = (e) => {
      var t = fa[e];
      return t === void 0 ? Q(e) : t;
    }, ir = () => {
      if (typeof globalThis == "object")
        return globalThis;
      function e(t) {
        t.$$$embind_global$$$ = t;
        var n = typeof $$$embind_global$$$ == "object" && t.$$$embind_global$$$ == t;
        return n || delete t.$$$embind_global$$$, n;
      }
      if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object"))
        return $$$embind_global$$$;
      throw Error("unable to get global object.");
    }, pa = (e) => e === 0 ? fe.toHandle(ir()) : (e = ha(e), fe.toHandle(ir()[e])), ma = (e) => {
      e > 4 && (ee.get(e).refcount += 1);
    }, sr = (e, t) => {
      var n = ve[e];
      return n === void 0 && R(t + " has unknown type " + Xt(e)), n;
    }, va = (e) => {
      var t = new Array(e + 1);
      return function(n, a, s) {
        t[0] = n;
        for (var c = 0; c < e; ++c) {
          var l = sr(I[a + c * 4 >> 2], "parameter " + c);
          t[c + 1] = l.readValueFromPointer(s), s += l.argPackAdvance;
        }
        var d = new (n.bind.apply(n, t))();
        return fe.toHandle(d);
      };
    }, cr = {}, ya = (e, t, n, a) => {
      e = fe.toValue(e);
      var s = cr[t];
      return s || (s = va(t), cr[t] = s), s(e, n, a);
    }, ga = (e, t) => {
      e = sr(e, "_emval_take_value");
      var n = e.readValueFromPointer(t);
      return fe.toHandle(n);
    }, wa = () => {
      _e("");
    }, ba = (e, t, n) => E.copyWithin(e, t, t + n), Ca = () => 2147483648, _a = (e) => {
      var t = j.buffer, n = (e - t.byteLength + 65535) / 65536;
      try {
        return j.grow(n), Te(), 1;
      } catch (a) {
      }
    }, $a = (e) => {
      var t = E.length;
      e >>>= 0;
      var n = Ca();
      if (e > n)
        return !1;
      for (var a = (h, y) => h + (y - h % y) % y, s = 1; s <= 4; s *= 2) {
        var c = t * (1 + 0.2 / s);
        c = Math.min(c, e + 100663296);
        var l = Math.min(n, a(Math.max(e, c), 65536)), d = _a(l);
        if (d)
          return !0;
      }
      return !1;
    }, Pt = {}, Sa = () => m || "./this.program", Fe = () => {
      if (!Fe.strings) {
        var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", t = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: e, _: Sa() };
        for (var n in Pt)
          Pt[n] === void 0 ? delete t[n] : t[n] = Pt[n];
        var a = [];
        for (var n in t)
          a.push(`${n}=${t[n]}`);
        Fe.strings = a;
      }
      return Fe.strings;
    }, Pa = (e, t) => {
      for (var n = 0; n < e.length; ++n)
        U[t++ >> 0] = e.charCodeAt(n);
      U[t >> 0] = 0;
    }, Ta = (e, t) => {
      var n = 0;
      return Fe().forEach((a, s) => {
        var c = t + n;
        I[e + s * 4 >> 2] = c, Pa(a, c), n += a.length + 1;
      }), 0;
    }, Ea = (e, t) => {
      var n = Fe();
      I[e >> 2] = n.length;
      var a = 0;
      return n.forEach((s) => a += s.length + 1), I[t >> 2] = a, 0;
    }, Oa = (e) => e, Xe = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0), Da = (e, t) => {
      for (var n = 0, a = 0; a <= t; n += e[a++])
        ;
      return n;
    }, ur = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], lr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ma = (e, t) => {
      for (var n = new Date(e.getTime()); t > 0; ) {
        var a = Xe(n.getFullYear()), s = n.getMonth(), c = (a ? ur : lr)[s];
        if (t > c - n.getDate())
          t -= c - n.getDate() + 1, n.setDate(1), s < 11 ? n.setMonth(s + 1) : (n.setMonth(0), n.setFullYear(n.getFullYear() + 1));
        else
          return n.setDate(n.getDate() + t), n;
      }
      return n;
    };
    function Aa(e, t, n) {
      var a = n > 0 ? n : nr(e) + 1, s = new Array(a), c = rr(e, s, 0, s.length);
      return t && (s.length = c), s;
    }
    var xa = (e, t) => {
      U.set(e, t);
    }, Ra = (e, t, n, a) => {
      var s = I[a + 40 >> 2], c = { tm_sec: B[a >> 2], tm_min: B[a + 4 >> 2], tm_hour: B[a + 8 >> 2], tm_mday: B[a + 12 >> 2], tm_mon: B[a + 16 >> 2], tm_year: B[a + 20 >> 2], tm_wday: B[a + 24 >> 2], tm_yday: B[a + 28 >> 2], tm_isdst: B[a + 32 >> 2], tm_gmtoff: B[a + 36 >> 2], tm_zone: s ? St(s) : "" }, l = St(n), d = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
      for (var h in d)
        l = l.replace(new RegExp(h, "g"), d[h]);
      var y = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], C = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      function T(g, P, G) {
        for (var q = typeof g == "number" ? g.toString() : g || ""; q.length < P; )
          q = G[0] + q;
        return q;
      }
      function O(g, P) {
        return T(g, P, "0");
      }
      function x(g, P) {
        function G(ge) {
          return ge < 0 ? -1 : ge > 0 ? 1 : 0;
        }
        var q;
        return (q = G(g.getFullYear() - P.getFullYear())) === 0 && (q = G(g.getMonth() - P.getMonth())) === 0 && (q = G(g.getDate() - P.getDate())), q;
      }
      function W(g) {
        switch (g.getDay()) {
          case 0:
            return new Date(g.getFullYear() - 1, 11, 29);
          case 1:
            return g;
          case 2:
            return new Date(g.getFullYear(), 0, 3);
          case 3:
            return new Date(g.getFullYear(), 0, 2);
          case 4:
            return new Date(g.getFullYear(), 0, 1);
          case 5:
            return new Date(g.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(g.getFullYear() - 1, 11, 30);
        }
      }
      function Y(g) {
        var P = Ma(new Date(g.tm_year + 1900, 0, 1), g.tm_yday), G = new Date(P.getFullYear(), 0, 4), q = new Date(P.getFullYear() + 1, 0, 4), ge = W(G), tt = W(q);
        return x(ge, P) <= 0 ? x(tt, P) <= 0 ? P.getFullYear() + 1 : P.getFullYear() : P.getFullYear() - 1;
      }
      var V = { "%a": (g) => y[g.tm_wday].substring(0, 3), "%A": (g) => y[g.tm_wday], "%b": (g) => C[g.tm_mon].substring(0, 3), "%B": (g) => C[g.tm_mon], "%C": (g) => {
        var P = g.tm_year + 1900;
        return O(P / 100 | 0, 2);
      }, "%d": (g) => O(g.tm_mday, 2), "%e": (g) => T(g.tm_mday, 2, " "), "%g": (g) => Y(g).toString().substring(2), "%G": (g) => Y(g), "%H": (g) => O(g.tm_hour, 2), "%I": (g) => {
        var P = g.tm_hour;
        return P == 0 ? P = 12 : P > 12 && (P -= 12), O(P, 2);
      }, "%j": (g) => O(g.tm_mday + Da(Xe(g.tm_year + 1900) ? ur : lr, g.tm_mon - 1), 3), "%m": (g) => O(g.tm_mon + 1, 2), "%M": (g) => O(g.tm_min, 2), "%n": () => `
`, "%p": (g) => g.tm_hour >= 0 && g.tm_hour < 12 ? "AM" : "PM", "%S": (g) => O(g.tm_sec, 2), "%t": () => "	", "%u": (g) => g.tm_wday || 7, "%U": (g) => {
        var P = g.tm_yday + 7 - g.tm_wday;
        return O(Math.floor(P / 7), 2);
      }, "%V": (g) => {
        var P = Math.floor((g.tm_yday + 7 - (g.tm_wday + 6) % 7) / 7);
        if ((g.tm_wday + 371 - g.tm_yday - 2) % 7 <= 2 && P++, P) {
          if (P == 53) {
            var G = (g.tm_wday + 371 - g.tm_yday) % 7;
            G != 4 && (G != 3 || !Xe(g.tm_year)) && (P = 1);
          }
        } else {
          P = 52;
          var q = (g.tm_wday + 7 - g.tm_yday - 1) % 7;
          (q == 4 || q == 5 && Xe(g.tm_year % 400 - 1)) && P++;
        }
        return O(P, 2);
      }, "%w": (g) => g.tm_wday, "%W": (g) => {
        var P = g.tm_yday + 7 - (g.tm_wday + 6) % 7;
        return O(Math.floor(P / 7), 2);
      }, "%y": (g) => (g.tm_year + 1900).toString().substring(2), "%Y": (g) => g.tm_year + 1900, "%z": (g) => {
        var P = g.tm_gmtoff, G = P >= 0;
        return P = Math.abs(P) / 60, P = P / 60 * 100 + P % 60, (G ? "+" : "-") + ("0000" + P).slice(-4);
      }, "%Z": (g) => g.tm_zone, "%%": () => "%" };
      l = l.replace(/%%/g, "\0\0");
      for (var h in V)
        l.includes(h) && (l = l.replace(new RegExp(h, "g"), V[h](c)));
      l = l.replace(/\0\0/g, "%");
      var J = Aa(l, !1);
      return J.length > t ? 0 : (xa(J, e), J.length - 1);
    }, Fa = (e, t, n, a, s) => Ra(e, t, n, a);
    Ht = o.InternalError = class extends Error {
      constructor(e) {
        super(e), this.name = "InternalError";
      }
    }, vn(), Se = o.BindingError = class extends Error {
      constructor(e) {
        super(e), this.name = "BindingError";
      }
    }, On(), Sn(), kn(), Kt = o.UnboundTypeError = Hn(Error, "UnboundTypeError"), zn(), Gn();
    var ka = { q: nn, u: an, a: sn, h: cn, l: un, I: ln, P: dn, n: fn, ba: hn, d: on, oa: pn, Y: mn, fa: gn, na: Ln, ma: Wn, D: Vn, ea: Nn, W: Yn, J: Jn, w: Zn, s: Kn, V: ta, L: ca, Q: ua, pa: la, ga: da, U: tr, la: pa, R: ma, ia: ya, ka: ga, K: wa, da: ba, ca: $a, $: Ta, aa: Ea, H: eo, T: uo, B: ro, p: Za, b: Ia, C: Xa, ha: ao, c: Wa, j: za, i: Ha, x: to, O: Ka, v: Ja, G: io, N: so, A: no, F: lo, Z: ho, X: po, k: Va, f: La, e: Ua, g: ja, M: co, m: Ya, o: Ba, S: Ga, t: qa, ja: Qa, y: oo, r: Na, E: fo, z: Oa, _: Fa }, z = rn(), ue = o._free = (e) => (ue = o._free = z.sa)(e), Tt = o._malloc = (e) => (Tt = o._malloc = z.ta)(e), dr = (e) => (dr = z.va)(e);
    o.__embind_initialize_bindings = () => (o.__embind_initialize_bindings = z.wa)();
    var D = (e, t) => (D = z.xa)(e, t), ke = (e) => (ke = z.ya)(e), M = () => (M = z.za)(), A = (e) => (A = z.Aa)(e), fr = (e) => (fr = z.Ba)(e), hr = (e) => (hr = z.Ca)(e), pr = (e, t, n) => (pr = z.Da)(e, t, n), mr = (e) => (mr = z.Ea)(e);
    o.dynCall_viijii = (e, t, n, a, s, c, l) => (o.dynCall_viijii = z.Fa)(e, t, n, a, s, c, l);
    var vr = o.dynCall_jiii = (e, t, n, a) => (vr = o.dynCall_jiii = z.Ga)(e, t, n, a), yr = o.dynCall_jiiii = (e, t, n, a, s) => (yr = o.dynCall_jiiii = z.Ha)(e, t, n, a, s);
    o.dynCall_iiiiij = (e, t, n, a, s, c, l) => (o.dynCall_iiiiij = z.Ia)(e, t, n, a, s, c, l), o.dynCall_iiiiijj = (e, t, n, a, s, c, l, d, h) => (o.dynCall_iiiiijj = z.Ja)(e, t, n, a, s, c, l, d, h), o.dynCall_iiiiiijj = (e, t, n, a, s, c, l, d, h, y) => (o.dynCall_iiiiiijj = z.Ka)(e, t, n, a, s, c, l, d, h, y);
    function Ia(e, t) {
      var n = M();
      try {
        return F(e)(t);
      } catch (a) {
        if (A(n), a !== a + 0)
          throw a;
        D(1, 0);
      }
    }
    function ja(e, t, n, a) {
      var s = M();
      try {
        F(e)(t, n, a);
      } catch (c) {
        if (A(s), c !== c + 0)
          throw c;
        D(1, 0);
      }
    }
    function Ua(e, t, n) {
      var a = M();
      try {
        F(e)(t, n);
      } catch (s) {
        if (A(a), s !== s + 0)
          throw s;
        D(1, 0);
      }
    }
    function Ha(e, t, n, a, s) {
      var c = M();
      try {
        return F(e)(t, n, a, s);
      } catch (l) {
        if (A(c), l !== l + 0)
          throw l;
        D(1, 0);
      }
    }
    function La(e, t) {
      var n = M();
      try {
        F(e)(t);
      } catch (a) {
        if (A(n), a !== a + 0)
          throw a;
        D(1, 0);
      }
    }
    function Wa(e, t, n) {
      var a = M();
      try {
        return F(e)(t, n);
      } catch (s) {
        if (A(a), s !== s + 0)
          throw s;
        D(1, 0);
      }
    }
    function Va(e) {
      var t = M();
      try {
        F(e)();
      } catch (n) {
        if (A(t), n !== n + 0)
          throw n;
        D(1, 0);
      }
    }
    function za(e, t, n, a) {
      var s = M();
      try {
        return F(e)(t, n, a);
      } catch (c) {
        if (A(s), c !== c + 0)
          throw c;
        D(1, 0);
      }
    }
    function Ba(e, t, n, a, s, c) {
      var l = M();
      try {
        F(e)(t, n, a, s, c);
      } catch (d) {
        if (A(l), d !== d + 0)
          throw d;
        D(1, 0);
      }
    }
    function Ga(e, t, n, a, s, c, l) {
      var d = M();
      try {
        F(e)(t, n, a, s, c, l);
      } catch (h) {
        if (A(d), h !== h + 0)
          throw h;
        D(1, 0);
      }
    }
    function Na(e, t, n, a, s, c, l, d, h, y, C) {
      var T = M();
      try {
        F(e)(t, n, a, s, c, l, d, h, y, C);
      } catch (O) {
        if (A(T), O !== O + 0)
          throw O;
        D(1, 0);
      }
    }
    function qa(e, t, n, a, s, c, l, d) {
      var h = M();
      try {
        F(e)(t, n, a, s, c, l, d);
      } catch (y) {
        if (A(h), y !== y + 0)
          throw y;
        D(1, 0);
      }
    }
    function Ya(e, t, n, a, s) {
      var c = M();
      try {
        F(e)(t, n, a, s);
      } catch (l) {
        if (A(c), l !== l + 0)
          throw l;
        D(1, 0);
      }
    }
    function Ja(e, t, n, a, s, c, l) {
      var d = M();
      try {
        return F(e)(t, n, a, s, c, l);
      } catch (h) {
        if (A(d), h !== h + 0)
          throw h;
        D(1, 0);
      }
    }
    function Qa(e, t, n, a, s, c, l, d, h) {
      var y = M();
      try {
        F(e)(t, n, a, s, c, l, d, h);
      } catch (C) {
        if (A(y), C !== C + 0)
          throw C;
        D(1, 0);
      }
    }
    function Za(e) {
      var t = M();
      try {
        return F(e)();
      } catch (n) {
        if (A(t), n !== n + 0)
          throw n;
        D(1, 0);
      }
    }
    function Ka(e, t, n, a, s, c, l) {
      var d = M();
      try {
        return F(e)(t, n, a, s, c, l);
      } catch (h) {
        if (A(d), h !== h + 0)
          throw h;
        D(1, 0);
      }
    }
    function Xa(e, t, n, a) {
      var s = M();
      try {
        return F(e)(t, n, a);
      } catch (c) {
        if (A(s), c !== c + 0)
          throw c;
        D(1, 0);
      }
    }
    function eo(e, t, n, a) {
      var s = M();
      try {
        return F(e)(t, n, a);
      } catch (c) {
        if (A(s), c !== c + 0)
          throw c;
        D(1, 0);
      }
    }
    function to(e, t, n, a, s, c) {
      var l = M();
      try {
        return F(e)(t, n, a, s, c);
      } catch (d) {
        if (A(l), d !== d + 0)
          throw d;
        D(1, 0);
      }
    }
    function ro(e, t, n, a, s, c) {
      var l = M();
      try {
        return F(e)(t, n, a, s, c);
      } catch (d) {
        if (A(l), d !== d + 0)
          throw d;
        D(1, 0);
      }
    }
    function no(e, t, n, a, s, c, l, d, h, y) {
      var C = M();
      try {
        return F(e)(t, n, a, s, c, l, d, h, y);
      } catch (T) {
        if (A(C), T !== T + 0)
          throw T;
        D(1, 0);
      }
    }
    function ao(e, t, n) {
      var a = M();
      try {
        return F(e)(t, n);
      } catch (s) {
        if (A(a), s !== s + 0)
          throw s;
        D(1, 0);
      }
    }
    function oo(e, t, n, a, s, c, l, d, h, y) {
      var C = M();
      try {
        F(e)(t, n, a, s, c, l, d, h, y);
      } catch (T) {
        if (A(C), T !== T + 0)
          throw T;
        D(1, 0);
      }
    }
    function io(e, t, n, a, s, c, l, d) {
      var h = M();
      try {
        return F(e)(t, n, a, s, c, l, d);
      } catch (y) {
        if (A(h), y !== y + 0)
          throw y;
        D(1, 0);
      }
    }
    function so(e, t, n, a, s, c, l, d, h) {
      var y = M();
      try {
        return F(e)(t, n, a, s, c, l, d, h);
      } catch (C) {
        if (A(y), C !== C + 0)
          throw C;
        D(1, 0);
      }
    }
    function co(e, t, n, a, s, c, l) {
      var d = M();
      try {
        F(e)(t, n, a, s, c, l);
      } catch (h) {
        if (A(d), h !== h + 0)
          throw h;
        D(1, 0);
      }
    }
    function uo(e, t, n, a) {
      var s = M();
      try {
        return F(e)(t, n, a);
      } catch (c) {
        if (A(s), c !== c + 0)
          throw c;
        D(1, 0);
      }
    }
    function lo(e, t, n, a, s, c, l, d, h, y, C, T) {
      var O = M();
      try {
        return F(e)(t, n, a, s, c, l, d, h, y, C, T);
      } catch (x) {
        if (A(O), x !== x + 0)
          throw x;
        D(1, 0);
      }
    }
    function fo(e, t, n, a, s, c, l, d, h, y, C, T, O, x, W, Y) {
      var V = M();
      try {
        F(e)(t, n, a, s, c, l, d, h, y, C, T, O, x, W, Y);
      } catch (J) {
        if (A(V), J !== J + 0)
          throw J;
        D(1, 0);
      }
    }
    function ho(e, t, n, a) {
      var s = M();
      try {
        return vr(e, t, n, a);
      } catch (c) {
        if (A(s), c !== c + 0)
          throw c;
        D(1, 0);
      }
    }
    function po(e, t, n, a, s) {
      var c = M();
      try {
        return yr(e, t, n, a, s);
      } catch (l) {
        if (A(c), l !== l + 0)
          throw l;
        D(1, 0);
      }
    }
    var et;
    X = function e() {
      et || gr(), et || (X = e);
    };
    function gr() {
      if (ae > 0 || (ct(), ae > 0))
        return;
      function e() {
        et || (et = !0, o.calledRun = !0, !L && (ut(), u(o), o.onRuntimeInitialized && o.onRuntimeInitialized(), lt()));
      }
      o.setStatus ? (o.setStatus("Running..."), setTimeout(function() {
        setTimeout(function() {
          o.setStatus("");
        }, 1), e();
      }, 1)) : e();
    }
    if (o.preInit)
      for (typeof o.preInit == "function" && (o.preInit = [o.preInit]); o.preInit.length > 0; )
        o.preInit.pop()();
    return gr(), i.ready;
  };
})();
function Uo(r) {
  return kt(It, r);
}
async function Ho(r, {
  tryHarder: i = Z.tryHarder,
  formats: o = Z.formats,
  maxSymbols: u = Z.maxSymbols
} = Z) {
  return Io(
    r,
    {
      tryHarder: i,
      formats: o,
      maxSymbols: u
    },
    It
  );
}
async function Lo(r, {
  tryHarder: i = Z.tryHarder,
  formats: o = Z.formats,
  maxSymbols: u = Z.maxSymbols
} = Z) {
  return jo(
    r,
    {
      tryHarder: i,
      formats: o,
      maxSymbols: u
    },
    It
  );
}
const Mt = /* @__PURE__ */ new Map([
  ["aztec", "Aztec"],
  ["code_128", "Code128"],
  ["code_39", "Code39"],
  ["code_93", "Code93"],
  ["codabar", "Codabar"],
  ["data_matrix", "DataMatrix"],
  ["ean_13", "EAN-13"],
  ["ean_8", "EAN-8"],
  ["itf", "ITF"],
  ["pdf417", "PDF417"],
  ["qr_code", "QRCode"],
  ["upc_a", "UPC-A"],
  ["upc_e", "UPC-E"]
]);
function Wo(r) {
  for (const [i, o] of Mt)
    if (r === o)
      return i;
  return "unknown";
}
var je;
class st extends EventTarget {
  constructor(i = {}) {
    var o;
    super(), Co(this, je, void 0);
    try {
      const u = (o = i == null ? void 0 : i.formats) == null ? void 0 : o.filter(
        (f) => f !== "unknown"
      );
      if ((u == null ? void 0 : u.length) === 0)
        throw new TypeError("Hint option provided, but is empty.");
      u == null || u.forEach((f) => {
        if (!br.includes(f))
          throw new TypeError(
            `Failed to read the 'formats' property from 'BarcodeDetectorOptions': The provided value '${f}' is not a valid enum value of type BarcodeFormat.`
          );
      }), _o(this, je, u != null ? u : []), Uo().then((f) => {
        this.dispatchEvent(
          new CustomEvent("load", {
            detail: f
          })
        );
      }).catch((f) => {
        this.dispatchEvent(new CustomEvent("error", { detail: f }));
      });
    } catch (u) {
      throw Cr(
        u,
        "Failed to construct 'BarcodeDetector'"
      );
    }
  }
  static async getSupportedFormats() {
    return br.filter((i) => i !== "unknown");
  }
  async detect(i) {
    try {
      const o = await Oo(i);
      if (o === null)
        return [];
      let u;
      try {
        jr(o) ? u = await Ho(o, {
          tryHarder: !0,
          formats: wr(this, je).map(
            (f) => Mt.get(f)
          )
        }) : u = await Lo(o, {
          tryHarder: !0,
          formats: wr(this, je).map(
            (f) => Mt.get(f)
          )
        });
      } catch (f) {
        throw console.error(f), new DOMException(
          "Barcode detection service unavailable.",
          "NotSupportedError"
        );
      }
      return u.map((f) => {
        const {
          topLeft: { x: p, y: m },
          topRight: { x: w, y: b },
          bottomLeft: { x: v, y: _ },
          bottomRight: { x: S, y: $ }
        } = f.position, H = Math.min(p, w, v, S), j = Math.min(m, b, _, $), L = Math.max(p, w, v, S), U = Math.max(m, b, _, $);
        return {
          boundingBox: new DOMRectReadOnly(
            H,
            j,
            L - H,
            U - j
          ),
          rawValue: new TextDecoder().decode(f.bytes),
          format: Wo(f.format),
          cornerPoints: [
            {
              x: p,
              y: m
            },
            {
              x: w,
              y: b
            },
            {
              x: S,
              y: $
            },
            {
              x: v,
              y: _
            }
          ]
        };
      });
    } catch (o) {
      throw Cr(
        o,
        "Failed to execute 'detect' on 'BarcodeDetector'"
      );
    }
  }
}
je = /* @__PURE__ */ new WeakMap();
const Wr = (r, i, o = "error") => {
  let u, f;
  const p = new Promise(
    (m, w) => {
      u = m, f = w, r.addEventListener(i, u), r.addEventListener(o, f);
    }
  );
  return p.finally(() => {
    r.removeEventListener(i, u), r.removeEventListener(o, f);
  }), p;
}, Pr = (r) => new Promise((i) => setTimeout(i, r));
class Vo extends Error {
  constructor() {
    super("can't process cross-origin image"), this.name = "DropImageFetchError";
  }
}
class Vr extends Error {
  constructor() {
    super("this browser has no Stream API support"), this.name = "StreamApiNotSupportedError";
  }
}
class zo extends Error {
  constructor() {
    super(
      "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP."
    ), this.name = "InsecureContextError";
  }
}
class Bo extends Error {
  constructor() {
    super("Loading camera stream timed out after 3 seconds. If you are on iOS in PWA mode, this is a known issue (see https://github.com/gruhn/vue-qrcode-reader/issues/298)"), this.name = "StreamLoadTimeoutError";
  }
}
let At;
const Go = (r) => {
  At = new st({ formats: r });
}, No = async (r, {
  detectHandler: i,
  locateHandler: o,
  minDelay: u,
  formats: f
}) => {
  At = new st({ formats: f });
  const p = (m) => async (w) => {
    if (r.readyState > 1) {
      const { lastScanned: b, contentBefore: v, lastScanHadContent: _ } = m;
      if (w - b < u)
        window.requestAnimationFrame(p(m));
      else {
        const S = await At.detect(r), $ = S.some((L) => !v.includes(L.rawValue));
        $ && i(S);
        const H = S.length > 0;
        H && o(S), !H && _ && o(S);
        const j = {
          lastScanned: w,
          lastScanHadContent: H,
          // It can happen that a QR code is constantly in view of the camera but
          // maybe a scanned frame is a bit blurry and we detect nothing but in the
          // next frame we detect the code again. We also want to avoid emitting
          // a `detect` event in such a case. So we don't reset `contentBefore`,
          // if we detect nothing, only if we detect something new.
          contentBefore: $ ? S.map((L) => L.rawValue) : v
        };
        window.requestAnimationFrame(p(j));
      }
    }
  };
  p({
    lastScanned: performance.now(),
    contentBefore: [],
    lastScanHadContent: !1
  })(performance.now());
}, qo = async (r) => {
  if (r.startsWith("http") && r.includes(location.host) === !1)
    throw new Vo();
  const i = document.createElement("img");
  return i.src = r, await Wr(i, "load"), i;
}, zr = async (r, i = ["qr_code"]) => await new st({
  formats: i
}).detect(r), Yo = async (r, i = ["qr_code"]) => {
  const o = new st({
    formats: i
  }), u = await qo(r);
  return await o.detect(u);
};
var Br = {}, K = {};
Object.defineProperty(K, "__esModule", {
  value: !0
});
K.compactObject = qr;
K.deprecated = ni;
var Jo = K.detectBrowser = ai;
K.disableLog = ei;
K.disableWarnings = ti;
K.extractVersion = at;
K.filterStats = oi;
K.log = ri;
K.walkStats = ot;
K.wrapPeerConnectionEvent = Xo;
function Qo(r, i, o) {
  return i = Zo(i), i in r ? Object.defineProperty(r, i, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : r[i] = o, r;
}
function Zo(r) {
  var i = Ko(r, "string");
  return pe(i) === "symbol" ? i : String(i);
}
function Ko(r, i) {
  if (pe(r) !== "object" || r === null)
    return r;
  var o = r[Symbol.toPrimitive];
  if (o !== void 0) {
    var u = o.call(r, i || "default");
    if (pe(u) !== "object")
      return u;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (i === "string" ? String : Number)(r);
}
function pe(r) {
  "@babel/helpers - typeof";
  return pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, pe(r);
}
var Gr = !0, Nr = !0;
function at(r, i, o) {
  var u = r.match(i);
  return u && u.length >= o && parseInt(u[o], 10);
}
function Xo(r, i, o) {
  if (r.RTCPeerConnection) {
    var u = r.RTCPeerConnection.prototype, f = u.addEventListener;
    u.addEventListener = function(m, w) {
      if (m !== i)
        return f.apply(this, arguments);
      var b = function(_) {
        var S = o(_);
        S && (w.handleEvent ? w.handleEvent(S) : w(S));
      };
      return this._eventMap = this._eventMap || {}, this._eventMap[i] || (this._eventMap[i] = /* @__PURE__ */ new Map()), this._eventMap[i].set(w, b), f.apply(this, [m, b]);
    };
    var p = u.removeEventListener;
    u.removeEventListener = function(m, w) {
      if (m !== i || !this._eventMap || !this._eventMap[i])
        return p.apply(this, arguments);
      if (!this._eventMap[i].has(w))
        return p.apply(this, arguments);
      var b = this._eventMap[i].get(w);
      return this._eventMap[i].delete(w), this._eventMap[i].size === 0 && delete this._eventMap[i], Object.keys(this._eventMap).length === 0 && delete this._eventMap, p.apply(this, [m, b]);
    }, Object.defineProperty(u, "on" + i, {
      get: function() {
        return this["_on" + i];
      },
      set: function(w) {
        this["_on" + i] && (this.removeEventListener(i, this["_on" + i]), delete this["_on" + i]), w && this.addEventListener(i, this["_on" + i] = w);
      },
      enumerable: !0,
      configurable: !0
    });
  }
}
function ei(r) {
  return typeof r != "boolean" ? new Error("Argument type: " + pe(r) + ". Please use a boolean.") : (Gr = r, r ? "adapter.js logging disabled" : "adapter.js logging enabled");
}
function ti(r) {
  return typeof r != "boolean" ? new Error("Argument type: " + pe(r) + ". Please use a boolean.") : (Nr = !r, "adapter.js deprecation warnings " + (r ? "disabled" : "enabled"));
}
function ri() {
  if ((typeof window > "u" ? "undefined" : pe(window)) === "object") {
    if (Gr)
      return;
    typeof console < "u" && typeof console.log == "function" && console.log.apply(console, arguments);
  }
}
function ni(r, i) {
  Nr && console.warn(r + " is deprecated, please use " + i + " instead.");
}
function ai(r) {
  var i = {
    browser: null,
    version: null
  };
  if (typeof r > "u" || !r.navigator || !r.navigator.userAgent)
    return i.browser = "Not a browser.", i;
  var o = r.navigator;
  if (o.mozGetUserMedia)
    i.browser = "firefox", i.version = at(o.userAgent, /Firefox\/(\d+)\./, 1);
  else if (o.webkitGetUserMedia || r.isSecureContext === !1 && r.webkitRTCPeerConnection)
    i.browser = "chrome", i.version = at(o.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  else if (r.RTCPeerConnection && o.userAgent.match(/AppleWebKit\/(\d+)\./))
    i.browser = "safari", i.version = at(o.userAgent, /AppleWebKit\/(\d+)\./, 1), i.supportsUnifiedPlan = r.RTCRtpTransceiver && "currentDirection" in r.RTCRtpTransceiver.prototype;
  else
    return i.browser = "Not a supported browser.", i;
  return i;
}
function Tr(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function qr(r) {
  return Tr(r) ? Object.keys(r).reduce(function(i, o) {
    var u = Tr(r[o]), f = u ? qr(r[o]) : r[o], p = u && !Object.keys(f).length;
    return f === void 0 || p ? i : Object.assign(i, Qo({}, o, f));
  }, {}) : r;
}
function ot(r, i, o) {
  !i || o.has(i.id) || (o.set(i.id, i), Object.keys(i).forEach(function(u) {
    u.endsWith("Id") ? ot(r, r.get(i[u]), o) : u.endsWith("Ids") && i[u].forEach(function(f) {
      ot(r, r.get(f), o);
    });
  }));
}
function oi(r, i, o) {
  var u = o ? "outbound-rtp" : "inbound-rtp", f = /* @__PURE__ */ new Map();
  if (i === null)
    return f;
  var p = [];
  return r.forEach(function(m) {
    m.type === "track" && m.trackIdentifier === i.id && p.push(m);
  }), p.forEach(function(m) {
    r.forEach(function(w) {
      w.type === u && w.trackId === m.id && ot(r, w, f);
    });
  }), f;
}
Object.defineProperty(Br, "__esModule", {
  value: !0
});
var ii = Br.shimGetUserMedia = ui, si = ci(K);
function Yr(r) {
  if (typeof WeakMap != "function")
    return null;
  var i = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return (Yr = function(f) {
    return f ? o : i;
  })(r);
}
function ci(r, i) {
  if (!i && r && r.__esModule)
    return r;
  if (r === null || he(r) !== "object" && typeof r != "function")
    return { default: r };
  var o = Yr(i);
  if (o && o.has(r))
    return o.get(r);
  var u = {}, f = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var p in r)
    if (p !== "default" && Object.prototype.hasOwnProperty.call(r, p)) {
      var m = f ? Object.getOwnPropertyDescriptor(r, p) : null;
      m && (m.get || m.set) ? Object.defineProperty(u, p, m) : u[p] = r[p];
    }
  return u.default = r, o && o.set(r, u), u;
}
function he(r) {
  "@babel/helpers - typeof";
  return he = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, he(r);
}
var Er = si.log;
function ui(r, i) {
  var o = r && r.navigator;
  if (o.mediaDevices) {
    var u = function(v) {
      if (he(v) !== "object" || v.mandatory || v.optional)
        return v;
      var _ = {};
      return Object.keys(v).forEach(function(S) {
        if (!(S === "require" || S === "advanced" || S === "mediaSource")) {
          var $ = he(v[S]) === "object" ? v[S] : {
            ideal: v[S]
          };
          $.exact !== void 0 && typeof $.exact == "number" && ($.min = $.max = $.exact);
          var H = function(U, E) {
            return U ? U + E.charAt(0).toUpperCase() + E.slice(1) : E === "deviceId" ? "sourceId" : E;
          };
          if ($.ideal !== void 0) {
            _.optional = _.optional || [];
            var j = {};
            typeof $.ideal == "number" ? (j[H("min", S)] = $.ideal, _.optional.push(j), j = {}, j[H("max", S)] = $.ideal, _.optional.push(j)) : (j[H("", S)] = $.ideal, _.optional.push(j));
          }
          $.exact !== void 0 && typeof $.exact != "number" ? (_.mandatory = _.mandatory || {}, _.mandatory[H("", S)] = $.exact) : ["min", "max"].forEach(function(L) {
            $[L] !== void 0 && (_.mandatory = _.mandatory || {}, _.mandatory[H(L, S)] = $[L]);
          });
        }
      }), v.advanced && (_.optional = (_.optional || []).concat(v.advanced)), _;
    }, f = function(v, _) {
      if (i.version >= 61)
        return _(v);
      if (v = JSON.parse(JSON.stringify(v)), v && he(v.audio) === "object") {
        var S = function(U, E, k) {
          E in U && !(k in U) && (U[k] = U[E], delete U[E]);
        };
        v = JSON.parse(JSON.stringify(v)), S(v.audio, "autoGainControl", "googAutoGainControl"), S(v.audio, "noiseSuppression", "googNoiseSuppression"), v.audio = u(v.audio);
      }
      if (v && he(v.video) === "object") {
        var $ = v.video.facingMode;
        $ = $ && (he($) === "object" ? $ : {
          ideal: $
        });
        var H = i.version < 66;
        if ($ && ($.exact === "user" || $.exact === "environment" || $.ideal === "user" || $.ideal === "environment") && !(o.mediaDevices.getSupportedConstraints && o.mediaDevices.getSupportedConstraints().facingMode && !H)) {
          delete v.video.facingMode;
          var j;
          if ($.exact === "environment" || $.ideal === "environment" ? j = ["back", "rear"] : ($.exact === "user" || $.ideal === "user") && (j = ["front"]), j)
            return o.mediaDevices.enumerateDevices().then(function(L) {
              L = L.filter(function(E) {
                return E.kind === "videoinput";
              });
              var U = L.find(function(E) {
                return j.some(function(k) {
                  return E.label.toLowerCase().includes(k);
                });
              });
              return !U && L.length && j.includes("back") && (U = L[L.length - 1]), U && (v.video.deviceId = $.exact ? {
                exact: U.deviceId
              } : {
                ideal: U.deviceId
              }), v.video = u(v.video), Er("chrome: " + JSON.stringify(v)), _(v);
            });
        }
        v.video = u(v.video);
      }
      return Er("chrome: " + JSON.stringify(v)), _(v);
    }, p = function(v) {
      return i.version >= 64 ? v : {
        name: {
          PermissionDeniedError: "NotAllowedError",
          PermissionDismissedError: "NotAllowedError",
          InvalidStateError: "NotAllowedError",
          DevicesNotFoundError: "NotFoundError",
          ConstraintNotSatisfiedError: "OverconstrainedError",
          TrackStartError: "NotReadableError",
          MediaDeviceFailedDueToShutdown: "NotAllowedError",
          MediaDeviceKillSwitchOn: "NotAllowedError",
          TabCaptureError: "AbortError",
          ScreenCaptureError: "AbortError",
          DeviceCaptureError: "AbortError"
        }[v.name] || v.name,
        message: v.message,
        constraint: v.constraint || v.constraintName,
        toString: function() {
          return this.name + (this.message && ": ") + this.message;
        }
      };
    }, m = function(v, _, S) {
      f(v, function($) {
        o.webkitGetUserMedia($, _, function(H) {
          S && S(p(H));
        });
      });
    };
    if (o.getUserMedia = m.bind(o), o.mediaDevices.getUserMedia) {
      var w = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
      o.mediaDevices.getUserMedia = function(b) {
        return f(b, function(v) {
          return w(v).then(function(_) {
            if (v.audio && !_.getAudioTracks().length || v.video && !_.getVideoTracks().length)
              throw _.getTracks().forEach(function(S) {
                S.stop();
              }), new DOMException("", "NotFoundError");
            return _;
          }, function(_) {
            return Promise.reject(p(_));
          });
        });
      };
    }
  }
}
var Jr = {};
Object.defineProperty(Jr, "__esModule", {
  value: !0
});
var li = Jr.shimGetUserMedia = hi, di = fi(K);
function Qr(r) {
  if (typeof WeakMap != "function")
    return null;
  var i = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return (Qr = function(f) {
    return f ? o : i;
  })(r);
}
function fi(r, i) {
  if (!i && r && r.__esModule)
    return r;
  if (r === null || Pe(r) !== "object" && typeof r != "function")
    return { default: r };
  var o = Qr(i);
  if (o && o.has(r))
    return o.get(r);
  var u = {}, f = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var p in r)
    if (p !== "default" && Object.prototype.hasOwnProperty.call(r, p)) {
      var m = f ? Object.getOwnPropertyDescriptor(r, p) : null;
      m && (m.get || m.set) ? Object.defineProperty(u, p, m) : u[p] = r[p];
    }
  return u.default = r, o && o.set(r, u), u;
}
function Pe(r) {
  "@babel/helpers - typeof";
  return Pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, Pe(r);
}
function hi(r, i) {
  var o = r && r.navigator, u = r && r.MediaStreamTrack;
  if (o.getUserMedia = function(b, v, _) {
    di.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), o.mediaDevices.getUserMedia(b).then(v, _);
  }, !(i.version > 55 && "autoGainControl" in o.mediaDevices.getSupportedConstraints())) {
    var f = function(v, _, S) {
      _ in v && !(S in v) && (v[S] = v[_], delete v[_]);
    }, p = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
    if (o.mediaDevices.getUserMedia = function(b) {
      return Pe(b) === "object" && Pe(b.audio) === "object" && (b = JSON.parse(JSON.stringify(b)), f(b.audio, "autoGainControl", "mozAutoGainControl"), f(b.audio, "noiseSuppression", "mozNoiseSuppression")), p(b);
    }, u && u.prototype.getSettings) {
      var m = u.prototype.getSettings;
      u.prototype.getSettings = function() {
        var b = m.apply(this, arguments);
        return f(b, "mozAutoGainControl", "autoGainControl"), f(b, "mozNoiseSuppression", "noiseSuppression"), b;
      };
    }
    if (u && u.prototype.applyConstraints) {
      var w = u.prototype.applyConstraints;
      u.prototype.applyConstraints = function(b) {
        return this.kind === "audio" && Pe(b) === "object" && (b = JSON.parse(JSON.stringify(b)), f(b, "autoGainControl", "mozAutoGainControl"), f(b, "noiseSuppression", "mozNoiseSuppression")), w.apply(this, [b]);
      };
    }
  }
}
var ne = {};
Object.defineProperty(ne, "__esModule", {
  value: !0
});
ne.shimAudioContext = $i;
ne.shimCallbacksAPI = gi;
ne.shimConstraints = Xr;
ne.shimCreateOfferLegacy = _i;
var pi = ne.shimGetUserMedia = wi;
ne.shimLocalStreamsAPI = vi;
ne.shimRTCIceServerUrls = bi;
ne.shimRemoteStreamsAPI = yi;
ne.shimTrackEventTransceiver = Ci;
var Zr = mi(K);
function Kr(r) {
  if (typeof WeakMap != "function")
    return null;
  var i = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return (Kr = function(f) {
    return f ? o : i;
  })(r);
}
function mi(r, i) {
  if (!i && r && r.__esModule)
    return r;
  if (r === null || me(r) !== "object" && typeof r != "function")
    return { default: r };
  var o = Kr(i);
  if (o && o.has(r))
    return o.get(r);
  var u = {}, f = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var p in r)
    if (p !== "default" && Object.prototype.hasOwnProperty.call(r, p)) {
      var m = f ? Object.getOwnPropertyDescriptor(r, p) : null;
      m && (m.get || m.set) ? Object.defineProperty(u, p, m) : u[p] = r[p];
    }
  return u.default = r, o && o.set(r, u), u;
}
function me(r) {
  "@babel/helpers - typeof";
  return me = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
    return typeof i;
  } : function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, me(r);
}
function vi(r) {
  if (!(me(r) !== "object" || !r.RTCPeerConnection)) {
    if ("getLocalStreams" in r.RTCPeerConnection.prototype || (r.RTCPeerConnection.prototype.getLocalStreams = function() {
      return this._localStreams || (this._localStreams = []), this._localStreams;
    }), !("addStream" in r.RTCPeerConnection.prototype)) {
      var i = r.RTCPeerConnection.prototype.addTrack;
      r.RTCPeerConnection.prototype.addStream = function(u) {
        var f = this;
        this._localStreams || (this._localStreams = []), this._localStreams.includes(u) || this._localStreams.push(u), u.getAudioTracks().forEach(function(p) {
          return i.call(f, p, u);
        }), u.getVideoTracks().forEach(function(p) {
          return i.call(f, p, u);
        });
      }, r.RTCPeerConnection.prototype.addTrack = function(u) {
        for (var f = this, p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), w = 1; w < p; w++)
          m[w - 1] = arguments[w];
        return m && m.forEach(function(b) {
          f._localStreams ? f._localStreams.includes(b) || f._localStreams.push(b) : f._localStreams = [b];
        }), i.apply(this, arguments);
      };
    }
    "removeStream" in r.RTCPeerConnection.prototype || (r.RTCPeerConnection.prototype.removeStream = function(u) {
      var f = this;
      this._localStreams || (this._localStreams = []);
      var p = this._localStreams.indexOf(u);
      if (p !== -1) {
        this._localStreams.splice(p, 1);
        var m = u.getTracks();
        this.getSenders().forEach(function(w) {
          m.includes(w.track) && f.removeTrack(w);
        });
      }
    });
  }
}
function yi(r) {
  if (!(me(r) !== "object" || !r.RTCPeerConnection) && ("getRemoteStreams" in r.RTCPeerConnection.prototype || (r.RTCPeerConnection.prototype.getRemoteStreams = function() {
    return this._remoteStreams ? this._remoteStreams : [];
  }), !("onaddstream" in r.RTCPeerConnection.prototype))) {
    Object.defineProperty(r.RTCPeerConnection.prototype, "onaddstream", {
      get: function() {
        return this._onaddstream;
      },
      set: function(u) {
        var f = this;
        this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = u), this.addEventListener("track", this._onaddstreampoly = function(p) {
          p.streams.forEach(function(m) {
            if (f._remoteStreams || (f._remoteStreams = []), !f._remoteStreams.includes(m)) {
              f._remoteStreams.push(m);
              var w = new Event("addstream");
              w.stream = m, f.dispatchEvent(w);
            }
          });
        });
      }
    });
    var i = r.RTCPeerConnection.prototype.setRemoteDescription;
    r.RTCPeerConnection.prototype.setRemoteDescription = function() {
      var u = this;
      return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(f) {
        f.streams.forEach(function(p) {
          if (u._remoteStreams || (u._remoteStreams = []), !(u._remoteStreams.indexOf(p) >= 0)) {
            u._remoteStreams.push(p);
            var m = new Event("addstream");
            m.stream = p, u.dispatchEvent(m);
          }
        });
      }), i.apply(u, arguments);
    };
  }
}
function gi(r) {
  if (!(me(r) !== "object" || !r.RTCPeerConnection)) {
    var i = r.RTCPeerConnection.prototype, o = i.createOffer, u = i.createAnswer, f = i.setLocalDescription, p = i.setRemoteDescription, m = i.addIceCandidate;
    i.createOffer = function(v, _) {
      var S = arguments.length >= 2 ? arguments[2] : arguments[0], $ = o.apply(this, [S]);
      return _ ? ($.then(v, _), Promise.resolve()) : $;
    }, i.createAnswer = function(v, _) {
      var S = arguments.length >= 2 ? arguments[2] : arguments[0], $ = u.apply(this, [S]);
      return _ ? ($.then(v, _), Promise.resolve()) : $;
    };
    var w = function(v, _, S) {
      var $ = f.apply(this, [v]);
      return S ? ($.then(_, S), Promise.resolve()) : $;
    };
    i.setLocalDescription = w, w = function(v, _, S) {
      var $ = p.apply(this, [v]);
      return S ? ($.then(_, S), Promise.resolve()) : $;
    }, i.setRemoteDescription = w, w = function(v, _, S) {
      var $ = m.apply(this, [v]);
      return S ? ($.then(_, S), Promise.resolve()) : $;
    }, i.addIceCandidate = w;
  }
}
function wi(r) {
  var i = r && r.navigator;
  if (i.mediaDevices && i.mediaDevices.getUserMedia) {
    var o = i.mediaDevices, u = o.getUserMedia.bind(o);
    i.mediaDevices.getUserMedia = function(f) {
      return u(Xr(f));
    };
  }
  !i.getUserMedia && i.mediaDevices && i.mediaDevices.getUserMedia && (i.getUserMedia = (function(p, m, w) {
    i.mediaDevices.getUserMedia(p).then(m, w);
  }).bind(i));
}
function Xr(r) {
  return r && r.video !== void 0 ? Object.assign({}, r, {
    video: Zr.compactObject(r.video)
  }) : r;
}
function bi(r) {
  if (r.RTCPeerConnection) {
    var i = r.RTCPeerConnection;
    r.RTCPeerConnection = function(u, f) {
      if (u && u.iceServers) {
        for (var p = [], m = 0; m < u.iceServers.length; m++) {
          var w = u.iceServers[m];
          w.urls === void 0 && w.url ? (Zr.deprecated("RTCIceServer.url", "RTCIceServer.urls"), w = JSON.parse(JSON.stringify(w)), w.urls = w.url, delete w.url, p.push(w)) : p.push(u.iceServers[m]);
        }
        u.iceServers = p;
      }
      return new i(u, f);
    }, r.RTCPeerConnection.prototype = i.prototype, "generateCertificate" in i && Object.defineProperty(r.RTCPeerConnection, "generateCertificate", {
      get: function() {
        return i.generateCertificate;
      }
    });
  }
}
function Ci(r) {
  me(r) === "object" && r.RTCTrackEvent && "receiver" in r.RTCTrackEvent.prototype && !("transceiver" in r.RTCTrackEvent.prototype) && Object.defineProperty(r.RTCTrackEvent.prototype, "transceiver", {
    get: function() {
      return {
        receiver: this.receiver
      };
    }
  });
}
function _i(r) {
  var i = r.RTCPeerConnection.prototype.createOffer;
  r.RTCPeerConnection.prototype.createOffer = function(u) {
    if (u) {
      typeof u.offerToReceiveAudio < "u" && (u.offerToReceiveAudio = !!u.offerToReceiveAudio);
      var f = this.getTransceivers().find(function(m) {
        return m.receiver.track.kind === "audio";
      });
      u.offerToReceiveAudio === !1 && f ? f.direction === "sendrecv" ? f.setDirection ? f.setDirection("sendonly") : f.direction = "sendonly" : f.direction === "recvonly" && (f.setDirection ? f.setDirection("inactive") : f.direction = "inactive") : u.offerToReceiveAudio === !0 && !f && this.addTransceiver("audio", {
        direction: "recvonly"
      }), typeof u.offerToReceiveVideo < "u" && (u.offerToReceiveVideo = !!u.offerToReceiveVideo);
      var p = this.getTransceivers().find(function(m) {
        return m.receiver.track.kind === "video";
      });
      u.offerToReceiveVideo === !1 && p ? p.direction === "sendrecv" ? p.setDirection ? p.setDirection("sendonly") : p.direction = "sendonly" : p.direction === "recvonly" && (p.setDirection ? p.setDirection("inactive") : p.direction = "inactive") : u.offerToReceiveVideo === !0 && !p && this.addTransceiver("video", {
        direction: "recvonly"
      });
    }
    return i.apply(this, arguments);
  };
}
function $i(r) {
  me(r) !== "object" || r.AudioContext || (r.AudioContext = r.webkitAudioContext);
}
const Si = (r) => {
  let i = !1, o;
  return (...u) => (i || (o = r(u), i = !0), o);
};
function le(r, i) {
  if (r === !1)
    throw new Error(i != null ? i : "assertion failure");
}
const Pi = Si(() => {
  const r = Jo(window);
  switch (r.browser) {
    case "chrome":
      ii(window, r);
      break;
    case "firefox":
      li(window, r);
      break;
    case "safari":
      pi(window, r);
      break;
    default:
      throw new Vr();
  }
});
let de = { isActive: !1 };
function Dt() {
  if (de.isActive) {
    de.videoEl.src = "", de.videoEl.srcObject = null, de.videoEl.load();
    for (const r of de.stream.getTracks())
      de.stream.removeTrack(r), r.stop();
    de = { isActive: !1 };
  }
}
async function Ti(r, {
  constraints: i,
  torch: o
}) {
  var p, m, w;
  if (window.isSecureContext !== !0)
    throw new zo();
  if (((p = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : p.getUserMedia) === void 0)
    throw new Vr();
  Pi();
  const u = await navigator.mediaDevices.getUserMedia({
    audio: !1,
    video: i
  });
  if (r.srcObject !== void 0 ? r.srcObject = u : r.mozSrcObject !== void 0 ? r.mozSrcObject = u : window.URL.createObjectURL ? r.src = window.URL.createObjectURL(u) : window.webkitURL ? r.src = window.webkitURL.createObjectURL(u) : r.src = u.id, r.play(), await Promise.race([
    Wr(r, "loadeddata"),
    // On iOS devices in PWA mode, QrcodeStream works initially, but after
    // killing and restarting the PWA, all video elements fail to load camera
    // streams and never emit the `loadeddata` event. Looks like this is
    // related to a WebKit issue (see #298). No workarounds at the moment.
    // To at least detect this situation, we throw an error if the event
    // has not been emitted after a 3 second timeout.
    Pr(3e3).then(() => {
      throw new Bo();
    })
  ]), await Pr(500), o) {
    const [b] = u.getVideoTracks();
    b.getCapabilities().torch ? b.applyConstraints({ advanced: [{ torch: !0 }] }) : console.warn("device does not support torch capability");
  }
  de = { videoEl: r, stream: u, isActive: !0 };
  const [f] = de.stream.getVideoTracks();
  return (w = (m = f == null ? void 0 : f.getCapabilities) == null ? void 0 : m.call(f)) != null ? w : {};
}
const Ei = /* @__PURE__ */ xt({
  __name: "QrcodeStream",
  props: {
    constraints: {
      type: Object,
      default() {
        return { facingMode: "environment" };
      }
    },
    formats: {
      type: Array,
      default: () => ["qr_code"]
    },
    paused: {
      type: Boolean,
      default: !1
    },
    torch: {
      type: Boolean,
      default: !1
    },
    track: {
      type: Function
    }
  },
  emits: ["detect", "camera-on", "camera-off", "error"],
  setup(r, { emit: i }) {
    const o = r, u = Ie(), f = Ie(), p = Ie(), m = Ie(!1), w = Ie(!1);
    mo(() => {
      w.value = !0;
    }), vo(() => {
      Dt();
    });
    const b = Et(() => ({
      torch: o.torch,
      constraints: o.constraints,
      shouldStream: w.value && !o.paused
    }));
    Ot(b, async (E) => {
      const k = p.value;
      le(k !== void 0, "cameraSettings watcher should never be triggered when component is not mounted. Thus video element should always be defined.");
      const N = u.value;
      le(N !== void 0, "cameraSettings watcher should never be triggered when component is not mounted. Thus canvas should always be defined.");
      const B = N.getContext("2d");
      if (le(B !== null, "if cavnas is defined, canvas 2d context should also be non-null"), E.shouldStream)
        try {
          const I = await Ti(k, E);
          w.value ? (m.value = !0, i("camera-on", I)) : Dt();
        } catch (I) {
          i("error", I);
        }
      else
        N.width = k.videoWidth, N.height = k.videoHeight, B.drawImage(k, 0, 0, k.videoWidth, k.videoHeight), Dt(), m.value = !1, i("camera-off");
    }, { deep: !0 });
    const { formats: v } = yo(o);
    Ot(v, (E) => {
      w.value && Go(E);
    });
    const _ = Et(() => b.value.shouldStream && m.value);
    Ot(_, (E) => {
      if (E) {
        le(u.value !== void 0, "shouldScan watcher should only be triggered when component is mounted. Thus pause frame canvas is defined"), S(u.value), le(f.value !== void 0, "shouldScan watcher should only be triggered when component is mounted. Thus tracking canvas is defined"), S(f.value);
        const k = () => o.track === void 0 ? 500 : 40;
        le(p.value !== void 0, "shouldScan watcher should only be triggered when component is mounted. Thus video element is defined"), No(p.value, {
          detectHandler: (N) => i("detect", N),
          formats: o.formats,
          locateHandler: $,
          minDelay: k()
        });
      }
    });
    const S = (E) => {
      const k = E.getContext("2d");
      le(k !== null, "canvas 2d context should always be non-null"), k.clearRect(0, 0, E.width, E.height);
    }, $ = (E) => {
      const k = f.value;
      le(k !== void 0, "onLocate handler should only be called when component is mounted. Thus tracking canvas is always defined.");
      const N = p.value;
      if (le(N !== void 0, "onLocate handler should only be called when component is mounted. Thus video element is always defined."), E.length === 0 || o.track === void 0)
        S(k);
      else {
        const B = N.offsetWidth, I = N.offsetHeight, be = N.videoWidth, Ce = N.videoHeight, Te = Math.max(B / be, I / Ce), Ee = be * Te, Oe = Ce * Te, Ue = Ee / be, ct = Oe / Ce, ut = (B - Ee) / 2, lt = (I - Oe) / 2, De = ({ x: X, y: re }) => ({
          x: Math.floor(X * Ue),
          y: Math.floor(re * ct)
        }), He = ({ x: X, y: re }) => ({
          x: Math.floor(X + ut),
          y: Math.floor(re + lt)
        }), dt = E.map((X) => {
          const { boundingBox: re, cornerPoints: ft } = X, { x: _e, y: ht } = He(
            De({
              x: re.x,
              y: re.y
            })
          ), { x: Le, y: oe } = De({
            x: re.width,
            y: re.height
          });
          return {
            ...X,
            cornerPoints: ft.map((We) => He(De(We))),
            boundingBox: DOMRectReadOnly.fromRect({ x: _e, y: ht, width: Le, height: oe })
          };
        });
        k.width = N.offsetWidth, k.height = N.offsetHeight;
        const ae = k.getContext("2d");
        o.track(dt, ae);
      }
    }, H = {
      width: "100%",
      height: "100%",
      position: "relative",
      // notice that we use z-index only once for the wrapper div.
      // If z-index is not defined, elements are stacked in the order they appear in the DOM.
      // The first element is at the very bottom and subsequent elements are added on top.
      "z-index": "0"
    }, j = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0"
    }, L = {
      width: "100%",
      height: "100%",
      "object-fit": "cover"
    }, U = Et(() => _.value ? L : {
      ...L,
      visibility: "hidden",
      position: "absolute"
    });
    return (E, k) => (Rt(), Ft("div", { style: H }, [
      rt("video", {
        ref_key: "videoRef",
        ref: p,
        style: go(U.value),
        autoplay: "",
        muted: "",
        playsinline: ""
      }, null, 4),
      wo(rt("canvas", {
        id: "qrcode-stream-pause-frame",
        ref_key: "pauseFrameRef",
        ref: u,
        style: L
      }, null, 512), [
        [bo, !_.value]
      ]),
      rt("canvas", {
        id: "qrcode-stream-tracking-layer",
        ref_key: "trackingLayerRef",
        ref: f,
        style: j
      }, null, 512),
      rt("div", { style: j }, [
        Or(E.$slots, "default")
      ])
    ]));
  }
}), Oi = /* @__PURE__ */ xt({
  __name: "QrcodeCapture",
  props: {
    formats: {
      type: Array,
      default: () => ["qr_code"]
    }
  },
  emits: ["detect"],
  setup(r, { emit: i }) {
    const o = r, u = (f) => {
      if (!(!(f.target instanceof HTMLInputElement) || !f.target.files))
        for (const p of Array.from(f.target.files))
          zr(p, o.formats).then((m) => {
            i("detect", m);
          });
    };
    return (f, p) => (Rt(), Ft("input", {
      onChange: u,
      type: "file",
      name: "image",
      accept: "image/*",
      capture: "environment",
      multiple: ""
    }, null, 32));
  }
}), Di = ["onDrop"], Mi = /* @__PURE__ */ xt({
  __name: "QrcodeDropZone",
  props: {
    formats: {
      type: Array,
      default: () => ["qr_code"]
    }
  },
  emits: ["detect", "dragover", "error"],
  setup(r, { emit: i }) {
    const o = r, u = async (m) => {
      try {
        const w = await m;
        i("detect", w);
      } catch (w) {
        i("error", w);
      }
    }, f = (m) => {
      i("dragover", m);
    }, p = ({ dataTransfer: m }) => {
      if (!m)
        return;
      f(!1);
      const w = [...Array.from(m.files)], b = m.getData("text/uri-list");
      w.forEach((v) => {
        u(zr(v));
      }), b !== "" && u(Yo(b, o.formats));
    };
    return (m, w) => (Rt(), Ft("div", {
      onDrop: nt(p, ["prevent", "stop"]),
      onDragenter: w[0] || (w[0] = nt((b) => f(!0), ["prevent", "stop"])),
      onDragleave: w[1] || (w[1] = nt((b) => f(!1), ["prevent", "stop"])),
      onDragover: w[2] || (w[2] = nt(() => {
      }, ["prevent", "stop"]))
    }, [
      Or(m.$slots, "default")
    ], 40, Di));
  }
});
function Ai(r) {
  r.component("qrcode-stream", Ei), r.component("qrcode-capture", Oi), r.component("qrcode-drop-zone", Mi);
}
const xi = { install: Ai };
let it = null;
typeof window < "u" ? it = window.Vue : typeof global < "u" && (it = global.Vue);
it && it.use(xi);
export {
  Oi as QrcodeCapture,
  Mi as QrcodeDropZone,
  Ei as QrcodeStream,
  xi as VueQrcodeReader,
  Ai as install,
  Fi as setZXingModuleOverrides
};
