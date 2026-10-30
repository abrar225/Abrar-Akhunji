(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 88653, (t) => {
  "use strict";
  var e = t.i(43476), i = t.i(71645), s = t.i(31178), n = t.i(47414), r = t.i(74008), o = t.i(21476), a = t.i(72846), l = i, h = t.i(37806);
  function u(t2, e2) {
    if ("function" == typeof t2) return t2(e2);
    null != t2 && (t2.current = e2);
  }
  class c extends l.Component {
    getSnapshotBeforeUpdate(t2) {
      let e2 = this.props.childRef.current;
      if ((0, a.isHTMLElement)(e2) && t2.isPresent && !this.props.isPresent && false !== this.props.pop) {
        let t3 = e2.offsetParent, i2 = (0, a.isHTMLElement)(t3) && t3.offsetWidth || 0, s2 = (0, a.isHTMLElement)(t3) && t3.offsetHeight || 0, n2 = getComputedStyle(e2), r2 = this.props.sizeRef.current;
        r2.height = parseFloat(n2.height), r2.width = parseFloat(n2.width), r2.top = e2.offsetTop, r2.left = e2.offsetLeft, r2.right = i2 - r2.width - r2.left, r2.bottom = s2 - r2.height - r2.top, r2.direction = n2.direction;
      }
      return null;
    }
    componentDidUpdate() {
    }
    render() {
      return this.props.children;
    }
  }
  function d({ children: t2, isPresent: s2, anchorX: n2, anchorY: r2, root: o2, pop: a2 }) {
    let m2 = (0, l.useId)(), p2 = (0, l.useRef)(null), f2 = (0, l.useRef)({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, direction: "ltr" }), { nonce: y2 } = (0, l.useContext)(h.MotionConfigContext), g2 = (function(...t3) {
      return i.useCallback(/* @__PURE__ */ (function(...t4) {
        return (e2) => {
          let i2 = false, s3 = t4.map((t5) => {
            let s4 = u(t5, e2);
            return i2 || "function" != typeof s4 || (i2 = true), s4;
          });
          if (i2) return () => {
            for (let e3 = 0; e3 < s3.length; e3++) {
              let i3 = s3[e3];
              "function" == typeof i3 ? i3() : u(t4[e3], null);
            }
          };
        };
      })(...t3), t3);
    })(p2, false !== a2 ? t2.props?.ref ?? t2?.ref : void 0);
    return (0, l.useInsertionEffect)(() => {
      let { width: t3, height: e2, top: i2, left: l2, right: h2, bottom: u2, direction: c2 } = f2.current;
      if (s2 || false === a2 || !p2.current || !t3 || !e2) return;
      let d2 = "rtl" === c2, g3 = "left" === n2 ? d2 ? `right: ${h2}` : `left: ${l2}` : d2 ? `left: ${l2}` : `right: ${h2}`, v = "bottom" === r2 ? `bottom: ${u2}` : `top: ${i2}`;
      p2.current.dataset.motionPopId = m2;
      let x = document.createElement("style");
      y2 && (x.nonce = y2);
      let T = o2 ?? document.head;
      return T.appendChild(x), x.sheet && x.sheet.insertRule(`
          [data-motion-pop-id="${m2}"] {
            position: absolute !important;
            width: ${t3}px !important;
            height: ${e2}px !important;
            ${g3}px !important;
            ${v}px !important;
          }
        `), () => {
        p2.current?.removeAttribute("data-motion-pop-id"), T.contains(x) && T.removeChild(x);
      };
    }, [s2]), (0, e.jsx)(c, { isPresent: s2, childRef: p2, sizeRef: f2, pop: a2, children: false === a2 ? t2 : l.cloneElement(t2, { ref: g2 }) });
  }
  let m = ({ children: t2, initial: s2, isPresent: a2, onExitComplete: l2, custom: h2, presenceAffectsLayout: u2, mode: c2, anchorX: m2, anchorY: f2, root: y2 }) => {
    let g2 = (0, n.useConstant)(p), v = (0, i.useId)(), x = (0, i.useRef)(a2), T = (0, i.useRef)(l2);
    (0, r.useIsomorphicLayoutEffect)(() => {
      x.current = a2, T.current = l2;
    });
    let b = true, w = (0, i.useMemo)(() => (b = false, { id: v, initial: s2, isPresent: a2, custom: h2, onExitComplete: (t3) => {
      for (let e2 of (g2.set(t3, true), g2.values())) if (!e2) return;
      l2 && l2();
    }, register: (t3) => (g2.set(t3, false), () => {
      g2.delete(t3), x.current || g2.size || T.current?.();
    }) }), [a2, g2, l2]);
    return u2 && b && (w = { ...w }), (0, i.useMemo)(() => {
      g2.forEach((t3, e2) => g2.set(e2, false));
    }, [a2]), i.useEffect(() => {
      a2 || g2.size || !l2 || l2();
    }, [a2]), t2 = (0, e.jsx)(d, { pop: "popLayout" === c2, isPresent: a2, anchorX: m2, anchorY: f2, root: y2, children: t2 }), (0, e.jsx)(o.PresenceContext.Provider, { value: w, children: t2 });
  };
  function p() {
    return /* @__PURE__ */ new Map();
  }
  var f = t.i(64978);
  let y = (t2) => t2.key || "";
  function g(t2) {
    let e2 = [];
    return i.Children.forEach(t2, (t3) => {
      (0, i.isValidElement)(t3) && e2.push(t3);
    }), e2;
  }
  t.s(["AnimatePresence", 0, ({ children: t2, custom: o2, initial: a2 = true, onExitComplete: l2, presenceAffectsLayout: h2 = true, mode: u2 = "sync", propagate: c2 = false, anchorX: d2 = "left", anchorY: p2 = "top", root: v }) => {
    let [x, T] = (0, f.usePresence)(c2), b = (0, i.useMemo)(() => g(t2), [t2]), w = c2 && !x ? [] : b.map(y), S = (0, i.useRef)(true), P = (0, n.useConstant)(() => /* @__PURE__ */ new Map()), A = (0, i.useRef)(/* @__PURE__ */ new Set()), [M, E] = (0, i.useState)(b), [C, V] = (0, i.useState)(b);
    (0, r.useIsomorphicLayoutEffect)(() => {
      !c2 || x || C.length || T?.();
    }, [x, c2, C.length, T]), (0, r.useIsomorphicLayoutEffect)(() => {
      S.current = false;
      for (let t3 = 0; t3 < C.length; t3++) {
        let e2 = y(C[t3]);
        w.includes(e2) ? (P.delete(e2), A.current.delete(e2)) : true !== P.get(e2) && P.set(e2, false);
      }
    }, [C, w.length, w.join("-")]);
    let D = [];
    if (b !== M) {
      let t3 = [...b], e2 = 0;
      for (let i2 of C) {
        let s2 = w.indexOf(y(i2));
        -1 === s2 ? (t3.splice(e2++, 0, i2), D.push(i2)) : e2 = s2 + D.length + 1;
      }
      return D.every((t4) => P.get(y(t4))) ? t3 = b : "wait" === u2 && (t3 = D), V(g(t3)), E(b), null;
    }
    let { forceRender: k } = (0, i.useContext)(s.LayoutGroupContext);
    return (0, e.jsx)(e.Fragment, { children: C.map((t3) => {
      let i2 = y(t3), s2 = (!c2 || !!x) && (b === C || w.includes(i2));
      return (0, e.jsx)(m, { isPresent: s2, initial: (!S.current || !!a2) && void 0, custom: o2, presenceAffectsLayout: h2, mode: u2, root: v, onExitComplete: s2 ? void 0 : () => {
        if (A.current.has(i2) || !P.has(i2)) return;
        A.current.add(i2), P.set(i2, true);
        let t4 = true;
        P.forEach((e2) => {
          e2 || (t4 = false);
        }), t4 && (k?.(), E([]), c2 && T?.(), l2 && l2());
      }, anchorX: d2, anchorY: p2, children: t3 }, i2);
    }) });
  }], 88653);
}, 63209, (t) => {
  "use strict";
  var e = t.i(43476), i = t.i(71645), s = t.i(53034), n = t.i(37806), r = t.i(47414);
  t.s(["MotionConfig", 0, function({ children: t2, ...o }) {
    let a = (0, i.useContext)(n.MotionConfigContext);
    (o = { ...a, ...o }).transition = (0, s.resolveTransition)(o.transition, a.transition), o.isStatic = (0, r.useConstant)(() => o.isStatic);
    let l = (0, i.useMemo)(() => o, [JSON.stringify(o.transition), o.transformPagePoint, o.reducedMotion, o.skipAnimations, o.isValidProp]);
    return (0, e.jsx)(n.MotionConfigContext.Provider, { value: l, children: t2 });
  }]);
}, 31178, 47414, 74008, 21476, 42824, 72846, 37806, 64978, (t) => {
  "use strict";
  var e = t.i(71645);
  let i = (0, e.createContext)({});
  t.s(["LayoutGroupContext", 0, i], 31178), t.s(["useConstant", 0, function(t2) {
    let i2 = (0, e.useRef)(null);
    return null === i2.current && (i2.current = t2()), i2.current;
  }], 47414);
  let s = "u" > typeof window ? e.useLayoutEffect : e.useEffect;
  t.s(["useIsomorphicLayoutEffect", 0, s], 74008);
  let n = (0, e.createContext)(null);
  t.s(["PresenceContext", 0, n], 21476);
  let r = (t2) => "object" == typeof t2 && null !== t2;
  t.s(["isObject", 0, r], 42824), t.s(["isHTMLElement", 0, function(t2) {
    return r(t2) && "offsetHeight" in t2 && !("ownerSVGElement" in t2);
  }], 72846);
  let o = (0, e.createContext)({ transformPagePoint: (t2) => t2, isStatic: false, reducedMotion: "never" });
  t.s(["MotionConfigContext", 0, o], 37806), t.s(["usePresence", 0, function(t2 = true) {
    let i2 = (0, e.useContext)(n);
    if (null === i2) return [true, null];
    let { isPresent: s2, onExitComplete: r2, register: o2 } = i2, a = (0, e.useId)();
    (0, e.useEffect)(() => {
      if (t2) return o2(a);
    }, [t2]);
    let l = (0, e.useCallback)(() => t2 && r2 && r2(a), [a, r2, t2]);
    return !s2 && r2 ? [false, l] : [true];
  }], 64978);
}, 54505, 57788, 76959, 60720, 66820, 63011, 65091, 22660, 79444, 69577, 848, 34929, 30162, 83411, 64440, 65566, 19928, 81296, 60830, 46791, 48940, 87022, 21012, 46436, 63074, 33887, 70596, 34474, 94581, 60900, 14229, 79294, 96173, 49404, 60855, 56512, 97307, 68e3, 62118, 60140, 25791, 86427, 72094, 85983, 32525, 6840, 71164, 38544, 93787, 46124, 81261, 24463, 27677, 706, 77777, 35636, 53689, 33871, 35043, 4035, 25522, 7051, 42098, 18812, (t) => {
  "use strict";
  let e, i = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"], s = /* @__PURE__ */ new Set([...i, "pathRotation"]);
  t.s(["transformPropOrder", 0, i, "transformProps", 0, s], 57788);
  let n = (t10, e10, i2) => i2 > e10 ? e10 : i2 < t10 ? t10 : i2;
  t.s(["clamp", 0, n], 76959);
  let r = { test: (t10) => "number" == typeof t10, parse: parseFloat, transform: (t10) => t10 }, o = { ...r, transform: (t10) => n(0, 1, t10) }, a = { ...r, default: 1 }, l = (t10) => Math.round(1e5 * t10) / 1e5;
  t.s(["sanitize", 0, l], 60720);
  let h = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu, u = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, c = (t10, e10) => (i2) => !!("string" == typeof i2 && u.test(i2) && i2.startsWith(t10) || e10 && null != i2 && Object.prototype.hasOwnProperty.call(i2, e10)), d = (t10, e10, i2) => (s2) => {
    if ("string" != typeof s2) return s2;
    let [n2, r2, o2, a2] = s2.match(h);
    return { [t10]: parseFloat(n2), [e10]: parseFloat(r2), [i2]: parseFloat(o2), alpha: void 0 !== a2 ? parseFloat(a2) : 1 };
  }, m = { ...r, transform: (t10) => Math.round(n(0, 255, t10)) }, p = { test: c("rgb", "red"), parse: d("red", "green", "blue"), transform: ({ red: t10, green: e10, blue: i2, alpha: s2 = 1 }) => "rgba(" + m.transform(t10) + ", " + m.transform(e10) + ", " + m.transform(i2) + ", " + l(o.transform(s2)) + ")" };
  t.s(["rgba", 0, p], 66820);
  let f = { test: c("#"), parse: function(t10) {
    let e10 = "", i2 = "", s2 = "", n2 = "";
    return t10.length > 5 ? (e10 = t10.substring(1, 3), i2 = t10.substring(3, 5), s2 = t10.substring(5, 7), n2 = t10.substring(7, 9)) : (e10 = t10.substring(1, 2), i2 = t10.substring(2, 3), s2 = t10.substring(3, 4), n2 = t10.substring(4, 5), e10 += e10, i2 += i2, s2 += s2, n2 += n2), { red: parseInt(e10, 16), green: parseInt(i2, 16), blue: parseInt(s2, 16), alpha: n2 ? parseInt(n2, 16) / 255 : 1 };
  }, transform: p.transform };
  t.s(["hex", 0, f], 63011);
  let y = (t10) => ({ test: (e10) => "string" == typeof e10 && e10.endsWith(t10) && 1 === e10.split(" ").length, parse: parseFloat, transform: (e10) => `${e10}${t10}` }), g = y("deg"), v = y("%"), x = y("px"), T = y("vh"), b = y("vw"), w = { ...v, parse: (t10) => v.parse(t10) / 100, transform: (t10) => v.transform(100 * t10) };
  t.s(["degrees", 0, g, "percent", 0, v, "progressPercentage", 0, w, "px", 0, x, "vh", 0, T, "vw", 0, b], 65091);
  let S = { test: c("hsl", "hue"), parse: d("hue", "saturation", "lightness"), transform: ({ hue: t10, saturation: e10, lightness: i2, alpha: s2 = 1 }) => "hsla(" + Math.round(t10) + ", " + v.transform(l(e10)) + ", " + v.transform(l(i2)) + ", " + l(o.transform(s2)) + ")" };
  t.s(["hsla", 0, S], 22660);
  let P = { test: (t10) => p.test(t10) || f.test(t10) || S.test(t10), parse: (t10) => p.test(t10) ? p.parse(t10) : S.test(t10) ? S.parse(t10) : f.parse(t10), transform: (t10) => "string" == typeof t10 ? t10 : t10.hasOwnProperty("red") ? p.transform(t10) : S.transform(t10), getAnimatableNone: (t10) => {
    let e10 = P.parse(t10);
    return e10.alpha = 0, P.transform(e10);
  } };
  t.s(["color", 0, P], 79444);
  let A = new RegExp(h.source), M = RegExp(/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu.source, "i"), E = "number", C = "color", V = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
  function D(t10) {
    let e10 = t10.toString();
    return A.test(e10) || M.test(e10);
  }
  function k(t10) {
    let e10 = t10.toString(), i2 = [], s2 = { color: [], number: [], var: [] }, n2 = [], r2 = 0, o2 = e10.replace(V, (t11) => (P.test(t11) ? (s2.color.push(r2), n2.push(C), i2.push(P.parse(t11))) : t11.startsWith("var(") ? (s2.var.push(r2), n2.push("var"), i2.push(t11)) : (s2.number.push(r2), n2.push(E), i2.push(parseFloat(t11))), ++r2, "${}")).split("${}");
    return { values: i2, split: o2, indexes: s2, types: n2 };
  }
  function R({ split: t10, types: e10 }) {
    let i2 = t10.length;
    return (s2) => {
      let n2 = "";
      for (let r2 = 0; r2 < i2; r2++) if (n2 += t10[r2], void 0 !== s2[r2]) {
        let t11 = e10[r2];
        t11 === E ? n2 += l(s2[r2]) : t11 === C ? n2 += P.transform(s2[r2]) : n2 += s2[r2];
      }
      return n2;
    };
  }
  let L = { test: function(t10) {
    return isNaN(t10) && "string" == typeof t10 && (A.test(t10) || M.test(t10));
  }, parse: function(t10) {
    return k(t10).values;
  }, createTransformer: function(t10) {
    return R(k(t10));
  }, getAnimatableNone: function(t10) {
    let e10 = k(t10);
    return R(e10)(e10.values.map((t11, i2) => ((t12, e11) => "number" == typeof t12 ? e11?.trim().endsWith("/") ? t12 : 0 : "number" == typeof t12 ? 0 : P.test(t12) ? P.getAnimatableNone(t12) : t12)(t11, e10.split[i2])));
  } };
  t.s(["analyseComplexValue", 0, k, "complex", 0, L, "hasComplexValues", 0, D], 69577);
  let B = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
  function F(t10) {
    let [e10, i2] = t10.slice(0, -1).split("(");
    if ("drop-shadow" === e10) return t10;
    let [s2] = i2.match(h) || [];
    if (!s2) return t10;
    let n2 = i2.replace(s2, ""), r2 = +!!B.has(e10);
    return s2 !== i2 && (r2 *= 100), e10 + "(" + r2 + n2 + ")";
  }
  let j = /\b([a-z-]*)\(.*?\)/gu, I = { ...L, getAnimatableNone: (t10) => {
    let e10 = t10.match(j);
    return e10 ? e10.map(F).join(" ") : t10;
  } }, O = { ...L, getAnimatableNone: (t10) => {
    let e10 = L.parse(t10);
    return L.createTransformer(t10)(e10.map((t11) => "number" == typeof t11 ? 0 : "object" == typeof t11 ? { ...t11, alpha: 1 } : t11));
  } }, N = { ...r, transform: Math.round }, U = { rotate: g, pathRotation: g, rotateX: g, rotateY: g, rotateZ: g, scale: a, scaleX: a, scaleY: a, scaleZ: a, skew: g, skewX: g, skewY: g, distance: x, translateX: x, translateY: x, translateZ: x, x, y: x, z: x, perspective: x, transformPerspective: x, opacity: o, originX: w, originY: w, originZ: x };
  t.s(["transformValueTypes", 0, U], 848);
  let $ = { borderWidth: x, borderTopWidth: x, borderRightWidth: x, borderBottomWidth: x, borderLeftWidth: x, borderRadius: x, borderTopLeftRadius: x, borderTopRightRadius: x, borderBottomRightRadius: x, borderBottomLeftRadius: x, width: x, maxWidth: x, height: x, maxHeight: x, top: x, right: x, bottom: x, left: x, inset: x, insetBlock: x, insetBlockStart: x, insetBlockEnd: x, insetInline: x, insetInlineStart: x, insetInlineEnd: x, padding: x, paddingTop: x, paddingRight: x, paddingBottom: x, paddingLeft: x, paddingBlock: x, paddingBlockStart: x, paddingBlockEnd: x, paddingInline: x, paddingInlineStart: x, paddingInlineEnd: x, margin: x, marginTop: x, marginRight: x, marginBottom: x, marginLeft: x, marginBlock: x, marginBlockStart: x, marginBlockEnd: x, marginInline: x, marginInlineStart: x, marginInlineEnd: x, fontSize: x, backgroundPositionX: x, backgroundPositionY: x, ...U, zIndex: N, fillOpacity: o, strokeOpacity: o, numOctaves: N };
  t.s(["numberValueTypes", 0, $], 34929);
  let W = { ...$, color: P, backgroundColor: P, outlineColor: P, fill: P, stroke: P, borderColor: P, borderTopColor: P, borderRightColor: P, borderBottomColor: P, borderLeftColor: P, filter: I, WebkitFilter: I, mask: O, WebkitMask: O }, z = (t10) => W[t10], G = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }), Y = () => ({ min: 0, max: 0 }), H = () => ({ x: Y(), y: Y() });
  t.s(["createBox", 0, H, "createDelta", 0, () => ({ x: G(), y: G() })], 30162);
  let K = (t10) => !!(t10 && t10.getVelocity);
  t.s(["isMotionValue", 0, K], 83411);
  let X = /* @__PURE__ */ new Set(["width", "height", "top", "left", "right", "bottom", ...i]);
  t.s(["positionalKeys", 0, X], 64440);
  let _ = [r, x, v, g, b, T, { test: (t10) => "auto" === t10, parse: (t10) => t10 }], q = (t10) => _.find((e10) => e10.test(t10)), Z = () => {
  };
  t.s(["invariant", 0, Z, "warning", 0, () => {
  }], 65566);
  let J = (t10) => (e10) => "string" == typeof e10 && e10.startsWith(t10), Q = J("--"), tt = J("var(--"), te = (t10) => !!tt(t10) && ti.test(t10.split("/*")[0].trim()), ti = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
  function ts(t10) {
    return "string" == typeof t10 && t10.split("/*")[0].includes("var(--");
  }
  t.s(["containsCSSVariable", 0, ts, "isCSSVariableName", 0, Q, "isCSSVariableToken", 0, te], 19928);
  let tn = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u, tr = /* @__PURE__ */ new Set([I, O]);
  function to(t10, e10) {
    let i2 = z(t10);
    return tr.has(i2) || (i2 = L), i2.getAnimatableNone ? i2.getAnimatableNone(e10) : void 0;
  }
  let ta = (t10) => 180 * t10 / Math.PI, tl = (t10) => tu(ta(Math.atan2(t10[1], t10[0]))), th = { x: 4, y: 5, translateX: 4, translateY: 5, scaleX: 0, scaleY: 3, scale: (t10) => (Math.abs(t10[0]) + Math.abs(t10[3])) / 2, rotate: tl, rotateZ: tl, skewX: (t10) => ta(Math.atan(t10[1])), skewY: (t10) => ta(Math.atan(t10[2])), skew: (t10) => (Math.abs(t10[1]) + Math.abs(t10[2])) / 2 }, tu = (t10) => ((t10 %= 360) < 0 && (t10 += 360), t10), tc = (t10) => Math.sqrt(t10[0] * t10[0] + t10[1] * t10[1]), td = (t10) => Math.sqrt(t10[4] * t10[4] + t10[5] * t10[5]), tm = { x: 12, y: 13, z: 14, translateX: 12, translateY: 13, translateZ: 14, scaleX: tc, scaleY: td, scale: (t10) => (tc(t10) + td(t10)) / 2, rotateX: (t10) => tu(ta(Math.atan2(t10[6], t10[5]))), rotateY: (t10) => tu(ta(Math.atan2(-t10[2], t10[0]))), rotateZ: tl, rotate: tl, skewX: (t10) => ta(Math.atan(t10[4])), skewY: (t10) => ta(Math.atan(t10[1])), skew: (t10) => (Math.abs(t10[1]) + Math.abs(t10[4])) / 2 };
  function tp(t10) {
    return +!!t10.includes("scale");
  }
  function tf(t10, e10) {
    let i2, s2;
    if (!t10 || "none" === t10) return tp(e10);
    let n2 = t10.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    if (n2) i2 = tm, s2 = n2;
    else {
      let e11 = t10.match(/^matrix\(([-\d.e\s,]+)\)$/u);
      i2 = th, s2 = e11;
    }
    if (!s2) return tp(e10);
    let r2 = i2[e10], o2 = s2[1].split(",").map(tg);
    return "function" == typeof r2 ? r2(o2) : o2[r2];
  }
  let ty = (t10, e10) => {
    let { transform: i2 = "none" } = getComputedStyle(t10);
    return tf(i2, e10);
  };
  function tg(t10) {
    return parseFloat(t10.trim());
  }
  t.s(["defaultTransformValue", 0, tp, "parseValueFromTransform", 0, tf, "readTransformValue", 0, ty], 81296);
  let tv = (t10) => t10 === r || t10 === x, tx = /* @__PURE__ */ new Set(["x", "y", "z"]), tT = i.filter((t10) => !tx.has(t10)), tb = /* @__PURE__ */ new Set(["bottom", "right"]);
  function tw(t10, e10, i2, s2, n2, r2) {
    let o2 = parseFloat(t10);
    if (!isNaN(o2)) return o2;
    let { min: a2, max: l2 } = e10()[i2], h2 = l2 - a2;
    return "border-box" === r2 ? h2 : h2 - parseFloat(s2) - parseFloat(n2);
  }
  let tS = { width: ({ width: t10, paddingLeft: e10 = "0", paddingRight: i2 = "0", boxSizing: s2 }, n2) => tw(t10, n2, "x", e10, i2, s2), height: ({ height: t10, paddingTop: e10 = "0", paddingBottom: i2 = "0", boxSizing: s2 }, n2) => tw(t10, n2, "y", e10, i2, s2), top: ({ top: t10 }) => parseFloat(t10), left: ({ left: t10 }) => parseFloat(t10), bottom: ({ top: t10 }, e10) => {
    let { y: i2 } = e10();
    return parseFloat(t10) + (i2.max - i2.min);
  }, right: ({ left: t10 }, e10) => {
    let { x: i2 } = e10();
    return parseFloat(t10) + (i2.max - i2.min);
  }, x: ({ transform: t10 }) => tf(t10, "x"), y: ({ transform: t10 }) => tf(t10, "y") };
  tS.translateX = tS.x, tS.translateY = tS.y;
  let tP = (t10) => t10;
  t.s(["noop", 0, tP], 60830);
  let tA = {};
  t.s(["MotionGlobalConfig", 0, tA], 46791);
  let tM = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"];
  function tE(t10, e10, i2 = { delta: 0, timestamp: 0, isProcessing: false }) {
    let s2 = false, n2 = true, r2 = () => s2 = true, o2 = tM.reduce((t11, e11) => (t11[e11] = /* @__PURE__ */ (function(t12) {
      let e12 = /* @__PURE__ */ new Set(), i3 = /* @__PURE__ */ new Set(), s3 = false, n3 = false, r3 = /* @__PURE__ */ new Set(), o3 = { delta: 0, timestamp: 0, isProcessing: false };
      function a3(e13) {
        r3.has(e13) && (i3.add(e13), t12()), e13(o3);
      }
      let l3 = { schedule: (t13, n4 = false, o4 = false) => {
        let a4 = o4 && s3 ? e12 : i3;
        return n4 && r3.add(t13), a4.add(t13), t13;
      }, cancel: (t13) => {
        i3.delete(t13), r3.delete(t13);
      }, process: (t13) => {
        if (o3 = t13, s3) {
          n3 = true;
          return;
        }
        s3 = true;
        let r4 = e12;
        e12 = i3, i3 = r4, e12.forEach(a3), e12.clear(), s3 = false, n3 && (n3 = false, l3.process(t13));
      } };
      return l3;
    })(r2), t11), {}), { setup: a2, read: l2, resolveKeyframes: h2, preUpdate: u2, update: c2, preRender: d2, render: m2, postRender: p2 } = o2, f2 = () => {
      let r3 = tA.useManualTiming, o3 = r3 ? i2.timestamp : performance.now();
      s2 = false, r3 || (i2.delta = n2 ? 1e3 / 60 : Math.max(Math.min(o3 - i2.timestamp, 40), 1)), i2.timestamp = o3, i2.isProcessing = true, a2.process(i2), l2.process(i2), h2.process(i2), u2.process(i2), c2.process(i2), d2.process(i2), m2.process(i2), p2.process(i2), i2.isProcessing = false, s2 && e10 && (n2 = false, t10(f2));
    };
    return { schedule: tM.reduce((e11, r3) => {
      let a3 = o2[r3];
      return e11[r3] = (e12, r4 = false, o3 = false) => (!s2 && (s2 = true, n2 = true, i2.isProcessing || t10(f2)), a3.schedule(e12, r4, o3)), e11;
    }, {}), cancel: (t11) => {
      for (let e11 = 0; e11 < tM.length; e11++) o2[tM[e11]].cancel(t11);
    }, state: i2, steps: o2 };
  }
  let tC = { delta: 0, timestamp: 0, isProcessing: false };
  t.s(["frameData", 0, tC], 48940);
  let { schedule: tV, cancel: tD, steps: tk } = tE("u" > typeof requestAnimationFrame ? requestAnimationFrame : tP, true, tC);
  t.s(["cancelFrame", 0, tD, "frame", 0, tV, "frameSteps", 0, tk], 87022);
  let tR = /* @__PURE__ */ new Set(), tL = false, tB = false, tF = false;
  function tj() {
    if (tB) {
      let t10 = [], e10 = /* @__PURE__ */ new Set(), i2 = /* @__PURE__ */ new Set();
      tR.forEach((s3) => {
        s3.needsMeasurement && (t10.push(s3), e10.add(s3.element), tb.has(s3.name) && i2.add(s3.element));
      });
      let s2 = /* @__PURE__ */ new Map();
      i2.forEach((t11) => {
        let e11, i3 = (e11 = [], tT.forEach((i4) => {
          let s3 = t11.getValue(i4);
          if (void 0 !== s3) {
            let t12 = s3.get(), n2 = +!!i4.startsWith("scale");
            if (t12 === n2) return;
            e11.push([i4, t12]), s3.set(n2);
          }
        }), e11);
        i3.length && (s2.set(t11, i3), t11.render());
      }), t10.forEach((t11) => t11.measureInitialState()), e10.forEach((t11) => {
        t11.render();
        let e11 = s2.get(t11);
        e11 && e11.forEach(([e12, i3]) => {
          t11.getValue(e12)?.set(i3);
        });
      }), t10.forEach((t11) => t11.measureEndState()), t10.forEach((t11) => {
        void 0 !== t11.suspendedScrollY && window.scrollTo(0, t11.suspendedScrollY);
      });
    }
    tB = false, tL = false, tR.forEach((t10) => t10.complete(tF)), tR.clear();
  }
  function tI() {
    tR.forEach((t10) => {
      t10.readKeyframes(), t10.needsMeasurement && (tB = true);
    });
  }
  class tO {
    constructor(t10, e10, i2, s2, n2, r2 = false) {
      this.state = "pending", this.isAsync = false, this.needsMeasurement = false, this.unresolvedKeyframes = [...t10], this.onComplete = e10, this.name = i2, this.motionValue = s2, this.element = n2, this.isAsync = r2;
    }
    scheduleResolve() {
      this.state = "scheduled", this.isAsync ? (tR.add(this), tL || (tL = true, tV.read(tI), tV.resolveKeyframes(tj))) : (this.readKeyframes(), this.complete());
    }
    readKeyframes() {
      let { unresolvedKeyframes: t10, name: e10, element: i2, motionValue: s2 } = this;
      if (null === t10[0]) {
        let n2 = s2?.get(), r2 = t10[t10.length - 1];
        if (void 0 !== n2) t10[0] = n2;
        else if (i2 && e10) {
          let s3 = (function(t11, e11, i3) {
            if ("string" == typeof t11) {
              if (/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t11) || /^0[^.\s]+$/u.test(t11)) return parseFloat(t11);
              if (!L.test(t11) && L.test(i3)) return to(e11, i3);
            }
            return t11 ?? void 0;
          })(i2.readValue(e10, r2), e10, r2);
          void 0 !== s3 && (t10[0] = s3);
        }
        void 0 === t10[0] && (t10[0] = r2), s2 && void 0 === n2 && s2.set(t10[0]);
      }
      for (let e11 = 1; e11 < t10.length; e11++) t10[e11] ?? (t10[e11] = t10[e11 - 1]);
    }
    setFinalKeyframe() {
    }
    measureInitialState() {
    }
    renderEndStyles() {
    }
    measureEndState() {
    }
    complete(t10 = false) {
      this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t10), tR.delete(this);
    }
    cancel() {
      "scheduled" === this.state && (tR.delete(this), this.state = "pending");
    }
    resume() {
      "pending" === this.state && this.scheduleResolve();
    }
  }
  t.s(["KeyframeResolver", 0, tO, "flushKeyframeResolvers", 0, function() {
    tF = true, tI(), tj(), tF = false;
  }], 21012);
  let tN = /* @__PURE__ */ new Set(["auto", "none", "0"]);
  class tU extends tO {
    constructor(t10, e10, i2, s2, n2) {
      super(t10, e10, i2, s2, n2, true);
    }
    readKeyframes() {
      let { unresolvedKeyframes: t10, element: e10, name: i2 } = this;
      if (!e10 || !e10.current) return;
      super.readKeyframes();
      for (let i3 = 0; i3 < t10.length; i3++) {
        let s3 = t10[i3];
        if ("string" == typeof s3 && te(s3 = s3.trim())) {
          let n3 = (function t11(e11, i4, s4 = 1) {
            Z(`Max CSS variable fallback depth detected in property "${e11}". This may indicate a circular fallback dependency.`);
            let [n4, r3] = (function(t12) {
              let e12 = tn.exec(t12);
              if (!e12) return [,];
              let [, i5, s5, n5] = e12;
              return [`--${i5 ?? s5}`, n5];
            })(e11);
            if (!n4) return;
            let o3 = window.getComputedStyle(i4).getPropertyValue(n4);
            if (o3) {
              let t12 = o3.trim();
              return /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t12) ? parseFloat(t12) : t12;
            }
            return te(r3) ? t11(r3, i4, s4 + 1) : r3;
          })(s3, e10.current);
          void 0 !== n3 && (t10[i3] = n3), i3 === t10.length - 1 && (this.finalKeyframe = s3);
        }
      }
      if (this.resolveNoneKeyframes(), !X.has(i2) || 2 !== t10.length) return;
      let [s2, n2] = t10;
      if ("number" == typeof s2 && "number" == typeof n2) return;
      let r2 = q(s2), o2 = q(n2);
      if (ts(s2) !== ts(n2) && tS[i2]) {
        this.needsMeasurement = true;
        return;
      }
      if (r2 !== o2) if (tv(r2) && tv(o2)) for (let e11 = 0; e11 < t10.length; e11++) {
        let i3 = t10[e11];
        "string" == typeof i3 && (t10[e11] = parseFloat(i3));
      }
      else tS[i2] && (this.needsMeasurement = true);
    }
    resolveNoneKeyframes() {
      let { unresolvedKeyframes: t10, name: e10 } = this, i2 = [];
      for (let e11 = 0; e11 < t10.length; e11++) (null === t10[e11] || (function(t11) {
        if ("number" == typeof t11) return 0 === t11;
        if (null === t11) return true;
        return "none" === t11 || "0" === t11 || /^0[^.\s]+$/u.test(t11);
      })(t10[e11])) && i2.push(e11);
      i2.length && (function(t11, e11, i3) {
        let s2, n2 = 0;
        for (; n2 < t11.length && !s2; ) {
          let e12 = t11[n2];
          "string" == typeof e12 && !tN.has(e12) && D(e12) && (s2 = t11[n2]), n2++;
        }
        if (s2 && i3) for (let n3 of e11) t11[n3] !== s2 && (t11[n3] = to(i3, s2));
      })(t10, i2, e10);
    }
    measure() {
      let { element: t10, name: e10 } = this;
      return tS[e10](window.getComputedStyle(t10.current), () => t10.measureViewportBox());
    }
    measureInitialState() {
      let { element: t10, unresolvedKeyframes: e10, name: i2 } = this;
      if (!t10 || !t10.current) return;
      "height" === i2 && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = this.measure(), e10[0] = this.measuredOrigin;
      let s2 = e10[e10.length - 1];
      void 0 !== s2 && this.motionValue?.jump(s2, false);
    }
    measureEndState() {
      let { element: t10, unresolvedKeyframes: e10 } = this;
      if (!t10 || !t10.current) return;
      this.motionValue?.jump(this.measuredOrigin, false);
      let i2 = e10.length - 1, s2 = e10[i2];
      e10[i2] = this.measure(), null !== s2 && void 0 === this.finalKeyframe && (this.finalKeyframe = s2), this.removedTransforms?.length && this.removedTransforms.forEach(([e11, i3]) => {
        t10.getValue(e11).set(i3);
      }), this.resolveNoneKeyframes();
    }
  }
  t.s(["DOMKeyframesResolver", 0, tU], 46436);
  let t$ = (t10) => 1e3 * t10, tW = (t10) => t10 / 1e3;
  function tz(t10, e10) {
    -1 === t10.indexOf(e10) && t10.push(e10);
  }
  function tG(t10, e10) {
    let i2 = t10.indexOf(e10);
    i2 > -1 && t10.splice(i2, 1);
  }
  t.s(["millisecondsToSeconds", 0, tW, "secondsToMilliseconds", 0, t$], 63074), t.s(["addUniqueItem", 0, tz, "removeItem", 0, tG], 33887);
  class tY {
    constructor() {
      this.subscriptions = [];
    }
    add(t10) {
      return tz(this.subscriptions, t10), () => this.remove(t10);
    }
    remove(t10) {
      tG(this.subscriptions, t10);
    }
    notify(t10, e10, i2) {
      let s2 = this.subscriptions.length;
      if (s2) if (1 === s2) this.subscriptions[0](t10, e10, i2);
      else for (let n2 = 0; n2 < s2; n2++) {
        let s3 = this.subscriptions[n2];
        s3 && s3(t10, e10, i2);
      }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  }
  t.s(["SubscriptionManager", 0, tY], 70596);
  let tH = (t10) => t10.startsWith("--");
  function tK(t10, e10, i2) {
    tH(e10) ? t10.style.setProperty(e10, i2) : t10.style[e10] = i2;
  }
  function tX(t10) {
    let e10;
    return () => (void 0 === e10 && (e10 = t10()), e10);
  }
  t.s(["isCSSVar", 0, tH], 34474), t.s(["setStyle", 0, tK], 94581), t.s(["memo", 0, tX], 60900);
  let t_ = {};
  function tq(t10, e10) {
    let i2 = tX(t10);
    return () => t_[e10] ?? i2();
  }
  let tZ = tq(() => void 0 !== window.ScrollTimeline, "scrollTimeline"), tJ = (t10) => null !== t10;
  function tQ(t10, { repeat: e10, repeatType: i2 = "loop" }, s2, n2 = 1) {
    let r2 = t10.filter(tJ), o2 = n2 < 0 || e10 && "loop" !== i2 && e10 % 2 == 1 ? 0 : r2.length - 1;
    return o2 && void 0 !== s2 ? s2 : r2[o2];
  }
  t.s(["getFinalKeyframe", 0, tQ], 14229);
  class t0 {
    constructor() {
      this.isResolved = false;
    }
    get finished() {
      return this._finished || (this._finished = this.isResolved ? Promise.resolve() : new Promise((t10) => {
        this._resolve = t10;
      })), this._finished;
    }
    updateFinished() {
      this._finished = this._resolve = void 0, this.isResolved = false;
    }
    notifyFinished() {
      this.isResolved = true, this._resolve?.();
    }
    then(t10, e10) {
      return this.finished.then(t10, e10);
    }
  }
  function t1() {
    e = void 0;
  }
  t.s(["WithPromise", 0, t0], 79294);
  let t2 = { now: () => (void 0 === e && t2.set(tC.isProcessing || tA.useManualTiming ? tC.timestamp : performance.now()), e), set: (t10) => {
    e = t10, queueMicrotask(t1);
  } };
  function t4(t10, e10) {
    return { kind: t10, animation: e10, timestamp: t2.now(), frameTimestamp: tC.timestamp, frameIsProcessing: tC.isProcessing };
  }
  function t5(t10, e10, i2) {
    let s2 = globalThis.__MOTION_INSPECT__;
    if (s2) try {
      s2({ ...t4("animation-start", t10), options: i2 ? { ...e10, ...i2 } : e10 });
    } catch {
    }
  }
  t.s(["time", 0, t2], 96173), t.s(["notifyAnimationStart", 0, t5, "notifyLayoutAnimationStart", 0, function(t10, e10) {
    let i2 = globalThis.__MOTION_INSPECT__;
    if (i2) try {
      i2({ ...t4("layout-animation-start", t10), node: e10 });
    } catch {
    }
  }], 49404);
  let t3 = (t10) => Array.isArray(t10) && "number" == typeof t10[0];
  t.s(["isBezierDefinition", 0, t3], 60855);
  let t6 = tq(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (t10) {
      return false;
    }
    return true;
  }, "linearEasing"), t7 = (t10, e10, i2 = 10) => {
    let s2 = "", n2 = Math.max(Math.round(e10 / i2), 2);
    for (let e11 = 0; e11 < n2; e11++) s2 += Math.round(1e4 * t10(e11 / (n2 - 1))) / 1e4 + ", ";
    return `linear(${s2.substring(0, s2.length - 2)})`;
  };
  t.s(["generateLinearEasing", 0, t7], 56512);
  let t8 = ([t10, e10, i2, s2]) => `cubic-bezier(${t10}, ${e10}, ${i2}, ${s2})`, t9 = { linear: "linear", ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out", circIn: t8([0, 0.65, 0.55, 1]), circOut: t8([0.55, 0, 1, 0.45]), backIn: t8([0.31, 0.01, 0.66, -0.59]), backOut: t8([0.33, 1.53, 0.69, 0.99]) };
  function et(t10) {
    return "function" == typeof t10 && "applyToOptions" in t10;
  }
  t.s(["isGenerator", 0, et], 97307);
  class ee extends t0 {
    constructor(t10) {
      if (super(), this.finishedTime = null, this.isStopped = false, this.manualStartTime = null, !t10) return;
      const { element: e10, name: i2, keyframes: s2, pseudoElement: n2, allowFlatten: r2 = false, finalKeyframe: o2, onComplete: a2 } = t10;
      this.isPseudoElement = !!n2, this.allowFlatten = r2, this.options = t10, Z(t10.type);
      const l2 = (function({ type: t11, ...e11 }) {
        return et(t11) && t6() ? t11.applyToOptions(e11) : (e11.duration ?? (e11.duration = 300), e11.ease ?? (e11.ease = "easeOut"), e11);
      })(t10);
      this.animation = (function(t11, e11, i3, { delay: s3 = 0, duration: n3 = 300, repeat: r3 = 0, repeatType: o3 = "loop", ease: a3 = "easeOut", times: l3 } = {}, h2) {
        let u2 = { [e11]: i3 };
        l3 && (u2.offset = l3);
        let c2 = (function t12(e12, i4) {
          if (e12) return "function" == typeof e12 ? t6() ? t7(e12, i4) : "ease-out" : t3(e12) ? t8(e12) : Array.isArray(e12) ? e12.map((e13) => t12(e13, i4) || t9.easeOut) : t9[e12];
        })(a3, n3);
        Array.isArray(c2) && (u2.easing = c2);
        let d2 = { delay: s3, duration: n3, easing: Array.isArray(c2) ? "linear" : c2, fill: "both", iterations: r3 + 1, direction: "reverse" === o3 ? "alternate" : "normal" };
        return h2 && (d2.pseudoElement = h2), t11.animate(u2, d2);
      })(e10, i2, s2, l2, n2), false === l2.autoplay && this.animation.pause(), this.animation.onfinish = () => {
        if (this.finishedTime = this.time, !n2) {
          let t11 = tQ(s2, this.options, o2, this.speed);
          this.updateMotionValue && this.updateMotionValue(t11), tK(e10, i2, t11), this.animation.cancel();
        }
        a2?.(), this.notifyFinished();
      }, t5(this, t10, l2);
    }
    play() {
      this.isStopped || (this.manualStartTime = null, this.animation.play(), "finished" === this.state && this.updateFinished());
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.finish?.();
    }
    cancel() {
      try {
        this.animation.cancel();
      } catch (t10) {
      }
    }
    stop() {
      if (this.isStopped) return;
      this.isStopped = true;
      let { state: t10 } = this;
      "idle" !== t10 && "finished" !== t10 && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
    }
    commitStyles() {
      let t10 = this.options?.element;
      !this.isPseudoElement && t10?.isConnected && this.animation.commitStyles?.();
    }
    get duration() {
      return tW(Number(this.animation.effect?.getComputedTiming?.().duration || 0));
    }
    get iterationDuration() {
      let { delay: t10 = 0 } = this.options || {};
      return this.duration + tW(t10);
    }
    get time() {
      return tW(Number(this.animation.currentTime) || 0);
    }
    set time(t10) {
      let e10 = null !== this.finishedTime;
      this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = t$(t10), e10 && this.animation.pause();
    }
    get speed() {
      return this.animation.playbackRate;
    }
    set speed(t10) {
      t10 < 0 && (this.finishedTime = null), this.animation.playbackRate = t10;
    }
    get state() {
      return null !== this.finishedTime ? "finished" : this.animation.playState;
    }
    get startTime() {
      return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(t10) {
      this.manualStartTime = this.animation.startTime = t10;
    }
    attachTimeline({ timeline: t10, onAttach: e10, observe: i2 }) {
      return (this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t10 && tZ()) ? (this.animation.timeline = t10, e10?.(this.animation), tP) : i2(this);
    }
  }
  t.s(["NativeAnimation", 0, ee], 68e3);
  let ei = /* @__PURE__ */ new Set(["opacity", "clipPath", "filter", "transform", "backgroundColor"]);
  t.s(["acceleratedValues", 0, ei], 62118);
  let { schedule: es } = tE(queueMicrotask, false);
  t.s(["microtask", 0, es], 60140);
  let en = (t10, e10) => e10 ? 1e3 / e10 * t10 : 0;
  t.s(["velocityPerSecond", 0, en], 25791);
  let er = { current: void 0 };
  class eo {
    constructor(t10, e10 = {}) {
      this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (t11) => {
        let e11 = t2.now();
        if (this.updatedAt !== e11 && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(t11), this.current !== this.prev && (this.notifyChange(), this.dependents)) for (let t12 of this.dependents) t12.dirty();
      }, this.hasAnimated = false, this.setCurrent(t10), this.owner = e10.owner;
    }
    setCurrent(t10) {
      this.current = t10, this.updatedAt = t2.now(), null === this.canTrackVelocity && void 0 !== t10 && (this.canTrackVelocity = !isNaN(parseFloat(this.current)));
    }
    setPrevFrameValue(t10 = this.current) {
      this.prevFrameValue = t10, this.prevUpdatedAt = this.updatedAt;
    }
    onChange(t10) {
      return this.on("change", t10);
    }
    on(t10, e10) {
      var i2;
      return "change" === t10 ? this.onChangeSubscribe(e10) : ((i2 = this.events)[t10] || (i2[t10] = new tY())).add(e10);
    }
    onChangeSubscribe(t10) {
      let { events: e10 } = this;
      return e10.change || this.changeSubscriber ? (e10.change || (e10.change = new tY(), e10.change.add(this.changeSubscriber), this.changeSubscriber = void 0), e10.change.add(t10)) : this.changeSubscriber = t10, () => {
        this.changeSubscriber === t10 ? this.changeSubscriber = void 0 : e10.change?.remove(t10), this.stopIfUnobserved();
      };
    }
    stopIfUnobserved() {
      tV.read(() => {
        this.changeSubscriber || this.events.change?.getSize() || this.stop();
      });
    }
    clearListeners() {
      for (let t10 in this.changeSubscriber = void 0, this.events) this.events[t10].clear();
    }
    attach(t10, e10) {
      this.passiveEffect = t10, this.stopPassiveEffect = e10;
    }
    set(t10) {
      this.passiveEffect ? this.passiveEffect(t10, this.updateAndNotify) : this.updateAndNotify(t10);
    }
    setWithVelocity(t10, e10, i2) {
      this.set(e10), this.prev = void 0, this.prevFrameValue = t10, this.prevUpdatedAt = this.updatedAt - i2;
    }
    jump(t10, e10 = true) {
      this.updateAndNotify(t10), this.prev = t10, this.prevUpdatedAt = this.prevFrameValue = void 0, e10 && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
    }
    dirty() {
      this.notifyChange();
    }
    notifyChange() {
      let { current: t10, changeSubscriber: e10 } = this;
      e10 ? e10(t10) : this.events.change?.notify(t10);
    }
    addDependent(t10) {
      this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t10);
    }
    removeDependent(t10) {
      this.dependents && this.dependents.delete(t10);
    }
    get() {
      return er.current && er.current.push(this), this.current;
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      let t10 = t2.now();
      if (!this.canTrackVelocity || void 0 === this.prevFrameValue || t10 - this.updatedAt > 30) return 0;
      let e10 = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
      return en(parseFloat(this.current) - parseFloat(this.prevFrameValue), e10);
    }
    start(t10) {
      return this.stop(), new Promise((e10) => {
        let i2;
        this.hasAnimated = true;
        let s2 = false;
        i2 = t10(() => {
          s2 = true, this.events.animationComplete?.notify(), this.animation === i2 && this.clearAnimation(), e10();
        }), s2 || (this.animation = i2), this.events.animationStart?.notify();
      });
    }
    stop() {
      this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      this.animation = void 0;
    }
    destroy() {
      this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
    }
  }
  function ea(t10, e10) {
    return new eo(t10, e10);
  }
  t.s(["MotionValue", 0, eo, "collectMotionValues", 0, er, "motionValue", 0, ea], 86427);
  let el = /* @__PURE__ */ new WeakMap();
  function eh(t10) {
    return null !== t10 && "object" == typeof t10 && "function" == typeof t10.start;
  }
  function eu(t10) {
    return "string" == typeof t10 || Array.isArray(t10);
  }
  t.s(["visualElementStore", 0, el], 72094), t.s(["isAnimationControls", 0, eh], 85983), t.s(["isVariantLabel", 0, eu], 32525);
  let ec = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"], ed = ["initial", ...ec];
  function em(t10) {
    if (eh(t10.animate)) return true;
    for (let e10 = 0; e10 < ed.length; e10++) if (eu(t10[ed[e10]])) return true;
    return false;
  }
  function ep(t10) {
    return !!(em(t10) || t10.variants);
  }
  t.s(["variantPriorityOrder", 0, ec, "variantProps", 0, ed], 6840);
  let ef = { current: null }, ey = { current: false };
  t.s(["hasReducedMotionListener", 0, ey, "prefersReducedMotion", 0, ef], 71164);
  let eg = "u" > typeof window;
  function ev() {
    if (ey.current = true, eg) if (window.matchMedia) {
      let t10 = window.matchMedia("(prefers-reduced-motion)"), e10 = () => ef.current = t10.matches;
      t10.addEventListener("change", e10), e10();
    } else ef.current = false;
  }
  t.s(["initPrefersReducedMotion", 0, ev], 38544);
  let ex = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"], eT = {};
  class eb {
    scrapeMotionValuesFromProps(t10, e10, i2) {
      return {};
    }
    constructor({ parent: t10, props: e10, presenceContext: i2, reducedMotionConfig: s2, skipAnimations: n2, blockInitialAnimation: r2, visualState: o2 }, a2 = {}) {
      this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = false, this.isControllingVariants = false, this.shouldReduceMotion = null, this.shouldSkipAnimations = false, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = tO, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = false, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
        this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
      }, this.renderScheduledAt = 0, this.scheduleRender = () => {
        let t11 = t2.now();
        this.renderScheduledAt < t11 && (this.renderScheduledAt = t11, tV.render(this.render, false, true));
      };
      const { latestValues: l2, renderState: h2 } = o2;
      this.latestValues = l2, this.baseTarget = { ...l2 }, this.initialValues = e10.initial ? { ...l2 } : {}, this.renderState = h2, this.parent = t10, this.props = e10, this.presenceContext = i2, this.depth = t10 ? t10.depth + 1 : 0, this.reducedMotionConfig = s2, this.skipAnimationsConfig = n2, this.options = a2, this.blockInitialAnimation = !!r2, this.isControllingVariants = em(e10), this.isVariantNode = ep(e10), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t10 && t10.current);
      const { willChange: u2, ...c2 } = this.scrapeMotionValuesFromProps(e10, {}, this);
      for (const t11 in c2) {
        const e11 = c2[t11];
        void 0 !== l2[t11] && K(e11) && e11.set(l2[t11]);
      }
    }
    mount(t10) {
      if (this.hasBeenMounted) for (let t11 in this.initialValues) this.values.get(t11)?.jump(this.initialValues[t11]), this.latestValues[t11] = this.initialValues[t11];
      if (this.current = t10, el.set(t10, this), this.projection && !this.projection.instance && this.projection.mount(t10), this.isVariantNode && !this.isControllingVariants) {
        let t11 = this;
        do
          t11 = false !== t11.props.inherit && t11.parent;
        while (t11 && !t11.isVariantNode);
        if (t11) {
          let { variantChildren: e10 } = t11;
          e10.add(this), this.removeFromVariantTree = () => e10.delete(this);
        }
      }
      this.values.forEach((t11, e10) => this.bindToMotionValue(e10, t11)), "never" === this.reducedMotionConfig ? this.shouldReduceMotion = false : "always" === this.reducedMotionConfig ? this.shouldReduceMotion = true : (ey.current || ev(), this.shouldReduceMotion = ef.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? false, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = true;
    }
    unmount() {
      for (let t10 in this.projection && this.projection.unmount(), tD(this.notifyUpdate), tD(this.render), this.valueSubscriptions.forEach((t11) => t11()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this), this.events) this.events[t10].clear();
      for (let t10 in this.features) {
        let e10 = this.features[t10];
        e10 && (e10.unmount(), e10.isMounted = false);
      }
      this.current = null;
    }
    addChild(t10) {
      this.children.add(t10), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t10);
    }
    removeChild(t10) {
      this.children.delete(t10), this.enteringChildren && this.enteringChildren.delete(t10);
    }
    bindToMotionValue(t10, e10) {
      let i2;
      if (this.valueSubscriptions.has(t10) && this.valueSubscriptions.get(t10)(), e10.accelerate && ei.has(t10) && this.current instanceof HTMLElement) {
        let { factory: i3, keyframes: s2, times: n3, ease: r3, duration: o2 } = e10.accelerate, a2 = new ee({ element: this.current, name: t10, keyframes: s2, times: n3, ease: r3, duration: t$(o2) }), l2 = i3(a2);
        this.valueSubscriptions.set(t10, () => {
          l2(), a2.cancel();
        });
        return;
      }
      let n2 = s.has(t10);
      n2 && this.onBindTransform && this.onBindTransform();
      let r2 = e10.on("change", (e11) => {
        this.latestValues[t10] = e11, this.props.onUpdate && tV.preRender(this.notifyUpdate), n2 && this.projection && (this.projection.isTransformDirty = true), this.scheduleRender();
      });
      "u" > typeof window && window.MotionCheckAppearSync && (i2 = window.MotionCheckAppearSync(this, t10, e10)), this.valueSubscriptions.set(t10, () => {
        r2(), i2 && i2();
      });
    }
    sortNodePosition(t10) {
      return this.current && t10.current && this.sortInstanceNodePosition && this.type === t10.type ? this.sortInstanceNodePosition(this.current, t10.current) : 0;
    }
    updateFeatures() {
      let t10 = "animation";
      for (t10 in eT) {
        let e10 = eT[t10];
        if (!e10) continue;
        let { isEnabled: i2, Feature: s2 } = e10;
        if (!this.features[t10] && s2 && i2(this.props) && (this.features[t10] = new s2(this)), this.features[t10]) {
          let e11 = this.features[t10];
          e11.isMounted ? e11.update() : (e11.mount(), e11.isMounted = true);
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : H();
    }
    getStaticValue(t10) {
      return this.latestValues[t10];
    }
    setStaticValue(t10, e10) {
      this.latestValues[t10] = e10;
    }
    update(t10, e10) {
      (t10.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t10, this.prevPresenceContext = this.presenceContext, this.presenceContext = e10;
      for (let e11 = 0; e11 < ex.length; e11++) {
        let i2 = ex[e11];
        this.propEventSubscriptions[i2] && (this.propEventSubscriptions[i2](), delete this.propEventSubscriptions[i2]);
        let s2 = t10["on" + i2];
        s2 && (this.propEventSubscriptions[i2] = this.on(i2, s2));
      }
      this.prevMotionValues = (function(t11, e11, i2) {
        for (let s2 in e11) {
          let n2 = e11[s2], r2 = i2[s2];
          if (K(n2)) t11.addValue(s2, n2);
          else if (K(r2)) t11.addValue(s2, ea(n2, { owner: t11 }));
          else if (r2 !== n2) if (t11.hasValue(s2)) {
            let e12 = t11.getValue(s2);
            true === e12.liveStyle ? e12.jump(n2) : e12.hasAnimated || e12.set(n2);
          } else {
            let e12 = t11.getStaticValue(s2);
            t11.addValue(s2, ea(void 0 !== e12 ? e12 : n2, { owner: t11 }));
          }
        }
        for (let s2 in i2) void 0 === e11[s2] && t11.removeValue(s2);
        return e11;
      })(this, this.scrapeMotionValuesFromProps(t10, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
    }
    getProps() {
      return this.props;
    }
    getVariant(t10) {
      return this.props.variants ? this.props.variants[t10] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    addValue(t10, e10) {
      let i2 = this.values.get(t10);
      if (e10 !== i2) {
        i2 && this.removeValue(t10), this.bindToMotionValue(t10, e10), this.values.set(t10, e10);
        let s2 = e10.get();
        void 0 !== s2 && (this.latestValues[t10] = s2);
      }
    }
    removeValue(t10) {
      this.values.delete(t10);
      let e10 = this.valueSubscriptions.get(t10);
      e10 && (e10(), this.valueSubscriptions.delete(t10)), delete this.latestValues[t10], this.removeValueFromRenderState(t10, this.renderState);
    }
    hasValue(t10) {
      return this.values.has(t10);
    }
    getValue(t10, e10) {
      if (this.props.values && this.props.values[t10]) return this.props.values[t10];
      let i2 = this.values.get(t10);
      return void 0 === i2 && void 0 !== e10 && (i2 = ea(e10 ?? this.getDefaultValue?.(t10), { owner: this }), this.addValue(t10, i2)), i2;
    }
    readValue(t10, e10) {
      let i2 = void 0 === this.latestValues[t10] && this.current ? this.getBaseTargetFromProps(this.props, t10) ?? this.readValueFromInstance(this.current, t10, this.options) : this.latestValues[t10];
      if (null != i2) {
        let s2, n2;
        "string" == typeof i2 && (s2 = i2, /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s2) || (n2 = i2, /^0[^.\s]+$/u.test(n2))) ? i2 = parseFloat(i2) : "number" != typeof i2 && !L.test(i2) && L.test(e10) && (i2 = to(t10, e10)), this.setBaseTarget(t10, K(i2) ? i2.get() : i2);
      }
      return K(i2) ? i2.get() : i2;
    }
    setBaseTarget(t10, e10) {
      this.baseTarget[t10] = e10;
    }
    on(t10, e10) {
      return this.events[t10] || (this.events[t10] = new tY()), this.events[t10].add(e10);
    }
    notify(t10, ...e10) {
      this.events[t10] && this.events[t10].notify(...e10);
    }
    scheduleRenderMicrotask() {
      es.render(this.render);
    }
  }
  class ew extends eb {
    constructor() {
      super(...arguments), this.KeyframeResolver = tU;
    }
    sortInstanceNodePosition(t10, e10) {
      return 2 & t10.compareDocumentPosition(e10) ? 1 : -1;
    }
    getBaseTargetFromProps(t10, e10) {
      let i2 = t10.style;
      return i2 ? i2[e10] : void 0;
    }
    removeValueFromRenderState(t10, { vars: e10, style: i2 }) {
      delete e10[t10], delete i2[t10];
    }
    handleChildMotionValue() {
      this.childSubscription && (this.childSubscription(), delete this.childSubscription);
      let { children: t10 } = this.props;
      K(t10) && (this.childSubscription = t10.on("change", (t11) => {
        this.current && (this.current.textContent = `${t11}`);
      }));
    }
  }
  function eS(t10) {
    return t10.replace(/([A-Z])/g, (t11) => `-${t11.toLowerCase()}`);
  }
  t.s(["camelToDash", 0, eS], 93787);
  let eP = (t10, e10) => e10 && "number" == typeof t10 ? e10.transform(t10) : t10;
  t.s(["getValueAsType", 0, eP], 46124);
  let eA = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" }, eM = i.length;
  function eE(t10, e10, n2) {
    let { style: r2, vars: o2, transformOrigin: a2 } = t10, l2 = false, h2 = false;
    for (let t11 in e10) {
      let i2 = e10[t11];
      if (s.has(t11)) {
        l2 = true;
        continue;
      }
      if (Q(t11)) {
        o2[t11] = i2;
        continue;
      }
      {
        let e11 = eP(i2, $[t11]);
        t11.startsWith("origin") ? (h2 = true, a2[t11] = e11) : r2[t11] = e11;
      }
    }
    if (!e10.transform && (l2 || n2 ? r2.transform = (function(t11, e11, s2) {
      let n3 = "", r3 = true;
      for (let o4 = 0; o4 < eM; o4++) {
        let a3 = i[o4], l3 = t11[a3];
        if (void 0 === l3) continue;
        let h3 = true;
        if ("number" == typeof l3) h3 = l3 === +!!a3.startsWith("scale");
        else {
          let t12 = parseFloat(l3);
          h3 = a3.startsWith("scale") ? 1 === t12 : 0 === t12;
        }
        if (!h3 || s2) {
          let t12 = eP(l3, $[a3]);
          if (!h3) {
            r3 = false;
            let e12 = eA[a3] || a3;
            n3 += `${e12}(${t12}) `;
          }
          s2 && (e11[a3] = t12);
        }
      }
      let o3 = t11.pathRotation;
      return o3 && (r3 = false, n3 += `rotate(${eP(o3, $.pathRotation)}) `), n3 = n3.trim(), s2 ? n3 = s2(e11, r3 ? "" : n3) : r3 && (n3 = "none"), n3;
    })(e10, t10.transform, n2) : r2.transform && (r2.transform = "none")), h2) {
      let { originX: t11 = "50%", originY: e11 = "50%", originZ: i2 = 0 } = a2;
      r2.transformOrigin = `${t11} ${e11} ${i2}`;
    }
  }
  let eC = { offset: "stroke-dashoffset", array: "stroke-dasharray" }, eV = { offset: "strokeDashoffset", array: "strokeDasharray" }, eD = ["transform", "opacity", "offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
  function ek(t10, { attrX: e10, attrY: i2, attrScale: s2, pathLength: n2, pathSpacing: r2 = 1, pathOffset: o2 = 0, ...a2 }, l2, h2, u2) {
    if (eE(t10, a2, h2), l2) {
      t10.style.viewBox && (t10.attrs.viewBox = t10.style.viewBox);
      return;
    }
    t10.attrs = t10.style, t10.style = {};
    let { attrs: c2, style: d2 } = t10;
    for (let t11 of eD) void 0 !== c2[t11] && (d2[t11] = c2[t11], delete c2[t11]);
    (d2.transform || c2.transformOrigin) && (d2.transformOrigin = c2.transformOrigin ?? "50% 50%", delete c2.transformOrigin), d2.transform && (d2.transformBox = u2?.transformBox ?? "fill-box", delete c2.transformBox), void 0 !== e10 && (c2.x = e10), void 0 !== i2 && (c2.y = i2), void 0 !== s2 && (c2.scale = s2), void 0 !== n2 && (function(t11, e11, i3 = 1, s3 = 0, n3 = true) {
      t11.pathLength = 1;
      let r3 = n3 ? eC : eV;
      t11[r3.offset] = `${-s3}`, t11[r3.array] = `${e11} ${i3}`;
    })(c2, n2, r2, o2, false);
  }
  t.s(["buildSVGAttrs", 0, ek, "cssStyleProperties", 0, eD], 81261);
  let eR = /* @__PURE__ */ new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]), eL = (t10) => "string" == typeof t10 && "svg" === t10.toLowerCase();
  function eB(t10, { style: e10, vars: i2 }, s2, n2) {
    let r2, o2 = t10.style;
    for (r2 in e10) o2[r2] = e10[r2];
    for (r2 in n2?.applyProjectionStyles(o2, s2), i2) o2.setProperty(r2, i2[r2]);
  }
  let eF = {};
  function ej(t10, { layout: e10, layoutId: i2 }) {
    return s.has(t10) || t10.startsWith("origin") || (e10 || void 0 !== i2) && (!!eF[t10] || "opacity" === t10);
  }
  function eI(t10, e10, i2) {
    let s2 = t10.style, n2 = e10?.style, r2 = {};
    if (!s2) return r2;
    for (let e11 in s2) (K(s2[e11]) || n2 && K(n2[e11]) || ej(e11, t10) || i2?.getValue(e11)?.liveStyle !== void 0) && (r2[e11] = s2[e11]);
    return r2;
  }
  function eO(t10, e10, s2) {
    let n2 = eI(t10, e10, s2);
    for (let s3 in t10) (K(t10[s3]) || K(e10[s3])) && (n2[-1 !== i.indexOf(s3) ? "attr" + s3.charAt(0).toUpperCase() + s3.substring(1) : s3] = t10[s3]);
    return n2;
  }
  t.s(["scaleCorrectors", 0, eF], 24463);
  class eN extends ew {
    constructor() {
      super(...arguments), this.type = "svg", this.isSVGTag = false, this.measureInstanceViewportBox = H;
    }
    getBaseTargetFromProps(t10, e10) {
      return s.has(e10) ? super.getBaseTargetFromProps(t10, e10) ?? tp(e10) : t10[e10];
    }
    getDefaultValue(t10) {
      return s.has(t10) ? this.latestValues[t10] ?? tp(t10) : void 0;
    }
    readValueFromInstance(t10, e10) {
      if (s.has(e10)) {
        let t11 = z(e10);
        return t11 && t11.default || 0;
      }
      if (eD.includes(e10)) {
        let i2 = getComputedStyle(t10)[e10];
        if ("string" == typeof i2 && i2) return i2.trim();
      }
      return e10 = eR.has(e10) ? e10 : eS(e10), t10.getAttribute(e10);
    }
    scrapeMotionValuesFromProps(t10, e10, i2) {
      return eO(t10, e10, i2);
    }
    build(t10, e10, i2) {
      ek(t10, e10, this.isSVGTag, i2.transformTemplate, i2.style);
    }
    renderInstance(t10, e10, i2, s2) {
      for (let i3 in eB(t10, e10, void 0, s2), e10.attrs) t10.setAttribute(eR.has(i3) ? i3 : eS(i3), e10.attrs[i3]);
    }
    mount(t10) {
      this.isSVGTag = eL(t10.tagName), super.mount(t10);
    }
  }
  function eU({ top: t10, left: e10, right: i2, bottom: s2 }) {
    return { x: { min: e10, max: i2 }, y: { min: t10, max: s2 } };
  }
  function e$(t10, e10) {
    if (!e10) return t10;
    let i2 = e10({ x: t10.left, y: t10.top }), s2 = e10({ x: t10.right, y: t10.bottom });
    return { top: i2.y, left: i2.x, bottom: s2.y, right: s2.x };
  }
  t.s(["convertBoundingBoxToBox", 0, eU, "convertBoxToBoundingBox", 0, function({ x: t10, y: e10 }) {
    return { top: e10.min, right: t10.max, bottom: e10.max, left: t10.min };
  }, "transformBoxPoints", 0, e$], 27677);
  let eW = (t10, e10, i2) => t10 + (e10 - t10) * i2;
  function ez(t10) {
    return void 0 === t10 || 1 === t10;
  }
  function eG({ scale: t10, scaleX: e10, scaleY: i2 }) {
    return !ez(t10) || !ez(e10) || !ez(i2);
  }
  function eY(t10) {
    return eG(t10) || eH(t10) || t10.z || t10.rotate || t10.rotateX || t10.rotateY || t10.skewX || t10.skewY;
  }
  function eH(t10) {
    var e10, i2;
    return (e10 = t10.x) && "0%" !== e10 || (i2 = t10.y) && "0%" !== i2;
  }
  function eK(t10, e10, i2) {
    return i2 + e10 * (t10 - i2);
  }
  function eX(t10, e10, i2, s2, n2) {
    return void 0 !== n2 && (t10 = eK(t10, n2, s2)), eK(t10, i2, s2) + e10;
  }
  function e_(t10, e10 = 0, i2 = 1, s2, n2) {
    t10.min = eX(t10.min, e10, i2, s2, n2), t10.max = eX(t10.max, e10, i2, s2, n2);
  }
  function eq(t10, { x: e10, y: i2 }) {
    e_(t10.x, e10.translate, e10.scale, e10.originPoint), e_(t10.y, i2.translate, i2.scale, i2.originPoint);
  }
  function eZ(t10, e10) {
    t10.min += e10, t10.max += e10;
  }
  function eJ(t10, e10, i2, s2, n2 = 0.5) {
    let r2 = eW(t10.min, t10.max, n2);
    e_(t10, e10, i2, r2, s2);
  }
  function eQ(t10, e10) {
    return "string" == typeof t10 ? parseFloat(t10) / 100 * (e10.max - e10.min) : t10;
  }
  function e0(t10, e10, i2) {
    let s2 = i2 ?? t10;
    eJ(t10.x, eQ(e10.x, s2.x), e10.scaleX, e10.scale, e10.originX), eJ(t10.y, eQ(e10.y, s2.y), e10.scaleY, e10.scale, e10.originY);
  }
  function e1(t10, e10) {
    return eU(e$(t10.getBoundingClientRect(), e10));
  }
  t.s(["mixNumber", 0, eW], 706), t.s(["has2DTranslate", 0, eH, "hasScale", 0, eG, "hasTransform", 0, eY], 77777), t.s(["applyBoxDelta", 0, eq, "applyTreeDeltas", 0, function(t10, e10, i2, s2 = false) {
    let n2, r2, o2 = i2.length;
    if (o2) {
      e10.x = e10.y = 1;
      for (let a2 = 0; a2 < o2; a2++) {
        r2 = (n2 = i2[a2]).projectionDelta;
        let { visualElement: o3 } = n2.options;
        (!o3 || !o3.props.style || "contents" !== o3.props.style.display) && (s2 && n2.options.layoutScroll && n2.scroll && n2 !== n2.root && (eZ(t10.x, -n2.scroll.offset.x), eZ(t10.y, -n2.scroll.offset.y)), r2 && (e10.x *= r2.x.scale, e10.y *= r2.y.scale, eq(t10, r2)), s2 && eY(n2.latestValues) && e0(t10, n2.latestValues, n2.layout?.layoutBox));
      }
      e10.x < 1.0000000000001 && e10.x > 0.999999999999 && (e10.x = 1), e10.y < 1.0000000000001 && e10.y > 0.999999999999 && (e10.y = 1);
    }
  }, "scalePoint", 0, eK, "transformBox", 0, e0, "translateAxis", 0, eZ], 35636), t.s(["measurePageBox", 0, function(t10, e10, i2) {
    let s2 = e1(t10, i2), { scroll: n2 } = e10;
    return n2 && (eZ(s2.x, n2.offset.x), eZ(s2.y, n2.offset.y)), s2;
  }, "measureViewportBox", 0, e1], 53689);
  class e2 extends ew {
    constructor() {
      super(...arguments), this.type = "html", this.renderInstance = eB;
    }
    mount(t10) {
      Z(t10.style), super.mount(t10);
    }
    readValueFromInstance(t10, e10) {
      if (s.has(e10)) return this.projection?.isProjecting ? tp(e10) : ty(t10, e10);
      {
        let i2 = window.getComputedStyle(t10), s2 = (Q(e10) ? i2.getPropertyValue(e10) : i2[e10]) || 0;
        return "string" == typeof s2 ? s2.trim() : s2;
      }
    }
    measureInstanceViewportBox(t10, { transformPagePoint: e10 }) {
      return e1(t10, e10);
    }
    build(t10, e10, i2) {
      eE(t10, e10, i2.transformTemplate);
    }
    scrapeMotionValuesFromProps(t10, e10, i2) {
      return eI(t10, e10, i2);
    }
  }
  var e4 = t.i(71645);
  let e5 = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
  function e3(t10) {
    if ("string" != typeof t10 || t10.includes("-")) ;
    else if (e5.indexOf(t10) > -1 || /[A-Z]/u.test(t10)) return true;
    return false;
  }
  t.s(["createDomVisualElement", 0, (t10, e10) => e10.isSVG ?? e3(t10) ? new eN(e10) : new e2(e10, { allowProjection: t10 !== e4.Fragment })], 54505);
  var e6 = t.i(43476), e7 = t.i(31178);
  let e8 = (0, e4.createContext)({ strict: false });
  var e9 = t.i(37806);
  let it = (0, e4.createContext)({});
  function ie(t10) {
    return Array.isArray(t10) ? t10.join(" ") : t10;
  }
  let ii = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
  function is(t10, e10, i2) {
    for (let s2 in e10) K(e10[s2]) || ej(s2, i2) || (t10[s2] = e10[s2]);
  }
  let ir = () => ({ ...ii(), attrs: {} }), io = /* @__PURE__ */ new Set(["animate", "exit", "variants", "initial", "style", "values", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "propagate", "ignoreStrict", "viewport"]);
  function ia(t10) {
    return t10.startsWith("while") || t10.startsWith("drag") && "draggable" !== t10 || t10.startsWith("layout") || t10.startsWith("onTap") || t10.startsWith("onPan") || t10.startsWith("onLayout") || io.has(t10);
  }
  function il(t10) {
    return K(t10) ? t10.get() : t10;
  }
  function ih(t10, e10, i2, s2) {
    let n2 = (e11) => {
      let n3;
      return "function" == typeof e11 ? e11(void 0 !== i2 ? i2 : t10.custom, ...(n3 = [{}, {}], s2?.values.forEach((t11, e12) => {
        n3[0][e12] = t11.get(), n3[1][e12] = t11.getVelocity();
      }), n3)) : e11;
    };
    return "string" == typeof (e10 = n2(e10)) && (e10 = t10.variants && t10.variants[e10]), n2(e10);
  }
  t.s(["resolveMotionValue", 0, il], 33871);
  var iu = t.i(21476), ic = t.i(47414);
  let id = (t10) => (e10, i2) => {
    let s2 = (0, e4.useContext)(it), n2 = (0, e4.useContext)(iu.PresenceContext), r2 = () => (function({ scrapeMotionValuesFromProps: t11, createRenderState: e11 }, i3, s3, n3) {
      return { latestValues: (function(t12, e12, i4, s4) {
        let n4 = {}, r3 = s4(t12, {});
        for (let t13 in r3) n4[t13] = il(r3[t13]);
        let { initial: o2, animate: a2 } = t12, l2 = em(t12), h2 = ep(t12);
        e12 && h2 && !l2 && false !== t12.inherit && (void 0 === o2 && (o2 = e12.initial), void 0 === a2 && (a2 = e12.animate));
        let u2 = !!i4 && false === i4.initial, c2 = (u2 = u2 || false === o2) ? a2 : o2;
        if (c2 && "boolean" != typeof c2 && !eh(c2)) {
          let e13 = Array.isArray(c2) ? c2 : [c2];
          for (let i5 = 0; i5 < e13.length; i5++) {
            let s5 = ih(t12, e13[i5]);
            if (s5) {
              let { transitionEnd: t13, transition: e14, ...i6 } = s5;
              for (let t14 in i6) {
                let e15 = i6[t14];
                if (Array.isArray(e15)) {
                  let t15 = u2 ? e15.length - 1 : 0;
                  e15 = e15[t15];
                }
                null !== e15 && (n4[t14] = e15);
              }
              for (let e15 in t13) n4[e15] = t13[e15];
            }
          }
        }
        return n4;
      })(i3, s3, n3, t11), renderState: e11() };
    })(t10, e10, s2, n2);
    return i2 ? r2() : (0, ic.useConstant)(r2);
  }, im = id({ scrapeMotionValuesFromProps: eI, createRenderState: ii }), ip = id({ scrapeMotionValuesFromProps: eO, createRenderState: ir }), iy = { animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"], exit: ["exit"], drag: ["drag", "dragControls"], focus: ["whileFocus"], hover: ["whileHover", "onHoverStart", "onHoverEnd"], tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"], pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"], inView: ["whileInView", "onViewportEnter", "onViewportLeave"], layout: ["layout", "layoutId"] }, ig = false;
  function iv() {
    return !(function() {
      if (ig) return;
      let t10 = {};
      for (let e10 in iy) t10[e10] = { isEnabled: (t11) => iy[e10].some((e11) => !!t11[e11]) };
      eT = t10, ig = true;
    })(), eT;
  }
  let ix = Symbol.for("motionComponentSymbol"), iT = "data-" + eS("framerAppearId");
  t.s(["optimizedAppearDataAttribute", 0, iT], 35043);
  let ib = (0, e4.createContext)({});
  function iw(t10) {
    return t10 && "object" == typeof t10 && Object.prototype.hasOwnProperty.call(t10, "current");
  }
  t.s(["SwitchLayoutGroupContext", 0, ib], 4035), t.s(["isRefObject", 0, iw], 25522);
  var iS = t.i(74008);
  function iP(t10, { forwardMotionProps: e10 = false, type: i2 } = {}, s2, n2) {
    s2 && (function(t11) {
      let e11 = iv();
      for (let i3 in t11) e11[i3] = { ...e11[i3], ...t11[i3] };
      eT = e11;
    })(s2);
    let r2 = i2 ? "svg" === i2 : e3(t10), o2 = r2 ? ip : im;
    function a2(i3, s3) {
      var a3;
      let l3, h2, u2, c2 = { ...(0, e4.useContext)(e9.MotionConfigContext), ...i3, layoutId: (function({ layoutId: t11 }) {
        let e11 = (0, e4.useContext)(e7.LayoutGroupContext).id;
        return e11 && void 0 !== t11 ? e11 + "-" + t11 : t11;
      })(i3) }, { isStatic: d2, isValidProp: m2 } = c2, p2 = (function(t11) {
        let { initial: e11, animate: i4 } = (function(t12, e12) {
          if (em(t12)) {
            let { initial: e13, animate: i5 } = t12;
            return { initial: false === e13 || eu(e13) ? e13 : void 0, animate: eu(i5) ? i5 : void 0 };
          }
          return false !== t12.inherit ? e12 : {};
        })(t11, (0, e4.useContext)(it));
        return (0, e4.useMemo)(() => ({ initial: e11, animate: i4 }), [ie(e11), ie(i4)]);
      })(i3), f2 = o2(i3, d2);
      if (!d2 && "u" > typeof window) {
        (0, e4.useContext)(e8).strict;
        let e11 = (function(t11) {
          let { drag: e12, layout: i4 } = iv();
          if (!e12 && !i4) return {};
          let s4 = { ...e12, ...i4 };
          return { MeasureLayout: e12?.isEnabled(t11) || i4?.isEnabled(t11) ? s4.MeasureLayout : void 0, ProjectionNode: s4.ProjectionNode };
        })(c2);
        l3 = e11.MeasureLayout, p2.visualElement = (function(t11, e12, i4, s4, n3, r3) {
          let { visualElement: o3 } = (0, e4.useContext)(it), a4 = (0, e4.useContext)(e8), l4 = (0, e4.useContext)(iu.PresenceContext), h3 = (0, e4.useContext)(e9.MotionConfigContext), u3 = h3.reducedMotion, c3 = h3.skipAnimations, d3 = (0, e4.useRef)(null), m3 = (0, e4.useRef)(false);
          s4 = s4 || a4.renderer, !d3.current && s4 && (d3.current = s4(t11, { visualState: e12, parent: o3, props: i4, presenceContext: l4, blockInitialAnimation: !!l4 && false === l4.initial, reducedMotionConfig: u3, skipAnimations: c3, isSVG: r3 }), m3.current && d3.current && (d3.current.manuallyAnimateOnMount = true));
          let p3 = d3.current, f3 = (0, e4.useContext)(ib);
          p3 && !p3.projection && n3 && ("html" === p3.type || "svg" === p3.type) && (function(t12, e13, i5, s5) {
            let { layoutId: n4, layout: r4, drag: o4, dragConstraints: a5, layoutScroll: l5, layoutRoot: h4, layoutAnchor: u4, layoutCrossfade: c4 } = e13;
            t12.projection = new i5(t12.latestValues, e13["data-framer-portal-id"] ? void 0 : (function t13(e14) {
              if (e14) return false !== e14.options.allowProjection ? e14.projection : t13(e14.parent);
            })(t12.parent)), t12.projection.setOptions({ layoutId: n4, layout: r4, alwaysMeasureLayout: !!o4 || a5 && iw(a5), visualElement: t12, animationType: "string" == typeof r4 ? r4 : "both", initialPromotionConfig: s5, crossfade: c4, layoutScroll: l5, layoutRoot: h4, layoutAnchor: u4 });
          })(d3.current, i4, n3, f3);
          let y2 = (0, e4.useRef)(false);
          (0, e4.useInsertionEffect)(() => {
            p3 && y2.current && p3.update(i4, l4);
          });
          let g2 = i4[iT], v2 = (0, e4.useRef)(!!g2 && "u" > typeof window && !window.MotionHandoffIsComplete?.(g2) && window.MotionHasOptimisedAnimation?.(g2));
          return (0, iS.useIsomorphicLayoutEffect)(() => {
            m3.current && p3 && (p3.animationState?.animateChanges(), p3.enteringChildren = void 0);
          }, []), (0, iS.useIsomorphicLayoutEffect)(() => {
            m3.current = true, p3 && (y2.current = true, window.MotionIsMounted = true, p3.updateFeatures(), p3.scheduleRenderMicrotask(), v2.current && p3.animationState && p3.animationState.animateChanges());
          }), (0, e4.useEffect)(() => {
            p3 && (!v2.current && p3.animationState && p3.animationState.animateChanges(), v2.current && (queueMicrotask(() => {
              window.MotionHandoffMarkAsComplete?.(g2);
            }), v2.current = false), p3.enteringChildren = void 0);
          }), p3;
        })(t10, f2, c2, n2, e11.ProjectionNode, r2);
      }
      return (0, e6.jsxs)(it.Provider, { value: p2, children: [l3 && p2.visualElement ? (0, e6.jsx)(l3, { visualElement: p2.visualElement, ...c2 }) : null, (function(t11, e11, i4, { latestValues: s4 }, n3, r3 = false, o3, a4) {
        let l4 = (o3 ?? e3(t11) ? function(t12, e12, i5, s5) {
          let n4 = (0, e4.useMemo)(() => {
            let i6 = ir();
            return ek(i6, e12, eL(s5), t12.transformTemplate, t12.style), { ...i6.attrs, style: { ...i6.style } };
          }, [e12]);
          if (t12.style) {
            let e13 = {};
            is(e13, t12.style, t12), n4.style = { ...e13, ...n4.style };
          }
          return n4;
        } : function(t12, e12) {
          let i5, s5, n4 = {}, r4 = (i5 = t12.style || {}, is(s5 = {}, i5, t12), Object.assign(s5, (function({ transformTemplate: t13 }, e13) {
            return (0, e4.useMemo)(() => {
              let i6 = ii();
              return eE(i6, e13, t13), Object.assign({}, i6.vars, i6.style);
            }, [e13]);
          })(t12, e12)), s5);
          return t12.drag && false !== t12.dragListener && (n4.draggable = false, r4.userSelect = r4.WebkitUserSelect = r4.WebkitTouchCallout = "none", r4.touchAction = true === t12.drag ? "none" : `pan-${"x" === t12.drag ? "y" : "x"}`), void 0 === t12.tabIndex && (t12.onTap || t12.onTapStart || t12.whileTap) && (n4.tabIndex = 0), n4.style = r4, n4;
        })(e11, s4, n3, t11), h3 = (function(t12, e12, i5, s5) {
          let n4 = {};
          for (let r4 in t12) ("values" !== r4 || "object" != typeof t12.values) && !K(t12[r4]) && ((r4.startsWith("on") ? !ia(r4) : s5?.(r4) ?? !ia(r4)) || true === i5 && ia(r4) || !e12 && !ia(r4) || t12.draggable && r4.startsWith("onDrag")) && (n4[r4] = t12[r4]);
          return n4;
        })(e11, "string" == typeof t11, r3, a4), u3 = t11 !== e4.Fragment ? { ...h3, ...l4, ref: i4 } : {}, { children: c3 } = e11, d3 = (0, e4.useMemo)(() => K(c3) ? c3.get() : c3, [c3]);
        return (0, e4.createElement)(t11, { ...u3, children: d3 });
      })(t10, i3, (a3 = p2.visualElement, h2 = (0, e4.useRef)(s3), (0, e4.useInsertionEffect)(() => {
        h2.current = s3;
      }), u2 = (0, e4.useRef)(null), (0, e4.useCallback)((t11) => {
        t11 && f2.onMount?.(t11), a3 && (t11 ? a3.mount(t11) : a3.unmount());
        let e11 = h2.current;
        if ("function" == typeof e11) if (t11) {
          let i4 = e11(t11);
          "function" == typeof i4 && (u2.current = i4);
        } else u2.current ? (u2.current(), u2.current = null) : e11(t11);
        else e11 && (e11.current = t11);
      }, [a3])), f2, d2, e10, r2, m2)] });
    }
    a2.displayName = `motion.${"string" == typeof t10 ? t10 : `create(${t10.displayName ?? t10.name ?? ""})`}`;
    let l2 = (0, e4.forwardRef)(a2);
    return l2[ix] = t10, l2;
  }
  t.s(["createMotionProxy", 0, function(t10, e10) {
    if ("u" < typeof Proxy) return iP;
    let i2 = /* @__PURE__ */ new Map(), s2 = (i3, s3) => iP(i3, s3, t10, e10);
    return new Proxy((t11, e11) => s2(t11, e11), { get: (n2, r2) => "create" === r2 ? s2 : (i2.has(r2) || i2.set(r2, iP(r2, void 0, t10, e10)), i2.get(r2)) });
  }], 7051), t.s(["Feature", 0, class {
    constructor(t10) {
      this.isMounted = false, this.node = t10;
    }
    update() {
    }
  }], 42098), t.s(["getTypeCustom", 0, (t10, e10) => "exit" === e10 ? t10.presenceContext?.custom : void 0, "resolveVariant", 0, function(t10, e10, i2) {
    return ih(t10.getProps(), e10, i2, t10);
  }], 18812);
}, 53034, (t) => {
  "use strict";
  t.s(["resolveTransition", 0, function(t2, e) {
    if (t2?.inherit && e) {
      let { inherit: i, ...s } = t2;
      return { ...e, ...s };
    }
    return t2;
  }]);
}, 32181, 21748, 28409, 93544, 30151, 83920, 44230, 15932, 15923, 68514, 12008, 44573, 39011, 89026, 49652, 68705, 85260, (t) => {
  "use strict";
  let e, i;
  var s = t.i(54505), n = t.i(7051), r = t.i(42098), o = t.i(18812), a = t.i(53034);
  function l(t10, e10) {
    let i10 = t10?.[e10] ?? t10?.default ?? t10;
    return i10 !== t10 ? (0, a.resolveTransition)(i10, t10) : i10;
  }
  var h = t.i(64440), u = t.i(86427), c = t.i(46791), d = t.i(83411);
  function m(t10, e10) {
    let i10 = t10.getValue("willChange");
    if ((0, d.isMotionValue)(i10) && i10.add) return i10.add(e10);
    if (!i10 && c.MotionGlobalConfig.WillChange) {
      let i11 = new c.MotionGlobalConfig.WillChange("auto");
      t10.addValue("willChange", i11), i11.add(e10);
    }
  }
  var p = t.i(35043);
  function f(t10) {
    return t10.props[p.optimizedAppearDataAttribute];
  }
  var y = t.i(63074), g = t.i(96173);
  let v = (...t10) => t10.reduce((t11, e10) => (i10) => e10(t11(i10)));
  var x = t.i(76959), T = t.i(60720), b = t.i(65566), w = t.i(19928), S = t.i(79444), P = t.i(69577), A = t.i(63011), M = t.i(22660);
  function E(t10, e10, i10) {
    return (i10 < 0 && (i10 += 1), i10 > 1 && (i10 -= 1), i10 < 1 / 6) ? t10 + (e10 - t10) * 6 * i10 : i10 < 0.5 ? e10 : i10 < 2 / 3 ? t10 + (e10 - t10) * (2 / 3 - i10) * 6 : t10;
  }
  var C = t.i(66820);
  function V(t10, e10) {
    return (i10) => i10 > 0 ? e10 : t10;
  }
  var D = t.i(706);
  let k = (t10, e10, i10) => {
    let s2 = t10 * t10, n2 = i10 * (e10 * e10 - s2) + s2;
    return n2 < 0 ? 0 : Math.sqrt(n2);
  }, R = [A.hex, C.rgba, M.hsla];
  function L(t10) {
    let e10 = R.find((e11) => e11.test(t10));
    if (!e10) return (0, b.warning)(false, `'${t10}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), false;
    let i10 = e10.parse(t10);
    return e10 === M.hsla && (i10 = (function({ hue: t11, saturation: e11, lightness: i11, alpha: s2 }) {
      t11 /= 360, i11 /= 100;
      let n2 = 0, r2 = 0, o2 = 0;
      if (e11 /= 100) {
        let s3 = i11 < 0.5 ? i11 * (1 + e11) : i11 + e11 - i11 * e11, a2 = 2 * i11 - s3;
        n2 = E(a2, s3, t11 + 1 / 3), r2 = E(a2, s3, t11), o2 = E(a2, s3, t11 - 1 / 3);
      } else n2 = r2 = o2 = i11;
      return { red: Math.round(255 * n2), green: Math.round(255 * r2), blue: Math.round(255 * o2), alpha: s2 };
    })(i10)), i10;
  }
  let B = (t10, e10) => {
    let i10 = L(t10), s2 = L(e10);
    if (!i10 || !s2) return V(t10, e10);
    let n2 = { ...i10 };
    return (t11) => (n2.red = k(i10.red, s2.red, t11), n2.green = k(i10.green, s2.green, t11), n2.blue = k(i10.blue, s2.blue, t11), n2.alpha = (0, D.mixNumber)(i10.alpha, s2.alpha, t11), C.rgba.transform(n2));
  }, F = /* @__PURE__ */ new Set(["none", "hidden"]);
  function j(t10, e10) {
    return (i10) => (0, D.mixNumber)(t10, e10, i10);
  }
  function I(t10) {
    return "number" == typeof t10 ? j : "string" == typeof t10 ? (0, w.isCSSVariableToken)(t10) ? V : S.color.test(t10) ? B : U : Array.isArray(t10) ? O : "object" == typeof t10 ? S.color.test(t10) ? B : N : V;
  }
  function O(t10, e10) {
    let i10 = [...t10], s2 = i10.length, n2 = t10.map((t11, i11) => I(t11)(t11, e10[i11]));
    return (t11) => {
      for (let e11 = 0; e11 < s2; e11++) i10[e11] = n2[e11](t11);
      return i10;
    };
  }
  function N(t10, e10) {
    let i10 = { ...t10, ...e10 }, s2 = {};
    for (let n2 in i10) void 0 !== t10[n2] && void 0 !== e10[n2] && (s2[n2] = I(t10[n2])(t10[n2], e10[n2]));
    return (t11) => {
      for (let e11 in s2) i10[e11] = s2[e11](t11);
      return i10;
    };
  }
  let U = (t10, e10) => {
    let i10 = P.complex.createTransformer(e10), s2 = (0, P.analyseComplexValue)(t10), n2 = (0, P.analyseComplexValue)(e10);
    if (!(s2.indexes.var.length === n2.indexes.var.length && s2.indexes.color.length === n2.indexes.color.length && s2.indexes.number.length >= n2.indexes.number.length)) return (0, b.warning)(true, `Complex values '${t10}' and '${e10}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), V(t10, e10);
    if (F.has(t10) && !n2.values.length || F.has(e10) && !s2.values.length) return F.has(t10) ? (i11) => i11 <= 0 ? t10 : e10 : (i11) => i11 >= 1 ? e10 : t10;
    return v(O((function(t11, e11) {
      let i11 = [], s3 = { color: 0, var: 0, number: 0 };
      for (let n3 = 0; n3 < e11.values.length; n3++) {
        let r2 = e11.types[n3], o2 = t11.indexes[r2][s3[r2]], a2 = t11.values[o2] ?? 0;
        i11[n3] = a2, s3[r2]++;
      }
      return i11;
    })(s2, n2), n2.values), i10);
  }, $ = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
  function W(t10, e10, i10) {
    if ("number" == typeof t10 && "number" == typeof e10 && "number" == typeof i10) return (0, D.mixNumber)(t10, e10, i10);
    if ("string" == typeof t10 && "string" == typeof e10) {
      let i11 = (function(t11, e11) {
        let i12 = $.exec(t11);
        if (!i12) return;
        let s2 = $.exec(e11);
        if (!s2 || i12[2] !== s2[2]) return;
        let n2 = i12[2], r2 = parseFloat(i12[1]), o2 = parseFloat(s2[1]);
        return (t12) => (0, T.sanitize)((0, D.mixNumber)(r2, o2, t12)) + n2;
      })(t10, e10);
      if (i11) return i11;
    }
    return I(t10)(t10, e10);
  }
  var z = t.i(48940), G = t.i(87022);
  let Y = (t10) => {
    let e10 = ({ timestamp: e11 }) => t10(e11);
    return { start: (t11 = true) => G.frame.update(e10, t11), stop: () => (0, G.cancelFrame)(e10), now: () => z.frameData.isProcessing ? z.frameData.timestamp : g.time.now() };
  };
  var H = t.i(56512);
  function K(t10, e10 = 50, i10 = 2e4, s2) {
    let n2 = 0, r2 = t10.next(n2);
    for (s2?.push(r2.value); !r2.done && n2 < i10; ) n2 += e10, r2 = t10.next(n2), s2?.push(r2.value);
    return n2 >= i10 ? 1 / 0 : n2;
  }
  function X(t10, e10 = 100, i10) {
    let s2 = i10({ ...t10, keyframes: [0, e10] }), n2 = Math.min(K(s2), 2e4);
    return { type: "keyframes", ease: (t11) => s2.next(n2 * t11).value / e10, duration: (0, y.millisecondsToSeconds)(n2) };
  }
  t.s(["createGeneratorEasing", 0, X], 21748);
  let _ = 0.01, q = 2, Z = 5e-3, J = 0.5, Q = (t10) => t10 < 0 ? 1 / Math.max(1 + t10, 0.05) : Math.max(1 - t10, 0.05);
  function tt(t10, e10) {
    if (!(t10 > 1)) return 1;
    let i10 = Math.sqrt(t10 * t10 - 1), s2 = t10 - i10, n2 = t10 + i10, r2 = 2 * i10 * Math.exp(-e10) * (1 + e10);
    return ti((t11) => n2 * Math.exp(-s2 * t11) - s2 * Math.exp(-n2 * t11) - r2, (t11) => Math.exp(-n2 * t11) - Math.exp(-s2 * t11), e10) / e10;
  }
  function te(t10, e10) {
    return t10 * Math.sqrt(1 - e10 * e10);
  }
  function ti(t10, e10, i10) {
    let s2 = i10;
    for (let i11 = 1; i11 < 12; i11++) s2 -= t10(s2) / e10(s2);
    return s2;
  }
  let ts = (t10, e10) => (e10 ? t10 >= 0 : t10 > 0) && t10 < 1 / 0;
  function tn(t10, e10) {
    if (ts(t10, e10)) return t10;
  }
  function tr(t10 = 0.3, e10 = 0.3) {
    let i10, s2, n2, r2 = "object" != typeof t10 ? { visualDuration: t10, keyframes: [0, 1], bounce: e10 } : t10, o2 = r2.keyframes[0], a2 = r2.keyframes[r2.keyframes.length - 1], l2 = { done: false, value: o2 }, { stiffness: h2, damping: u2, mass: c2, duration: d2, isResolvedFromDuration: m2, isTimeDefined: p2 } = (function(t11) {
      let e11 = tn(t11.stiffness), i11 = tn(t11.damping, true), s3 = tn(t11.mass), n3 = { ...t11, stiffness: e11 ?? 100, damping: i11 ?? 10, mass: s3 ?? 1, isResolvedFromDuration: false, isTimeDefined: (e11 ?? i11 ?? s3) === void 0 && (void 0 !== t11.duration || void 0 !== t11.bounce) };
      if (n3.isTimeDefined) {
        if (t11.visualDuration) {
          let e12 = Q(t11.bounce || 0), i12 = 2 * Math.PI / (1.2 * t11.visualDuration) * tt(e12, 2 * Math.PI / 1.2);
          n3.stiffness = i12 * i12, n3.damping = 2 * e12 * Math.sqrt(n3.stiffness);
        } else Object.assign(n3, (function({ duration: t12 = 800, bounce: e12 = 0.3 }) {
          let i12, s4;
          (0, b.warning)(t12 <= (0, y.secondsToMilliseconds)(10), "Spring duration must be 10 seconds or less", "spring-duration-limit");
          let n4 = Q(e12);
          t12 = (0, x.clamp)(0.01, 10, (0, y.millisecondsToSeconds)(t12)), n4 < 1 ? (i12 = (e13) => {
            let i13 = e13 * n4, s5 = i13 * t12;
            return 1e-3 - i13 / te(e13, n4) * Math.exp(-s5);
          }, s4 = (e13) => {
            let s5 = e13 * n4 * t12, r4 = n4 * n4 * e13 * e13 * t12, o4 = Math.exp(-s5), a4 = te(e13 * e13, n4);
            return -((-i12(e13) + 1e-3 > 0 ? -1 : 1) * r4) * o4 / a4;
          }) : (i12 = (e13) => -1e-3 + Math.exp(-e13 * t12) * (e13 * t12 + 1), s4 = (e13) => -(t12 * t12 * e13 * Math.exp(-e13 * t12)));
          let r3 = ti(i12, s4, 5 / t12), o3 = r3 * tt(n4, r3 * t12), a3 = o3 * o3;
          return { stiffness: a3, damping: 2 * n4 * Math.sqrt(a3), duration: (0, y.secondsToMilliseconds)(t12) };
        })(n3)), n3.isResolvedFromDuration = true;
        ts(n3.stiffness) && ts(n3.damping, true) || (n3.stiffness = 100, n3.damping = 10);
      }
      return n3;
    })({ ...r2 }), f2 = (t11) => p2 ? 0 : -(0, y.millisecondsToSeconds)(t11), g2 = u2 / (2 * Math.sqrt(h2 * c2)), v2 = (0, y.millisecondsToSeconds)(Math.sqrt(h2 / c2)), T2 = g2 * v2, w2 = { target: a2, delta: a2 - o2, velocity: f2(r2.velocity || 0) || 0, restSpeed: 0, restDelta: 0 }, S2 = () => {
      let t11 = 5 > Math.abs(w2.delta);
      w2.restSpeed = r2.restSpeed || (t11 ? _ : q), w2.restDelta = r2.restDelta || (t11 ? Z : J);
    };
    if (S2(), g2 < 1) {
      let t11 = te(v2, g2), e11 = { A: 0, sinC: 0, cosC: 0, t: -1, env: 0, sin: 0, cos: 0 };
      n2 = () => {
        e11.A = (w2.velocity + T2 * w2.delta) / t11, e11.sinC = T2 * e11.A + w2.delta * t11, e11.cosC = T2 * w2.delta - e11.A * t11;
      };
      let r3 = (i11) => {
        i11 !== e11.t && (e11.t = i11, e11.env = Math.exp(-T2 * i11), e11.sin = Math.sin(t11 * i11), e11.cos = Math.cos(t11 * i11));
      };
      i10 = (t12) => (r3(t12), w2.target - e11.env * (e11.A * e11.sin + w2.delta * e11.cos)), s2 = (t12) => (r3(t12), e11.env * (e11.sinC * e11.sin + e11.cosC * e11.cos));
    } else if (1 === g2) {
      i10 = (t12) => w2.target - Math.exp(-v2 * t12) * (w2.delta + (w2.velocity + v2 * w2.delta) * t12);
      let t11 = { C: 0 };
      n2 = () => {
        t11.C = w2.velocity + v2 * w2.delta;
      }, s2 = (e11) => Math.exp(-v2 * e11) * (v2 * t11.C * e11 - w2.velocity);
    } else {
      let t11 = v2 * Math.sqrt(g2 * g2 - 1), e11 = T2 - t11, r3 = T2 + t11, o3 = p2 ? 1 / 0 : 300 / t11, a3 = (t12, e12) => Math.exp(e12 > o3 ? -t12 * o3 - T2 * (e12 - o3) : -t12 * e12), l3 = { S: 0, F: 0 };
      n2 = () => {
        let e12 = (w2.velocity + T2 * w2.delta) / t11;
        l3.S = (w2.delta + e12) / 2, l3.F = (w2.delta - e12) / 2;
      }, i10 = (t12) => w2.target - l3.S * a3(e11, t12) - l3.F * a3(r3, t12), s2 = (t12) => e11 * l3.S * a3(e11, t12) + r3 * l3.F * a3(r3, t12);
    }
    n2();
    let P2 = m2 && d2 || null, A2 = { calculatedDuration: P2, retarget: (t11, e11) => {
      w2.target = t11[t11.length - 1], w2.delta = w2.target - t11[0], w2.velocity = f2(e11), r2.restSpeed && r2.restDelta || S2(), A2.calculatedDuration = P2, l2.done = false, n2();
    }, velocity: (t11) => (0, y.secondsToMilliseconds)(s2(t11)), next: (t11) => {
      let e11 = i10(t11);
      return m2 ? l2.done = t11 >= d2 : l2.done = Math.abs((0, y.secondsToMilliseconds)(s2(t11))) <= w2.restSpeed && Math.abs(w2.target - e11) <= w2.restDelta, l2.value = l2.done ? w2.target : e11, l2;
    }, toString: () => {
      let t11 = Math.min(K(A2), 2e4), e11 = (0, H.generateLinearEasing)((e12) => A2.next(t11 * e12).value, t11, 30);
      return t11 + "ms " + e11;
    }, toTransition: () => {
    } };
    return A2;
  }
  function to({ keyframes: t10, velocity: e10 = 0, power: i10 = 0.8, timeConstant: s2 = 325, bounceDamping: n2 = 10, bounceStiffness: r2 = 500, modifyTarget: o2, min: a2, max: l2, restDelta: h2 = 0.5, restSpeed: u2 }) {
    let c2, d2, m2 = t10[0], p2 = { done: false, value: m2 }, f2 = i10 * e10, y2 = m2 + f2, g2 = void 0 === o2 ? y2 : o2(y2);
    g2 !== y2 && (f2 = g2 - m2);
    let v2 = (t11) => -f2 * Math.exp(-t11 / s2), x2 = (t11) => {
      let e11 = v2(t11);
      p2.done = Math.abs(e11) <= h2, p2.value = p2.done ? g2 : g2 + e11;
    }, T2 = (t11) => {
      let e11;
      if ((e11 = p2.value) < a2 || e11 > l2) {
        var i11;
        c2 = t11, d2 = tr({ keyframes: [p2.value, (i11 = p2.value, void 0 === a2 ? l2 : void 0 === l2 || Math.abs(a2 - i11) < Math.abs(l2 - i11) ? a2 : l2)], velocity: -v2(t11) / s2 * 1e3, damping: n2, stiffness: r2, restDelta: h2, restSpeed: u2 });
      }
    };
    return T2(0), { calculatedDuration: null, next: (t11) => {
      let e11 = false;
      return (d2 || void 0 !== c2 || (e11 = true, x2(t11), T2(t11)), void 0 !== c2 && t11 >= c2) ? d2.next(t11 - c2) : (e11 || x2(t11), p2);
    } };
  }
  tr.applyToOptions = (t10) => {
    let e10 = X(t10, 100, tr);
    return t10.ease = e10.ease, t10.duration = (0, y.secondsToMilliseconds)(e10.duration), t10.type = "keyframes", t10;
  }, t.s(["spring", 0, tr], 28409);
  var ta = t.i(60830);
  let tl = (t10, e10, i10) => (((1 - 3 * i10 + 3 * e10) * t10 + (3 * i10 - 6 * e10)) * t10 + 3 * e10) * t10;
  function th(t10, e10, i10, s2) {
    return t10 === e10 && i10 === s2 ? ta.noop : (n2) => 0 === n2 || 1 === n2 ? n2 : tl((function(t11, e11, i11, s3, n3) {
      let r2, o2, a2 = 0;
      do
        (r2 = tl(o2 = e11 + (i11 - e11) / 2, s3, n3) - t11) > 0 ? i11 = o2 : e11 = o2;
      while (Math.abs(r2) > 1e-7 && ++a2 < 12);
      return o2;
    })(n2, 0, 1, t10, i10), e10, s2);
  }
  let tu = th(0.42, 0, 1, 1), tc = th(0, 0, 0.58, 1), td = th(0.42, 0, 0.58, 1), tm = (t10) => Array.isArray(t10) && "number" != typeof t10[0];
  t.s(["isEasingArray", 0, tm], 93544);
  let tp = (t10) => (e10) => e10 <= 0.5 ? t10(2 * e10) / 2 : (2 - t10(2 * (1 - e10))) / 2, tf = (t10) => (e10) => 1 - t10(1 - e10);
  t.s(["reverseEasing", 0, tf], 30151);
  let ty = th(0.33, 1.53, 0.69, 0.99), tg = tf(ty), tv = tp(tg), tx = (t10) => t10 >= 1 ? 1 : (t10 *= 2) < 1 ? 0.5 * tg(t10) : 0.5 * (2 - Math.pow(2, -10 * (t10 - 1))), tT = (t10) => 1 - Math.sin(Math.acos(t10)), tb = tf(tT), tw = tp(tT);
  var tS = t.i(60855);
  let tP = { linear: ta.noop, easeIn: tu, easeInOut: td, easeOut: tc, circIn: tT, circInOut: tw, circOut: tb, backIn: tg, backInOut: tv, backOut: ty, anticipate: tx }, tA = (t10) => {
    if ((0, tS.isBezierDefinition)(t10)) {
      (0, b.invariant)(4 === t10.length, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
      let [e10, i10, s2, n2] = t10;
      return th(e10, i10, s2, n2);
    }
    return "string" == typeof t10 ? ((0, b.invariant)(void 0 !== tP[t10], `Invalid easing type '${t10}'`, "invalid-easing-type"), tP[t10]) : t10;
  }, tM = (t10, e10, i10) => {
    let s2 = e10 - t10;
    return s2 ? (i10 - t10) / s2 : 1;
  };
  function tE(t10, e10, { clamp: i10 = true, ease: s2, mixer: n2 } = {}) {
    let r2 = t10.length;
    if ((0, b.invariant)(r2 === e10.length, "Both input and output ranges must be the same length", "range-length"), 1 === r2) return () => e10[0];
    if (2 === r2 && e10[0] === e10[1]) return () => e10[1];
    let o2 = t10[0] === t10[1];
    t10[0] > t10[r2 - 1] && (t10 = [...t10].reverse(), e10 = [...e10].reverse());
    let a2 = (function(t11, e11, i11) {
      let s3 = [], n3 = i11 || c.MotionGlobalConfig.mix || W, r3 = t11.length - 1;
      for (let i12 = 0; i12 < r3; i12++) {
        let r4 = n3(t11[i12], t11[i12 + 1]);
        e11 && (r4 = v(Array.isArray(e11) ? e11[i12] || ta.noop : e11, r4)), s3.push(r4);
      }
      return s3;
    })(e10, s2, n2), l2 = a2.length, h2 = (i11) => {
      if (o2 && i11 < t10[0]) return e10[0];
      let s3 = 0;
      if (l2 > 1) for (; s3 < t10.length - 2 && !(i11 < t10[s3 + 1]); s3++) ;
      let n3 = tM(t10[s3], t10[s3 + 1], i11);
      return a2[s3](n3);
    };
    return i10 ? (e11) => h2((0, x.clamp)(t10[0], t10[r2 - 1], e11)) : h2;
  }
  function tC(t10, e10) {
    let i10 = t10[t10.length - 1];
    for (let s2 = 1; s2 <= e10; s2++) {
      let n2 = tM(0, e10, s2);
      t10.push((0, D.mixNumber)(i10, 1, n2));
    }
  }
  function tV(t10) {
    let e10 = [0];
    return tC(e10, t10.length - 1), e10;
  }
  function tD({ duration: t10 = 300, keyframes: e10, times: i10, ease: s2 = "easeInOut" }) {
    var n2;
    let r2 = tm(s2) ? s2.map(tA) : tA(s2) || td, o2 = { done: false, value: e10[0] };
    if (2 === e10.length && !Array.isArray(r2) && (!i10 || 2 !== i10.length || 0 === i10[0] && 1 === i10[1])) {
      let [i11, s3] = e10, n3 = i11 === s3 ? void 0 : (c.MotionGlobalConfig.mix || W)(i11, s3);
      return { calculatedDuration: t10, next: (e11) => (o2.value = n3 ? n3(r2(t10 > 0 ? (0, x.clamp)(0, 1, e11 / t10) : 1)) : s3, o2.done = e11 >= t10, o2) };
    }
    let a2 = tE((n2 = i10 && i10.length === e10.length ? i10 : tV(e10), n2.map((e11) => e11 * t10)), e10, { ease: Array.isArray(r2) ? r2 : e10.map(() => r2 || td).splice(0, e10.length - 1) });
    return { calculatedDuration: t10, next: (e11) => (o2.value = a2(e11), o2.done = e11 >= t10, o2) };
  }
  t.s(["progress", 0, tM], 83920), t.s(["interpolate", 0, tE], 44230), t.s(["fillOffset", 0, tC], 15932), t.s(["defaultOffset", 0, tV], 15923), t.s(["keyframes", 0, tD], 68514);
  var tk = t.i(25791);
  function tR(t10, e10, i10 = 0) {
    var s2, n2;
    let r2;
    return e10 <= 0 ? i10 : t10.velocity ? t10.velocity(e10) : (s2 = (e11) => t10.next(e11).value, n2 = t10.next(e10).value, r2 = Math.max(e10 - 5, 0), (0, tk.velocityPerSecond)(n2 - s2(r2), e10 - r2));
  }
  t.s(["calcGeneratorVelocity", 0, tR], 12008);
  var tL = t.i(14229);
  let tB = { decay: to, inertia: to, tween: tD, keyframes: tD, spring: tr };
  function tF(t10) {
    "string" == typeof t10.type && (t10.type = tB[t10.type]);
  }
  t.s(["replaceTransitionType", 0, tF], 44573);
  var tj = t.i(49404), tI = t.i(79294);
  let tO = (t10) => t10 / 100;
  class tN extends tI.WithPromise {
    constructor(t10) {
      super(), this.state = "idle", this.startTime = null, this.isStopped = false, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = { done: false, value: void 0 }, this.stop = () => {
        let { motionValue: t11 } = this.options;
        t11 && t11.updatedAt !== g.time.now() && this.tick(g.time.now()), this.isStopped = true, "idle" !== this.state && (this.teardown(), this.options.onStop?.());
      }, this.options = t10, this.initAnimation(), this.play(), false === t10.autoplay && this.pause(), (0, tj.notifyAnimationStart)(this, this.options);
    }
    initAnimation() {
      let { options: t10 } = this;
      tF(t10);
      let { type: e10 = tD, repeat: i10 = 0, repeatDelay: s2 = 0, repeatType: n2, velocity: r2 = 0 } = t10, { keyframes: o2 } = t10, a2 = e10 || tD;
      a2 !== tD && "number" != typeof o2[0] && (this.mixKeyframes = v(tO, W(o2[0], o2[1])), o2 = [0, 100]);
      let l2 = a2(o2 === t10.keyframes ? t10 : { ...t10, keyframes: o2 });
      "mirror" === n2 && (this.mirroredGenerator = a2({ ...t10, keyframes: [...o2].reverse(), velocity: -r2 })), null === l2.calculatedDuration && (l2.calculatedDuration = K(l2));
      let { calculatedDuration: h2 } = l2;
      this.calculatedDuration = h2, this.resolvedDuration = h2 + s2, this.totalDuration = this.resolvedDuration * (i10 + 1) - s2, this.generator = l2;
    }
    updateTime(t10) {
      let e10 = Math.round(t10 - this.startTime) * this.playbackSpeed;
      null !== this.holdTime ? this.currentTime = this.holdTime : this.currentTime = e10;
    }
    tick(t10, e10 = false) {
      let i10, { generator: s2, totalDuration: n2, mixKeyframes: r2, mirroredGenerator: o2, resolvedDuration: a2, calculatedDuration: l2 } = this;
      if (null === this.startTime) return s2.next(0);
      let { delay: h2 = 0, keyframes: u2, repeat: c2, repeatType: d2, repeatDelay: m2, type: p2, onUpdate: f2, finalKeyframe: y2 } = this.options;
      this.speed > 0 ? this.startTime = Math.min(this.startTime, t10) : this.speed < 0 && (this.startTime = Math.min(t10 - n2 / this.speed, this.startTime)), e10 ? this.currentTime = t10 : this.updateTime(t10);
      let g2 = this.currentTime - h2 * (this.playbackSpeed >= 0 ? 1 : -1), v2 = this.playbackSpeed >= 0 ? g2 < 0 : g2 > n2;
      this.currentTime = Math.max(g2, 0), "finished" === this.state && null === this.holdTime && (this.currentTime = n2);
      let T2 = this.currentTime, b2 = s2;
      if (c2) {
        let t11 = Math.min(this.currentTime, n2) / a2, e11 = Math.floor(t11), i11 = t11 % 1;
        !i11 && t11 >= 1 && (i11 = 1), 1 === i11 && e11--, (e11 = Math.min(e11, c2 + 1)) % 2 && ("reverse" === d2 ? (i11 = 1 - i11, m2 && (i11 -= m2 / a2)) : "mirror" === d2 && (b2 = o2)), T2 = (0, x.clamp)(0, 1, i11) * a2;
      }
      v2 ? (this.delayState.value = u2[0], i10 = this.delayState) : i10 = b2.next(T2), r2 && !v2 && (i10.value = r2(i10.value));
      let { done: w2 } = i10;
      v2 || null === l2 || (w2 = this.playbackSpeed >= 0 ? this.currentTime >= n2 : this.currentTime <= 0);
      let S2 = null === this.holdTime && ("finished" === this.state || "running" === this.state && w2);
      return S2 && p2 !== to && (i10.value = (0, tL.getFinalKeyframe)(u2, this.options, y2, this.speed)), f2 && f2(i10.value), S2 && this.finish(), i10;
    }
    then(t10, e10) {
      return this.finished.then(t10, e10);
    }
    get duration() {
      return (0, y.millisecondsToSeconds)(this.calculatedDuration);
    }
    get iterationDuration() {
      let { delay: t10 = 0 } = this.options || {};
      return this.duration + (0, y.millisecondsToSeconds)(t10);
    }
    get time() {
      return (0, y.millisecondsToSeconds)(this.currentTime);
    }
    set time(t10) {
      t10 = (0, y.secondsToMilliseconds)(t10), this.currentTime = t10, null === this.startTime || null !== this.holdTime || 0 === this.playbackSpeed ? this.holdTime = t10 : this.driver && (this.startTime = this.driver.now() - t10 / this.playbackSpeed), this.driver ? this.driver.start(false) : (this.startTime = 0, this.state = "paused", this.holdTime = t10, this.tick(t10));
    }
    getGeneratorVelocity() {
      return tR(this.generator, this.currentTime, this.options.velocity);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(t10) {
      let e10 = this.playbackSpeed !== t10;
      e10 && this.driver && this.updateTime(g.time.now()), this.playbackSpeed = t10, e10 && this.driver && (this.time = (0, y.millisecondsToSeconds)(this.currentTime));
    }
    play() {
      if (this.isStopped) return;
      let { driver: t10 = Y, startTime: e10 } = this.options;
      this.driver || (this.driver = t10((t11) => this.tick(t11))), this.options.onPlay?.();
      let i10 = this.driver.now();
      "finished" === this.state ? (this.updateFinished(), this.startTime = i10) : null !== this.holdTime ? this.startTime = i10 - this.holdTime : this.startTime || (this.startTime = e10 ?? i10), "finished" === this.state && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
    }
    pause() {
      this.state = "paused", this.updateTime(g.time.now()), this.holdTime = this.currentTime;
    }
    complete() {
      "running" !== this.state && this.play(), this.state = "finished", this.holdTime = null;
    }
    finish() {
      this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
    }
    cancel() {
      this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
    }
    teardown() {
      this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
    }
    stopDriver() {
      this.driver && (this.driver.stop(), this.driver = void 0);
    }
    sample(t10) {
      return this.startTime = 0, this.tick(t10, true);
    }
    attachTimeline(t10) {
      return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t10.observe(this);
    }
  }
  var tU = t.i(21012), t$ = t.i(94581), tW = t.i(68e3);
  let tz = { anticipate: tx, backInOut: tv, circInOut: tw };
  class tG extends tW.NativeAnimation {
    constructor(t10) {
      !(function(t11) {
        "string" == typeof t11.ease && t11.ease in tz && (t11.ease = tz[t11.ease]);
      })(t10), tF(t10), super(t10), void 0 !== t10.startTime && false !== t10.autoplay && (this.startTime = t10.startTime), this.options = t10;
    }
    updateMotionValue(t10) {
      let { motionValue: e10, onUpdate: i10, onComplete: s2, element: n2, ...r2 } = this.options;
      if (!e10) return;
      if (void 0 !== t10) return void e10.set(t10);
      let o2 = new tN({ ...r2, autoplay: false }), a2 = Math.max(10, g.time.now() - this.startTime), l2 = (0, x.clamp)(0, 10, a2 - 10), h2 = o2.sample(a2).value, { name: u2 } = this.options;
      n2 && u2 && (0, t$.setStyle)(n2, u2, h2), e10.setWithVelocity(o2.sample(Math.max(0, a2 - l2)).value, h2, l2), o2.stop();
    }
  }
  var tY = t.i(97307);
  let tH = (t10, e10) => "zIndex" !== e10 && !!("number" == typeof t10 || Array.isArray(t10) || "string" == typeof t10 && (P.complex.test(t10) || "0" === t10) && !t10.startsWith("url("));
  function tK(t10) {
    t10.duration = 0, t10.type = "keyframes";
  }
  var tX = tI, t_ = t.i(60900), tq = t.i(62118);
  let tZ = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/, tJ = /* @__PURE__ */ new Set(["color", "backgroundColor", "outlineColor", "fill", "stroke", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"]), tQ = (0, t_.memo)(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
  class t0 extends tX.WithPromise {
    constructor(t10) {
      super(), this.stop = () => {
        this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
      }, this.createdAt = g.time.now();
      const { keyframes: e10, name: i10, motionValue: s2, element: n2 } = t10;
      t10.autoplay ?? (t10.autoplay = true), t10.delay ?? (t10.delay = 0), t10.type ?? (t10.type = "keyframes"), t10.repeat ?? (t10.repeat = 0), t10.repeatDelay ?? (t10.repeatDelay = 0), t10.repeatType ?? (t10.repeatType = "loop");
      const r2 = n2?.KeyframeResolver || tU.KeyframeResolver;
      this.keyframeResolver = new r2(e10, (e11, i11, s3) => this.onKeyframesResolved(e11, i11, t10, !s3), i10, s2, n2), this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(t10, e10, i10, s2) {
      let n2;
      this.keyframeResolver = void 0;
      let { name: r2, type: o2, velocity: a2, delay: l2, isHandoff: h2, onUpdate: u2 } = i10;
      this.resolvedAt = g.time.now();
      let d2 = true;
      !(function(t11, e11, i11, s3) {
        let n3 = t11[0];
        if (null === n3) return false;
        if ("display" === e11 || "visibility" === e11) return true;
        let r3 = t11[t11.length - 1], o3 = tH(n3, e11), a3 = tH(r3, e11);
        return o3 && a3 ? (function(t12) {
          let e12 = t12[0];
          if (1 === t12.length) return true;
          for (let i12 = 0; i12 < t12.length; i12++) if (t12[i12] !== e12) return true;
        })(t11) || ("spring" === i11 || (0, tY.isGenerator)(i11)) && s3 : (o3 !== a3 && (0, b.warning)(false, `You are trying to animate ${e11} from "${n3}" to "${r3}". "${o3 ? r3 : n3}" is not an animatable value.`, "value-not-animatable"), false);
      })(t10, r2, o2, a2) && (d2 = false, (c.MotionGlobalConfig.instantAnimations || !l2) && u2?.((0, tL.getFinalKeyframe)(t10, i10, e10)), t10[0] = t10[t10.length - 1], tK(i10), i10.repeat = 0);
      let m2 = s2 ? this.resolvedAt && this.resolvedAt - this.createdAt > 40 ? this.resolvedAt : this.createdAt : void 0, { onComplete: p2 } = i10;
      if (i10.startTime ?? (i10.startTime = m2), i10.finalKeyframe = e10, i10.keyframes = t10, i10.onComplete = () => {
        p2?.(), this.notifyFinished();
      }, d2 && !h2 && (function(t11) {
        let { motionValue: e11, name: i11, repeatDelay: s3, repeatType: n3, damping: r3, type: o3, keyframes: a3 } = t11;
        if (!i11 || !(tq.acceleratedValues.has(i11) || tJ.has(i11))) return false;
        let l3 = e11?.owner?.current;
        if (!(l3 instanceof HTMLElement) && !(l3 instanceof SVGElement)) return false;
        let { onUpdate: h3, transformTemplate: u3 } = e11.owner.getProps();
        return tQ() && (tq.acceleratedValues.has(i11) || tJ.has(i11) && (function(t12) {
          for (let e12 = 0; e12 < t12.length; e12++) if ("string" == typeof t12[e12] && tZ.test(t12[e12])) return true;
          return false;
        })(a3)) && ("transform" !== i11 || !u3) && !h3 && !s3 && "mirror" !== n3 && 0 !== r3 && "inertia" !== o3;
      })(i10)) {
        i10.element = i10.motionValue?.owner?.current;
        try {
          n2 = new tG(i10);
        } catch {
          n2 = new tN(i10);
        }
      } else n2 = new tN(i10);
      this.pendingTimeline && (this.stopTimeline = n2.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = n2;
    }
    get finished() {
      return this._animation ? this._animation.finished : super.finished;
    }
    then(t10, e10) {
      return this.finished.finally(t10).then(() => {
      });
    }
    get animation() {
      return this._animation || (this.keyframeResolver?.resume(), (0, tU.flushKeyframeResolvers)()), this._animation;
    }
    get duration() {
      return this.animation.duration;
    }
    get iterationDuration() {
      return this.animation.iterationDuration;
    }
    get time() {
      return this.animation.time;
    }
    set time(t10) {
      this.animation.time = t10;
    }
    get speed() {
      return this.animation.speed;
    }
    get state() {
      return this.animation.state;
    }
    set speed(t10) {
      this.animation.speed = t10;
    }
    get startTime() {
      return this.animation.startTime;
    }
    attachTimeline(t10) {
      return this._animation ? this.stopTimeline = this.animation.attachTimeline(t10) : this.pendingTimeline = t10, () => this.stop();
    }
    play() {
      this.animation.play();
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.complete();
    }
    cancel() {
      this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
    }
  }
  var t1 = t.i(57788);
  let t2 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 }, t4 = { type: "keyframes", duration: 0.8 }, t5 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 }, t3 = /* @__PURE__ */ new Set(["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from", "elapsed"]), t6 = (t10, e10, i10, s2 = {}, n2, r2) => (o2) => {
    let a2 = l(s2, t10) || {}, h2 = a2.delay || s2.delay || 0, { elapsed: u2 = 0 } = s2;
    u2 -= (0, y.secondsToMilliseconds)(h2);
    let d2 = { keyframes: Array.isArray(i10) ? i10 : [null, i10], ease: "easeOut", velocity: e10.getVelocity(), ...a2, delay: -u2, onUpdate: (t11) => {
      e10.set(t11), a2.onUpdate && a2.onUpdate(t11);
    }, onComplete: () => {
      o2(), a2.onComplete && a2.onComplete();
    }, name: t10, motionValue: e10, element: r2 ? void 0 : n2 };
    !(function(t11) {
      for (let e11 in t11) if (!t3.has(e11)) return true;
      return false;
    })(a2) && Object.assign(d2, ((t11, { keyframes: e11 }) => e11.length > 2 ? t4 : t1.transformProps.has(t11) ? t11.startsWith("scale") ? { type: "spring", stiffness: 550, damping: 0 === e11[1] ? 2 * Math.sqrt(550) : 30, restSpeed: 10 } : t2 : t5)(t10, d2)), d2.duration && (d2.duration = (0, y.secondsToMilliseconds)(d2.duration)), d2.repeatDelay && (d2.repeatDelay = (0, y.secondsToMilliseconds)(d2.repeatDelay)), void 0 !== d2.from && (d2.keyframes[0] = d2.from);
    let m2 = false;
    if (false !== d2.type && (0 !== d2.duration || d2.repeatDelay) || (tK(d2), 0 === d2.delay && (m2 = true)), (c.MotionGlobalConfig.instantAnimations || c.MotionGlobalConfig.skipAnimations || n2?.shouldSkipAnimations || a2.skipAnimations) && (m2 = true, tK(d2), d2.delay = 0), d2.allowFlatten = !a2.type && !a2.ease, m2 && !r2 && void 0 !== e10.get()) {
      let t11 = (0, tL.getFinalKeyframe)(d2.keyframes, a2);
      if (void 0 !== t11) return void G.frame.update(() => {
        d2.onUpdate(t11), d2.onComplete();
      });
    }
    return a2.isSync ? new tN(d2) : new t0(d2);
  };
  t.s(["animateMotionValue", 0, t6], 39011);
  let t7 = "u" > typeof window;
  function t8(t10, e10, { delay: i10 = 0, transitionOverride: s2, type: n2 } = {}) {
    let { transition: r2, transitionEnd: c2, ...d2 } = e10, p2 = t10.getDefaultTransition();
    r2 = r2 ? (0, a.resolveTransition)(r2, p2) : p2;
    let y2 = r2?.reduceMotion, g2 = r2?.skipAnimations;
    s2 && (r2 = s2);
    let v2 = [], x2 = n2 && t10.animationState?.getState()[n2], T2 = r2?.path;
    for (let e11 in T2 && T2.animateVisualElement(t10, d2, r2, i10, v2), d2) {
      let s3 = t10.getValue(e11, t10.latestValues[e11] ?? null), n3 = d2[e11];
      if (void 0 === n3 || x2 && (function({ protectedKeys: t11, needsAnimating: e12 }, i11) {
        let s4 = i11 in t11 && !e12[i11];
        return e12[i11] = false, s4;
      })(x2, e11)) continue;
      let o2 = { delay: i10, ...l(r2 || {}, e11) };
      g2 && (o2.skipAnimations = true);
      let a2 = s3.get();
      if (void 0 !== a2 && !s3.isAnimating() && !Array.isArray(n3) && n3 === a2 && !o2.velocity) {
        G.frame.update(() => s3.set(n3));
        continue;
      }
      let u2 = false;
      if (t7 && window.MotionHandoffAnimation) {
        let i11 = f(t10);
        if (i11) {
          let t11 = window.MotionHandoffAnimation(i11, e11, G.frame);
          null !== t11 && (o2.startTime = t11, u2 = true);
        }
      }
      m(t10, e11);
      let c3 = y2 ?? t10.shouldReduceMotion;
      s3.start(t6(e11, s3, n3, c3 && h.positionalKeys.has(e11) ? { type: false } : o2, t10, u2));
      let p3 = s3.animation;
      p3 && v2.push(p3);
    }
    if (c2) {
      let e11 = () => G.frame.update(() => {
        c2 && (function(t11, e12) {
          let { transitionEnd: i11 = {}, transition: s3 = {}, ...n3 } = (0, o.resolveVariant)(t11, e12) || {};
          for (let e13 in n3 = { ...n3, ...i11 }) {
            var r3;
            let i12 = Array.isArray(r3 = n3[e13]) ? r3[r3.length - 1] || 0 : r3;
            t11.hasValue(e13) ? t11.getValue(e13).set(i12) : t11.addValue(e13, (0, u.motionValue)(i12));
          }
        })(t10, c2);
      });
      v2.length ? Promise.all(v2).then(e11) : e11();
    }
    return v2;
  }
  function t9(t10, e10, i10, s2 = 0, n2 = 1) {
    let r2 = Array.from(t10).sort((t11, e11) => t11.sortNodePosition(e11)).indexOf(e10), o2 = t10.size, a2 = (o2 - 1) * s2;
    return "function" == typeof i10 ? i10(r2, o2) : 1 === n2 ? r2 * s2 : a2 - r2 * s2;
  }
  function et(t10, e10, i10 = {}) {
    let s2 = (0, o.resolveVariant)(t10, e10, (0, o.getTypeCustom)(t10, i10.type)), n2 = i10.transitionOverride || (s2?.transition ?? (t10.getDefaultTransition() || {})), r2 = () => Promise.all(s2 ? t8(t10, s2, i10) : []), a2 = (s3 = 0) => {
      let { variantChildren: r3 } = t10, { delayChildren: o2 = 0, staggerChildren: a3, staggerDirection: l3 } = n2, h2 = [];
      return r3?.forEach((t11) => {
        t11.notify("AnimationStart", e10), h2.push(et(t11, e10, { ...i10, delay: s3 + ("function" == typeof o2 ? 0 : o2) + t9(r3, t11, o2, a3, l3) }).then(() => t11.notify("AnimationComplete", e10)));
      }), Promise.all(h2);
    }, { when: l2 } = n2;
    return l2 ? "beforeChildren" === l2 ? r2().then(() => a2()) : a2().then(r2) : Promise.all([r2(), a2(i10.delay)]);
  }
  var ee = t.i(85983), ei = t.i(32525);
  function es(t10, e10) {
    if (!Array.isArray(e10)) return false;
    let i10 = e10.length;
    if (i10 !== t10.length) return false;
    for (let s2 = 0; s2 < i10; s2++) if (e10[s2] !== t10[s2]) return false;
    return true;
  }
  var en = t.i(6840);
  let er = [...en.variantPriorityOrder].reverse();
  function eo() {
    let t10 = {};
    for (let e10 of en.variantPriorityOrder) t10[e10] = { isActive: "animate" === e10, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
    return t10;
  }
  class ea extends r.Feature {
    constructor(t10) {
      super(t10), t10.animationState || (t10.animationState = (function(t11) {
        let e10 = (e11) => Promise.all(e11.map(({ animation: e12, options: i11 }) => (function(t12, e13, i12 = {}) {
          return t12.notify("AnimationStart", e13), (Array.isArray(e13) ? Promise.all(e13.map((e14) => et(t12, e14, i12))) : "string" == typeof e13 ? et(t12, e13, i12) : Promise.all(t8(t12, (0, o.resolveVariant)(t12, e13, i12.custom), i12))).then(() => {
            t12.notify("AnimationComplete", e13);
          });
        })(t11, e12, i11))), i10 = eo(), s2 = true, n2 = false;
        function r2(r3) {
          let { props: a2, parent: l2, manuallyAnimateOnMount: h2 } = t11, u2 = s2 || n2, c2 = [], m2 = /* @__PURE__ */ new Set(), p2 = {}, f2 = 1 / 0, y2 = t11;
          do
            y2 = false !== y2.props.inherit && y2.parent;
          while (y2 && !y2.isControllingVariants);
          if (er.forEach((e11, s3) => {
            var n3, d2;
            let g3 = i10[e11], v2 = a2[e11], x2 = y2 && y2.props[e11], T2 = void 0 !== v2 ? v2 : (0, ei.isVariantLabel)(x2) || false === x2 ? x2 : void 0, b2 = (0, ei.isVariantLabel)(T2), w2 = e11 === r3 ? g3.isActive : null;
            false === w2 && (f2 = s3);
            let S2 = b2 && void 0 === v2 && !(u2 && h2);
            if (g3.protectedKeys = { ...p2 }, !g3.isActive && null === w2 || !T2 && !g3.prevProp || (0, ee.isAnimationControls)(T2) || "boolean" == typeof T2) return;
            if ("exit" === e11 && g3.isActive && true !== w2) {
              p2 = { ...p2, ...g3.prevResolvedValues };
              return;
            }
            let P2 = (n3 = g3.prevProp, "string" == typeof (d2 = T2) ? d2 !== n3 : !!Array.isArray(d2) && !es(d2, n3)), A2 = P2 || b2 && (w2 && !S2 || s3 > f2), M2 = false, E2 = Array.isArray(T2) ? T2 : [T2], C2 = {};
            if (false !== w2) for (let i11 of E2) {
              let { transition: s4, transitionEnd: n4, ...r4 } = (0, o.resolveVariant)(t11, i11, (0, o.getTypeCustom)(t11, e11)) || {};
              C2 = { ...C2, ...r4, ...n4 };
            }
            let { prevResolvedValues: V2 } = g3;
            for (let e12 in { ...V2, ...C2 }) {
              if (e12 in p2) continue;
              let i11 = C2[e12], s4 = V2[e12], n4 = Array.isArray(i11) && Array.isArray(s4) ? !es(i11, s4) || P2 : i11 !== s4;
              if (n4 && null == i11) m2.add(e12);
              else if (n4 || void 0 !== i11 && m2.has(e12)) {
                A2 = true, m2.delete(e12) && (M2 = true), g3.needsAnimating[e12] = true;
                let i12 = t11.getValue(e12);
                i12 && (i12.liveStyle = false);
              } else g3.protectedKeys[e12] = true;
            }
            if (g3.prevProp = T2, g3.prevResolvedValues = C2, g3.isActive && (p2 = { ...p2, ...C2 }), A2 && (!(S2 && P2) || M2)) for (let i11 of E2) {
              let s4 = { type: e11 };
              if ("string" == typeof i11 && u2 && h2 && l2?.enteringChildren) {
                let e12 = (0, o.resolveVariant)(l2, i11)?.transition?.delayChildren;
                s4.delay = t9(l2.enteringChildren, t11, e12);
              }
              c2.push({ animation: i11, options: s4 });
            }
          }), m2.size) {
            let { initial: e11 } = a2, i11 = {}, s3 = "boolean" != typeof e11 && (0, o.resolveVariant)(t11, Array.isArray(e11) ? e11[0] : e11, t11.presenceContext?.custom);
            s3 && s3.transition && (i11.transition = s3.transition), m2.forEach((n3) => {
              let r4 = t11.getValue(n3);
              r4 && (r4.liveStyle = true);
              let o2 = s3 && !Array.isArray(e11) ? s3[n3] : void 0, l3 = t11.getBaseTargetFromProps(a2, n3);
              i11[n3] = (void 0 !== o2 ? o2 : void 0 === l3 || (0, d.isMotionValue)(l3) ? void 0 === t11.initialValues[n3] ? t11.baseTarget[n3] : void 0 : l3) ?? null;
            }), c2.push({ animation: i11 });
          }
          let g2 = u2 && t11.blockInitialAnimation || s2 && !h2 && (false === a2.initial || a2.initial === a2.animate);
          return s2 = n2 = false, !g2 && c2.length ? e10(c2) : Promise.resolve();
        }
        return { animateChanges: r2, setActive: function(e11, s3) {
          if (i10[e11].isActive === s3) return Promise.resolve();
          t11.variantChildren?.forEach((t12) => t12.animationState?.setActive(e11, s3)), i10[e11].isActive = s3;
          let n3 = r2(e11);
          for (let t12 in i10) i10[t12].protectedKeys = {};
          return n3;
        }, setAnimateFunction: (i11) => {
          e10 = i11(t11);
        }, getState: () => i10, reset: () => {
          i10 = eo(), n2 = true;
        } };
      })(t10));
    }
    updateAnimationControlsSubscription() {
      let { animate: t10 } = this.node.getProps();
      (0, ee.isAnimationControls)(t10) && (this.unmountControls = t10.subscribe(this.node));
    }
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      let { animate: t10 } = this.node.getProps(), { animate: e10 } = this.node.prevProps || {};
      t10 !== e10 && this.updateAnimationControlsSubscription();
    }
    unmount() {
      this.node.animationState.reset(), this.unmountControls?.();
    }
  }
  var el = r;
  let eh = 0;
  class eu extends el.Feature {
    constructor() {
      super(...arguments), this.id = eh++;
    }
    update() {
      let { presenceContext: t10, prevPresenceContext: e10, animationState: i10 } = this.node;
      if (!t10 || !i10) return;
      let { isPresent: s2, onExitComplete: n2 } = t10, r2 = e10?.isPresent;
      if (s2 === r2) return;
      if (s2 && false === r2) {
        if (true === this.exit) {
          let { initial: t11 } = this.node.getProps();
          if (t11 && !Array.isArray(t11)) {
            let { transition: e11, transitionEnd: i11, ...s3 } = (0, o.resolveVariant)(this.node, t11) || {};
            for (let t12 in s3) this.node.getValue(t12)?.jump(s3[t12]);
          }
          this.node.blockInitialAnimation = false, i10.reset(), i10.animateChanges();
        } else i10.setActive("exit", false);
        this.exit = void 0;
        return;
      }
      let a2 = this.exit = i10.setActive("exit", !s2);
      n2 && !s2 && a2.then(() => {
        this.exit === a2 && (this.exit = true, n2(this.id));
      });
    }
    mount() {
      let { register: t10, onExitComplete: e10 } = this.node.presenceContext || {};
      e10 && e10(this.id), t10 && (this.unmount = t10(this.id));
    }
    unmount() {
    }
  }
  var ec = r, ed = t.i(30162);
  function em(t10) {
    return [t10("x"), t10("y")];
  }
  var ep = t.i(53689), ef = t.i(27677);
  function ey(t10, e10, i10, s2 = { passive: true }) {
    return t10.addEventListener(e10, i10, s2), () => t10.removeEventListener(e10, i10, s2);
  }
  let eg = { x: false, y: false };
  var ev = t.i(65091);
  function ex(t10) {
    return t10.max - t10.min;
  }
  function eT(t10, e10, i10, s2 = 0.5) {
    t10.origin = s2, t10.originPoint = (0, D.mixNumber)(e10.min, e10.max, t10.origin), t10.scale = ex(i10) / ex(e10), t10.translate = (0, D.mixNumber)(i10.min, i10.max, t10.origin) - t10.originPoint, (t10.scale >= 0.9999 && t10.scale <= 1.0001 || isNaN(t10.scale)) && (t10.scale = 1), (t10.translate >= -0.01 && t10.translate <= 0.01 || isNaN(t10.translate)) && (t10.translate = 0);
  }
  function eb(t10, e10, i10, s2) {
    eT(t10.x, e10.x, i10.x, s2 ? s2.originX : void 0), eT(t10.y, e10.y, i10.y, s2 ? s2.originY : void 0);
  }
  function ew(t10, e10, i10, s2 = 0) {
    t10.min = (s2 ? (0, D.mixNumber)(i10.min, i10.max, s2) : i10.min) + e10.min, t10.max = t10.min + ex(e10);
  }
  function eS(t10, e10, i10, s2 = 0) {
    let n2 = s2 ? (0, D.mixNumber)(i10.min, i10.max, s2) : i10.min;
    t10.min = e10.min - n2, t10.max = t10.min + ex(e10);
  }
  function eP(t10, e10, i10, s2) {
    eS(t10.x, e10.x, i10.x, s2?.x), eS(t10.y, e10.y, i10.y, s2?.y);
  }
  var eA = t.i(42824);
  function eM(t10) {
    return (0, eA.isObject)(t10) && "ownerSVGElement" in t10;
  }
  function eE(t10, e10, i10) {
    if (null == t10) return [];
    if (t10 instanceof EventTarget) return [t10];
    if ("string" == typeof t10) {
      let s2 = document;
      e10 && (s2 = e10.current);
      let n2 = i10?.[t10] ?? s2.querySelectorAll(t10);
      return n2 ? Array.from(n2) : [];
    }
    return Array.from(t10).filter((t11) => null != t11);
  }
  t.s(["isSVGElement", 0, eM], 89026), t.s(["resolveElements", 0, eE], 49652);
  let eC = /* @__PURE__ */ new WeakMap(), eV = (t10, e10, i10) => (s2, n2) => n2 && n2[0] ? n2[0][t10 + "Size"] : eM(s2) && "getBBox" in s2 ? s2.getBBox()[e10] : s2[i10], eD = eV("inline", "width", "offsetWidth"), ek = eV("block", "height", "offsetHeight");
  function eR({ target: t10, borderBoxSize: e10 }) {
    eC.get(t10)?.forEach((i10) => {
      i10(t10, { get width() {
        return eD(t10, e10);
      }, get height() {
        return ek(t10, e10);
      } });
    });
  }
  function eL(t10) {
    t10.forEach(eR);
  }
  let eB = /* @__PURE__ */ new Set();
  function eF(t10, s2) {
    let n2;
    return "function" == typeof t10 ? (eB.add(t10), i || (i = () => {
      let t11 = { get width() {
        return window.innerWidth;
      }, get height() {
        return window.innerHeight;
      } };
      eB.forEach((e10) => e10(t11));
    }, window.addEventListener("resize", i)), () => {
      eB.delete(t10), eB.size || "function" != typeof i || (window.removeEventListener("resize", i), i = void 0);
    }) : (!e && "u" > typeof ResizeObserver && (e = new ResizeObserver(eL)), (n2 = eE(t10)).forEach((t11) => {
      let i10 = eC.get(t11);
      i10 || (i10 = /* @__PURE__ */ new Set(), eC.set(t11, i10)), i10.add(s2), e?.observe(t11);
    }), () => {
      n2.forEach((t11) => {
        let i10 = eC.get(t11);
        i10?.delete(s2), i10?.size || e?.unobserve(t11);
      });
    });
  }
  let ej = /* @__PURE__ */ new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]), eI = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]), eO = (t10) => "mouse" === t10.pointerType ? "number" != typeof t10.button || t10.button <= 0 : false !== t10.isPrimary;
  function eN(t10) {
    return { point: { x: t10.pageX, y: t10.pageY } };
  }
  function eU(t10, e10, i10, s2) {
    return ey(t10, e10, (t11) => eO(t11) && i10(t11, eN(t11)), s2);
  }
  let e$ = ({ current: t10 }) => t10 ? t10.ownerDocument.defaultView : null;
  var eW = t.i(25522);
  let ez = (t10, e10) => Math.abs(t10 - e10), eG = /* @__PURE__ */ new Set(["auto", "scroll"]);
  class eY {
    constructor(t10, e10, { transformPagePoint: i10, contextWindow: s2 = window, dragSnapToOrigin: n2 = false, distanceThreshold: r2 = 3, element: o2 } = {}) {
      if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (t11) => {
        this.handleScroll(t11.target);
      }, this.onWindowScroll = () => {
        this.handleScroll(window);
      }, this.updatePoint = () => {
        var t11, e11;
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        this.hasPendingMove = false, this.lastRawMoveEventInfo && (this.lastMoveEventInfo = eH(this.lastRawMoveEventInfo, this.transformPagePoint));
        let i11 = eX(this.lastMoveEventInfo, this.history), s3 = null !== this.startEvent, n3 = (t11 = i11.offset, e11 = { x: 0, y: 0 }, Math.sqrt(ez(t11.x, e11.x) ** 2 + ez(t11.y, e11.y) ** 2) >= this.distanceThreshold);
        if (!s3 && !n3) return;
        let { point: r3 } = i11;
        this.history.push({ ...r3, timestamp: g.time.now() });
        let { onStart: o3, onMove: a3 } = this.handlers;
        s3 || (o3 && o3(this.lastMoveEvent, i11), this.startEvent = this.lastMoveEvent), a3 && a3(this.lastMoveEvent, i11);
      }, this.handlePointerMove = (t11, e11) => {
        this.lastMoveEvent = t11, this.lastRawMoveEventInfo = e11, this.lastMoveEventInfo = eH(e11, this.transformPagePoint), this.hasPendingMove = true, G.frame.update(this.updatePoint, true);
      }, this.handlePointerUp = (t11, e11) => {
        this.hasPendingMove && this.updatePoint(), this.end();
        let { onEnd: i11, onSessionEnd: s3, resumeAnimation: n3 } = this.handlers;
        if ((this.dragSnapToOrigin || !this.startEvent) && n3 && n3(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        let r3 = eX("pointercancel" === t11.type ? this.lastMoveEventInfo : eH(e11, this.transformPagePoint), this.history);
        this.startEvent && i11 && i11(t11, r3), s3 && s3(t11, r3);
      }, !eO(t10)) return;
      this.dragSnapToOrigin = n2, this.handlers = e10, this.transformPagePoint = i10, this.distanceThreshold = r2, this.contextWindow = s2 || window;
      const a2 = eH(eN(t10), this.transformPagePoint), { point: l2 } = a2, { timestamp: h2 } = z.frameData;
      this.history = [{ ...l2, timestamp: h2 }];
      const { onSessionStart: u2 } = e10;
      u2 && u2(t10, eX(a2, this.history));
      const c2 = { passive: true, capture: true };
      this.removeListeners = v(eU(this.contextWindow, "pointermove", this.handlePointerMove, c2), eU(this.contextWindow, "pointerup", this.handlePointerUp, c2), eU(this.contextWindow, "pointercancel", this.handlePointerUp, c2)), o2 && this.startScrollTracking(o2);
    }
    startScrollTracking(t10) {
      let e10 = t10.parentElement;
      for (; e10; ) {
        let t11 = getComputedStyle(e10);
        (eG.has(t11.overflowX) || eG.has(t11.overflowY)) && this.scrollPositions.set(e10, { x: e10.scrollLeft, y: e10.scrollTop }), e10 = e10.parentElement;
      }
      this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }), window.addEventListener("scroll", this.onElementScroll, { capture: true }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
        window.removeEventListener("scroll", this.onElementScroll, { capture: true }), window.removeEventListener("scroll", this.onWindowScroll);
      };
    }
    handleScroll(t10) {
      let e10 = this.scrollPositions.get(t10);
      if (!e10) return;
      let i10 = t10 === window, s2 = i10 ? { x: window.scrollX, y: window.scrollY } : { x: t10.scrollLeft, y: t10.scrollTop }, n2 = { x: s2.x - e10.x, y: s2.y - e10.y };
      (0 !== n2.x || 0 !== n2.y) && (i10 ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += n2.x, this.lastMoveEventInfo.point.y += n2.y) : this.history.length > 0 && (this.history[0].x -= n2.x, this.history[0].y -= n2.y), this.scrollPositions.set(t10, s2), G.frame.update(this.updatePoint, true));
    }
    updateHandlers(t10) {
      this.handlers = t10;
    }
    end() {
      this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), (0, G.cancelFrame)(this.updatePoint);
    }
  }
  function eH(t10, e10) {
    return e10 ? { point: e10(t10.point) } : t10;
  }
  function eK(t10, e10) {
    return { x: t10.x - e10.x, y: t10.y - e10.y };
  }
  function eX({ point: t10 }, e10) {
    return { point: t10, delta: eK(t10, e_(e10)), offset: eK(t10, e10[0]), velocity: (function(t11) {
      if (t11.length < 2) return { x: 0, y: 0 };
      let e11 = t11.length - 1, i10 = null, s2 = e_(t11);
      for (; e11 >= 0 && (i10 = t11[e11], !(s2.timestamp - i10.timestamp > (0, y.secondsToMilliseconds)(0.1))); ) e11--;
      if (!i10) return { x: 0, y: 0 };
      i10 === t11[0] && t11.length > 2 && s2.timestamp - i10.timestamp > 2 * (0, y.secondsToMilliseconds)(0.1) && (i10 = t11[1]);
      let n2 = (0, y.millisecondsToSeconds)(s2.timestamp - i10.timestamp);
      if (0 === n2) return { x: 0, y: 0 };
      let r2 = { x: (s2.x - i10.x) / n2, y: (s2.y - i10.y) / n2 };
      return r2.x === 1 / 0 && (r2.x = 0), r2.y === 1 / 0 && (r2.y = 0), r2;
    })(e10) };
  }
  function e_(t10) {
    return t10[t10.length - 1];
  }
  function eq(t10, e10, i10) {
    return { min: void 0 !== e10 ? t10.min + e10 : void 0, max: void 0 !== i10 ? t10.max + i10 - (t10.max - t10.min) : void 0 };
  }
  function eZ(t10, e10) {
    let i10 = e10.min - t10.min, s2 = e10.max - t10.max;
    return e10.max - e10.min < t10.max - t10.min && ([i10, s2] = [s2, i10]), { min: i10, max: s2 };
  }
  function eJ(t10, e10, i10) {
    return { min: eQ(t10, e10), max: eQ(t10, i10) };
  }
  function eQ(t10, e10) {
    return "number" == typeof t10 ? t10 : t10[e10] || 0;
  }
  let e0 = /* @__PURE__ */ new WeakMap();
  class e1 {
    constructor(t10) {
      this.openDragLock = null, this.isDragging = false, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = false, this.hasMutatedConstraints = false, this.elastic = (0, ed.createBox)(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t10;
    }
    start(t10, { snapToCursor: e10 = false, distanceThreshold: i10 } = {}) {
      let { presenceContext: s2 } = this.visualElement;
      if (s2 && false === s2.isPresent) return;
      let n2 = (t11) => {
        e10 && this.snapToCursor(t11), this.stopAnimation();
      }, r2 = (t11, e11) => {
        let { drag: i11, dragPropagation: s3, onDragStart: n3 } = this.getProps();
        if (i11 && !s3 && (this.openDragLock && this.openDragLock(), this.openDragLock = (function(t12) {
          if ("x" === t12 || "y" === t12) if (eg[t12]) return null;
          else return eg[t12] = true, () => {
            eg[t12] = false;
          };
          return eg.x || eg.y ? null : (eg.x = eg.y = true, () => {
            eg.x = eg.y = false;
          });
        })(i11), !this.openDragLock)) return;
        this.latestPointerEvent = t11, this.latestPanInfo = e11, this.isDragging = true, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = true, this.visualElement.projection.target = void 0), em((t12) => {
          let e12 = this.getAxisMotionValue(t12).get() || 0;
          if (ev.percent.test(e12)) {
            let { projection: i12 } = this.visualElement;
            if (i12 && i12.layout) {
              let s4 = i12.layout.layoutBox[t12];
              s4 && (e12 = ex(s4) * (parseFloat(e12) / 100));
            }
          }
          this.originPoint[t12] = e12;
        }), n3 && G.frame.update(() => n3(t11, e11), false, true), m(this.visualElement, "transform");
        let { animationState: r3 } = this.visualElement;
        r3 && r3.setActive("whileDrag", true);
      }, o2 = (t11, e11) => {
        this.latestPointerEvent = t11, this.latestPanInfo = e11;
        let { dragPropagation: i11, dragDirectionLock: s3, onDirectionLock: n3, onDrag: r3 } = this.getProps();
        if (!i11 && !this.openDragLock) return;
        let { offset: o3 } = e11;
        if (s3 && null === this.currentDirection) {
          this.currentDirection = (function(t12, e12 = 10) {
            let i12 = null;
            return Math.abs(t12.y) > e12 ? i12 = "y" : Math.abs(t12.x) > e12 && (i12 = "x"), i12;
          })(o3), null !== this.currentDirection && n3 && n3(this.currentDirection);
          return;
        }
        this.updateAxis("x", e11.point, o3), this.updateAxis("y", e11.point, o3), this.visualElement.render(), r3 && G.frame.update(() => r3(t11, e11), false, true);
      }, a2 = (t11, e11) => {
        this.latestPointerEvent = t11, this.latestPanInfo = e11, this.stop(t11, e11), this.latestPointerEvent = null, this.latestPanInfo = null;
      }, l2 = () => {
        let { dragSnapToOrigin: t11 } = this.getProps();
        (t11 || this.constraints) && this.startAnimation({ x: 0, y: 0 });
      }, { dragSnapToOrigin: h2 } = this.getProps();
      this.panSession = new eY(t10, { onSessionStart: n2, onStart: r2, onMove: o2, onSessionEnd: a2, resumeAnimation: l2 }, { transformPagePoint: this.visualElement.getTransformPagePoint(), dragSnapToOrigin: h2, distanceThreshold: i10, contextWindow: e$(this.visualElement), element: this.visualElement.current });
    }
    stop(t10, e10) {
      let i10 = t10 || this.latestPointerEvent, s2 = e10 || this.latestPanInfo, n2 = this.isDragging;
      if (this.cancel(), !n2 || !s2 || !i10) return;
      let { velocity: r2 } = s2;
      this.startAnimation(r2);
      let { onDragEnd: o2 } = this.getProps();
      o2 && G.frame.postRender(() => o2(i10, s2));
    }
    cancel() {
      this.isDragging = false;
      let { projection: t10, animationState: e10 } = this.visualElement;
      t10 && (t10.isAnimationBlocked = false), this.endPanSession();
      let { dragPropagation: i10 } = this.getProps();
      !i10 && this.openDragLock && (this.openDragLock(), this.openDragLock = null), e10 && e10.setActive("whileDrag", false);
    }
    endPanSession() {
      this.panSession && this.panSession.end(), this.panSession = void 0;
    }
    updateAxis(t10, e10, i10) {
      let { drag: s2 } = this.getProps();
      if (!i10 || !e4(t10, s2, this.currentDirection)) return;
      let n2 = this.getAxisMotionValue(t10), r2 = this.originPoint[t10] + i10[t10];
      this.constraints && this.constraints[t10] && (r2 = (function(t11, { min: e11, max: i11 }, s3) {
        return void 0 !== e11 && t11 < e11 ? t11 = s3 ? (0, D.mixNumber)(e11, t11, s3.min) : Math.max(t11, e11) : void 0 !== i11 && t11 > i11 && (t11 = s3 ? (0, D.mixNumber)(i11, t11, s3.max) : Math.min(t11, i11)), t11;
      })(r2, this.constraints[t10], this.elastic[t10])), n2.set(r2);
    }
    resolveConstraints() {
      let { dragConstraints: t10, dragElastic: e10 } = this.getProps(), i10 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout, s2 = this.constraints;
      t10 && (0, eW.isRefObject)(t10) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t10 && i10 ? this.constraints = (function(t11, { top: e11, left: i11, bottom: s3, right: n2 }) {
        return { x: eq(t11.x, i11, n2), y: eq(t11.y, e11, s3) };
      })(i10.layoutBox, t10) : this.constraints = false, this.elastic = (function(t11 = 0.35) {
        return false === t11 ? t11 = 0 : true === t11 && (t11 = 0.35), { x: eJ(t11, "left", "right"), y: eJ(t11, "top", "bottom") };
      })(e10), s2 !== this.constraints && !(0, eW.isRefObject)(t10) && i10 && this.constraints && !this.hasMutatedConstraints && em((t11) => {
        var e11, s3;
        let n2;
        false !== this.constraints && this.getAxisMotionValue(t11) && (this.constraints[t11] = (e11 = i10.layoutBox[t11], s3 = this.constraints[t11], n2 = {}, void 0 !== s3.min && (n2.min = s3.min - e11.min), void 0 !== s3.max && (n2.max = s3.max - e11.min), n2));
      });
    }
    resolveRefConstraints() {
      var t10;
      let { dragConstraints: e10, onMeasureDragConstraints: i10 } = this.getProps();
      if (!e10 || !(0, eW.isRefObject)(e10)) return false;
      let s2 = e10.current;
      (0, b.invariant)(null !== s2, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
      let { projection: n2 } = this.visualElement;
      if (!n2 || !n2.layout) return false;
      n2.root && (n2.root.scroll = void 0, n2.root.updateScroll());
      let r2 = (0, ep.measurePageBox)(s2, n2.root, this.visualElement.getTransformPagePoint()), o2 = (t10 = n2.layout.layoutBox, { x: eZ(t10.x, r2.x), y: eZ(t10.y, r2.y) });
      if (i10) {
        let t11 = i10((0, ef.convertBoxToBoundingBox)(o2));
        this.hasMutatedConstraints = !!t11, t11 && (o2 = (0, ef.convertBoundingBoxToBox)(t11));
      }
      return o2;
    }
    startAnimation(t10) {
      let { drag: e10, dragMomentum: i10, dragElastic: s2, dragTransition: n2, dragSnapToOrigin: r2, onDragTransitionEnd: o2 } = this.getProps(), a2 = this.constraints || {};
      return Promise.all(em((o3) => {
        if (!e4(o3, e10, this.currentDirection)) return;
        let l2 = a2 && a2[o3] || {};
        (true === r2 || r2 === o3) && (l2 = { min: 0, max: 0 });
        let h2 = { type: "inertia", velocity: i10 ? t10[o3] : 0, bounceStiffness: s2 ? 200 : 1e6, bounceDamping: s2 ? 40 : 1e7, timeConstant: 750, restDelta: 1, restSpeed: 10, ...n2, ...l2 };
        return this.startAxisValueAnimation(o3, h2);
      })).then(o2);
    }
    startAxisValueAnimation(t10, e10) {
      let i10 = this.getAxisMotionValue(t10);
      return m(this.visualElement, t10), i10.start(t6(t10, i10, 0, e10, this.visualElement, false));
    }
    stopAnimation() {
      em((t10) => this.getAxisMotionValue(t10).stop());
    }
    getAxisMotionValue(t10) {
      let e10 = `_drag${t10.toUpperCase()}`;
      return this.visualElement.getProps()[e10] || this.visualElement.getValue(t10, this.visualElement.latestValues[t10] ?? 0);
    }
    snapToCursor({ clientX: t10, clientY: e10 }) {
      let { drag: i10 } = this.getProps(), s2 = { x: t10, y: e10 }, n2 = this.visualElement.getTransformPagePoint()?.(s2) || s2, r2 = this.visualElement.measureViewportBox();
      em((t11) => {
        if (!e4(t11, i10, this.currentDirection)) return;
        let e11 = this.getAxisMotionValue(t11), { min: s3, max: o2 } = r2[t11];
        e11.set((e11.get() || 0) + n2[t11] - (0, D.mixNumber)(s3, o2, 0.5));
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: t10, dragConstraints: e10 } = this.getProps(), { projection: i10 } = this.visualElement;
      if (!(0, eW.isRefObject)(e10) || !i10 || !this.constraints) return;
      this.stopAnimation();
      let s2 = this.constraints, n2 = { x: 0, y: 0 };
      em((t11) => {
        var e11, i11;
        let r3, o2, a2, l2 = this.getAxisMotionValue(t11).get();
        n2[t11] = (e11 = { min: l2, max: l2 }, i11 = s2[t11], r3 = 0.5, o2 = ex(e11), (a2 = ex(i11)) > o2 ? r3 = tM(i11.min, i11.max - o2, e11.min) : o2 > a2 && (r3 = tM(e11.min, e11.max - a2, i11.min)), (0, x.clamp)(0, 1, r3));
      });
      let { transformTemplate: r2 } = this.visualElement.getProps();
      this.visualElement.current.style.transform = r2 ? r2({}, "") : "none", i10.root && i10.root.updateScroll(), i10.updateLayout(), this.constraints = false, this.resolveConstraints(), em((e11) => {
        let i11 = this.getAxisMotionValue(e11);
        if (!e4(e11, t10, null) || !i11.get()) return;
        let { min: s3, max: r3 } = this.constraints[e11];
        i11.set((0, D.mixNumber)(s3, r3, n2[e11]));
      }), this.visualElement.render();
    }
    addListeners() {
      let t10;
      if (!this.visualElement.current) return;
      e0.set(this.visualElement, this);
      let e10 = this.visualElement.current, i10 = eU(e10, "pointerdown", (t11) => {
        let { drag: i11, dragListener: s3 = true } = this.getProps(), n3 = t11.target, r3 = n3 !== e10 && (eI.has(n3.tagName) || true === n3.isContentEditable);
        i11 && s3 && !r3 && this.start(t11);
      }), s2 = () => {
        var i11, s3, n3;
        let r3, o3, { dragConstraints: a3 } = this.getProps();
        (0, eW.isRefObject)(a3) && a3.current && (this.constraints = this.resolveRefConstraints(), t10 || (i11 = e10, s3 = a3.current, r3 = eF(i11, e2(n3 = () => this.scalePositionWithinConstraints())), o3 = eF(s3, e2(n3)), t10 = () => {
          r3(), o3();
        }));
      }, { projection: n2 } = this.visualElement, r2 = n2.addEventListener("measure", s2);
      n2 && !n2.layout && (n2.root && n2.root.updateScroll(), n2.updateLayout()), G.frame.read(s2);
      let o2 = ey(window, "resize", () => this.scalePositionWithinConstraints()), a2 = n2.addEventListener("didUpdate", ({ delta: t11, hasLayoutChanged: e11 }) => {
        this.isDragging && e11 && (em((e12) => {
          let i11 = this.getAxisMotionValue(e12);
          i11 && (this.originPoint[e12] += t11[e12].translate, i11.set(i11.get() + t11[e12].translate));
        }), this.visualElement.render());
      });
      return () => {
        o2(), i10(), r2(), a2 && a2(), t10 && t10();
      };
    }
    getProps() {
      let t10 = this.visualElement.getProps(), { drag: e10 = false, dragDirectionLock: i10 = false, dragPropagation: s2 = false, dragConstraints: n2 = false, dragElastic: r2 = 0.35, dragMomentum: o2 = true } = t10;
      return { ...t10, drag: e10, dragDirectionLock: i10, dragPropagation: s2, dragConstraints: n2, dragElastic: r2, dragMomentum: o2 };
    }
  }
  function e2(t10) {
    let e10 = true;
    return () => {
      if (e10) {
        e10 = false;
        return;
      }
      t10();
    };
  }
  function e4(t10, e10, i10) {
    return (true === e10 || e10 === t10) && (null === i10 || i10 === t10);
  }
  class e5 extends ec.Feature {
    constructor(t10) {
      super(t10), this.removeGroupControls = ta.noop, this.removeListeners = ta.noop, this.controls = new e1(t10);
    }
    mount() {
      let { dragControls: t10 } = this.node.getProps();
      t10 && (this.removeGroupControls = t10.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || ta.noop;
    }
    update() {
      let { dragControls: t10 } = this.node.getProps(), { dragControls: e10 } = this.node.prevProps || {};
      t10 !== e10 && (this.removeGroupControls(), t10 && (this.removeGroupControls = t10.subscribe(this.controls)));
    }
    unmount() {
      this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
    }
  }
  var e3 = r;
  let e6 = (t10) => (e10, i10) => {
    t10 && G.frame.update(() => t10(e10, i10), false, true);
  };
  class e7 extends e3.Feature {
    constructor() {
      super(...arguments), this.removePointerDownListener = ta.noop;
    }
    onPointerDown(t10) {
      this.session = new eY(t10, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint(), contextWindow: e$(this.node) });
    }
    createPanHandlers() {
      let { onPanSessionStart: t10, onPanStart: e10, onPan: i10, onPanEnd: s2 } = this.node.getProps();
      return { onSessionStart: e6(t10), onStart: e6(e10), onMove: e6(i10), onEnd: (t11, e11) => {
        delete this.session, s2 && G.frame.postRender(() => s2(t11, e11));
      } };
    }
    mount() {
      this.removePointerDownListener = eU(this.node.current, "pointerdown", (t10) => this.onPointerDown(t10));
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      this.removePointerDownListener(), this.session && this.session.end();
    }
  }
  var e8 = t.i(43476);
  let e9 = { hasAnimatedSinceResize: true, hasEverUpdated: false };
  var it = t.i(60140), ie = t.i(71645), ii = t.i(64978), is = t.i(31178), ir = t.i(4035);
  let io = false;
  class ia extends ie.Component {
    componentDidMount() {
      let { visualElement: t10, layoutGroup: e10, switchLayoutGroup: i10, layoutId: s2 } = this.props, { projection: n2 } = t10;
      n2 && (e10.group && e10.group.add(n2), i10 && i10.register && s2 && i10.register(n2), io && n2.root.didUpdate(), n2.addEventListener("animationComplete", () => {
        this.safeToRemove();
      }), n2.setOptions({ ...n2.options, layoutDependency: this.props.layoutDependency, onExitComplete: () => this.safeToRemove() })), e9.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(t10) {
      let { layoutDependency: e10, visualElement: i10, drag: s2, isPresent: n2 } = this.props, { projection: r2 } = i10;
      return r2 && (r2.isPresent = n2, t10.layoutDependency !== e10 && r2.setOptions({ ...r2.options, layoutDependency: e10 }), io = true, s2 || t10.layoutDependency !== e10 || void 0 === e10 || t10.isPresent !== n2 ? r2.willUpdate() : this.safeToRemove(), t10.isPresent !== n2 && (n2 ? r2.promote() : r2.relegate() || G.frame.postRender(() => {
        let t11 = r2.getStack();
        t11 && t11.members.length || this.safeToRemove();
      }))), null;
    }
    componentDidUpdate() {
      let { visualElement: t10, layoutAnchor: e10 } = this.props, { projection: i10 } = t10;
      i10 && (i10.options.layoutAnchor = e10, i10.root.didUpdate(), it.microtask.postRender(() => {
        !i10.currentAnimation && i10.isLead() && this.safeToRemove();
      }));
    }
    componentWillUnmount() {
      let { visualElement: t10, layoutGroup: e10, switchLayoutGroup: i10 } = this.props, { projection: s2 } = t10;
      io = true, s2 && (s2.scheduleCheckAfterUnmount(), e10 && e10.group && e10.group.remove(s2), i10 && i10.deregister && i10.deregister(s2));
    }
    safeToRemove() {
      let { safeToRemove: t10 } = this.props;
      t10 && t10();
    }
    render() {
      return null;
    }
  }
  function il(t10) {
    let [e10, i10] = (0, ii.usePresence)(), s2 = (0, ie.useContext)(is.LayoutGroupContext);
    return (0, e8.jsx)(ia, { ...t10, layoutGroup: s2, switchLayoutGroup: (0, ie.useContext)(ir.SwitchLayoutGroupContext), isPresent: e10, safeToRemove: i10 });
  }
  var ih = t.i(70596);
  function iu(t10, e10, i10) {
    let s2 = (0, d.isMotionValue)(t10) ? t10 : (0, u.motionValue)(t10);
    return s2.start(t6("", s2, e10, i10)), s2.animation;
  }
  t.s(["animateSingleValue", 0, iu], 68705);
  var ic = t.i(24463), id = t.i(33871);
  let im = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], ip = (t10) => "number" == typeof t10 ? t10 : parseFloat(t10);
  t.s(["asNumber", 0, ip], 85260);
  let iy = im.length, ig = (t10) => "number" == typeof t10 || ev.px.test(t10);
  function iv(t10, e10) {
    return void 0 !== t10[e10] ? t10[e10] : t10.borderRadius;
  }
  let ix = ib(0, 0.5, tb), iT = ib(0.5, 0.95, ta.noop);
  function ib(t10, e10, i10) {
    return (s2) => s2 < t10 ? 0 : s2 > e10 ? 1 : i10(tM(t10, e10, s2));
  }
  function iw(t10, e10) {
    t10.min = e10.min, t10.max = e10.max;
  }
  function iS(t10, e10) {
    iw(t10.x, e10.x), iw(t10.y, e10.y);
  }
  function iP(t10, e10) {
    t10.translate = e10.translate, t10.scale = e10.scale, t10.originPoint = e10.originPoint, t10.origin = e10.origin;
  }
  var iA = t.i(35636);
  function iM(t10, e10, i10, s2, n2) {
    return t10 -= e10, t10 = (0, iA.scalePoint)(t10, 1 / i10, s2), void 0 !== n2 && (t10 = (0, iA.scalePoint)(t10, 1 / n2, s2)), t10;
  }
  function iE(t10, e10, [i10, s2, n2], r2, o2) {
    !(function(t11, e11 = 0, i11 = 1, s3 = 0.5, n3, r3 = t11, o3 = t11) {
      if (ev.percent.test(e11) && (e11 = parseFloat(e11), e11 = (0, D.mixNumber)(o3.min, o3.max, e11 / 100) - o3.min), "number" != typeof e11) return;
      let a2 = (0, D.mixNumber)(r3.min, r3.max, s3);
      t11 === r3 && (a2 -= e11), t11.min = iM(t11.min, e11, i11, a2, n3), t11.max = iM(t11.max, e11, i11, a2, n3);
    })(t10, e10[i10], e10[s2], e10[n2], e10.scale, r2, o2);
  }
  let iC = ["x", "scaleX", "originX"], iV = ["y", "scaleY", "originY"];
  function iD(t10, e10, i10, s2) {
    iE(t10.x, e10, iC, i10 ? i10.x : void 0, s2 ? s2.x : void 0), iE(t10.y, e10, iV, i10 ? i10.y : void 0, s2 ? s2.y : void 0);
  }
  function ik(t10) {
    return 0 === t10.translate && 1 === t10.scale;
  }
  function iR(t10) {
    return ik(t10.x) && ik(t10.y);
  }
  function iL(t10, e10) {
    return t10.min === e10.min && t10.max === e10.max;
  }
  function iB(t10, e10) {
    return Math.round(t10.min) === Math.round(e10.min) && Math.round(t10.max) === Math.round(e10.max);
  }
  function iF(t10, e10) {
    return iB(t10.x, e10.x) && iB(t10.y, e10.y);
  }
  function ij(t10) {
    return ex(t10.x) / ex(t10.y);
  }
  function iI(t10, e10) {
    return t10.translate === e10.translate && t10.scale === e10.scale && t10.originPoint === e10.originPoint;
  }
  var iO = t.i(33887);
  class iN {
    constructor() {
      this.members = [];
    }
    add(t10) {
      (0, iO.addUniqueItem)(this.members, t10);
      for (let e10 = this.members.length - 1; e10 >= 0; e10--) {
        let i10 = this.members[e10];
        if (i10 === t10 || i10 === this.lead || i10 === this.prevLead) continue;
        let s2 = i10.instance;
        s2 && false !== s2.isConnected || i10.snapshot || ((0, iO.removeItem)(this.members, i10), i10.unmount());
      }
      t10.scheduleRender();
    }
    remove(t10) {
      if ((0, iO.removeItem)(this.members, t10), t10 === this.prevLead && (this.prevLead = void 0), t10 === this.lead) {
        let t11 = this.members[this.members.length - 1];
        t11 && this.promote(t11);
      }
    }
    relegate(t10) {
      for (let e10 = this.members.indexOf(t10) - 1; e10 >= 0; e10--) {
        let t11 = this.members[e10];
        if (false !== t11.isPresent && t11.instance?.isConnected !== false) return this.promote(t11), true;
      }
      return false;
    }
    promote(t10, e10) {
      let i10 = this.lead;
      if (t10 !== i10 && (this.prevLead = i10, this.lead = t10, t10.show(), i10)) {
        i10.updateSnapshot(), t10.scheduleRender();
        let { layoutDependency: s2 } = i10.options, { layoutDependency: n2 } = t10.options;
        (void 0 === s2 || s2 !== n2) && (t10.resumeFrom = i10, e10 && (i10.preserveOpacity = true), i10.snapshot && (t10.snapshot = i10.snapshot, t10.snapshot.latestValues = i10.animationValues || i10.latestValues), t10.root?.isUpdating && (t10.isLayoutDirty = true)), false === t10.options.crossfade && i10.hide();
      }
    }
    exitAnimationComplete() {
      this.members.forEach((t10) => {
        t10.options.onExitComplete?.(), t10.resumingFrom?.options.onExitComplete?.();
      });
    }
    scheduleRender() {
      this.members.forEach((t10) => t10.instance && t10.scheduleRender(false));
    }
    removeLeadSnapshot() {
      this.lead?.snapshot && (this.lead.snapshot = void 0);
    }
  }
  function iU(t10, e10) {
    return e10.max === e10.min ? 0 : t10 / (e10.max - e10.min) * 100;
  }
  let i$ = { correct: (t10, e10) => {
    if (!e10.target) return t10;
    if ("string" == typeof t10) if (!ev.px.test(t10)) return t10;
    else t10 = parseFloat(t10);
    let i10 = iU(t10, e10.target.x), s2 = iU(t10, e10.target.y);
    return `${i10}% ${s2}%`;
  } }, iW = { borderRadius: { ...i$, applyTo: [...im] }, borderTopLeftRadius: i$, borderTopRightRadius: i$, borderBottomLeftRadius: i$, borderBottomRightRadius: i$, boxShadow: { correct: (t10, { treeScale: e10, projectionDelta: i10 }) => {
    let s2 = P.complex.parse(t10);
    if (s2.length > 5) return t10;
    let n2 = P.complex.createTransformer(t10), r2 = +("number" != typeof s2[0]), o2 = i10.x.scale * e10.x, a2 = i10.y.scale * e10.y;
    s2[0 + r2] /= o2, s2[1 + r2] /= a2;
    let l2 = (0, D.mixNumber)(o2, a2, 0.5);
    return "number" == typeof s2[2 + r2] && (s2[2 + r2] /= l2), "number" == typeof s2[3 + r2] && (s2[3 + r2] /= l2), n2(s2);
  } } }, iz = (t10, e10) => t10.depth - e10.depth;
  class iG {
    constructor() {
      this.children = [], this.isDirty = false;
    }
    add(t10) {
      (0, iO.addUniqueItem)(this.children, t10), this.isDirty = true;
    }
    remove(t10) {
      (0, iO.removeItem)(this.children, t10), this.isDirty = true;
    }
    forEach(t10) {
      this.isDirty && this.children.sort(iz), this.isDirty = false, this.children.forEach(t10);
    }
  }
  var iY = t.i(77777);
  Object.assign(ic.scaleCorrectors, { ...iW, ...ic.scaleCorrectors });
  let iH = ["", "X", "Y", "Z"], iK = 0;
  function iX(t10, e10, i10, s2) {
    let { latestValues: n2 } = e10;
    n2[t10] && (i10[t10] = n2[t10], e10.setStaticValue(t10, 0), s2 && (s2[t10] = 0));
  }
  function i_({ attachResizeListener: t10, defaultParent: e10, measureScroll: i10, checkIsScrollRoot: s2, resetTransform: n2 }) {
    return class {
      constructor(t11 = {}, i11 = e10?.()) {
        this.id = iK++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = false, this.isAnimationBlocked = false, this.isLayoutDirty = false, this.isProjectionDirty = false, this.isSharedProjectionDirty = false, this.isTransformDirty = false, this.updateManuallyBlocked = false, this.updateBlockedByResize = false, this.isUpdating = false, this.isSVG = false, this.needsReset = false, this.shouldResetTransform = false, this.hasCheckedOptimisedAppear = false, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = false, this.updateScheduled = false, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = false, this.checkUpdateFailed = () => {
          this.isUpdating && (this.isUpdating = false, this.clearAllSnapshots());
        }, this.updateProjection = () => {
          this.projectionUpdateScheduled = false, this.nodes.forEach(iJ), this.nodes.forEach(i8), this.nodes.forEach(i9), this.nodes.forEach(iQ);
        }, this.resolvedRelativeTargetAt = 0, this.hasProjected = false, this.isVisible = true, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = t11, this.root = i11 ? i11.root || i11 : this, this.path = i11 ? [...i11.path, i11] : [], this.parent = i11, this.depth = i11 ? i11.depth + 1 : 0;
        for (let t12 = 0; t12 < this.path.length; t12++) this.path[t12].shouldResetTransform = true;
        this.root === this && (this.nodes = new iG());
      }
      addEventListener(t11, e11) {
        return this.eventHandlers.has(t11) || this.eventHandlers.set(t11, new ih.SubscriptionManager()), this.eventHandlers.get(t11).add(e11);
      }
      notifyListeners(t11, ...e11) {
        let i11 = this.eventHandlers.get(t11);
        i11 && i11.notify(...e11);
      }
      hasListeners(t11) {
        return this.eventHandlers.has(t11);
      }
      mount(e11) {
        if (this.instance) return;
        this.isSVG = eM(e11) && !(eM(e11) && "svg" === e11.tagName), this.instance = e11;
        let { layoutId: i11, layout: s3, visualElement: n3 } = this.options;
        if (n3 && !n3.current && n3.mount(e11), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (s3 || i11) && (this.isLayoutDirty = true), t10) {
          let i12, s4 = 0, n4 = () => this.root.updateBlockedByResize = false;
          G.frame.read(() => {
            s4 = window.innerWidth;
          }), t10(e11, () => {
            let t11 = window.innerWidth;
            if (t11 !== s4) {
              let e12, r2;
              s4 = t11, this.root.updateBlockedByResize = true, i12 && i12(), e12 = g.time.now(), r2 = ({ timestamp: t12 }) => {
                let i13 = t12 - e12;
                i13 >= 250 && ((0, G.cancelFrame)(r2), n4());
              }, G.frame.setup(r2, true), i12 = () => (0, G.cancelFrame)(r2), e9.hasAnimatedSinceResize && (e9.hasAnimatedSinceResize = false, this.nodes.forEach(i7));
            }
          });
        }
        i11 && this.root.registerSharedNode(i11, this), false !== this.options.animate && n3 && (i11 || s3) && this.addEventListener("didUpdate", ({ delta: t11, hasLayoutChanged: e12, hasRelativeLayoutChanged: i12, layout: s4 }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0, this.relativeTarget = void 0;
            return;
          }
          let r2 = this.options.transition || n3.getDefaultTransition() || sr, { onLayoutAnimationStart: o2, onLayoutAnimationComplete: a2 } = n3.getProps(), h2 = !this.targetLayout || !iF(this.targetLayout, s4), u2 = !e12 && i12;
          if (this.options.layoutRoot || this.resumeFrom || u2 || e12 && (h2 || !this.currentAnimation)) {
            this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
            let e13 = { ...l(r2, "layout"), onPlay: o2, onComplete: a2 };
            (n3.shouldReduceMotion || this.options.layoutRoot) && (e13.delay = 0, e13.type = false), this.startAnimation(e13), this.setAnimationOrigin(t11, u2, e13.path);
          } else e12 || i7(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
          this.targetLayout = s4;
        });
      }
      unmount() {
        this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
        let t11 = this.getStack();
        t11 && t11.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), (0, G.cancelFrame)(this.updateProjection);
      }
      blockUpdate() {
        this.updateManuallyBlocked = true;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = false;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
      }
      startUpdate() {
        !this.isUpdateBlocked() && (this.isUpdating = true, this.nodes && this.nodes.forEach(st), this.animationId++);
      }
      getTransformTemplate() {
        let { visualElement: t11 } = this.options;
        return t11 && t11.getProps().transformTemplate;
      }
      willUpdate(t11 = true) {
        if (this.root.hasTreeAnimated = true, this.root.isUpdateBlocked()) {
          this.options.onExitComplete && this.options.onExitComplete();
          return;
        }
        if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && (function t12(e12) {
          if (e12.hasCheckedOptimisedAppear = true, e12.root === e12) return;
          let { visualElement: i12 } = e12.options;
          if (!i12) return;
          let s4 = f(i12);
          if (window.MotionHasOptimisedAnimation(s4, "transform")) {
            let { layout: t13, layoutId: i13 } = e12.options;
            window.MotionCancelOptimisedAnimation(s4, "transform", G.frame, !(t13 || i13));
          }
          let { parent: n3 } = e12;
          n3 && !n3.hasCheckedOptimisedAppear && t12(n3);
        })(this), this.root.isUpdating || this.root.startUpdate(), this.isLayoutDirty) return;
        this.isLayoutDirty = true;
        for (let t12 = 0; t12 < this.path.length; t12++) {
          let e12 = this.path[t12];
          e12.shouldResetTransform = true, ("string" == typeof e12.latestValues.x || "string" == typeof e12.latestValues.y) && (e12.isLayoutDirty = true), e12.updateScroll("snapshot"), e12.options.layoutRoot && e12.willUpdate(false);
        }
        let { layoutId: e11, layout: i11 } = this.options;
        if (void 0 === e11 && !i11) return;
        let s3 = this.getTransformTemplate();
        this.prevTransformTemplateValue = s3 ? s3(this.latestValues, "") : void 0, this.updateSnapshot(), t11 && this.notifyListeners("willUpdate");
      }
      update() {
        if (this.updateScheduled = false, this.isUpdateBlocked()) {
          let t12 = this.updateBlockedByResize;
          this.unblockUpdate(), this.updateBlockedByResize = false, this.clearAllSnapshots(), t12 && this.nodes.forEach(i2), this.nodes.forEach(i1);
          return;
        }
        if (this.animationId <= this.animationCommitId) return void this.nodes.forEach(i4);
        this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = false, this.nodes.forEach(i5), this.nodes.forEach(i3), this.nodes.forEach(i6), this.nodes.forEach(iq), this.nodes.forEach(iZ)) : this.nodes.forEach(i4), this.clearAllSnapshots();
        let t11 = g.time.now();
        z.frameData.delta = (0, x.clamp)(0, 1e3 / 60, t11 - z.frameData.timestamp), z.frameData.timestamp = t11, z.frameData.isProcessing = true, G.frameSteps.update.process(z.frameData), G.frameSteps.preRender.process(z.frameData), G.frameSteps.render.process(z.frameData), z.frameData.isProcessing = false;
      }
      didUpdate() {
        this.updateScheduled || (this.updateScheduled = true, it.microtask.read(this.scheduleUpdate));
      }
      clearAllSnapshots() {
        this.nodes.forEach(i0), this.sharedNodes.forEach(se);
      }
      scheduleUpdateProjection() {
        this.projectionUpdateScheduled || (this.projectionUpdateScheduled = true, G.frame.preRender(this.updateProjection, false, true));
      }
      scheduleCheckAfterUnmount() {
        G.frame.postRender(() => {
          this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
        });
      }
      updateSnapshot() {
        !this.snapshot && this.instance && (this.snapshot = this.measure(), !this.snapshot || ex(this.snapshot.measuredBox.x) || ex(this.snapshot.measuredBox.y) || (this.snapshot = void 0));
      }
      updateLayout() {
        if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
        if (this.resumeFrom && !this.resumeFrom.instance) for (let t12 = 0; t12 < this.path.length; t12++) this.path[t12].updateScroll();
        let t11 = this.layout;
        this.layout = this.measure(false), this.layoutCorrected || (this.layoutCorrected = (0, ed.createBox)()), this.isLayoutDirty = false, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
        let { visualElement: e11 } = this.options;
        e11 && e11.notify("LayoutMeasure", this.layout.layoutBox, t11 ? t11.layoutBox : void 0);
      }
      updateScroll(t11 = "measure") {
        let e11 = !!(this.options.layoutScroll && this.instance);
        if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === t11 && (e11 = false), e11 && this.instance) {
          let e12 = s2(this.instance);
          this.scroll = { animationId: this.root.animationId, phase: t11, isRoot: e12, offset: i10(this.instance), wasRoot: this.scroll ? this.scroll.isRoot : e12 };
        }
      }
      resetTransform() {
        if (!n2) return;
        let t11 = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, e11 = this.projectionDelta && !iR(this.projectionDelta), i11 = this.getTransformTemplate(), s3 = i11 ? i11(this.latestValues, "") : void 0, r2 = s3 !== this.prevTransformTemplateValue;
        t11 && this.instance && (e11 || (0, iY.hasTransform)(this.latestValues) || r2) && (n2(this.instance, s3), this.shouldResetTransform = false, this.scheduleRender());
      }
      measure(t11 = true) {
        var e11;
        let i11 = this.measurePageBox(), s3 = this.removeElementScroll(i11);
        return t11 && (s3 = this.removeTransform(s3)), sl((e11 = s3).x), sl(e11.y), { animationId: this.root.animationId, measuredBox: i11, layoutBox: s3, latestValues: {}, source: this.id };
      }
      measurePageBox() {
        let { visualElement: t11 } = this.options;
        if (!t11) return (0, ed.createBox)();
        let e11 = t11.measureViewportBox();
        if (!(this.scroll?.wasRoot || this.path.some(su))) {
          let { scroll: t12 } = this.root;
          t12 && ((0, iA.translateAxis)(e11.x, t12.offset.x), (0, iA.translateAxis)(e11.y, t12.offset.y));
        }
        return e11;
      }
      removeElementScroll(t11) {
        let e11 = (0, ed.createBox)();
        if (iS(e11, t11), this.scroll?.wasRoot) return e11;
        for (let i11 = 0; i11 < this.path.length; i11++) {
          let s3 = this.path[i11], { scroll: n3, options: r2 } = s3;
          s3 !== this.root && n3 && r2.layoutScroll && (n3.wasRoot && iS(e11, t11), (0, iA.translateAxis)(e11.x, n3.offset.x), (0, iA.translateAxis)(e11.y, n3.offset.y));
        }
        return e11;
      }
      applyTransform(t11, e11 = false, i11) {
        let s3 = i11 || (0, ed.createBox)();
        iS(s3, t11);
        for (let t12 = 0; t12 < this.path.length; t12++) {
          let i12 = this.path[t12];
          !e11 && i12.options.layoutScroll && i12.scroll && i12 !== i12.root && ((0, iA.translateAxis)(s3.x, -i12.scroll.offset.x), (0, iA.translateAxis)(s3.y, -i12.scroll.offset.y)), (0, iY.hasTransform)(i12.latestValues) && (0, iA.transformBox)(s3, i12.latestValues, i12.layout?.layoutBox);
        }
        return (0, iY.hasTransform)(this.latestValues) && (0, iA.transformBox)(s3, this.latestValues, this.layout?.layoutBox), s3;
      }
      removeTransform(t11) {
        let e11 = (0, ed.createBox)();
        iS(e11, t11);
        for (let t12 = 0; t12 < this.path.length; t12++) {
          let i11, s3 = this.path[t12];
          (0, iY.hasTransform)(s3.latestValues) && (s3.instance && ((0, iY.hasScale)(s3.latestValues) && s3.updateSnapshot(), iS(i11 = (0, ed.createBox)(), s3.measurePageBox())), iD(e11, s3.latestValues, s3.snapshot?.layoutBox, i11));
        }
        return (0, iY.hasTransform)(this.latestValues) && iD(e11, this.latestValues), e11;
      }
      setTargetDelta(t11) {
        this.targetDelta = t11, this.root.scheduleUpdateProjection(), this.isProjectionDirty = true;
      }
      setOptions(t11) {
        this.options = { ...this.options, ...t11, crossfade: void 0 === t11.crossfade || t11.crossfade };
      }
      clearMeasurements() {
        this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = false;
      }
      forceRelativeParentToResolveTarget() {
        this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== z.frameData.timestamp && this.relativeParent.resolveTargetDelta(true);
      }
      resolveTargetDelta(t11 = false) {
        let e11 = this.getLead();
        this.isProjectionDirty || (this.isProjectionDirty = e11.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = e11.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = e11.isSharedProjectionDirty);
        let i11 = !!this.resumingFrom || this !== e11;
        if (!(t11 || i11 && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
        let { layout: s3, layoutId: n3 } = this.options;
        if (!this.layout || !(s3 || n3)) return;
        this.resolvedRelativeTargetAt = z.frameData.timestamp;
        let r2 = this.getClosestProjectingParent();
        if (this.targetDelta || this.relativeTarget || (false !== this.options.layoutAnchor && r2 && r2.layout ? this.createRelativeTarget(r2, this.layout.layoutBox, r2.layout.layoutBox) : this.removeRelativeTarget()), this.relativeTarget || this.targetDelta) {
          if (this.target || (this.target = (0, ed.createBox)(), this.targetWithTransforms = (0, ed.createBox)()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
            var o2, a2, l2, h2;
            this.forceRelativeParentToResolveTarget(), o2 = this.target, a2 = this.relativeTarget, l2 = this.relativeParent.target, h2 = this.options.layoutAnchor || void 0, ew(o2.x, a2.x, l2.x, h2?.x), ew(o2.y, a2.y, l2.y, h2?.y);
          } else this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, false, this.target) : iS(this.target, this.layout.layoutBox), (0, iA.applyBoxDelta)(this.target, this.targetDelta)) : iS(this.target, this.layout.layoutBox);
          this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = false, false !== this.options.layoutAnchor && r2 && !!r2.resumingFrom == !!this.resumingFrom && !r2.options.layoutScroll && r2.target && 1 !== this.animationProgress ? this.createRelativeTarget(r2, this.target, r2.target) : this.relativeParent = this.relativeTarget = void 0);
        }
      }
      getClosestProjectingParent() {
        if (!(!this.parent || (0, iY.hasScale)(this.parent.latestValues) || (0, iY.has2DTranslate)(this.parent.latestValues))) if (this.parent.isProjecting()) return this.parent;
        else return this.parent.getClosestProjectingParent();
      }
      isProjecting() {
        return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
      }
      createRelativeTarget(t11, e11, i11) {
        this.relativeParent = t11, this.forceRelativeParentToResolveTarget(), this.relativeTarget = (0, ed.createBox)(), this.relativeTargetOrigin = (0, ed.createBox)(), eP(this.relativeTargetOrigin, e11, i11, this.options.layoutAnchor || void 0), iS(this.relativeTarget, this.relativeTargetOrigin);
      }
      removeRelativeTarget() {
        this.relativeParent = this.relativeTarget = void 0;
      }
      calcProjection() {
        let t11 = this.getLead(), e11 = !!this.resumingFrom || this !== t11, i11 = true;
        if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (i11 = false), e11 && (this.isSharedProjectionDirty || this.isTransformDirty) && (i11 = false), this.resolvedRelativeTargetAt === z.frameData.timestamp && (i11 = false), i11) return;
        let { layout: s3, layoutId: n3 } = this.options;
        if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(s3 || n3)) return;
        iS(this.layoutCorrected, this.layout.layoutBox);
        let r2 = this.treeScale.x, o2 = this.treeScale.y;
        (0, iA.applyTreeDeltas)(this.layoutCorrected, this.treeScale, this.path, e11), t11.layout && !t11.target && (1 !== this.treeScale.x || 1 !== this.treeScale.y) && (t11.target = t11.layout.layoutBox, t11.targetWithTransforms = (0, ed.createBox)());
        let { target: a2 } = t11;
        if (!a2) {
          this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
          return;
        }
        this.projectionDelta && this.prevProjectionDelta ? (iP(this.prevProjectionDelta.x, this.projectionDelta.x), iP(this.prevProjectionDelta.y, this.projectionDelta.y)) : this.createProjectionDeltas(), eb(this.projectionDelta, this.layoutCorrected, a2, this.latestValues), this.treeScale.x === r2 && this.treeScale.y === o2 && iI(this.projectionDelta.x, this.prevProjectionDelta.x) && iI(this.projectionDelta.y, this.prevProjectionDelta.y) || (this.hasProjected = true, this.scheduleRender(), this.notifyListeners("projectionUpdate", a2));
      }
      hide() {
        this.isVisible = false;
      }
      show() {
        this.isVisible = true;
      }
      scheduleRender(t11 = true) {
        if (this.options.visualElement?.scheduleRender(), t11) {
          let t12 = this.getStack();
          t12 && t12.scheduleRender();
        }
        this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
      }
      createProjectionDeltas() {
        this.prevProjectionDelta = (0, ed.createDelta)(), this.projectionDelta = (0, ed.createDelta)(), this.projectionDeltaWithTransform = (0, ed.createDelta)();
      }
      setAnimationOrigin(t11, e11 = false, i11) {
        let s3, n3 = this.snapshot, r2 = n3 ? n3.latestValues : {}, o2 = { ...this.latestValues }, a2 = (0, ed.createDelta)();
        this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !e11;
        let l2 = (0, ed.createBox)(), h2 = (n3 ? n3.source : void 0) !== (this.layout ? this.layout.source : void 0), u2 = this.getStack(), c2 = !u2 || u2.members.length <= 1, d2 = !!(h2 && !c2 && true === this.options.crossfade && !this.path.some(sn));
        this.animationProgress = 0;
        let m2 = i11?.interpolateProjection(t11);
        this.mixTargetDelta = (e12) => {
          let i12 = e12 / 1e3, n4 = m2?.(i12);
          if (n4 ? (a2.x.translate = n4.x, a2.x.scale = (0, D.mixNumber)(t11.x.scale, 1, i12), a2.x.origin = t11.x.origin, a2.x.originPoint = t11.x.originPoint, a2.y.translate = n4.y, a2.y.scale = (0, D.mixNumber)(t11.y.scale, 1, i12), a2.y.origin = t11.y.origin, a2.y.originPoint = t11.y.originPoint) : (si(a2.x, t11.x, i12), si(a2.y, t11.y, i12)), this.setTargetDelta(a2), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
            var u3, p2, f2, y2, g2, v2;
            eP(l2, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), f2 = this.relativeTarget, y2 = this.relativeTargetOrigin, g2 = l2, v2 = i12, ss(f2.x, y2.x, g2.x, v2), ss(f2.y, y2.y, g2.y, v2), s3 && (u3 = this.relativeTarget, p2 = s3, iL(u3.x, p2.x) && iL(u3.y, p2.y)) && (this.isProjectionDirty = false), s3 || (s3 = (0, ed.createBox)()), iS(s3, this.relativeTarget);
          }
          h2 && (this.animationValues = o2, (function(t12, e13, i13, s4, n5, r3) {
            n5 ? (t12.opacity = (0, D.mixNumber)(0, i13.opacity ?? 1, ix(s4)), t12.opacityExit = (0, D.mixNumber)(e13.opacity ?? 1, 0, iT(s4))) : r3 && (t12.opacity = (0, D.mixNumber)(e13.opacity ?? 1, i13.opacity ?? 1, s4));
            for (let n6 = 0; n6 < iy; n6++) {
              let r4 = im[n6], o3 = iv(e13, r4), a3 = iv(i13, r4);
              (void 0 !== o3 || void 0 !== a3) && (o3 || (o3 = 0), a3 || (a3 = 0), 0 === o3 || 0 === a3 || ig(o3) === ig(a3) ? (t12[r4] = Math.max((0, D.mixNumber)(ip(o3), ip(a3), s4), 0), (ev.percent.test(a3) || ev.percent.test(o3)) && (t12[r4] += "%")) : t12[r4] = a3);
            }
            (e13.rotate || i13.rotate) && (t12.rotate = (0, D.mixNumber)(e13.rotate || 0, i13.rotate || 0, s4));
          })(o2, r2, this.latestValues, i12, d2, c2)), n4 && void 0 !== n4.rotate && (this.animationValues || (this.animationValues = o2), this.animationValues.pathRotation = n4.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = i12;
        }, this.mixTargetDelta(1e3 * !!this.options.layoutRoot);
      }
      startAnimation(t11) {
        this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && ((0, G.cancelFrame)(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = G.frame.update(() => {
          e9.hasAnimatedSinceResize = true, this.motionValue || (this.motionValue = (0, u.motionValue)(0)), this.motionValue.jump(0, false), this.currentAnimation = iu(this.motionValue, [0, 1e3], { ...t11, velocity: 0, isSync: true, onUpdate: (e11) => {
            this.mixTargetDelta(e11), t11.onUpdate && t11.onUpdate(e11);
          }, onComplete: () => {
            t11.onComplete && t11.onComplete(), this.completeAnimation();
          } }), (0, tj.notifyLayoutAnimationStart)(this.currentAnimation, this), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
        });
      }
      completeAnimation() {
        this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
        let t11 = this.getStack();
        t11 && t11.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
      }
      finishAnimation() {
        this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()), this.completeAnimation();
      }
      applyTransformsToTarget() {
        let t11 = this.getLead(), { targetWithTransforms: e11, layout: i11, latestValues: s3 } = t11, { target: n3 } = t11;
        if (e11 && n3 && i11) {
          if (this !== t11 && this.layout && i11 && sh(this.options.animationType, this.layout.layoutBox, i11.layoutBox)) {
            n3 = this.target || (0, ed.createBox)();
            let e12 = ex(this.layout.layoutBox.x);
            n3.x.min = t11.target.x.min, n3.x.max = n3.x.min + e12;
            let i12 = ex(this.layout.layoutBox.y);
            n3.y.min = t11.target.y.min, n3.y.max = n3.y.min + i12;
          }
          iS(e11, n3), (0, iA.transformBox)(e11, s3), eb(this.projectionDeltaWithTransform, this.layoutCorrected, e11, s3);
        }
      }
      registerSharedNode(t11, e11) {
        this.sharedNodes.has(t11) || this.sharedNodes.set(t11, new iN()), this.sharedNodes.get(t11).add(e11);
        let i11 = e11.options.initialPromotionConfig;
        e11.promote({ transition: i11 ? i11.transition : void 0, preserveFollowOpacity: i11 && i11.shouldPreserveFollowOpacity ? i11.shouldPreserveFollowOpacity(e11) : void 0 });
      }
      isLead() {
        let t11 = this.getStack();
        return !t11 || t11.lead === this;
      }
      getLead() {
        let { layoutId: t11 } = this.options;
        return t11 && this.getStack()?.lead || this;
      }
      getPrevLead() {
        let { layoutId: t11 } = this.options;
        return t11 ? this.getStack()?.prevLead : void 0;
      }
      getStack() {
        let { layoutId: t11 } = this.options;
        if (t11) return this.root.sharedNodes.get(t11);
      }
      promote({ needsReset: t11, transition: e11, preserveFollowOpacity: i11 } = {}) {
        let s3 = this.getStack();
        s3 && s3.promote(this, i11), t11 && (this.projectionDelta = void 0, this.needsReset = true), e11 && this.setOptions({ transition: e11 });
      }
      relegate() {
        let t11 = this.getStack();
        return !!t11 && t11.relegate(this);
      }
      resetSkewAndRotation() {
        let { visualElement: t11 } = this.options;
        if (!t11) return;
        let e11 = false, { latestValues: i11 } = t11;
        if ((i11.z || i11.rotate || i11.rotateX || i11.rotateY || i11.rotateZ || i11.skewX || i11.skewY) && (e11 = true), !e11) return;
        let s3 = {};
        i11.z && iX("z", t11, s3, this.animationValues);
        for (let e12 = 0; e12 < iH.length; e12++) iX(`rotate${iH[e12]}`, t11, s3, this.animationValues), iX(`skew${iH[e12]}`, t11, s3, this.animationValues);
        for (let e12 in t11.render(), s3) t11.setStaticValue(e12, s3[e12]), this.animationValues && (this.animationValues[e12] = s3[e12]);
        t11.scheduleRender();
      }
      applyProjectionStyles(t11, e11) {
        if (!this.instance || this.isSVG) return;
        if (!this.isVisible) {
          t11.visibility = "hidden";
          return;
        }
        let i11 = this.getTransformTemplate();
        if (this.needsReset) {
          this.needsReset = false, t11.visibility = "", t11.opacity = "", t11.pointerEvents = (0, id.resolveMotionValue)(e11?.pointerEvents) || "", t11.transform = i11 ? i11(this.latestValues, "") : "none";
          return;
        }
        let s3 = this.getLead();
        if (!this.projectionDelta || !this.layout || !s3.target) {
          this.options.layoutId && (t11.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1, t11.pointerEvents = (0, id.resolveMotionValue)(e11?.pointerEvents) || ""), this.hasProjected && !(0, iY.hasTransform)(this.latestValues) && (t11.transform = i11 ? i11({}, "") : "none", this.hasProjected = false);
          return;
        }
        t11.visibility = "";
        let n3 = s3.animationValues || s3.latestValues;
        this.applyTransformsToTarget();
        let r2 = (function(t12, e12, i12) {
          let s4 = "", n4 = t12.x.translate / e12.x, r3 = t12.y.translate / e12.y, o3 = i12?.z || 0;
          if ((n4 || r3 || o3) && (s4 = `translate3d(${n4}px, ${r3}px, ${o3}px) `), (1 !== e12.x || 1 !== e12.y) && (s4 += `scale(${1 / e12.x}, ${1 / e12.y}) `), i12) {
            let { transformPerspective: t13, rotate: e13, pathRotation: n5, rotateX: r4, rotateY: o4, skewX: a4, skewY: l3 } = i12;
            t13 && (s4 = `perspective(${t13}px) ${s4}`), e13 && (s4 += `rotate(${e13}deg) `), n5 && (s4 += `rotate(${n5}deg) `), r4 && (s4 += `rotateX(${r4}deg) `), o4 && (s4 += `rotateY(${o4}deg) `), a4 && (s4 += `skewX(${a4}deg) `), l3 && (s4 += `skewY(${l3}deg) `);
          }
          let a3 = t12.x.scale * e12.x, l2 = t12.y.scale * e12.y;
          return (1 !== a3 || 1 !== l2) && (s4 += `scale(${a3}, ${l2})`), s4 || "none";
        })(this.projectionDeltaWithTransform, this.treeScale, n3);
        i11 && (r2 = i11(n3, r2)), t11.transform = r2;
        let { x: o2, y: a2 } = this.projectionDelta;
        for (let e12 in t11.transformOrigin = `${100 * o2.origin}% ${100 * a2.origin}% 0`, s3.animationValues ? t11.opacity = s3 === this ? n3.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : n3.opacityExit : t11.opacity = s3 === this ? void 0 !== n3.opacity ? n3.opacity : "" : void 0 !== n3.opacityExit ? n3.opacityExit : 0, ic.scaleCorrectors) {
          if (void 0 === n3[e12]) continue;
          let { correct: i12, applyTo: o3, isCSSVariable: a3 } = ic.scaleCorrectors[e12], l2 = "none" === r2 ? n3[e12] : i12(n3[e12], s3);
          if (o3) {
            let e13 = o3.length;
            for (let i13 = 0; i13 < e13; i13++) t11[o3[i13]] = l2;
          } else a3 ? this.options.visualElement.renderState.vars[e12] = l2 : t11[e12] = l2;
        }
        this.options.layoutId && (t11.pointerEvents = s3 === this ? (0, id.resolveMotionValue)(e11?.pointerEvents) || "" : "none");
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
      resetTree() {
        this.root.nodes.forEach((t11) => t11.currentAnimation?.stop()), this.root.nodes.forEach(i1), this.root.sharedNodes.clear();
      }
    };
  }
  function iq(t10) {
    t10.updateLayout();
  }
  function iZ(t10) {
    let e10 = t10.resumeFrom?.snapshot || t10.snapshot;
    if (t10.isLead() && t10.layout && e10 && t10.hasListeners("didUpdate")) {
      let { layoutBox: i10, measuredBox: s2 } = t10.layout, { animationType: n2 } = t10.options, r2 = e10.source !== t10.layout.source;
      if ("size" === n2) em((t11) => {
        let s3 = r2 ? e10.measuredBox[t11] : e10.layoutBox[t11], n3 = ex(s3);
        s3.min = i10[t11].min, s3.max = s3.min + n3;
      });
      else if ("x" === n2 || "y" === n2) {
        let t11 = "x" === n2 ? "y" : "x";
        iw(r2 ? e10.measuredBox[t11] : e10.layoutBox[t11], i10[t11]);
      } else sh(n2, e10.layoutBox, i10) && em((s3) => {
        let n3 = r2 ? e10.measuredBox[s3] : e10.layoutBox[s3], o3 = ex(i10[s3]);
        n3.max = n3.min + o3, t10.relativeTarget && !t10.currentAnimation && (t10.isProjectionDirty = true, t10.relativeTarget[s3].max = t10.relativeTarget[s3].min + o3);
      });
      let o2 = (0, ed.createDelta)();
      eb(o2, i10, e10.layoutBox);
      let a2 = (0, ed.createDelta)();
      r2 ? eb(a2, t10.applyTransform(s2, true), e10.measuredBox) : eb(a2, i10, e10.layoutBox);
      let l2 = !iR(o2), h2 = false;
      if (!t10.resumeFrom) {
        let s3 = t10.getClosestProjectingParent();
        if (s3 && !s3.resumeFrom) {
          let { snapshot: n3, layout: r3 } = s3;
          if (n3 && r3) {
            let o3 = t10.options.layoutAnchor || void 0, a3 = (0, ed.createBox)();
            eP(a3, e10.layoutBox, n3.layoutBox, o3);
            let l3 = (0, ed.createBox)();
            eP(l3, i10, r3.layoutBox, o3), iF(a3, l3) || (h2 = true), s3.options.layoutRoot && (t10.relativeTarget = l3, t10.relativeTargetOrigin = a3, t10.relativeParent = s3);
          }
        }
      }
      t10.notifyListeners("didUpdate", { layout: i10, snapshot: e10, delta: a2, layoutDelta: o2, hasLayoutChanged: l2, hasRelativeLayoutChanged: h2 });
    } else if (t10.isLead()) {
      let { onExitComplete: e11 } = t10.options;
      e11 && e11();
    }
    t10.options.transition = void 0;
  }
  function iJ(t10) {
    t10.parent && (t10.isProjecting() || (t10.isProjectionDirty = t10.parent.isProjectionDirty), t10.isSharedProjectionDirty || (t10.isSharedProjectionDirty = !!(t10.isProjectionDirty || t10.parent.isProjectionDirty || t10.parent.isSharedProjectionDirty)), t10.isTransformDirty || (t10.isTransformDirty = t10.parent.isTransformDirty));
  }
  function iQ(t10) {
    t10.isProjectionDirty = t10.isSharedProjectionDirty = t10.isTransformDirty = false;
  }
  function i0(t10) {
    t10.clearSnapshot();
  }
  function i1(t10) {
    t10.clearMeasurements();
  }
  function i2(t10) {
    t10.isLayoutDirty = true, t10.updateLayout();
  }
  function i4(t10) {
    t10.isLayoutDirty = false;
  }
  function i5(t10) {
    t10.isAnimationBlocked && t10.layout && !t10.isLayoutDirty && (t10.snapshot = t10.layout, t10.isLayoutDirty = true);
  }
  function i3(t10) {
    t10.relativeTarget && t10.relativeParent?.isLayoutDirty && (t10.currentAnimation ? t10.isLayoutDirty = true : (t10.targetDelta = void 0, t10.removeRelativeTarget()));
  }
  function i6(t10) {
    let { visualElement: e10 } = t10.options;
    e10 && e10.getProps().onBeforeLayoutMeasure && e10.notify("BeforeLayoutMeasure"), t10.resetTransform();
  }
  function i7(t10) {
    t10.finishAnimation(), t10.targetDelta = t10.relativeTarget = t10.target = void 0, t10.isProjectionDirty = true;
  }
  function i8(t10) {
    t10.resolveTargetDelta();
  }
  function i9(t10) {
    t10.calcProjection();
  }
  function st(t10) {
    t10.resetSkewAndRotation();
  }
  function se(t10) {
    t10.removeLeadSnapshot();
  }
  function si(t10, e10, i10) {
    t10.translate = (0, D.mixNumber)(e10.translate, 0, i10), t10.scale = (0, D.mixNumber)(e10.scale, 1, i10), t10.origin = e10.origin, t10.originPoint = e10.originPoint;
  }
  function ss(t10, e10, i10, s2) {
    t10.min = (0, D.mixNumber)(e10.min, i10.min, s2), t10.max = (0, D.mixNumber)(e10.max, i10.max, s2);
  }
  function sn(t10) {
    return t10.animationValues && void 0 !== t10.animationValues.opacityExit;
  }
  let sr = { duration: 0.45, ease: [0.4, 0, 0.1, 1] }, so = (t10) => "u" > typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t10), sa = so("applewebkit/") && !so("chrome/") ? Math.round : ta.noop;
  function sl(t10) {
    t10.min = sa(t10.min), t10.max = sa(t10.max);
  }
  function sh(t10, e10, i10) {
    return "position" === t10 || "preserve-aspect" === t10 && !(0.2 >= Math.abs(ij(e10) - ij(i10)));
  }
  function su(t10) {
    return t10 !== t10.root && t10.scroll?.wasRoot;
  }
  let sc = i_({ attachResizeListener: (t10, e10) => ey(t10, "resize", e10), measureScroll: () => ({ x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0, y: document.documentElement.scrollTop || document.body?.scrollTop || 0 }), checkIsScrollRoot: () => true }), sd = { current: void 0 }, sm = i_({ measureScroll: (t10) => ({ x: t10.scrollLeft, y: t10.scrollTop }), defaultParent: () => {
    if (!sd.current) {
      let t10 = new sc({});
      t10.mount(window), t10.setOptions({ layoutScroll: true }), sd.current = t10;
    }
    return sd.current;
  }, resetTransform: (t10, e10) => {
    t10.style.transform = void 0 !== e10 ? e10 : "none";
  }, checkIsScrollRoot: (t10) => "fixed" === window.getComputedStyle(t10).position });
  var sp = r;
  function sf(t10, e10) {
    let i10 = eE(t10), s2 = new AbortController();
    return [i10, { passive: true, ...e10, signal: s2.signal }, () => s2.abort()];
  }
  function sy(t10, e10, i10) {
    let { props: s2 } = t10;
    t10.animationState && s2.whileHover && t10.animationState.setActive("whileHover", "Start" === i10);
    let n2 = s2["onHover" + i10];
    n2 && G.frame.postRender(() => n2(e10, eN(e10)));
  }
  class sg extends sp.Feature {
    mount() {
      let { current: t10 } = this.node;
      t10 && (this.unmount = (function(t11, e10, i10 = {}) {
        let [s2, n2, r2] = sf(t11, i10);
        return s2.forEach((t12) => {
          let i11, s3 = false, r3 = false, o2 = (e11) => {
            i11 && (i11(e11), i11 = void 0), t12.removeEventListener("pointerleave", l2);
          }, a2 = (t13) => {
            s3 = false, window.removeEventListener("pointerup", a2), window.removeEventListener("pointercancel", a2), r3 && (r3 = false, o2(t13));
          }, l2 = (t13) => {
            if ("touch" !== t13.pointerType) {
              if (s3) {
                r3 = true;
                return;
              }
              o2(t13);
            }
          };
          t12.addEventListener("pointerenter", (s4) => {
            if ("touch" === s4.pointerType || eg.x || eg.y) return;
            r3 = false;
            let o3 = e10(t12, s4);
            "function" == typeof o3 && (i11 = o3, t12.addEventListener("pointerleave", l2, n2));
          }, n2), t12.addEventListener("pointerdown", () => {
            s3 = true, window.addEventListener("pointerup", a2, n2), window.addEventListener("pointercancel", a2, n2);
          }, n2);
        }), r2;
      })(t10, (t11, e10) => (sy(this.node, e10, "Start"), (t12) => sy(this.node, t12, "End"))));
    }
    unmount() {
    }
  }
  var sv = r;
  class sx extends sv.Feature {
    constructor() {
      super(...arguments), this.isActive = false;
    }
    onFocus() {
      let t10 = false;
      try {
        t10 = this.node.current.matches(":focus-visible");
      } catch (e10) {
        t10 = true;
      }
      t10 && this.node.animationState && (this.node.animationState.setActive("whileFocus", true), this.isActive = true);
    }
    onBlur() {
      this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", false), this.isActive = false);
    }
    mount() {
      this.unmount = v(ey(this.node.current, "focus", () => this.onFocus()), ey(this.node.current, "blur", () => this.onBlur()));
    }
    unmount() {
    }
  }
  var sT = r, sb = t.i(72846);
  let sw = (t10, e10) => !!e10 && (t10 === e10 || sw(t10, e10.parentElement)), sS = /* @__PURE__ */ new WeakSet();
  function sP(t10) {
    return (e10) => {
      "Enter" === e10.key && t10(e10);
    };
  }
  function sA(t10, e10) {
    t10.dispatchEvent(new PointerEvent("pointer" + e10, { isPrimary: true, bubbles: true }));
  }
  function sM(t10) {
    return eO(t10) && !(eg.x || eg.y);
  }
  let sE = /* @__PURE__ */ new WeakSet();
  function sC(t10, e10, i10) {
    let { props: s2 } = t10;
    if (t10.current instanceof HTMLButtonElement && t10.current.disabled) return;
    t10.animationState && s2.whileTap && t10.animationState.setActive("whileTap", "Start" === i10);
    let n2 = s2["onTap" + ("End" === i10 ? "" : i10)];
    n2 && G.frame.postRender(() => n2(e10, eN(e10)));
  }
  class sV extends sT.Feature {
    mount() {
      let { current: t10 } = this.node;
      if (!t10) return;
      let { globalTapTarget: e10, propagate: i10 } = this.node.props;
      this.unmount = (function(t11, e11, i11 = {}) {
        let [s2, n2, r2] = sf(t11, i11), o2 = (t12) => {
          let s3 = t12.currentTarget;
          if (!sM(t12) || sE.has(t12)) return;
          sS.add(s3), i11.stopPropagation && sE.add(t12);
          let r3 = e11(s3, t12), o3 = { ...n2, capture: true }, a2 = (t13, e12) => {
            window.removeEventListener("pointerup", l2, o3), window.removeEventListener("pointercancel", h2, o3), sS.has(s3) && sS.delete(s3), sM(t13) && "function" == typeof r3 && r3(t13, { success: e12 });
          }, l2 = (t13) => {
            a2(t13, s3 === window || s3 === document || i11.useGlobalTarget || sw(s3, t13.target));
          }, h2 = (t13) => {
            a2(t13, false);
          };
          window.addEventListener("pointerup", l2, o3), window.addEventListener("pointercancel", h2, o3);
        };
        return s2.forEach((t12) => {
          ((i11.useGlobalTarget ? window : t12).addEventListener("pointerdown", o2, n2), (0, sb.isHTMLElement)(t12)) && (t12.addEventListener("focus", (t13) => ((t14, e12) => {
            let i12 = t14.currentTarget;
            if (!i12) return;
            let s3 = sP(() => {
              if (sS.has(i12)) return;
              sA(i12, "down");
              let t15 = sP(() => {
                sA(i12, "up");
              });
              i12.addEventListener("keyup", t15, e12), i12.addEventListener("blur", () => sA(i12, "cancel"), e12);
            });
            i12.addEventListener("keydown", s3, e12), i12.addEventListener("blur", () => i12.removeEventListener("keydown", s3), e12);
          })(t13, n2)), ej.has(t12.tagName) || true === t12.isContentEditable || t12.hasAttribute("tabindex") || (t12.tabIndex = 0));
        }), r2;
      })(t10, (t11, e11) => (sC(this.node, e11, "Start"), (t12, { success: e12 }) => sC(this.node, t12, e12 ? "End" : "Cancel")), { useGlobalTarget: e10, stopPropagation: i10?.tap === false });
    }
    unmount() {
    }
  }
  var sD = r;
  let sk = /* @__PURE__ */ new WeakMap(), sR = /* @__PURE__ */ new WeakMap(), sL = (t10) => {
    let e10 = sk.get(t10.target);
    e10 && e10(t10);
  }, sB = (t10) => {
    t10.forEach(sL);
  }, sF = { some: 0, all: 1 };
  class sj extends sD.Feature {
    constructor() {
      super(...arguments), this.hasEnteredView = false, this.isInView = false;
    }
    startObserver() {
      var t10;
      let e10;
      this.stopObserver?.();
      let { viewport: i10 = {} } = this.node.getProps(), { root: s2, margin: n2, amount: r2 = "some", once: o2 } = i10, a2 = { root: s2 ? s2.current : void 0, rootMargin: n2, threshold: "number" == typeof r2 ? r2 : sF[r2] }, l2 = (t11) => {
        let { isIntersecting: e11 } = t11;
        if (this.isInView === e11 || (this.isInView = e11, o2 && !e11 && this.hasEnteredView)) return;
        e11 && (this.hasEnteredView = true), this.node.animationState && this.node.animationState.setActive("whileInView", e11);
        let { onViewportEnter: i11, onViewportLeave: s3 } = this.node.getProps(), n3 = e11 ? i11 : s3;
        n3 && n3(t11);
      };
      this.stopObserver = (t10 = this.node.current, e10 = (function({ root: t11, ...e11 }) {
        let i11 = t11 || document;
        sR.has(i11) || sR.set(i11, {});
        let s3 = sR.get(i11), n3 = JSON.stringify(e11);
        return s3[n3] || (s3[n3] = new IntersectionObserver(sB, { root: t11, ...e11 })), s3[n3];
      })(a2), sk.set(t10, l2), e10.observe(t10), () => {
        sk.delete(t10), e10.unobserve(t10);
      });
    }
    mount() {
      this.startObserver();
    }
    update() {
      if ("u" < typeof IntersectionObserver) return;
      let { props: t10, prevProps: e10 } = this.node;
      ["amount", "margin", "root"].some((function({ viewport: t11 = {} }, { viewport: e11 = {} } = {}) {
        return (i10) => t11[i10] !== e11[i10];
      })(t10, e10)) && this.startObserver();
    }
    unmount() {
      this.stopObserver?.(), this.hasEnteredView = false, this.isInView = false;
    }
  }
  let sI = (0, n.createMotionProxy)({ animation: { Feature: ea }, exit: { Feature: eu }, inView: { Feature: sj }, tap: { Feature: sV }, focus: { Feature: sx }, hover: { Feature: sg }, pan: { Feature: e7 }, drag: { Feature: e5, ProjectionNode: sm, MeasureLayout: il }, layout: { ProjectionNode: sm, MeasureLayout: il } }, s.createDomVisualElement);
  t.s(["motion", 0, sI], 32181);
}]);
