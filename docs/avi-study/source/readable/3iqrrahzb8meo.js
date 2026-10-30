(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 85437, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "Image", { enumerable: true, get: function() {
    return w;
  } });
  let n = e.r(55682), a = e.r(90809), i = e.r(43476), s = a._(e.r(71645)), l = n._(e.r(74080)), o = n._(e.r(25633)), c = e.r(8927), u = e.r(87690), d = e.r(18556), h = e.r(65856), p = n._(e.r(1948)), f = e.r(18581), m = { deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes: [32, 48, 64, 96, 128, 256, 384], qualities: [75], path: "/_next/image", loader: "default", dangerouslyAllowSVG: false, unoptimized: false };
  function g(e2, t2, r2, n2, a2, i2, s2) {
    let l2 = e2?.src;
    e2 && e2["data-loaded-src"] !== l2 && (e2["data-loaded-src"] = l2, ("decode" in e2 ? e2.decode() : Promise.resolve()).catch(() => {
    }).then(() => {
      if (e2.parentElement && e2.isConnected) {
        if ("empty" !== t2 && a2(true), r2?.current) {
          let t3 = new Event("load");
          Object.defineProperty(t3, "target", { writable: false, value: e2 });
          let n3 = false, a3 = false;
          r2.current({ ...t3, nativeEvent: t3, currentTarget: e2, target: e2, isDefaultPrevented: () => n3, isPropagationStopped: () => a3, persist: () => {
          }, preventDefault: () => {
            n3 = true, t3.preventDefault();
          }, stopPropagation: () => {
            a3 = true, t3.stopPropagation();
          } });
        }
        n2?.current && n2.current(e2);
      }
    }));
  }
  function x(e2) {
    return s.use ? { fetchPriority: e2 } : { fetchpriority: e2 };
  }
  "u" < typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = true);
  let k = "u" < typeof window ? s.useEffect : s.useLayoutEffect, y = (0, s.forwardRef)(({ src: e2, srcSet: t2, sizes: r2, height: n2, width: a2, decoding: l2, className: o2, style: c2, fetchPriority: u2, placeholder: d2, loading: h2, unoptimized: p2, fill: m2, onLoadRef: y2, onLoadingCompleteRef: b2, setBlurComplete: w2, setShowAltText: v, sizesInput: _, onLoad: S, onError: j, ...A }, E) => {
    let R = (0, s.useRef)(false), $ = (0, s.useRef)(null);
    k(() => {
      let { current: e3 } = R, { current: t3 } = $;
      e3 || null === t3 || (j && (t3.src = t3.src), t3.complete && g(t3, d2, y2, b2, w2, p2, _), R.current = true);
    }, [e2, d2, y2, b2, j, p2, _]);
    let L = (0, f.useMergedRef)(E, $);
    return (0, i.jsx)("img", { ...A, ...x(u2), loading: h2, width: a2, height: n2, decoding: l2, "data-nimg": m2 ? "fill" : "1", className: o2, style: c2, sizes: r2, srcSet: t2, src: e2, ref: L, onLoad: (e3) => {
      g(e3.currentTarget, d2, y2, b2, w2, p2, _);
    }, onError: (e3) => {
      v(true), "empty" !== d2 && w2(true), j && j(e3);
    } });
  });
  function b({ isAppRouter: e2, imgAttributes: t2 }) {
    let r2 = { as: "image", imageSrcSet: t2.srcSet, imageSizes: t2.sizes, crossOrigin: t2.crossOrigin, referrerPolicy: t2.referrerPolicy, ...x(t2.fetchPriority) };
    return e2 && l.default.preload ? (l.default.preload(t2.src, r2), null) : (0, i.jsx)(o.default, { children: (0, i.jsx)("link", { rel: "preload", href: t2.srcSet ? void 0 : t2.src, ...r2 }, "__nimg-" + t2.src + t2.srcSet + t2.sizes) });
  }
  let w = (0, s.forwardRef)((e2, t2) => {
    let r2 = (0, s.useContext)(h.RouterContext), n2 = (0, s.useContext)(d.ImageConfigContext), a2 = (0, s.useMemo)(() => {
      let e3 = m || n2 || u.imageConfigDefault, t3 = [...e3.deviceSizes, ...e3.imageSizes].sort((e4, t4) => e4 - t4), r3 = e3.deviceSizes.sort((e4, t4) => e4 - t4), a3 = e3.qualities?.sort((e4, t4) => e4 - t4);
      return { ...e3, allSizes: t3, deviceSizes: r3, qualities: a3, localPatterns: "u" < typeof window ? n2?.localPatterns : e3.localPatterns };
    }, [n2]), { onLoad: l2, onLoadingComplete: o2 } = e2, f2 = (0, s.useRef)(l2);
    (0, s.useEffect)(() => {
      f2.current = l2;
    }, [l2]);
    let g2 = (0, s.useRef)(o2);
    (0, s.useEffect)(() => {
      g2.current = o2;
    }, [o2]);
    let [x2, k2] = (0, s.useState)(false), [w2, v] = (0, s.useState)(false), { props: _, meta: S } = (0, c.getImgProps)(e2, { defaultLoader: p.default, imgConf: a2, blurComplete: x2, showAltText: w2 });
    return (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)(y, { ..._, unoptimized: S.unoptimized, placeholder: S.placeholder, fill: S.fill, onLoadRef: f2, onLoadingCompleteRef: g2, setBlurComplete: k2, setShowAltText: v, sizesInput: e2.sizes, ref: t2 }), S.preload ? (0, i.jsx)(b, { isAppRouter: !r2, imgAttributes: _ }) : null] });
  });
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 94909, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true });
  var n = { default: function() {
    return u;
  }, getImageProps: function() {
    return c;
  } };
  for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
  let i = e.r(55682), s = e.r(8927), l = e.r(85437), o = i._(e.r(1948));
  function c(e2) {
    let { props: t2 } = (0, s.getImgProps)(e2, { defaultLoader: o.default, imgConf: { deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes: [32, 48, 64, 96, 128, 256, 384], qualities: [75], path: "/_next/image", loader: "default", dangerouslyAllowSVG: false, unoptimized: false } });
    for (let [e3, r2] of Object.entries(t2)) void 0 === r2 && delete t2[e3];
    return { props: t2 };
  }
  let u = l.Image;
}, 57688, (e, t, r) => {
  t.exports = e.r(94909);
}, 25633, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true });
  var n = { default: function() {
    return m;
  }, defaultHead: function() {
    return d;
  } };
  for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
  let i = e.r(55682), s = e.r(90809), l = e.r(43476), o = s._(e.r(71645)), c = i._(e.r(98879)), u = e.r(42732);
  function d() {
    return [(0, l.jsx)("meta", { charSet: "utf-8" }, "charset"), (0, l.jsx)("meta", { name: "viewport", content: "width=device-width" }, "viewport")];
  }
  function h(e2, t2) {
    return "string" == typeof t2 || "number" == typeof t2 ? e2 : t2.type === o.default.Fragment ? e2.concat(o.default.Children.toArray(t2.props.children).reduce((e3, t3) => "string" == typeof t3 || "number" == typeof t3 ? e3 : e3.concat(t3), [])) : e2.concat(t2);
  }
  let p = ["name", "httpEquiv", "charSet", "itemProp"];
  function f(e2) {
    let t2, r2, n2, a2;
    return e2.reduce(h, []).reverse().concat(d().reverse()).filter((t2 = /* @__PURE__ */ new Set(), r2 = /* @__PURE__ */ new Set(), n2 = /* @__PURE__ */ new Set(), a2 = {}, (e3) => {
      let i2 = true, s2 = false;
      if (e3.key && "number" != typeof e3.key && e3.key.indexOf("$") > 0) {
        s2 = true;
        let r3 = e3.key.slice(e3.key.indexOf("$") + 1);
        t2.has(r3) ? i2 = false : t2.add(r3);
      }
      switch (e3.type) {
        case "title":
        case "base":
          r2.has(e3.type) ? i2 = false : r2.add(e3.type);
          break;
        case "meta":
          for (let t3 = 0, r3 = p.length; t3 < r3; t3++) {
            let r4 = p[t3];
            if (e3.props.hasOwnProperty(r4)) if ("charSet" === r4) n2.has(r4) ? i2 = false : n2.add(r4);
            else {
              let t4 = e3.props[r4], n3 = a2[r4] || /* @__PURE__ */ new Set();
              ("name" !== r4 || !s2) && n3.has(t4) ? i2 = false : (n3.add(t4), a2[r4] = n3);
            }
          }
      }
      return i2;
    })).reverse().map((e3, t3) => {
      let r3 = e3.key || t3;
      return o.default.cloneElement(e3, { key: r3 });
    });
  }
  let m = function({ children: e2 }) {
    let t2 = (0, o.useContext)(u.HeadManagerContext);
    return (0, l.jsx)(c.default, { reduceComponentsToState: f, headManager: t2, children: e2 });
  };
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 18556, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ImageConfigContext", { enumerable: true, get: function() {
    return i;
  } });
  let n = e.r(55682)._(e.r(71645)), a = e.r(87690), i = n.default.createContext(a.imageConfigDefault);
}, 65856, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "RouterContext", { enumerable: true, get: function() {
    return n;
  } });
  let n = e.r(55682)._(e.r(71645)).default.createContext(null);
}, 70965, (e, t, r) => {
  "use strict";
  function n(e2, t2) {
    let r2 = e2 || 75;
    return t2?.qualities?.length ? t2.qualities.reduce((e3, t3) => Math.abs(t3 - r2) < Math.abs(e3 - r2) ? t3 : e3, t2.qualities[0]) : r2;
  }
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "findClosestQuality", { enumerable: true, get: function() {
    return n;
  } });
}, 1948, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "default", { enumerable: true, get: function() {
    return s;
  } });
  let n = e.r(70965), a = e.r(43369);
  function i({ config: e2, src: t2, width: r2, quality: s2 }) {
    let l = (0, a.getDeploymentId)();
    if (t2.startsWith("/") && !t2.startsWith("//")) if (t2.includes("/_next/static/immutable") && !(0, a.getAssetToken)()) l = void 0;
    else {
      let e3 = t2.indexOf("?");
      if (-1 !== e3) {
        let r3 = new URLSearchParams(t2.slice(e3 + 1)), n2 = r3.get("dpl");
        if (n2) {
          l = n2, r3.delete("dpl");
          let a2 = r3.toString();
          t2 = t2.slice(0, e3) + (a2 ? "?" + a2 : "");
        }
      }
    }
    if (t2.startsWith("/") && t2.includes("?") && e2.localPatterns?.length === 1 && "**" === e2.localPatterns[0].pathname && "" === e2.localPatterns[0].search) throw Object.defineProperty(Error(`Image with src "${t2}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", { value: "E871", enumerable: false, configurable: true });
    let o = (0, n.findClosestQuality)(s2, e2);
    return `${e2.path}?url=${encodeURIComponent(t2)}&w=${r2}&q=${o}${t2.startsWith("/") && l ? `&dpl=${l}` : ""}`;
  }
  i.__next_img_default = true;
  let s = i;
}, 88143, (e, t, r) => {
  "use strict";
  function n({ widthInt: e2, heightInt: t2, blurWidth: r2, blurHeight: a, blurDataURL: i, objectFit: s }) {
    let l = r2 ? 40 * r2 : e2, o = a ? 40 * a : t2, c = l && o ? `viewBox='0 0 ${l} ${o}'` : "";
    return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${c}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${c ? "none" : "contain" === s ? "xMidYMid" : "cover" === s ? "xMidYMid slice" : "none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`;
  }
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "getImageBlurSvg", { enumerable: true, get: function() {
    return n;
  } });
}, 87690, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { VALID_LOADERS: function() {
    return i;
  }, imageConfigDefault: function() {
    return s;
  } };
  for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
  let i = ["default", "imgix", "cloudinary", "akamai", "custom"], s = { deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes: [32, 48, 64, 96, 128, 256, 384], path: "/_next/image", loader: "default", loaderFile: "", domains: [], disableStaticImages: false, minimumCacheTTL: 14400, formats: ["image/webp"], maximumDiskCacheSize: void 0, maximumRedirects: 3, maximumResponseBody: 5e7, dangerouslyAllowLocalIP: false, dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment", localPatterns: void 0, remotePatterns: [], qualities: [75], unoptimized: false, customCacheHandler: false };
}, 8927, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "getImgProps", { enumerable: true, get: function() {
    return c;
  } });
  let n = e.r(43369), a = e.r(88143), i = e.r(87690), s = ["-moz-initial", "fill", "none", "scale-down", void 0];
  function l(e2) {
    return void 0 !== e2.default;
  }
  function o(e2) {
    return void 0 === e2 ? e2 : "number" == typeof e2 ? Number.isFinite(e2) ? e2 : NaN : "string" == typeof e2 && /^[0-9]+$/.test(e2) ? parseInt(e2, 10) : NaN;
  }
  function c({ src: e2, sizes: t2, unoptimized: r2 = false, priority: u = false, preload: d = false, loading: h, className: p, quality: f, width: m, height: g, fill: x = false, style: k, overrideSrc: y, onLoad: b, onLoadingComplete: w, placeholder: v = "empty", blurDataURL: _, fetchPriority: S, decoding: j = "async", layout: A, objectFit: E, objectPosition: R, lazyBoundary: $, lazyRoot: L, ...M }, P) {
    var T;
    let C, W, N, { imgConf: z, showAltText: O, blurComplete: I, defaultLoader: D } = P, H = z || i.imageConfigDefault;
    if ("allSizes" in H) C = H;
    else {
      let e3 = [...H.deviceSizes, ...H.imageSizes].sort((e4, t4) => e4 - t4), t3 = H.deviceSizes.sort((e4, t4) => e4 - t4), r3 = H.qualities?.sort((e4, t4) => e4 - t4);
      C = { ...H, allSizes: e3, deviceSizes: t3, qualities: r3 };
    }
    if (void 0 === D) throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"), "__NEXT_ERROR_CODE", { value: "E163", enumerable: false, configurable: true });
    let B = M.loader || D;
    delete M.loader, delete M.srcSet;
    let V = "__next_img_default" in B;
    if (V) {
      if ("custom" === C.loader) throw Object.defineProperty(Error(`Image with src "${e2}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", { value: "E252", enumerable: false, configurable: true });
    } else {
      let e3 = B;
      B = (t3) => {
        let { config: r3, ...n2 } = t3;
        return e3(n2);
      };
    }
    if (A) {
      "fill" === A && (x = true);
      let e3 = { intrinsic: { maxWidth: "100%", height: "auto" }, responsive: { width: "100%", height: "auto" } }[A];
      e3 && (k = { ...k, ...e3 });
      let r3 = { responsive: "100vw", fill: "100vw" }[A];
      r3 && !t2 && (t2 = r3);
    }
    let q = "", F = o(m), X = o(g);
    if ((T = e2) && "object" == typeof T && (l(T) || void 0 !== T.src)) {
      let t3 = l(e2) ? e2.default : e2;
      if (!t3.src) throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t3)}`), "__NEXT_ERROR_CODE", { value: "E460", enumerable: false, configurable: true });
      if (!t3.height || !t3.width) throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t3)}`), "__NEXT_ERROR_CODE", { value: "E48", enumerable: false, configurable: true });
      if (W = t3.blurWidth, N = t3.blurHeight, _ = _ || t3.blurDataURL, q = t3.src, !x) if (F || X) {
        if (F && !X) {
          let e3 = F / t3.width;
          X = Math.round(t3.height * e3);
        } else if (!F && X) {
          let e3 = X / t3.height;
          F = Math.round(t3.width * e3);
        }
      } else F = t3.width, X = t3.height;
    }
    let Z = !u && !d && ("lazy" === h || void 0 === h);
    (!(e2 = "string" == typeof e2 ? e2 : q) || e2.startsWith("data:") || e2.startsWith("blob:")) && (r2 = true, Z = false), C.unoptimized && (r2 = true), V && !C.dangerouslyAllowSVG && e2.split("?", 1)[0].endsWith(".svg") && (r2 = true);
    let Y = o(f), G = Object.assign(x ? { position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: E, objectPosition: R } : {}, O ? {} : { color: "transparent" }, k), U = I || "empty" === v ? null : "blur" === v ? `url("data:image/svg+xml;charset=utf-8,${(0, a.getImageBlurSvg)({ widthInt: F, heightInt: X, blurWidth: W, blurHeight: N, blurDataURL: _ || "", objectFit: G.objectFit })}")` : `url("${v}")`, Q = s.includes(G.objectFit) ? "fill" === G.objectFit ? "100% 100%" : "cover" : G.objectFit, K = U ? { backgroundSize: Q, backgroundPosition: G.objectPosition || "50% 50%", backgroundRepeat: "no-repeat", backgroundImage: U } : {}, J = (function({ config: e3, src: t3, unoptimized: r3, width: a2, quality: i2, sizes: s2, loader: l2 }) {
      if (r3) {
        if (t3.startsWith("/") && !t3.startsWith("//")) {
          let e4 = (0, n.getDeploymentId)();
          if (t3.includes("/_next/static/immutable") && !(0, n.getAssetToken)()) e4 = void 0;
          else if (e4) {
            let r4 = t3.indexOf("?");
            if (-1 !== r4) {
              let n2 = new URLSearchParams(t3.slice(r4 + 1));
              n2.get("dpl") || (n2.append("dpl", e4), t3 = t3.slice(0, r4) + "?" + n2.toString());
            } else t3 += `?dpl=${e4}`;
          }
        }
        return { src: t3, srcSet: void 0, sizes: void 0 };
      }
      let { widths: o2, kind: c2 } = (function({ deviceSizes: e4, allSizes: t4 }, r4, n2) {
        if (n2) {
          let r5 = /(^|\s)(1?\d?\d)vw/g, a3 = [];
          for (let e5; e5 = r5.exec(n2); ) a3.push(parseInt(e5[2]));
          if (a3.length) {
            let r6 = 0.01 * Math.min(...a3);
            return { widths: t4.filter((t5) => t5 >= e4[0] * r6), kind: "w" };
          }
          return { widths: t4, kind: "w" };
        }
        return "number" != typeof r4 ? { widths: e4, kind: "w" } : { widths: [...new Set([r4, 2 * r4].map((e5) => t4.find((t5) => t5 >= e5) || t4[t4.length - 1]))], kind: "x" };
      })(e3, a2, s2), u2 = o2.length - 1;
      return { sizes: s2 || "w" !== c2 ? s2 : "100vw", srcSet: o2.map((r4, n2) => `${l2({ config: e3, src: t3, quality: i2, width: r4 })} ${"w" === c2 ? r4 : n2 + 1}${c2}`).join(", "), src: l2({ config: e3, src: t3, quality: i2, width: o2[u2] }) };
    })({ config: C, src: e2, unoptimized: r2, width: F, quality: Y, sizes: t2, loader: B }), ee = Z ? "lazy" : h;
    return { props: { ...M, loading: ee, fetchPriority: S, width: F, height: X, decoding: j, className: p, style: { ...G, ...K }, sizes: J.sizes, srcSet: J.srcSet, src: y || J.src }, meta: { unoptimized: r2, preload: d || u, placeholder: v, fill: x } };
  }
}, 98879, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "default", { enumerable: true, get: function() {
    return l;
  } });
  let n = e.r(71645), a = "u" < typeof window, i = a ? () => {
  } : n.useLayoutEffect, s = a ? () => {
  } : n.useEffect;
  function l(e2) {
    let { headManager: t2, reduceComponentsToState: r2 } = e2;
    function l2() {
      if (t2 && t2.mountedInstances) {
        let e3 = n.Children.toArray(Array.from(t2.mountedInstances).filter(Boolean));
        t2.updateHead(r2(e3));
      }
    }
    return a && (t2?.mountedInstances?.add(e2.children), l2()), i(() => (t2?.mountedInstances?.add(e2.children), () => {
      t2?.mountedInstances?.delete(e2.children);
    })), i(() => (t2 && (t2._pendingUpdate = l2), () => {
      t2 && (t2._pendingUpdate = l2);
    })), s(() => (t2 && t2._pendingUpdate && (t2._pendingUpdate(), t2._pendingUpdate = null), () => {
      t2 && t2._pendingUpdate && (t2._pendingUpdate(), t2._pendingUpdate = null);
    })), null;
  }
}, 87442, (e) => {
  e.v({ actions: "HomeAgent-module__xn-LlW__actions", answer: "HomeAgent-module__xn-LlW__answer", back: "HomeAgent-module__xn-LlW__back", breathe: "HomeAgent-module__xn-LlW__breathe", chatHeader: "HomeAgent-module__xn-LlW__chatHeader", chatSurface: "HomeAgent-module__xn-LlW__chatSurface", composer: "HomeAgent-module__xn-LlW__composer", conversation: "HomeAgent-module__xn-LlW__conversation", copy: "HomeAgent-module__xn-LlW__copy", dock: "HomeAgent-module__xn-LlW__dock", entryActions: "HomeAgent-module__xn-LlW__entryActions", entryMark: "HomeAgent-module__xn-LlW__entryMark", error: "HomeAgent-module__xn-LlW__error", jump: "HomeAgent-module__xn-LlW__jump", log: "HomeAgent-module__xn-LlW__log", mark: "HomeAgent-module__xn-LlW__mark", note: "HomeAgent-module__xn-LlW__note", primaryCta: "HomeAgent-module__xn-LlW__primaryCta", reply: "HomeAgent-module__xn-LlW__reply", secondaryCta: "HomeAgent-module__xn-LlW__secondaryCta", send: "HomeAgent-module__xn-LlW__send", statusDot: "HomeAgent-module__xn-LlW__statusDot", stop: "HomeAgent-module__xn-LlW__stop", stopped: "HomeAgent-module__xn-LlW__stopped", thinking: "HomeAgent-module__xn-LlW__thinking", userTurn: "HomeAgent-module__xn-LlW__userTurn", welcome: "HomeAgent-module__xn-LlW__welcome", who: "HomeAgent-module__xn-LlW__who" });
}, 56072, (e) => {
  "use strict";
  var t = e.i(43476), r = e.i(71645), n = e.i(88653), a = e.i(32181), i = e.i(54749), s = e.i(4765), l = e.i(22016), o = e.i(71164), c = e.i(38544), u = e.i(65785);
  let d = (e10) => e10.flatMap((e11, t10) => e11.split("").flatMap((e12, r10) => "#" === e12 ? [[r10, t10]] : [])), h = { rest: d(["####", "####", "####", "####"]), A: d([".###.", "##.##", "#####", "#...#", "#...#"]), code: d(["..#.##..", ".#..#.#.", "##.#...#", ".#.#..#.", "..##.#.."]), play: d(["#....", "###..", "####.", "####.", "###..", "#...."]), book: d([".##.##.", "#..#..#", "#.....#", "#..#..#", ".##.##."]), heart: d([".#.#.", "#####", "#####", ".###.", "..#.."]), spark: d(["#.#.#", ".###.", "##.##", ".###.", "#.#.#"]), line: d(["########", "########"]), check: d(["#.#.#.#.", ".#.#.#.#", "#.#.#.#.", ".#.#.#.#"]) }, p = { tech: "code", studio: "play", learn: "book" }, f = ["A", "spark", "line", "heart", "check", "A"];
  function m(e10) {
    let t10 = e10.map((e11) => e11[0]), r10 = e10.map((e11) => e11[1]), n2 = Math.round(((9 - (Math.max(...t10) - Math.min(...t10) + 1)) / 2 - Math.min(...t10)) * 6) + 1, a2 = Math.round(((7 - (Math.max(...r10) - Math.min(...r10) + 1)) / 2 - Math.min(...r10)) * 6);
    return e10.map((e11) => [6 * e11[0] + n2, 6 * e11[1] + a2]);
  }
  let g = (e10) => e10 < 0.5 ? 4 * e10 * e10 * e10 : 1 - Math.pow(-2 * e10 + 2, 3) / 2, x = m(h.rest).map(([e10, t10]) => ({ x: e10, y: t10, fx: e10, fy: t10, tx: e10, ty: t10, t0: -10, spin: 1 })), k = "rest", y = (0, u.hexToRgb)(u.INK), b = 0, w = 0, v = null, _ = 0, S = /* @__PURE__ */ new Set();
  function j(e10, t10) {
    if (e10 === k) return;
    k = e10;
    let r10 = m(h[e10]).sort((e11, t11) => e11[0] - t11[0] || e11[1] - t11[1]);
    x.map((e11, t11) => t11).sort((e11, t11) => x[e11].x - x[t11].x || x[e11].y - x[t11].y).forEach((e11, n2) => {
      let a2 = x[e11];
      Object.assign(a2, { fx: a2.x, fy: a2.y, tx: r10[n2][0], ty: r10[n2][1], t0: t10 + 0.018 * n2, spin: n2 % 2 ? -1 : 1 });
    });
  }
  function A() {
    let e10 = performance.now() / 1e3, t10 = (0, u.getWorldState)(), r10 = (0, u.litWorld)(t10), n2 = (0, u.prefersReducedMotion)();
    r10 !== v && (v = r10, j(r10 ? p[r10] : "rest", e10), b = e10 + 3), !n2 && t10.streaming ? e10 > b && (j(f[w++ % f.length], e10), b = e10 + 0.42) : n2 || r10 || !(e10 > b) || ("rest" === k ? (j(f[w++ % f.length], e10), b = e10 + 1.9) : (j("rest", e10), b = e10 + 3.6));
    let a2 = (0, u.hexToRgb)(r10 ? u.WORLDS[r10].color : u.INK);
    y = y.map((e11, t11) => e11 + (a2[t11] - e11) * (n2 ? 1 : 0.08));
    let i2 = `rgb(${y.map((e11) => 0 | e11).join(",")})`;
    for (let e11 of S) e11.ctx.clearRect(0, 0, 56, 42);
    for (let t11 of x) {
      let a3 = n2 ? 1 : Math.max(0, Math.min(1, (e10 - t11.t0) / 0.6)), s2 = g(a3);
      t11.x = t11.fx + (t11.tx - t11.fx) * s2, t11.y = t11.fy + (t11.ty - t11.fy) * s2;
      let l2 = Math.sin(Math.PI * a3) * Math.PI / 2 * t11.spin;
      for (let { ctx: e11, inline: n3 } of S) e11.fillStyle = n3 && !r10 ? "#FFFFFF" : i2, e11.save(), n3 ? (e11.translate(0.5 * t11.x + 3.2, 0.5 * t11.y + 2.6), e11.rotate(l2), e11.fillRect(-1.1, -1.1, 2.2, 2.2)) : (e11.translate(t11.x + 2.5, t11.y + 2.5), e11.rotate(l2), e11.fillRect(-2.5, -2.5, 5, 5)), e11.restore();
    }
    _ = requestAnimationFrame(A);
  }
  function E({ inline: e10 = false, className: n2 }) {
    let a2 = (0, r.useRef)(null);
    return (0, r.useEffect)(() => {
      let t10 = a2.current?.getContext("2d");
      if (!t10) return;
      t10.setTransform(2, 0, 0, 2, 0, 0);
      let r10 = { ctx: t10, inline: e10 };
      return S.add(r10), _ || (b = performance.now() / 1e3 + 2.4, _ = requestAnimationFrame(A)), () => {
        S.delete(r10), S.size || (cancelAnimationFrame(_), _ = 0);
      };
    }, [e10]), e10 ? (0, t.jsx)("canvas", { ref: a2, width: 64, height: 48, "aria-hidden": "true", className: n2 }) : (0, t.jsx)("canvas", { ref: a2, width: 112, height: 84, "aria-hidden": "true", className: n2 });
  }
  function R() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var $ = R(), L = { exec: () => null };
  function M(e10) {
    let t10 = [];
    return (r10) => {
      let n2 = Math.max(0, Math.min(3, r10 - 1)), a2 = t10[n2];
      return a2 || (a2 = e10(n2), t10[n2] = a2), a2;
    };
  }
  function P(e10, t10 = "") {
    let r10 = "string" == typeof e10 ? e10 : e10.source, n2 = { replace: (e11, t11) => {
      let a2 = "string" == typeof t11 ? t11 : t11.source;
      return a2 = a2.replace(C.caret, "$1"), r10 = r10.replace(e11, a2), n2;
    }, getRegex: () => new RegExp(r10, t10) };
    return n2;
  }
  var T = ((e10 = "") => {
    try {
      return !!RegExp("(?<=1)(?<!1)" + e10);
    } catch {
      return false;
    }
  })(), C = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, leadingSpaceTab: /^[ \t]+/, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/g, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e10) => RegExp(`^( {0,3}${e10})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: M((e10) => RegExp(`^ {0,${e10}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: M((e10) => RegExp(`^ {0,${e10}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: M((e10) => RegExp(`^ {0,${e10}}(?:\`\`\`|~~~)`)), headingBeginRegex: M((e10) => RegExp(`^ {0,${e10}}#`)), htmlBeginRegex: M((e10) => RegExp(`^ {0,${e10}}(?:</?(?:${q})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: M((e10) => RegExp(`^ {0,${e10}}>`)) }, W = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, N = / {0,3}(?:[*+-]|\d{1,9}[.)])/, z = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, O = P(z).replace(/bull/g, N).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), I = P(z).replace(/bull/g, N).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), D = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, H = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, B = P(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", H).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), V = P(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, N).getRegex(), q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", F = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, X = P("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", F).replace("tag", q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Z = (e10) => P(D).replace("hr", W).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e10).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), Y = Z(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), G = Z(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), U = { blockquote: P(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", G).getRegex(), code: /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, def: B, fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, hr: W, html: X, lheading: O, list: V, newline: /^(?:[ \t]*(?:\n|$))+/, paragraph: Y, table: L, text: /^[^\n]+/ }, Q = P("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", W).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), K = { ...U, lheading: I, table: Q, paragraph: P(D).replace("hr", W).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Q).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex() }, J = { ...U, html: P(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", F).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: L, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: P(D).replace("hr", W).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", O).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, ee = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, et = /[\p{P}\p{S}]/u, er = /[\s\p{P}\p{S}]/u, en = /[^\s\p{P}\p{S}]/u, ea = P(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, er).getRegex(), ei = /(?!~)[\p{P}\p{S}]/u, es = P(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", T ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), el = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, eo = P(el, "u").replace(/punct/g, et).getRegex(), ec = P(el, "u").replace(/punct/g, ei).getRegex(), eu = P(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, /[\p{Pi}\p{Ps}"']/u).replace(/punct/g, et).getRegex(), ed = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", eh = P(ed, "gu").replace(/notPunctSpace/g, en).replace(/punctSpace/g, er).replace(/punct/g, et).getRegex(), ep = P(ed, "gu").replace(/notPunctSpace/g, /(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g, /(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g, ei).getRegex(), ef = P("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, en).replace(/punctSpace/g, er).replace(/punct/g, et).getRegex(), em = P("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, en).replace(/punctSpace/g, er).replace(/punct/g, et).getRegex(), eg = P("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, en).replace(/punctSpace/g, er).replace(/punct/g, et).getRegex(), ex = P(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, et).getRegex(), ek = P("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, en).replace(/punctSpace/g, er).replace(/punct/g, et).getRegex(), ey = P(/\\(punct)/, "gu").replace(/punct/g, et).getRegex(), eb = P(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ew = P(F).replace("(?:-->|$)", "-->").getRegex(), ev = P("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ew).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), e_ = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, eS = P(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", e_).getRegex(), ej = P(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", eS).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), eA = P(/^!?\[(label)\]\[(ref)\]/).replace("label", eS).replace("ref", H).getRegex(), eE = P(/^!?\[(ref)\](?:\[\])?/).replace("ref", H).getRegex(), eR = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, e$ = P(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", e_).getRegex(), eL = P("reflink|nolink(?!\\()", "g").replace("reflink", P(/^!?\[(label)\]\[(ref)\]/).replace("label", e$).replace("ref", eR).getRegex()).replace("nolink", P(/^!?\[(ref)\](?:\[\])?/).replace("ref", eR).getRegex()).getRegex(), eM = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, eP = P(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), eT = { _backpedal: L, anyPunctuation: ey, autolink: eb, blockSkip: es, br: ee, code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, del: L, delLDelim: L, delRDelim: L, emStrongLDelim: eo, emStrongRDelimAst: eh, emStrongRDelimUnd: em, escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, link: ej, nolink: eE, punctuation: ea, reflink: eA, reflinkSearch: eL, tag: ev, text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, url: L }, eC = { ...eT, emStrongLDelim: eu, emStrongRDelimAst: ef, emStrongRDelimUnd: eg, link: P(/^!?\[(label)\]\((.*?)\)/).replace("label", eS).getRegex(), reflink: P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", eS).getRegex() }, eW = { ...eT, emStrongRDelimAst: ep, emStrongLDelim: ec, delLDelim: ex, delRDelim: ek, url: P(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", eP).replace("protocol", eM).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: P(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", eM).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex() }, eN = { ...eW, br: P(ee).replace("{2,}", "*").getRegex(), text: P(eW.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, ez = { normal: U, gfm: K, pedantic: J }, eO = { normal: eT, gfm: eW, breaks: eN, pedantic: eC }, eI = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, eD = (e10) => eI[e10];
  function eH(e10, t10) {
    if (t10) {
      if (C.escapeTest.test(e10)) return e10.replace(C.escapeReplace, eD);
    } else if (C.escapeTestNoEncode.test(e10)) return e10.replace(C.escapeReplaceNoEncode, eD);
    return e10;
  }
  function eB(e10) {
    try {
      e10 = encodeURI(e10).replace(C.percentDecode, "%");
    } catch {
      return null;
    }
    return e10;
  }
  function eV(e10, t10) {
    let r10 = e10.replace(C.findPipe, (e11, t11, r11) => {
      let n3 = false, a2 = t11;
      for (; --a2 >= 0 && "\\" === r11[a2]; ) n3 = !n3;
      return n3 ? "|" : " |";
    }).split(C.splitPipe), n2 = 0;
    if (r10[0].trim() || r10.shift(), r10.length > 0 && !r10.at(-1)?.trim() && r10.pop(), t10) if (r10.length > t10) r10.splice(t10);
    else for (; r10.length < t10; ) r10.push("");
    for (; n2 < r10.length; n2++) r10[n2] = r10[n2].trim().replace(C.slashPipe, "|");
    return r10;
  }
  function eq(e10, t10, r10) {
    let n2 = e10.length;
    if (0 === n2) return "";
    let a2 = 0;
    for (; a2 < n2; ) {
      let i2 = e10.charAt(n2 - a2 - 1);
      if (i2 !== t10 || r10) if (i2 !== t10 && r10) a2++;
      else break;
      else a2++;
    }
    return e10.slice(0, n2 - a2);
  }
  function eF(e10) {
    let t10 = e10.split(`
`), r10 = t10.length - 1;
    for (; r10 >= 0 && C.blankLine.test(t10[r10]); ) r10--;
    return t10.length - r10 <= 2 ? e10 : t10.slice(0, r10 + 1).join(`
`);
  }
  function eX(e10) {
    return e10.trim().toLowerCase().toUpperCase().toLowerCase();
  }
  function eZ(e10, t10 = 0) {
    let r10 = t10, n2 = "";
    for (let t11 of e10) if ("	" === t11) {
      let e11 = 4 - r10 % 4;
      n2 += " ".repeat(e11), r10 += e11;
    } else n2 += t11, r10++;
    return n2;
  }
  function eY(e10, t10, r10, n2, a2) {
    let i2 = t10.href, s2 = t10.title || null, l2 = e10[1].replace(a2.other.outputLinkReplace, "$1"), o2 = "!" === e10[0].charAt(0);
    n2.state.inLink = true;
    let c2 = n2.state.linkEmitted, u2 = n2.state.inRawBlock;
    n2.state.linkEmitted = false;
    let d2 = n2.inlineTokens(l2), h2 = n2.state.linkEmitted;
    if (n2.state.linkEmitted = c2, n2.state.inLink = false, !o2) {
      if (h2) {
        n2.state.inRawBlock = u2;
        return;
      }
      n2.state.linkEmitted = true;
    }
    return { type: o2 ? "image" : "link", raw: r10, href: i2, title: s2, text: l2, tokens: d2 };
  }
  function eG(e10, t10, r10, n2) {
    if (!t10.includes("<")) return false;
    for (let a2 = 0; a2 < t10.length; a2++) {
      if ("\\" === t10[a2]) {
        a2++;
        continue;
      }
      if ("`" === t10[a2]) {
        let e11 = n2.inline.code.exec(t10.slice(a2));
        if (e11) {
          a2 += e11[0].length - 1;
          continue;
        }
      }
      if ("<" !== t10[a2]) continue;
      let i2 = e10.slice(r10 + a2), s2 = n2.inline.tag.exec(i2) || n2.inline.autolink.exec(i2);
      if (s2) {
        if (s2[0].length > t10.length - a2) return true;
        a2 += s2[0].length - 1;
      }
    }
    return false;
  }
  var eU = class {
    options;
    rules;
    lexer;
    constructor(e10) {
      this.options = e10 || $;
    }
    space(e10) {
      let t10 = this.rules.block.newline.exec(e10);
      if (t10 && t10[0].length > 0) return { type: "space", raw: t10[0] };
    }
    code(e10) {
      let t10 = this.rules.block.code.exec(e10);
      if (t10) {
        let e11 = this.options.pedantic ? t10[0] : eF(t10[0]), r10 = e11.replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: e11, codeBlockStyle: "indented", text: r10 };
      }
    }
    fences(e10) {
      let t10 = this.rules.block.fences.exec(e10);
      if (t10) {
        let e11 = t10[0], r10 = (function(e12, t11, r11) {
          let n2 = e12.match(r11.other.indentCodeCompensation);
          if (null === n2) return t11;
          let a2 = n2[1];
          return t11.split(`
`).map((e13) => {
            let t12 = e13.match(r11.other.beginningSpace);
            if (null === t12) return e13;
            let [n3] = t12;
            return e13.slice(Math.min(n3.length, a2.length));
          }).join(`
`);
        })(e11, t10[3] || "", this.rules);
        return { type: "code", raw: e11, lang: t10[2] ? t10[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t10[2], text: r10 };
      }
    }
    heading(e10) {
      let t10 = this.rules.block.heading.exec(e10);
      if (t10) {
        let e11 = t10[2].trim();
        if (this.rules.other.endingHash.test(e11)) {
          let t11 = eq(e11, "#");
          (this.options.pedantic || !t11 || this.rules.other.endingSpaceTabChar.test(t11)) && (e11 = t11.trim());
        }
        return { type: "heading", raw: eq(t10[0], `
`), depth: t10[1].length, text: e11, tokens: this.lexer.inline(e11) };
      }
    }
    hr(e10) {
      let t10 = this.rules.block.hr.exec(e10);
      if (t10) return { type: "hr", raw: eq(t10[0], `
`) };
    }
    blockquote(e10) {
      let t10 = this.rules.block.blockquote.exec(e10);
      if (t10) {
        let e11 = eq(t10[0], `
`).split(`
`), r10 = "", n2 = "", a2 = [];
        for (; e11.length > 0; ) {
          let t11 = false, i2 = [], s2;
          for (s2 = 0; s2 < e11.length; s2++) if (this.rules.other.blockquoteStart.test(e11[s2])) i2.push(e11[s2]), t11 = true;
          else if (t11) break;
          else i2.push(e11[s2]);
          e11 = e11.slice(s2);
          let l2 = i2.join(`
`), o2 = l2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          r10 = r10 ? `${r10}
${l2}` : l2, n2 = n2 ? `${n2}
${o2}` : o2;
          let c2 = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(o2, a2, true), this.lexer.state.top = c2, 0 === e11.length) break;
          let u2 = a2.at(-1);
          if (u2?.type === "code") break;
          if (u2?.type === "blockquote") {
            let t12 = e11.join(`
`), i3 = u2.raw + `
` + t12.replace(this.rules.other.blockquoteSetextReplace2, ""), s3 = this.blockquote(i3);
            a2[a2.length - 1] = s3;
            let l3 = i3.substring(s3.raw.length).replace(/^\n/, ""), o3 = l3 ? l3.split(`
`).length : 0, c3 = o3 ? e11.slice(0, -o3) : e11;
            c3.length > 0 && (r10 = `${r10}
${c3.join(`
`)}`), n2 = n2.substring(0, n2.length - u2.text.length) + s3.text;
            break;
          }
          if (u2?.type === "list") {
            let t12 = u2.raw + `
` + e11.join(`
`), i3 = this.list(t12);
            a2[a2.length - 1] = i3, r10 = r10.substring(0, r10.length - u2.raw.length) + i3.raw, n2 = n2.substring(0, n2.length - u2.raw.length) + i3.raw, e11 = t12.substring(a2.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: r10, tokens: a2, text: n2 };
      }
    }
    list(e10) {
      let t10 = this.rules.block.list.exec(e10);
      if (t10) {
        let r10 = t10[1].trim(), n2 = r10.length > 1, a2 = { type: "list", raw: "", ordered: n2, start: n2 ? +r10.slice(0, -1) : "", loose: false, items: [] };
        r10 = n2 ? `\\d{1,9}\\${r10.slice(-1)}` : `\\${r10}`, this.options.pedantic && (r10 = n2 ? r10 : "[*+-]");
        let i2 = this.rules.other.listItemRegex(r10), s2 = false;
        for (; e10; ) {
          let r11 = false, n3 = "", l3 = "";
          if (!(t10 = i2.exec(e10)) || this.rules.block.hr.test(e10)) break;
          n3 = t10[0], e10 = e10.substring(n3.length);
          let o2 = t10[2].split(`
`, 1)[0], c2 = t10[1].length, u2 = this.options.pedantic ? eZ(o2, c2) : o2.replace(this.rules.other.leadingSpaceTab, (e11) => eZ(e11, c2)), d2 = e10.split(`
`, 1)[0], h2 = !u2.trim(), p2 = 0;
          if (this.options.pedantic ? (p2 = 2, l3 = u2.trimStart()) : h2 ? p2 = c2 + 1 : (p2 = (p2 = u2.search(this.rules.other.nonSpaceChar)) > 4 ? 1 : p2, l3 = u2.slice(p2), p2 += c2), h2 && this.rules.other.blankLine.test(d2) && (n3 += d2 + `
`, e10 = e10.substring(d2.length + 1), r11 = true), !r11) {
            let t11 = this.rules.other.nextBulletRegex(p2), r12 = this.rules.other.hrRegex(p2), a3 = this.rules.other.fencesBeginRegex(p2), i3 = this.rules.other.headingBeginRegex(p2), s3 = this.rules.other.htmlBeginRegex(p2), o3 = this.rules.other.blockquoteBeginRegex(p2);
            for (; e10; ) {
              let c3 = e10.split(`
`, 1)[0], f2;
              if (d2 = c3, f2 = this.options.pedantic ? d2 = d2.replace(this.rules.other.listReplaceNesting, "  ") : d2.replace(this.rules.other.leadingSpaceTab, (e11) => e11.replace(this.rules.other.tabCharGlobal, "    ")), a3.test(d2) || i3.test(d2) || s3.test(d2) || o3.test(d2) || t11.test(d2) || r12.test(d2)) break;
              if (f2.search(this.rules.other.nonSpaceChar) >= p2 || !d2.trim()) l3 += `
` + f2.slice(p2);
              else {
                if (h2 || u2.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || a3.test(u2) || i3.test(u2) || r12.test(u2)) break;
                l3 += `
` + d2;
              }
              h2 = !d2.trim(), n3 += c3 + `
`, e10 = e10.substring(c3.length + 1), u2 = f2.slice(p2);
            }
          }
          a2.loose || (s2 ? a2.loose = true : this.rules.other.doubleBlankLine.test(n3) && (s2 = true)), a2.items.push({ type: "list_item", raw: n3, task: !!this.options.gfm && this.rules.other.listIsTask.test(l3), loose: false, text: l3, tokens: [] }), a2.raw += n3;
        }
        let l2 = a2.items.at(-1);
        if (!l2) return;
        for (let e11 of (l2.raw = l2.raw.trimEnd(), l2.text = l2.text.trimEnd(), a2.raw = a2.raw.trimEnd(), a2.items)) if (this.lexer.state.top = false, e11.tokens = this.lexer.blockTokens(e11.text, []), !a2.loose) {
          let t11 = e11.tokens.filter((e12) => "space" === e12.type);
          a2.loose = t11.length > 0 && t11.some((e12) => this.rules.other.anyLine.test(e12.raw));
        }
        for (let e11 of a2.items) {
          let t11 = e11.tokens[0];
          if (e11.task && (t11?.type === "text" || t11?.type === "paragraph")) {
            e11.text = e11.text.replace(this.rules.other.listReplaceTask, ""), t11.raw = t11.raw.replace(this.rules.other.listReplaceTask, ""), t11.text = t11.text.replace(this.rules.other.listReplaceTask, "");
            for (let e12 = this.lexer.inlineQueue.length - 1; e12 >= 0; e12--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e12].src)) {
              this.lexer.inlineQueue[e12].src = this.lexer.inlineQueue[e12].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
            let r11 = this.rules.other.listTaskCheckbox.exec(e11.raw);
            if (r11) {
              let t12 = { type: "checkbox", raw: r11[0] + " ", checked: "[ ]" !== r11[0] };
              e11.checked = t12.checked, a2.loose ? e11.tokens[0] && ["paragraph", "text"].includes(e11.tokens[0].type) && "tokens" in e11.tokens[0] && e11.tokens[0].tokens ? (e11.tokens[0].raw = t12.raw + e11.tokens[0].raw, e11.tokens[0].text = t12.raw + e11.tokens[0].text, e11.tokens[0].tokens.unshift(t12)) : e11.tokens.unshift({ type: "paragraph", raw: t12.raw, text: t12.raw, tokens: [t12] }) : e11.tokens.unshift(t12);
            }
          } else e11.task && (e11.task = false);
        }
        if (a2.loose) for (let e11 of a2.items) for (let t11 of (e11.loose = true, e11.tokens)) "text" === t11.type && (t11.type = "paragraph");
        return a2;
      }
    }
    html(e10) {
      let t10 = this.rules.block.html.exec(e10);
      if (t10) {
        let e11 = eF(t10[0]);
        return { type: "html", block: true, raw: e11, pre: "pre" === t10[1] || "script" === t10[1] || "style" === t10[1], text: e11 };
      }
    }
    def(e10) {
      let t10 = this.rules.block.def.exec(e10);
      if (t10) {
        let e11 = eX(t10[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r10 = t10[2] ? t10[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n2 = t10[3] ? t10[3].substring(1, t10[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t10[3];
        return { type: "def", tag: e11, raw: eq(t10[0], `
`), href: r10, title: n2 };
      }
    }
    table(e10) {
      let t10 = this.rules.block.table.exec(e10);
      if (!t10 || !this.rules.other.tableDelimiter.test(t10[2])) return;
      let r10 = eV(t10[1]), n2 = t10[2].replace(this.rules.other.tableAlignChars, "").split("|"), a2 = t10[3]?.trim() ? t10[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i2 = { type: "table", raw: eq(t10[0], `
`), header: [], align: [], rows: [] };
      if (r10.length === n2.length) {
        for (let e11 of n2) this.rules.other.tableAlignRight.test(e11) ? i2.align.push("right") : this.rules.other.tableAlignCenter.test(e11) ? i2.align.push("center") : this.rules.other.tableAlignLeft.test(e11) ? i2.align.push("left") : i2.align.push(null);
        for (let e11 = 0; e11 < r10.length; e11++) i2.header.push({ text: r10[e11], tokens: this.lexer.inline(r10[e11]), header: true, align: i2.align[e11] });
        for (let e11 of a2) i2.rows.push(eV(e11, i2.header.length).map((e12, t11) => ({ text: e12, tokens: this.lexer.inline(e12), header: false, align: i2.align[t11] })));
        return i2;
      }
    }
    lheading(e10) {
      let t10 = this.rules.block.lheading.exec(e10);
      if (t10) {
        let e11 = t10[1].trim();
        return { type: "heading", raw: eq(t10[0], `
`), depth: "=" === t10[2].charAt(0) ? 1 : 2, text: e11, tokens: this.lexer.inline(e11) };
      }
    }
    paragraph(e10) {
      let t10 = this.rules.block.paragraph.exec(e10);
      if (t10) {
        let e11 = t10[1].charAt(t10[1].length - 1) === `
` ? t10[1].slice(0, -1) : t10[1];
        return { type: "paragraph", raw: t10[0], text: e11, tokens: this.lexer.inline(e11) };
      }
    }
    text(e10) {
      let t10 = this.rules.block.text.exec(e10);
      if (t10) return { type: "text", raw: t10[0], text: t10[0], tokens: this.lexer.inline(t10[0]) };
    }
    escape(e10) {
      let t10 = this.rules.inline.escape.exec(e10);
      if (t10) return { type: "escape", raw: t10[0], text: t10[1] };
    }
    tag(e10) {
      let t10 = this.rules.inline.tag.exec(e10);
      if (t10) return !this.lexer.state.inLink && this.rules.other.startATag.test(t10[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t10[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t10[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t10[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t10[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t10[0] };
    }
    link(e10) {
      let t10 = this.rules.inline.link.exec(e10);
      if (t10) {
        let r10 = "!" === t10[0].charAt(0) ? 2 : 1;
        if (!this.options.pedantic && eG(e10, t10[1], r10, this.rules)) return;
        let n2 = t10[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n2)) {
          if (!this.rules.other.endAngleBracket.test(n2)) return;
          let e11 = eq(n2.slice(0, -1), "\\");
          if ((n2.length - e11.length) % 2 == 0) return;
        } else {
          let e11 = (function(e12) {
            if (-1 === e12.indexOf(")")) return -1;
            let t11 = 0;
            for (let r11 = 0; r11 < e12.length; r11++) if ("\\" === e12[r11]) r11++;
            else if ("(" === e12[r11]) t11++;
            else if (")" === e12[r11] && --t11 < 0) return r11;
            return t11 > 0 ? -2 : -1;
          })(t10[2]);
          if (-2 === e11) return;
          if (e11 > -1) {
            let r11 = (0 === t10[0].indexOf("!") ? 5 : 4) + t10[1].length + e11;
            t10[2] = t10[2].substring(0, e11), t10[0] = t10[0].substring(0, r11).trim(), t10[3] = "";
          }
        }
        let a2 = t10[2], i2 = "";
        if (this.options.pedantic) {
          let e11 = this.rules.other.pedanticHrefTitle.exec(a2);
          e11 && (a2 = e11[1], i2 = e11[3]);
        } else i2 = t10[3] ? t10[3].slice(1, -1) : "";
        return a2 = a2.trim(), this.rules.other.startAngleBracket.test(a2) && (a2 = this.options.pedantic && !this.rules.other.endAngleBracket.test(n2) ? a2.slice(1) : a2.slice(1, -1)), eY(t10, { href: a2 && a2.replace(this.rules.inline.anyPunctuation, "$1"), title: i2 && i2.replace(this.rules.inline.anyPunctuation, "$1") }, t10[0], this.lexer, this.rules);
      }
    }
    reflink(e10, t10) {
      let r10;
      if ((r10 = this.rules.inline.reflink.exec(e10)) || (r10 = this.rules.inline.nolink.exec(e10))) {
        let n2 = "!" === r10[0].charAt(0) ? 2 : 1;
        if (!this.options.pedantic && eG(e10, r10[1], n2, this.rules)) return;
        let a2 = t10[eX((r10[2] || r10[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
        if (!a2) {
          let e11 = r10[0].charAt(0);
          return { type: "text", raw: e11, text: e11 };
        }
        return eY(r10, a2, r10[0], this.lexer, this.rules);
      }
    }
    emStrong(e10, t10, r10 = "") {
      let n2 = this.rules.inline.emStrongLDelim.exec(e10);
      if (!(!n2 || !n2[1] && !n2[2] && !n2[3] && !n2[4] || n2[4] && r10.match(this.rules.other.unicodeAlphaNumeric)) && (!(n2[1] || n2[3]) || !r10 || this.rules.inline.punctuation.exec(r10))) {
        let a2 = [...n2[0]].length - 1, i2, s2, l2 = a2, o2 = 0, c2 = n2[0][0], u2 = r10 === c2, d2 = "*" === c2 ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (d2.lastIndex = 0, t10 = t10.slice(-1 * e10.length + a2); null !== (n2 = d2.exec(t10)); ) {
          if (!(i2 = n2[1] || n2[2] || n2[3] || n2[4] || n2[5] || n2[6])) continue;
          if (s2 = [...i2].length, n2[3] || n2[4]) {
            l2 += s2;
            continue;
          }
          if (n2[5] || n2[6]) {
            if (a2 % 3 && !((a2 + s2) % 3)) {
              o2 += s2;
              continue;
            }
            if (u2) break;
          }
          if ((l2 -= s2) > 0) continue;
          s2 = Math.min(s2, s2 + l2 + o2);
          let t11 = [...n2[0]][0].length, r11 = e10.slice(0, a2 + n2.index + t11 + s2);
          if (Math.min(a2, s2) % 2) {
            let e11 = r11.slice(1, -1);
            return { type: "em", raw: r11, text: e11, tokens: this.lexer.inlineTokens(e11) };
          }
          let c3 = r11.slice(2, -2);
          return { type: "strong", raw: r11, text: c3, tokens: this.lexer.inlineTokens(c3) };
        }
      }
    }
    codespan(e10) {
      let t10 = this.rules.inline.code.exec(e10);
      if (t10) {
        let e11 = t10[2].replace(this.rules.other.newLineCharGlobal, " "), r10 = this.rules.other.nonSpaceChar.test(e11), n2 = this.rules.other.startingSpaceChar.test(e11) && this.rules.other.endingSpaceChar.test(e11);
        return r10 && n2 && (e11 = e11.substring(1, e11.length - 1)), { type: "codespan", raw: t10[0], text: e11 };
      }
    }
    br(e10) {
      let t10 = this.rules.inline.br.exec(e10);
      if (t10) return { type: "br", raw: t10[0] };
    }
    del(e10, t10, r10 = "") {
      let n2 = this.rules.inline.delLDelim.exec(e10);
      if (n2 && (!n2[1] || !r10 || this.rules.inline.punctuation.exec(r10))) {
        let r11 = [...n2[0]].length - 1, a2, i2, s2 = r11, l2 = this.rules.inline.delRDelim;
        for (l2.lastIndex = 0, t10 = t10.slice(-1 * e10.length + r11); null !== (n2 = l2.exec(t10)); ) {
          if (!(a2 = n2[1] || n2[2] || n2[3] || n2[4] || n2[5] || n2[6]) || (i2 = [...a2].length) !== r11) continue;
          if (n2[3] || n2[4]) {
            s2 += i2;
            continue;
          }
          if ((s2 -= i2) > 0) continue;
          i2 = Math.min(i2, i2 + s2);
          let t11 = [...n2[0]][0].length, l3 = e10.slice(0, r11 + n2.index + t11 + i2), o2 = l3.slice(r11, -r11);
          return { type: "del", raw: l3, text: o2, tokens: this.lexer.inlineTokens(o2) };
        }
      }
    }
    autolink(e10) {
      let t10 = this.rules.inline.autolink.exec(e10);
      if (t10) {
        let e11, r10;
        return r10 = "@" === t10[2] ? "mailto:" + (e11 = t10[1]) : e11 = t10[1], { type: "link", raw: t10[0], text: e11, href: r10, autolink: true, tokens: [{ type: "text", raw: e11, text: e11 }] };
      }
    }
    url(e10) {
      let t10;
      if (t10 = this.rules.inline.url.exec(e10)) {
        let e11, r10;
        if ("@" === t10[2]) r10 = "mailto:" + (e11 = t10[0]);
        else {
          let n2;
          do
            n2 = t10[0], t10[0] = this.rules.inline._backpedal.exec(t10[0])?.[0] ?? "";
          while (n2 !== t10[0]);
          e11 = t10[0], r10 = "www." === t10[1] ? "http://" + t10[0] : t10[0];
        }
        return { type: "link", raw: t10[0], text: e11, href: r10, autolink: true, tokens: [{ type: "text", raw: e11, text: e11 }] };
      }
    }
    inlineText(e10) {
      let t10 = this.rules.inline.text.exec(e10);
      if (t10) {
        let e11 = this.lexer.state.inRawBlock;
        return { type: "text", raw: t10[0], text: e11 ? t10[0] : t10[0].replace(C.numericCharacterReference, (e12, t11, r10) => {
          let n2 = void 0 === t11 ? Number.parseInt(r10, 16) : Number.parseInt(t11, 10);
          return 0 === n2 || n2 > 1114111 || n2 >= 55296 && n2 <= 57343 ? "\uFFFD" : String.fromCodePoint(n2);
        }), escaped: e11 };
      }
    }
  }, eQ = class e10 {
    tokens;
    options;
    state;
    inlineQueue;
    tokenizer;
    constructor(e11) {
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e11 || $, this.options.tokenizer = this.options.tokenizer || new eU(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, linkEmitted: false, top: true };
      let t10 = { other: C, block: ez.normal, inline: eO.normal };
      this.options.pedantic ? (t10.block = ez.pedantic, t10.inline = eO.pedantic) : this.options.gfm && (t10.block = ez.gfm, this.options.breaks ? t10.inline = eO.breaks : t10.inline = eO.gfm), this.tokenizer.rules = t10;
    }
    static get rules() {
      return { block: ez, inline: eO };
    }
    static lex(t10, r10) {
      return new e10(r10).lex(t10);
    }
    static lexInline(t10, r10) {
      return new e10(r10).inlineTokens(t10);
    }
    lex(e11) {
      e11 = e11.replace(C.carriageReturn, `
`), this.blockTokens(e11, this.tokens);
      for (let e12 = 0; e12 < this.inlineQueue.length; e12++) {
        let t10 = this.inlineQueue[e12];
        this.inlineTokens(t10.src, t10.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(e11, t10 = [], r10 = false) {
      this.tokenizer.lexer = this, this.options.pedantic && (e11 = e11.replace(C.tabCharGlobal, "    ").replace(C.spaceLine, ""));
      let n2 = 1 / 0;
      for (; e11; ) {
        let a2;
        if (e11.length < n2) n2 = e11.length;
        else {
          this.infiniteLoopError(e11.charCodeAt(0));
          break;
        }
        if (this.options.extensions?.block?.some((r11) => !!(a2 = r11.call({ lexer: this }, e11, t10)) && (e11 = e11.substring(a2.raw.length), t10.push(a2), true))) continue;
        if (a2 = this.tokenizer.space(e11)) {
          e11 = e11.substring(a2.raw.length);
          let r11 = t10.at(-1);
          1 === a2.raw.length && void 0 !== r11 ? r11.raw += `
` : t10.push(a2);
          continue;
        }
        if (a2 = this.tokenizer.code(e11)) {
          e11 = e11.substring(a2.raw.length);
          let r11 = t10.at(-1);
          r11?.type === "paragraph" || r11?.type === "text" ? (r11.raw += (r11.raw.endsWith(`
`) ? "" : `
`) + a2.raw, r11.text += `
` + a2.text, this.inlineQueue.at(-1).src = r11.text) : t10.push(a2);
          continue;
        }
        if ((a2 = this.tokenizer.fences(e11)) || (a2 = this.tokenizer.heading(e11)) || (a2 = this.tokenizer.hr(e11)) || (a2 = this.tokenizer.blockquote(e11)) || (a2 = this.tokenizer.list(e11)) || (a2 = this.tokenizer.html(e11))) {
          e11 = e11.substring(a2.raw.length), t10.push(a2);
          continue;
        }
        if (a2 = this.tokenizer.def(e11)) {
          e11 = e11.substring(a2.raw.length);
          let r11 = t10.at(-1);
          r11?.type === "paragraph" || r11?.type === "text" ? (r11.raw += (r11.raw.endsWith(`
`) ? "" : `
`) + a2.raw, r11.text += `
` + a2.raw, this.inlineQueue.at(-1).src = r11.text) : this.tokens.links[a2.tag] || (this.tokens.links[a2.tag] = { href: a2.href, title: a2.title }, t10.push(a2));
          continue;
        }
        if ((a2 = this.tokenizer.table(e11)) || (a2 = this.tokenizer.lheading(e11))) {
          e11 = e11.substring(a2.raw.length), t10.push(a2);
          continue;
        }
        let i2 = e11;
        if (this.options.extensions?.startBlock) {
          let t11 = 1 / 0, r11 = e11.slice(1), n3;
          this.options.extensions.startBlock.forEach((e12) => {
            "number" == typeof (n3 = e12.call({ lexer: this }, r11)) && n3 >= 0 && (t11 = Math.min(t11, n3));
          }), t11 < 1 / 0 && t11 >= 0 && (i2 = e11.substring(0, t11 + 1));
        }
        if (this.state.top && (a2 = this.tokenizer.paragraph(i2))) {
          let n3 = t10.at(-1);
          r10 && n3?.type === "paragraph" ? (n3.raw += (n3.raw.endsWith(`
`) ? "" : `
`) + a2.raw, n3.text += `
` + a2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n3.text) : t10.push(a2), r10 = i2.length !== e11.length, e11 = e11.substring(a2.raw.length);
          continue;
        }
        if (a2 = this.tokenizer.text(e11)) {
          e11 = e11.substring(a2.raw.length);
          let r11 = t10.at(-1);
          r11?.type === "text" ? (r11.raw += (r11.raw.endsWith(`
`) ? "" : `
`) + a2.raw, r11.text += `
` + a2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r11.text) : t10.push(a2);
          continue;
        }
        if (e11) {
          this.infiniteLoopError(e11.charCodeAt(0));
          break;
        }
      }
      return this.state.top = true, t10;
    }
    inline(e11, t10 = []) {
      return this.inlineQueue.push({ src: e11, tokens: t10 }), t10;
    }
    linkInText(e11) {
      if (!e11.includes("[")) return false;
      let t10 = this.tokenizer.rules.inline.link;
      for (let r10 of e11.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t10.test(r10[0]) && "!" !== e11.charAt(r10.index - 1)) return true;
      for (let t11 of e11.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
        let e12 = t11[0], r10 = e12.lastIndexOf("[");
        if (!("!" === e12.charAt(0) || !Object.hasOwn(this.tokens.links, eX(e12.slice(r10 + 1, -1)))) && !(r10 > 1 && this.linkInText(e12.slice(1, r10 - 1)))) return true;
      }
      return false;
    }
    inlineTokens(e11, t10 = []) {
      this.tokenizer.lexer = this;
      let r10 = e11;
      if (this.tokens.links && e11.includes("[")) {
        let e12 = this.tokenizer.rules.inline.reflinkSearch, t11 = (r11) => {
          let n3 = r11.lastIndexOf("[");
          if (!Object.hasOwn(this.tokens.links, eX(r11.slice(n3 + 1, -1)))) return r11;
          if (n3 > 1 && "!" !== r11.charAt(0)) {
            let a3 = r11.slice(1, n3 - 1);
            if (this.linkInText(a3)) return "[" + a3.replace(e12, t11) + "][" + "a".repeat(r11.length - n3 - 2) + "]";
          }
          return "[" + "a".repeat(r11.length - 2) + "]";
        };
        r10 = r10.replace(e12, t11);
      }
      r10 = (r10 = r10.replace(this.tokenizer.rules.inline.anyPunctuation, (e12) => "+".repeat(e12.length))).replace(this.tokenizer.rules.inline.blockSkip, (e12, t11, r11) => {
        let n3 = r11 ? r11.length : 0;
        return e12.slice(0, n3) + "[" + "a".repeat(e12.length - n3 - 2) + "]";
      }), r10 = this.options.hooks?.emStrongMask?.call({ lexer: this }, r10) ?? r10;
      let n2 = false, a2 = "", i2 = 1 / 0;
      for (; e11; ) {
        let s2;
        if (e11.length < i2) i2 = e11.length;
        else {
          this.infiniteLoopError(e11.charCodeAt(0));
          break;
        }
        if (n2 || (a2 = ""), n2 = false, this.options.extensions?.inline?.some((r11) => !!(s2 = r11.call({ lexer: this }, e11, t10)) && (e11 = e11.substring(s2.raw.length), t10.push(s2), true))) continue;
        if ((s2 = this.tokenizer.escape(e11)) || (s2 = this.tokenizer.tag(e11)) || (s2 = this.tokenizer.link(e11))) {
          e11 = e11.substring(s2.raw.length), t10.push(s2);
          continue;
        }
        if (s2 = this.tokenizer.reflink(e11, this.tokens.links)) {
          e11 = e11.substring(s2.raw.length);
          let r11 = t10.at(-1);
          "text" === s2.type && r11?.type === "text" ? (r11.raw += s2.raw, r11.text += s2.text) : t10.push(s2);
          continue;
        }
        if ((s2 = this.tokenizer.emStrong(e11, r10, a2)) || (s2 = this.tokenizer.codespan(e11)) || (s2 = this.tokenizer.br(e11)) || (s2 = this.tokenizer.del(e11, r10, a2)) || (s2 = this.tokenizer.autolink(e11)) || !this.state.inLink && (s2 = this.tokenizer.url(e11))) {
          e11 = e11.substring(s2.raw.length), t10.push(s2);
          continue;
        }
        let l2 = e11;
        if (this.options.extensions?.startInline) {
          let t11 = 1 / 0, r11 = e11.slice(1), n3;
          this.options.extensions.startInline.forEach((e12) => {
            "number" == typeof (n3 = e12.call({ lexer: this }, r11)) && n3 >= 0 && (t11 = Math.min(t11, n3));
          }), t11 < 1 / 0 && t11 >= 0 && (l2 = e11.substring(0, t11 + 1));
        }
        if (s2 = this.tokenizer.inlineText(l2)) {
          e11 = e11.substring(s2.raw.length), "_" !== s2.raw.slice(-1) && (a2 = s2.raw.slice(-1)), n2 = true;
          let r11 = t10.at(-1);
          r11?.type === "text" ? (r11.raw += s2.raw, r11.text += s2.text) : t10.push(s2);
          continue;
        }
        if (e11) {
          this.infiniteLoopError(e11.charCodeAt(0));
          break;
        }
      }
      return t10;
    }
    infiniteLoopError(e11) {
      let t10 = "Infinite loop on byte: " + e11;
      if (this.options.silent) console.error(t10);
      else throw Error(t10);
    }
  }, eK = class {
    options;
    parser;
    constructor(e10) {
      this.options = e10 || $;
    }
    space(e10) {
      return "";
    }
    code({ text: e10, lang: t10, escaped: r10 }) {
      let n2 = (t10 || "").match(C.notSpaceStart)?.[0], a2 = e10 ? e10.replace(C.endingNewline, "") + `
` : "";
      return n2 ? '<pre><code class="language-' + eH(n2) + '">' + (r10 ? a2 : eH(a2, true)) + `</code></pre>
` : "<pre><code>" + (r10 ? a2 : eH(a2, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: e10 }) {
      return `<blockquote>
${this.parser.parse(e10)}</blockquote>
`;
    }
    html({ text: e10 }) {
      return e10;
    }
    def(e10) {
      return "";
    }
    heading({ tokens: e10, depth: t10 }) {
      return `<h${t10}>${this.parser.parseInline(e10)}</h${t10}>
`;
    }
    hr(e10) {
      return `<hr>
`;
    }
    list(e10) {
      let t10 = e10.ordered, r10 = e10.start, n2 = "";
      for (let t11 = 0; t11 < e10.items.length; t11++) {
        let r11 = e10.items[t11];
        n2 += this.listitem(r11);
      }
      let a2 = t10 ? "ol" : "ul";
      return "<" + a2 + (t10 && 1 !== r10 ? ' start="' + r10 + '"' : "") + `>
` + n2 + "</" + a2 + `>
`;
    }
    listitem(e10) {
      return `<li>${this.parser.parse(e10.tokens)}</li>
`;
    }
    checkbox({ checked: e10 }) {
      return "<input " + (e10 ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
    }
    paragraph({ tokens: e10 }) {
      return `<p>${this.parser.parseInline(e10)}</p>
`;
    }
    table(e10) {
      let t10 = "", r10 = "";
      for (let t11 = 0; t11 < e10.header.length; t11++) r10 += this.tablecell(e10.header[t11]);
      t10 += this.tablerow({ text: r10 });
      let n2 = "";
      for (let t11 = 0; t11 < e10.rows.length; t11++) {
        let a2 = e10.rows[t11];
        r10 = "";
        for (let e11 = 0; e11 < a2.length; e11++) r10 += this.tablecell(a2[e11]);
        n2 += this.tablerow({ text: r10 });
      }
      return n2 && (n2 = `<tbody>${n2}</tbody>`), `<table>
<thead>
` + t10 + `</thead>
` + n2 + `</table>
`;
    }
    tablerow({ text: e10 }) {
      return `<tr>
${e10}</tr>
`;
    }
    tablecell(e10) {
      let t10 = this.parser.parseInline(e10.tokens), r10 = e10.header ? "th" : "td";
      return (e10.align ? `<${r10} align="${e10.align}">` : `<${r10}>`) + t10 + `</${r10}>
`;
    }
    strong({ tokens: e10 }) {
      return `<strong>${this.parser.parseInline(e10)}</strong>`;
    }
    em({ tokens: e10 }) {
      return `<em>${this.parser.parseInline(e10)}</em>`;
    }
    codespan({ text: e10 }) {
      return `<code>${eH(e10, true)}</code>`;
    }
    br(e10) {
      return "<br>";
    }
    del({ tokens: e10 }) {
      return `<del>${this.parser.parseInline(e10)}</del>`;
    }
    link({ href: e10, title: t10, text: r10, tokens: n2, autolink: a2 }) {
      let i2 = a2 ? eH(r10, true) : this.parser.parseInline(n2), s2 = eB(e10);
      if (null === s2) return i2;
      let l2 = '<a href="' + (e10 = eH(s2, a2)) + '"';
      return t10 && (l2 += ' title="' + eH(t10) + '"'), l2 += ">" + i2 + "</a>";
    }
    image({ href: e10, title: t10, text: r10, tokens: n2 }) {
      n2 && (r10 = this.parser.parseInline(n2, this.parser.textRenderer));
      let a2 = eB(e10);
      if (null === a2) return eH(r10);
      e10 = a2;
      let i2 = `<img src="${eH(e10)}" alt="${eH(r10)}"`;
      return t10 && (i2 += ` title="${eH(t10)}"`), i2 += ">";
    }
    text(e10) {
      return "tokens" in e10 && e10.tokens ? this.parser.parseInline(e10.tokens) : "escaped" in e10 && e10.escaped ? e10.text : eH(e10.text);
    }
  }, eJ = class {
    strong({ text: e10 }) {
      return e10;
    }
    em({ text: e10 }) {
      return e10;
    }
    codespan({ text: e10 }) {
      return e10;
    }
    del({ text: e10 }) {
      return e10;
    }
    html({ text: e10 }) {
      return e10;
    }
    text({ text: e10 }) {
      return e10;
    }
    link({ text: e10 }) {
      return "" + e10;
    }
    image({ text: e10 }) {
      return "" + e10;
    }
    br() {
      return "";
    }
    checkbox({ raw: e10 }) {
      return e10;
    }
  }, e0 = class e10 {
    options;
    renderer;
    textRenderer;
    constructor(e11) {
      this.options = e11 || $, this.options.renderer = this.options.renderer || new eK(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new eJ();
    }
    static parse(t10, r10) {
      return new e10(r10).parse(t10);
    }
    static parseInline(t10, r10) {
      return new e10(r10).parseInline(t10);
    }
    parse(e11) {
      this.renderer.parser = this;
      let t10 = "";
      for (let r10 = 0; r10 < e11.length; r10++) {
        let n2 = e11[r10];
        if (this.options.extensions?.renderers?.[n2.type]) {
          let e12 = this.options.extensions.renderers[n2.type].call({ parser: this }, n2);
          if (false !== e12 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(n2.type)) {
            t10 += e12 || "";
            continue;
          }
        }
        switch (n2.type) {
          case "space":
            t10 += this.renderer.space(n2);
            break;
          case "hr":
            t10 += this.renderer.hr(n2);
            break;
          case "heading":
            t10 += this.renderer.heading(n2);
            break;
          case "code":
            t10 += this.renderer.code(n2);
            break;
          case "table":
            t10 += this.renderer.table(n2);
            break;
          case "blockquote":
            t10 += this.renderer.blockquote(n2);
            break;
          case "list":
            t10 += this.renderer.list(n2);
            break;
          case "checkbox":
            t10 += this.renderer.checkbox(n2);
            break;
          case "html":
            t10 += this.renderer.html(n2);
            break;
          case "def":
            t10 += this.renderer.def(n2);
            break;
          case "paragraph":
            t10 += this.renderer.paragraph(n2);
            break;
          case "text":
            t10 += this.renderer.text(n2);
            break;
          default: {
            let e12 = 'Token with "' + n2.type + '" type was not found.';
            if (this.options.silent) return console.error(e12), "";
            throw Error(e12);
          }
        }
      }
      return t10;
    }
    parseInline(e11, t10 = this.renderer) {
      this.renderer.parser = this;
      let r10 = "";
      for (let n2 = 0; n2 < e11.length; n2++) {
        let a2 = e11[n2];
        if (this.options.extensions?.renderers?.[a2.type]) {
          let e12 = this.options.extensions.renderers[a2.type].call({ parser: this }, a2);
          if (false !== e12 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(a2.type)) {
            r10 += e12 || "";
            continue;
          }
        }
        switch (a2.type) {
          case "escape":
          case "text":
            r10 += t10.text(a2);
            break;
          case "html":
            r10 += t10.html(a2);
            break;
          case "link":
            r10 += t10.link(a2);
            break;
          case "image":
            r10 += t10.image(a2);
            break;
          case "checkbox":
            r10 += t10.checkbox(a2);
            break;
          case "strong":
            r10 += t10.strong(a2);
            break;
          case "em":
            r10 += t10.em(a2);
            break;
          case "codespan":
            r10 += t10.codespan(a2);
            break;
          case "br":
            r10 += t10.br(a2);
            break;
          case "del":
            r10 += t10.del(a2);
            break;
          default: {
            let e12 = 'Token with "' + a2.type + '" type was not found.';
            if (this.options.silent) return console.error(e12), "";
            throw Error(e12);
          }
        }
      }
      return r10;
    }
  }, e1 = class {
    options;
    block;
    constructor(e10) {
      this.options = e10 || $;
    }
    static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
    static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
    preprocess(e10) {
      return e10;
    }
    postprocess(e10) {
      return e10;
    }
    processAllTokens(e10) {
      return e10;
    }
    emStrongMask(e10) {
      return e10;
    }
    provideLexer(e10 = this.block) {
      return e10 ? eQ.lex : eQ.lexInline;
    }
    provideParser(e10 = this.block) {
      return e10 ? e0.parse : e0.parseInline;
    }
  }, e2 = new class {
    defaults = R();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = e0;
    Renderer = eK;
    TextRenderer = eJ;
    Lexer = eQ;
    Tokenizer = eU;
    Hooks = e1;
    constructor(...e10) {
      this.use(...e10);
    }
    walkTokens(e10, t10) {
      let r10 = [];
      for (let n2 of e10) switch (r10 = r10.concat(t10.call(this, n2)), n2.type) {
        case "table":
          for (let e11 of n2.header) r10 = r10.concat(this.walkTokens(e11.tokens, t10));
          for (let e11 of n2.rows) for (let n3 of e11) r10 = r10.concat(this.walkTokens(n3.tokens, t10));
          break;
        case "list":
          r10 = r10.concat(this.walkTokens(n2.items, t10));
          break;
        default: {
          let e11 = n2;
          this.defaults.extensions?.childTokens?.[e11.type] ? this.defaults.extensions.childTokens[e11.type].forEach((n3) => {
            let a2 = e11[n3].flat(1 / 0);
            r10 = r10.concat(this.walkTokens(a2, t10));
          }) : e11.tokens && (r10 = r10.concat(this.walkTokens(e11.tokens, t10)));
        }
      }
      return r10;
    }
    use(...e10) {
      let t10 = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return e10.forEach((e11) => {
        let r10 = { ...e11 };
        if (r10.async = this.defaults.async || r10.async || false, e11.extensions && (e11.extensions.forEach((e12) => {
          if (!e12.name) throw Error("extension name required");
          if ("renderer" in e12) {
            let r11 = t10.renderers[e12.name];
            r11 ? t10.renderers[e12.name] = function(...t11) {
              let n2 = e12.renderer.apply(this, t11);
              return false === n2 && (n2 = r11.apply(this, t11)), n2;
            } : t10.renderers[e12.name] = e12.renderer;
          }
          if ("tokenizer" in e12) {
            if (!e12.level || "block" !== e12.level && "inline" !== e12.level) throw Error("extension level must be 'block' or 'inline'");
            let r11 = t10[e12.level];
            r11 ? r11.unshift(e12.tokenizer) : t10[e12.level] = [e12.tokenizer], e12.start && ("block" === e12.level ? t10.startBlock ? t10.startBlock.push(e12.start) : t10.startBlock = [e12.start] : "inline" === e12.level && (t10.startInline ? t10.startInline.push(e12.start) : t10.startInline = [e12.start]));
          }
          "childTokens" in e12 && e12.childTokens && (t10.childTokens[e12.name] = e12.childTokens);
        }), r10.extensions = t10), e11.renderer) {
          let t11 = this.defaults.renderer || new eK(this.defaults);
          for (let r11 in e11.renderer) {
            if (!(r11 in t11)) throw Error(`renderer '${r11}' does not exist`);
            if (["options", "parser"].includes(r11)) continue;
            let n2 = e11.renderer[r11], a2 = t11[r11];
            t11[r11] = (...e12) => {
              let r12 = n2.apply(t11, e12);
              return false === r12 && (r12 = a2.apply(t11, e12)), r12 || "";
            };
          }
          r10.renderer = t11;
        }
        if (e11.tokenizer) {
          let t11 = this.defaults.tokenizer || new eU(this.defaults);
          for (let r11 in e11.tokenizer) {
            if (!(r11 in t11)) throw Error(`tokenizer '${r11}' does not exist`);
            if (["options", "rules", "lexer"].includes(r11)) continue;
            let n2 = e11.tokenizer[r11], a2 = t11[r11];
            t11[r11] = (...e12) => {
              let r12 = n2.apply(t11, e12);
              return false === r12 && (r12 = a2.apply(t11, e12)), r12;
            };
          }
          r10.tokenizer = t11;
        }
        if (e11.hooks) {
          let t11 = this.defaults.hooks || new e1();
          for (let r11 in e11.hooks) {
            if (!(r11 in t11)) throw Error(`hook '${r11}' does not exist`);
            if (["options", "block"].includes(r11)) continue;
            let n2 = e11.hooks[r11], a2 = t11[r11];
            e1.passThroughHooks.has(r11) ? t11[r11] = (e12) => {
              if (this.defaults.async && e1.passThroughHooksRespectAsync.has(r11)) return (async () => {
                let r12 = await n2.call(t11, e12);
                return a2.call(t11, r12);
              })();
              let i2 = n2.call(t11, e12);
              return a2.call(t11, i2);
            } : t11[r11] = (...e12) => {
              if (this.defaults.async) return (async () => {
                let r13 = await n2.apply(t11, e12);
                return false === r13 && (r13 = await a2.apply(t11, e12)), r13;
              })();
              let r12 = n2.apply(t11, e12);
              return false === r12 && (r12 = a2.apply(t11, e12)), r12;
            };
          }
          r10.hooks = t11;
        }
        if (e11.walkTokens) {
          let t11 = this.defaults.walkTokens, n2 = e11.walkTokens;
          r10.walkTokens = function(e12) {
            let r11 = [];
            return r11.push(n2.call(this, e12)), t11 && (r11 = r11.concat(t11.call(this, e12))), r11;
          };
        }
        this.defaults = { ...this.defaults, ...r10 };
      }), this;
    }
    setOptions(e10) {
      return this.defaults = { ...this.defaults, ...e10 }, this;
    }
    lexer(e10, t10) {
      return eQ.lex(e10, t10 ?? this.defaults);
    }
    parser(e10, t10) {
      return e0.parse(e10, t10 ?? this.defaults);
    }
    parseMarkdown(e10) {
      return (t10, r10) => {
        let n2 = { ...r10 }, a2 = { ...this.defaults, ...n2 }, i2 = this.onError(!!a2.silent, !!a2.async);
        if (true === this.defaults.async && false === n2.async) return i2(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof t10 > "u" || null === t10) return i2(Error("marked(): input parameter is undefined or null"));
        if ("string" != typeof t10) return i2(Error("marked(): input parameter is of type " + Object.prototype.toString.call(t10) + ", string expected"));
        if (a2.hooks && (a2.hooks.options = a2, a2.hooks.block = e10), a2.async) return (async () => {
          let r11 = a2.hooks ? await a2.hooks.preprocess(t10) : t10, n3 = await (a2.hooks ? await a2.hooks.provideLexer(e10) : e10 ? eQ.lex : eQ.lexInline)(r11, a2), i3 = a2.hooks ? await a2.hooks.processAllTokens(n3) : n3;
          a2.walkTokens && await Promise.all(this.walkTokens(i3, a2.walkTokens));
          let s2 = await (a2.hooks ? await a2.hooks.provideParser(e10) : e10 ? e0.parse : e0.parseInline)(i3, a2);
          return a2.hooks ? await a2.hooks.postprocess(s2) : s2;
        })().catch(i2);
        try {
          a2.hooks && (t10 = a2.hooks.preprocess(t10));
          let r11 = (a2.hooks ? a2.hooks.provideLexer(e10) : e10 ? eQ.lex : eQ.lexInline)(t10, a2);
          a2.hooks && (r11 = a2.hooks.processAllTokens(r11)), a2.walkTokens && this.walkTokens(r11, a2.walkTokens);
          let n3 = (a2.hooks ? a2.hooks.provideParser(e10) : e10 ? e0.parse : e0.parseInline)(r11, a2);
          return a2.hooks && (n3 = a2.hooks.postprocess(n3)), n3;
        } catch (e11) {
          return i2(e11);
        }
      };
    }
    onError(e10, t10) {
      return (r10) => {
        if (r10.message += `
Please report this to https://github.com/markedjs/marked.`, e10) {
          let e11 = "<p>An error occurred:</p><pre>" + eH(r10.message + "", true) + "</pre>";
          return t10 ? Promise.resolve(e11) : e11;
        }
        if (t10) return Promise.reject(r10);
        throw r10;
      };
    }
  }();
  function e6(e10, t10) {
    return e2.parse(e10, t10);
  }
  function e3({ content: e10 }) {
    let n2 = (0, r.useMemo)(() => e6.lexer(e10, { breaks: true }), [e10]);
    return (0, t.jsx)(t.Fragment, { children: (function e11(n3) {
      return n3.map((n4, a2) => {
        switch (n4.type) {
          case "paragraph":
            return (0, t.jsx)("p", { children: e11(n4.tokens) }, a2);
          case "heading":
            return (0, t.jsx)("h3", { children: e11(n4.tokens) }, a2);
          case "strong":
            return (0, t.jsx)("strong", { children: e11(n4.tokens) }, a2);
          case "em":
            return (0, t.jsx)("em", { children: e11(n4.tokens) }, a2);
          case "del":
            return (0, t.jsx)("del", { children: e11(n4.tokens) }, a2);
          case "codespan":
            return (0, t.jsx)("code", { children: n4.text }, a2);
          case "code":
            return (0, t.jsx)("pre", { children: (0, t.jsx)("code", { children: n4.text }) }, a2);
          case "blockquote":
            return (0, t.jsx)("blockquote", { children: e11(n4.tokens) }, a2);
          case "list": {
            let r10 = n4.items.map((r11, n5) => (0, t.jsx)("li", { children: e11(r11.tokens) }, n5));
            return n4.ordered ? (0, t.jsx)("ol", { start: Number(n4.start) || 1, children: r10 }, a2) : (0, t.jsx)("ul", { children: r10 }, a2);
          }
          case "link": {
            let i2 = (function(e12) {
              if (/^\/(?![\/\\])/.test(e12) && !/[\x00-\x20\\]/.test(e12)) return e12;
              try {
                let t10 = new URL(e12);
                return ["https:", "http:", "mailto:"].includes(t10.protocol) ? t10.href : void 0;
              } catch {
                return;
              }
            })(n4.href);
            return i2 ? (0, t.jsx)("a", { href: i2, target: /^https?:/.test(i2) ? "_blank" : void 0, rel: "noopener noreferrer", children: e11(n4.tokens) }, a2) : (0, t.jsx)(r.Fragment, { children: e11(n4.tokens) }, a2);
          }
          case "br":
            return (0, t.jsx)("br", {}, a2);
          case "space":
          case "def":
            return null;
          case "text":
            return (0, t.jsx)(r.Fragment, { children: n4.tokens ? e11(n4.tokens) : n4.text }, a2);
          default:
            return (0, t.jsx)(r.Fragment, { children: "text" in n4 ? n4.text : n4.raw }, a2);
        }
      });
    })(n2) });
  }
  e6.options = e6.setOptions = function(e10) {
    return e2.setOptions(e10), e6.defaults = e2.defaults, $ = e6.defaults, e6;
  }, e6.getDefaults = R, e6.defaults = $, e6.use = function(...e10) {
    return e2.use(...e10), e6.defaults = e2.defaults, $ = e6.defaults, e6;
  }, e6.walkTokens = function(e10, t10) {
    return e2.walkTokens(e10, t10);
  }, e6.parseInline = e2.parseInline, e6.Parser = e0, e6.parser = e0.parse, e6.Renderer = eK, e6.TextRenderer = eJ, e6.Lexer = eQ, e6.lexer = eQ.lex, e6.Tokenizer = eU, e6.Hooks = e1, e6.parse = e6, e6.options, e6.setOptions, e6.walkTokens, e6.parseInline, e0.parse, eQ.lex;
  var e4 = e.i(56397);
  async function* e5(e10) {
    let t10 = e10.getReader(), r10 = new TextDecoder(), n2 = "";
    try {
      for (; ; ) {
        let { value: e11, done: a2 } = await t10.read(), i2 = (n2 += a2 ? r10.decode() : r10.decode(e11, { stream: true })).split("\n");
        for (let e12 of (n2 = i2.pop() ?? "", a2 && n2 && i2.push(n2), i2)) {
          if (!e12.startsWith("data:")) continue;
          let t11 = e12.slice(5).trim();
          if ("[DONE]" === t11) return;
          let r11 = JSON.parse(t11);
          "string" == typeof r11.content && (yield r11.content);
        }
        if (a2) throw Error("The response was interrupted. Please try again.");
      }
    } finally {
      await t10.cancel().catch(() => {
      }), t10.releaseLock();
    }
  }
  var e8 = e.i(31338), e9 = e.i(87442);
  let e7 = (e10) => `mailto:${e8.PERSON.email}?subject=${encodeURIComponent(e10)}`, te = { tech: [["See past builds", "/projects"], ["Discuss a project", e7("Build project")]], studio: [["See brand work", "/brands"], ["Discuss a campaign", e7("Brand partnership")]], learn: [["Browse resources", "/blog"], ["About Avi", "/about"]], none: [["About Avi", "/about"], ["Email Avi", `mailto:${e8.PERSON.email}`]] };
  function tt({ onActive: e10 }) {
    let i2 = (function() {
      o.hasReducedMotionListener.current || (0, c.initPrefersReducedMotion)();
      let [e11] = (0, r.useState)(o.prefersReducedMotion.current);
      return e11;
    })(), [s2, d2] = (0, r.useState)(false), h2 = (0, r.useRef)(false), [p2, f2] = (0, r.useState)(""), [m2, g2] = (0, r.useState)([]), [x2, k2] = (0, r.useState)(null), [y2, b2] = (0, r.useState)(false), [w2, v2] = (0, r.useState)(""), [_2, S2] = (0, r.useState)(false), [j2, A2] = (0, r.useState)(100), R2 = (0, r.useRef)(null), [$2, L2] = (0, r.useState)(null), M2 = (0, r.useRef)(null), P2 = (0, r.useRef)(null), T2 = (0, r.useRef)(null), C2 = (0, r.useRef)(true), W2 = s2 || m2.length > 0, N2 = { "--accent": x2 ? u.WORLDS[x2].color : u.INK };
    async function z2(e11, t10 = m2) {
      let r10 = e11.trim();
      if (!r10 || M2.current || r10.length > 500) return;
      let n2 = new AbortController();
      M2.current = n2;
      let a2 = [...t10, { role: "user", content: r10 }], i3 = (0, u.intent)(r10) ?? x2;
      k2(i3), g2([...a2, { role: "assistant", content: "", world: i3 }]), f2(""), v2(""), b2(true), L2(null), C2.current = true, S2(false), (0, u.setWorldState)({ streaming: true }), window.dispatchEvent(new Event("home:blast"));
      let s3 = "", l2 = false, o2 = setTimeout(() => {
        l2 = true, n2.abort();
      }, 45e3);
      try {
        let e12 = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: a2.filter((e13) => e13.content).slice(-11).map(({ role: e13, content: t11 }) => ({ role: e13, content: t11 })) }), signal: n2.signal });
        if (!e12.ok || !e12.body) throw Error(429 === e12.status ? "A few too many questions at once. Give it a minute, then try again." : "Avi's AI is unavailable right now. You can try again or email Avi directly.");
        for await (let t11 of e5(e12.body)) {
          if (M2.current !== n2) return;
          s3 += t11, g2([...a2, { role: "assistant", content: s3, world: i3 }]);
        }
        if (!s3.trim()) throw Error("That reply came back empty. Please try again.");
      } catch (t11) {
        if (M2.current !== n2) return;
        let e12 = n2.signal.aborted && !l2;
        g2([...a2, { role: "assistant", content: s3, stopped: e12, world: i3 }]), e12 || v2(l2 ? "That took too long. Your question is still here. Try again?" : t11 instanceof Error ? t11.message : "Something went wrong. Please try again.");
      } finally {
        clearTimeout(o2), M2.current === n2 && (M2.current = null, b2(false), (0, u.setWorldState)({ streaming: false }));
      }
    }
    function O2() {
      let e11 = m2.findLastIndex((e12) => "user" === e12.role);
      e11 >= 0 && z2(m2[e11].content, m2.slice(0, e11));
    }
    function I2() {
      let e11 = M2.current;
      M2.current = null, e11?.abort(), d2(false), g2([]), v2(""), f2(""), k2(null), b2(false), S2(false), (0, u.setWorldState)({ streaming: false }), C2.current = true;
    }
    async function D2(e11, t10) {
      try {
        await navigator.clipboard.writeText(e11), L2(t10);
      } catch {
        L2(null);
      }
    }
    (0, r.useEffect)(() => {
      let e11 = new ResizeObserver(([e12]) => A2(e12.contentRect.height));
      return R2.current && e11.observe(R2.current), () => e11.disconnect();
    }, [W2]), (0, r.useEffect)(() => {
      W2 && !h2.current && P2.current?.focus({ preventScroll: true }), !W2 && h2.current && document.querySelector("[data-ai-link]")?.focus({ preventScroll: true }), h2.current = W2;
    }, [W2]), (0, r.useEffect)(() => {
      e10(W2);
    }, [W2, e10]), (0, r.useEffect)(() => {
      (0, u.setWorldState)({ chosen: x2 });
    }, [x2]), (0, r.useEffect)(() => () => {
      M2.current?.abort(), M2.current = null, (0, u.setWorldState)({ chosen: null, streaming: false });
    }, []), (0, r.useEffect)(() => {
      let e11 = () => I2(), t10 = () => d2(true);
      return window.addEventListener("home:reset", e11), window.addEventListener("home:chat", t10), () => {
        window.removeEventListener("home:reset", e11), window.removeEventListener("home:chat", t10);
      };
    }), (0, r.useEffect)(() => {
      C2.current && T2.current && (T2.current.scrollTop = T2.current.scrollHeight);
    }, [m2, w2]), (0, r.useEffect)(() => {
      let e11 = P2.current;
      e11 && (e11.style.height = "auto", e11.style.height = `${Math.min(e11.scrollHeight, 104)}px`);
    }, [p2]);
    let H2 = !y2 && !w2 && m2.at(-1)?.content;
    return (0, t.jsx)(n.AnimatePresence, { initial: false, children: W2 && (0, t.jsxs)(a.motion.div, { className: e9.default.chatSurface, initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 }, transition: { duration: 0.35 * !i2 }, children: [(0, t.jsxs)("section", { "aria-label": "Conversation with Avi\u2019s AI", className: e9.default.conversation, style: { ...N2, "--dock-height": `${j2}px` }, children: [(0, t.jsxs)("header", { className: e9.default.chatHeader, children: [(0, t.jsx)("div", { children: (0, t.jsxs)("span", { className: e9.default.who, children: [(0, t.jsx)("span", { className: e9.default.statusDot }), " AVI\u2019S AI"] }) }), (0, t.jsx)("button", { type: "button", onClick: I2, className: e9.default.back, children: "Back to exploring \u2197" })] }), (0, t.jsxs)("div", { ref: T2, className: e9.default.log, "data-lenis-prevent": "", role: "log", "aria-label": "Messages", "aria-live": "polite", "aria-busy": y2, onScroll: () => {
      let e11 = T2.current;
      C2.current = e11.scrollHeight - e11.scrollTop - e11.clientHeight < 72, S2(!C2.current);
    }, children: [!m2.length && (0, t.jsxs)("div", { className: e9.default.welcome, children: [(0, t.jsx)("h2", { children: "What are you working on?" }), (0, t.jsx)("p", { children: "Ask about building a product, a brand collaboration, or where to start learning." }), (0, t.jsx)("a", { href: `mailto:${e8.PERSON.email}`, children: "Or talk to Avi directly \u2197" })] }), m2.map((e11, r10) => "user" === e11.role ? (0, t.jsxs)("div", { className: e9.default.userTurn, children: [(0, t.jsx)("span", { className: "sr-only", children: "You: " }), (0, t.jsx)("p", { children: e11.content })] }, r10) : (0, t.jsxs)("article", { className: e9.default.reply, "aria-label": "Avi\u2019s AI reply", children: [(0, t.jsxs)("span", { className: e9.default.who, children: ["AVI\u2019S AI", e11.world ? ` \xB7 ${u.WORLDS[e11.world].label}` : ""] }), e11.content ? (0, t.jsx)("div", { className: e9.default.answer, children: (0, t.jsx)(e3, { content: e11.content }) }) : y2 && r10 === m2.length - 1 ? (0, t.jsxs)("p", { className: e9.default.thinking, children: ["Finding the right direction", (0, t.jsx)("span", { "aria-hidden": "true", children: "..." })] }) : null, e11.stopped && (0, t.jsx)("p", { className: e9.default.stopped, children: "Response stopped." }), e11.content && !(y2 && r10 === m2.length - 1) && (0, t.jsx)("button", { type: "button", className: e9.default.copy, onClick: () => void D2(e11.content, r10), children: $2 === r10 ? "Copied \u2713" : "Copy reply" })] }, r10)), w2 && (0, t.jsxs)("div", { className: e9.default.error, role: "alert", children: [(0, t.jsx)("p", { children: w2 }), (0, t.jsx)("button", { type: "button", onClick: O2, children: "Try again \u2197" }), (0, t.jsx)("a", { href: `mailto:${e8.PERSON.email}`, children: "Email Avi" })] }), !y2 && !w2 && m2.at(-1)?.stopped && (0, t.jsx)("button", { type: "button", onClick: O2, className: e9.default.copy, children: "Try that reply again \u2197" }), H2 && (0, t.jsx)("div", { className: e9.default.actions, children: te[x2 ?? "none"].map(([e11, r10]) => r10.startsWith("mailto:") ? (0, t.jsxs)("a", { href: r10, children: [e11, " \u2197"] }, r10) : (0, t.jsxs)(l.default, { href: r10, children: [e11, " \u2197"] }, r10)) })] }), _2 && (0, t.jsx)("button", { className: e9.default.jump, onClick: () => {
      C2.current = true, S2(false), T2.current && (T2.current.scrollTop = T2.current.scrollHeight);
    }, children: "Latest reply \u2193" })] }), (0, t.jsxs)("div", { ref: R2, className: e9.default.dock, "data-conversation": W2 || void 0, style: N2, children: [(0, t.jsxs)("form", { className: e9.default.composer, "aria-label": "Talk to Avi", onSubmit: (e11) => {
      e11.preventDefault(), z2(p2);
    }, children: [(0, t.jsx)(E, { inline: true, className: e9.default.mark }), (0, t.jsx)("label", { className: "sr-only", htmlFor: "agent-question", children: "Message Avi\u2019s AI" }), (0, t.jsx)("textarea", { ref: P2, id: "agent-question", rows: 1, value: p2, maxLength: 500, autoComplete: "off", placeholder: m2.length ? "Ask a follow-up..." : "What do you want to make?", "aria-describedby": "agent-note", onChange: (e11) => {
      f2(e11.target.value), m2.length || k2((0, u.intent)(e11.target.value));
    }, onKeyDown: (e11) => {
      "Enter" !== e11.key || e11.shiftKey || e11.nativeEvent.isComposing ? "Escape" === e11.key && (y2 ? M2.current?.abort() : I2()) : (e11.preventDefault(), z2(p2));
    } }), y2 ? (0, t.jsx)("button", { type: "button", className: e9.default.send, onClick: () => M2.current?.abort(), "aria-label": "Stop response", children: (0, t.jsx)("span", { className: e9.default.stop }) }) : (0, t.jsx)("button", { type: "submit", className: e9.default.send, disabled: !p2.trim(), "aria-label": "Send message", children: (0, t.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [(0, t.jsx)("path", { d: "M5 12h14" }), (0, t.jsx)("path", { d: "M13 6l6 6-6 6" })] }) })] }), (0, t.jsxs)("p", { id: "agent-note", className: W2 ? e9.default.note : "sr-only", children: [W2 ? (0, t.jsxs)(t.Fragment, { children: ["AI can make mistakes. ", (0, t.jsx)("a", { href: `mailto:${e8.PERSON.email}`, children: "Talk to the human \u2197" })] }) : "Chat with Avi\u2019s AI.", p2.length > 400 && (0, t.jsxs)("span", { children: [" \xB7 ", p2.length, "/500"] })] }), (0, t.jsx)("noscript", { children: (0, t.jsxs)("p", { className: e9.default.note, children: ["Enable JavaScript to chat, or ", (0, t.jsx)("a", { href: `mailto:${e8.PERSON.email}`, children: "email Avi directly" }), "."] }) })] })] }, "chat") });
  }
  var tr = e.i(37572), tn = e.i(57688), ta = e.i(87022), ti = e.i(37806), ts = e.i(86427), tl = e.i(47414);
  function to(e10) {
    let t10 = (0, tl.useConstant)(() => (0, ts.motionValue)(e10)), { isStatic: n2 } = (0, r.useContext)(ti.MotionConfigContext);
    if (n2) {
      let [, n3] = (0, r.useState)(e10);
      (0, r.useEffect)(() => t10.on("change", n3), []);
    }
    return t10;
  }
  var tc = e.i(28409), tu = e.i(96173), td = e.i(12008), th = e.i(79294);
  let tp = /* @__PURE__ */ new Set(), tf = ({ timestamp: e10 }) => {
    tp.forEach((t10) => t10.tick(e10));
  };
  class tm extends th.WithPromise {
    constructor(e10) {
      super(), this.state = "idle", this.startTime = 0, this.currentTime = 0, this.started = false, this.hasNextTarget = false, this.nextTarget = 0, this.stop = () => {
        "idle" !== this.state && (this.teardown(), this.options.onStop?.());
      }, this.options = e10, this.factory = e10.type, this.generator = this.factory(e10);
      const { driver: t10 } = e10;
      t10 && (this.driver = t10((e11) => this.tick(e11))), this.startTime = this.now(), this.state = "running", this.driver ? this.driver.start() : (tp.size || ta.frame.update(tf, true), tp.add(this));
    }
    setTarget(e10, t10) {
      this.nextTarget = e10, this.nextVelocity = t10, this.hasNextTarget = true;
    }
    retarget(e10, t10) {
      let { options: r10, generator: n2 } = this;
      r10.keyframes = e10, r10.velocity = t10, this.startTime = this.now(), this.currentTime = 0, n2.retarget ? n2.retarget(e10, t10) : this.generator = this.factory(r10);
    }
    tick(e10) {
      let { options: t10, hasNextTarget: r10 } = this, { delay: n2 = 0, onUpdate: a2, onPlay: i2 } = t10, s2 = Math.round(e10 - this.startTime) - n2, l2 = this.currentTime = Math.max(0, s2), o2 = this.generator.next(l2), c2 = s2 < 0 ? t10.keyframes[0] : o2.value;
      if (r10) {
        this.hasNextTarget = false;
        let { keyframes: e11 } = t10;
        e11[0] = c2, e11[1] = this.nextTarget, this.retarget(e11, this.nextVelocity ?? this.getGeneratorVelocity());
      }
      (r10 || !this.started) && (this.started = true, i2?.()), "running" === this.state && (a2?.(c2), o2.done && s2 >= 0 && !r10 && !this.hasNextTarget && "running" === this.state && (this.notifyFinished(), this.teardown(), this.state = "finished", t10.onComplete?.()));
    }
    getGeneratorVelocity() {
      return (0, td.calcGeneratorVelocity)(this.generator, this.currentTime, this.options.velocity);
    }
    now() {
      return this.driver ? this.driver.now() : tu.time.now();
    }
    teardown() {
      this.state = "idle", this.driver ? this.driver.stop() : (tp.delete(this), tp.size || (0, ta.cancelFrame)(tf));
    }
  }
  var tg = e.i(85260), tx = e.i(83411);
  function tk(e10, t10, r10) {
    return (function(e11, t11, r11) {
      let n2, a2 = e11.get(), i2 = null, s2 = "string" == typeof a2 ? a2.replace(/[\d.-]/g, "") : void 0, l2 = (e12) => n2(s2 ? e12 + s2 : e12), o2 = () => e11.events.animationStart?.notify(), c2 = () => {
        i2 && (i2.stop(), i2 = null), e11.animation = void 0;
      };
      if (e11.attach((t12, a3) => {
        n2 = a3;
        let s3 = (0, tg.asNumber)(t12);
        if (i2?.state === "running") return void i2.setTarget(s3, r11.velocity);
        let u2 = (0, tg.asNumber)(e11.get()), d2 = i2 ? i2.getGeneratorVelocity() : e11.getVelocity();
        if (c2(), u2 === s3) return;
        let h2 = i2 = new tm({ ...{ keyframes: [u2, s3], velocity: d2, restDelta: 1e-3, restSpeed: 0.01, ...r11, onUpdate: l2 }, onPlay: o2 });
        e11.animation = h2, h2.then(() => {
          i2 === h2 && (i2 = null, e11.animation = void 0, e11.events.animationComplete?.notify());
        });
      }, c2), (0, tx.isMotionValue)(t11)) {
        let n3 = true === r11.skipInitialAnimation, a3 = t11.on("change", (t12) => {
          var r12, a4, i4, l3;
          n3 ? (n3 = false, e11.jump((r12 = t12, (a4 = s2) ? r12 + a4 : r12), false)) : e11.set((i4 = t12, (l3 = s2) ? i4 + l3 : i4));
        }), i3 = e11.on("destroy", a3);
        return () => {
          a3(), i3();
        };
      }
      return c2;
    })(e10, t10, { ...r10, type: tc.spring });
  }
  e.i(68514), e.i(44573);
  var ty = e.i(44230), tb = e.i(74008);
  function tw(e10, t10) {
    let r10 = to(t10()), n2 = () => r10.set(t10());
    return n2(), (0, tb.useIsomorphicLayoutEffect)(() => {
      let t11 = () => ta.frame.preRender(n2, false, true), r11 = e10.map((e11) => e11.on("change", t11));
      return () => {
        r11.forEach((e11) => e11()), (0, ta.cancelFrame)(n2);
      };
    }), r10;
  }
  function tv(e10, t10, r10, n2) {
    if ("function" == typeof e10) {
      let t11;
      return ts.collectMotionValues.current = [], e10(), t11 = tw(ts.collectMotionValues.current, e10), ts.collectMotionValues.current = void 0, t11;
    }
    if (void 0 !== r10 && !Array.isArray(r10) && "function" != typeof t10) {
      var a2 = e10, i2 = t10, s2 = r10, l2 = n2;
      let o3 = (0, tl.useConstant)(() => Object.keys(s2)), c3 = (0, tl.useConstant)(() => ({}));
      for (let e11 of o3) c3[e11] = tv(a2, i2, s2[e11], l2);
      return c3;
    }
    let o2 = "function" == typeof t10 ? t10 : (function(...e11) {
      let t11 = !Array.isArray(e11[0]), r11 = t11 ? 0 : -1, n3 = e11[0 + r11], a3 = e11[1 + r11], i3 = e11[2 + r11], s3 = e11[3 + r11], l3 = (0, ty.interpolate)(a3, i3, s3);
      return t11 ? l3(n3) : l3;
    })(t10, r10, n2), c2 = Array.isArray(e10) ? t_(e10, o2) : t_([e10], ([e11]) => o2(e11)), u2 = Array.isArray(e10) ? void 0 : e10.accelerate;
    if (u2 && !u2.isTransformed && "function" != typeof t10 && Array.isArray(r10) && n2?.clamp !== false) {
      let e11 = n2?.ease;
      c2.accelerate = { ...u2, times: [0, ...t10, 1], keyframes: [r10[0], ...r10, r10[r10.length - 1]], isTransformed: true, ...e11 ? { ease: Array.isArray(e11) ? [e11[0], ...e11] : e11 } : {} };
    }
    return c2;
  }
  function t_(e10, t10) {
    let r10 = (0, tl.useConstant)(() => []);
    return tw(e10, () => {
      r10.length = 0;
      let n2 = e10.length;
      for (let t11 = 0; t11 < n2; t11++) r10[t11] = e10[t11].get();
      return t10(r10);
    });
  }
  function tS(e10, t10 = {}) {
    return (function(e11, t11, n2) {
      let { isStatic: a2 } = (0, r.useContext)(ti.MotionConfigContext), i2 = () => (0, tx.isMotionValue)(e11) ? e11.get() : e11;
      if (a2) return tv(i2);
      let s2 = to(i2());
      return (0, r.useInsertionEffect)(() => n2(s2, e11, t11), [s2, JSON.stringify(t11)]), s2;
    })(e10, t10, tk);
  }
  function tj(e10, t10, r10, n2 = 16) {
    let a2 = Math.floor((360 * e10 / n2 + t10 + 180) / 360);
    return ((e10 - a2 * n2 + Math.min(3, r10 - 1)) % r10 + r10) % r10;
  }
  function tA(e10, t10, r10 = 16) {
    return ((360 * e10 / r10 + t10 + 180) % 360 + 360) % 360 - 180;
  }
  function tE(e10) {
    let t10 = Math.min(16, e10);
    return Array.from({ length: t10 }, (e11, t11) => t11).sort((e11, r10) => Math.abs(tA(e11, 0, t10)) - Math.abs(tA(r10, 0, t10))).map((r10) => tj(r10, 0, e10, t10));
  }
  let tR = [], t$ = (e10, t10) => [...e10, ...t10.filter((t11) => !e10.includes(t11))];
  function tL(e10, t10 = tR) {
    let n2 = (0, r.useRef)(/* @__PURE__ */ new Map()), [a2, i2] = (0, r.useState)({ ready: 0, settled: 0, front: 0 }), [s2, l2] = (0, r.useState)(false), o2 = t$(tE(e10.length), t10).length;
    return (0, r.useEffect)(() => {
      let r10 = false, a3 = false, s3 = 0, o3 = 0, c2 = 0, u2 = 0, d2 = new AbortController(), h2 = [], p2 = t$(tE(e10.length), t10), f2 = [...p2, ...e10.map((e11, t11) => t11).filter((e11) => !p2.includes(e11))], m2 = window.matchMedia("(prefers-reduced-motion: reduce)"), g2 = async (t11 = false) => {
        for (; !r10 && s3 < f2.length && (!t11 || s3 < p2.length); ) {
          let t12 = f2[s3++], a4 = e10[t12].preview, l3 = false;
          if (a4) {
            for (let e11 = 0; e11 < 2 && !r10; e11++) try {
              let e12 = await fetch(a4, { signal: d2.signal, cache: "force-cache" });
              if (!e12.ok) throw Error("Preview unavailable");
              let i3 = await e12.blob();
              if (r10) return;
              let s4 = URL.createObjectURL(i3);
              h2.push(s4), n2.current.set(t12, s4), l3 = true;
              break;
            } catch {
              if (r10) return;
            }
            l3 || n2.current.set(t12, a4);
          }
          if (r10) return;
          o3 += +!!l3, c2++, p2.includes(t12) && u2++, i2({ ready: o3, settled: c2, front: u2 });
        }
      }, x2 = () => {
        a3 || m2.matches || (a3 = true, g2(), g2(), g2(true), g2(true));
      };
      x2(), m2.addEventListener("change", x2);
      let k2 = window.setTimeout(() => l2(true), 6500), y2 = n2.current;
      return () => {
        r10 = true, d2.abort(), clearTimeout(k2), m2.removeEventListener("change", x2), h2.forEach((e11) => URL.revokeObjectURL(e11)), y2.clear();
      };
    }, [e10, t10]), { sources: n2, progress: a2, frontCount: o2, loading: !s2 && a2.front < o2, dismiss: () => l2(true) };
  }
  var tM = e.i(65566), tP = e.i(33887), tT = e.i(64440), tC = e.i(39011);
  let tW = [];
  function tN(e10) {
    (0, tP.removeItem)(tW, e10);
  }
  function tz(e10, t10, r10 = {}, n2) {
    let a2 = [], { velocity: i2 } = r10, s2 = r10.reduceMotion ?? n2?.shouldReduceMotion;
    for (let l3 in t10) {
      if ("transition" === l3 || "transitionEnd" === l3) continue;
      let o2 = t10[l3];
      if (void 0 === o2) continue;
      let c2 = e10(l3), u2 = c2.get();
      if (void 0 !== u2 && !c2.isAnimating() && !Array.isArray(o2) && o2 === u2 && !i2) {
        ta.frame.update(() => c2.set(o2));
        continue;
      }
      c2.start((0, tC.animateMotionValue)(l3, c2, o2, s2 && tT.positionalKeys.has(l3) ? { type: false } : r10, n2)), c2.animation && a2.push(c2.animation);
    }
    let { transitionEnd: l2 } = t10;
    if (l2) {
      let t11 = () => ta.frame.update(() => {
        for (let t12 in l2) e10(t12).set(l2[t12]);
      });
      a2.length ? Promise.all(a2).then(t11) : t11();
    }
    return a2;
  }
  function tO(e10, t10, r10, n2, a2) {
    return tz((n3) => {
      let i2 = e10.get(t10, n3);
      if (!i2) {
        let l2;
        if (!a2) {
          var s2;
          let a3, i3 = r10[n3];
          l2 = (null === (a3 = Array.isArray(s2 = i3) ? s2[0] : void 0) ? void 0 : a3) ?? e10.read(t10, n3, i3), (0, tM.invariant)(void 0 !== l2, `"${n3}" can't be read from the animated subject. Provide [from, to] keyframes.`, "effect-unreadable-value");
        }
        e10(t10, { [n3]: i2 = (0, ts.motionValue)(l2, { owner: a2 }) });
      }
      return i2;
    }, r10, n2, a2);
  }
  class tI {
    constructor(e10) {
      this.stop = () => this.runAll("stop"), this.animations = e10.filter(Boolean);
    }
    get finished() {
      return Promise.all(this.animations.map((e10) => e10.finished));
    }
    getAll(e10) {
      return this.animations[0][e10];
    }
    setAll(e10, t10) {
      for (let r10 = 0; r10 < this.animations.length; r10++) this.animations[r10][e10] = t10;
    }
    attachTimeline(e10) {
      let t10 = this.animations.map((t11) => t11.attachTimeline(e10));
      return () => {
        t10.forEach((e11, t11) => {
          e11 && e11(), this.animations[t11].stop();
        });
      };
    }
    get time() {
      return this.getAll("time");
    }
    set time(e10) {
      this.setAll("time", e10);
    }
    get speed() {
      return this.getAll("speed");
    }
    set speed(e10) {
      this.setAll("speed", e10);
    }
    get state() {
      return this.getAll("state");
    }
    get startTime() {
      return this.getAll("startTime");
    }
    get duration() {
      return tD(this.animations, "duration");
    }
    get iterationDuration() {
      return tD(this.animations, "iterationDuration");
    }
    runAll(e10) {
      this.animations.forEach((t10) => t10[e10]());
    }
    play() {
      this.runAll("play");
    }
    pause() {
      this.runAll("pause");
    }
    cancel() {
      this.runAll("cancel");
    }
    complete() {
      this.runAll("complete");
    }
  }
  function tD(e10, t10) {
    let r10 = 0;
    for (let n2 = 0; n2 < e10.length; n2++) {
      let a2 = e10[n2][t10];
      null !== a2 && a2 > r10 && (r10 = a2);
    }
    return r10;
  }
  class tH extends tI {
    then(e10, t10) {
      return this.finished.finally(e10).then(() => {
      });
    }
  }
  var tB = e.i(15923), tV = e.i(97307), tq = e.i(21748), tF = e.i(15932), tX = e.i(83920), tZ = e.i(63074), tY = e.i(30151), tG = e.i(93544);
  function tU(e10, t10) {
    var r10;
    let n2;
    return (0, tG.isEasingArray)(e10) ? e10[r10 = e10.length, ((t10 - 0) % (n2 = r10 - 0) + n2) % n2 + 0] : e10;
  }
  var tQ = e.i(49652);
  function tK(e10) {
    return "object" == typeof e10 && !Array.isArray(e10);
  }
  function tJ(e10, t10, r10, n2) {
    return null == e10 ? [] : "string" == typeof e10 && tK(t10) ? (0, tQ.resolveElements)(e10, r10, n2) : e10 instanceof NodeList ? Array.from(e10) : Array.isArray(e10) ? e10.filter((e11) => null != e11) : [e10];
  }
  function t0(e10, t10, r10, n2) {
    return "number" == typeof t10 ? t10 : t10.startsWith("-") || t10.startsWith("+") ? Math.max(0, e10 + parseFloat(t10)) : "<" === t10 ? r10 : t10.startsWith("<") ? Math.max(0, r10 + parseFloat(t10.slice(1))) : n2.get(t10) ?? e10;
  }
  var t1 = e.i(706);
  function t2(e10, t10) {
    return e10.at !== t10.at ? e10.at - t10.at : null === e10.value ? 1 : null === t10.value ? -1 : 0;
  }
  function t6(e10, t10) {
    return t10.has(e10) || t10.set(e10, {}), t10.get(e10);
  }
  function t3(e10, t10) {
    return t10[e10] || (t10[e10] = []), t10[e10];
  }
  let t4 = (e10) => "number" == typeof e10, t5 = (e10) => e10.every(t4);
  var t8 = e.i(68705), t9 = e.i(34474), t7 = e.i(81296), re = e.i(57788), rt = e.i(72846), rr = e.i(89026), rn = e.i(34929), ra = e.i(46124);
  class ri {
    constructor(e10 = ta.frame.render) {
      this.step = e10, this.values = /* @__PURE__ */ new Map(), this.pending = [], this.numPending = 0, this.flush = () => {
        let { pending: e11, numPending: t10 } = this;
        this.numPending = 0;
        for (let r10 = 0; r10 < t10; r10++) e11[r10]();
      };
    }
    set(e10, t10, r10, n2) {
      if (this.values.get(e10)?.onRemove(), n2) for (let e11 of this.values.values()) e11.value === n2 && (r10 = e11.render);
      let a2 = () => r10 && this.schedule(r10);
      void 0 !== t10.get() && a2();
      let i2 = t10.on("change", a2), s2 = () => {
        i2(), r10 && !n2 && this.cancel(r10), this.values.get(e10)?.onRemove === s2 && this.values.delete(e10);
      };
      return this.values.set(e10, { value: t10, render: n2 ? void 0 : r10, onRemove: s2 }), s2;
    }
    get(e10) {
      return this.values.get(e10)?.value;
    }
    release() {
      let e10 = /* @__PURE__ */ new Map();
      return this.values.forEach((t10, r10) => {
        e10.set(r10, t10.value), t10.onRemove();
      }), this.transformKeys = this.transformValues = void 0, e10;
    }
    schedule(e10) {
      let { pending: t10, numPending: r10 } = this;
      for (let n2 = 0; n2 < r10; n2++) if (t10[n2] === e10) return;
      r10 || this.step(this.flush), t10[this.numPending++] = e10;
    }
    cancel(e10) {
      let { pending: t10 } = this;
      for (let r10 = 0; r10 < this.numPending; r10++) if (t10[r10] === e10) {
        t10[r10] = t10[--this.numPending];
        return;
      }
    }
  }
  function rs(e10, { step: t10, ...r10 } = {}) {
    let n2 = /* @__PURE__ */ new WeakMap();
    return Object.assign((r11, a2) => {
      let i2 = n2.get(r11) ?? new ri(t10);
      n2.set(r11, i2);
      let s2 = [];
      for (let t11 in a2) {
        let n3 = a2[t11], l2 = e10(r11, i2, t11, n3);
        s2.push(l2);
      }
      return () => {
        for (let e11 of s2) e11();
      };
    }, r10, { get: (e11, t11) => n2.get(e11)?.get(t11), flush: (e11) => n2.get(e11)?.flush(), state: (e11) => n2.get(e11) });
  }
  var rl = e.i(848);
  let ro = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" }, rc = {}, ru = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]), rd = (e10, t10) => (0, ra.getValueAsType)(e10.get(t10)?.get(), rn.numberValueTypes[t10]), rh = (e10, t10, r10, n2) => {
    let a2, i2;
    if (re.transformProps.has(r10)) {
      if ("pathRotation" !== r10) {
        let e11 = t10.transformKeys ?? (t10.transformKeys = []);
        (t10.transformValues ?? (t10.transformValues = {}))[r10] = n2, e11.includes(r10) || (e11.push(r10), e11.sort((e12, t11) => re.transformPropOrder.indexOf(e12) - re.transformPropOrder.indexOf(t11)));
      }
      t10.get("transform") || ((0, rt.isHTMLElement)(e10) || t10.get("transformBox") || rh(e10, t10, "transformBox", new ts.MotionValue("fill-box")), t10.set("transform", new ts.MotionValue("none"), () => {
        e10.style.transform = (function(e11) {
          let t11 = "", { transformKeys: r11 = [], transformValues: n3 = {} } = e11;
          for (let e12 = 0; e12 < r11.length; e12++) {
            let a4 = r11[e12], i3 = n3[a4].get();
            void 0 !== i3 && ("number" == typeof i3 ? i3 : parseFloat(i3)) !== +!!a4.startsWith("scale") && (t11 += (t11 && " ") + (rc[a4] || (rc[a4] = (ro[a4] || a4) + "(")) + (0, ra.getValueAsType)(i3, rl.transformValueTypes[a4]) + ")");
          }
          let a3 = e11.get("pathRotation")?.get();
          return a3 && (t11 += (t11 && " ") + "rotate(" + (0, ra.getValueAsType)(a3, rl.transformValueTypes.pathRotation) + ")"), t11 || "none";
        })(t10);
      })), i2 = t10.get("transform");
    } else ru.has(r10) ? (t10.get("transformOrigin") || t10.set("transformOrigin", new ts.MotionValue(""), () => {
      let r11 = rd(t10, "originX") ?? "50%", n3 = rd(t10, "originY") ?? "50%", a3 = rd(t10, "originZ") ?? 0;
      e10.style.transformOrigin = `${r11} ${n3} ${a3}`;
    }), i2 = t10.get("transformOrigin")) : a2 = (0, t9.isCSSVar)(r10) ? () => {
      e10.style.setProperty(r10, n2.get());
    } : () => {
      e10.style[r10] = (0, ra.getValueAsType)(n2.get(), rn.numberValueTypes[r10]);
    };
    return t10.set(r10, n2, a2, i2);
  }, rp = (e10, t10) => {
    if (re.transformProps.has(t10)) return (0, t7.readTransformValue)(e10, t10);
    let r10 = getComputedStyle(e10), n2 = (0, t9.isCSSVar)(t10) ? r10.getPropertyValue(t10) : r10[t10];
    return "string" == typeof n2 && n2.trim() || 0;
  }, rf = rs(rh, { test: (e10) => (0, rt.isHTMLElement)(e10) || (0, rr.isSVGElement)(e10), read: rp });
  var rm = e.i(93787), rg = e.i(81261);
  let rx = (e10, t10, r10, n2, a2 = r10) => {
    let i2 = (function(e11, t11) {
      if (!(t11 in e11)) return false;
      let r11 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e11), t11) || Object.getOwnPropertyDescriptor(e11, t11);
      return r11 && "function" == typeof r11.set;
    })(e10, a2);
    !i2 && (a2.startsWith("data") || a2.startsWith("aria")) && (a2 = (0, rm.camelToDash)(a2));
    let s2 = rn.numberValueTypes[r10] || rn.numberValueTypes[a2], l2 = i2 ? () => {
      e10[a2] = (0, ra.getValueAsType)(n2.get(), rn.numberValueTypes[r10]);
    } : () => {
      let t11 = (0, ra.getValueAsType)(n2.get(), s2);
      null == t11 ? e10.removeAttribute(a2) : e10.setAttribute(a2, String(t11));
    };
    return t10.set(r10, n2, l2);
  }, rk = rs((e10, t10, r10, n2) => {
    if (r10.startsWith("path")) return (ta.frame.render(() => e10.setAttribute("pathLength", "1")), "pathOffset" === r10) ? t10.set(r10, n2, () => {
      let t11 = n2.get();
      e10.setAttribute("stroke-dashoffset", `${-t11}`);
    }) : (t10.get("stroke-dasharray") || t10.set("stroke-dasharray", new ts.MotionValue("1 1"), () => {
      let r11 = t10.get("pathLength")?.get() ?? 1, n3 = t10.get("pathSpacing")?.get();
      e10.setAttribute("stroke-dasharray", `${r11} ${n3 ?? 1 - Number(r11)}`);
    }), t10.set(r10, n2, void 0, t10.get("stroke-dasharray")));
    return r10.startsWith("attr") ? rx(e10, t10, r10, n2, ry(r10)) : (re.transformProps.has(r10) || ru.has(r10) || (0, t9.isCSSVar)(r10) || r10 in e10.style ? rh : rx)(e10, t10, r10, n2);
  }, { test: rr.isSVGElement, read: (e10, t10) => re.transformProps.has(t10) ? rn.numberValueTypes[t10]?.default || 0 : (0, t9.isCSSVar)(t10) || rg.cssStyleProperties.includes(t10) ? rp(e10, t10) || e10.getAttribute((0, rm.camelToDash)(t10)) || 0 : (t10 = ry(t10), e10.getAttribute((0, rm.camelToDash)(t10)) ?? e10.getAttribute(t10) ?? void 0) });
  function ry(e10) {
    return e10.replace(/^attr([A-Z])/, (e11, t10) => t10.toLowerCase());
  }
  var rb = e.i(53689), rw = e.i(46436);
  let rv = {};
  class r_ {
    constructor(e10, t10) {
      this.effect = e10, this.current = t10, this.KeyframeResolver = rw.DOMKeyframesResolver;
    }
    getValue(e10) {
      return this.effect.get(this.current, e10);
    }
    readValue(e10, t10) {
      return this.effect.read(this.current, e10, t10);
    }
    render() {
      this.effect.flush(this.current);
    }
    measureViewportBox() {
      return (0, rb.measureViewportBox)(this.current);
    }
    getProps() {
      return rv;
    }
  }
  var rS = e.i(72094), rj = e.i(42824);
  let rA = rs((e10, t10, r10, n2) => t10.set(r10, n2, () => {
    e10[r10] = n2.get();
  }), { test: (e10) => (0, rj.isObject)(e10), read: (e10, t10) => {
    let r10 = e10[t10];
    return "string" == typeof r10 || "number" == typeof r10 ? r10 : void 0;
  } });
  function rE(e10, t10, r10, n2) {
    let a2 = [];
    if ((0, tx.isMotionValue)(e10) || "number" == typeof e10 || "string" == typeof e10 && !tK(t10)) a2.push((0, t8.animateSingleValue)(e10, tK(t10) && t10.default || t10, r10 && r10.default || r10));
    else {
      if (null == e10) return a2;
      let i2 = tJ(e10, t10, n2), s2 = i2.length;
      (0, tM.invariant)(!!s2, "No valid elements provided.", "no-valid-elements");
      for (let e11 = 0; e11 < s2; e11++) {
        let n3 = i2[e11], l2 = { ...r10 };
        "delay" in l2 && "function" == typeof l2.delay && (l2.delay = l2.delay(e11, s2)), n3 instanceof Element ? a2.push(...(function(e12, t11, r11, n4) {
          if (n4) return tz((e13) => n4.getValue(e13, null), t11, r11, n4);
          let a3 = (0, rr.isSVGElement)(e12) ? rk : rf;
          return tO(a3, e12, t11, r11, new r_(a3, e12));
        })(n3, t10, l2, rS.visualElementStore.get(n3))) : a2.push(...tO((function(e12) {
          return tW.find((t11) => t11.test(e12));
        })(n3) ?? rA, n3, t10, l2));
      }
    }
    return a2;
  }
  let rR = Object.assign((function(e10 = {}) {
    let { scope: t10, reduceMotion: r10, skipAnimations: n2 } = e10;
    return function(e11, a2, i2) {
      var s2;
      let l2, o2 = [], c2 = {};
      if (void 0 !== r10 && (c2.reduceMotion = r10), void 0 !== n2 && (c2.skipAnimations = n2), Array.isArray(e11) && e11.some(Array.isArray)) {
        let r11, { onComplete: n3, ...i3 } = a2 || {};
        "function" == typeof n3 && (l2 = n3), s2 = { ...c2, ...i3 }, r11 = [], (function(e12, { defaultTransition: t11 = {}, ...r12 } = {}, n4, a3) {
          let i4 = t11.duration || 0.3, s3 = /* @__PURE__ */ new Map(), l3 = /* @__PURE__ */ new Map(), o3 = {}, c3 = /* @__PURE__ */ new Map(), u3 = 0, d2 = 0, h2 = 0;
          for (let r13 = 0; r13 < e12.length; r13++) {
            let s4 = e12[r13];
            if ("string" == typeof s4) {
              c3.set(s4, d2);
              continue;
            }
            if (!Array.isArray(s4)) {
              c3.set(s4.name, t0(d2, s4.at, u3, c3));
              continue;
            }
            let [m2, g2, x2 = {}] = s4;
            void 0 !== x2.at && (d2 = t0(d2, x2.at, u3, c3));
            let k2 = 0, y2 = (e13, r14, n5, s5 = 0, l4 = 0) => {
              var o4;
              let c4 = Array.isArray(o4 = e13) ? o4 : [o4], { delay: u4 = 0, times: p3 = (0, tB.defaultOffset)(c4), type: f3 = t11.type || "keyframes", repeat: m3, repeatType: g3, repeatDelay: x3 = 0, ...y3 } = r14, { ease: b2 = t11.ease || "easeOut", duration: w2 } = r14, v2 = "function" == typeof u4 ? u4(s5, l4) : u4, _2 = c4.length, S2 = (0, tV.isGenerator)(f3) ? f3 : a3?.[f3 || "keyframes"];
              if (_2 <= 2 && S2) {
                let e14 = 100;
                2 === _2 && t5(c4) && (e14 = Math.abs(c4[1] - c4[0]));
                let r15 = { ...t11, ...y3 };
                void 0 !== w2 && (r15.duration = (0, tZ.secondsToMilliseconds)(w2));
                let n6 = (0, tq.createGeneratorEasing)(r15, e14, S2);
                b2 = n6.ease, w2 = n6.duration;
              }
              w2 ?? (w2 = i4);
              let j2 = d2 + v2;
              1 === p3.length && 0 === p3[0] && (p3[1] = 1);
              let A2 = p3.length - c4.length;
              if (A2 > 0 && (0, tF.fillOffset)(p3, A2), 1 === c4.length && c4.unshift(null), m3 && (0, tM.warning)(m3 < 20, `Sequence segments can't repeat ${m3} times \u2014 ignoring repeat option. Use a value below 20 or apply repeat at the sequence level instead.`), m3 && m3 < 20) {
                let e14 = w2 > 0 ? x3 / w2 : 0;
                w2 = w2 * (m3 + 1) + x3 * m3;
                let t12 = [...c4], r15 = [...p3], n6 = [...b2 = Array.isArray(b2) ? [...b2] : [b2]], a4 = "reverse" === g3 || "mirror" === g3, i5 = t12, s6 = n6;
                a4 && (i5 = [...t12].reverse(), "reverse" === g3 && (s6 = [...n6].reverse().map((e15) => "function" == typeof e15 ? (0, tY.reverseEasing)(e15) : e15)));
                for (let l5 = 0; l5 < m3; l5++) {
                  let o5 = a4 && l5 % 2 == 0, u5 = o5 ? i5 : t12, d3 = o5 ? s6 : n6, h3 = (l5 + 1) * (1 + e14);
                  e14 > 0 && (c4.push(c4[c4.length - 1]), p3.push(h3), b2.push("linear")), c4.push(...u5);
                  for (let e15 = 0; e15 < u5.length; e15++) p3.push(r15[e15] + h3), b2.push(0 === e15 ? "linear" : tU(d3, e15 - 1));
                }
                !(function(e15, t13, r16 = 0) {
                  let n7 = t13 + 1 + t13 * r16;
                  for (let t14 = 0; t14 < e15.length; t14++) e15[t14] = e15[t14] / n7;
                })(p3, m3, e14);
              }
              let E2 = j2 + w2;
              !(function(e14, t12, r15, n6, a4, i5) {
                for (let t13 = 0; t13 < e14.length; t13++) {
                  let r16 = e14[t13];
                  r16.at > a4 && r16.at < i5 && ((0, tP.removeItem)(e14, r16), t13--);
                }
                for (let s6 = 0; s6 < t12.length; s6++) e14.push({ value: t12[s6], at: (0, t1.mixNumber)(a4, i5, n6[s6]), easing: tU(r15, s6) });
              })(n5, c4, b2, p3, j2, E2), k2 = Math.max(v2 + w2, k2), h2 = Math.max(E2, h2);
            };
            if ((0, tx.isMotionValue)(m2)) y2(g2, x2, t3("default", t6(m2, l3)));
            else {
              let e13 = tJ(m2, g2, n4, o3), t12 = e13.length;
              for (let r14 = 0; r14 < t12; r14++) {
                let n5 = t6(e13[r14], l3);
                for (let e14 in g2) {
                  var p2, f2;
                  y2(g2[e14], (p2 = x2, f2 = e14, p2 && p2[f2] ? { ...p2, ...p2[f2] } : { ...p2 }), t3(e14, n5), r14, t12);
                }
              }
            }
            u3 = d2, d2 += k2;
          }
          return l3.forEach((e13, n5) => {
            for (let a4 in e13) {
              let i5 = e13[a4];
              i5.sort(t2);
              let l4 = [], o4 = [], c4 = [];
              for (let e14 = 0; e14 < i5.length; e14++) {
                let { at: t12, value: r13, easing: n6 } = i5[e14];
                l4.push(r13), o4.push((0, tX.progress)(0, h2, t12)), c4.push(n6 || "easeOut");
              }
              0 !== o4[0] && (o4.unshift(0), l4.unshift(l4[0]), c4.unshift("easeInOut")), 1 !== o4[o4.length - 1] && (o4.push(1), l4.push(null)), s3.has(n5) || s3.set(n5, { keyframes: {}, transition: {} });
              let u4 = s3.get(n5);
              u4.keyframes[a4] = l4;
              let { type: d3, ...p3 } = t11;
              u4.transition[a4] = { ...p3, duration: h2, ease: c4, times: o4, ...r12 };
            }
          }), s3;
        })(e11.map((e12) => {
          if (Array.isArray(e12) && "function" == typeof e12[0]) {
            let t11 = e12[0], r12 = (0, ts.motionValue)(0);
            return (r12.on("change", t11), 1 === e12.length) ? [r12, [0, 1]] : 2 === e12.length ? [r12, [0, 1], e12[1]] : [r12, e12[1], e12[2]];
          }
          return e12;
        }), s2, t10, { spring: tc.spring }).forEach(({ keyframes: e12, transition: t11 }, n4) => {
          r11.push(...rE(n4, e12, t11));
        }), o2 = r11;
      } else {
        let { onComplete: r11, ...n3 } = i2 || {};
        "function" == typeof r11 && (l2 = r11), o2 = rE(e11, a2, { ...c2, ...n3 }, t10);
      }
      let u2 = new tH(o2);
      return l2 && u2.finished.then(l2), t10 && (t10.animations.push(u2), u2.finished.then(() => {
        (0, tP.removeItem)(t10.animations, u2);
      })), u2;
    };
  })(), { addEffect: function(e10) {
    (0, tM.invariant)("function" == typeof e10.test && "function" == typeof e10.read, "Effects passed to animate.addEffect() need test() and read().", "effect-missing-test"), tN(e10), tW.unshift(e10);
  }, removeEffect: tN }), r$ = [0.22, 1, 0.36, 1], rL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=";
  function rM({ text: e10, delay: n2 = 0 }) {
    let [a2, i2] = (0, r.useState)("");
    return (0, r.useEffect)(() => {
      let t10 = 0, r10 = performance.now() + n2, a3 = () => {
        let n3 = performance.now() - r10;
        if (n3 >= 0) {
          let t11 = Math.floor(n3 / 45);
          if (i2([...e10].map((e11, r11) => " " === e11 || r11 < t11 ? e11 : r11 < t11 + 6 ? rL[Math.floor(Math.random() * rL.length)] : "").join("")), t11 >= e10.length) return;
        }
        t10 = requestAnimationFrame(a3);
      };
      return t10 = requestAnimationFrame(a3), () => cancelAnimationFrame(t10);
    }, [e10, n2]), (0, t.jsx)(t.Fragment, { children: a2 || "\xA0" });
  }
  function rP({ value: e10 }) {
    let r10 = Math.max(0, Math.min(999, e10)).toString().padStart(3, "0").split("").map(Number);
    return (0, t.jsx)("span", { className: e4.default.odometer, children: r10.map((e11, r11) => (0, t.jsx)("span", { className: e4.default.odometerDigit, children: (0, t.jsx)("span", { style: { transform: `translateY(${-(10 * e11)}%)` }, children: Array.from({ length: 10 }, (e12, r12) => (0, t.jsx)("span", { children: r12 }, r12)) }) }, r11)) });
  }
  function rT({ loading: e10, ready: s2, total: l2, formation: o2, expansion: c2, skip: u2, onComplete: d2 }) {
    var h2, p2;
    let [f2, m2] = (0, r.useState)(true), [g2, x2] = (0, r.useState)(true), k2 = (0, r.useRef)(null), y2 = (0, r.useRef)(false), b2 = (0, i.useHomeEntrance)();
    (0, r.useEffect)(() => {
      if (f2 || !g2) return;
      let e11 = k2.current, t10 = document.querySelector(".wordmark-first");
      if (y2.current || !e11 || !t10) return void x2(false);
      let r10 = e11.getBoundingClientRect(), n2 = t10.getBoundingClientRect(), a2 = parseFloat(getComputedStyle(t10).fontSize) / parseFloat(getComputedStyle(e11).fontSize), i2 = rR(e11, { x: n2.left - r10.left, y: n2.top - r10.top, scale: a2 }, { duration: 1.3, ease: [0.65, 0, 0.35, 1] }), s3 = e11.lastElementChild ? rR(e11.lastElementChild, { opacity: 0 }, { duration: 0.5 }) : null;
      return () => {
        i2.stop(), s3?.stop();
      };
    }, [f2, g2]), (0, r.useEffect)(() => {
      if (!b2 || !g2) return;
      let e11 = setTimeout(() => x2(false), 900);
      return () => clearTimeout(e11);
    }, [b2, g2]);
    let w2 = (0, r.useRef)(null), v2 = (0, r.useRef)(e10), _2 = (0, r.useRef)(() => {
    }), S2 = to(0), [j2, A2] = (0, r.useState)(0);
    return h2 = "change", p2 = (e11) => A2(Math.round(e11)), (0, r.useInsertionEffect)(() => S2.on(h2, p2), [S2, h2, p2]), (0, r.useEffect)(() => {
      v2.current = e10, _2.current();
    }, [e10]), (0, r.useEffect)(() => {
      let e11 = rR(S2, l2 ? s2 / l2 * 100 : 100, { duration: 0.65, ease: [0.22, 1, 0.36, 1] });
      return () => e11.stop();
    }, [S2, s2, l2]), (0, r.useEffect)(() => {
      (0, i.setHomeEntrance)(false);
      let e11 = matchMedia("(prefers-reduced-motion: reduce)"), t10 = false, r10 = false, n2 = false, a2 = false, s3 = [], l3 = (e12 = false) => {
        !n2 && (a2 = true, d2(), e12 && (0, i.setHomeEntrance)(true, true));
      }, h3 = () => {
        n2 || a2 || (y2.current = true, r10 = true, s3.forEach((e12) => e12.stop()), w2.current && (w2.current.style.display = "none"), o2.jump(1), c2.jump(1), m2(false), window.dispatchEvent(new Event("home:reveal")), l3(true));
      };
      _2.current = () => {
        !t10 || v2.current || r10 || n2 || (r10 = true, m2(false), window.dispatchEvent(new Event("home:reveal")), s3.push(rR(c2, 1, { duration: 1.9, ease: [0.5, 0, 0.15, 1], onComplete: () => l3() })), s3.push(rR(0, 1, { duration: 1.05, onComplete: () => (0, i.setHomeEntrance)(true) })));
      };
      let p3 = u2.on("change", h3), f3 = (e12) => {
        ("Escape" === e12.key || "Tab" === e12.key) && h3();
      }, g3 = () => {
        e11.matches && h3();
      };
      return window.addEventListener("keydown", f3), e11.addEventListener("change", g3), s3.push(rR(o2, 1, { duration: 2.6 * !e11.matches, ease: "linear", onComplete: () => {
        if (!n2) {
          if (e11.matches || u2.get()) return void h3();
          t10 = true, _2.current();
        }
      } })), () => {
        n2 = true, s3.forEach((e12) => e12.stop()), p3(), window.removeEventListener("keydown", f3), e11.removeEventListener("change", g3);
      };
    }, [o2, c2, u2, d2]), (0, t.jsxs)(t.Fragment, { children: [g2 && (0, t.jsx)("p", { ref: k2, className: e4.default.loaderBrand, "aria-hidden": "true", children: "Avi.".split("").map((e11, r10) => (0, t.jsx)("span", { className: e4.default.loaderMask, children: (0, t.jsx)(a.motion.span, { initial: { y: "105%", rotate: 8 }, animate: { y: 0, rotate: 0 }, transition: { duration: 1, delay: 0.1 + 0.08 * r10, ease: r$ }, children: e11 }) }, r10)) }), (0, t.jsx)(n.AnimatePresence, { children: f2 && (0, t.jsxs)(a.motion.div, { ref: w2, className: e4.default.reelLoader, initial: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, children: [(0, t.jsxs)("div", { className: e4.default.loaderStatus, children: [(0, t.jsx)(a.motion.p, { className: e4.default.loaderCaption, "aria-hidden": "true", exit: { opacity: 0, transition: { duration: 0.3 } }, children: (0, t.jsx)(rM, { text: "Loading Reels", delay: 350 }) }), (0, t.jsxs)("div", { className: e4.default.loaderCount, role: "progressbar", "aria-label": "Preparing Reel previews", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": l2 ? Math.round(s2 / l2 * 100) : 100, children: [(0, t.jsx)(a.motion.span, { className: e4.default.loaderMask, initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "-100%", transition: { duration: 0.5, ease: [0.6, 0, 0.8, 0.4] } }, transition: { duration: 0.9, delay: 0.2, ease: r$ }, children: (0, t.jsx)(rP, { value: j2 }) }), (0, t.jsx)("span", { className: e4.default.loaderPercent, children: "%" })] })] }), (0, t.jsx)("button", { type: "button", "aria-label": "Skip entrance animation", title: "Skip animation", onClick: () => u2.set(u2.get() + 1), children: "\u2197" })] }) })] });
  }
  function rC({ reels: e10, hidden: n2, priority: a2 }) {
    let i2 = (0, r.useRef)(null), s2 = (0, r.useRef)(false), { sources: l2, progress: o2, frontCount: c2, loading: d2 } = tL(e10, a2), h2 = to(0), p2 = to(0), f2 = to(0), m2 = to(0), g2 = tS(m2, { stiffness: 150, damping: 27, mass: 1 }), x2 = (0, r.useRef)(false), k2 = (0, r.useCallback)(() => {
      x2.current = true;
    }, []), y2 = (0, r.useRef)(() => {
    });
    !(function(e11) {
      let t10 = (0, r.useRef)(0), { isStatic: n3 } = (0, r.useContext)(ti.MotionConfigContext);
      (0, r.useEffect)(() => {
        if (n3) return;
        let r10 = ({ timestamp: r11, delta: n4 }) => {
          t10.current || (t10.current = r11), e11(r11 - t10.current, n4);
        };
        return ta.frame.update(r10, true), () => (0, ta.cancelFrame)(r10);
      }, [e11]);
    })((e11, t10) => y2.current(e11, t10));
    let b2 = Math.min(16, e10.length), [w2, v2] = (0, r.useState)(() => Array.from({ length: b2 }, (t10, r10) => tj(r10, 0, e10.length, b2))), _2 = (0, r.useRef)(w2), S2 = (0, r.useRef)(false);
    return (0, r.useEffect)(() => {
      S2.current = n2;
    }, [n2]), (0, r.useEffect)(() => {
      let t10 = i2.current, r10 = t10.querySelector("[data-ring]"), n3 = t10.querySelector("[data-lens]"), a3 = 0, o3 = 1, c3 = 1, d3 = 450, f3 = () => {
        d3 = 450;
        let e11 = t10.getBoundingClientRect();
        a3 = 0.44 * window.innerHeight - (e11.top + e11.height / 2), c3 = parseFloat(getComputedStyle(r10).getPropertyValue("--wall-scale")) || 1, o3 = Math.min(1.05, (window.innerWidth - 32) / 1240, 0.66 * window.innerHeight / 800) / c3;
      };
      f3(), window.addEventListener("resize", f3);
      let k3 = Array.from(t10.querySelectorAll("[data-card]")), w3 = k3.map((e11) => e11.querySelector("video")), j2 = k3.map(() => false), A2 = () => {
        document.hidden && (w3.forEach((e11) => e11?.pause()), j2.fill(false));
      };
      document.addEventListener("visibilitychange", A2);
      let E2 = 1, R2 = null, $2 = { x: -1e4, y: -1e4, inWall: false }, L2 = -1, M2 = (e11) => {
        if (S2.current || e11.ctrlKey || e11.metaKey) return;
        let t11 = e11.target instanceof Element ? e11.target : null;
        if (t11?.closest('input, textarea, select, [role="dialog"], [role="log"], [aria-label="Conversation with Avi\u2019s AI"]') || (e11.preventDefault(), !x2.current)) return;
        let r11 = 1 === e11.deltaMode ? 16 : 2 === e11.deltaMode ? window.innerHeight : 1, n4 = (Math.abs(e11.deltaY) >= Math.abs(e11.deltaX) ? e11.deltaY : e11.deltaX) * r11;
        m2.set(m2.get() + 0.5 * Math.max(-480, Math.min(480, n4))), (0, u.prefersReducedMotion)() && g2.jump(m2.get()), window.dispatchEvent(new CustomEvent("home:carousel", { detail: { amount: Math.min(1, Math.abs(n4) / 120), x: e11.clientX } }));
      }, P2 = (e11) => {
        0 === e11.button && !S2.current && x2.current && (R2 = { x: e11.clientX, y: e11.clientY, a: m2.get(), moved: false }, t10.style.cursor = "grabbing");
      }, T2 = (e11) => {
        if ($2.x = e11.clientX, $2.y = e11.clientY, !R2) return;
        let t11 = e11.clientX - R2.x, r11 = e11.clientY - R2.y;
        Math.max(Math.abs(t11), Math.abs(r11)) > 4 && (R2.moved = true), m2.set(R2.a + 0.2 * rW(t11, r11)), (0, u.prefersReducedMotion)() && g2.jump(m2.get());
      }, C2 = null, W2 = (e11) => {
        var t11;
        let r11;
        C2 = null, 1 !== e11.touches.length || S2.current || !x2.current || (r11 = (t11 = e11.target) instanceof Element ? t11 : null, r11?.closest('[data-card], input, textarea, select, [role="dialog"], [role="log"], [data-lenis-prevent], [aria-label="Conversation with Avi\u2019s AI"]')) || (C2 = { x: e11.touches[0].clientX, y: e11.touches[0].clientY, a: m2.get() });
      }, N2 = (e11) => {
        C2 && 1 === e11.touches.length && (m2.set(C2.a + 0.2 * rW(e11.touches[0].clientX - C2.x, e11.touches[0].clientY - C2.y)), (0, u.prefersReducedMotion)() && g2.jump(m2.get()));
      }, z2 = () => {
        C2 = null;
      }, O2 = () => {
        R2 && (s2.current = R2.moved, R2 = null, t10.style.cursor = "", setTimeout(() => {
          s2.current = false;
        }, 50));
      }, I2 = (e11) => {
        $2.inWall = "mouse" === e11.pointerType;
      }, D2 = () => {
        $2.inWall = false;
      };
      window.addEventListener("wheel", M2, { passive: false }), t10.addEventListener("pointerdown", P2), t10.addEventListener("pointerenter", I2), t10.addEventListener("pointerleave", D2), window.addEventListener("pointermove", T2), window.addEventListener("pointerup", O2), window.addEventListener("pointercancel", O2), window.addEventListener("touchstart", W2, { passive: true }), window.addEventListener("touchmove", N2, { passive: true }), window.addEventListener("touchend", z2), window.addEventListener("touchcancel", z2);
      let H2 = /* @__PURE__ */ new Map(), B2 = (e11, t11, r11) => {
        H2.get(e11) !== t11 && (H2.set(e11, t11), r11());
      }, V2 = (e11, t11) => B2(e11, t11, () => r10.style.setProperty(e11, t11)), q2 = matchMedia("(prefers-reduced-motion: reduce)"), F2 = 0;
      return y2.current = (r11, i3) => {
        let s3 = Math.min(i3 / (1e3 / 60), 3), u2 = q2.matches;
        if ($2.inWall && !R2 && x2.current) {
          if (F2++ % 3 == 0) {
            let e11 = document.elementFromPoint($2.x, $2.y)?.closest("[data-card]");
            L2 = e11 ? k3.indexOf(e11) : -1;
          }
        } else L2 = -1;
        let f4 = p2.get(), y3 = (function(e11, t11 = 450) {
          let r12 = -22 * (1 - e11), n4 = 460 + 1340 * e11, a4 = -n4 * Math.sin(r12 * Math.PI / 180) + 460 * Math.sin(-22 * Math.PI / 180) * (1 - e11);
          return { radius: n4, anchor: a4, perspective: 1e3 + (t11 - 1e3) * e11, tilt: r12, roll: -20 * (1 - e11), orientation: 1, scale: 0.52 + (2.3 - 0.52) * e11 * e11, expansion: e11 };
        })(f4, d3), A3 = c3 * (o3 + (1 - o3) * f4);
        V2("--intro-offset", `${a3 * (1 - f4) + y3.anchor * A3}px`);
        let M3 = `${y3.perspective * A3}px`;
        B2("perspective", M3, () => {
          n3.style.perspective = M3;
        });
        let P3 = `50% calc(50% + ${a3 * (1 - f4)}px)`;
        B2("origin", P3, () => {
          n3.style.perspectiveOrigin = P3;
        }), V2("--intro-tilt", `${y3.tilt}deg`), V2("--intro-roll", `${y3.roll}deg`), V2("--intro-x", `${160 * Math.sin(y3.roll * Math.PI / 180) * A3}px`), V2("--intro-sz", String(A3)), V2("--intro-scale", String(o3 + (1 - o3) * f4)), x2.current && B2("entering", "done", () => t10.removeAttribute("data-entering"));
        let T3 = L2;
        if (!S2.current) {
          let e11 = t10.contains(document.activeElement);
          if (E2 += ((T3 >= 0 ? 0.2 : 1) - E2) * Math.min(1, 0.08 * s3), !R2 && !e11 && !u2) {
            let e12 = x2.current ? 0.3 : 0.3 * (0.5 + 0.5 * f4) * Math.max(0, Math.min(1, (78 - m2.get()) / 20));
            m2.set(m2.get() + e12 * E2 * s3);
          }
        }
        let C3 = g2.get(), W3 = false, N3 = [..._2.current];
        for (let t11 = 0; t11 < k3.length; t11++) {
          let r12 = tA(t11, C3, b2), n4 = Math.abs(r12), a4 = k3[t11], i4 = tj(t11, x2.current ? C3 : 0, e10.length, b2), s4 = w3[t11];
          i4 !== N3[t11] && (N3[t11] = i4, W3 = true, s4 && (s4.pause(), s4.removeAttribute("src"), s4.load(), j2[t11] = false));
          let o4 = l2.current.get(i4), c4 = h2.get() > 0.5 && !!o4 && n4 <= (x2.current ? 78 : 180) && !S2.current && !document.hidden && !u2;
          s4 && (c4 !== j2[t11] || c4 && s4.getAttribute("src") !== o4) && (j2[t11] = c4, c4 ? (s4.getAttribute("src") !== o4 && (s4.src = o4), s4.play().catch(() => {
          })) : s4.pause());
          let d4 = (e11) => B2(`v${t11}`, e11, () => {
            a4.style.visibility = e11;
          });
          if (n4 > 96 && x2.current) {
            d4("hidden");
            continue;
          }
          d4("visible");
          let p3 = (function(e11, t12, r13) {
            let n5 = ((e11 + 180) % 360 + 360) % 360, a5 = n5 / 360, i5 = Math.max(0, Math.min(1, (t12 - 0.7 * a5) / 0.3)), s5 = 1 - (1 - i5) ** 3, l3 = -180 + n5 * s5, o5 = l3 * Math.PI / 180, c5 = r13.radius - (1 - s5) * a5 * 24, u3 = -Math.sin(o5) * c5, d5 = -Math.cos(o5) * c5, h3 = 0 * Math.sin(r13.tilt * Math.PI / 180) + d5 * Math.cos(r13.tilt * Math.PI / 180);
            return { x: u3, y: 0, z: d5, yaw: l3 * r13.orientation, roll: 0, scale: r13.scale, appear: Math.min(1, 2.5 * i5), behindCamera: h3 >= r13.perspective - 70 };
          })(r12, h2.get(), y3);
          if (p3.behindCamera) {
            d4("hidden");
            continue;
          }
          a4.style.transform = `translate3d(${p3.x}px,${p3.y}px,${p3.z}px) rotateY(${p3.yaw}deg) rotateZ(${p3.roll}deg) scale(${p3.scale})`;
          let f5 = y3.perspective * A3 / A3, m3 = p3.z > y3.radius * y3.radius / f5;
          m3 !== ("" === a4.dataset.outside) && (m3 ? a4.dataset.outside = "" : delete a4.dataset.outside);
          let g3 = String(Math.round(1e3 * p3.appear) / 1e3);
          B2(`o${t11}`, g3, () => {
            a4.style.opacity = g3;
          });
        }
        W3 && (_2.current = N3, v2(N3));
      }, () => {
        y2.current = () => {
        }, window.removeEventListener("resize", f3), w3.forEach((e11) => e11?.pause()), document.removeEventListener("visibilitychange", A2), window.removeEventListener("wheel", M2), t10.removeEventListener("pointerdown", P2), t10.removeEventListener("pointerenter", I2), t10.removeEventListener("pointerleave", D2), window.removeEventListener("pointermove", T2), window.removeEventListener("pointerup", O2), window.removeEventListener("pointercancel", O2), window.removeEventListener("touchstart", W2), window.removeEventListener("touchmove", N2), window.removeEventListener("touchend", z2), window.removeEventListener("touchcancel", z2);
      };
    }, [e10, b2, l2, g2, m2, h2, p2, f2]), (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)(rT, { ready: o2.front, total: c2, loading: d2, formation: h2, expansion: p2, skip: f2, onComplete: k2 }), (0, t.jsx)("noscript", { children: (0, t.jsx)("style", { children: `.${e4.default.reelLoader}{display:none}[data-card]{opacity:1!important}` }) }), (0, t.jsx)("div", { ref: i2, "data-entering": "", className: e4.default.wall, "data-hidden": n2 ? "" : void 0, inert: n2, "aria-label": "Avi\u2019s Reel room", role: "region", children: (0, t.jsx)("div", { "data-lens": "", className: e4.default.wallLens, children: (0, t.jsx)("div", { "data-ring": "", className: e4.default.wallCenter, children: w2.map((r10, n3) => (0, t.jsx)(rN, { reel: e10[r10], angle: tA(n3, 0, b2), preventClick: () => s2.current }, n3)) }) }) })] });
  }
  function rW(e10, t10) {
    return Math.abs(e10) >= Math.abs(t10) ? e10 : t10;
  }
  function rN({ reel: e10, angle: r10, preventClick: n2 }) {
    let i2 = tS(0, { stiffness: 180, damping: 24 }), s2 = tS(0, { stiffness: 180, damping: 24 }), l2 = tS(0, { stiffness: 180, damping: 24 }), o2 = () => {
      i2.set(0), s2.set(0), l2.set(0);
    }, c2 = `Watch ${e10.title} on Instagram${e10.views ? `, ${e10.views} views` : ""} (opens in a new tab)`;
    return (0, t.jsxs)("a", { href: e10.href, target: "_blank", rel: "noopener noreferrer", draggable: false, "data-card": "", "data-cursor": "Play", "data-world": e10.world, className: e4.default.card, style: { opacity: 0, transform: `rotateY(${r10}deg) translateZ(-1800px) scale(2.3)`, "--world": u.WORLDS[e10.world].color, "--on": u.WORLDS[e10.world].on }, onDragStart: (e11) => e11.preventDefault(), onClick: (e11) => {
      n2() && e11.preventDefault();
    }, onPointerMove: (e11) => {
      if ("mouse" !== e11.pointerType || (0, u.prefersReducedMotion)()) return;
      let t10 = e11.currentTarget.getBoundingClientRect(), r11 = Math.max(-0.5, Math.min(0.5, (e11.clientX - t10.left) / t10.width - 0.5)), n3 = Math.max(-0.5, Math.min(0.5, (e11.clientY - t10.top) / t10.height - 0.5));
      i2.set(-(20 * n3)), s2.set(24 * r11), l2.set(45);
    }, onPointerLeave: o2, onBlur: o2, children: [!e10.poster && (0, t.jsx)("span", { className: "sr-only", children: c2 }), (0, t.jsxs)(a.motion.span, { className: e4.default.tilt, style: { rotateX: i2, rotateY: s2, z: l2 }, children: [(0, t.jsx)("span", { className: e4.default.frame, "aria-hidden": "true" }), (0, t.jsxs)("span", { className: e4.default.face, children: [e10.poster && (0, t.jsx)(tn.default, { draggable: false, src: e10.poster, alt: c2, fill: true, unoptimized: true, loading: "eager", className: e4.default.reelPoster }), e10.preview && (0, t.jsx)("video", { className: e4.default.reelPreview, "data-preview-src": e10.preview, muted: true, loop: true, playsInline: true, preload: "none", "aria-hidden": "true", tabIndex: -1 }), e10.views && (0, t.jsx)("span", { className: e4.default.views, "aria-hidden": "true", children: e10.views }), (0, t.jsxs)("span", { className: e4.default.cardLabel, "aria-hidden": "true", children: [(0, t.jsx)("b", { children: u.WORLDS[e10.world].label }), (0, t.jsx)("span", { children: e10.title }), (0, t.jsx)("i", { children: "\u2197" })] })] })] })] });
  }
  var rz = e.i(5166);
  let rO = 128 / 270, rI = (e10, t10 = 0, r10 = 1) => Math.min(r10, Math.max(t10, e10)), rD = (e10) => Math.round(100 * e10) / 100;
  function rH({ reels: e10, hidden: n2, priority: a2 }) {
    let i2 = (0, r.useRef)(null), { sources: s2, progress: l2, frontCount: o2, loading: c2 } = tL(e10, a2), d2 = to(0), h2 = to(0), p2 = to(0), f2 = (0, r.useRef)(false), m2 = (0, r.useCallback)(() => {
      f2.current = true;
    }, []), g2 = (0, r.useRef)(n2);
    (0, r.useEffect)(() => {
      g2.current = n2;
    }, [n2]);
    let x2 = e10.slice(0, 34);
    return (0, r.useEffect)(() => {
      let e11 = i2.current, t10 = e11.querySelector("[data-scene]"), r10 = Array.from(e11.querySelectorAll("[data-card]")), n3 = r10.map((e12) => e12.querySelector("video")), a3 = r10.map(() => false), l3 = matchMedia("(prefers-reduced-motion: reduce)"), o3 = 360 / r10.length, c3 = 0, u2 = 0, p3 = 0, m3 = performance.now(), x3 = 0, k2 = false, y2 = null, b2 = null, w2 = /* @__PURE__ */ new Map(), v2 = (e12, t11, r11) => {
        w2.get(e12) !== t11 && (w2.set(e12, t11), r11());
      }, _2 = (i3) => {
        let k3 = Math.min(0.05, (i3 - m3) / 1e3);
        m3 = i3;
        let w3 = d2.get(), S3 = h2.get(), j3 = l3.matches;
        f2.current && v2("entering", "done", () => e11.removeAttribute("data-entering")), y2 || b2 || j3 || g2.current || (c3 += 7 * S3 * k3), !y2 && p3 && (c3 += p3 * k3, 1 > Math.abs(p3 *= Math.exp(-(3.2 * k3))) && (p3 = 0)), u2 += (c3 - u2) * (1 - Math.exp(-(9 * k3))), j3 && (u2 = c3), v2("scene", `${rD(S3)} ${e11.clientWidth} ${e11.clientHeight}`, () => {
          t10.style.transform = `translateY(${rD(60 - 10 * S3)}px) rotateX(${rD(12 * S3)}deg) scale(${rD(rI(Math.min(e11.clientWidth / 1250, e11.clientHeight / 760), 0.4, 1.1) * (1 + 0.14 * S3))})`;
        });
        let A3 = 580 + 430 * S3, E3 = 500 + 314 * S3, R3 = 1 + 0.35 * S3, $3 = -28 * S3;
        r10.forEach((e12, t11) => {
          let r11, i4 = ((t11 * o3 - u2 + $3 + 180) % 360 + 360) % 360 - 180, l4 = Math.abs(i4), c4 = Math.min(l4, 100) / 100, d3 = 1 - (1 - rI((w3 - (r11 = 0.6 * c4)) / (0.6 * c4 + 0.4 - r11))) ** 3, h3 = d3 > 0 && l4 < 105;
          v2(`v${t11}`, h3 ? "visible" : "hidden", () => {
            e12.style.visibility = h3 ? "visible" : "hidden";
          });
          let p4 = s2.current.get(t11), f3 = h3 && S3 > 0.6 && l4 < 40 && !!p4 && !g2.current && !document.hidden && !j3;
          if (f3 !== a3[t11]) {
            a3[t11] = f3;
            let e13 = n3[t11];
            f3 ? (e13.getAttribute("src") !== p4 && (e13.src = p4), e13.play().catch(() => {
            })) : e13.pause();
          }
          if (!h3) return;
          let m4 = `translate3d(0,${rD(E3)}px,${rD(-(0.5 * l4))}px) rotateZ(${rD(i4 * d3)}deg) translate3d(0,${rD(-A3 * d3 + (1 - d3) * 140)}px,0) rotateY(${rD((1 - d3) * 180)}deg) scale(${rD((0.7 + 0.3 * d3) * R3 * rO)})`;
          v2(`t${t11}`, m4, () => {
            e12.style.transform = m4;
          });
          let x4 = String(rD(rI(5 * d3)));
          v2(`o${t11}`, x4, () => {
            e12.style.opacity = x4;
          });
        }), x3 = requestAnimationFrame(_2);
      };
      x3 = requestAnimationFrame(_2);
      let S2 = (e12, t11 = "") => {
        let r11 = e12 instanceof Element ? e12 : null;
        return !!r11?.closest(`input, textarea, select, [role="dialog"], [role="log"], [data-lenis-prevent], [aria-label="Conversation with Avi\u2019s AI"]${t11}`);
      }, j2 = (e12) => {
        if (g2.current || e12.ctrlKey || e12.metaKey || S2(e12.target) || (e12.preventDefault(), !f2.current)) return;
        let t11 = 1 === e12.deltaMode ? 16 : 2 === e12.deltaMode ? innerHeight : 1, r11 = (Math.abs(e12.deltaY) >= Math.abs(e12.deltaX) ? e12.deltaY : e12.deltaX) * t11;
        c3 += 0.12 * rI(r11, -240, 240), window.dispatchEvent(new CustomEvent("home:carousel", { detail: { amount: Math.min(1, Math.abs(r11) / 120), x: e12.clientX } }));
      }, A2 = (t11) => {
        0 === t11.button && !g2.current && f2.current && "mouse" === t11.pointerType && (y2 = { x: t11.clientX, from: c3, lastX: t11.clientX, lastT: t11.timeStamp, moved: false }, p3 = 0, e11.style.cursor = "grabbing");
      }, E2 = (e12) => {
        if (!y2) return;
        Math.abs(e12.clientX - y2.x) > 4 && (y2.moved = true), c3 = y2.from - (e12.clientX - y2.x) * 0.3;
        let t11 = Math.max(1, e12.timeStamp - y2.lastT) / 1e3;
        p3 = 0.6 * p3 + -(0.3 * (e12.clientX - y2.lastX)) / t11 * 0.4, y2.lastX = e12.clientX, y2.lastT = e12.timeStamp;
      }, R2 = (t11) => {
        y2 && (p3 = t11.timeStamp - y2.lastT > 80 ? 0 : rI(p3, -600, 600), k2 = y2.moved, y2 = null, e11.style.cursor = "", setTimeout(() => {
          k2 = false;
        }, 50));
      }, $2 = (e12) => {
        k2 && e12.preventDefault();
      }, L2 = (e12) => {
        b2 = null, 1 !== e12.touches.length || g2.current || !f2.current || S2(e12.target) || (b2 = { x: e12.touches[0].clientX, y: e12.touches[0].clientY, from: c3 });
      }, M2 = (e12) => {
        if (!b2 || 1 !== e12.touches.length) return;
        let t11 = e12.touches[0].clientX - b2.x, r11 = e12.touches[0].clientY - b2.y;
        c3 = b2.from - (Math.abs(t11) >= Math.abs(r11) ? t11 : r11) * 0.3;
      }, P2 = () => {
        b2 = null;
      }, T2 = () => {
        document.hidden && (n3.forEach((e12) => e12.pause()), a3.fill(false));
      };
      return addEventListener("wheel", j2, { passive: false }), e11.addEventListener("pointerdown", A2), e11.addEventListener("click", $2, true), addEventListener("pointermove", E2), addEventListener("pointerup", R2), addEventListener("pointercancel", R2), addEventListener("touchstart", L2, { passive: true }), addEventListener("touchmove", M2, { passive: true }), addEventListener("touchend", P2), document.addEventListener("visibilitychange", T2), () => {
        cancelAnimationFrame(x3), n3.forEach((e12) => e12.pause()), removeEventListener("wheel", j2), e11.removeEventListener("pointerdown", A2), e11.removeEventListener("click", $2, true), removeEventListener("pointermove", E2), removeEventListener("pointerup", R2), removeEventListener("pointercancel", R2), removeEventListener("touchstart", L2), removeEventListener("touchmove", M2), removeEventListener("touchend", P2), document.removeEventListener("visibilitychange", T2);
      };
    }, [s2, d2, h2]), (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)(rT, { ready: l2.front, total: o2, loading: c2, formation: d2, expansion: h2, skip: p2, onComplete: m2 }), (0, t.jsx)("noscript", { children: (0, t.jsx)("style", { children: `.${e4.default.reelLoader}{display:none}[data-card]{opacity:1!important}` }) }), (0, t.jsx)("div", { ref: i2, "data-entering": "", className: `${e4.default.wall} ${rz.default.wall}`, "data-hidden": n2 ? "" : void 0, inert: n2, "aria-label": "Avi\u2019s Reel room", role: "region", children: (0, t.jsx)("div", { className: rz.default.camera, children: (0, t.jsx)("div", { "data-scene": "", className: rz.default.scene, children: x2.map((e11, r10) => {
      let n3 = `Watch ${e11.title} on Instagram${e11.views ? `, ${e11.views} views` : ""} (opens in a new tab)`;
      return (0, t.jsx)("a", { href: e11.href, target: "_blank", rel: "noopener noreferrer", draggable: false, "data-card": "", "data-cursor": "Play", "data-world": e11.world, className: `${e4.default.card} ${rz.default.card}`, style: { opacity: 0, visibility: "hidden", "--world": u.WORLDS[e11.world].color, "--on": u.WORLDS[e11.world].on }, onDragStart: (e12) => e12.preventDefault(), children: (0, t.jsxs)("span", { className: e4.default.tilt, children: [(0, t.jsx)("span", { className: e4.default.frame, "aria-hidden": "true" }), (0, t.jsxs)("span", { className: e4.default.face, children: [e11.poster && (0, t.jsx)("img", { className: rz.default.poster, src: e11.poster, alt: n3, draggable: false }), e11.preview && (0, t.jsx)("video", { className: `${e4.default.reelPreview} ${rz.default.preview}`, muted: true, loop: true, playsInline: true, preload: "none", "aria-hidden": "true", tabIndex: -1, onPlaying: (e12) => e12.currentTarget.setAttribute("data-playing", "") }), e11.views && (0, t.jsx)("span", { className: e4.default.views, "aria-hidden": "true", children: e11.views }), (0, t.jsxs)("span", { className: e4.default.cardLabel, "aria-hidden": "true", children: [(0, t.jsx)("b", { children: u.WORLDS[e11.world].label }), (0, t.jsx)("span", { children: e11.title }), (0, t.jsx)("i", { children: "\u2197" })] })] }), (0, t.jsx)("span", { className: rz.default.back, "aria-hidden": "true", children: "A." })] }) }, r10);
    }) }) }) })] });
  }
  var rB = e.i(18566), rV = e.i(74080), rq = e.i(46698), rF = e.i(19657);
  let rX = [0.22, 1, 0.36, 1], rZ = "(hover: hover) and (pointer: fine)", rY = (e10) => {
    let t10 = matchMedia(rZ);
    return t10.addEventListener("change", e10), () => t10.removeEventListener("change", e10);
  }, rG = { tech: "Fullstack at Dock \xB7 Two YC startups \xB7 Founding engineer, Turgon AI", studio: `${rF.default.totalViews} views \xB7 Replit, Higgsfield, Tripo AI, Huggle AI`, learn: `${rF.default.blog.visitors2026} readers in 2026 \xB7 Free, always` };
  function rU({ ready: e10, immediate: n2, hidden: i2, featured: s2 }) {
    let o2 = (0, rB.useRouter)(), [c2, d2] = (0, r.useState)(null), h2 = i2 ? null : c2, p2 = (0, r.useSyncExternalStore)(rY, () => matchMedia(rZ).matches, () => false), f2 = to(0), m2 = to(0), g2 = tS(f2, { stiffness: 260, damping: 28, mass: 0.6 }), x2 = tS(m2, { stiffness: 260, damping: 28, mass: 0.6 }), k2 = 0;
    (0, r.useEffect)(() => {
      i2 && (0, u.setWorldState)({ preview: null });
    }, [i2]);
    let y2 = (e11) => {
      d2(e11), (0, u.setWorldState)({ preview: e11 && "ai" !== e11 ? e11 : null });
    }, b2 = (0, r.useRef)(null), w2 = (e11, t10, r10 = false) => {
      t10 = Math.min(t10, (b2.current?.getBoundingClientRect().top ?? t10) + 12), f2.set(e11), m2.set(t10), r10 && (g2.jump(e11), x2.jump(t10));
    }, v2 = (r10) => r10.split(/(\s+)/).map((r11, a2) => r11.trim() ? (0, t.jsx)(rK, { index: k2++, ready: e10, immediate: n2, children: r11 }, a2) : r11), _2 = (r10, i3, s3) => {
      let c3 = "ai" === r10 ? "var(--color-ink)" : u.WORLDS[r10].color, d3 = "ai" === r10 ? "var(--color-paper)" : u.WORLDS[r10].on, p3 = { className: e4.default.choice, "data-active": h2 === r10 ? "" : void 0, style: { "--world": c3, "--on": d3 }, onPointerEnter: (e11) => {
        "mouse" === e11.pointerType && (w2(e11.clientX, e11.clientY, null === h2), y2(r10));
      }, onPointerMove: (e11) => {
        "mouse" === e11.pointerType && w2(e11.clientX, e11.clientY);
      }, onPointerLeave: () => y2(null), onFocus: (e11) => {
        if (!e11.currentTarget.matches(":focus-visible")) return;
        let t10 = e11.currentTarget.getBoundingClientRect();
        w2(t10.left + t10.width / 2, t10.top, true), y2(r10);
      }, onBlur: () => y2(null) }, f3 = (0, t.jsxs)(t.Fragment, { children: [(0, t.jsxs)("span", { className: e4.default.choiceLabel, children: [(0, t.jsx)("span", { className: e4.default.marker, "aria-hidden": "true" }), i3.split(" ").map((r11, a2) => (0, t.jsxs)("span", { children: [a2 > 0 && " ", (0, t.jsx)(rK, { index: k2++, ready: e10, immediate: n2, children: r11 })] }, a2)), (0, t.jsx)(a.motion.span, { className: e4.default.underline, "aria-hidden": "true", initial: { scaleX: 0 }, animate: { scaleX: +!!e10 }, transition: { duration: 0.7 * !n2, delay: n2 ? 0 : 0.9 + 0.08 * Number(s3), ease: rX } })] }), (0, t.jsx)(a.motion.sup, { "aria-hidden": "true", initial: { opacity: 0 }, animate: { opacity: +!!e10 }, transition: { duration: 0.5 * !n2, delay: n2 ? 0 : 1 + 0.08 * Number(s3) }, children: s3 })] });
      return "ai" === r10 ? (0, t.jsx)("button", { type: "button", "data-ai-link": "", ...p3, onClick: () => {
        y2(null), window.dispatchEvent(new Event("home:chat"));
      }, children: f3 }) : (0, t.jsx)(l.default, { href: u.WORLDS[r10].href, ...p3, onNavigate: (e11) => {
        e11.preventDefault(), (0, rq.openWorld)(r10, (e12) => o2.push(e12));
      }, children: f3 });
    };
    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsxs)("h1", { ref: b2, id: "home-heading", className: e4.default.sentence, "data-hovering": h2 ? "" : void 0, "aria-hidden": i2 || void 0, children: [v2("I build products for"), " ", (0, t.jsxs)("span", { className: e4.default.nowrap, children: [_2("tech", "founders", "01"), v2(",")] }), " ", v2("campaigns for"), " ", _2("studio", "brands", "02"), " ", v2("and free roadmaps for"), " ", (0, t.jsxs)("span", { className: e4.default.nowrap, children: [_2("learn", "students", "03"), v2(".")] }), " ", v2("Or just"), " ", (0, t.jsxs)("span", { className: e4.default.nowrap, children: [_2("ai", "talk to my AI", "04"), v2(".")] })] }), p2 && (0, rV.createPortal)((0, t.jsx)(a.motion.div, { className: e4.default.previewAnchor, style: { x: g2, y: x2 }, "aria-hidden": "true", children: (0, t.jsx)(rQ, { active: h2, featured: s2 }) }), document.body)] });
  }
  function rQ({ active: e10, featured: n2 }) {
    let i2 = (0, r.useRef)({}), [s2, l2] = (0, r.useState)("tech");
    e10 && e10 !== s2 && l2(e10), (0, r.useEffect)(() => {
      for (let t10 of u.WORLD_IDS) {
        let r10 = i2.current[t10];
        r10 && (e10 === t10 ? (r10.currentTime = 0, r10.play().catch(() => {
        })) : r10.pause());
      }
    }, [e10]);
    let o2 = "ai" === s2 ? "#1a1a1c" : u.WORLDS[s2].color;
    return (0, t.jsxs)(a.motion.div, { className: e4.default.preview, "data-ai": "ai" === s2 ? "" : void 0, style: { "--world": o2 }, initial: false, animate: e10 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }, transition: e10 ? { duration: 0.35, ease: rX } : { duration: 0.18 }, children: [(0, t.jsxs)("div", { className: e4.default.previewMedia, hidden: "ai" === s2, children: [u.WORLD_IDS.map((e11) => n2[e11]?.preview && (0, t.jsx)("video", { ref: (t10) => {
      i2.current[e11] = t10;
    }, src: n2[e11].preview, poster: n2[e11].poster, muted: true, loop: true, playsInline: true, preload: "auto", "data-on": s2 === e11 ? "" : void 0 }, e11)), "ai" !== s2 && n2[s2]?.views && (0, t.jsx)("span", { className: e4.default.views, children: n2[s2].views })] }), "ai" === s2 ? (0, t.jsxs)(t.Fragment, { children: [(0, t.jsxs)("p", { className: e4.default.previewAsk, children: ["What are you working on?", (0, t.jsx)("span", { className: e4.default.caret })] }), (0, t.jsx)("p", { className: e4.default.previewMeta, children: "Avi\u2019s AI \xB7 ask about a build, a brand collab or where to start learning" })] }) : (0, t.jsxs)("p", { className: e4.default.previewMeta, children: [(0, t.jsxs)("b", { children: [(0, t.jsx)("i", {}), u.WORLDS[s2].label] }), " ", rG[s2]] })] });
  }
  function rK({ children: e10, index: r10, ready: n2, immediate: i2 }) {
    return (0, t.jsx)("span", { className: e4.default.wordMask, children: (0, t.jsx)(a.motion.span, { initial: { y: "110%" }, animate: { y: n2 ? "0%" : "110%" }, transition: { duration: 0.8 * !i2, delay: i2 ? 0 : 0.05 + 0.035 * r10, ease: rX }, children: e10 }) });
  }
  let rJ = "var(--color-studio)", r0 = "var(--color-learn)", r1 = [[4, 14, 9, 29, 0, rJ, "back"], [14, 4, 7, 34, -12, r0, "back"], [24, 26, 8, 31, -21, rJ, "back"], [36, 10, 6, 37, -5, r0, "back"], [46, 30, 9, 27, -16, rJ, "back"], [56, 6, 7, 33, -27, r0, "back"], [66, 20, 8, 30, -9, rJ, "back"], [76, 2, 6, 36, -24, r0, "back"], [86, 24, 9, 28, -3, rJ, "back"], [94, 12, 7, 35, -18, r0, "back"], [30, 44, 6, 39, -31, rJ, "back"], [60, 40, 7, 32, -13, r0, "back"], [10, 50, 14, 23, -6, r0, "front"], [40, 62, 12, 26, -19, rJ, "front"], [70, 56, 16, 21, -11, rJ, "front"], [88, 46, 13, 24, -2, r0, "front"], [52, 70, 11, 28, -23, r0, "front"]], r2 = [[8, 62, 10, 14, -2], [18, 40, 6, 18, -9], [27, 70, 14, 16, -5], [36, 52, 8, 20, -13], [44, 30, 5, 17, -3], [53, 66, 12, 15, -11], [61, 44, 7, 19, -7], [69, 74, 16, 14, -1], [77, 36, 6, 21, -15], [85, 58, 11, 16, -8], [92, 46, 7, 18, -4], [13, 82, 9, 22, -17], [48, 84, 13, 17, -6], [72, 22, 5, 23, -19]], r6 = () => () => {
  };
  function r3() {
    return (0, r.useSyncExternalStore)(r6, () => true, () => false);
  }
  function r4({ pointer: e10 }) {
    return (0, t.jsxs)("div", { className: e4.default.worldView, "aria-hidden": "true", children: [(0, t.jsx)(r8, { className: e4.default.skyLayer, pointer: e10, depth: 10, children: (0, t.jsx)(tn.default, { src: "/home/sky-light.webp", alt: "A hand-painted sky at golden hour", fill: true, sizes: "105vw", priority: true }) }), (0, t.jsx)(r9, { layer: "back", pointer: e10, depth: 22 })] });
  }
  function r5({ pointer: e10 }) {
    let r10 = r3();
    return (0, t.jsxs)("div", { className: `${e4.default.worldView} ${e4.default.worldFront}`, "aria-hidden": "true", children: [(0, t.jsx)(r8, { className: `${e4.default.cloudLayer} ${e4.default.cloudRise}`, pointer: e10, depth: 34, children: (0, t.jsx)(tn.default, { src: "/home/clouds-front-light.webp", alt: "A bank of painted clouds", fill: true, sizes: "110vw", priority: true }) }), (0, t.jsx)(r9, { layer: "front", pointer: e10, depth: 48 }), (0, t.jsx)(r8, { className: e4.default.motes, pointer: e10, depth: 40, children: r10 && r2.map(([e11, r11, n2, a2, i2], s2) => (0, t.jsx)("span", { className: e4.default.mote, style: { left: `${e11}%`, top: `${r11}%`, width: n2, height: n2, animationDuration: `${a2}s`, animationDelay: `${i2}s` } }, s2)) })] });
  }
  function r8({ className: e10, pointer: r10, depth: n2, children: i2 }) {
    let s2 = tv(r10.x, (e11) => -(e11 * n2)), l2 = tv(r10.y, (e11) => -(e11 * n2 * 0.5));
    return (0, t.jsx)(a.motion.div, { className: e10, style: { x: s2, y: l2 }, children: i2 });
  }
  function r9({ layer: e10, pointer: r10, depth: n2 }) {
    let a2 = r3();
    return (0, t.jsx)(r8, { className: "back" === e10 ? e4.default.petalsBack : e4.default.petalsFront, pointer: r10, depth: n2, children: a2 && r1.filter((t10) => t10[6] === e10).map(([e11, r11, n3, a3, i2, s2], l2) => (0, t.jsx)("span", { className: e4.default.petal, "data-flip": l2 % 3 == 0 ? "" : void 0, style: { left: `${e11}%`, top: `${r11}%`, width: n3, height: 0.62 * n3, background: s2, animationDuration: `${a3}s`, animationDelay: `${i2}s` } }, l2)) });
  }
  let r7 = [["Views", rF.default.totalViews], ["Followers", rF.default.instagram.followers], ["Readers", rF.default.blog.visitors2026]];
  function ne({ ready: e10, immediate: r10 }) {
    return (0, t.jsx)("dl", { className: e4.default.meta, children: r7.map(([n2, a2], i2) => (0, t.jsxs)("div", { children: [(0, t.jsx)("dt", { children: n2 }), (0, t.jsx)("dd", { children: (0, t.jsx)(nt, { value: a2, run: e10, delay: r10 ? 0 : 0.8 + 0.1 * i2, instant: r10 }) })] }, n2)) });
  }
  function nt({ value: e10, run: n2, delay: a2, instant: i2 }) {
    let s2 = (0, r.useRef)(null), [, l2, o2] = e10.match(/^([\d.]+)(.*)$/) ?? [, "", e10], c2 = Number(l2), u2 = +!!l2.includes(".");
    return (0, r.useEffect)(() => {
      let t10 = s2.current;
      if (!t10 || !n2 || !l2) return;
      if (i2 || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        t10.textContent = e10;
        return;
      }
      t10.textContent = `0${o2}`;
      let r10 = rR(0, c2, { duration: 1.6, delay: a2, ease: [0.22, 1, 0.36, 1], onUpdate: (e11) => {
        t10.textContent = `${e11.toFixed(u2)}${o2}`;
      } });
      return () => r10.stop();
    }, [n2, i2, a2, e10, l2, o2, c2, u2]), (0, t.jsx)("span", { ref: s2, children: e10 });
  }
  e.s(["HomeStage", 0, function({ reels: e10, wall: l2 = "ring" }) {
    let o2, c2, d2, h2, p2 = (0, i.useHomeEntrance)(), f2 = (0, i.entranceIsImmediate)(), m2 = (0, s.useHomeMode)(), g2 = (0, r.useRef)(null), x2 = (0, r.useRef)(null), k2 = (o2 = to(0), c2 = to(0), d2 = tS(o2, { stiffness: 40, damping: 18, mass: 1 }), h2 = tS(c2, { stiffness: 40, damping: 18, mass: 1 }), (0, r.useEffect)(() => {
      let e11 = matchMedia("(hover: hover) and (pointer: fine)"), t10 = matchMedia("(prefers-reduced-motion: reduce)"), r10 = (r11) => {
        e11.matches && !t10.matches && (o2.set(r11.clientX / innerWidth * 2 - 1), c2.set(r11.clientY / innerHeight * 2 - 1));
      };
      return addEventListener("pointermove", r10, { passive: true }), () => removeEventListener("pointermove", r10);
    }, [o2, c2]), { x: d2, y: h2 }), [y2, b2] = (0, r.useState)(false);
    (0, r.useEffect)(() => {
      let e11 = () => b2(true);
      return addEventListener("home:reveal", e11), () => removeEventListener("home:reveal", e11);
    }, []), (0, r.useLayoutEffect)(() => {
      let e11 = x2.current, t10 = () => {
        let t11 = e11.getBoundingClientRect();
        e11.style.setProperty("--ft", `${t11.top + scrollY}px`), e11.style.setProperty("--fl", `${t11.left}px`), e11.style.setProperty("--fr", `${innerWidth - t11.right}px`), e11.style.setProperty("--fb", `${innerHeight - t11.bottom - scrollY}px`);
        let r11 = g2.current;
        r11?.style.setProperty("--frame-top", `${e11.offsetTop}px`), r11?.style.setProperty("--frame-h", `${t11.height}px`), r11?.style.setProperty("--frame-x", `${t11.left}px`);
      };
      t10();
      let r10 = new ResizeObserver(t10);
      return r10.observe(e11), addEventListener("resize", t10), () => {
        r10.disconnect(), removeEventListener("resize", t10);
      };
    }, []);
    let [w2, v2] = (0, r.useState)(false), { preview: _2, chosen: S2 } = (0, u.useWorldState)(), j2 = "agent" === m2, A2 = (0, r.useMemo)(() => Object.fromEntries(u.WORLD_IDS.map((t10) => [t10, e10.find((e11) => e11.world === t10)])), [e10]), E2 = (0, r.useMemo)(() => u.WORLD_IDS.map((t10) => e10.findIndex((e11) => e11.world === t10)).filter((e11) => e11 >= 0), [e10]);
    return (0, r.useEffect)(() => {
      let e11 = window.visualViewport, t10 = () => g2.current?.style.setProperty("--chat-viewport", `${e11?.height ?? window.innerHeight}px`);
      return t10(), e11?.addEventListener("resize", t10), () => e11?.removeEventListener("resize", t10);
    }, []), (0, t.jsxs)("section", { ref: g2, "data-stage": "", className: e4.default.stage, "data-chatting": w2 ? "" : void 0, "data-agent": j2 ? "" : void 0, "data-focus": _2 ?? S2 ?? void 0, "data-wall": "deal" === l2 ? "deal" : void 0, "aria-labelledby": "home-heading", children: [(0, t.jsxs)("div", { ref: x2, className: e4.default.worldFrame, "data-open": p2 ? void 0 : "", "data-revealed": y2 || p2 ? "" : void 0, "data-entering": p2 ? void 0 : "", "data-immediate": f2 ? "" : void 0, children: [(0, t.jsx)(r4, { pointer: k2 }), (0, t.jsx)("div", { className: `${e4.default.wallWrap} ${e4.default.fade}`, children: "deal" === l2 ? (0, t.jsx)(rH, { reels: e10, hidden: w2 || j2, priority: E2 }, e10.length) : (0, t.jsx)(rC, { reels: e10, hidden: w2 || j2, priority: E2 }, e10.length) }), (0, t.jsx)(r5, { pointer: k2 })] }), (0, t.jsxs)(a.motion.div, { className: e4.default.below, inert: w2 || j2, initial: { opacity: 0 }, animate: { opacity: !p2 || w2 || j2 ? 0 : 1, y: w2 || j2 ? -24 : 0 }, transition: { duration: 0.55 * !f2, ease: [0.22, 1, 0.36, 1] }, children: [(0, t.jsx)("div", { className: e4.default.sentenceWrap, children: (0, t.jsx)(rU, { ready: p2, immediate: f2, hidden: w2 || j2, featured: A2 }) }), (0, t.jsx)(a.motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: +!!p2, y: 8 * !p2 }, transition: { duration: 0.6 * !f2, delay: 0.7 * !f2, ease: [0.22, 1, 0.36, 1] }, children: (0, t.jsx)(ne, { ready: p2, immediate: f2 }) })] }), (0, t.jsx)(a.motion.div, { className: e4.default.agent, inert: j2, initial: { opacity: 0, y: 18, visibility: "hidden" }, animate: { visibility: p2 && !j2 ? "visible" : "hidden", opacity: p2 && !j2 ? 1 : 0, y: p2 && !j2 ? 0 : 18 }, transition: { duration: 0.7 * !f2, delay: f2 || j2 ? 0 : 0.35 }, children: (0, t.jsx)(tt, { onActive: v2 }) }), (0, t.jsx)(n.AnimatePresence, { children: j2 && (0, t.jsx)(tr.AgentPage, {}, "agent") }), (0, t.jsx)("noscript", { children: (0, t.jsx)("style", { children: `.site-header,.${e4.default.agent}{opacity:1!important;transform:none!important;visibility:visible!important}.${e4.default.wordMask}>span{transform:none!important}.${e4.default.underline}{transform:none!important}` }) })] });
  }], 56072);
}, 5166, (e) => {
  e.v({ back: "deal-module__AxvHEa__back", camera: "deal-module__AxvHEa__camera", card: "deal-module__AxvHEa__card", poster: "deal-module__AxvHEa__poster", preview: "deal-module__AxvHEa__preview", scene: "deal-module__AxvHEa__scene", wall: "deal-module__AxvHEa__wall" });
}, 56397, (e) => {
  e.v({ agent: "home-module__06co2W__agent", below: "home-module__06co2W__below", blink: "home-module__06co2W__blink", card: "home-module__06co2W__card", cardLabel: "home-module__06co2W__cardLabel", caret: "home-module__06co2W__caret", choice: "home-module__06co2W__choice", choiceLabel: "home-module__06co2W__choiceLabel", cloudLayer: "home-module__06co2W__cloudLayer", cloudRise: "home-module__06co2W__cloudRise", face: "home-module__06co2W__face", fade: "home-module__06co2W__fade", frame: "home-module__06co2W__frame", loaderBrand: "home-module__06co2W__loaderBrand", loaderCaption: "home-module__06co2W__loaderCaption", loaderCount: "home-module__06co2W__loaderCount", loaderMask: "home-module__06co2W__loaderMask", loaderPercent: "home-module__06co2W__loaderPercent", loaderStatus: "home-module__06co2W__loaderStatus", marker: "home-module__06co2W__marker", meta: "home-module__06co2W__meta", mote: "home-module__06co2W__mote", moteRise: "home-module__06co2W__moteRise", motes: "home-module__06co2W__motes", nowrap: "home-module__06co2W__nowrap", odometer: "home-module__06co2W__odometer", odometerDigit: "home-module__06co2W__odometerDigit", petal: "home-module__06co2W__petal", petalDrift: "home-module__06co2W__petalDrift", petalDriftBack: "home-module__06co2W__petalDriftBack", petalsBack: "home-module__06co2W__petalsBack", petalsFront: "home-module__06co2W__petalsFront", preview: "home-module__06co2W__preview", previewAnchor: "home-module__06co2W__previewAnchor", previewAsk: "home-module__06co2W__previewAsk", previewMedia: "home-module__06co2W__previewMedia", previewMeta: "home-module__06co2W__previewMeta", reelLoader: "home-module__06co2W__reelLoader", reelPoster: "home-module__06co2W__reelPoster", reelPreview: "home-module__06co2W__reelPreview", sentence: "home-module__06co2W__sentence", sentenceWrap: "home-module__06co2W__sentenceWrap", skyGrain: "home-module__06co2W__skyGrain", skyLayer: "home-module__06co2W__skyLayer", stage: "home-module__06co2W__stage", tilt: "home-module__06co2W__tilt", underline: "home-module__06co2W__underline", views: "home-module__06co2W__views", wall: "home-module__06co2W__wall", wallCenter: "home-module__06co2W__wallCenter", wallLens: "home-module__06co2W__wallLens", wallWrap: "home-module__06co2W__wallWrap", wordMask: "home-module__06co2W__wordMask", worldFrame: "home-module__06co2W__worldFrame", worldFront: "home-module__06co2W__worldFront", worldView: "home-module__06co2W__worldView" });
}]);
