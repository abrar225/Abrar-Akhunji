(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 28298, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "useRouterBFCache", { enumerable: true, get: function() {
    return l;
  } });
  let n = e.r(71645);
  function l(e2, t2, r2) {
    let [l2, u] = (0, n.useState)(() => ({ tree: e2, cacheNode: t2, stateKey: r2, next: null }));
    if (l2.tree === e2) return l2;
    let a = { tree: e2, cacheNode: t2, stateKey: r2, next: null }, o = 1, d = l2, s = a;
    for (; null !== d && o < 1; ) {
      if (d.stateKey === r2) {
        s.next = d.next;
        break;
      }
      {
        o++;
        let e3 = { tree: d.tree, cacheNode: d.cacheNode, stateKey: d.stateKey, next: null };
        s.next = e3, s = e3;
      }
      d = d.next;
    }
    return u(a), a;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 47257, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ClientPageRoot", { enumerable: true, get: function() {
    return s;
  } });
  let n = e.r(43476), l = e.r(8372), u = e.r(71645), a = e.r(33906), o = e.r(61994), d = e.r(42903);
  function s({ Component: e2, serverProvidedParams: t2 }) {
    let r2, i;
    if (null !== t2) r2 = t2.searchParams, i = t2.params;
    else {
      let e3 = (0, u.use)(l.LayoutRouterContext);
      i = null !== e3 ? e3.parentParams : {}, r2 = (0, a.urlSearchParamsToParsedUrlQuery)((0, u.use)(o.SearchParamsContext));
    }
    let c = (0, d.createClientSearchParams)(r2), f = (0, d.createClientParams)(i);
    return (0, n.jsx)(e2, { params: f, searchParams: c });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 92825, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ClientSegmentRoot", { enumerable: true, get: function() {
    return o;
  } });
  let n = e.r(43476), l = e.r(8372), u = e.r(71645), a = e.r(42903);
  function o({ Component: e2, slots: t2, serverProvidedParams: r2 }) {
    let d;
    if (null !== r2) d = r2.params;
    else {
      let e3 = (0, u.use)(l.LayoutRouterContext);
      d = null !== e3 ? e3.parentParams : {};
    }
    let s = (0, a.createClientParams)(d);
    return (0, n.jsx)(e2, { ...t2, params: s });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 68017, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "HTTPAccessFallbackBoundary", { enumerable: true, get: function() {
    return i;
  } });
  let n = e.r(90809), l = e.r(43476), u = n._(e.r(71645)), a = e.r(90373), o = e.r(54394), d = e.r(8372);
  class s extends u.default.Component {
    constructor(e2) {
      super(e2), this.state = { triggeredStatus: void 0, previousPathname: e2.pathname };
    }
    componentDidCatch() {
    }
    static getDerivedStateFromError(e2) {
      if ((0, o.isHTTPAccessFallbackError)(e2)) return { triggeredStatus: (0, o.getAccessFallbackHTTPStatus)(e2) };
      throw e2;
    }
    static getDerivedStateFromProps(e2, t2) {
      return e2.pathname !== t2.previousPathname && t2.triggeredStatus ? { triggeredStatus: void 0, previousPathname: e2.pathname } : { triggeredStatus: t2.triggeredStatus, previousPathname: e2.pathname };
    }
    render() {
      let { notFound: e2, forbidden: t2, unauthorized: r2, children: n2 } = this.props, { triggeredStatus: u2 } = this.state, a2 = { [o.HTTPAccessErrorStatus.NOT_FOUND]: e2, [o.HTTPAccessErrorStatus.FORBIDDEN]: t2, [o.HTTPAccessErrorStatus.UNAUTHORIZED]: r2 };
      if (u2) {
        let d2 = u2 === o.HTTPAccessErrorStatus.NOT_FOUND && e2, s2 = u2 === o.HTTPAccessErrorStatus.FORBIDDEN && t2, i2 = u2 === o.HTTPAccessErrorStatus.UNAUTHORIZED && r2;
        return d2 || s2 || i2 ? (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("meta", { name: "robots", content: "noindex" }), false, a2[u2]] }) : n2;
      }
      return n2;
    }
  }
  function i({ notFound: e2, forbidden: t2, unauthorized: r2, children: n2 }) {
    let o2 = (0, a.useUntrackedPathname)(), c = (0, u.useContext)(d.MissingSlotContext);
    return e2 || t2 || r2 ? (0, l.jsx)(s, { pathname: o2, notFound: e2, forbidden: t2, unauthorized: r2, missingSlots: c, children: n2 }) : (0, l.jsx)(l.Fragment, { children: n2 });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 22976, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { InstantValidationBoundaryContext: function() {
    return u;
  }, PlaceValidationBoundaryBelowThisLevel: function() {
    return a;
  }, RenderValidationBoundaryAtThisLevel: function() {
    return o;
  }, SlotMarker: function() {
    return d;
  } };
  for (var l in n) Object.defineProperty(r, l, { enumerable: true, get: n[l] });
  let u = null, a = null, o = null, d = null;
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 77694, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { InstantValidationBoundaryContext: function() {
    return u.InstantValidationBoundaryContext;
  }, PlaceValidationBoundaryBelowThisLevel: function() {
    return u.PlaceValidationBoundaryBelowThisLevel;
  }, RenderValidationBoundaryAtThisLevel: function() {
    return u.RenderValidationBoundaryAtThisLevel;
  }, SlotMarker: function() {
    return u.SlotMarker;
  } };
  for (var l in n) Object.defineProperty(r, l, { enumerable: true, get: n[l] });
  let u = e.r(22976);
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 39756, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true });
  var n = { LoadingBoundaryProvider: function() {
    return C;
  }, default: function() {
    return T;
  } };
  for (var l in n) Object.defineProperty(r, l, { enumerable: true, get: n[l] });
  let u = e.r(55682), a = e.r(90809), o = e.r(43476), d = a._(e.r(71645)), s = u._(e.r(74080)), i = e.r(8372), c = e.r(1244), f = e.r(72383), p = e.r(91915), y = e.r(58442), m = e.r(68017);
  e.r(77694);
  let b = e.r(70725), _ = e.r(28298);
  e.r(74180);
  let h = e.r(61994), P = e.r(33906), v = e.r(95871);
  s.default.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(e2, t2, r2) {
    let n2 = e2.getClientRects();
    if (0 === n2.length) return 0;
    let l2 = 1 / 0;
    for (let e3 = 0; e3 < n2.length; e3++) {
      let t3 = n2[e3];
      t3.top < l2 && (l2 = t3.top);
    }
    return l2 >= r2() && l2 <= t2 ? 1 : 2;
  }
  d.default.Component;
  let j = function(e2) {
    let t2 = d.default.useRef(null);
    return (0, d.useLayoutEffect)(() => {
      let { focusAndScrollRef: r2, cacheNode: n2 } = e2, l2 = r2.forceScroll ? r2.scrollRef : n2.scrollRef;
      if (null === l2 || !l2.current) return;
      let u2 = null, a2 = r2.hashFragment;
      if (a2) {
        var o2;
        if (null === (u2 = "top" === (o2 = a2) ? document.body : document.getElementById(o2) ?? document.getElementsByName(o2)[0] ?? null)) {
          l2.current = false, r2.onlyHashChange = false, r2.hashFragment = null;
          return;
        }
      } else u2 = t2.current;
      if (null === u2) return;
      let d2 = false;
      (0, p.disableSmoothScrollDuringRouteTransition)(() => {
        let e3 = document.documentElement, t3 = null, r3 = null, n3 = null, o3 = () => {
          var r4, l3;
          let u3, a3;
          return null === n3 && (r4 = e3, l3 = t3, n3 = !Number.isFinite(a3 = Number.parseFloat(u3 = getComputedStyle(r4).scrollPaddingTop)) || a3 < 0 ? 0 : u3.endsWith("px") ? a3 : u3.endsWith("%") ? a3 / 100 * l3 : 0), n3;
        };
        (a2 || (t3 = e3.clientHeight, 0 !== (r3 = g(u2, t3, o3)))) && ((d2 = true, l2.current = false, a2) ? u2.scrollIntoView() : 1 !== r3 && (e3.scrollTop = 0, 2 === g(u2, t3, o3) && u2.scrollIntoView()));
      }, { dontForceLayout: true, onlyHashChange: r2.onlyHashChange }), d2 && (r2.onlyHashChange = false, r2.hashFragment = null);
    }, void 0), (0, o.jsx)(d.Fragment, { ref: t2, children: e2.children });
  };
  function O({ children: e2, cacheNode: t2 }) {
    let r2 = (0, d.useContext)(i.GlobalLayoutRouterContext);
    if (!r2) throw Object.defineProperty(Error("invariant global layout router not mounted"), "__NEXT_ERROR_CODE", { value: "E473", enumerable: false, configurable: true });
    return (0, o.jsx)(j, { focusAndScrollRef: r2.focusAndScrollRef, cacheNode: t2, children: e2 });
  }
  function x({ tree: e2, segmentPath: t2, debugNameContext: r2, cacheNode: n2, params: l2, url: u2, isActive: a2 }) {
    let s2, f2 = (0, d.useContext)(i.GlobalLayoutRouterContext);
    if ((0, d.useContext)(h.NavigationPromisesContext), !f2) throw Object.defineProperty(Error("invariant global layout router not mounted"), "__NEXT_ERROR_CODE", { value: "E473", enumerable: false, configurable: true });
    let p2 = null !== n2 ? n2 : (0, d.use)(c.unresolvedThenable), y2 = null !== p2.prefetchRsc ? p2.prefetchRsc : p2.rsc, m2 = (0, d.useDeferredValue)(p2.rsc, y2);
    if ((0, v.isDeferredRsc)(m2)) {
      let e3 = (0, d.use)(m2);
      null === e3 && (0, d.use)(c.unresolvedThenable), s2 = e3;
    } else null === m2 && (0, d.use)(c.unresolvedThenable), s2 = m2;
    let b2 = s2;
    return (0, o.jsx)(i.LayoutRouterContext.Provider, { value: { parentTree: e2, parentCacheNode: p2, parentSegmentPath: t2, parentParams: l2, parentLoadingData: null, debugNameContext: r2, url: u2, isActive: a2 }, children: b2 });
  }
  function C({ loading: e2, children: t2 }) {
    let r2 = (0, d.use)(i.LayoutRouterContext);
    return null === r2 ? t2 : (0, o.jsx)(i.LayoutRouterContext.Provider, { value: { parentTree: r2.parentTree, parentCacheNode: r2.parentCacheNode, parentSegmentPath: r2.parentSegmentPath, parentParams: r2.parentParams, parentLoadingData: e2, debugNameContext: r2.debugNameContext, url: r2.url, isActive: r2.isActive }, children: t2 });
  }
  function R({ name: e2, loading: t2, children: r2 }) {
    if (null !== t2) {
      let n2 = t2[0], l2 = t2[1], u2 = t2[2];
      return (0, o.jsx)(d.Suspense, { name: e2, fallback: (0, o.jsxs)(o.Fragment, { children: [l2, u2, n2] }), children: r2 });
    }
    return (0, o.jsx)(o.Fragment, { children: r2 });
  }
  function T({ parallelRouterKey: e2, error: t2, errorStyles: r2, errorScripts: n2, templateStyles: l2, templateScripts: u2, template: a2, notFound: s2, forbidden: p2, unauthorized: h2, segmentViewBoundaries: v2 }) {
    let g2 = (0, d.useContext)(i.LayoutRouterContext);
    if (!g2) throw Object.defineProperty(Error("invariant expected layout router to be mounted"), "__NEXT_ERROR_CODE", { value: "E56", enumerable: false, configurable: true });
    let { parentTree: j2, parentCacheNode: C2, parentSegmentPath: S, parentParams: M, parentLoadingData: E, url: N, isActive: F, debugNameContext: A } = g2, B = j2[0], D = null === S ? [e2] : S.concat([B, e2]), L = j2[1][e2], H = C2.slots;
    (void 0 === L || null === H) && (0, d.use)(c.unresolvedThenable);
    let w = L[0], k = H[e2] ?? null, U = (0, b.createRouterCacheKey)(w, true), V = (0, _.useRouterBFCache)(L, k, U), I = [];
    do {
      let e3 = V.tree, d2 = V.cacheNode, c2 = V.stateKey, b2 = e3[0], _2 = M;
      if (Array.isArray(b2)) {
        let e4 = b2[0], t3 = b2[1], r3 = b2[2], n3 = (0, P.getParamValueFromCacheKey)(t3, r3);
        null !== n3 && (_2 = { ...M, [e4]: n3 });
      }
      let v3 = (function(e4) {
        if ("/" === e4) return "/";
        if ("string" == typeof e4) if ("(__SLOT__)" === e4) return;
        else return e4 + "/";
        return e4[1] + "/";
      })(b2), g3 = v3 ?? A, j3 = void 0 === v3 ? void 0 : A, C3 = (0, o.jsxs)(O, { cacheNode: d2, children: [(0, o.jsx)(f.ErrorBoundary, { errorComponent: t2, errorStyles: r2, errorScripts: n2, children: (0, o.jsx)(R, { name: j3, loading: E, children: (0, o.jsx)(m.HTTPAccessFallbackBoundary, { notFound: s2, forbidden: p2, unauthorized: h2, children: (0, o.jsxs)(y.RedirectBoundary, { children: [(0, o.jsx)(x, { url: N, tree: e3, params: _2, cacheNode: d2, segmentPath: D, debugNameContext: g3, isActive: F && c2 === U }), null] }) }) }) }), null] }), T2 = (0, o.jsxs)(i.TemplateContext.Provider, { value: C3, children: [l2, u2, a2] }, c2);
      I.push(T2), V = V.next;
    } while (null !== V);
    return I;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 37457, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "default", { enumerable: true, get: function() {
    return o;
  } });
  let n = e.r(90809), l = e.r(43476), u = n._(e.r(71645)), a = e.r(8372);
  function o() {
    let e2 = (0, u.useContext)(a.TemplateContext);
    return (0, l.jsx)(l.Fragment, { children: e2 });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 6831, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderParamsFromClient", { enumerable: true, get: function() {
    return l;
  } });
  let n = /* @__PURE__ */ new WeakMap();
  function l(e2) {
    let t2 = n.get(e2);
    if (t2) return t2;
    let r2 = Promise.resolve(e2);
    return n.set(e2, r2), r2;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 97689, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderParamsFromClient", { enumerable: true, get: function() {
    return n;
  } });
  let n = e.r(6831).createRenderParamsFromClient;
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 93504, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderSearchParamsFromClient", { enumerable: true, get: function() {
    return l;
  } });
  let n = /* @__PURE__ */ new WeakMap();
  function l(e2) {
    let t2 = n.get(e2);
    if (t2) return t2;
    let r2 = Promise.resolve(e2);
    return n.set(e2, r2), r2;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 66996, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderSearchParamsFromClient", { enumerable: true, get: function() {
    return n;
  } });
  let n = e.r(93504).createRenderSearchParamsFromClient;
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 42903, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { createClientParams: function() {
    return u.createRenderParamsFromClient;
  }, createClientSearchParams: function() {
    return a.createRenderSearchParamsFromClient;
  } };
  for (var l in n) Object.defineProperty(r, l, { enumerable: true, get: n[l] });
  let u = e.r(97689), a = e.r(66996);
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 27201, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "IconMark", { enumerable: true, get: function() {
    return l;
  } });
  let n = e.r(43476), l = () => "u" > typeof window ? null : (0, n.jsx)("meta", { name: "\xABnxt-icon\xBB" });
}, 91915, (e, t, r) => {
  "use strict";
  function n(e2, t2 = {}) {
    if (t2.onlyHashChange) return void e2();
    let r2 = document.documentElement;
    if ("smooth" !== r2.dataset.scrollBehavior) return void e2();
    let l = r2.style.scrollBehavior;
    r2.style.scrollBehavior = "auto", t2.dontForceLayout || r2.getClientRects(), e2(), r2.style.scrollBehavior = l;
  }
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "disableSmoothScrollDuringRouteTransition", { enumerable: true, get: function() {
    return n;
  } });
}]);
