(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 66849, (e, t, n) => {
  "trimStart" in String.prototype || (String.prototype.trimStart = String.prototype.trimLeft), "trimEnd" in String.prototype || (String.prototype.trimEnd = String.prototype.trimRight), "description" in Symbol.prototype || Object.defineProperty(Symbol.prototype, "description", { configurable: true, get: function() {
    var e2 = /\((.*)\)/.exec(this.toString());
    return e2 ? e2[1] : void 0;
  } }), Array.prototype.flat || (Array.prototype.flat = function(e2, t2) {
    return t2 = this.concat.apply([], this), e2 > 1 && t2.some(Array.isArray) ? t2.flat(e2 - 1) : t2;
  }, Array.prototype.flatMap = function(e2, t2) {
    return this.map(e2, t2).flat();
  }), Promise.prototype.finally || (Promise.prototype.finally = function(e2) {
    if ("function" != typeof e2) return this.then(e2, e2);
    var t2 = this.constructor || Promise;
    return this.then(function(n2) {
      return t2.resolve(e2()).then(function() {
        return n2;
      });
    }, function(n2) {
      return t2.resolve(e2()).then(function() {
        throw n2;
      });
    });
  }), Object.fromEntries || (Object.fromEntries = function(e2) {
    return Array.from(e2).reduce(function(e3, t2) {
      return e3[t2[0]] = t2[1], e3;
    }, {});
  }), Array.prototype.at || (Array.prototype.at = function(e2) {
    var t2 = Math.trunc(e2) || 0;
    if (t2 < 0 && (t2 += this.length), !(t2 < 0 || t2 >= this.length)) return this[t2];
  }), Object.hasOwn || (Object.hasOwn = function(e2, t2) {
    if (null == e2) throw TypeError("Cannot convert undefined or null to object");
    return Object.prototype.hasOwnProperty.call(Object(e2), t2);
  }), "canParse" in URL || (URL.canParse = function(e2, t2) {
    try {
      return new URL(e2, t2), true;
    } catch (e3) {
      return false;
    }
  });
}, 23911, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true }), e.r(66849), ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 62262, (e, t, n) => {
  "use strict";
  function r(e2, t2) {
    var n2 = e2.length;
    for (e2.push(t2); 0 < n2; ) {
      var r2 = n2 - 1 >>> 1, l2 = e2[r2];
      if (0 < o(l2, t2)) e2[r2] = t2, e2[n2] = l2, n2 = r2;
      else break;
    }
  }
  function l(e2) {
    return 0 === e2.length ? null : e2[0];
  }
  function a(e2) {
    if (0 === e2.length) return null;
    var t2 = e2[0], n2 = e2.pop();
    if (n2 !== t2) {
      e2[0] = n2;
      for (var r2 = 0, l2 = e2.length, a2 = l2 >>> 1; r2 < a2; ) {
        var i2 = 2 * (r2 + 1) - 1, u2 = e2[i2], s2 = i2 + 1, c2 = e2[s2];
        if (0 > o(u2, n2)) s2 < l2 && 0 > o(c2, u2) ? (e2[r2] = c2, e2[s2] = n2, r2 = s2) : (e2[r2] = u2, e2[i2] = n2, r2 = i2);
        else if (s2 < l2 && 0 > o(c2, n2)) e2[r2] = c2, e2[s2] = n2, r2 = s2;
        else break;
      }
    }
    return t2;
  }
  function o(e2, t2) {
    var n2 = e2.sortIndex - t2.sortIndex;
    return 0 !== n2 ? n2 : e2.id - t2.id;
  }
  if (n.unstable_now = void 0, "object" == typeof performance && "function" == typeof performance.now) {
    var i, u = performance;
    n.unstable_now = function() {
      return u.now();
    };
  } else {
    var s = Date, c = s.now();
    n.unstable_now = function() {
      return s.now() - c;
    };
  }
  var f = [], d = [], p = 1, m = null, h = 3, g = false, v = false, y = false, b = false, w = "function" == typeof setTimeout ? setTimeout : null, S = "function" == typeof clearTimeout ? clearTimeout : null, k = "u" > typeof setImmediate ? setImmediate : null;
  function E(e2) {
    for (var t2 = l(d); null !== t2; ) {
      if (null === t2.callback) a(d);
      else if (t2.startTime <= e2) a(d), t2.sortIndex = t2.expirationTime, r(f, t2);
      else break;
      t2 = l(d);
    }
  }
  function _(e2) {
    if (y = false, E(e2), !v) if (null !== l(f)) v = true, x || (x = true, i());
    else {
      var t2 = l(d);
      null !== t2 && R(_, t2.startTime - e2);
    }
  }
  var x = false, P = -1, N = 5, C = -1;
  function T() {
    return !!b || !(n.unstable_now() - C < N);
  }
  function O() {
    if (b = false, x) {
      var e2 = n.unstable_now();
      C = e2;
      var t2 = true;
      try {
        e: {
          v = false, y && (y = false, S(P), P = -1), g = true;
          var r2 = h;
          try {
            t: {
              for (E(e2), m = l(f); null !== m && !(m.expirationTime > e2 && T()); ) {
                var o2 = m.callback;
                if ("function" == typeof o2) {
                  m.callback = null, h = m.priorityLevel;
                  var u2 = o2(m.expirationTime <= e2);
                  if (e2 = n.unstable_now(), "function" == typeof u2) {
                    m.callback = u2, E(e2), t2 = true;
                    break t;
                  }
                  m === l(f) && a(f), E(e2);
                } else a(f);
                m = l(f);
              }
              if (null !== m) t2 = true;
              else {
                var s2 = l(d);
                null !== s2 && R(_, s2.startTime - e2), t2 = false;
              }
            }
            break e;
          } finally {
            m = null, h = r2, g = false;
          }
        }
      } finally {
        t2 ? i() : x = false;
      }
    }
  }
  if ("function" == typeof k) i = function() {
    k(O);
  };
  else if ("u" > typeof MessageChannel) {
    var z = new MessageChannel(), L = z.port2;
    z.port1.onmessage = O, i = function() {
      L.postMessage(null);
    };
  } else i = function() {
    w(O, 0);
  };
  function R(e2, t2) {
    P = w(function() {
      e2(n.unstable_now());
    }, t2);
  }
  n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(e2) {
    e2.callback = null;
  }, n.unstable_forceFrameRate = function(e2) {
    0 > e2 || 125 < e2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : N = 0 < e2 ? Math.floor(1e3 / e2) : 5;
  }, n.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, n.unstable_next = function(e2) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var t2 = 3;
        break;
      default:
        t2 = h;
    }
    var n2 = h;
    h = t2;
    try {
      return e2();
    } finally {
      h = n2;
    }
  }, n.unstable_requestPaint = function() {
    b = true;
  }, n.unstable_runWithPriority = function(e2, t2) {
    switch (e2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e2 = 3;
    }
    var n2 = h;
    h = e2;
    try {
      return t2();
    } finally {
      h = n2;
    }
  }, n.unstable_scheduleCallback = function(e2, t2, a2) {
    var o2 = n.unstable_now();
    switch (a2 = "object" == typeof a2 && null !== a2 && "number" == typeof (a2 = a2.delay) && 0 < a2 ? o2 + a2 : o2, e2) {
      case 1:
        var u2 = -1;
        break;
      case 2:
        u2 = 250;
        break;
      case 5:
        u2 = 1073741823;
        break;
      case 4:
        u2 = 1e4;
        break;
      default:
        u2 = 5e3;
    }
    return u2 = a2 + u2, e2 = { id: p++, callback: t2, priorityLevel: e2, startTime: a2, expirationTime: u2, sortIndex: -1 }, a2 > o2 ? (e2.sortIndex = a2, r(d, e2), null === l(f) && e2 === l(d) && (y ? (S(P), P = -1) : y = true, R(_, a2 - o2))) : (e2.sortIndex = u2, r(f, e2), v || g || (v = true, x || (x = true, i()))), e2;
  }, n.unstable_shouldYield = T, n.unstable_wrapCallback = function(e2) {
    var t2 = h;
    return function() {
      var n2 = h;
      h = t2;
      try {
        return e2.apply(this, arguments);
      } finally {
        h = n2;
      }
    };
  };
}, 53389, (e, t, n) => {
  "use strict";
  e.i(47167), t.exports = e.r(62262);
}, 98569, (e, t, n) => {
  "use strict";
  let r, l, a, o;
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "hydrate", { enumerable: true, get: function() {
    return U;
  } });
  let i = e.r(55682), u = e.r(43476);
  e.r(23911);
  let s = i._(e.r(88014)), c = i._(e.r(71645)), f = e.r(35326), d = e.r(42732), p = e.r(97238), m = e.r(51323), h = e.r(32120), g = e.r(92245), v = e.r(99781), y = i._(e.r(75530)), b = e.r(65716);
  e.r(8372);
  let w = e.r(50590), S = e.r(43369), k = e.r(32992), E = e.r(76138), _ = f.createFromReadableStream, x = f.createFromFetch, P = document, N = self.__next_instant_test ? self.__next_instant_test : void 0, C = new TextEncoder(), T = false, O = false, z = null;
  function L(e2) {
    if (0 === e2[0]) a = [];
    else if (1 === e2[0]) {
      if (!a) throw Object.defineProperty(Error("Unexpected server data: missing bootstrap script."), "__NEXT_ERROR_CODE", { value: "E18", enumerable: false, configurable: true });
      o ? o.enqueue(C.encode(e2[1])) : a.push(e2[1]);
    } else if (2 === e2[0]) z = e2[1];
    else if (3 === e2[0]) {
      if (!a) throw Object.defineProperty(Error("Unexpected server data: missing bootstrap script."), "__NEXT_ERROR_CODE", { value: "E18", enumerable: false, configurable: true });
      let n2 = atob(e2[1]), r2 = new Uint8Array(n2.length);
      for (var t2 = 0; t2 < n2.length; t2++) r2[t2] = n2.charCodeAt(t2);
      o ? o.enqueue(r2) : a.push(r2);
    }
  }
  let R = function() {
    o && !O && (o.close(), O = true, a = void 0), T = true;
  };
  "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", R, false) : setTimeout(R);
  let M = self.__next_f = self.__next_f || [];
  M.forEach(L), M.length = 0, M.push = L;
  let I = new ReadableStream({ start(e2) {
    a && (a.forEach((t2) => {
      e2.enqueue("string" == typeof t2 ? C.encode(t2) : t2);
    }), T && !O) && (null === e2.desiredSize || e2.desiredSize < 0 ? N || e2.error(Object.defineProperty(Error("The connection to the page was unexpectedly closed, possibly due to the stop button being clicked, loss of Wi-Fi, or an unstable internet connection."), "__NEXT_ERROR_CODE", { value: "E117", enumerable: false, configurable: true })) : e2.close(), O = true, a = void 0), o = e2;
  } });
  if (N) l = Promise.resolve(x(N, { callServer: h.callServer, findSourceMapURL: g.findSourceMapURL, debugChannel: r, unstable_allowPartialStream: true })).then(async (e2) => (0, w.createInitialRSCPayloadFromFallbackPrerender)(await N, e2));
  else if (window.__NEXT_CLIENT_RESUME) {
    let e2 = window.__NEXT_CLIENT_RESUME;
    l = Promise.resolve(x(e2, { callServer: h.callServer, findSourceMapURL: g.findSourceMapURL, debugChannel: r })).then(async (t2) => (0, w.createInitialRSCPayloadFromFallbackPrerender)(await e2, t2));
  } else l = _(I, { callServer: h.callServer, findSourceMapURL: g.findSourceMapURL, debugChannel: r, startTime: 0 });
  function D({ initialRSCPayload: e2, actionQueue: t2, webSocket: n2, staticIndicatorState: r2 }) {
    return (0, u.jsx)(y.default, { actionQueue: t2, globalErrorState: e2.G, webSocket: n2, staticIndicatorState: r2 });
  }
  let F = c.default.StrictMode;
  function A({ children: e2 }) {
    return e2;
  }
  let j = { onDefaultTransitionIndicator: function() {
    return () => {
    };
  }, onRecoverableError: p.onRecoverableError, onCaughtError: m.onCaughtError, onUncaughtError: m.onUncaughtError };
  async function U(e2, t2) {
    let n2, r2, a2 = await l;
    a2.b ? (0, k.setNavigationBuildId)(a2.b) : (0, k.setNavigationBuildId)((0, S.getDeploymentId)()), (0, E.initializeRouterTransitionModules)(e2);
    let o2 = Date.now(), i2 = (0, v.createMutableActionQueue)((0, b.createInitialRouterState)({ navigatedAt: o2, initialRSCPayload: a2, initialFlightStreamForCache: null, location: window.location })), f2 = (0, u.jsx)(F, { children: (0, u.jsx)(d.HeadManagerContext.Provider, { value: { appDir: true }, children: (0, u.jsx)(A, { children: (0, u.jsx)(D, { initialRSCPayload: a2, actionQueue: i2, webSocket: r2, staticIndicatorState: n2 }) }) }) });
    "__next_error__" === document.documentElement.id ? s.default.createRoot(P, j).render(f2) : c.default.startTransition(() => {
      s.default.hydrateRoot(P, f2, { ...j, formState: z });
    });
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 94553, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true }), e.r(23755);
  let r = e.r(96517);
  e.r(97238), window.next.turbopack = true, self.__webpack_hash__ = "";
  let l = e.r(5526);
  (0, r.appBootstrap)((t2) => {
    let { hydrate: n2 } = e.r(98569);
    n2(l, t2);
  }), ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 74575, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "getAssetPrefix", { enumerable: true, get: function() {
    return l;
  } });
  let r = e.r(12718);
  function l() {
    let e2 = document.currentScript;
    if (!(e2 instanceof HTMLScriptElement)) throw Object.defineProperty(new r.InvariantError(`Expected document.currentScript to be a <script> element. Received ${e2} instead.`), "__NEXT_ERROR_CODE", { value: "E783", enumerable: false, configurable: true });
    let { pathname: t2 } = new URL(e2.src), n2 = t2.indexOf("/_next/");
    if (-1 === n2) throw Object.defineProperty(new r.InvariantError(`Expected document.currentScript src to contain '/_next/'. Received ${e2.src} instead.`), "__NEXT_ERROR_CODE", { value: "E784", enumerable: false, configurable: true });
    return t2.slice(0, n2);
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 22737, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "setAttributesFromProps", { enumerable: true, get: function() {
    return o;
  } });
  let r = { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv", noModule: "noModule" }, l = ["onLoad", "onReady", "dangerouslySetInnerHTML", "children", "onError", "strategy", "stylesheets"];
  function a(e2) {
    return ["async", "defer", "noModule"].includes(e2);
  }
  function o(e2, t2) {
    for (let [n2, o2] of Object.entries(t2)) {
      if (!t2.hasOwnProperty(n2) || l.includes(n2) || void 0 === o2) continue;
      let i = r[n2] || n2.toLowerCase();
      "SCRIPT" === e2.tagName && a(i) ? e2[i] = !!o2 : e2.setAttribute(i, String(o2)), (false === o2 || "SCRIPT" === e2.tagName && a(i) && (!o2 || "false" === o2)) && (e2.setAttribute(i, ""), e2.removeAttribute(i));
    }
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 96517, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "appBootstrap", { enumerable: true, get: function() {
    return a;
  } });
  let r = e.r(74575), l = e.r(22737);
  function a(e2) {
    var t2, n2;
    let a2 = (0, r.getAssetPrefix)();
    t2 = self.__next_s, n2 = () => {
      e2(a2);
    }, t2 && t2.length ? t2.reduce((e3, [t3, n3]) => e3.then(() => new Promise((e4, r2) => {
      let a3 = document.createElement("script");
      n3 && (0, l.setAttributesFromProps)(a3, n3), t3 ? (a3.src = t3, a3.onload = () => e4(), a3.onerror = r2) : n3 && (a3.innerHTML = n3.children, setTimeout(e4)), document.head.appendChild(a3);
    })), Promise.resolve()).catch((e3) => {
      console.error(e3);
    }).then(() => {
      n2();
    }) : n2();
  }
  window.next = { version: "16.3.8", appDir: true }, ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 62634, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "AppRouterAnnouncer", { enumerable: true, get: function() {
    return o;
  } });
  let r = e.r(71645), l = e.r(74080), a = "next-route-announcer";
  function o({ tree: e2 }) {
    let [t2, n2] = (0, r.useState)(null);
    (0, r.useEffect)(() => (n2((function() {
      let e3 = document.getElementsByName(a)[0];
      if (e3?.shadowRoot?.childNodes[0]) return e3.shadowRoot.childNodes[0];
      {
        let e4 = document.createElement(a);
        e4.style.cssText = "position:absolute";
        let t3 = document.createElement("div");
        return t3.ariaLive = "assertive", t3.id = "__next-route-announcer__", t3.role = "alert", t3.style.cssText = "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal", e4.attachShadow({ mode: "open" }).appendChild(t3), document.body.appendChild(e4), t3;
      }
    })()), () => {
      let e3 = document.getElementsByTagName(a)[0];
      e3?.isConnected && document.body.removeChild(e3);
    }), []);
    let [i, u] = (0, r.useState)(""), s = (0, r.useRef)(void 0);
    return (0, r.useEffect)(() => {
      let e3 = "";
      if (document.title) e3 = document.title;
      else {
        let t3 = document.querySelector("h1");
        t3 && (e3 = t3.innerText || t3.textContent || "");
      }
      void 0 !== s.current && s.current !== e3 && u(e3), s.current = e3;
    }, [e2]), t2 ? (0, l.createPortal)(i, t2) : null;
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 75530, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "default", { enumerable: true, get: function() {
    return R;
  } });
  let r = e.r(55682), l = e.r(90809), a = e.r(43476), o = l._(e.r(71645)), i = e.r(8372), u = e.r(88540), s = e.r(51191), c = e.r(61994), f = e.r(41538), d = e.r(94272), p = e.r(62634), m = e.r(58442), h = e.r(25018), g = e.r(1244), v = e.r(87250), y = e.r(52817), b = e.r(34727), w = e.r(78377), S = e.r(99781), k = e.r(24063), E = e.r(68391), _ = e.r(91949), x = r._(e.r(94109)), P = r._(e.r(68027)), N = e.r(97367);
  e.r(43369);
  let C = {};
  function T({ appRouterState: e2 }) {
    return (0, o.useInsertionEffect)(() => {
      let { tree: t2, pushRef: n2, canonicalUrl: r2, renderedSearch: l2 } = e2, a2 = { ...n2.preserveCustomHistoryState ? window.history.state : {}, __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: { tree: t2, renderedSearch: l2 } };
      n2.pendingPush && (0, s.createHrefFromUrl)(new URL(window.location.href)) !== r2 ? (n2.pendingPush = false, window.history.pushState(a2, "", r2)) : window.history.replaceState(a2, "", r2), (0, d.setLastCommittedTree)(t2);
    }, [e2]), (0, o.useEffect)(() => {
      (0, _.pingVisibleLinks)(e2.nextUrl, e2.tree);
    }, [e2.nextUrl, e2.tree]), null;
  }
  function O(e2) {
    null == e2 && (e2 = {});
    let t2 = window.history.state, n2 = t2?.__NA;
    n2 && (e2.__NA = n2);
    let r2 = t2?.__PRIVATE_NEXTJS_INTERNALS_TREE;
    return r2 && (e2.__PRIVATE_NEXTJS_INTERNALS_TREE = r2), e2;
  }
  function z({ headCacheNode: e2 }) {
    let t2 = null !== e2 ? e2.head : null, n2 = null !== e2 ? e2.prefetchHead : null, r2 = null !== n2 ? n2 : t2;
    return (0, o.useDeferredValue)(t2, r2);
  }
  function L({ actionQueue: e2, globalError: t2, webSocket: n2, staticIndicatorState: r2 }) {
    let l2, s2 = (0, f.useActionQueue)(e2), { canonicalUrl: d2 } = s2, { searchParams: w2, pathname: _2 } = (0, o.useMemo)(() => {
      let e3 = new URL(d2, "u" < typeof window ? "http://n" : window.location.href);
      return { searchParams: e3.searchParams, pathname: (0, y.hasBasePath)(e3.pathname) ? (0, v.removeBasePath)(e3.pathname) : e3.pathname };
    }, [d2]);
    (0, o.useEffect)(() => {
      let e3 = (0, b.extractSourcePageFromFlightRouterState)(s2.tree);
      void 0 !== e3 ? window.next.__internal_src_page = e3 : delete window.next.__internal_src_page;
    }, [s2.tree]), (0, o.useEffect)(() => {
      function e3(e4) {
        e4.persisted && window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE && (C.pendingMpaPath = void 0, (0, f.dispatchAppRouterAction)({ type: u.ACTION_RESTORE, url: new URL(window.location.href), historyState: window.history.state.__PRIVATE_NEXTJS_INTERNALS_TREE }));
      }
      return window.addEventListener("pageshow", e3), () => {
        window.removeEventListener("pageshow", e3);
      };
    }, []), (0, o.useEffect)(() => {
      function e3(e4) {
        let t3 = "reason" in e4 ? e4.reason : e4.error;
        if ((0, E.isRedirectError)(t3)) {
          e4.preventDefault();
          let n3 = (0, k.getURLFromRedirectError)(t3);
          "push" === (0, k.getRedirectTypeFromError)(t3) ? S.publicAppRouterInstance.push(n3, {}) : S.publicAppRouterInstance.replace(n3, {});
        }
      }
      return window.addEventListener("error", e3), window.addEventListener("unhandledrejection", e3), () => {
        window.removeEventListener("error", e3), window.removeEventListener("unhandledrejection", e3);
      };
    }, []);
    let { pushRef: P2 } = s2;
    if (P2.mpaNavigation) {
      if (C.pendingMpaPath !== d2) {
        let e3 = window.location;
        P2.pendingPush ? e3.assign(d2) : e3.replace(d2), C.pendingMpaPath = d2;
      }
      throw g.unresolvedThenable;
    }
    (0, o.useEffect)(() => {
      let e3 = window.history.pushState.bind(window.history), t3 = window.history.replaceState.bind(window.history), n3 = (e4) => {
        let t4 = window.location.href, n4 = window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE;
        (0, o.startTransition)(() => {
          (0, f.dispatchAppRouterAction)({ type: u.ACTION_RESTORE, url: new URL(e4 ?? t4, t4), historyState: n4 });
        });
      };
      window.history.pushState = function(t4, r4, l3) {
        return t4?.__NA || t4?._N || (t4 = O(t4), l3 && n3(l3)), e3(t4, r4, l3);
      }, window.history.replaceState = function(e4, r4, l3) {
        return e4?.__NA || e4?._N || (e4 = O(e4), l3 && n3(l3)), t3(e4, r4, l3);
      };
      let r3 = (e4) => {
        if (e4.state) {
          if (!e4.state.__NA) return void window.location.reload();
          (0, o.startTransition)(() => {
            (0, S.dispatchTraverseAction)(window.location.href, e4.state.__PRIVATE_NEXTJS_INTERNALS_TREE);
          });
        }
      };
      return window.addEventListener("popstate", r3), () => {
        window.history.pushState = e3, window.history.replaceState = t3, window.removeEventListener("popstate", r3);
      };
    }, []);
    let { cache: R2, tree: M, nextUrl: I, focusAndScrollRef: D, previousNextUrl: F } = s2, A = (0, o.useMemo)(() => (0, h.findHeadInCache)(R2, M[1]), [R2, M]), j = (0, o.useMemo)(() => (0, b.getSelectedParams)(M), [M]), U = (0, o.useMemo)(() => ({ parentTree: M, parentCacheNode: R2, parentSegmentPath: null, parentParams: {}, parentLoadingData: null, debugNameContext: "/", url: d2, isActive: true }), [M, R2, d2]), B = (0, o.useMemo)(() => ({ tree: M, focusAndScrollRef: D, nextUrl: I, previousNextUrl: F }), [M, D, I, F]);
    if (null !== A) {
      let [e3, t3, n3] = A;
      l2 = (0, a.jsx)(z, { headCacheNode: e3 }, "u" < typeof window ? n3 : t3);
    } else l2 = null;
    let V = (0, a.jsxs)(m.RedirectBoundary, { children: [l2, (0, a.jsx)(N.RootLayoutBoundary, { children: R2.rsc }), (0, a.jsx)(p.AppRouterAnnouncer, { tree: M })] });
    return V = (0, a.jsx)(x.default, { errorComponent: t2[0], errorStyles: t2[1], children: V }), (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)(T, { appRouterState: s2 }), null, (0, a.jsx)(c.NavigationPromisesContext.Provider, { value: null, children: (0, a.jsx)(c.PathParamsContext.Provider, { value: j, children: (0, a.jsx)(c.PathnameContext.Provider, { value: _2, children: (0, a.jsx)(c.SearchParamsContext.Provider, { value: w2, children: (0, a.jsx)(i.GlobalLayoutRouterContext.Provider, { value: B, children: (0, a.jsx)(i.AppRouterContext.Provider, { value: S.publicAppRouterInstance, children: (0, a.jsx)(i.LayoutRouterContext.Provider, { value: U, children: V }) }) }) }) }) }) })] });
  }
  function R({ actionQueue: e2, globalErrorState: t2, webSocket: n2, staticIndicatorState: r2 }) {
    (0, w.useNavFailureHandler)();
    let l2 = (0, a.jsx)(L, { actionQueue: e2, globalError: t2, webSocket: n2, staticIndicatorState: r2 });
    return (0, a.jsx)(x.default, { errorComponent: P.default, children: l2 });
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 35922, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true });
  var r = { GracefulDegradeBoundary: function() {
    return i;
  }, default: function() {
    return u;
  } };
  for (var l in r) Object.defineProperty(n, l, { enumerable: true, get: r[l] });
  let a = e.r(43476), o = e.r(71645);
  class i extends o.Component {
    constructor(e2) {
      super(e2), this.state = { hasError: false }, this.rootHtml = "", this.htmlAttributes = {}, this.htmlRef = (0, o.createRef)();
    }
    static getDerivedStateFromError(e2) {
      return { hasError: true };
    }
    componentDidMount() {
      let e2 = this.htmlRef.current;
      this.state.hasError && e2 && Object.entries(this.htmlAttributes).forEach(([t2, n2]) => {
        e2.setAttribute(t2, n2);
      });
    }
    render() {
      let { hasError: e2 } = this.state;
      return ("u" > typeof window && !this.rootHtml && (this.rootHtml = document.documentElement.innerHTML, this.htmlAttributes = (function(e3) {
        let t2 = {};
        for (let n2 = 0; n2 < e3.attributes.length; n2++) {
          let r2 = e3.attributes[n2];
          t2[r2.name] = r2.value;
        }
        return t2;
      })(document.documentElement)), e2) ? (0, a.jsx)("html", { ref: this.htmlRef, suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: this.rootHtml } }) : this.props.children;
    }
  }
  let u = i;
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 94109, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "default", { enumerable: true, get: function() {
    return s;
  } });
  let r = e.r(55682), l = e.r(43476);
  e.r(71645);
  let a = r._(e.r(35922)), o = e.r(72383), i = e.r(82604), u = "u" > typeof window && (0, i.isBot)(window.navigator.userAgent);
  function s({ children: e2, errorComponent: t2, errorStyles: n2, errorScripts: r2 }) {
    return u ? (0, l.jsx)(a.default, { children: e2 }) : (0, l.jsx)(o.ErrorBoundary, { errorComponent: t2, errorStyles: n2, errorScripts: r2, children: e2 });
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 65716, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "createInitialRouterState", { enumerable: true, get: function() {
    return d;
  } });
  let r = e.r(51191), l = e.r(34727), a = e.r(50590), o = e.r(95871), i = e.r(20896), u = e.r(9396), s = e.r(79027), c = e.r(87288), f = e.r(96167);
  function d({ navigatedAt: e2, initialRSCPayload: t2, initialFlightStreamForCache: n2, location: p }) {
    let { c: m, f: h, q: g, i: v, S: y, s: b, l: w, h: S, r: k, p: E, d: _ } = t2, x = m.join("/"), { tree: P, seedData: N, head: C } = (0, a.getFlightDataPartsFromPath)(h[0]), T = p ? (0, r.createHrefFromUrl)(p) : x, O = { metadataVaryPath: null, treeDivergedFromBase: false }, z = (0, i.convertRootFlightRouterStateToRouteTree)(P, g, O), L = O.metadataVaryPath, R = (0, o.createInitialCacheNodeForHydration)(e2, z, N, C, (0, s.computeDynamicStaleAt)(e2, _ ?? s.UnknownDynamicStaleTime));
    if (null !== p && null !== L) {
      if ((0, f.discoverKnownRoute)(Date.now(), p.pathname, p.search, null, null, z, L, v, T, y, false), null !== N && void 0 !== b) if (void 0 !== w && null != n2) Promise.resolve(w).then(async (e3) => {
        let t3 = await (0, c.decodeStageUntilBoundary)(n2, e3, void 0), r2 = Date.now(), l2 = await (0, i.resolveStaleAt)(r2, t3.s);
        (0, i.writePrerenderResponseIntoCache)(r2, u.FetchStrategy.PPR, t3.f, void 0, t3.h, t3.r ?? null, l2, P, g, true, i.segmentCacheMap);
      }).catch(() => {
      });
      else {
        let e3 = Date.now();
        (0, i.resolveStaleAt)(e3, b).then((t3) => {
          (0, i.writePrerenderResponseIntoCache)(e3, u.FetchStrategy.PPR, h, void 0, S, k ?? null, t3, P, g, false, i.segmentCacheMap);
        }).catch(() => {
        }), n2?.cancel();
      }
      else n2?.cancel();
      null != E && (0, i.processRuntimePrefetchStream)(Date.now(), E, P, g).then((e3) => {
        null !== e3 && (0, i.writeDynamicRenderResponseIntoCache)(Date.now(), u.FetchStrategy.PPRRuntime, e3.flightDatas, e3.buildId, e3.isResponsePartial, e3.headVaryParams, e3.rootVaryParamsIterable, e3.staleAt, e3.navigationSeed, null, i.segmentCacheMap);
      }).catch(() => {
      });
    }
    return { tree: R.route, cache: R.node, pushRef: { pendingPush: false, mpaNavigation: false, preserveCustomHistoryState: true }, focusAndScrollRef: { scrollRef: null, forceScroll: false, onlyHashChange: false, hashFragment: null }, canonicalUrl: T, renderedSearch: g, nextUrl: ((0, l.extractPathFromFlightRouterState)(P) || p?.pathname) ?? null, previousNextUrl: null, debugInfo: null };
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 25018, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "findHeadInCache", { enumerable: true, get: function() {
    return a;
  } });
  let r = e.r(13258), l = e.r(70725);
  function a(e2, t2) {
    return (function e3(t3, n2, a2, o) {
      if (0 === Object.keys(n2).length) return [t3, a2, o];
      let i = Object.keys(n2).filter((e4) => "children" !== e4);
      "children" in n2 && i.unshift("children");
      let u = t3.slots;
      if (null !== u) for (let t4 of i) {
        let [o2, i2] = n2[t4];
        if (o2 === r.DEFAULT_SEGMENT_KEY) continue;
        let s = u[t4];
        if (!s) continue;
        let c = e3(s, i2, a2 + "/" + (0, l.createRouterCacheKey)(o2), a2 + "/" + (0, l.createRouterCacheKey)(o2, true));
        if (c) return c;
      }
      return null;
    })(e2, t2, "", "");
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 51323, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true });
  var r = { onCaughtError: function() {
    return d;
  }, onUncaughtError: function() {
    return p;
  } };
  for (var l in r) Object.defineProperty(n, l, { enumerable: true, get: r[l] });
  let a = e.r(55682), o = e.r(65713), i = e.r(32061), u = e.r(28279), s = e.r(72383), c = a._(e.r(68027)), f = { decorateDevError: (e2) => e2, handleClientError: () => {
  }, originConsoleError: console.error.bind(console) };
  function d(e2, t2) {
    let n2, r2 = t2.errorBoundary?.constructor;
    if (n2 = n2 || r2 === s.ErrorBoundaryHandler && t2.errorBoundary.props.errorComponent === c.default) return p(e2);
    (0, i.isBailoutToCSRError)(e2) || (0, o.isNextRouterError)(e2) || f.originConsoleError(e2);
  }
  function p(e2) {
    (0, i.isBailoutToCSRError)(e2) || (0, o.isNextRouterError)(e2) || (0, u.reportGlobalError)(e2);
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 23755, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true });
  let r = (0, e.r(43369).getDeploymentId)();
  globalThis.NEXT_DEPLOYMENT_ID = r, ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 46480, (e, t, n) => {
  "use strict";
  var r, l = e.i(47167), a = e.r(53389), o = e.r(71645), i = e.r(74080);
  function u(e10) {
    var t10 = "https://react.dev/errors/" + e10;
    if (1 < arguments.length) {
      t10 += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n10 = 2; n10 < arguments.length; n10++) t10 += "&args[]=" + encodeURIComponent(arguments[n10]);
    }
    return "Minified React error #" + e10 + "; visit " + t10 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e10) {
    return !(!e10 || 1 !== e10.nodeType && 9 !== e10.nodeType && 11 !== e10.nodeType);
  }
  function c(e10) {
    for (var t10 = e10, n10 = t10; n10 && !n10.alternate; ) 0 != (4098 & (t10 = n10).flags) && (e10 = t10.return), n10 = t10.return;
    for (; t10.return; ) t10 = t10.return;
    return 3 === t10.tag ? e10 : null;
  }
  function f(e10) {
    if (13 === e10.tag) {
      var t10 = e10.memoizedState;
      if (null === t10 && null !== (e10 = e10.alternate) && (t10 = e10.memoizedState), null !== t10) return t10.dehydrated;
    }
    return null;
  }
  function d(e10) {
    if (31 === e10.tag) {
      var t10 = e10.memoizedState;
      if (null === t10 && null !== (e10 = e10.alternate) && (t10 = e10.memoizedState), null !== t10) return t10.dehydrated;
    }
    return null;
  }
  function p(e10) {
    if (c(e10) !== e10) throw Error(u(188));
  }
  function m(e10, t10, n10, r10, l10, a10) {
    for (; null !== e10; ) {
      if ((5 === e10.tag || 6 === e10.tag) && n10(e10, r10, l10, a10) || (22 !== e10.tag || null === e10.memoizedState) && (t10 || 5 !== e10.tag) && m(e10.child, t10, n10, r10, l10, a10)) return true;
      e10 = e10.sibling;
    }
    return false;
  }
  function h(e10) {
    for (e10 = e10.return; null !== e10; ) {
      if (3 === e10.tag || 5 === e10.tag) return e10;
      e10 = e10.return;
    }
    return null;
  }
  function g(e10) {
    switch (e10.tag) {
      case 5:
      case 6:
        return e10.stateNode;
      case 3:
        return e10.stateNode.containerInfo;
      default:
        throw Error(u(559));
    }
  }
  var v = null, y = null;
  function b(e10) {
    return v = e10, true;
  }
  function w(e10, t10, n10) {
    return e10 === n10 || e10 === t10 && (v = e10, true);
  }
  function S(e10, t10, n10) {
    return e10 === n10 ? (y = e10, false) : e10 === t10 && (null !== y && (v = e10), true);
  }
  function k(e10) {
    if (null === e10) return null;
    do
      e10 = null === e10 ? null : e10.return;
    while (e10 && 5 !== e10.tag && 27 !== e10.tag && 3 !== e10.tag);
    return e10 || null;
  }
  function E(e10, t10, n10) {
    for (var r10 = 0, l10 = e10; l10; l10 = n10(l10)) r10++;
    l10 = 0;
    for (var a10 = t10; a10; a10 = n10(a10)) l10++;
    for (; 0 < r10 - l10; ) e10 = n10(e10), r10--;
    for (; 0 < l10 - r10; ) t10 = n10(t10), l10--;
    for (; r10--; ) {
      if (e10 === t10 || null !== t10 && e10 === t10.alternate) return e10;
      e10 = n10(e10), t10 = n10(t10);
    }
    return null;
  }
  var _ = Object.assign, x = Symbol.for("react.element"), P = Symbol.for("react.transitional.element"), N = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), L = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), F = Symbol.for("react.lazy");
  Symbol.for("react.scope");
  var A = Symbol.for("react.activity"), j = Symbol.for("react.legacy_hidden");
  Symbol.for("react.tracing_marker");
  var U = Symbol.for("react.memo_cache_sentinel"), B = Symbol.for("react.view_transition"), V = Symbol.for("react.recoverable"), H = Symbol.iterator;
  function $(e10) {
    return null === e10 || "object" != typeof e10 ? null : "function" == typeof (e10 = H && e10[H] || e10["@@iterator"]) ? e10 : null;
  }
  var Q = Symbol.for("react.client.reference"), W = Array.isArray, q = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = { pending: false, data: null, method: null, action: null }, G = [], Y = -1;
  function J(e10) {
    return { current: e10 };
  }
  function Z(e10) {
    0 > Y || (e10.current = G[Y], G[Y] = null, Y--);
  }
  function ee(e10, t10) {
    G[++Y] = e10.current, e10.current = t10;
  }
  var et = J(null), en = J(null), er = J(null), el = J(null);
  function ea(e10, t10) {
    switch (ee(er, t10), ee(en, e10), ee(et, null), t10.nodeType) {
      case 9:
      case 11:
        e10 = (e10 = t10.documentElement) && (e10 = e10.namespaceURI) ? cm(e10) : 0;
        break;
      default:
        if (e10 = t10.tagName, t10 = t10.namespaceURI) e10 = ch(t10 = cm(t10), e10);
        else switch (e10) {
          case "svg":
            e10 = 1;
            break;
          case "math":
            e10 = 2;
            break;
          default:
            e10 = 0;
        }
    }
    Z(et), ee(et, e10);
  }
  function eo() {
    Z(et), Z(en), Z(er);
  }
  function ei(e10) {
    var t10 = e10.memoizedState;
    null !== t10 && (fP._currentValue = t10.memoizedState, ee(el, e10));
    var n10 = ch(t10 = et.current, e10.type);
    t10 !== n10 && (ee(en, e10), ee(et, n10));
  }
  function eu(e10) {
    en.current === e10 && (Z(et), Z(en)), el.current === e10 && (Z(el), fP._currentValue = K);
  }
  function es(e10) {
    if (void 0 === tY) try {
      throw Error();
    } catch (e11) {
      var t10 = e11.stack.trim().match(/\n( *(at )?)/);
      tY = t10 && t10[1] || "", tJ = -1 < e11.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e11.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return "\n" + tY + e10 + tJ;
  }
  var ec = false;
  function ef(e10, t10) {
    if (!e10 || ec) return "";
    ec = true;
    var n10 = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r10 = { DetermineComponentFrameRoot: function() {
        try {
          if (t10) {
            var n11 = function() {
              throw Error();
            };
            if (Object.defineProperty(n11.prototype, "props", { set: function() {
              throw Error();
            } }), "object" == typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(n11, []);
              } catch (e11) {
                var r11 = e11;
              }
              Reflect.construct(e10, [], n11);
            } else {
              try {
                n11.call();
              } catch (e11) {
                r11 = e11;
              }
              n11 = false;
              try {
                var l11 = Object.getOwnPropertyDescriptor(e10.prototype, "props");
                Object.defineProperty(e10.prototype, "props", { configurable: true, set: function() {
                  throw Error();
                } }), n11 = true, new e10();
              } finally {
                n11 && (void 0 !== l11 ? Object.defineProperty(e10.prototype, "props", l11) : delete e10.prototype.props);
              }
            }
          } else {
            try {
              throw Error();
            } catch (e11) {
              r11 = e11;
            }
            (n11 = e10()) && "function" == typeof n11.catch && n11.catch(function() {
            });
          }
        } catch (e11) {
          if (e11 && r11 && "string" == typeof e11.stack) return [e11.stack, r11.stack];
        }
        return [null, null];
      } };
      r10.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l10 = Object.getOwnPropertyDescriptor(r10.DetermineComponentFrameRoot, "name");
      l10 && l10.configurable && Object.defineProperty(r10.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var a10 = r10.DetermineComponentFrameRoot(), o10 = a10[0], i10 = a10[1];
      if (o10 && i10) {
        var u10 = o10.split("\n"), s10 = i10.split("\n");
        for (l10 = r10 = 0; r10 < u10.length && !u10[r10].includes("DetermineComponentFrameRoot"); ) r10++;
        for (; l10 < s10.length && !s10[l10].includes("DetermineComponentFrameRoot"); ) l10++;
        if (r10 === u10.length || l10 === s10.length) for (r10 = u10.length - 1, l10 = s10.length - 1; 1 <= r10 && 0 <= l10 && u10[r10] !== s10[l10]; ) l10--;
        for (; 1 <= r10 && 0 <= l10; r10--, l10--) if (u10[r10] !== s10[l10]) {
          if (1 !== r10 || 1 !== l10) do
            if (r10--, l10--, 0 > l10 || u10[r10] !== s10[l10]) {
              var c10 = "\n" + u10[r10].replace(" at new ", " at ");
              return e10.displayName && c10.includes("<anonymous>") && (c10 = c10.replace("<anonymous>", e10.displayName)), c10;
            }
          while (1 <= r10 && 0 <= l10);
          break;
        }
      }
    } finally {
      ec = false, Error.prepareStackTrace = n10;
    }
    return (n10 = e10 ? e10.displayName || e10.name : "") ? es(n10) : "";
  }
  function ed(e10) {
    try {
      var t10 = "", n10 = null;
      do
        t10 += (function(e11, t11) {
          switch (e11.tag) {
            case 26:
            case 27:
            case 5:
              return es(e11.type);
            case 16:
              return es("Lazy");
            case 13:
              return e11.child !== t11 && null !== t11 ? es("Suspense Fallback") : es("Suspense");
            case 19:
              return es("SuspenseList");
            case 0:
            case 15:
              return ef(e11.type, false);
            case 11:
              return ef(e11.type.render, false);
            case 1:
              return ef(e11.type, true);
            case 31:
              return es("Activity");
            case 30:
              return es("ViewTransition");
            default:
              return "";
          }
        })(e10, n10), n10 = e10, e10 = e10.return;
      while (e10);
      return t10;
    } catch (e11) {
      return "\nError generating stack: " + e11.message + "\n" + e11.stack;
    }
  }
  var ep = Object.prototype.hasOwnProperty, em = a.unstable_scheduleCallback, eh = a.unstable_cancelCallback, eg = a.unstable_shouldYield, ev = a.unstable_requestPaint, ey = a.unstable_now, eb = a.unstable_getCurrentPriorityLevel, ew = a.unstable_ImmediatePriority, eS = a.unstable_UserBlockingPriority, ek = a.unstable_NormalPriority, eE = a.unstable_LowPriority, e_ = a.unstable_IdlePriority, ex = (a.log, a.unstable_setDisableYieldValue, null), eP = null, eN = Math.clz32 ? Math.clz32 : function(e10) {
    return 0 == (e10 >>>= 0) ? 32 : 31 - (eC(e10) / eT | 0) | 0;
  }, eC = Math.log, eT = Math.LN2, eO = 256, ez = 262144, eL = 4194304;
  function eR(e10) {
    var t10 = 42 & e10;
    if (0 !== t10) return t10;
    switch (e10 & -e10) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return 261888 & e10;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return 3932160 & e10;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return 62914560 & e10;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e10;
    }
  }
  function eM(e10, t10, n10) {
    var r10 = e10.pendingLanes;
    if (0 === r10) return 0;
    var l10 = 0, a10 = e10.suspendedLanes, o10 = e10.pingedLanes;
    e10 = e10.warmLanes;
    var i10 = 134217727 & r10;
    return 0 !== i10 ? 0 != (r10 = i10 & ~a10) ? l10 = eR(r10) : 0 != (o10 &= i10) ? l10 = eR(o10) : n10 || 0 != (n10 = i10 & ~e10) && (l10 = eR(n10)) : 0 != (i10 = r10 & ~a10) ? l10 = eR(i10) : 0 !== o10 ? l10 = eR(o10) : n10 || 0 != (n10 = r10 & ~e10) && (l10 = eR(n10)), 0 === l10 ? 0 : 0 !== t10 && t10 !== l10 && 0 == (t10 & a10) && ((a10 = l10 & -l10) >= (n10 = t10 & -t10) || 32 === a10 && 0 != (4194048 & n10)) ? t10 : l10;
  }
  function eI(e10, t10) {
    return 0 == (e10.pendingLanes & ~(e10.suspendedLanes & ~e10.pingedLanes) & t10);
  }
  function eD() {
    var e10 = eL;
    return 0 == (62914560 & (eL <<= 1)) && (eL = 4194304), e10;
  }
  function eF(e10) {
    for (var t10 = [], n10 = 0; 31 > n10; n10++) t10.push(e10);
    return t10;
  }
  function eA(e10, t10) {
    e10.pendingLanes |= t10, 268435456 !== t10 && (e10.suspendedLanes = 0, e10.pingedLanes = 0, e10.warmLanes = 0);
  }
  function ej(e10, t10, n10) {
    e10.pendingLanes |= t10, e10.suspendedLanes &= ~t10;
    var r10 = 31 - eN(t10);
    e10.entangledLanes |= t10, e10.entanglements[r10] = 1073741824 | e10.entanglements[r10] | 261930 & n10;
  }
  function eU(e10, t10) {
    var n10 = e10.entangledLanes |= t10;
    for (e10 = e10.entanglements; n10; ) {
      var r10 = 31 - eN(n10), l10 = 1 << r10;
      l10 & t10 | e10[r10] & t10 && (e10[r10] |= t10), n10 &= ~l10;
    }
  }
  function eB(e10, t10) {
    var n10 = t10 & -t10;
    return 0 != ((n10 = 0 != (42 & n10) ? 1 : eV(n10)) & (e10.suspendedLanes | t10)) ? 0 : n10;
  }
  function eV(e10) {
    switch (e10) {
      case 2:
        e10 = 1;
        break;
      case 8:
        e10 = 4;
        break;
      case 32:
        e10 = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e10 = 128;
        break;
      case 268435456:
        e10 = 134217728;
        break;
      default:
        e10 = 0;
    }
    return e10;
  }
  function eH(e10) {
    return 2 < (e10 &= -e10) ? 8 < e10 ? 0 != (134217727 & e10) ? 32 : 268435456 : 8 : 2;
  }
  function e$() {
    var e10 = X.p;
    return 0 !== e10 ? e10 : void 0 === (e10 = window.event) ? 32 : fB(e10.type);
  }
  function eQ(e10, t10) {
    var n10 = X.p;
    try {
      return X.p = e10, t10();
    } finally {
      X.p = n10;
    }
  }
  var eW = Math.random().toString(36).slice(2), eq = "__reactFiber$" + eW, eX = "__reactProps$" + eW, eK = "__reactContainer$" + eW, eG = "__reactEvents$" + eW, eY = "__reactListeners$" + eW, eJ = "__reactHandles$" + eW, eZ = "__reactResources$" + eW, e0 = "__reactMarker$" + eW, e1 = "__reactLoad$" + eW;
  function e2(e10) {
    delete e10[eq], delete e10[eX], delete e10[eY], delete e10[eJ];
  }
  function e3(e10) {
    var t10;
    if (t10 = e10[eq]) return t10;
    for (var n10 = e10.parentNode; n10; ) {
      if (t10 = n10[eK] || n10[eq]) {
        if (n10 = t10.alternate, null !== t10.child || null !== n10 && null !== n10.child) for (e10 = c2(e10); null !== e10; ) {
          if (n10 = e10[eq]) return n10;
          e10 = c2(e10);
        }
        return t10;
      }
      n10 = (e10 = n10).parentNode;
    }
    return null;
  }
  function e4(e10) {
    if (e10 = e10[eq] || e10[eK]) {
      var t10 = e10.tag;
      if (5 === t10 || 6 === t10 || 13 === t10 || 31 === t10 || 26 === t10 || 27 === t10 || 3 === t10) return e10;
    }
    return null;
  }
  function e6(e10) {
    var t10 = e10.tag;
    if (5 === t10 || 26 === t10 || 27 === t10 || 6 === t10) return e10.stateNode;
    throw Error(u(33));
  }
  function e5(e10) {
    var t10 = e10[eZ];
    return t10 || (t10 = e10[eZ] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t10;
  }
  function e8(e10) {
    e10[e0] = true;
  }
  function e7(e10) {
    e10[e1] = void 0;
  }
  var e9 = /* @__PURE__ */ new Set(), te = {};
  function tt(e10, t10) {
    tn(e10, t10), tn(e10 + "Capture", t10);
  }
  function tn(e10, t10) {
    for (te[e10] = t10, e10 = 0; e10 < t10.length; e10++) e9.add(t10[e10]);
  }
  var tr = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), tl = {}, ta = {}, to = false;
  function ti() {
    var e10 = to;
    return to = false, e10;
  }
  function tu(e10, t10, n10) {
    if (ep.call(ta, t10) || !ep.call(tl, t10) && (tr.test(t10) ? ta[t10] = true : (tl[t10] = true, false))) if (null === n10) e10.removeAttribute(t10);
    else {
      switch (typeof n10) {
        case "undefined":
        case "function":
        case "symbol":
          e10.removeAttribute(t10);
          return;
        case "boolean":
          var r10 = t10.toLowerCase().slice(0, 5);
          if ("data-" !== r10 && "aria-" !== r10) return void e10.removeAttribute(t10);
      }
      e10.setAttribute(t10, n10);
    }
  }
  function ts(e10, t10, n10) {
    if (null === n10) e10.removeAttribute(t10);
    else {
      switch (typeof n10) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e10.removeAttribute(t10);
          return;
      }
      e10.setAttribute(t10, n10);
    }
  }
  function tc(e10, t10, n10, r10) {
    if (null === r10) e10.removeAttribute(n10);
    else {
      switch (typeof r10) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e10.removeAttribute(n10);
          return;
      }
      e10.setAttributeNS(t10, n10, r10);
    }
  }
  function tf(e10) {
    switch (typeof e10) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
      case "object":
        return e10;
      default:
        return "";
    }
  }
  function td(e10) {
    var t10 = e10.type;
    return (e10 = e10.nodeName) && "input" === e10.toLowerCase() && ("checkbox" === t10 || "radio" === t10);
  }
  function tp(e10) {
    if (!e10._valueTracker) {
      var t10 = td(e10) ? "checked" : "value";
      e10._valueTracker = (function(e11, t11, n10) {
        var r10 = Object.getOwnPropertyDescriptor(e11.constructor.prototype, t11);
        if (!e11.hasOwnProperty(t11) && void 0 !== r10 && "function" == typeof r10.get && "function" == typeof r10.set) {
          var l10 = r10.get, a10 = r10.set;
          return Object.defineProperty(e11, t11, { configurable: true, get: function() {
            return l10.call(this);
          }, set: function(e12) {
            n10 = "" + e12, a10.call(this, e12);
          } }), Object.defineProperty(e11, t11, { enumerable: r10.enumerable }), { getValue: function() {
            return n10;
          }, setValue: function(e12) {
            n10 = "" + e12;
          }, stopTracking: function() {
            e11._valueTracker = null, delete e11[t11];
          } };
        }
      })(e10, t10, "" + e10[t10]);
    }
  }
  function tm(e10) {
    if (!e10) return false;
    var t10 = e10._valueTracker;
    if (!t10) return true;
    var n10 = t10.getValue(), r10 = "";
    return e10 && (r10 = td(e10) ? e10.checked ? "true" : "false" : e10.value), (e10 = r10) !== n10 && (t10.setValue(e10), true);
  }
  var th = /[\n"\\]/g;
  function tg(e10) {
    return e10.replace(th, function(e11) {
      return "\\" + e11.charCodeAt(0).toString(16) + " ";
    });
  }
  function tv(e10, t10, n10, r10, l10, a10, o10, i10) {
    e10.name = "", null != o10 && "function" != typeof o10 && "symbol" != typeof o10 && "boolean" != typeof o10 ? e10.type = o10 : e10.removeAttribute("type"), null != t10 ? "number" === o10 ? (0 === t10 && "" === e10.value || e10.value != t10) && (e10.value = "" + tf(t10)) : e10.value !== "" + tf(t10) && (e10.value = "" + tf(t10)) : "submit" !== o10 && "reset" !== o10 || e10.removeAttribute("value"), null != t10 ? "number" === o10 && e10.value == t10 ? tb(e10, tf(e10.value)) : tb(e10, tf(t10)) : null != n10 ? tb(e10, tf(n10)) : null != r10 && e10.removeAttribute("value"), null == l10 && null != a10 && (e10.defaultChecked = !!a10), null != l10 && (e10.checked = l10 && "function" != typeof l10 && "symbol" != typeof l10), null != i10 && "function" != typeof i10 && "symbol" != typeof i10 && "boolean" != typeof i10 ? e10.name = "" + tf(i10) : e10.removeAttribute("name");
  }
  function ty(e10, t10, n10, r10, l10, a10, o10, i10) {
    if (null != a10 && "function" != typeof a10 && "symbol" != typeof a10 && "boolean" != typeof a10 && (e10.type = a10), null != t10 || null != n10) {
      if (("submit" === a10 || "reset" === a10) && null == t10) return void tp(e10);
      n10 = null != n10 ? "" + tf(n10) : "", t10 = null != t10 ? "" + tf(t10) : n10, i10 || t10 === e10.value || (e10.value = t10), e10.defaultValue = t10;
    }
    r10 = "function" != typeof (r10 = null != r10 ? r10 : l10) && "symbol" != typeof r10 && !!r10, e10.checked = i10 ? e10.checked : !!r10, e10.defaultChecked = !!r10, null != o10 && "function" != typeof o10 && "symbol" != typeof o10 && "boolean" != typeof o10 && (e10.name = o10), tp(e10);
  }
  function tb(e10, t10) {
    e10.defaultValue !== "" + t10 && (e10.defaultValue = "" + t10);
  }
  function tw(e10, t10, n10, r10) {
    if (e10 = e10.options, t10) {
      t10 = {};
      for (var l10 = 0; l10 < n10.length; l10++) t10["$" + n10[l10]] = true;
      for (n10 = 0; n10 < e10.length; n10++) l10 = t10.hasOwnProperty("$" + e10[n10].value), e10[n10].selected !== l10 && (e10[n10].selected = l10), l10 && r10 && (e10[n10].defaultSelected = true);
    } else {
      for (n10 = "" + tf(n10), t10 = null, l10 = 0; l10 < e10.length; l10++) {
        if (e10[l10].value === n10) {
          e10[l10].selected = true, r10 && (e10[l10].defaultSelected = true);
          return;
        }
        null !== t10 || e10[l10].disabled || (t10 = e10[l10]);
      }
      null !== t10 && (t10.selected = true);
    }
  }
  function tS(e10, t10, n10) {
    if (null != t10 && ((t10 = "" + tf(t10)) !== e10.value && (e10.value = t10), null == n10)) {
      e10.defaultValue !== t10 && (e10.defaultValue = t10);
      return;
    }
    e10.defaultValue = null != n10 ? "" + tf(n10) : "";
  }
  function tk(e10, t10, n10, r10) {
    if (null == t10) {
      if (null != r10) {
        if (null != n10) throw Error(u(92));
        if (W(r10)) {
          if (1 < r10.length) throw Error(u(93));
          r10 = r10[0];
        }
        n10 = r10;
      }
      null == n10 && (n10 = ""), t10 = n10;
    }
    e10.defaultValue = n10 = tf(t10), (r10 = e10.textContent) === n10 && "" !== r10 && null !== r10 && (e10.value = r10), tp(e10);
  }
  function tE(e10, t10) {
    if (t10) {
      var n10 = e10.firstChild;
      if (n10 && n10 === e10.lastChild && 3 === n10.nodeType) {
        n10.nodeValue = t10;
        return;
      }
    }
    e10.textContent = t10;
  }
  var t_ = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function tx(e10, t10, n10) {
    var r10 = 0 === t10.indexOf("--");
    null == n10 || "boolean" == typeof n10 || "" === n10 ? r10 ? e10.setProperty(t10, "") : "float" === t10 ? e10.cssFloat = "" : e10[t10] = "" : r10 ? e10.setProperty(t10, n10) : "number" != typeof n10 || 0 === n10 || t_.has(t10) ? "float" === t10 ? e10.cssFloat = n10 : e10[t10] = ("" + n10).trim() : e10[t10] = n10 + "px";
  }
  function tP(e10, t10, n10) {
    if (null != t10 && "object" != typeof t10) throw Error(u(62));
    if (e10 = e10.style, null != n10) {
      for (var r10 in n10) !n10.hasOwnProperty(r10) || null != t10 && t10.hasOwnProperty(r10) || (0 === r10.indexOf("--") ? e10.setProperty(r10, "") : "float" === r10 ? e10.cssFloat = "" : e10[r10] = "", to = true);
      for (var l10 in t10) r10 = t10[l10], t10.hasOwnProperty(l10) && n10[l10] !== r10 && (tx(e10, l10, r10), to = true);
    } else for (var a10 in t10) t10.hasOwnProperty(a10) && tx(e10, a10, t10[a10]);
  }
  function tN(e10) {
    if (-1 === e10.indexOf("-")) return false;
    switch (e10) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var tC = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["maskType", "mask-type"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), tT = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function tO(e10) {
    return tT.test("" + e10) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e10;
  }
  function tz() {
  }
  var tL = null;
  function tR(e10) {
    return (e10 = e10.target || e10.srcElement || window).correspondingUseElement && (e10 = e10.correspondingUseElement), 3 === e10.nodeType ? e10.parentNode : e10;
  }
  var tM = null, tI = null;
  function tD(e10) {
    var t10 = e4(e10);
    if (t10 && (e10 = t10.stateNode)) {
      var n10 = e10[eX] || null;
      switch (e10 = t10.stateNode, t10.type) {
        case "input":
          if (tv(e10, n10.value, n10.defaultValue, n10.defaultValue, n10.checked, n10.defaultChecked, n10.type, n10.name), t10 = n10.name, "radio" === n10.type && null != t10) {
            for (n10 = e10; n10.parentNode; ) n10 = n10.parentNode;
            for (n10 = n10.querySelectorAll('input[name="' + tg("" + t10) + '"][type="radio"]'), t10 = 0; t10 < n10.length; t10++) {
              var r10 = n10[t10];
              if (r10 !== e10 && r10.form === e10.form) {
                var l10 = r10[eX] || null;
                if (!l10) throw Error(u(90));
                tv(r10, l10.value, l10.defaultValue, l10.defaultValue, l10.checked, l10.defaultChecked, l10.type, l10.name);
              }
            }
            for (t10 = 0; t10 < n10.length; t10++) (r10 = n10[t10]).form === e10.form && tm(r10);
          }
          break;
        case "textarea":
          tS(e10, n10.value, n10.defaultValue);
          break;
        case "select":
          null != (t10 = n10.value) && tw(e10, !!n10.multiple, t10, false);
      }
    }
  }
  var tF = false;
  function tA(e10, t10, n10) {
    if (tF) return e10(t10, n10);
    tF = true;
    try {
      return e10(t10);
    } finally {
      if (tF = false, (null !== tM || null !== tI) && (so(), tM && (t10 = tM, e10 = tI, tI = tM = null, tD(t10), e10))) for (t10 = 0; t10 < e10.length; t10++) tD(e10[t10]);
    }
  }
  function tj(e10, t10) {
    var n10 = e10.stateNode;
    if (null === n10) return null;
    var r10 = n10[eX] || null;
    if (null === r10) return null;
    switch (n10 = r10[t10], t10) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r10 = !r10.disabled) || (r10 = "button" !== (e10 = e10.type) && "input" !== e10 && "select" !== e10 && "textarea" !== e10), e10 = !r10;
        break;
      default:
        e10 = false;
    }
    if (e10) return null;
    if (n10 && "function" != typeof n10) throw Error(u(231, t10, typeof n10));
    return n10;
  }
  var tU = "u" > typeof window && void 0 !== window.document && void 0 !== window.document.createElement, tB = false;
  if (tU) try {
    var tV = {};
    Object.defineProperty(tV, "passive", { get: function() {
      tB = true;
    } }), window.addEventListener("test", tV, tV), window.removeEventListener("test", tV, tV);
  } catch (e10) {
    tB = false;
  }
  var tH = null, t$ = null, tQ = null;
  function tW() {
    if (tQ) return tQ;
    var e10, t10, n10 = t$, r10 = n10.length, l10 = "value" in tH ? tH.value : tH.textContent, a10 = l10.length;
    for (e10 = 0; e10 < r10 && n10[e10] === l10[e10]; e10++) ;
    var o10 = r10 - e10;
    for (t10 = 1; t10 <= o10 && n10[r10 - t10] === l10[a10 - t10]; t10++) ;
    return tQ = l10.slice(e10, 1 < t10 ? 1 - t10 : void 0);
  }
  function tq(e10) {
    var t10 = e10.keyCode;
    return "charCode" in e10 ? 0 === (e10 = e10.charCode) && 13 === t10 && (e10 = 13) : e10 = t10, 10 === e10 && (e10 = 13), 32 <= e10 || 13 === e10 ? e10 : 0;
  }
  function tX() {
    return true;
  }
  function tK() {
    return false;
  }
  function tG(e10) {
    function t10(t11, n10, r10, l10, a10) {
      for (var o10 in this._reactName = t11, this._targetInst = r10, this.type = n10, this.nativeEvent = l10, this.target = a10, this.currentTarget = null, e10) e10.hasOwnProperty(o10) && (t11 = e10[o10], this[o10] = t11 ? t11(l10) : l10[o10]);
      return this.isDefaultPrevented = (null != l10.defaultPrevented ? l10.defaultPrevented : false === l10.returnValue) ? tX : tK, this.isPropagationStopped = tK, this;
    }
    return _(t10.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var e11 = this.nativeEvent;
      e11 && (e11.preventDefault ? e11.preventDefault() : "unknown" != typeof e11.returnValue && (e11.returnValue = false), this.isDefaultPrevented = tX);
    }, stopPropagation: function() {
      var e11 = this.nativeEvent;
      e11 && (e11.stopPropagation ? e11.stopPropagation() : "unknown" != typeof e11.cancelBubble && (e11.cancelBubble = true), this.isPropagationStopped = tX);
    }, persist: function() {
    }, isPersistent: tX }), t10;
  }
  var tY, tJ, tZ, t0, t1, t2 = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e10) {
    return e10.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, t3 = tG(t2), t4 = _({}, t2, { view: 0, detail: 0 }), t6 = tG(t4), t5 = _({}, t4, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ni, button: 0, buttons: 0, relatedTarget: function(e10) {
    return void 0 === e10.relatedTarget ? e10.fromElement === e10.srcElement ? e10.toElement : e10.fromElement : e10.relatedTarget;
  }, movementX: function(e10) {
    return "movementX" in e10 ? e10.movementX : (e10 !== t1 && (t1 && "mousemove" === e10.type ? (tZ = e10.screenX - t1.screenX, t0 = e10.screenY - t1.screenY) : t0 = tZ = 0, t1 = e10), tZ);
  }, movementY: function(e10) {
    return "movementY" in e10 ? e10.movementY : t0;
  } }), t8 = tG(t5), t7 = tG(_({}, t5, { dataTransfer: 0 })), t9 = tG(_({}, t4, { relatedTarget: 0 })), ne = tG(_({}, t2, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })), nt = tG(_({}, t2, { clipboardData: function(e10) {
    return "clipboardData" in e10 ? e10.clipboardData : window.clipboardData;
  } })), nn = tG(_({}, t2, { data: 0 })), nr = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, nl = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, na = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function no(e10) {
    var t10 = this.nativeEvent;
    return t10.getModifierState ? t10.getModifierState(e10) : !!(e10 = na[e10]) && !!t10[e10];
  }
  function ni() {
    return no;
  }
  var nu = tG(_({}, t4, { key: function(e10) {
    if (e10.key) {
      var t10 = nr[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tq(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? nl[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ni, charCode: function(e10) {
    return "keypress" === e10.type ? tq(e10) : 0;
  }, keyCode: function(e10) {
    return "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  }, which: function(e10) {
    return "keypress" === e10.type ? tq(e10) : "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  } })), ns = tG(_({}, t5, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), nc = tG(_({}, t2, { submitter: 0 })), nf = tG(_({}, t4, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ni })), nd = tG(_({}, t2, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })), np = tG(_({}, t5, { deltaX: function(e10) {
    return "deltaX" in e10 ? e10.deltaX : "wheelDeltaX" in e10 ? -e10.wheelDeltaX : 0;
  }, deltaY: function(e10) {
    return "deltaY" in e10 ? e10.deltaY : "wheelDeltaY" in e10 ? -e10.wheelDeltaY : "wheelDelta" in e10 ? -e10.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), nm = tG(_({}, t2, { newState: 0, oldState: 0 })), nh = [9, 13, 27, 32], ng = tU && "CompositionEvent" in window, nv = null;
  tU && "documentMode" in document && (nv = document.documentMode);
  var ny = tU && "TextEvent" in window && !nv, nb = tU && (!ng || nv && 8 < nv && 11 >= nv), nw = false;
  function nS(e10, t10) {
    switch (e10) {
      case "keyup":
        return -1 !== nh.indexOf(t10.keyCode);
      case "keydown":
        return 229 !== t10.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function nk(e10) {
    return "object" == typeof (e10 = e10.detail) && "data" in e10 ? e10.data : null;
  }
  var nE = false, n_ = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function nx(e10) {
    var t10 = e10 && e10.nodeName && e10.nodeName.toLowerCase();
    return "input" === t10 ? !!n_[e10.type] : "textarea" === t10;
  }
  function nP(e10, t10, n10, r10) {
    tM ? tI ? tI.push(r10) : tI = [r10] : tM = r10, 0 < (t10 = s9(t10, "onChange")).length && (n10 = new t3("onChange", "change", null, n10, r10), e10.push({ event: n10, listeners: t10 }));
  }
  var nN = null, nC = null;
  function nT(e10) {
    s1(e10, 0);
  }
  function nO(e10) {
    if (tm(e6(e10))) return e10;
  }
  function nz(e10, t10) {
    if ("change" === e10) return t10;
  }
  var nL = false;
  if (tU) {
    if (tU) {
      var nR = "oninput" in document;
      if (!nR) {
        var nM = document.createElement("div");
        nM.setAttribute("oninput", "return;"), nR = "function" == typeof nM.oninput;
      }
      r = nR;
    } else r = false;
    nL = r && (!document.documentMode || 9 < document.documentMode);
  }
  function nI() {
    nN && (nN.detachEvent("onpropertychange", nD), nC = nN = null);
  }
  function nD(e10) {
    if ("value" === e10.propertyName && nO(nC)) {
      var t10 = [];
      nP(t10, nC, e10, tR(e10)), tA(nT, t10);
    }
  }
  function nF(e10, t10, n10) {
    "focusin" === e10 ? (nI(), nN = t10, nC = n10, nN.attachEvent("onpropertychange", nD)) : "focusout" === e10 && nI();
  }
  function nA(e10) {
    if ("selectionchange" === e10 || "keyup" === e10 || "keydown" === e10) return nO(nC);
  }
  function nj(e10, t10) {
    if ("click" === e10) return nO(t10);
  }
  function nU(e10, t10) {
    if ("input" === e10 || "change" === e10) return nO(t10);
  }
  var nB = "function" == typeof Object.is ? Object.is : function(e10, t10) {
    return e10 === t10 && (0 !== e10 || 1 / e10 == 1 / t10) || e10 != e10 && t10 != t10;
  };
  function nV(e10, t10) {
    if (nB(e10, t10)) return true;
    if ("object" != typeof e10 || null === e10 || "object" != typeof t10 || null === t10) return false;
    var n10 = Object.keys(e10), r10 = Object.keys(t10);
    if (n10.length !== r10.length) return false;
    for (r10 = 0; r10 < n10.length; r10++) {
      var l10 = n10[r10];
      if (!ep.call(t10, l10) || !nB(e10[l10], t10[l10])) return false;
    }
    return true;
  }
  function nH(e10) {
    if (void 0 === (e10 = e10 || ("u" > typeof document ? document : void 0))) return null;
    try {
      return e10.activeElement || e10.body;
    } catch (t10) {
      return e10.body;
    }
  }
  function n$(e10) {
    for (; e10 && e10.firstChild; ) e10 = e10.firstChild;
    return e10;
  }
  function nQ(e10, t10) {
    var n10, r10 = n$(e10);
    for (e10 = 0; r10; ) {
      if (3 === r10.nodeType) {
        if (n10 = e10 + r10.textContent.length, e10 <= t10 && n10 >= t10) return { node: r10, offset: t10 - e10 };
        e10 = n10;
      }
      e: {
        for (; r10; ) {
          if (r10.nextSibling) {
            r10 = r10.nextSibling;
            break e;
          }
          r10 = r10.parentNode;
        }
        r10 = void 0;
      }
      r10 = n$(r10);
    }
  }
  function nW(e10) {
    e10 = null != e10 && null != e10.ownerDocument && null != e10.ownerDocument.defaultView ? e10.ownerDocument.defaultView : window;
    for (var t10 = nH(e10.document); t10 instanceof e10.HTMLIFrameElement; ) {
      try {
        var n10 = "string" == typeof t10.contentWindow.location.href;
      } catch (e11) {
        n10 = false;
      }
      if (n10) e10 = t10.contentWindow;
      else break;
      t10 = nH(e10.document);
    }
    return t10;
  }
  function nq(e10) {
    var t10 = e10 && e10.nodeName && e10.nodeName.toLowerCase();
    return t10 && ("input" === t10 && ("text" === e10.type || "search" === e10.type || "tel" === e10.type || "url" === e10.type || "password" === e10.type) || "textarea" === t10 || "true" === e10.contentEditable);
  }
  var nX = tU && "documentMode" in document && 11 >= document.documentMode, nK = null, nG = null, nY = null, nJ = false;
  function nZ(e10, t10, n10) {
    var r10 = n10.window === n10 ? n10.document : 9 === n10.nodeType ? n10 : n10.ownerDocument;
    nJ || null == nK || nK !== nH(r10) || (r10 = "selectionStart" in (r10 = nK) && nq(r10) ? { start: r10.selectionStart, end: r10.selectionEnd } : { anchorNode: (r10 = (r10.ownerDocument && r10.ownerDocument.defaultView || window).getSelection()).anchorNode, anchorOffset: r10.anchorOffset, focusNode: r10.focusNode, focusOffset: r10.focusOffset }, nY && nV(nY, r10) || (nY = r10, 0 < (r10 = s9(nG, "onSelect")).length && (t10 = new t3("onSelect", "select", null, t10, n10), e10.push({ event: t10, listeners: r10 }), t10.target = nK)));
  }
  function n0(e10, t10) {
    var n10 = {};
    return n10[e10.toLowerCase()] = t10.toLowerCase(), n10["Webkit" + e10] = "webkit" + t10, n10["Moz" + e10] = "moz" + t10, n10;
  }
  var n1 = { animationend: n0("Animation", "AnimationEnd"), animationiteration: n0("Animation", "AnimationIteration"), animationstart: n0("Animation", "AnimationStart"), transitionrun: n0("Transition", "TransitionRun"), transitionstart: n0("Transition", "TransitionStart"), transitioncancel: n0("Transition", "TransitionCancel"), transitionend: n0("Transition", "TransitionEnd") }, n2 = {}, n3 = {};
  function n4(e10) {
    if (n2[e10]) return n2[e10];
    if (!n1[e10]) return e10;
    var t10, n10 = n1[e10];
    for (t10 in n10) if (n10.hasOwnProperty(t10) && t10 in n3) return n2[e10] = n10[t10];
    return e10;
  }
  tU && (n3 = document.createElement("div").style, "AnimationEvent" in window || (delete n1.animationend.animation, delete n1.animationiteration.animation, delete n1.animationstart.animation), "TransitionEvent" in window || delete n1.transitionend.transition);
  var n6 = n4("animationend"), n5 = n4("animationiteration"), n8 = n4("animationstart"), n7 = n4("transitionrun"), n9 = n4("transitionstart"), re = n4("transitioncancel"), rt = n4("transitionend"), rn = /* @__PURE__ */ new Map(), rr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function rl(e10, t10) {
    rn.set(e10, t10), tt(t10, [e10]);
  }
  rr.push("scrollEnd");
  var ra = 0;
  function ro(e10, t10) {
    return null != e10.name && "auto" !== e10.name ? e10.name : null !== t10.autoName ? t10.autoName : t10.autoName = e10 = "_" + (e10 = uJ.identifierPrefix) + "t_" + (ra++).toString(32) + "_";
  }
  function ri(e10) {
    if (null == e10 || "string" == typeof e10) return e10;
    var t10 = null, n10 = u5;
    if (null !== n10) for (var r10 = 0; r10 < n10.length; r10++) {
      var l10 = e10[n10[r10]];
      if (null != l10) {
        if ("none" === l10) return "none";
        t10 = null == t10 ? l10 : t10 + " " + l10;
      }
    }
    return null == t10 ? e10.default : t10;
  }
  function ru(e10, t10) {
    return e10 = ri(e10), null == (t10 = ri(t10)) ? "auto" === e10 ? null : e10 : "auto" === t10 ? null : t10;
  }
  var rs = "function" == typeof reportError ? reportError : function(e10) {
    if ("object" == typeof window && "function" == typeof window.ErrorEvent) {
      var t10 = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: "object" == typeof e10 && null !== e10 && "string" == typeof e10.message ? String(e10.message) : String(e10), error: e10 });
      if (!window.dispatchEvent(t10)) return;
    } else if ("object" == typeof l.default && "function" == typeof l.default.emit) return void l.default.emit("uncaughtException", e10);
    console.error(e10);
  }, rc = [], rf = 0, rd = 0;
  function rp() {
    for (var e10 = rf, t10 = rd = rf = 0; t10 < e10; ) {
      var n10 = rc[t10];
      rc[t10++] = null;
      var r10 = rc[t10];
      rc[t10++] = null;
      var l10 = rc[t10];
      rc[t10++] = null;
      var a10 = rc[t10];
      if (rc[t10++] = null, null !== r10 && null !== l10) {
        var o10 = r10.pending;
        null === o10 ? l10.next = l10 : (l10.next = o10.next, o10.next = l10), r10.pending = l10;
      }
      0 !== a10 && rv(n10, l10, a10);
    }
  }
  function rm(e10, t10, n10, r10) {
    rc[rf++] = e10, rc[rf++] = t10, rc[rf++] = n10, rc[rf++] = r10, rd |= r10, e10.lanes |= r10, null !== (e10 = e10.alternate) && (e10.lanes |= r10);
  }
  function rh(e10, t10, n10, r10) {
    return rm(e10, t10, n10, r10), ry(e10);
  }
  function rg(e10, t10) {
    return rm(e10, null, null, t10), ry(e10);
  }
  function rv(e10, t10, n10) {
    e10.lanes |= n10;
    var r10 = e10.alternate;
    null !== r10 && (r10.lanes |= n10);
    for (var l10 = false, a10 = e10.return; null !== a10; ) a10.childLanes |= n10, null !== (r10 = a10.alternate) && (r10.childLanes |= n10), 22 === a10.tag && (null === (e10 = a10.stateNode) || 1 & e10._visibility || (l10 = true)), e10 = a10, a10 = a10.return;
    return 3 === e10.tag ? (a10 = e10.stateNode, l10 && null !== t10 && (l10 = 31 - eN(n10), null === (r10 = (e10 = a10.hiddenUpdates)[l10]) ? e10[l10] = [t10] : r10.push(t10), t10.lane = 536870912 | n10), a10) : null;
  }
  function ry(e10) {
    if (50 < u8) throw u8 = 0, u7 = null, Error(u(185));
    for (var t10 = e10.return; null !== t10; ) t10 = (e10 = t10).return;
    return 3 === e10.tag ? e10.stateNode : null;
  }
  var rb = {};
  function rw(e10, t10, n10, r10) {
    this.tag = e10, this.key = n10, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t10, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r10, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rS(e10, t10, n10, r10) {
    return new rw(e10, t10, n10, r10);
  }
  function rk(e10) {
    return !(!(e10 = e10.prototype) || !e10.isReactComponent);
  }
  function rE(e10, t10) {
    var n10 = e10.alternate;
    return null === n10 ? ((n10 = rS(e10.tag, t10, e10.key, e10.mode)).elementType = e10.elementType, n10.type = e10.type, n10.stateNode = e10.stateNode, n10.alternate = e10, e10.alternate = n10) : (n10.pendingProps = t10, n10.type = e10.type, n10.flags = 0, n10.subtreeFlags = 0, n10.deletions = null), n10.flags = 1206910976 & e10.flags, n10.childLanes = e10.childLanes, n10.lanes = e10.lanes, n10.child = e10.child, n10.memoizedProps = e10.memoizedProps, n10.memoizedState = e10.memoizedState, n10.updateQueue = e10.updateQueue, t10 = e10.dependencies, n10.dependencies = null === t10 ? null : { lanes: t10.lanes, firstContext: t10.firstContext }, n10.sibling = e10.sibling, n10.index = e10.index, n10.ref = e10.ref, n10.refCleanup = e10.refCleanup, n10;
  }
  function r_(e10, t10) {
    e10.flags &= 1206910978;
    var n10 = e10.alternate;
    return null === n10 ? (e10.childLanes = 0, e10.lanes = t10, e10.child = null, e10.subtreeFlags = 0, e10.memoizedProps = null, e10.memoizedState = null, e10.updateQueue = null, e10.dependencies = null, e10.stateNode = null) : (e10.childLanes = n10.childLanes, e10.lanes = n10.lanes, e10.child = n10.child, e10.subtreeFlags = 0, e10.deletions = null, e10.memoizedProps = n10.memoizedProps, e10.memoizedState = n10.memoizedState, e10.updateQueue = n10.updateQueue, e10.type = n10.type, e10.dependencies = null === (t10 = n10.dependencies) ? null : { lanes: t10.lanes, firstContext: t10.firstContext }), e10;
  }
  function rx(e10, t10, n10, r10, l10, a10) {
    var o10 = 0;
    if ("function" == typeof (r10 = e10)) rk(r10) && (o10 = 1);
    else if ("string" == typeof r10) o10 = !(function(e11, t11, n11) {
      if (1 === n11 || null != t11.itemProp) return false;
      switch (e11) {
        case "meta":
        case "title":
          return true;
        case "style":
          if ("string" != typeof t11.precedence || "string" != typeof t11.href || "" === t11.href) break;
          return true;
        case "link":
          if ("string" != typeof t11.rel || "string" != typeof t11.href || "" === t11.href || t11.onLoad || t11.onError) break;
          if ("stylesheet" === t11.rel) return e11 = t11.disabled, "string" == typeof t11.precedence && null == e11;
          return true;
        case "script":
          if (t11.async && "function" != typeof t11.async && "symbol" != typeof t11.async && !t11.onLoad && !t11.onError && t11.src && "string" == typeof t11.src) return true;
      }
      return false;
    })(e10, n10, et.current) ? "html" === e10 || "head" === e10 || "body" === e10 ? 27 : 5 : 26;
    else e: switch (r10) {
      case A:
        return (e10 = rS(31, n10, t10, l10)).elementType = A, e10.lanes = a10, e10;
      case C:
        return rP(n10.children, l10, a10, t10);
      case T:
        o10 = 8, l10 |= 24;
        break;
      case O:
        return (e10 = rS(12, n10, t10, 2 | l10)).elementType = O, e10.lanes = a10, e10;
      case M:
        return (e10 = rS(13, n10, t10, l10)).elementType = M, e10.lanes = a10, e10;
      case I:
        return (e10 = rS(19, n10, t10, l10)).elementType = I, e10.lanes = a10, e10;
      case j:
      case B:
        return (e10 = rS(30, n10, t10, e10 = 32 | l10)).elementType = B, e10.lanes = a10, e10.stateNode = { autoName: null, paired: null, clones: null, ref: null }, e10;
      default:
        if ("object" == typeof r10 && null !== r10) switch (r10.$$typeof) {
          case L:
            o10 = 10;
            break e;
          case z:
            o10 = 9;
            break e;
          case R:
            o10 = 11;
            break e;
          case D:
            o10 = 14;
            break e;
          case F:
            o10 = 16, r10 = null;
            break e;
        }
        o10 = 29, n10 = Error(u(130, null === e10 ? "null" : typeof e10, "")), r10 = null;
    }
    return (t10 = rS(o10, n10, t10, l10)).elementType = e10, t10.type = r10, t10.lanes = a10, t10;
  }
  function rP(e10, t10, n10, r10) {
    return (e10 = rS(7, e10, r10, t10)).lanes = n10, e10;
  }
  function rN(e10, t10, n10) {
    return (e10 = rS(6, e10, null, t10)).lanes = n10, e10;
  }
  function rC(e10) {
    var t10 = rS(18, null, null, 0);
    return t10.stateNode = e10, t10;
  }
  function rT(e10, t10, n10) {
    return (t10 = rS(4, null !== e10.children ? e10.children : [], e10.key, t10)).lanes = n10, t10.stateNode = { containerInfo: e10.containerInfo, pendingChildren: null, implementation: e10.implementation }, t10;
  }
  var rO = /* @__PURE__ */ new WeakMap();
  function rz(e10, t10) {
    if ("object" == typeof e10 && null !== e10) {
      var n10 = rO.get(e10);
      return void 0 !== n10 ? n10 : (t10 = { value: e10, source: t10, stack: ed(t10) }, rO.set(e10, t10), t10);
    }
    return { value: e10, source: t10, stack: ed(t10) };
  }
  var rL = [], rR = 0, rM = null, rI = 0, rD = [], rF = 0, rA = null, rj = 1, rU = "";
  function rB(e10, t10) {
    rL[rR++] = rI, rL[rR++] = rM, rM = e10, rI = t10;
  }
  function rV(e10, t10, n10) {
    rD[rF++] = rj, rD[rF++] = rU, rD[rF++] = rA, rA = e10;
    var r10 = rj;
    e10 = rU;
    var l10 = 32 - eN(r10) - 1;
    r10 &= ~(1 << l10), n10 += 1;
    var a10 = 32 - eN(t10) + l10;
    if (30 < a10) {
      var o10 = l10 - l10 % 5;
      a10 = (r10 & (1 << o10) - 1).toString(32), r10 >>= o10, l10 -= o10, rj = 1 << 32 - eN(t10) + l10 | n10 << l10 | r10, rU = a10 + e10;
    } else rj = 1 << a10 | n10 << l10 | r10, rU = e10;
  }
  function rH(e10) {
    null !== e10.return && (rB(e10, 1), rV(e10, 1, 0));
  }
  function r$(e10) {
    for (; e10 === rM; ) rM = rL[--rR], rL[rR] = null, rI = rL[--rR], rL[rR] = null;
    for (; e10 === rA; ) rA = rD[--rF], rD[rF] = null, rU = rD[--rF], rD[rF] = null, rj = rD[--rF], rD[rF] = null;
  }
  function rQ(e10, t10) {
    rD[rF++] = rj, rD[rF++] = rU, rD[rF++] = rA, rj = t10.id, rU = t10.overflow, rA = e10;
  }
  var rW = null, rq = null, rX = false, rK = null, rG = false, rY = Error(u(519));
  function rJ(e10) {
    var t10 = Error(u(418, 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML", ""));
    throw r4(rz(t10, e10)), rY;
  }
  function rZ(e10) {
    var t10 = e10.stateNode, n10 = e10.type, r10 = e10.memoizedProps;
    switch (t10[eq] = e10, t10[eX] = r10, n10) {
      case "dialog":
        s2("cancel", t10), s2("close", t10);
        break;
      case "iframe":
      case "object":
      case "embed":
        s2("load", t10);
        break;
      case "video":
      case "audio":
        for (n10 = 0; n10 < sZ.length; n10++) s2(sZ[n10], t10);
        break;
      case "source":
        s2("error", t10);
        break;
      case "img":
      case "image":
      case "link":
        s2("error", t10), s2("load", t10);
        break;
      case "details":
        s2("toggle", t10);
        break;
      case "input":
        s2("invalid", t10), ty(t10, r10.value, r10.defaultValue, r10.checked, r10.defaultChecked, r10.type, r10.name, true);
        break;
      case "select":
        s2("invalid", t10);
        break;
      case "textarea":
        s2("invalid", t10), tk(t10, r10.value, r10.defaultValue, r10.children);
    }
    "string" != typeof (n10 = r10.children) && "number" != typeof n10 && "bigint" != typeof n10 || t10.textContent === "" + n10 || true === r10.suppressHydrationWarning || ca(t10.textContent, n10) ? (null != r10.popover && (s2("beforetoggle", t10), s2("toggle", t10)), null != r10.onScroll && s2("scroll", t10), null != r10.onScrollEnd && s2("scrollend", t10), null != r10.onClick && (t10.onclick = tz), t10 = true) : t10 = false, t10 || rJ(e10, true);
  }
  function r0(e10) {
    for (rW = e10.return; rW; ) switch (rW.tag) {
      case 5:
      case 31:
      case 13:
        rG = false;
        return;
      case 27:
      case 3:
        rG = true;
        return;
      default:
        rW = rW.return;
    }
  }
  function r1(e10) {
    if (e10 !== rW) return false;
    if (!rX) return r0(e10), rX = true, false;
    var t10, n10 = e10.tag;
    if ((t10 = 3 !== n10 && 27 !== n10) && ((t10 = 5 === n10) && (t10 = "form" === (t10 = e10.type) || "button" === t10 || cg(e10.type, e10.memoizedProps)), t10 = !t10), t10 && rq && rJ(e10), r0(e10), 13 === n10) {
      if (!(e10 = null !== (e10 = e10.memoizedState) ? e10.dehydrated : null)) throw Error(u(317));
      rq = c1(e10);
    } else if (31 === n10) {
      if (!(e10 = null !== (e10 = e10.memoizedState) ? e10.dehydrated : null)) throw Error(u(317));
      rq = c1(e10);
    } else 27 === n10 ? (n10 = rq, cE(e10.type) ? (e10 = c0, c0 = null, rq = e10) : rq = n10) : rq = rW ? cZ(e10.stateNode.nextSibling) : null;
    return true;
  }
  function r2() {
    rq = rW = null, rX = false;
  }
  function r3() {
    var e10 = rK;
    return null !== e10 && (null === u$ ? u$ = e10 : u$.push.apply(u$, e10), rK = null), e10;
  }
  function r4(e10) {
    null === rK ? rK = [e10] : rK.push(e10);
  }
  var r6 = J(null), r5 = null, r8 = null;
  function r7(e10, t10, n10) {
    ee(r6, t10._currentValue), t10._currentValue = n10;
  }
  function r9(e10) {
    e10._currentValue = r6.current, Z(r6);
  }
  function le(e10, t10, n10) {
    for (; null !== e10; ) {
      var r10 = e10.alternate;
      if ((e10.childLanes & t10) !== t10 ? (e10.childLanes |= t10, null !== r10 && (r10.childLanes |= t10)) : null !== r10 && (r10.childLanes & t10) !== t10 && (r10.childLanes |= t10), e10 === n10) break;
      e10 = e10.return;
    }
  }
  function lt(e10, t10, n10, r10) {
    var l10 = e10.child;
    for (null !== l10 && (l10.return = e10); null !== l10; ) {
      var a10 = l10.dependencies;
      if (null !== a10) {
        var o10 = l10.child;
        a10 = a10.firstContext;
        e: for (; null !== a10; ) {
          var i10 = a10;
          a10 = l10;
          for (var s10 = 0; s10 < t10.length; s10++) if (i10.context === t10[s10]) {
            a10.lanes |= n10, null !== (i10 = a10.alternate) && (i10.lanes |= n10), le(a10.return, n10, e10), r10 || (o10 = null);
            break e;
          }
          a10 = i10.next;
        }
      } else if (18 === l10.tag) {
        if (null === (o10 = l10.return)) throw Error(u(341));
        o10.lanes |= n10, null !== (a10 = o10.alternate) && (a10.lanes |= n10), le(o10, n10, e10), o10 = null;
      } else 13 === l10.tag && null !== l10.memoizedState && null === l10.memoizedState.dehydrated ? (l10.lanes |= n10, null !== (o10 = l10.alternate) && (o10.lanes |= n10), le(l10.return, n10, e10), o10 = null !== (o10 = l10.child) ? o10.sibling : null) : o10 = l10.child;
      if (null !== o10) o10.return = l10;
      else for (o10 = l10; null !== o10; ) {
        if (o10 === e10) {
          o10 = null;
          break;
        }
        if (null !== (l10 = o10.sibling)) {
          l10.return = o10.return, o10 = l10;
          break;
        }
        o10 = o10.return;
      }
      l10 = o10;
    }
  }
  function ln(e10, t10, n10, r10) {
    e10 = null;
    for (var l10 = t10, a10 = false; null !== l10; ) {
      if (!a10) {
        if (0 != (524288 & l10.flags)) a10 = true;
        else if (0 != (262144 & l10.flags)) break;
      }
      if (10 === l10.tag) {
        var o10 = l10.alternate;
        if (null === o10) throw Error(u(387));
        if (null !== (o10 = o10.memoizedProps)) {
          var i10 = l10.type;
          nB(l10.pendingProps.value, o10.value) || (null !== e10 ? e10.push(i10) : e10 = [i10]);
        }
      } else if (l10 === el.current) {
        if (null === (o10 = l10.alternate)) throw Error(u(387));
        o10.memoizedState.memoizedState !== l10.memoizedState.memoizedState && (null !== e10 ? e10.push(fP) : e10 = [fP]);
      }
      l10 = l10.return;
    }
    return null !== e10 && lt(t10, e10, n10, r10), t10.flags |= 262144, null !== e10;
  }
  function lr(e10) {
    for (e10 = e10.firstContext; null !== e10; ) {
      if (!nB(e10.context._currentValue, e10.memoizedValue)) return true;
      e10 = e10.next;
    }
    return false;
  }
  function ll(e10) {
    r5 = e10, r8 = null, null !== (e10 = e10.dependencies) && (e10.firstContext = null);
  }
  function la(e10) {
    return li(r5, e10);
  }
  function lo(e10, t10) {
    return null === r5 && ll(e10), li(e10, t10);
  }
  function li(e10, t10) {
    var n10 = t10._currentValue;
    if (t10 = { context: t10, memoizedValue: n10, next: null }, null === r8) {
      if (null === e10) throw Error(u(308));
      r8 = t10, e10.dependencies = { lanes: 0, firstContext: t10 }, e10.flags |= 524288;
    } else r8 = r8.next = t10;
    return n10;
  }
  var lu = "u" > typeof AbortController ? AbortController : function() {
    var e10 = [], t10 = this.signal = { aborted: false, addEventListener: function(t11, n10) {
      e10.push(n10);
    } };
    this.abort = function() {
      t10.aborted = true, e10.forEach(function(e11) {
        return e11();
      });
    };
  }, ls = a.unstable_scheduleCallback, lc = a.unstable_NormalPriority, lf = { $$typeof: L, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function ld() {
    return { controller: new lu(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function lp(e10) {
    e10.refCount--, 0 === e10.refCount && ls(lc, function() {
      e10.controller.abort();
    });
  }
  function lm(e10, t10) {
    if (0 != (4194048 & e10.pendingLanes)) {
      var n10 = e10.transitionTypes;
      for (null === n10 && (n10 = e10.transitionTypes = []), e10 = 0; e10 < t10.length; e10++) {
        var r10 = t10[e10];
        -1 === n10.indexOf(r10) && n10.push(r10);
      }
    }
  }
  var lh = null, lg = null, lv = 0, ly = 0, lb = null;
  function lw() {
    if (0 == --lv && (lh = null, null !== lg)) {
      null !== lb && (lb.status = "fulfilled");
      var e10 = lg;
      lg = null, ly = 0, lb = null;
      for (var t10 = 0; t10 < e10.length; t10++) (0, e10[t10])();
    }
  }
  var lS = q.S;
  q.S = function(e10, t10) {
    if (uq = ey(), "object" == typeof t10 && null !== t10 && "function" == typeof t10.then && (function(e11) {
      if (null === lg) {
        var t11 = lg = [];
        lv = 0, ly = sK(), lb = { status: "pending", value: void 0, then: function(e12) {
          t11.push(e12);
        } };
      }
      lv++, e11.then(lw, lw);
    })(t10), null !== lh) for (var n10 = sD; null !== n10; ) lm(n10, lh), n10 = n10.next;
    if (null !== (n10 = e10.types)) {
      for (var r10 = sD; null !== r10; ) lm(r10, n10), r10 = r10.next;
      if (0 !== ly) {
        null === (r10 = lh) && (r10 = lh = []);
        for (var l10 = 0; l10 < n10.length; l10++) {
          var a10 = n10[l10];
          -1 === r10.indexOf(a10) && r10.push(a10);
        }
      }
    }
    null !== lS && lS(e10, t10);
  };
  var lk = J(null);
  function lE() {
    var e10 = lk.current;
    return null !== e10 ? e10 : uC.pooledCache;
  }
  function l_(e10, t10) {
    null === t10 ? ee(lk, lk.current) : ee(lk, t10.pool);
  }
  function lx() {
    var e10 = lE();
    return null === e10 ? null : { parent: lf._currentValue, pool: e10 };
  }
  var lP = Error(u(460)), lN = Error(u(474)), lC = Error(u(542)), lT = { then: function() {
  } };
  function lO(e10) {
    return "fulfilled" === (e10 = e10.status) || "rejected" === e10;
  }
  function lz(e10, t10, n10) {
    switch (void 0 === (n10 = e10[n10]) ? e10.push(t10) : n10 !== t10 && (t10.then(tz, tz), t10 = n10), t10.status) {
      case "fulfilled":
        return t10.value;
      case "rejected":
        if (lI(e10 = t10.reason), void 0 === e10 && !("reason" in t10)) throw Error(u(600));
        throw e10;
      default:
        if ("string" == typeof t10.status) t10.then(tz, tz);
        else {
          if (null !== (e10 = uC) && 100 < e10.shellSuspendCounter) throw Error(u(482));
          (e10 = t10).status = "pending", e10.then(function(e11) {
            if ("pending" === t10.status) {
              var n11 = t10;
              n11.status = "fulfilled", n11.value = e11;
            }
          }, function(e11) {
            if ("pending" === t10.status) {
              var n11 = t10;
              n11.status = "rejected", n11.reason = e11;
            }
          });
        }
        switch (t10.status) {
          case "fulfilled":
            return t10.value;
          case "rejected":
            throw lI(e10 = t10.reason), e10;
        }
        throw lR = t10, lP;
    }
  }
  function lL(e10) {
    try {
      return (0, e10._init)(e10._payload);
    } catch (e11) {
      if (null !== e11 && "object" == typeof e11 && "function" == typeof e11.then) throw lR = e11, lP;
      throw e11;
    }
  }
  var lR = null;
  function lM() {
    if (null === lR) throw Error(u(459));
    var e10 = lR;
    return lR = null, e10;
  }
  function lI(e10) {
    if (e10 === lP || e10 === lC) throw Error(u(483));
  }
  var lD = null, lF = 0;
  function lA(e10) {
    var t10 = lF;
    return lF += 1, null === lD && (lD = []), lz(lD, e10, t10);
  }
  function lj(e10, t10) {
    e10.ref = void 0 !== (t10 = t10.props.ref) ? t10 : null;
  }
  function lU(e10, t10) {
    if (t10.$$typeof === x) throw Error(u(525));
    throw Error(u(31, "[object Object]" === (e10 = Object.prototype.toString.call(t10)) ? "object with keys {" + Object.keys(t10).join(", ") + "}" : e10));
  }
  function lB(e10) {
    function t10(t11, n11) {
      if (e10) {
        var r11 = t11.deletions;
        null === r11 ? (t11.deletions = [n11], t11.flags |= 16) : r11.push(n11);
      }
    }
    function n10(n11, r11) {
      if (!e10) return null;
      for (; null !== r11; ) t10(n11, r11), r11 = r11.sibling;
      return null;
    }
    function r10(e11) {
      for (var t11 = /* @__PURE__ */ new Map(); null !== e11; ) null === e11.key ? t11.set(e11.index, e11) : t11.set(e11.key, e11), e11 = e11.sibling;
      return t11;
    }
    function l10(e11, t11) {
      return (e11 = rE(e11, t11)).index = 0, e11.sibling = null, e11;
    }
    function a10(t11, n11, r11) {
      return (t11.index = r11, e10) ? null !== (r11 = t11.alternate) ? (r11 = r11.index) < n11 ? (t11.flags |= 2, n11) : r11 : (t11.flags |= 134217730, n11) : (t11.flags |= 1048576, n11);
    }
    function o10(t11) {
      return e10 && null === t11.alternate && (t11.flags |= 134217730), t11;
    }
    function i10(e11, t11, n11, r11) {
      return null === t11 || 6 !== t11.tag ? (t11 = rN(n11, e11.mode, r11)).return = e11 : (t11 = l10(t11, n11)).return = e11, t11;
    }
    function s10(e11, t11, n11, r11) {
      var a11 = n11.type;
      return a11 === C ? (lj(e11 = f10(e11, t11, n11.props.children, r11, n11.key), n11), e11) : (null !== t11 && (t11.elementType === a11 || "object" == typeof a11 && null !== a11 && a11.$$typeof === F && lL(a11) === t11.type) ? lj(t11 = l10(t11, n11.props), n11) : lj(t11 = rx(n11.type, n11.key, n11.props, null, e11.mode, r11), n11), t11.return = e11, t11);
    }
    function c10(e11, t11, n11, r11) {
      return null === t11 || 4 !== t11.tag || t11.stateNode.containerInfo !== n11.containerInfo || t11.stateNode.implementation !== n11.implementation ? (t11 = rT(n11, e11.mode, r11)).return = e11 : (t11 = l10(t11, n11.children || [])).return = e11, t11;
    }
    function f10(e11, t11, n11, r11, a11) {
      return null === t11 || 7 !== t11.tag ? (t11 = rP(n11, e11.mode, r11, a11)).return = e11 : (t11 = l10(t11, n11)).return = e11, t11;
    }
    function d2(e11, t11, n11) {
      if ("string" == typeof t11 && "" !== t11 || "number" == typeof t11 || "bigint" == typeof t11) return (t11 = rN("" + t11, e11.mode, n11)).return = e11, t11;
      if ("object" == typeof t11 && null !== t11) {
        switch (t11.$$typeof) {
          case P:
            return lj(n11 = rx(t11.type, t11.key, t11.props, null, e11.mode, n11), t11), n11.return = e11, n11;
          case N:
            return (t11 = rT(t11, e11.mode, n11)).return = e11, t11;
          case F:
            return d2(e11, t11 = lL(t11), n11);
        }
        if (W(t11) || $(t11)) return (t11 = rP(t11, e11.mode, n11, null)).return = e11, t11;
        if ("function" == typeof t11.then) return d2(e11, lA(t11), n11);
        if (t11.$$typeof === L) return d2(e11, lo(e11, t11), n11);
        lU(e11, t11);
      }
      return null;
    }
    function p2(e11, t11, n11, r11) {
      var l11 = null !== t11 ? t11.key : null;
      if ("string" == typeof n11 && "" !== n11 || "number" == typeof n11 || "bigint" == typeof n11) return null !== l11 ? null : i10(e11, t11, "" + n11, r11);
      if ("object" == typeof n11 && null !== n11) {
        switch (n11.$$typeof) {
          case P:
            return n11.key === l11 ? s10(e11, t11, n11, r11) : null;
          case N:
            return n11.key === l11 ? c10(e11, t11, n11, r11) : null;
          case F:
            return p2(e11, t11, n11 = lL(n11), r11);
        }
        if (W(n11) || $(n11)) return null !== l11 ? null : f10(e11, t11, n11, r11, null);
        if ("function" == typeof n11.then) return p2(e11, t11, lA(n11), r11);
        if (n11.$$typeof === L) return p2(e11, t11, lo(e11, n11), r11);
        lU(e11, n11);
      }
      return null;
    }
    function m2(e11, t11, n11, r11, l11) {
      if ("string" == typeof r11 && "" !== r11 || "number" == typeof r11 || "bigint" == typeof r11) return i10(t11, e11 = e11.get(n11) || null, "" + r11, l11);
      if ("object" == typeof r11 && null !== r11) {
        switch (r11.$$typeof) {
          case P:
            return s10(t11, e11 = e11.get(null === r11.key ? n11 : r11.key) || null, r11, l11);
          case N:
            return c10(t11, e11 = e11.get(null === r11.key ? n11 : r11.key) || null, r11, l11);
          case F:
            return m2(e11, t11, n11, r11 = lL(r11), l11);
        }
        if (W(r11) || $(r11)) return f10(t11, e11 = e11.get(n11) || null, r11, l11, null);
        if ("function" == typeof r11.then) return m2(e11, t11, n11, lA(r11), l11);
        if (r11.$$typeof === L) return m2(e11, t11, n11, lo(t11, r11), l11);
        lU(t11, r11);
      }
      return null;
    }
    return function(i11, s11, c11, f11) {
      try {
        lF = 0;
        var h2 = (function i12(s12, c12, f12, h3) {
          if ("object" == typeof f12 && null !== f12 && f12.type === C && null === f12.key && void 0 === f12.props.ref && (f12 = f12.props.children), "object" == typeof f12 && null !== f12) {
            switch (f12.$$typeof) {
              case P:
                e: {
                  for (var g3 = f12.key; null !== c12; ) {
                    if (c12.key === g3) {
                      if ((g3 = f12.type) === C) {
                        if (7 === c12.tag) {
                          n10(s12, c12.sibling), lj(h3 = l10(c12, f12.props.children), f12), h3.return = s12, s12 = h3;
                          break e;
                        }
                      } else if (c12.elementType === g3 || "object" == typeof g3 && null !== g3 && g3.$$typeof === F && lL(g3) === c12.type) {
                        n10(s12, c12.sibling), lj(h3 = l10(c12, f12.props), f12), h3.return = s12, s12 = h3;
                        break e;
                      }
                      n10(s12, c12);
                      break;
                    }
                    t10(s12, c12), c12 = c12.sibling;
                  }
                  f12.type === C ? lj(h3 = rP(f12.props.children, s12.mode, h3, f12.key), f12) : lj(h3 = rx(f12.type, f12.key, f12.props, null, s12.mode, h3), f12), h3.return = s12, s12 = h3;
                }
                return o10(s12);
              case N:
                e: {
                  for (g3 = f12.key; null !== c12; ) {
                    if (c12.key === g3) if (4 === c12.tag && c12.stateNode.containerInfo === f12.containerInfo && c12.stateNode.implementation === f12.implementation) {
                      n10(s12, c12.sibling), (h3 = l10(c12, f12.children || [])).return = s12, s12 = h3;
                      break e;
                    } else {
                      n10(s12, c12);
                      break;
                    }
                    t10(s12, c12), c12 = c12.sibling;
                  }
                  (h3 = rT(f12, s12.mode, h3)).return = s12, s12 = h3;
                }
                return o10(s12);
              case F:
                return i12(s12, c12, f12 = lL(f12), h3);
            }
            if (W(f12)) return (function(l11, o11, i13, u10) {
              for (var s13 = null, c13 = null, f13 = o11, h4 = o11 = 0, g4 = null; null !== f13 && h4 < i13.length; h4++) {
                f13.index > h4 ? (g4 = f13, f13 = null) : g4 = f13.sibling;
                var v2 = p2(l11, f13, i13[h4], u10);
                if (null === v2) {
                  null === f13 && (f13 = g4);
                  break;
                }
                e10 && f13 && null === v2.alternate && t10(l11, f13), o11 = a10(v2, o11, h4), null === c13 ? s13 = v2 : c13.sibling = v2, c13 = v2, f13 = g4;
              }
              if (h4 === i13.length) return n10(l11, f13), rX && rB(l11, h4), s13;
              if (null === f13) {
                for (; h4 < i13.length; h4++) null !== (f13 = d2(l11, i13[h4], u10)) && (o11 = a10(f13, o11, h4), null === c13 ? s13 = f13 : c13.sibling = f13, c13 = f13);
                return rX && rB(l11, h4), s13;
              }
              for (f13 = r10(f13); h4 < i13.length; h4++) null !== (g4 = m2(f13, l11, h4, i13[h4], u10)) && (e10 && null !== (v2 = g4.alternate) && f13.delete(null === v2.key ? h4 : v2.key), o11 = a10(g4, o11, h4), null === c13 ? s13 = g4 : c13.sibling = g4, c13 = g4);
              return e10 && f13.forEach(function(e11) {
                return t10(l11, e11);
              }), rX && rB(l11, h4), s13;
            })(s12, c12, f12, h3);
            if ($(f12)) {
              if ("function" != typeof (g3 = $(f12))) throw Error(u(150));
              return (function(l11, o11, i13, s13) {
                if (null == i13) throw Error(u(151));
                for (var c13 = null, f13 = null, h4 = o11, g4 = o11 = 0, v2 = null, y2 = i13.next(); null !== h4 && !y2.done; g4++, y2 = i13.next()) {
                  h4.index > g4 ? (v2 = h4, h4 = null) : v2 = h4.sibling;
                  var b2 = p2(l11, h4, y2.value, s13);
                  if (null === b2) {
                    null === h4 && (h4 = v2);
                    break;
                  }
                  e10 && h4 && null === b2.alternate && t10(l11, h4), o11 = a10(b2, o11, g4), null === f13 ? c13 = b2 : f13.sibling = b2, f13 = b2, h4 = v2;
                }
                if (y2.done) return n10(l11, h4), rX && rB(l11, g4), c13;
                if (null === h4) {
                  for (; !y2.done; g4++, y2 = i13.next()) null !== (y2 = d2(l11, y2.value, s13)) && (o11 = a10(y2, o11, g4), null === f13 ? c13 = y2 : f13.sibling = y2, f13 = y2);
                  return rX && rB(l11, g4), c13;
                }
                for (h4 = r10(h4); !y2.done; g4++, y2 = i13.next()) null !== (y2 = m2(h4, l11, g4, y2.value, s13)) && (e10 && null !== (v2 = y2.alternate) && h4.delete(null === v2.key ? g4 : v2.key), o11 = a10(y2, o11, g4), null === f13 ? c13 = y2 : f13.sibling = y2, f13 = y2);
                return e10 && h4.forEach(function(e11) {
                  return t10(l11, e11);
                }), rX && rB(l11, g4), c13;
              })(s12, c12, f12 = g3.call(f12), h3);
            }
            if ("function" == typeof f12.then) return i12(s12, c12, lA(f12), h3);
            if (f12.$$typeof === L) return i12(s12, c12, lo(s12, f12), h3);
            lU(s12, f12);
          }
          return "string" == typeof f12 && "" !== f12 || "number" == typeof f12 || "bigint" == typeof f12 ? (f12 = "" + f12, null !== c12 && 6 === c12.tag ? (n10(s12, c12.sibling), (h3 = l10(c12, f12)).return = s12) : (n10(s12, c12), (h3 = rN(f12, s12.mode, h3)).return = s12), o10(s12 = h3)) : n10(s12, c12);
        })(i11, s11, c11, f11);
        return lD = null, h2;
      } catch (e11) {
        if (e11 === lP || e11 === lC) throw e11;
        var g2 = rS(29, e11, null, i11.mode);
        return g2.lanes = f11, g2.return = i11, g2;
      } finally {
      }
    };
  }
  var lV = lB(true), lH = lB(false), l$ = false;
  function lQ(e10) {
    e10.updateQueue = { baseState: e10.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function lW(e10, t10) {
    e10 = e10.updateQueue, t10.updateQueue === e10 && (t10.updateQueue = { baseState: e10.baseState, firstBaseUpdate: e10.firstBaseUpdate, lastBaseUpdate: e10.lastBaseUpdate, shared: e10.shared, callbacks: null });
  }
  function lq(e10) {
    return { lane: e10, tag: 0, payload: null, callback: null, next: null };
  }
  function lX(e10, t10, n10) {
    var r10 = e10.updateQueue;
    if (null === r10) return null;
    if (r10 = r10.shared, 0 != (2 & uN)) {
      var l10 = r10.pending;
      return null === l10 ? t10.next = t10 : (t10.next = l10.next, l10.next = t10), r10.pending = t10, t10 = ry(e10), rv(e10, null, n10), t10;
    }
    return rm(e10, r10, t10, n10), ry(e10);
  }
  function lK(e10, t10, n10) {
    if (null !== (t10 = t10.updateQueue) && (t10 = t10.shared, 0 != (4194048 & n10))) {
      var r10 = t10.lanes;
      r10 &= e10.pendingLanes, n10 |= r10, t10.lanes = n10, eU(e10, n10);
    }
  }
  function lG(e10, t10) {
    var n10 = e10.updateQueue, r10 = e10.alternate;
    if (null !== r10 && n10 === (r10 = r10.updateQueue)) {
      var l10 = null, a10 = null;
      if (null !== (n10 = n10.firstBaseUpdate)) {
        do {
          var o10 = { lane: n10.lane, tag: n10.tag, payload: n10.payload, callback: null, next: null };
          null === a10 ? l10 = a10 = o10 : a10 = a10.next = o10, n10 = n10.next;
        } while (null !== n10);
        null === a10 ? l10 = a10 = t10 : a10 = a10.next = t10;
      } else l10 = a10 = t10;
      n10 = { baseState: r10.baseState, firstBaseUpdate: l10, lastBaseUpdate: a10, shared: r10.shared, callbacks: r10.callbacks }, e10.updateQueue = n10;
      return;
    }
    null === (e10 = n10.lastBaseUpdate) ? n10.firstBaseUpdate = t10 : e10.next = t10, n10.lastBaseUpdate = t10;
  }
  var lY = false;
  function lJ() {
    if (lY) {
      var e10 = lb;
      if (null !== e10) throw e10;
    }
  }
  function lZ(e10, t10, n10, r10) {
    lY = false;
    var l10 = e10.updateQueue;
    l$ = false;
    var a10 = l10.firstBaseUpdate, o10 = l10.lastBaseUpdate, i10 = l10.shared.pending;
    if (null !== i10) {
      l10.shared.pending = null;
      var u10 = i10, s10 = u10.next;
      u10.next = null, null === o10 ? a10 = s10 : o10.next = s10, o10 = u10;
      var c10 = e10.alternate;
      null !== c10 && (i10 = (c10 = c10.updateQueue).lastBaseUpdate) !== o10 && (null === i10 ? c10.firstBaseUpdate = s10 : i10.next = s10, c10.lastBaseUpdate = u10);
    }
    if (null !== a10) {
      var f10 = l10.baseState;
      for (o10 = 0, c10 = s10 = u10 = null, i10 = a10; ; ) {
        var d2 = -536870913 & i10.lane, p2 = d2 !== i10.lane;
        if (p2 ? (uO & d2) === d2 : (r10 & d2) === d2) {
          0 !== d2 && d2 === ly && (lY = true), null !== c10 && (c10 = c10.next = { lane: 0, tag: i10.tag, payload: i10.payload, callback: null, next: null });
          e: {
            var m2 = e10, h2 = i10;
            switch (d2 = t10, h2.tag) {
              case 1:
                if ("function" == typeof (m2 = h2.payload)) {
                  f10 = m2.call(n10, f10, d2);
                  break e;
                }
                f10 = m2;
                break e;
              case 3:
                m2.flags = -65537 & m2.flags | 128;
              case 0:
                if (null == (d2 = "function" == typeof (m2 = h2.payload) ? m2.call(n10, f10, d2) : m2)) break e;
                f10 = _({}, f10, d2);
                break e;
              case 2:
                l$ = true;
            }
          }
          null !== (d2 = i10.callback) && (e10.flags |= 64, p2 && (e10.flags |= 8192), null === (p2 = l10.callbacks) ? l10.callbacks = [d2] : p2.push(d2));
        } else p2 = { lane: d2, tag: i10.tag, payload: i10.payload, callback: i10.callback, next: null }, null === c10 ? (s10 = c10 = p2, u10 = f10) : c10 = c10.next = p2, o10 |= d2;
        if (null === (i10 = i10.next)) if (null === (i10 = l10.shared.pending)) break;
        else i10 = (p2 = i10).next, p2.next = null, l10.lastBaseUpdate = p2, l10.shared.pending = null;
      }
      null === c10 && (u10 = f10), l10.baseState = u10, l10.firstBaseUpdate = s10, l10.lastBaseUpdate = c10, null === a10 && (l10.shared.lanes = 0), uA |= o10, e10.lanes = o10, e10.memoizedState = f10;
    }
  }
  function l0(e10, t10) {
    if ("function" != typeof e10) throw Error(u(191, e10));
    e10.call(t10);
  }
  function l1(e10, t10) {
    var n10 = e10.callbacks;
    if (null !== n10) for (e10.callbacks = null, e10 = 0; e10 < n10.length; e10++) l0(n10[e10], t10);
  }
  var l2 = J(null), l3 = J(0);
  function l4(e10, t10) {
    ee(l3, e10 = uD), ee(l2, t10), uD = e10 | t10.baseLanes;
  }
  function l6() {
    ee(l3, uD), ee(l2, l2.current);
  }
  function l5() {
    uD = l3.current, Z(l2), Z(l3);
  }
  var l8 = J(null), l7 = null;
  function l9(e10) {
    var t10 = e10.alternate;
    ee(al, 1 & al.current), ee(l8, e10), null === l7 && (null === t10 || null !== l2.current ? l7 = e10 : null !== t10.memoizedState && (l7 = e10));
  }
  function ae(e10) {
    ee(al, al.current), ee(l8, e10), null === l7 && (l7 = e10);
  }
  function at(e10) {
    22 === e10.tag ? (ee(al, al.current), ee(l8, e10), null === l7 && (l7 = e10)) : an();
  }
  function an() {
    ee(al, al.current), ee(l8, l8.current);
  }
  function ar(e10) {
    Z(l8), l7 === e10 && (l7 = null), Z(al);
  }
  var al = J(0);
  function aa(e10, t10) {
    ee(l8, l8.current), ee(al, t10);
  }
  function ao(e10) {
    Z(al), Z(l8), l7 === e10 && (l7 = null);
  }
  function ai(e10) {
    for (var t10 = e10; null !== t10; ) {
      if (13 === t10.tag) {
        var n10 = t10.memoizedState;
        if (null !== n10 && (null === (n10 = n10.dehydrated) || cY(n10) || cJ(n10))) return t10;
      } else if (19 === t10.tag && "independent" !== t10.memoizedProps.revealOrder) {
        if (0 != (128 & t10.flags)) return t10;
      } else if (null !== t10.child) {
        t10.child.return = t10, t10 = t10.child;
        continue;
      }
      if (t10 === e10) break;
      for (; null === t10.sibling; ) {
        if (null === t10.return || t10.return === e10) return null;
        t10 = t10.return;
      }
      t10.sibling.return = t10.return, t10 = t10.sibling;
    }
    return null;
  }
  var au = 0, as = null, ac = null, af = null, ad = false, ap = false, am = false, ah = 0, ag = 0, av = null, ay = 0;
  function ab() {
    throw Error(u(321));
  }
  function aw(e10, t10) {
    if (null === t10) return false;
    for (var n10 = 0; n10 < t10.length && n10 < e10.length; n10++) if (!nB(e10[n10], t10[n10])) return false;
    return true;
  }
  function aS(e10, t10, n10, r10, l10, a10) {
    return au = a10, as = t10, t10.memoizedState = null, t10.updateQueue = null, t10.lanes = 0, q.H = null === e10 || null === e10.memoizedState ? oN : oC, am = false, a10 = n10(r10, l10), am = false, ap && (a10 = aE(t10, n10, r10, l10)), ak(e10), a10;
  }
  function ak(e10) {
    q.H = oP;
    var t10 = null !== ac && null !== ac.next;
    if (au = 0, af = ac = as = null, ad = false, ag = 0, av = null, t10) throw Error(u(300));
    null === e10 || o$ || null !== (e10 = e10.dependencies) && lr(e10) && (o$ = true);
  }
  function aE(e10, t10, n10, r10) {
    as = e10;
    var l10 = 0;
    do {
      if (ap && (av = null), ag = 0, ap = false, 25 <= l10) throw Error(u(301));
      if (l10 += 1, af = ac = null, null != e10.updateQueue) {
        var a10 = e10.updateQueue;
        a10.lastEffect = null, a10.events = null, a10.stores = null, null != a10.memoCache && (a10.memoCache.index = 0);
      }
      q.H = oT, a10 = t10(n10, r10);
    } while (ap);
    return a10;
  }
  function a_() {
    var e10 = q.H, t10 = e10.useState()[0];
    return t10 = "function" == typeof t10.then ? az(t10) : t10, e10 = e10.useState()[0], (null !== ac ? ac.memoizedState : null) !== e10 && (as.flags |= 1024), t10;
  }
  function ax() {
    var e10 = 0 !== ah;
    return ah = 0, e10;
  }
  function aP(e10, t10, n10) {
    t10.updateQueue = e10.updateQueue, t10.flags &= -2053, e10.lanes &= ~n10;
  }
  function aN(e10) {
    if (ad) {
      for (e10 = e10.memoizedState; null !== e10; ) {
        var t10 = e10.queue;
        null !== t10 && (t10.pending = null), e10 = e10.next;
      }
      ad = false;
    }
    au = 0, af = ac = as = null, ap = false, ag = ah = 0, av = null;
  }
  function aC() {
    var e10 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return null === af ? as.memoizedState = af = e10 : af = af.next = e10, af;
  }
  function aT() {
    if (null === ac) {
      var e10 = as.alternate;
      e10 = null !== e10 ? e10.memoizedState : null;
    } else e10 = ac.next;
    var t10 = null === af ? as.memoizedState : af.next;
    if (null !== t10) af = t10, ac = e10;
    else {
      if (null === e10) {
        if (null === as.alternate) throw Error(u(467));
        throw Error(u(310));
      }
      e10 = { memoizedState: (ac = e10).memoizedState, baseState: ac.baseState, baseQueue: ac.baseQueue, queue: ac.queue, next: null }, null === af ? as.memoizedState = af = e10 : af = af.next = e10;
    }
    return af;
  }
  function aO() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function az(e10) {
    var t10 = ag;
    return ag += 1, null === av && (av = []), e10 = lz(av, e10, t10), t10 = as, null === (null === af ? t10.memoizedState : af.next) && (q.H = null === (t10 = t10.alternate) || null === t10.memoizedState ? oN : oC), e10;
  }
  function aL(e10) {
    if (null !== e10 && "object" == typeof e10) {
      if ("function" == typeof e10.then) return az(e10);
      if (e10.$$typeof === V) return;
      if (e10.$$typeof === L) return la(e10);
    }
    throw Error(u(438, String(e10)));
  }
  function aR(e10) {
    var t10 = null, n10 = as.updateQueue;
    if (null !== n10 && (t10 = n10.memoCache), null == t10) {
      var r10 = as.alternate;
      null !== r10 && null !== (r10 = r10.updateQueue) && null != (r10 = r10.memoCache) && (t10 = { data: r10.data.map(function(e11) {
        return e11.slice();
      }), index: 0 });
    }
    if (null == t10 && (t10 = { data: [], index: 0 }), null === n10 && (n10 = aO(), as.updateQueue = n10), n10.memoCache = t10, void 0 === (n10 = t10.data[t10.index])) for (n10 = t10.data[t10.index] = Array(e10), r10 = 0; r10 < e10; r10++) n10[r10] = U;
    return t10.index++, n10;
  }
  function aM(e10, t10) {
    return "function" == typeof t10 ? t10(e10) : t10;
  }
  function aI(e10) {
    return aD(aT(), ac, e10);
  }
  function aD(e10, t10, n10) {
    var r10 = e10.queue;
    if (null === r10) throw Error(u(311));
    r10.lastRenderedReducer = n10;
    var l10 = e10.baseQueue, a10 = r10.pending;
    if (null !== a10) {
      if (null !== l10) {
        var o10 = l10.next;
        l10.next = a10.next, a10.next = o10;
      }
      t10.baseQueue = l10 = a10, r10.pending = null;
    }
    if (a10 = e10.baseState, null === l10) e10.memoizedState = a10;
    else {
      t10 = l10.next;
      var i10 = o10 = null, s10 = null, c10 = t10, f10 = false;
      do {
        var d2 = -536870913 & c10.lane;
        if (d2 !== c10.lane ? (uO & d2) === d2 : (au & d2) === d2) {
          var p2 = c10.revertLane;
          if (0 === p2) null !== s10 && (s10 = s10.next = { lane: 0, revertLane: 0, gesture: null, action: c10.action, hasEagerState: c10.hasEagerState, eagerState: c10.eagerState, next: null }), d2 === ly && (f10 = true);
          else if ((au & p2) === p2) {
            c10 = c10.next, p2 === ly && (f10 = true);
            continue;
          } else d2 = { lane: 0, revertLane: c10.revertLane, gesture: null, action: c10.action, hasEagerState: c10.hasEagerState, eagerState: c10.eagerState, next: null }, null === s10 ? (i10 = s10 = d2, o10 = a10) : s10 = s10.next = d2, as.lanes |= p2, uA |= p2;
          d2 = c10.action, am && n10(a10, d2), a10 = c10.hasEagerState ? c10.eagerState : n10(a10, d2);
        } else p2 = { lane: d2, revertLane: c10.revertLane, gesture: c10.gesture, action: c10.action, hasEagerState: c10.hasEagerState, eagerState: c10.eagerState, next: null }, null === s10 ? (i10 = s10 = p2, o10 = a10) : s10 = s10.next = p2, as.lanes |= d2, uA |= d2;
        c10 = c10.next;
      } while (null !== c10 && c10 !== t10);
      if (null === s10 ? o10 = a10 : s10.next = i10, !nB(a10, e10.memoizedState) && (o$ = true, f10 && null !== (n10 = lb))) throw n10;
      e10.memoizedState = a10, e10.baseState = o10, e10.baseQueue = s10, r10.lastRenderedState = a10;
    }
    return null === l10 && (r10.lanes = 0), [e10.memoizedState, r10.dispatch];
  }
  function aF(e10) {
    var t10 = aT(), n10 = t10.queue;
    if (null === n10) throw Error(u(311));
    n10.lastRenderedReducer = e10;
    var r10 = n10.dispatch, l10 = n10.pending, a10 = t10.memoizedState;
    if (null !== l10) {
      n10.pending = null;
      var o10 = l10 = l10.next;
      do
        a10 = e10(a10, o10.action), o10 = o10.next;
      while (o10 !== l10);
      nB(a10, t10.memoizedState) || (o$ = true), t10.memoizedState = a10, null === t10.baseQueue && (t10.baseState = a10), n10.lastRenderedState = a10;
    }
    return [a10, r10];
  }
  function aA(e10, t10, n10) {
    var r10 = as, l10 = aT(), a10 = rX;
    if (a10) {
      if (void 0 === n10) throw Error(u(407));
      n10 = n10();
    } else n10 = t10();
    var o10 = !nB((ac || l10).memoizedState, n10);
    if (o10 && (l10.memoizedState = n10, o$ = true), l10 = l10.queue, a9(aB.bind(null, r10, l10, e10), [e10]), a4((e10 = l10.getSnapshot !== t10 || o10 || null !== af && 0 != (1 & af.memoizedState.tag)) ? 9 : 8, { destroy: void 0 }, aU.bind(null, r10, l10, n10, t10), null), e10) {
      if (r10.flags |= 2048, null === uC) throw Error(u(349));
      a10 || 0 != (127 & au) || aj(r10, t10, n10);
    }
    return n10;
  }
  function aj(e10, t10, n10) {
    e10.flags |= 16384, e10 = { getSnapshot: t10, value: n10 }, null === (t10 = as.updateQueue) ? (t10 = aO(), as.updateQueue = t10, t10.stores = [e10]) : null === (n10 = t10.stores) ? t10.stores = [e10] : n10.push(e10);
  }
  function aU(e10, t10, n10, r10) {
    t10.value = n10, t10.getSnapshot = r10, aV(t10) && aH(e10);
  }
  function aB(e10, t10, n10) {
    return n10(function() {
      aV(t10) && aH(e10);
    });
  }
  function aV(e10) {
    var t10 = e10.getSnapshot;
    e10 = e10.value;
    try {
      var n10 = t10();
      return !nB(e10, n10);
    } catch (e11) {
      return true;
    }
  }
  function aH(e10) {
    var t10 = rg(e10, 2);
    null !== t10 && sn(t10, e10, 2);
  }
  function a$(e10) {
    var t10 = aC();
    return "function" == typeof e10 && (e10 = e10()), t10.memoizedState = t10.baseState = e10, t10.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: aM, lastRenderedState: e10 }, t10;
  }
  function aQ(e10, t10, n10, r10) {
    return e10.baseState = n10, aD(e10, ac, "function" == typeof r10 ? r10 : aM);
  }
  function aW(e10, t10, n10, r10, l10) {
    if (oE(e10)) throw Error(u(485));
    if (null !== (e10 = t10.action)) {
      var a10 = { payload: l10, action: e10, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(e11) {
        a10.listeners.push(e11);
      } };
      null !== q.T ? n10(true) : a10.isTransition = false, r10(a10), null === (n10 = t10.pending) ? (a10.next = t10.pending = a10, aq(t10, a10)) : (a10.next = n10.next, t10.pending = n10.next = a10);
    }
  }
  function aq(e10, t10) {
    var n10 = t10.action, r10 = t10.payload, l10 = e10.state;
    if (t10.isTransition) {
      var a10 = q.T, o10 = {};
      o10.types = null !== a10 ? a10.types : null, q.T = o10;
      try {
        var i10 = n10(l10, r10), u10 = q.S;
        null !== u10 && u10(o10, i10), aX(e10, t10, i10);
      } catch (n11) {
        aG(e10, t10, n11);
      } finally {
        null !== a10 && null !== o10.types && (a10.types = o10.types), q.T = a10;
      }
    } else try {
      a10 = n10(l10, r10), aX(e10, t10, a10);
    } catch (n11) {
      aG(e10, t10, n11);
    }
  }
  function aX(e10, t10, n10) {
    null !== n10 && "object" == typeof n10 && "function" == typeof n10.then ? n10.then(function(n11) {
      aK(e10, t10, n11);
    }, function(n11) {
      return aG(e10, t10, n11);
    }) : aK(e10, t10, n10);
  }
  function aK(e10, t10, n10) {
    t10.status = "fulfilled", t10.value = n10, aY(t10), e10.state = n10, null !== (t10 = e10.pending) && ((n10 = t10.next) === t10 ? e10.pending = null : (n10 = n10.next, t10.next = n10, aq(e10, n10)));
  }
  function aG(e10, t10, n10) {
    var r10 = e10.pending;
    if (e10.pending = null, null !== r10) {
      r10 = r10.next;
      do
        t10.status = "rejected", t10.reason = n10, aY(t10), t10 = t10.next;
      while (t10 !== r10);
    }
    e10.action = null;
  }
  function aY(e10) {
    e10 = e10.listeners;
    for (var t10 = 0; t10 < e10.length; t10++) (0, e10[t10])();
  }
  function aJ(e10, t10) {
    return t10;
  }
  function aZ(e10, t10) {
    if (rX) {
      var n10 = uC.formState;
      if (null !== n10) {
        e: {
          var r10 = as;
          if (rX) {
            if (rq) {
              t: {
                for (var l10 = rq, a10 = rG; 8 !== l10.nodeType; ) if (!a10 || null === (l10 = cZ(l10.nextSibling))) {
                  l10 = null;
                  break t;
                }
                l10 = "F!" === (a10 = l10.data) || "F" === a10 ? l10 : null;
              }
              if (l10) {
                rq = cZ(l10.nextSibling), r10 = "F!" === l10.data;
                break e;
              }
            }
            rJ(r10);
          }
          r10 = false;
        }
        r10 && (t10 = n10[0]);
      }
    }
    return (n10 = aC()).memoizedState = n10.baseState = t10, r10 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: aJ, lastRenderedState: t10 }, n10.queue = r10, n10 = ow.bind(null, as, r10), r10.dispatch = n10, r10 = a$(false), a10 = ok.bind(null, as, false, r10.queue), r10 = aC(), l10 = { state: t10, dispatch: null, action: e10, pending: null }, r10.queue = l10, n10 = aW.bind(null, as, l10, a10, n10), l10.dispatch = n10, r10.memoizedState = e10, [t10, n10, false];
  }
  function a0(e10) {
    return a1(aT(), ac, e10);
  }
  function a1(e10, t10, n10) {
    if (t10 = aD(e10, t10, aJ)[0], e10 = aI(aM)[0], "object" == typeof t10 && null !== t10 && "function" == typeof t10.then) try {
      var r10 = az(t10);
    } catch (e11) {
      if (e11 === lP) throw lC;
      throw e11;
    }
    else r10 = t10;
    var l10 = (t10 = aT()).queue, a10 = l10.dispatch;
    return n10 !== t10.memoizedState && (as.flags |= 2048, a4(9, { destroy: void 0 }, a2.bind(null, l10, n10), null)), [r10, a10, e10];
  }
  function a2(e10, t10) {
    e10.action = t10;
  }
  function a3(e10) {
    var t10 = aT(), n10 = ac;
    if (null !== n10) return a1(t10, n10, e10);
    aT(), t10 = t10.memoizedState;
    var r10 = (n10 = aT()).queue.dispatch;
    return n10.memoizedState = e10, [t10, r10, false];
  }
  function a4(e10, t10, n10, r10) {
    return e10 = { tag: e10, create: n10, deps: r10, inst: t10, next: null }, null === (t10 = as.updateQueue) && (t10 = aO(), as.updateQueue = t10), null === (n10 = t10.lastEffect) ? t10.lastEffect = e10.next = e10 : (r10 = n10.next, n10.next = e10, e10.next = r10, t10.lastEffect = e10), e10;
  }
  function a6() {
    return aT().memoizedState;
  }
  function a5(e10, t10, n10, r10) {
    var l10 = aC();
    as.flags |= e10, l10.memoizedState = a4(1 | t10, { destroy: void 0 }, n10, void 0 === r10 ? null : r10);
  }
  function a8(e10, t10, n10, r10) {
    var l10 = aT();
    r10 = void 0 === r10 ? null : r10;
    var a10 = l10.memoizedState.inst;
    null !== ac && null !== r10 && aw(r10, ac.memoizedState.deps) ? l10.memoizedState = a4(t10, a10, n10, r10) : (as.flags |= e10, l10.memoizedState = a4(1 | t10, a10, n10, r10));
  }
  function a7(e10, t10) {
    a5(8390656, 8, e10, t10);
  }
  function a9(e10, t10) {
    a8(2048, 8, e10, t10);
  }
  function oe(e10) {
    var t10 = aT().memoizedState, n10 = { ref: t10, nextImpl: e10 };
    as.flags |= 4;
    var r10 = as.updateQueue;
    if (null === r10) r10 = aO(), as.updateQueue = r10, r10.events = [n10];
    else {
      var l10 = r10.events;
      null === l10 ? r10.events = [n10] : l10.push(n10);
    }
    return function() {
      if (0 != (2 & uN)) throw Error(u(440));
      return t10.impl.apply(void 0, arguments);
    };
  }
  function ot(e10, t10) {
    return a8(4, 2, e10, t10);
  }
  function on(e10, t10) {
    return a8(4, 4, e10, t10);
  }
  function or(e10, t10) {
    if ("function" == typeof t10) {
      var n10 = t10(e10 = e10());
      return function() {
        "function" == typeof n10 ? n10() : t10(null);
      };
    }
    if (null != t10) return t10.current = e10 = e10(), function() {
      t10.current = null;
    };
  }
  function ol(e10, t10, n10) {
    n10 = null != n10 ? n10.concat([e10]) : null, a8(4, 4, or.bind(null, t10, e10), n10);
  }
  function oa() {
  }
  function oo(e10, t10) {
    var n10 = aT();
    t10 = void 0 === t10 ? null : t10;
    var r10 = n10.memoizedState;
    return null !== t10 && aw(t10, r10[1]) ? r10[0] : (n10.memoizedState = [e10, t10], e10);
  }
  function oi(e10, t10) {
    var n10 = aT();
    t10 = void 0 === t10 ? null : t10;
    var r10 = n10.memoizedState;
    return null !== t10 && aw(t10, r10[1]) ? r10[0] : (n10.memoizedState = [r10 = e10(), t10], r10);
  }
  function ou(e10, t10, n10) {
    return void 0 === n10 || 0 != (1073741824 & au) && 0 == (261930 & uO) ? e10.memoizedState = t10 : (e10.memoizedState = n10, e10 = se(), as.lanes |= e10, uA |= e10, n10);
  }
  function os(e10, t10, n10, r10) {
    return nB(n10, t10) ? n10 : null !== l2.current ? (nB(e10 = ou(e10, n10, r10), t10) || (o$ = true), e10) : 0 == (106 & au) || 0 != (1073741824 & au) && 0 == (261930 & uO) ? (o$ = true, e10.memoizedState = n10) : (e10 = se(), as.lanes |= e10, uA |= e10, t10);
  }
  function oc(e10, t10, n10, r10, l10) {
    var a10 = X.p;
    X.p = 0 !== a10 && 8 > a10 ? a10 : 8;
    var o10 = q.T, i10 = {};
    i10.types = null !== o10 ? o10.types : null, q.T = i10, ok(e10, false, t10, n10);
    try {
      var u10 = l10(), s10 = q.S;
      if (null !== s10 && s10(i10, u10), null !== u10 && "object" == typeof u10 && "function" == typeof u10.then) {
        var c10, f10, d2 = (c10 = [], f10 = { status: "pending", value: null, reason: null, then: function(e11) {
          c10.push(e11);
        } }, u10.then(function() {
          f10.status = "fulfilled", f10.value = r10;
          for (var e11 = 0; e11 < c10.length; e11++) (0, c10[e11])(r10);
        }, function(e11) {
          for (f10.status = "rejected", f10.reason = e11, e11 = 0; e11 < c10.length; e11++) (0, c10[e11])(void 0);
        }), f10);
        oS(e10, t10, d2, u9());
      } else oS(e10, t10, r10, u9());
    } catch (n11) {
      oS(e10, t10, { then: function() {
      }, status: "rejected", reason: n11 }, u9());
    } finally {
      X.p = a10, null !== o10 && null !== i10.types && (o10.types = i10.types), q.T = o10;
    }
  }
  function of() {
  }
  function od(e10, t10, n10, r10) {
    if (5 !== e10.tag) throw Error(u(476));
    var l10 = op(e10).queue;
    oc(e10, l10, t10, K, null === n10 ? of : function() {
      return om(e10), n10(r10);
    });
  }
  function op(e10) {
    var t10 = e10.memoizedState;
    if (null !== t10) return t10;
    var n10 = {};
    return (t10 = { memoizedState: K, baseState: K, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: aM, lastRenderedState: K }, next: null }).next = { memoizedState: n10, baseState: n10, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: aM, lastRenderedState: n10 }, next: null }, e10.memoizedState = t10, null !== (e10 = e10.alternate) && (e10.memoizedState = t10), t10;
  }
  function om(e10) {
    var t10 = op(e10);
    null === t10.next && (t10 = e10.alternate.memoizedState), oS(e10, t10.next.queue, {}, u9());
  }
  function oh() {
    return la(fP);
  }
  function og() {
    return aT().memoizedState;
  }
  function ov() {
    return aT().memoizedState;
  }
  function oy(e10) {
    for (var t10 = e10.return; null !== t10; ) {
      switch (t10.tag) {
        case 24:
        case 3:
          var n10 = u9(), r10 = lX(t10, e10 = lq(n10), n10);
          null !== r10 && (sn(r10, t10, n10), lK(r10, t10, n10)), t10 = { cache: ld() }, e10.payload = t10;
          return;
      }
      t10 = t10.return;
    }
  }
  function ob(e10, t10, n10) {
    var r10 = u9();
    n10 = { lane: r10, revertLane: 0, gesture: null, action: n10, hasEagerState: false, eagerState: null, next: null }, oE(e10) ? o_(t10, n10) : null !== (n10 = rh(e10, t10, n10, r10)) && (sn(n10, e10, r10), ox(n10, t10, r10));
  }
  function ow(e10, t10, n10) {
    oS(e10, t10, n10, u9());
  }
  function oS(e10, t10, n10, r10) {
    var l10 = { lane: r10, revertLane: 0, gesture: null, action: n10, hasEagerState: false, eagerState: null, next: null };
    if (oE(e10)) o_(t10, l10);
    else {
      var a10 = e10.alternate;
      if (0 === e10.lanes && (null === a10 || 0 === a10.lanes) && null !== (a10 = t10.lastRenderedReducer)) try {
        var o10 = t10.lastRenderedState, i10 = a10(o10, n10);
        if (l10.hasEagerState = true, l10.eagerState = i10, nB(i10, o10)) return rm(e10, t10, l10, 0), null === uC && rp(), false;
      } catch (e11) {
      } finally {
      }
      if (null !== (n10 = rh(e10, t10, l10, r10))) return sn(n10, e10, r10), ox(n10, t10, r10), true;
    }
    return false;
  }
  function ok(e10, t10, n10, r10) {
    if (r10 = { lane: 2, revertLane: sK(), gesture: null, action: r10, hasEagerState: false, eagerState: null, next: null }, oE(e10)) {
      if (t10) throw Error(u(479));
    } else null !== (t10 = rh(e10, n10, r10, 2)) && sn(t10, e10, 2);
  }
  function oE(e10) {
    var t10 = e10.alternate;
    return e10 === as || null !== t10 && t10 === as;
  }
  function o_(e10, t10) {
    ap = ad = true;
    var n10 = e10.pending;
    null === n10 ? t10.next = t10 : (t10.next = n10.next, n10.next = t10), e10.pending = t10;
  }
  function ox(e10, t10, n10) {
    if (0 != (4194048 & n10)) {
      var r10 = t10.lanes;
      r10 &= e10.pendingLanes, t10.lanes = n10 |= r10, eU(e10, n10);
    }
  }
  var oP = { readContext: la, use: aL, useCallback: ab, useContext: ab, useEffect: ab, useImperativeHandle: ab, useLayoutEffect: ab, useInsertionEffect: ab, useMemo: ab, useReducer: ab, useRef: ab, useState: ab, useDebugValue: ab, useDeferredValue: ab, useTransition: ab, useSyncExternalStore: ab, useId: ab, useHostTransitionStatus: ab, useFormState: ab, useActionState: ab, useOptimistic: ab, useMemoCache: ab, useCacheRefresh: ab, useEffectEvent: ab }, oN = { readContext: la, use: aL, useCallback: function(e10, t10) {
    return aC().memoizedState = [e10, void 0 === t10 ? null : t10], e10;
  }, useContext: la, useEffect: a7, useImperativeHandle: function(e10, t10, n10) {
    n10 = null != n10 ? n10.concat([e10]) : null, a5(4194308, 4, or.bind(null, t10, e10), n10);
  }, useLayoutEffect: function(e10, t10) {
    return a5(4194308, 4, e10, t10);
  }, useInsertionEffect: function(e10, t10) {
    a5(4, 2, e10, t10);
  }, useMemo: function(e10, t10) {
    var n10 = aC();
    t10 = void 0 === t10 ? null : t10;
    var r10 = e10();
    return n10.memoizedState = [r10, t10], r10;
  }, useReducer: function(e10, t10, n10) {
    var r10 = aC();
    if (void 0 !== n10) var l10 = n10(t10);
    else l10 = t10;
    return r10.memoizedState = r10.baseState = l10, r10.queue = e10 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e10, lastRenderedState: l10 }, e10 = e10.dispatch = ob.bind(null, as, e10), [r10.memoizedState, e10];
  }, useRef: function(e10) {
    return aC().memoizedState = { current: e10 };
  }, useState: function(e10) {
    var t10 = (e10 = a$(e10)).queue, n10 = ow.bind(null, as, t10);
    return t10.dispatch = n10, [e10.memoizedState, n10];
  }, useDebugValue: oa, useDeferredValue: function(e10, t10) {
    return ou(aC(), e10, t10);
  }, useTransition: function() {
    var e10 = a$(false);
    return e10 = oc.bind(null, as, e10.queue, true, false), aC().memoizedState = e10, [false, e10];
  }, useSyncExternalStore: function(e10, t10, n10) {
    var r10 = as, l10 = aC();
    if (rX) {
      if (void 0 === n10) throw Error(u(407));
      n10 = n10();
    } else {
      if (n10 = t10(), null === uC) throw Error(u(349));
      0 != (127 & uO) || aj(r10, t10, n10);
    }
    l10.memoizedState = n10;
    var a10 = { value: n10, getSnapshot: t10 };
    return l10.queue = a10, a7(aB.bind(null, r10, a10, e10), [e10]), r10.flags |= 2048, a4(9, { destroy: void 0 }, aU.bind(null, r10, a10, n10, t10), null), n10;
  }, useId: function() {
    var e10 = aC(), t10 = uC.identifierPrefix;
    if (rX) {
      var n10 = rU, r10 = rj;
      t10 = "_" + t10 + "R_" + (n10 = (r10 & ~(1 << 32 - eN(r10) - 1)).toString(32) + n10), 0 < (n10 = ah++) && (t10 += "H" + n10.toString(32)), t10 += "_";
    } else t10 = "_" + t10 + "r_" + (n10 = ay++).toString(32) + "_";
    return e10.memoizedState = t10;
  }, useHostTransitionStatus: oh, useFormState: aZ, useActionState: aZ, useOptimistic: function(e10) {
    var t10 = aC();
    t10.memoizedState = t10.baseState = e10;
    var n10 = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return t10.queue = n10, t10 = ok.bind(null, as, true, n10), n10.dispatch = t10, [e10, t10];
  }, useMemoCache: aR, useCacheRefresh: function() {
    return aC().memoizedState = oy.bind(null, as);
  }, useEffectEvent: function(e10) {
    var t10 = aC(), n10 = { impl: e10 };
    return t10.memoizedState = n10, function() {
      if (0 != (2 & uN)) throw Error(u(440));
      return n10.impl.apply(void 0, arguments);
    };
  } }, oC = { readContext: la, use: aL, useCallback: oo, useContext: la, useEffect: a9, useImperativeHandle: ol, useInsertionEffect: ot, useLayoutEffect: on, useMemo: oi, useReducer: aI, useRef: a6, useState: function() {
    return aI(aM);
  }, useDebugValue: oa, useDeferredValue: function(e10, t10) {
    return os(aT(), ac.memoizedState, e10, t10);
  }, useTransition: function() {
    var e10 = aI(aM)[0], t10 = aT().memoizedState;
    return ["boolean" == typeof e10 ? e10 : az(e10), t10];
  }, useSyncExternalStore: aA, useId: og, useHostTransitionStatus: oh, useFormState: a0, useActionState: a0, useOptimistic: function(e10, t10) {
    return aQ(aT(), ac, e10, t10);
  }, useMemoCache: aR, useCacheRefresh: ov, useEffectEvent: oe }, oT = { readContext: la, use: aL, useCallback: oo, useContext: la, useEffect: a9, useImperativeHandle: ol, useInsertionEffect: ot, useLayoutEffect: on, useMemo: oi, useReducer: aF, useRef: a6, useState: function() {
    return aF(aM);
  }, useDebugValue: oa, useDeferredValue: function(e10, t10) {
    var n10 = aT();
    return null === ac ? ou(n10, e10, t10) : os(n10, ac.memoizedState, e10, t10);
  }, useTransition: function() {
    var e10 = aF(aM)[0], t10 = aT().memoizedState;
    return ["boolean" == typeof e10 ? e10 : az(e10), t10];
  }, useSyncExternalStore: aA, useId: og, useHostTransitionStatus: oh, useFormState: a3, useActionState: a3, useOptimistic: function(e10, t10) {
    var n10 = aT();
    return null !== ac ? aQ(n10, ac, e10, t10) : (n10.baseState = e10, [e10, n10.queue.dispatch]);
  }, useMemoCache: aR, useCacheRefresh: ov, useEffectEvent: oe };
  function oO(e10, t10, n10, r10) {
    n10 = null == (n10 = n10(r10, t10 = e10.memoizedState)) ? t10 : _({}, t10, n10), e10.memoizedState = n10, 0 === e10.lanes && (e10.updateQueue.baseState = n10);
  }
  var oz = { enqueueSetState: function(e10, t10, n10) {
    e10 = e10._reactInternals;
    var r10 = u9(), l10 = lq(r10);
    l10.payload = t10, null != n10 && (l10.callback = n10), null !== (t10 = lX(e10, l10, r10)) && (sn(t10, e10, r10), lK(t10, e10, r10));
  }, enqueueReplaceState: function(e10, t10, n10) {
    e10 = e10._reactInternals;
    var r10 = u9(), l10 = lq(r10);
    l10.tag = 1, l10.payload = t10, null != n10 && (l10.callback = n10), null !== (t10 = lX(e10, l10, r10)) && (sn(t10, e10, r10), lK(t10, e10, r10));
  }, enqueueForceUpdate: function(e10, t10) {
    e10 = e10._reactInternals;
    var n10 = u9(), r10 = lq(n10);
    r10.tag = 2, null != t10 && (r10.callback = t10), null !== (t10 = lX(e10, r10, n10)) && (sn(t10, e10, n10), lK(t10, e10, n10));
  } };
  function oL(e10, t10, n10, r10, l10, a10, o10) {
    return "function" == typeof (e10 = e10.stateNode).shouldComponentUpdate ? e10.shouldComponentUpdate(r10, a10, o10) : !t10.prototype || !t10.prototype.isPureReactComponent || !nV(n10, r10) || !nV(l10, a10);
  }
  function oR(e10, t10, n10, r10) {
    e10 = t10.state, "function" == typeof t10.componentWillReceiveProps && t10.componentWillReceiveProps(n10, r10), "function" == typeof t10.UNSAFE_componentWillReceiveProps && t10.UNSAFE_componentWillReceiveProps(n10, r10), t10.state !== e10 && oz.enqueueReplaceState(t10, t10.state, null);
  }
  function oM(e10, t10) {
    var n10 = t10;
    if ("ref" in t10) for (var r10 in n10 = {}, t10) "ref" !== r10 && (n10[r10] = t10[r10]);
    if (e10 = e10.defaultProps) for (var l10 in n10 === t10 && (n10 = _({}, n10)), e10) void 0 === n10[l10] && (n10[l10] = e10[l10]);
    return n10;
  }
  function oI(e10) {
    rs(e10);
  }
  function oD(e10) {
    console.error(e10);
  }
  function oF(e10) {
    rs(e10);
  }
  function oA(e10, t10) {
    try {
      (0, e10.onUncaughtError)(t10.value, { componentStack: t10.stack });
    } catch (e11) {
      setTimeout(function() {
        throw e11;
      });
    }
  }
  function oj(e10, t10, n10) {
    try {
      (0, e10.onCaughtError)(n10.value, { componentStack: n10.stack, errorBoundary: 1 === t10.tag ? t10.stateNode : null });
    } catch (e11) {
      setTimeout(function() {
        throw e11;
      });
    }
  }
  function oU(e10, t10, n10) {
    return (n10 = lq(n10)).tag = 3, n10.payload = { element: null }, n10.callback = function() {
      oA(e10, t10);
    }, n10;
  }
  function oB(e10) {
    return (e10 = lq(e10)).tag = 3, e10;
  }
  function oV(e10, t10, n10, r10) {
    var l10 = n10.type.getDerivedStateFromError;
    if ("function" == typeof l10) {
      var a10 = r10.value;
      e10.payload = function() {
        return l10(a10);
      }, e10.callback = function() {
        oj(t10, n10, r10);
      };
    }
    var o10 = n10.stateNode;
    null !== o10 && "function" == typeof o10.componentDidCatch && (e10.callback = function() {
      oj(t10, n10, r10), "function" != typeof l10 && (null === uG ? uG = /* @__PURE__ */ new Set([this]) : uG.add(this));
      var e11 = r10.stack;
      this.componentDidCatch(r10.value, { componentStack: null !== e11 ? e11 : "" });
    });
  }
  var oH = Error(u(461)), o$ = false;
  function oQ(e10, t10, n10, r10) {
    t10.child = null === e10 ? lH(t10, null, n10, r10) : lV(t10, e10.child, n10, r10);
  }
  function oW(e10, t10, n10, r10, l10) {
    n10 = n10.render;
    var a10 = t10.ref;
    if ("ref" in r10) {
      var o10 = {};
      for (var i10 in r10) "ref" !== i10 && (o10[i10] = r10[i10]);
    } else o10 = r10;
    return (ll(t10), r10 = aS(e10, t10, n10, o10, a10, l10), i10 = ax(), null === e10 || o$) ? (rX && i10 && rH(t10), t10.flags |= 1, oQ(e10, t10, r10, l10), t10.child) : (aP(e10, t10, l10), is(e10, t10, l10));
  }
  function oq(e10, t10, n10, r10, l10) {
    if (null === e10) {
      var a10 = n10.type;
      return "function" != typeof a10 || rk(a10) || void 0 !== a10.defaultProps || null !== n10.compare ? ((e10 = rx(n10.type, null, r10, t10, t10.mode, l10)).ref = t10.ref, e10.return = t10, t10.child = e10) : (t10.tag = 15, t10.type = a10, oX(e10, t10, a10, r10, l10));
    }
    if (a10 = e10.child, !ic(e10, l10)) {
      var o10 = a10.memoizedProps;
      if ((n10 = null !== (n10 = n10.compare) ? n10 : nV)(o10, r10) && e10.ref === t10.ref) return is(e10, t10, l10);
    }
    return t10.flags |= 1, (e10 = rE(a10, r10)).ref = t10.ref, e10.return = t10, t10.child = e10;
  }
  function oX(e10, t10, n10, r10, l10) {
    if (null !== e10) {
      var a10 = e10.memoizedProps;
      if (nV(a10, r10) && e10.ref === t10.ref) if (o$ = false, t10.pendingProps = r10 = a10, !ic(e10, l10)) return t10.lanes = e10.lanes, is(e10, t10, l10);
      else 0 != (131072 & e10.flags) && (o$ = true);
    }
    return o1(e10, t10, n10, r10, l10);
  }
  function oK(e10, t10, n10, r10) {
    var l10 = r10.children, a10 = null !== e10 ? e10.memoizedState : null;
    if (null === e10 && null === t10.stateNode && (t10.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), "hidden" === r10.mode) {
      if (0 != (128 & t10.flags)) {
        if (a10 = null !== a10 ? a10.baseLanes | n10 : n10, null !== e10) {
          for (r10 = t10.child = e10.child, l10 = 0; null !== r10; ) l10 = l10 | r10.lanes | r10.childLanes, r10 = r10.sibling;
          r10 = l10 & ~a10;
        } else r10 = 0, t10.child = null;
        return oY(e10, t10, a10, n10, r10);
      }
      if (0 == (536870912 & n10)) return r10 = t10.lanes = 536870912, oY(e10, t10, null !== a10 ? a10.baseLanes | n10 : n10, n10, r10);
      t10.memoizedState = { baseLanes: 0, cachePool: null }, null !== e10 && l_(t10, null !== a10 ? a10.cachePool : null), null !== a10 ? l4(t10, a10) : l6(), at(t10);
    } else null !== a10 ? (l_(t10, a10.cachePool), l4(t10, a10), an(), t10.memoizedState = null) : (null !== e10 && l_(t10, null), l6(), an());
    return oQ(e10, t10, l10, n10), t10.child;
  }
  function oG(e10, t10) {
    return null !== e10 && 22 === e10.tag || null !== t10.stateNode || (t10.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t10.sibling;
  }
  function oY(e10, t10, n10, r10, l10) {
    var a10 = lE();
    return t10.memoizedState = { baseLanes: n10, cachePool: a10 = null === a10 ? null : { parent: lf._currentValue, pool: a10 } }, null !== e10 && l_(t10, null), l6(), at(t10), null !== e10 && ln(e10, t10, r10, true), t10.childLanes = l10, null;
  }
  function oJ(e10, t10) {
    return (t10 = ie({ mode: t10.mode, children: t10.children }, e10.mode)).ref = e10.ref, e10.child = t10, t10.return = e10, t10;
  }
  function oZ(e10, t10, n10) {
    return lV(t10, e10.child, null, n10), e10 = oJ(t10, t10.pendingProps), e10.flags |= 2, ar(t10), t10.memoizedState = null, e10;
  }
  function o0(e10, t10) {
    var n10 = t10.ref;
    if (null === n10) null !== e10 && null !== e10.ref && (t10.flags |= 4194816);
    else {
      if ("function" != typeof n10 && "object" != typeof n10) throw Error(u(284));
      (null === e10 || e10.ref !== n10) && (t10.flags |= 4194816);
    }
  }
  function o1(e10, t10, n10, r10, l10) {
    return (ll(t10), n10 = aS(e10, t10, n10, r10, void 0, l10), r10 = ax(), null === e10 || o$) ? (rX && r10 && rH(t10), t10.flags |= 1, oQ(e10, t10, n10, l10), t10.child) : (aP(e10, t10, l10), is(e10, t10, l10));
  }
  function o2(e10, t10, n10, r10, l10, a10) {
    return (ll(t10), t10.updateQueue = null, n10 = aE(t10, r10, n10, l10), ak(e10), r10 = ax(), null === e10 || o$) ? (rX && r10 && rH(t10), t10.flags |= 1, oQ(e10, t10, n10, a10), t10.child) : (aP(e10, t10, a10), is(e10, t10, a10));
  }
  function o3(e10, t10, n10, r10, l10) {
    if (ll(t10), null === t10.stateNode) {
      var a10 = rb, o10 = n10.contextType;
      "object" == typeof o10 && null !== o10 && (a10 = la(o10)), t10.memoizedState = null !== (a10 = new n10(r10, a10)).state && void 0 !== a10.state ? a10.state : null, a10.updater = oz, t10.stateNode = a10, a10._reactInternals = t10, (a10 = t10.stateNode).props = r10, a10.state = t10.memoizedState, a10.refs = {}, lQ(t10), o10 = n10.contextType, a10.context = "object" == typeof o10 && null !== o10 ? la(o10) : rb, a10.state = t10.memoizedState, "function" == typeof (o10 = n10.getDerivedStateFromProps) && (oO(t10, n10, o10, r10), a10.state = t10.memoizedState), "function" == typeof n10.getDerivedStateFromProps || "function" == typeof a10.getSnapshotBeforeUpdate || "function" != typeof a10.UNSAFE_componentWillMount && "function" != typeof a10.componentWillMount || (o10 = a10.state, "function" == typeof a10.componentWillMount && a10.componentWillMount(), "function" == typeof a10.UNSAFE_componentWillMount && a10.UNSAFE_componentWillMount(), o10 !== a10.state && oz.enqueueReplaceState(a10, a10.state, null), lZ(t10, r10, a10, l10), lJ(), a10.state = t10.memoizedState), "function" == typeof a10.componentDidMount && (t10.flags |= 4194308), r10 = true;
    } else if (null === e10) {
      a10 = t10.stateNode;
      var i10 = t10.memoizedProps, u10 = oM(n10, i10);
      a10.props = u10;
      var s10 = a10.context, c10 = n10.contextType;
      o10 = rb, "object" == typeof c10 && null !== c10 && (o10 = la(c10));
      var f10 = n10.getDerivedStateFromProps;
      c10 = "function" == typeof f10 || "function" == typeof a10.getSnapshotBeforeUpdate, i10 = t10.pendingProps !== i10, c10 || "function" != typeof a10.UNSAFE_componentWillReceiveProps && "function" != typeof a10.componentWillReceiveProps || (i10 || s10 !== o10) && oR(t10, a10, r10, o10), l$ = false;
      var d2 = t10.memoizedState;
      a10.state = d2, lZ(t10, r10, a10, l10), lJ(), s10 = t10.memoizedState, i10 || d2 !== s10 || l$ ? ("function" == typeof f10 && (oO(t10, n10, f10, r10), s10 = t10.memoizedState), (u10 = l$ || oL(t10, n10, u10, r10, d2, s10, o10)) ? (c10 || "function" != typeof a10.UNSAFE_componentWillMount && "function" != typeof a10.componentWillMount || ("function" == typeof a10.componentWillMount && a10.componentWillMount(), "function" == typeof a10.UNSAFE_componentWillMount && a10.UNSAFE_componentWillMount()), "function" == typeof a10.componentDidMount && (t10.flags |= 4194308)) : ("function" == typeof a10.componentDidMount && (t10.flags |= 4194308), t10.memoizedProps = r10, t10.memoizedState = s10), a10.props = r10, a10.state = s10, a10.context = o10, r10 = u10) : ("function" == typeof a10.componentDidMount && (t10.flags |= 4194308), r10 = false);
    } else {
      a10 = t10.stateNode, lW(e10, t10), c10 = oM(n10, o10 = t10.memoizedProps), a10.props = c10, f10 = t10.pendingProps, d2 = a10.context, s10 = n10.contextType, u10 = rb, "object" == typeof s10 && null !== s10 && (u10 = la(s10)), (s10 = "function" == typeof (i10 = n10.getDerivedStateFromProps) || "function" == typeof a10.getSnapshotBeforeUpdate) || "function" != typeof a10.UNSAFE_componentWillReceiveProps && "function" != typeof a10.componentWillReceiveProps || (o10 !== f10 || d2 !== u10) && oR(t10, a10, r10, u10), l$ = false, d2 = t10.memoizedState, a10.state = d2, lZ(t10, r10, a10, l10), lJ();
      var p2 = t10.memoizedState;
      o10 !== f10 || d2 !== p2 || l$ || null !== e10 && null !== e10.dependencies && lr(e10.dependencies) ? ("function" == typeof i10 && (oO(t10, n10, i10, r10), p2 = t10.memoizedState), (c10 = l$ || oL(t10, n10, c10, r10, d2, p2, u10) || null !== e10 && null !== e10.dependencies && lr(e10.dependencies)) ? (s10 || "function" != typeof a10.UNSAFE_componentWillUpdate && "function" != typeof a10.componentWillUpdate || ("function" == typeof a10.componentWillUpdate && a10.componentWillUpdate(r10, p2, u10), "function" == typeof a10.UNSAFE_componentWillUpdate && a10.UNSAFE_componentWillUpdate(r10, p2, u10)), "function" == typeof a10.componentDidUpdate && (t10.flags |= 4), "function" == typeof a10.getSnapshotBeforeUpdate && (t10.flags |= 1024)) : ("function" != typeof a10.componentDidUpdate || o10 === e10.memoizedProps && d2 === e10.memoizedState || (t10.flags |= 4), "function" != typeof a10.getSnapshotBeforeUpdate || o10 === e10.memoizedProps && d2 === e10.memoizedState || (t10.flags |= 1024), t10.memoizedProps = r10, t10.memoizedState = p2), a10.props = r10, a10.state = p2, a10.context = u10, r10 = c10) : ("function" != typeof a10.componentDidUpdate || o10 === e10.memoizedProps && d2 === e10.memoizedState || (t10.flags |= 4), "function" != typeof a10.getSnapshotBeforeUpdate || o10 === e10.memoizedProps && d2 === e10.memoizedState || (t10.flags |= 1024), r10 = false);
    }
    return a10 = r10, o0(e10, t10), r10 = 0 != (128 & t10.flags), a10 || r10 ? (a10 = t10.stateNode, n10 = r10 && "function" != typeof n10.getDerivedStateFromError ? null : a10.render(), t10.flags |= 1, null !== e10 && r10 ? (t10.child = lV(t10, e10.child, null, l10), t10.child = lV(t10, null, n10, l10)) : oQ(e10, t10, n10, l10), t10.memoizedState = a10.state, e10 = t10.child) : e10 = is(e10, t10, l10), e10;
  }
  function o4(e10, t10, n10, r10) {
    return r2(), t10.flags |= 256, oQ(e10, t10, n10, r10), t10.child;
  }
  var o6 = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function o5(e10) {
    return { baseLanes: e10, cachePool: lx() };
  }
  function o8(e10, t10, n10) {
    return e10 = null !== e10 ? e10.childLanes & ~n10 : 0, t10 && (e10 |= uB), e10;
  }
  function o7(e10, t10, n10) {
    var r10, l10 = t10.pendingProps, a10 = false, o10 = 0 != (128 & t10.flags);
    if ((r10 = o10) || (r10 = (null === e10 || null !== e10.memoizedState) && 0 != (2 & al.current)), r10 && (a10 = true, t10.flags &= -129), r10 = 0 != (32 & t10.flags), t10.flags &= -33, null === e10) {
      if (rX) {
        if (a10 ? l9(t10) : an(), (e10 = rq) ? null !== (e10 = null !== (e10 = cG(e10, rG)) && "&" !== e10.data ? e10 : null) && (t10.memoizedState = { dehydrated: e10, treeContext: null !== rA ? { id: rj, overflow: rU } : null, retryLane: 536870912, hydrationErrors: null }, (n10 = rC(e10)).return = t10, t10.child = n10, rW = t10, rq = null) : e10 = null, null === e10) throw rJ(t10);
        return cJ(e10) ? t10.lanes = 32 : t10.lanes = 536870912, null;
      }
      return (o10 = l10.children, l10 = l10.fallback, a10) ? (an(), o10 = ie({ mode: "hidden", children: o10 }, a10 = t10.mode), l10 = rP(l10, a10, n10, null), o10.return = t10, l10.return = t10, o10.sibling = l10, t10.child = o10, (l10 = t10.child).memoizedState = o5(n10), l10.childLanes = o8(e10, r10, n10), t10.memoizedState = o6, oG(null, l10)) : (l9(t10), o9(t10, o10));
    }
    var i10 = e10.memoizedState;
    if (null !== i10) {
      var s10 = i10.dehydrated;
      if (null !== s10) {
        var c10 = e10, f10 = t10, d2 = o10, p2 = r10, m2 = l10, h2 = s10, g2 = i10, v2 = n10;
        if (d2) return 256 & f10.flags ? (l9(f10), f10.flags &= -257, it(c10, f10, v2)) : null !== f10.memoizedState ? (an(), f10.child = c10.child, f10.flags |= 128, null) : (an(), h2 = m2.fallback, g2 = f10.mode, m2 = ie({ mode: "visible", children: m2.children }, g2), h2 = rP(h2, g2, v2, null), h2.flags |= 2, m2.return = f10, h2.return = f10, m2.sibling = h2, f10.child = m2, lV(f10, c10.child, null, v2), (m2 = f10.child).memoizedState = o5(v2), m2.childLanes = o8(c10, p2, v2), f10.memoizedState = o6, oG(null, m2));
        if (l9(f10), cJ(h2)) {
          if (p2 = h2.nextSibling && h2.nextSibling.dataset) var y2 = p2.dgst;
          return "" !== (p2 = y2) && ((m2 = Error(u(419))).stack = "", m2.digest = p2, r4({ value: m2, source: null, stack: null })), it(c10, f10, v2);
        }
        if (o$ || ln(c10, f10, v2, false), p2 = 0 != (v2 & c10.childLanes), o$ || p2) {
          if (null !== l2.current) return it(c10, f10, v2);
          if (null !== (p2 = uC) && 0 !== (m2 = eB(p2, v2)) && m2 !== g2.retryLane) throw g2.retryLane = m2, rg(c10, m2), sn(p2, c10, m2), oH;
          return cY(h2) || sp(), it(c10, f10, v2);
        }
        return cY(h2) ? (f10.flags |= 192, f10.child = c10.child, null) : (c10 = g2.treeContext, rq = cZ(h2.nextSibling), rW = f10, rX = true, rK = null, rG = false, null !== c10 && rQ(f10, c10), f10 = o9(f10, m2.children), f10.flags |= 134221824, f10);
      }
    }
    return a10 ? (an(), a10 = l10.fallback, o10 = t10.mode, s10 = (i10 = e10.child).sibling, (l10 = rE(i10, { mode: "hidden", children: l10.children })).subtreeFlags = 1206910976 & i10.subtreeFlags, null !== s10 ? a10 = rE(s10, a10) : (a10 = rP(a10, o10, n10, null), a10.flags |= 2), a10.return = t10, l10.return = t10, l10.sibling = a10, t10.child = l10, oG(null, l10), l10 = t10.child, null === (a10 = e10.child.memoizedState) ? a10 = o5(n10) : (null !== (o10 = a10.cachePool) ? (i10 = lf._currentValue, o10 = o10.parent !== i10 ? { parent: i10, pool: i10 } : o10) : o10 = lx(), a10 = { baseLanes: a10.baseLanes | n10, cachePool: o10 }), l10.memoizedState = a10, l10.childLanes = o8(e10, r10, n10), t10.memoizedState = o6, oG(e10.child, l10)) : (l9(t10), e10 = (n10 = e10.child).sibling, (n10 = rE(n10, { mode: "visible", children: l10.children })).return = t10, n10.sibling = null, null !== e10 && (null === (r10 = t10.deletions) ? (t10.deletions = [e10], t10.flags |= 16) : r10.push(e10)), t10.child = n10, t10.memoizedState = null, n10);
  }
  function o9(e10, t10) {
    return (t10 = ie({ mode: "visible", children: t10 }, e10.mode)).return = e10, e10.child = t10;
  }
  function ie(e10, t10) {
    return (e10 = rS(22, e10, null, t10)).lanes = 0, e10;
  }
  function it(e10, t10, n10) {
    return lV(t10, e10.child, null, n10), e10 = o9(t10, t10.pendingProps.children), e10.flags |= 2, t10.memoizedState = null, e10;
  }
  function ir(e10, t10, n10) {
    e10.lanes |= t10;
    var r10 = e10.alternate;
    null !== r10 && (r10.lanes |= t10), le(e10.return, t10, n10);
  }
  function il(e10) {
    for (var t10 = null; null !== e10; ) {
      var n10 = e10.alternate;
      null !== n10 && null === ai(n10) && (t10 = e10), e10 = e10.sibling;
    }
    return t10;
  }
  function ia(e10, t10, n10, r10, l10, a10) {
    var o10 = e10.memoizedState;
    null === o10 ? e10.memoizedState = { isBackwards: t10, rendering: null, renderingStartTime: 0, last: r10, tail: n10, tailMode: l10, treeForkCount: a10 } : (o10.isBackwards = t10, o10.rendering = null, o10.renderingStartTime = 0, o10.last = r10, o10.tail = n10, o10.tailMode = l10, o10.treeForkCount = a10);
  }
  function io(e10) {
    var t10 = e10.child;
    for (e10.child = null; null !== t10; ) {
      var n10 = t10.sibling;
      t10.sibling = e10.child, e10.child = t10, t10 = n10;
    }
  }
  function ii(e10, t10, n10) {
    var r10 = t10.pendingProps, l10 = r10.revealOrder, a10 = r10.tail;
    r10 = r10.children;
    var o10 = al.current;
    if (128 & t10.flags) return aa(t10, o10), null;
    var i10 = 0 != (2 & o10);
    if (i10 ? (o10 = 1 & o10 | 2, t10.flags |= 128) : o10 &= 1, aa(t10, o10), "backwards" === l10 && null !== e10 ? (io(e10), oQ(e10, t10, r10, n10), io(e10)) : oQ(e10, t10, r10, n10), r10 = rX ? rI : 0, !i10 && null !== e10 && 0 != (128 & e10.flags)) e: for (e10 = t10.child; null !== e10; ) {
      if (13 === e10.tag) null !== e10.memoizedState && ir(e10, n10, t10);
      else if (19 === e10.tag) ir(e10, n10, t10);
      else if (null !== e10.child) {
        e10.child.return = e10, e10 = e10.child;
        continue;
      }
      if (e10 === t10) break;
      for (; null === e10.sibling; ) {
        if (null === e10.return || e10.return === t10) break e;
        e10 = e10.return;
      }
      e10.sibling.return = e10.return, e10 = e10.sibling;
    }
    switch (l10) {
      case "backwards":
        null === (n10 = il(t10.child)) ? (l10 = t10.child, t10.child = null) : (l10 = n10.sibling, n10.sibling = null, io(t10)), ia(t10, true, l10, null, a10, r10);
        break;
      case "unstable_legacy-backwards":
        for (n10 = null, l10 = t10.child, t10.child = null; null !== l10; ) {
          if (null !== (e10 = l10.alternate) && null === ai(e10)) {
            t10.child = l10;
            break;
          }
          e10 = l10.sibling, l10.sibling = n10, n10 = l10, l10 = e10;
        }
        ia(t10, true, n10, null, a10, r10);
        break;
      case "together":
        ia(t10, false, null, null, void 0, r10);
        break;
      case "independent":
        t10.memoizedState = null;
        break;
      default:
        null === (n10 = il(t10.child)) ? (l10 = t10.child, t10.child = null) : (l10 = n10.sibling, n10.sibling = null), ia(t10, false, l10, n10, a10, r10);
    }
    return t10.child;
  }
  function iu(e10, t10, n10) {
    var r10 = t10.pendingProps;
    return r7(t10, t10.type, r10.value), oQ(e10, t10, r10.children, n10), t10.child;
  }
  function is(e10, t10, n10) {
    if (null !== e10 && (t10.dependencies = e10.dependencies), uA |= t10.lanes, 0 == (n10 & t10.childLanes)) {
      if (null === e10) return null;
      else if (ln(e10, t10, n10, false), 0 == (n10 & t10.childLanes)) return null;
    }
    if (null !== e10 && t10.child !== e10.child) throw Error(u(153));
    if (null !== t10.child) {
      for (n10 = rE(e10 = t10.child, e10.pendingProps), t10.child = n10, n10.return = t10; null !== e10.sibling; ) e10 = e10.sibling, (n10 = n10.sibling = rE(e10, e10.pendingProps)).return = t10;
      n10.sibling = null;
    }
    return t10.child;
  }
  function ic(e10, t10) {
    return 0 != (e10.lanes & t10) || !!(null !== (e10 = e10.dependencies) && lr(e10));
  }
  function id(e10, t10, n10) {
    if (null !== e10) if (e10.memoizedProps !== t10.pendingProps) o$ = true;
    else {
      if (!ic(e10, n10) && 0 == (128 & t10.flags)) return o$ = false, (function(e11, t11, n11) {
        switch (t11.tag) {
          case 3:
            ea(t11, t11.stateNode.containerInfo), r7(t11, lf, e11.memoizedState.cache), r2();
            break;
          case 27:
          case 5:
            ei(t11);
            break;
          case 4:
            ea(t11, t11.stateNode.containerInfo);
            break;
          case 10:
            r7(t11, t11.type, t11.memoizedProps.value);
            break;
          case 31:
            if (null !== t11.memoizedState) return t11.flags |= 128, ae(t11), null;
            break;
          case 13:
            var r11 = t11.memoizedState;
            if (null !== r11) {
              if (null !== r11.dehydrated) return l9(t11), t11.flags |= 128, null;
              r11 = ln(e11, t11, n11, false);
              var l11 = t11.child.childLanes;
              if (r11 || 0 != (n11 & l11)) return o7(e11, t11, n11);
              return l9(t11), null !== (e11 = is(e11, t11, n11)) ? e11.sibling : null;
            }
            l9(t11);
            break;
          case 19:
            if (128 & t11.flags) return ii(e11, t11, n11);
            if (l11 = 0 != (128 & e11.flags), (r11 = 0 != (n11 & t11.childLanes)) || (ln(e11, t11, n11, false), r11 = 0 != (n11 & t11.childLanes)), l11) {
              if (r11) return ii(e11, t11, n11);
              t11.flags |= 128;
            }
            if (null !== (l11 = t11.memoizedState) && (l11.rendering = null, l11.tail = null, l11.lastEffect = null), aa(t11, al.current), !r11) return null;
            break;
          case 22:
            return t11.lanes = 0, oK(e11, t11, n11, t11.pendingProps);
          case 24:
            r7(t11, lf, e11.memoizedState.cache);
        }
        return is(e11, t11, n11);
      })(e10, t10, n10);
      o$ = 0 != (131072 & e10.flags);
    }
    else o$ = false, rX && 0 != (1048576 & t10.flags) && rV(t10, rI, t10.index);
    switch (t10.lanes = 0, t10.tag) {
      case 16:
        e: {
          var r10 = t10.pendingProps;
          if (e10 = lL(t10.elementType), t10.type = e10, "function" == typeof e10) rk(e10) ? (r10 = oM(e10, r10), t10.tag = 1, t10 = o3(null, t10, e10, r10, n10)) : (t10.tag = 0, t10 = o1(null, t10, e10, r10, n10));
          else {
            if (null != e10) {
              var l10 = e10.$$typeof;
              if (l10 === R) {
                t10.tag = 11, t10 = oW(null, t10, e10, r10, n10);
                break e;
              }
              if (l10 === D) {
                t10.tag = 14, t10 = oq(null, t10, e10, r10, n10);
                break e;
              }
              if (l10 === L) {
                t10.tag = 10, t10.type = e10, t10 = iu(null, t10, n10);
                break e;
              }
            }
            throw Error(u(306, t10 = (function e11(t11) {
              if (null == t11) return null;
              if ("function" == typeof t11) return t11.$$typeof === Q ? null : t11.displayName || t11.name || null;
              if ("string" == typeof t11) return t11;
              switch (t11) {
                case C:
                  return "Fragment";
                case O:
                  return "Profiler";
                case T:
                  return "StrictMode";
                case M:
                  return "Suspense";
                case I:
                  return "SuspenseList";
                case A:
                  return "Activity";
                case B:
                  return "ViewTransition";
              }
              if ("object" == typeof t11) switch (t11.$$typeof) {
                case N:
                  return "Portal";
                case L:
                  return t11.displayName || "Context";
                case z:
                  return (t11._context.displayName || "Context") + ".Consumer";
                case R:
                  var n11 = t11.render;
                  return (t11 = t11.displayName) || (t11 = "" !== (t11 = n11.displayName || n11.name || "") ? "ForwardRef(" + t11 + ")" : "ForwardRef"), t11;
                case D:
                  return null !== (n11 = t11.displayName || null) ? n11 : e11(t11.type) || "Memo";
                case F:
                  n11 = t11._payload, t11 = t11._init;
                  try {
                    return e11(t11(n11));
                  } catch (e12) {
                  }
              }
              return null;
            })(e10) || e10, ""));
          }
        }
        return t10;
      case 0:
        return o1(e10, t10, t10.type, t10.pendingProps, n10);
      case 1:
        return l10 = oM(r10 = t10.type, t10.pendingProps), o3(e10, t10, r10, l10, n10);
      case 3:
        e: {
          if (ea(t10, t10.stateNode.containerInfo), null === e10) throw Error(u(387));
          r10 = t10.pendingProps;
          var a10 = t10.memoizedState;
          l10 = a10.element, lW(e10, t10), lZ(t10, r10, null, n10);
          var o10 = t10.memoizedState;
          if (r7(t10, lf, r10 = o10.cache), r10 !== a10.cache && lt(t10, [lf], n10, true), lJ(), r10 = o10.element, a10.isDehydrated) if (a10 = { element: r10, isDehydrated: false, cache: o10.cache }, t10.updateQueue.baseState = a10, t10.memoizedState = a10, 256 & t10.flags) {
            t10 = o4(e10, t10, r10, n10);
            break e;
          } else if (r10 !== l10) {
            r4(l10 = rz(Error(u(424)), t10)), t10 = o4(e10, t10, r10, n10);
            break e;
          } else for (rq = cZ((e10 = 9 === (e10 = t10.stateNode.containerInfo).nodeType ? e10.body : "HTML" === e10.nodeName ? e10.ownerDocument.body : e10).firstChild), rW = t10, rX = true, rK = null, rG = true, n10 = lH(t10, null, r10, n10), t10.child = n10; n10; ) n10.flags = -3 & n10.flags | 134221824, n10 = n10.sibling;
          else {
            if (r2(), r10 === l10) {
              t10 = is(e10, t10, n10);
              break e;
            }
            oQ(e10, t10, r10, n10);
          }
          t10 = t10.child;
        }
        return t10;
      case 26:
        return o0(e10, t10), null === e10 ? (n10 = fn(t10.type, null, t10.pendingProps, null)) ? t10.memoizedState = n10 : rX || (n10 = t10.type, e10 = t10.pendingProps, (r10 = cp(er.current).createElement(n10))[eq] = t10, r10[eX] = e10, cu(r10, n10, e10), e8(r10), t10.stateNode = r10) : t10.memoizedState = fn(t10.type, e10.memoizedProps, t10.pendingProps, e10.memoizedState), null;
      case 27:
        return ei(t10), null === e10 && rX && (r10 = t10.stateNode = c3(t10.type, t10.pendingProps, er.current), rW = t10, rG = true, l10 = rq, cE(t10.type) ? (c0 = l10, rq = cZ(r10.firstChild)) : rq = l10), oQ(e10, t10, t10.pendingProps.children, n10), o0(e10, t10), null === e10 && (t10.flags |= 4194304), t10.child;
      case 5:
        return null === e10 && rX && ((l10 = r10 = rq) && (null !== (r10 = (function(e11, t11, n11, r11) {
          for (; 1 === e11.nodeType; ) {
            if (e11.nodeName.toLowerCase() !== t11.toLowerCase()) {
              if (!r11 && ("INPUT" !== e11.nodeName || "hidden" !== e11.type)) break;
            } else if (r11) {
              if (!e11[e0]) switch (t11) {
                case "meta":
                  if (!e11.hasAttribute("itemprop")) break;
                  return e11;
                case "link":
                  if ("stylesheet" === (l11 = e11.getAttribute("rel")) && e11.hasAttribute("data-precedence") || l11 !== n11.rel || e11.getAttribute("href") !== (null == n11.href || "" === n11.href ? null : n11.href) || e11.getAttribute("crossorigin") !== (null == n11.crossOrigin ? null : n11.crossOrigin) || e11.getAttribute("title") !== (null == n11.title ? null : n11.title)) break;
                  return e11;
                case "style":
                  if (e11.hasAttribute("data-precedence")) break;
                  return e11;
                case "script":
                  if (((l11 = e11.getAttribute("src")) !== (null == n11.src ? null : n11.src) || e11.getAttribute("type") !== (null == n11.type ? null : n11.type) || e11.getAttribute("crossorigin") !== (null == n11.crossOrigin ? null : n11.crossOrigin)) && l11 && e11.hasAttribute("async") && !e11.hasAttribute("itemprop")) break;
                  return e11;
                default:
                  return e11;
              }
            } else {
              if ("input" !== t11 || "hidden" !== e11.type) return e11;
              var l11 = null == n11.name ? null : "" + n11.name;
              if ("hidden" === n11.type && e11.getAttribute("name") === l11) return e11;
            }
            if (null === (e11 = cZ(e11.nextSibling))) break;
          }
          return null;
        })(r10, t10.type, t10.pendingProps, rG)) ? (t10.stateNode = r10, rW = t10, rq = cZ(r10.firstChild), rG = false, l10 = true) : l10 = false), l10 || rJ(t10)), ei(t10), l10 = t10.type, a10 = t10.pendingProps, o10 = null !== e10 ? e10.memoizedProps : null, r10 = a10.children, cg(l10, a10) ? r10 = null : null !== o10 && cg(l10, o10) && (t10.flags |= 32), null !== t10.memoizedState && (fP._currentValue = l10 = aS(e10, t10, a_, null, null, n10)), o0(e10, t10), oQ(e10, t10, r10, n10), t10.child;
      case 6:
        return null === e10 && rX && ((e10 = n10 = rq) && (null !== (n10 = (function(e11, t11, n11) {
          if ("" === t11) return null;
          for (; 3 !== e11.nodeType; ) if ((1 !== e11.nodeType || "INPUT" !== e11.nodeName || "hidden" !== e11.type) && !n11 || null === (e11 = cZ(e11.nextSibling))) return null;
          return e11;
        })(n10, t10.pendingProps, rG)) ? (t10.stateNode = n10, rW = t10, rq = null, e10 = true) : e10 = false), e10 || rJ(t10)), null;
      case 13:
        return o7(e10, t10, n10);
      case 4:
        return ea(t10, t10.stateNode.containerInfo), r10 = t10.pendingProps, null === e10 ? t10.child = lV(t10, null, r10, n10) : oQ(e10, t10, r10, n10), t10.child;
      case 11:
        return oW(e10, t10, t10.type, t10.pendingProps, n10);
      case 7:
        return r10 = t10.pendingProps, o0(e10, t10), oQ(e10, t10, r10, n10), t10.child;
      case 8:
      case 12:
        return oQ(e10, t10, t10.pendingProps.children, n10), t10.child;
      case 10:
        return iu(e10, t10, n10);
      case 9:
        return l10 = t10.type._context, r10 = t10.pendingProps.children, ll(t10), r10 = r10(l10 = la(l10)), t10.flags |= 1, oQ(e10, t10, r10, n10), t10.child;
      case 14:
        return oq(e10, t10, t10.type, t10.pendingProps, n10);
      case 15:
        return oX(e10, t10, t10.type, t10.pendingProps, n10);
      case 19:
        return ii(e10, t10, n10);
      case 31:
        var i10 = e10, s10 = t10, c10 = n10, f10 = s10.pendingProps, d2 = 0 != (128 & s10.flags);
        if (s10.flags &= -129, null === i10) {
          if (rX) {
            if ("hidden" === f10.mode) return i10 = oJ(s10, f10), s10.lanes = 536870912, oG(null, i10);
            if (ae(s10), (i10 = rq) ? null !== (i10 = null !== (i10 = cG(i10, rG)) && "&" === i10.data ? i10 : null) && (s10.memoizedState = { dehydrated: i10, treeContext: null !== rA ? { id: rj, overflow: rU } : null, retryLane: 536870912, hydrationErrors: null }, (c10 = rC(i10)).return = s10, s10.child = c10, rW = s10, rq = null) : i10 = null, null === i10) throw rJ(s10);
            return s10.lanes = 536870912, null;
          }
          return oJ(s10, f10);
        }
        var p2 = i10.memoizedState;
        if (null !== p2) {
          var m2 = p2.dehydrated;
          if (ae(s10), d2) if (256 & s10.flags) s10.flags &= -257, s10 = oZ(i10, s10, c10);
          else if (null !== s10.memoizedState) s10.child = i10.child, s10.flags |= 128, s10 = null;
          else throw Error(u(558));
          else if (o$ || ln(i10, s10, c10, false), d2 = 0 != (c10 & i10.childLanes), o$ || d2) {
            if (null === l2.current) {
              if (null !== (f10 = uC) && 0 !== (m2 = eB(f10, c10)) && m2 !== p2.retryLane) throw p2.retryLane = m2, rg(i10, m2), sn(f10, i10, m2), oH;
              sp();
            }
            s10 = oZ(i10, s10, c10);
          } else i10 = p2.treeContext, rq = cZ(m2.nextSibling), rW = s10, rX = true, rK = null, rG = false, null !== i10 && rQ(s10, i10), s10 = oJ(s10, f10), s10.flags |= 134221824;
          return s10;
        }
        return (i10 = rE(i10.child, { mode: f10.mode, children: f10.children })).ref = s10.ref, s10.child = i10, i10.return = s10, i10;
      case 22:
        return oK(e10, t10, n10, t10.pendingProps);
      case 24:
        return ll(t10), r10 = la(lf), null === e10 ? (null === (l10 = lE()) && (l10 = uC, a10 = ld(), l10.pooledCache = a10, a10.refCount++, null !== a10 && (l10.pooledCacheLanes |= n10), l10 = a10), t10.memoizedState = { parent: r10, cache: l10 }, lQ(t10), r7(t10, lf, l10)) : (0 != (e10.lanes & n10) && (lW(e10, t10), lZ(t10, null, null, n10), lJ()), l10 = e10.memoizedState, a10 = t10.memoizedState, l10.parent !== r10 ? (l10 = { parent: r10, cache: r10 }, t10.memoizedState = l10, 0 === t10.lanes && (t10.memoizedState = t10.updateQueue.baseState = l10), r7(t10, lf, r10)) : (r7(t10, lf, r10 = a10.cache), r10 !== l10.cache && lt(t10, [lf], n10, true))), oQ(e10, t10, t10.pendingProps.children, n10), t10.child;
      case 30:
        return null === t10.stateNode && (t10.stateNode = { autoName: null, paired: null, clones: null, ref: null }), null != (r10 = t10.pendingProps).name && "auto" !== r10.name ? t10.flags |= null === e10 ? 18882560 : 18874368 : rX && rH(t10), null !== e10 && e10.memoizedProps.name !== r10.name ? t10.flags |= 4194816 : o0(e10, t10), oQ(e10, t10, r10.children, n10), t10.child;
      case 29:
        throw t10.pendingProps;
    }
    throw Error(u(156, t10.tag));
  }
  function ip(e10) {
    e10.flags |= 4;
  }
  function im(e10, t10, n10, r10, l10) {
    var a10;
    if ((a10 = 0 != (32 & e10.mode)) && (a10 = null === n10 ? fh(t10, r10) : fh(t10, r10) && (r10.src !== n10.src || r10.srcSet !== n10.srcSet)), a10) {
      if (e10.flags |= 16777216, (335544128 & l10) === l10) if (e10.stateNode.complete) e10.flags |= 8192;
      else if (sc()) e10.flags |= 8192;
      else throw lR = lT, lN;
    } else e10.flags &= -16777217;
  }
  function ih(e10, t10) {
    if ("stylesheet" !== t10.type || 0 != (4 & t10.state.loading)) e10.flags &= -16777217;
    else if (e10.flags |= 16777216, !fg(t10)) if (sc()) e10.flags |= 8192;
    else throw lR = lT, lN;
  }
  function ig(e10, t10) {
    null !== t10 && (e10.flags |= 4), 16384 & e10.flags && (t10 = 22 !== e10.tag ? eD() : 536870912, e10.lanes |= t10, uV |= t10);
  }
  function iv(e10, t10) {
    if (!rX) switch (e10.tailMode) {
      case "visible":
        break;
      case "collapsed":
        for (var n10 = e10.tail, r10 = null; null !== n10; ) null !== n10.alternate && (r10 = n10), n10 = n10.sibling;
        null === r10 ? t10 || null === e10.tail ? e10.tail = null : e10.tail.sibling = null : r10.sibling = null;
        break;
      default:
        for (t10 = e10.tail, n10 = null; null !== t10; ) null !== t10.alternate && (n10 = t10), t10 = t10.sibling;
        null === n10 ? e10.tail = null : n10.sibling = null;
    }
  }
  function iy(e10) {
    var t10 = null !== e10.alternate && e10.alternate.child === e10.child, n10 = 0, r10 = 0;
    if (t10) for (var l10 = e10.child; null !== l10; ) n10 |= l10.lanes | l10.childLanes, r10 |= 1206910976 & l10.subtreeFlags, r10 |= 1206910976 & l10.flags, l10.return = e10, l10 = l10.sibling;
    else for (l10 = e10.child; null !== l10; ) n10 |= l10.lanes | l10.childLanes, r10 |= l10.subtreeFlags, r10 |= l10.flags, l10.return = e10, l10 = l10.sibling;
    return e10.subtreeFlags |= r10, e10.childLanes = n10, t10;
  }
  function ib(e10, t10) {
    switch (r$(t10), t10.tag) {
      case 3:
        r9(lf), eo();
        break;
      case 26:
      case 27:
      case 5:
        eu(t10);
        break;
      case 4:
        eo();
        break;
      case 31:
        null !== t10.memoizedState && ar(t10);
        break;
      case 13:
        ar(t10);
        break;
      case 19:
        ao(t10);
        break;
      case 10:
        r9(t10.type);
        break;
      case 22:
      case 23:
        ar(t10), l5(), null !== e10 && Z(lk);
        break;
      case 24:
        r9(lf);
    }
  }
  function iw(e10, t10) {
    try {
      var n10 = t10.updateQueue, r10 = null !== n10 ? n10.lastEffect : null;
      if (null !== r10) {
        var l10 = r10.next;
        n10 = l10;
        do {
          if ((n10.tag & e10) === e10) {
            r10 = void 0;
            var a10 = n10.create;
            n10.inst.destroy = r10 = a10();
          }
          n10 = n10.next;
        } while (n10 !== l10);
      }
    } catch (e11) {
      sO(t10, t10.return, e11);
    }
  }
  function iS(e10, t10, n10) {
    try {
      var r10 = t10.updateQueue, l10 = null !== r10 ? r10.lastEffect : null;
      if (null !== l10) {
        var a10 = l10.next;
        r10 = a10;
        do {
          if ((r10.tag & e10) === e10) {
            var o10 = r10.inst, i10 = o10.destroy;
            if (void 0 !== i10) {
              o10.destroy = void 0, l10 = t10;
              try {
                i10();
              } catch (e11) {
                sO(l10, n10, e11);
              }
            }
          }
          r10 = r10.next;
        } while (r10 !== a10);
      }
    } catch (e11) {
      sO(t10, t10.return, e11);
    }
  }
  function ik(e10) {
    var t10 = e10.updateQueue;
    if (null !== t10) {
      var n10 = e10.stateNode;
      try {
        l1(t10, n10);
      } catch (t11) {
        sO(e10, e10.return, t11);
      }
    }
  }
  function iE(e10, t10, n10) {
    n10.props = oM(e10.type, e10.memoizedProps), n10.state = e10.memoizedState;
    try {
      n10.componentWillUnmount();
    } catch (n11) {
      sO(e10, t10, n11);
    }
  }
  function i_(e10, t10) {
    try {
      var n10 = e10.ref;
      if (null !== n10) {
        switch (e10.tag) {
          case 26:
          case 27:
          case 5:
            var r10 = e10.stateNode;
            break;
          case 30:
            var l10 = e10.stateNode, a10 = ro(e10.memoizedProps, l10);
            (null === l10.ref || l10.ref.name !== a10) && (l10.ref = cR(a10)), r10 = l10.ref;
            break;
          case 7:
            if (null === e10.stateNode) {
              var o10 = new cM(e10);
              m(e10.child, false, cW, o10, void 0, void 0), e10.stateNode = o10;
            }
            r10 = e10.stateNode;
            break;
          default:
            r10 = e10.stateNode;
        }
        "function" == typeof n10 ? e10.refCleanup = n10(r10) : n10.current = r10;
      }
    } catch (n11) {
      sO(e10, t10, n11);
    }
  }
  function ix(e10, t10) {
    var n10 = e10.ref, r10 = e10.refCleanup;
    if (null !== n10) if ("function" == typeof r10) try {
      r10();
    } catch (n11) {
      sO(e10, t10, n11);
    } finally {
      e10.refCleanup = null, null != (e10 = e10.alternate) && (e10.refCleanup = null);
    }
    else if ("function" == typeof n10) try {
      n10(null);
    } catch (n11) {
      sO(e10, t10, n11);
    }
    else n10.current = null;
  }
  function iP(e10) {
    var t10 = e10.type, n10 = e10.memoizedProps, r10 = e10.stateNode;
    try {
      switch (t10) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n10.autoFocus && r10.focus();
          break;
        case "img":
          n10.src ? r10.src = n10.src : n10.srcSet && (r10.srcset = n10.srcSet);
      }
    } catch (t11) {
      sO(e10, e10.return, t11);
    }
  }
  function iN(e10, t10, n10) {
    try {
      var r10 = e10.stateNode;
      (function(e11, t11, n11, r11) {
        switch (t11) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var l10 = null, a10 = null, o10 = null, i10 = null, s10 = null, c10 = null, f10 = null;
            for (m2 in n11) {
              var d2 = n11[m2];
              if (n11.hasOwnProperty(m2) && null != d2) switch (m2) {
                case "checked":
                case "value":
                  break;
                case "defaultValue":
                  s10 = d2;
                default:
                  r11.hasOwnProperty(m2) || co(e11, t11, m2, null, r11, d2);
              }
            }
            for (var p2 in r11) {
              var m2 = r11[p2];
              if (d2 = n11[p2], r11.hasOwnProperty(p2) && (null != m2 || null != d2)) switch (p2) {
                case "type":
                  m2 !== d2 && (to = true), a10 = m2;
                  break;
                case "name":
                  m2 !== d2 && (to = true), l10 = m2;
                  break;
                case "checked":
                  m2 !== d2 && (to = true), c10 = m2;
                  break;
                case "defaultChecked":
                  m2 !== d2 && (to = true), f10 = m2;
                  break;
                case "value":
                  m2 !== d2 && (to = true), o10 = m2;
                  break;
                case "defaultValue":
                  m2 !== d2 && (to = true), i10 = m2;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != m2) throw Error(u(137, t11));
                  break;
                default:
                  m2 !== d2 && co(e11, t11, p2, m2, r11, d2);
              }
            }
            tv(e11, o10, i10, s10, c10, f10, a10, l10);
            return;
          case "select":
            for (a10 in m2 = o10 = i10 = p2 = null, n11) if (s10 = n11[a10], n11.hasOwnProperty(a10) && null != s10) switch (a10) {
              case "value":
                break;
              case "multiple":
                m2 = s10;
              default:
                r11.hasOwnProperty(a10) || co(e11, t11, a10, null, r11, s10);
            }
            for (l10 in r11) if (a10 = r11[l10], s10 = n11[l10], r11.hasOwnProperty(l10) && (null != a10 || null != s10)) switch (l10) {
              case "value":
                a10 !== s10 && (to = true), p2 = a10;
                break;
              case "defaultValue":
                a10 !== s10 && (to = true), i10 = a10;
                break;
              case "multiple":
                a10 !== s10 && (to = true), o10 = a10;
              default:
                a10 !== s10 && co(e11, t11, l10, a10, r11, s10);
            }
            t11 = i10, n11 = o10, r11 = m2, null != p2 ? tw(e11, !!n11, p2, false) : !!r11 != !!n11 && (null != t11 ? tw(e11, !!n11, t11, true) : tw(e11, !!n11, n11 ? [] : "", false));
            return;
          case "textarea":
            for (i10 in m2 = p2 = null, n11) if (l10 = n11[i10], n11.hasOwnProperty(i10) && null != l10 && !r11.hasOwnProperty(i10)) switch (i10) {
              case "value":
              case "children":
                break;
              default:
                co(e11, t11, i10, null, r11, l10);
            }
            for (o10 in r11) if (l10 = r11[o10], a10 = n11[o10], r11.hasOwnProperty(o10) && (null != l10 || null != a10)) switch (o10) {
              case "value":
                l10 !== a10 && (to = true), p2 = l10;
                break;
              case "defaultValue":
                l10 !== a10 && (to = true), m2 = l10;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (null != l10) throw Error(u(91));
                break;
              default:
                l10 !== a10 && co(e11, t11, o10, l10, r11, a10);
            }
            tS(e11, p2, m2);
            return;
          case "option":
            for (var h2 in n11) p2 = n11[h2], n11.hasOwnProperty(h2) && null != p2 && !r11.hasOwnProperty(h2) && ("selected" === h2 ? e11.selected = false : co(e11, t11, h2, null, r11, p2));
            for (s10 in r11) p2 = r11[s10], m2 = n11[s10], r11.hasOwnProperty(s10) && p2 !== m2 && (null != p2 || null != m2) && ("selected" === s10 ? (p2 !== m2 && (to = true), e11.selected = p2 && "function" != typeof p2 && "symbol" != typeof p2) : co(e11, t11, s10, p2, r11, m2));
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var g2 in n11) p2 = n11[g2], n11.hasOwnProperty(g2) && null != p2 && !r11.hasOwnProperty(g2) && co(e11, t11, g2, null, r11, p2);
            for (c10 in r11) if (p2 = r11[c10], m2 = n11[c10], r11.hasOwnProperty(c10) && p2 !== m2 && (null != p2 || null != m2)) switch (c10) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != p2) throw Error(u(137, t11));
                break;
              default:
                co(e11, t11, c10, p2, r11, m2);
            }
            return;
          default:
            if (tN(t11)) {
              for (var v2 in n11) p2 = n11[v2], n11.hasOwnProperty(v2) && void 0 !== p2 && !r11.hasOwnProperty(v2) && ci(e11, t11, v2, void 0, r11, p2);
              for (f10 in r11) p2 = r11[f10], m2 = n11[f10], r11.hasOwnProperty(f10) && p2 !== m2 && (void 0 !== p2 || void 0 !== m2) && ci(e11, t11, f10, p2, r11, m2);
              return;
            }
        }
        for (var y2 in n11) p2 = n11[y2], n11.hasOwnProperty(y2) && null != p2 && !r11.hasOwnProperty(y2) && co(e11, t11, y2, null, r11, p2);
        for (d2 in r11) p2 = r11[d2], m2 = n11[d2], r11.hasOwnProperty(d2) && p2 !== m2 && (null != p2 || null != m2) && co(e11, t11, d2, p2, r11, m2);
      })(r10, e10.type, n10, t10), r10[eX] = t10;
    } catch (t11) {
      sO(e10, e10.return, t11);
    }
  }
  function iC(e10, t10) {
    if ((5 === e10.tag || 6 === e10.tag) && null === e10.alternate && null !== t10) for (var n10 = 0; n10 < t10.length; n10++) cX(e10.stateNode, t10[n10]);
  }
  function iT(e10) {
    for (var t10 = e10.return; null !== t10; ) {
      if (iz(t10)) {
        var n10 = t10.stateNode, r10 = e10.stateNode;
        if (3 !== r10.nodeType) {
          var l10 = n10._eventListeners;
          if (null !== l10) for (var a10 = 0; a10 < l10.length; a10++) {
            var o10 = l10[a10];
            r10.removeEventListener(o10.type, o10.listener, o10.optionsOrUseCapture);
          }
          null != r10.reactFragments && r10.reactFragments.delete(n10);
        }
      }
      if (iO(t10)) break;
      t10 = t10.return;
    }
  }
  function iO(e10) {
    return 5 === e10.tag || 3 === e10.tag || 26 === e10.tag || 27 === e10.tag && cE(e10.type) || 4 === e10.tag;
  }
  function iz(e10) {
    return e10 && 7 === e10.tag && null !== e10.stateNode;
  }
  function iL(e10) {
    e: for (; ; ) {
      for (; null === e10.sibling; ) {
        if (null === e10.return || iO(e10.return)) return null;
        e10 = e10.return;
      }
      for (e10.sibling.return = e10.return, e10 = e10.sibling; 5 !== e10.tag && 6 !== e10.tag && 18 !== e10.tag; ) {
        if (27 === e10.tag && cE(e10.type) || 2 & e10.flags || null === e10.child || 4 === e10.tag) continue e;
        e10.child.return = e10, e10 = e10.child;
      }
      if (!(2 & e10.flags)) return e10.stateNode;
    }
  }
  function iR(e10, t10, n10, r10) {
    var l10 = e10.tag;
    if (5 === l10 || 6 === l10) l10 = e10.stateNode, t10 ? n10.insertBefore(l10, t10) : n10.appendChild(l10), iC(e10, r10), to = true;
    else if (4 !== l10 && (27 === l10 && cE(e10.type) && (n10 = e10.stateNode), null !== (e10 = e10.child))) for (iR(e10, t10, n10, r10), e10 = e10.sibling; null !== e10; ) iR(e10, t10, n10, r10), e10 = e10.sibling;
  }
  function iM(e10) {
    var t10 = e10.stateNode, n10 = e10.memoizedProps;
    try {
      for (var r10 = e10.type, l10 = t10.attributes; l10.length; ) t10.removeAttributeNode(l10[0]);
      cu(t10, r10, n10), t10[eq] = e10, t10[eX] = n10;
    } catch (t11) {
      sO(e10, e10.return, t11);
    }
  }
  var iI = false, iD = null;
  function iF(e10) {
    (30 === e10.tag || 0 != (33554432 & e10.subtreeFlags)) && (iI = true);
  }
  var iA = null;
  function ij() {
    var e10 = iA;
    return iA = null, e10;
  }
  var iU = 0;
  function iB(e10, t10, n10, r10, l10) {
    return iU = 0, (function e11(t11, n11, r11, l11, a10) {
      for (var o10 = false; null !== t11; ) {
        if (5 === t11.tag) {
          var i10 = t11.stateNode;
          if (null !== l11) {
            var u10 = cT(i10);
            l11.push(u10), u10.view && (o10 = true);
          } else o10 || cT(i10).view && (o10 = true);
          iI = true, cP(i10, 0 === iU ? n11 : n11 + "_" + iU, r11), iU++;
        } else (22 !== t11.tag || null === t11.memoizedState) && (30 === t11.tag && a10 || e11(t11.child, n11, r11, l11, a10) && (o10 = true));
        t11 = t11.sibling;
      }
      return o10;
    })(e10.child, t10, n10, r10, l10);
  }
  function iV(e10, t10) {
    for (; null !== e10; ) 5 === e10.tag ? cN(e10.stateNode, e10.memoizedProps) : (22 !== e10.tag || null === e10.memoizedState) && (30 === e10.tag && t10 || iV(e10.child, t10)), e10 = e10.sibling;
  }
  function iH(e10) {
    if (0 != (18874368 & e10.subtreeFlags)) for (e10 = e10.child; null !== e10; ) {
      if ((22 !== e10.tag || null === e10.memoizedState) && (iH(e10), 30 === e10.tag && 0 != (18874368 & e10.flags) && e10.stateNode.paired)) {
        var t10 = e10.memoizedProps;
        if (null == t10.name || "auto" === t10.name) throw Error(u(544));
        var n10 = t10.name;
        "none" !== (t10 = ru(t10.default, t10.share)) && (iB(e10, n10, t10, null, false) || iV(e10.child, false));
      }
      e10 = e10.sibling;
    }
  }
  function i$(e10, t10) {
    if (30 === e10.tag) {
      var n10 = e10.stateNode, r10 = e10.memoizedProps, l10 = ro(r10, n10), a10 = ru(r10.default, n10.paired ? r10.share : r10.enter);
      "none" !== a10 ? iB(e10, l10, a10, null, false) ? (iH(e10), n10.paired || t10 || st(e10, r10.onEnter)) : iV(e10.child, false) : iH(e10);
    } else if (0 != (33554432 & e10.subtreeFlags)) for (e10 = e10.child; null !== e10; ) i$(e10, t10), e10 = e10.sibling;
    else iH(e10);
  }
  function iQ(e10) {
    if (null !== iD && 0 !== iD.size) {
      var t10 = iD;
      if (0 != (18874368 & e10.subtreeFlags)) for (e10 = e10.child; null !== e10; ) {
        if (22 !== e10.tag || null === e10.memoizedState) {
          if (30 === e10.tag && 0 != (18874368 & e10.flags)) {
            var n10 = e10.memoizedProps, r10 = n10.name;
            if (null != r10 && "auto" !== r10) {
              var l10 = t10.get(r10);
              if (void 0 !== l10) {
                var a10 = ru(n10.default, n10.share);
                if ("none" !== a10 && (iB(e10, r10, a10, null, false) ? (l10.paired = a10 = e10.stateNode, a10.paired = l10, st(e10, n10.onShare)) : iV(e10.child, false)), t10.delete(r10), 0 === t10.size) break;
              }
            }
          }
          iQ(e10);
        }
        e10 = e10.sibling;
      }
    }
  }
  function iW(e10) {
    if (30 === e10.tag) {
      var t10 = e10.memoizedProps, n10 = ro(t10, e10.stateNode), r10 = null !== iD ? iD.get(n10) : void 0, l10 = ru(t10.default, void 0 !== r10 ? t10.share : t10.exit);
      "none" !== l10 && (iB(e10, n10, l10, null, false) ? void 0 !== r10 ? (r10.paired = l10 = e10.stateNode, l10.paired = r10, iD.delete(n10), st(e10, t10.onShare)) : st(e10, t10.onExit) : iV(e10.child, false)), null !== iD && iQ(e10);
    } else if (0 != (33554432 & e10.subtreeFlags)) for (e10 = e10.child; null !== e10; ) iW(e10), e10 = e10.sibling;
    else null !== iD && iQ(e10);
  }
  function iq(e10) {
    if (0 != (18874368 & e10.subtreeFlags)) for (e10 = e10.child; null !== e10; ) {
      if (22 !== e10.tag || null === e10.memoizedState) {
        if (30 === e10.tag && 0 != (18874368 & e10.flags)) {
          var t10 = e10.stateNode;
          null !== t10.paired && (t10.paired = null, iV(e10.child, false));
        }
        iq(e10);
      }
      e10 = e10.sibling;
    }
  }
  function iX(e10) {
    if (30 === e10.tag) e10.stateNode.paired = null, iV(e10.child, false), iq(e10);
    else if (0 != (33554432 & e10.subtreeFlags)) for (e10 = e10.child; null !== e10; ) iX(e10), e10 = e10.sibling;
    else iq(e10);
  }
  function iK(e10, t10, n10, r10, l10, a10, o10) {
    for (var i10 = false; null !== t10; ) {
      if (5 === t10.tag) {
        var u10 = t10.stateNode;
        if (null !== a10 && iU < a10.length) {
          var s10, c10 = a10[iU], f10 = cT(u10);
          if ((c10.view || f10.view) && (i10 = true), s10 = 0 == (4 & e10.flags)) if (f10.clip) s10 = true;
          else {
            s10 = c10.rect;
            var d2 = f10.rect;
            s10 = s10.y !== d2.y || s10.x !== d2.x || s10.height !== d2.height || s10.width !== d2.width;
          }
          s10 && (e10.flags |= 4), f10.abs ? f10 = !c10.abs : (c10 = c10.rect, f10 = f10.rect, f10 = c10.height !== f10.height || c10.width !== f10.width), f10 && (e10.flags |= 32);
        } else e10.flags |= 32;
        0 != (4 & e10.flags) && cP(u10, 0 === iU ? n10 : n10 + "_" + iU, l10), i10 && 0 != (4 & e10.flags) || (null === iA && (iA = []), iA.push(u10, 0 === iU ? r10 : r10 + "_" + iU, t10.memoizedProps)), iU++;
      } else (22 !== t10.tag || null === t10.memoizedState) && (30 === t10.tag && o10 ? e10.flags |= 32 & t10.flags : iK(e10, t10.child, n10, r10, l10, a10, o10) && (i10 = true));
      t10 = t10.sibling;
    }
    return i10;
  }
  var iG = false, iY = false, iJ = false, iZ = false, i0 = "function" == typeof WeakSet ? WeakSet : Set, i1 = null, i2 = false, i3 = false, i4 = false, i6 = false;
  function i5(e10) {
    for (; null !== i1; ) {
      var t10 = i1, n10 = e10, r10 = t10.alternate, l10 = t10.flags;
      switch (t10.tag) {
        case 0:
        case 11:
        case 15:
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 1:
          if (0 != (1024 & l10) && null !== r10) {
            n10 = void 0, l10 = r10.memoizedProps, r10 = r10.memoizedState;
            var a10 = t10.stateNode;
            try {
              var o10 = oM(t10.type, l10);
              n10 = a10.getSnapshotBeforeUpdate(o10, r10), a10.__reactInternalSnapshotBeforeUpdate = n10;
            } catch (e11) {
              sO(t10, t10.return, e11);
            }
          }
          break;
        case 3:
          if (0 != (1024 & l10)) {
            if (9 === (n10 = (r10 = t10.stateNode.containerInfo).nodeType)) cK(r10);
            else if (1 === n10) switch (r10.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                cK(r10);
                break;
              default:
                r10.textContent = "";
            }
          }
          break;
        case 30:
          n10 && null !== r10 && (n10 = ro(r10.memoizedProps, r10.stateNode), "none" !== (l10 = ru((l10 = t10.memoizedProps).default, l10.update)) && iB(r10, n10, l10, r10.memoizedState = [], true));
          break;
        default:
          if (0 != (1024 & l10)) throw Error(u(163));
      }
      if (null !== (r10 = t10.sibling)) {
        r10.return = t10.return, i1 = r10;
        break;
      }
      i1 = t10.return;
    }
  }
  function i8(e10, t10, n10) {
    var r10 = n10.flags;
    switch (n10.tag) {
      case 0:
      case 11:
      case 15:
        ud(e10, n10), 4 & r10 && iw(5, n10);
        break;
      case 1:
        if (ud(e10, n10), 4 & r10) if (e10 = n10.stateNode, null === t10) try {
          e10.componentDidMount();
        } catch (e11) {
          sO(n10, n10.return, e11);
        }
        else {
          var l10 = oM(n10.type, t10.memoizedProps);
          t10 = t10.memoizedState;
          try {
            e10.componentDidUpdate(l10, t10, e10.__reactInternalSnapshotBeforeUpdate);
          } catch (e11) {
            sO(n10, n10.return, e11);
          }
        }
        64 & r10 && ik(n10), 512 & r10 && i_(n10, n10.return);
        break;
      case 3:
        if (ud(e10, n10), 64 & r10 && null !== (e10 = n10.updateQueue)) {
          if (t10 = null, null !== n10.child) switch (n10.child.tag) {
            case 27:
            case 5:
            case 1:
              t10 = n10.child.stateNode;
          }
          try {
            l1(e10, t10);
          } catch (e11) {
            sO(n10, n10.return, e11);
          }
        }
        break;
      case 27:
        null === t10 && 4 & r10 && iM(n10);
      case 26:
      case 5:
        ud(e10, n10), null === t10 && 4 & r10 && iP(n10), 512 & r10 && i_(n10, n10.return);
        break;
      case 12:
        ud(e10, n10);
        break;
      case 31:
        ud(e10, n10), 4 & r10 && ur(e10, n10);
        break;
      case 13:
        ud(e10, n10), 4 & r10 && ul(e10, n10), 64 & r10 && null !== (e10 = n10.memoizedState) && null !== (e10 = e10.dehydrated) && (function(e11, t11) {
          var n11 = e11.ownerDocument;
          if ("$~" === e11.data) e11._reactRetry = t11;
          else if ("$?" !== e11.data || "loading" !== n11.readyState) t11();
          else {
            var r11 = function() {
              t11(), n11.removeEventListener("DOMContentLoaded", r11);
            };
            n11.addEventListener("DOMContentLoaded", r11), e11._reactRetry = r11;
          }
        })(e10, n10 = sM.bind(null, n10));
        break;
      case 22:
        if (!(r10 = null !== n10.memoizedState || iG)) {
          var a10 = null !== t10 && null !== t10.memoizedState || iY;
          t10 = iG, l10 = iY, iG = r10, (iY = a10) && !l10 ? (r10 = 2, 0 != (8772 & n10.subtreeFlags) && (r10 |= 1), (function e11(t11, n11, r11) {
            for (r11 = 0 != (8772 & n11.subtreeFlags) ? r11 : -2 & r11, n11 = n11.child; null !== n11; ) {
              var l11 = n11.alternate, a11 = t11, o10 = n11, i10 = o10.flags, u10 = 0 != (1 & r11);
              switch (o10.tag) {
                case 0:
                case 11:
                case 15:
                  e11(a11, o10, r11), iw(4, o10);
                  break;
                case 1:
                  if (e11(a11, o10, r11), "function" == typeof (a11 = (l11 = o10).stateNode).componentDidMount) try {
                    a11.componentDidMount();
                  } catch (e12) {
                    sO(l11, l11.return, e12);
                  }
                  if (null !== (a11 = (l11 = o10).updateQueue)) {
                    var s10 = l11.stateNode;
                    try {
                      var c10 = a11.shared.hiddenCallbacks;
                      if (null !== c10) for (a11.shared.hiddenCallbacks = null, a11 = 0; a11 < c10.length; a11++) l0(c10[a11], s10);
                    } catch (e12) {
                      sO(l11, l11.return, e12);
                    }
                  }
                  u10 && 64 & i10 && ik(o10), i_(o10, o10.return);
                  break;
                case 27:
                  0 != (2 & r11) && iM(o10);
                case 26:
                case 5:
                  if (5 === o10.tag) {
                    s10 = o10;
                    for (var f10 = s10.return; null !== f10 && (iz(f10) && cX(s10.stateNode, f10.stateNode), !iO(f10)); ) f10 = f10.return;
                  }
                  e11(a11, o10, r11), u10 && null === l11 && 4 & i10 && iP(o10), i_(o10, o10.return);
                  break;
                case 12:
                  e11(a11, o10, r11);
                  break;
                case 31:
                  e11(a11, o10, r11), u10 && 4 & i10 && ur(a11, o10);
                  break;
                case 13:
                  e11(a11, o10, r11), u10 && 4 & i10 && ul(a11, o10);
                  break;
                case 22:
                  null === o10.memoizedState && e11(a11, o10, r11), i_(o10, o10.return);
                  break;
                case 30:
                  e11(a11, o10, r11), i_(o10, o10.return);
                  break;
                case 7:
                  i_(o10, o10.return);
                default:
                  e11(a11, o10, r11);
              }
              n11 = n11.sibling;
            }
          })(e10, n10, r10)) : ud(e10, n10), iG = t10, iY = l10;
        }
        break;
      case 30:
        ud(e10, n10), 512 & r10 && i_(n10, n10.return);
        break;
      case 7:
        512 & r10 && i_(n10, n10.return);
      default:
        ud(e10, n10);
    }
  }
  function i7(e10, t10) {
    for (e10 = e10.child; null !== e10; ) (function e11(t11, n10) {
      switch (t11.tag) {
        case 5:
        case 26:
          try {
            var r10 = t11.stateNode;
            if (n10) {
              var l10 = r10.style;
              "function" == typeof l10.setProperty ? l10.setProperty("display", "none", "important") : l10.display = "none";
            } else {
              var a10 = t11.stateNode, o10 = t11.memoizedProps.style, i10 = null != o10 && o10.hasOwnProperty("display") ? o10.display : null;
              a10.style.display = null == i10 || "boolean" == typeof i10 ? "" : ("" + i10).trim();
            }
          } catch (e12) {
            sO(t11, t11.return, e12);
          }
          !(function t12(n11, r11) {
            if (67108864 & n11.subtreeFlags) for (n11 = n11.child; null !== n11; ) {
              e: {
                var l11 = n11;
                switch (l11.tag) {
                  case 4:
                    e11(l11, r11);
                    break e;
                  case 22:
                    null === l11.memoizedState && t12(l11, r11);
                    break e;
                  default:
                    t12(l11, r11);
                }
              }
              n11 = n11.sibling;
            }
          })(t11, n10);
          break;
        case 6:
          try {
            t11.stateNode.nodeValue = n10 ? "" : t11.memoizedProps, to = true;
          } catch (e12) {
            sO(t11, t11.return, e12);
          }
          break;
        case 18:
          try {
            var u10 = t11.stateNode;
            n10 ? cx(u10, true) : cx(t11.stateNode, false);
          } catch (e12) {
            sO(t11, t11.return, e12);
          }
          break;
        case 22:
        case 23:
          null === t11.memoizedState && i7(t11, n10);
          break;
        default:
          i7(t11, n10);
      }
    })(e10, t10), e10 = e10.sibling;
  }
  var i9 = null, ue = false;
  function ut(e10, t10, n10) {
    for (n10 = n10.child; null !== n10; ) un(e10, t10, n10), n10 = n10.sibling;
  }
  function un(e10, t10, n10) {
    if (eP && "function" == typeof eP.onCommitFiberUnmount) try {
      eP.onCommitFiberUnmount(ex, n10);
    } catch (e11) {
    }
    switch (n10.tag) {
      case 26:
        iY || ix(n10, t10), ut(e10, t10, n10), n10.memoizedState ? n10.memoizedState.count-- : n10.stateNode && (n10 = n10.stateNode).parentNode.removeChild(n10);
        break;
      case 27:
        iY || ix(n10, t10);
        var r10 = i9, l10 = ue;
        cE(n10.type) && (i9 = n10.stateNode, ue = false), ut(e10, t10, n10), c4(n10.stateNode, n10.type, n10.memoizedProps), i9 = r10, ue = l10;
        break;
      case 5:
        iY || ix(n10, t10), 5 !== n10.tag && 6 !== n10.tag || iT(n10);
      case 6:
        if (r10 = i9, l10 = ue, i9 = null, ut(e10, t10, n10), i9 = r10, ue = l10, null !== i9) if (ue) try {
          (9 === i9.nodeType ? i9.body : "HTML" === i9.nodeName ? i9.ownerDocument.body : i9).removeChild(n10.stateNode), to = true;
        } catch (e11) {
          sO(n10, t10, e11);
        }
        else try {
          i9.removeChild(n10.stateNode), to = true;
        } catch (e11) {
          sO(n10, t10, e11);
        }
        break;
      case 18:
        null !== i9 && (ue ? (c_(9 === (e10 = i9).nodeType ? e10.body : "HTML" === e10.nodeName ? e10.ownerDocument.body : e10, n10.stateNode), f6(e10)) : c_(i9, n10.stateNode));
        break;
      case 4:
        r10 = i9, l10 = ue, i9 = n10.stateNode.containerInfo, ue = true, ut(e10, t10, n10), i9 = r10, ue = l10;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        iS(2, n10, t10), iY || iS(4, n10, t10), ut(e10, t10, n10);
        break;
      case 1:
        iY || (ix(n10, t10), "function" == typeof (r10 = n10.stateNode).componentWillUnmount && iE(n10, t10, r10)), ut(e10, t10, n10);
        break;
      case 21:
      default:
        ut(e10, t10, n10);
        break;
      case 22:
        iY = (r10 = iY) || null !== n10.memoizedState, ut(e10, t10, n10), iY = r10;
        break;
      case 30:
        ix(n10, t10), ut(e10, t10, n10);
        break;
      case 7:
        iY || ix(n10, t10), ut(e10, t10, n10);
    }
  }
  function ur(e10, t10) {
    if (null === t10.memoizedState && null !== (e10 = t10.alternate) && null !== (e10 = e10.memoizedState)) {
      e10 = e10.dehydrated;
      try {
        f6(e10);
      } catch (e11) {
        sO(t10, t10.return, e11);
      }
    }
  }
  function ul(e10, t10) {
    if (null === t10.memoizedState && null !== (e10 = t10.alternate) && null !== (e10 = e10.memoizedState) && null !== (e10 = e10.dehydrated)) try {
      f6(e10);
    } catch (e11) {
      sO(t10, t10.return, e11);
    }
  }
  function ua(e10, t10) {
    var n10 = (function(e11) {
      switch (e11.tag) {
        case 31:
        case 13:
        case 19:
          var t11 = e11.stateNode;
          return null === t11 && (t11 = e11.stateNode = new i0()), t11;
        case 22:
          return null === (t11 = (e11 = e11.stateNode)._retryCache) && (t11 = e11._retryCache = new i0()), t11;
        default:
          throw Error(u(435, e11.tag));
      }
    })(e10);
    t10.forEach(function(t11) {
      if (!n10.has(t11)) {
        n10.add(t11);
        var r10 = sI.bind(null, e10, t11);
        t11.then(r10, r10);
      }
    });
  }
  function uo(e10, t10, n10) {
    var r10 = t10.deletions;
    if (null !== r10) for (var l10 = 0; l10 < r10.length; l10++) {
      var a10 = r10[l10], o10 = e10, i10 = t10, s10 = i10;
      e: for (; null !== s10; ) {
        switch (s10.tag) {
          case 27:
            if (cE(s10.type)) {
              i9 = s10.stateNode, ue = false;
              break e;
            }
            break;
          case 5:
            i9 = s10.stateNode, ue = false;
            break e;
          case 3:
          case 4:
            i9 = s10.stateNode.containerInfo, ue = true;
            break e;
        }
        s10 = s10.return;
      }
      if (null === i9) throw Error(u(160));
      un(o10, i10, a10), i9 = null, ue = false, null !== (o10 = a10.alternate) && (o10.return = null), a10.return = null;
    }
    if (13886 & t10.subtreeFlags) for (t10 = t10.child; null !== t10; ) uu(t10, e10, n10), t10 = t10.sibling;
  }
  var ui = null;
  function uu(e10, t10, n10) {
    var r10 = e10.alternate, l10 = e10.flags;
    switch (e10.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (4 & l10 && null !== (r10 = null !== (r10 = e10.updateQueue) ? r10.events : null)) for (var a10 = 0; a10 < r10.length; a10++) {
          var o10 = r10[a10];
          o10.ref.impl = o10.nextImpl;
        }
        uo(t10, e10, n10), us(e10), 4 & l10 && (iS(3, e10, e10.return), iw(3, e10), iS(5, e10, e10.return));
        break;
      case 1:
        uo(t10, e10, n10), us(e10), 512 & l10 && (iY || null === r10 || ix(r10, r10.return)), 64 & l10 && iG && null !== (e10 = e10.updateQueue) && null !== (t10 = e10.callbacks) && (n10 = e10.shared.hiddenCallbacks, e10.shared.hiddenCallbacks = null === n10 ? t10 : n10.concat(t10));
        break;
      case 26:
        if (a10 = ui, uo(t10, e10, n10), us(e10), 512 & l10 && (iY || null === r10 || ix(r10, r10.return)), 4 & l10) if (n10 = null !== r10 ? r10.memoizedState : null, t10 = e10.memoizedState, null === r10) if (null === t10) if (null === e10.stateNode) {
          e: {
            t10 = e10.type, n10 = e10.memoizedProps, r10 = a10.ownerDocument || a10;
            t: switch (t10) {
              case "title":
                (!(l10 = r10.getElementsByTagName("title")[0]) || l10[e0] || l10[eq] || "http://www.w3.org/2000/svg" === l10.namespaceURI || l10.hasAttribute("itemprop")) && (l10 = r10.createElement(t10), r10.head.insertBefore(l10, r10.querySelector("head > title"))), cu(l10, t10, n10), l10[eq] = e10, e8(l10), t10 = l10;
                break e;
              case "link":
                if (a10 = fp("link", "href", r10).get(t10 + (n10.href || ""))) {
                  for (o10 = 0; o10 < a10.length; o10++) if ((l10 = a10[o10]).getAttribute("href") === (null == n10.href || "" === n10.href ? null : n10.href) && l10.getAttribute("rel") === (null == n10.rel ? null : n10.rel) && l10.getAttribute("title") === (null == n10.title ? null : n10.title) && l10.getAttribute("crossorigin") === (null == n10.crossOrigin ? null : n10.crossOrigin)) {
                    a10.splice(o10, 1);
                    break t;
                  }
                }
                cu(l10 = r10.createElement(t10), t10, n10), r10.head.appendChild(l10);
                break;
              case "meta":
                if (a10 = fp("meta", "content", r10).get(t10 + (n10.content || ""))) {
                  for (o10 = 0; o10 < a10.length; o10++) if ((l10 = a10[o10]).getAttribute("content") === (null == n10.content ? null : "" + n10.content) && l10.getAttribute("name") === (null == n10.name ? null : n10.name) && l10.getAttribute("property") === (null == n10.property ? null : n10.property) && l10.getAttribute("http-equiv") === (null == n10.httpEquiv ? null : n10.httpEquiv) && l10.getAttribute("charset") === (null == n10.charSet ? null : n10.charSet)) {
                    a10.splice(o10, 1);
                    break t;
                  }
                }
                cu(l10 = r10.createElement(t10), t10, n10), r10.head.appendChild(l10);
                break;
              default:
                throw Error(u(468, t10));
            }
            l10[eq] = e10, e8(l10), t10 = l10;
          }
          e10.stateNode = t10;
        } else fm(a10, e10.type, e10.stateNode);
        else e10.stateNode = fu(a10, t10, e10.memoizedProps);
        else n10 !== t10 ? (null === n10 ? null !== r10.stateNode && (n10 = r10.stateNode).parentNode.removeChild(n10) : n10.count--, null === t10 ? fm(a10, e10.type, e10.stateNode) : fu(a10, t10, e10.memoizedProps)) : null === t10 && null !== e10.stateNode && iN(e10, e10.memoizedProps, r10.memoizedProps);
        break;
      case 27:
        uo(t10, e10, n10), us(e10), 512 & l10 && (iY || null === r10 || ix(r10, r10.return)), null !== r10 && 4 & l10 && iN(e10, e10.memoizedProps, r10.memoizedProps);
        break;
      case 5:
        if (a10 = iJ, iJ = false, uo(t10, e10, n10), iJ = a10, us(e10), 512 & l10 && (iY || null === r10 || ix(r10, r10.return)), 32 & e10.flags) {
          t10 = e10.stateNode;
          try {
            tE(t10, ""), to = true;
          } catch (t11) {
            sO(e10, e10.return, t11);
          }
        }
        4 & l10 && null != e10.stateNode && (t10 = e10.memoizedProps, iN(e10, t10, null !== r10 ? r10.memoizedProps : t10)), 1024 & l10 && (iZ = true);
        break;
      case 6:
        if (uo(t10, e10, n10), us(e10), 4 & l10) {
          if (null === e10.stateNode) throw Error(u(162));
          t10 = e10.memoizedProps, n10 = e10.stateNode;
          try {
            n10.nodeValue = t10, to = true;
          } catch (t11) {
            sO(e10, e10.return, t11);
          }
        }
        break;
      case 3:
        if (to = false, fd = null, a10 = ui, ui = c7(t10.containerInfo), uo(t10, e10, n10), ui = a10, us(e10), 4 & l10 && null !== r10 && r10.memoizedState.isDehydrated) try {
          f6(t10.containerInfo);
        } catch (t11) {
          sO(e10, e10.return, t11);
        }
        iZ && (iZ = false, (function e11(t11) {
          if (1024 & t11.subtreeFlags) for (t11 = t11.child; null !== t11; ) {
            var n11 = t11;
            e11(n11), 5 === n11.tag && 1024 & n11.flags && (n11 = n11.stateNode, fM = true, n11.reset(), fM = false), t11 = t11.sibling;
          }
        })(e10)), to = false;
        break;
      case 4:
        r10 = iJ, iJ = iG, l10 = ti(), a10 = ui, ui = c7(e10.stateNode.containerInfo), uo(t10, e10, n10), us(e10), ui = a10, to && i3 && (i4 = true), to = l10, iJ = r10;
        break;
      case 12:
        uo(t10, e10, n10), us(e10);
        break;
      case 31:
      case 19:
        uo(t10, e10, n10), us(e10), 4 & l10 && null !== (t10 = e10.updateQueue) && (e10.updateQueue = null, ua(e10, t10));
        break;
      case 13:
        uo(t10, e10, n10), us(e10), 8192 & e10.child.flags && null !== e10.memoizedState != (null !== r10 && null !== r10.memoizedState) && (uW = ey()), 4 & l10 && null !== (t10 = e10.updateQueue) && (e10.updateQueue = null, ua(e10, t10));
        break;
      case 22:
        a10 = null !== e10.memoizedState, o10 = null !== r10 && null !== r10.memoizedState;
        var i10 = iG, s10 = iY, c10 = iJ;
        iG = i10 || a10, iJ = c10 || a10, iY = s10 || o10, uo(t10, e10, n10), iY = s10, iJ = c10, iG = i10, us(e10), 8192 & l10 && ((t10 = e10.stateNode)._visibility = a10 ? -2 & t10._visibility : 1 | t10._visibility, a10 && (null === r10 || o10 || iG || iY || (function e11(t11, n11) {
          for (t11 = t11.child; null !== t11; ) {
            var r11 = t11;
            switch (r11.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                iS(4, r11, r11.return), e11(r11, n11);
                break;
              case 1:
                ix(r11, r11.return);
                var l11 = r11.stateNode;
                "function" == typeof l11.componentWillUnmount && iE(r11, r11.return, l11), e11(r11, n11);
                break;
              case 27:
                0 != (2 & n11) && c4(r11.stateNode, r11.type, r11.memoizedProps);
              case 26:
              case 5:
                ix(r11, r11.return), 5 !== r11.tag && 6 !== r11.tag || iT(r11), e11(r11, n11);
                break;
              case 22:
                null === r11.memoizedState && e11(r11, n11);
                break;
              case 30:
                ix(r11, r11.return), e11(r11, n11);
                break;
              case 7:
                ix(r11, r11.return);
              default:
                e11(r11, n11);
            }
            t11 = t11.sibling;
          }
        })(e10, 2)), !a10 && iJ || i7(e10, a10)), 4 & l10 && null !== (t10 = e10.updateQueue) && null !== (n10 = t10.retryQueue) && (t10.retryQueue = null, ua(e10, n10));
        break;
      case 30:
        512 & l10 && (iY || null === r10 || ix(r10, r10.return)), l10 = ti(), a10 = i3, o10 = (335544064 & n10) === n10, i10 = e10.memoizedProps, i3 = o10 && "none" !== ru(i10.default, i10.update), uo(t10, e10, n10), us(e10), o10 && null !== r10 && to && (e10.flags |= 4), i3 = a10, to = l10;
        break;
      case 21:
        break;
      case 7:
        r10 && null !== r10.stateNode && (r10.stateNode._fragmentFiber = e10);
      default:
        uo(t10, e10, n10), us(e10);
    }
  }
  function us(e10) {
    var t10 = e10.flags;
    if (2 & t10) {
      try {
        for (var n10, r10 = null, l10 = e10.return; null !== l10; ) {
          if (iz(l10)) {
            var a10 = l10.stateNode;
            null === r10 ? r10 = [a10] : r10.push(a10);
          }
          if (iO(l10)) {
            n10 = l10;
            break;
          }
          l10 = l10.return;
        }
        if (null == n10) throw Error(u(160));
        switch (n10.tag) {
          case 27:
            var o10 = n10.stateNode, i10 = iL(e10);
            iR(e10, i10, o10, r10);
            break;
          case 5:
            var s10 = n10.stateNode;
            32 & n10.flags && (tE(s10, ""), n10.flags &= -33);
            var c10 = iL(e10);
            iR(e10, c10, s10, r10);
            break;
          case 3:
          case 4:
            var f10 = n10.stateNode.containerInfo, d2 = iL(e10);
            !(function e11(t11, n11, r11, l11) {
              var a11 = t11.tag;
              if (5 === a11 || 6 === a11) a11 = t11.stateNode, n11 ? (9 === r11.nodeType ? r11.body : "HTML" === r11.nodeName ? r11.ownerDocument.body : r11).insertBefore(a11, n11) : ((n11 = 9 === r11.nodeType ? r11.body : "HTML" === r11.nodeName ? r11.ownerDocument.body : r11).appendChild(a11), null != (r11 = r11._reactRootContainer) || null !== n11.onclick || (n11.onclick = tz)), iC(t11, l11), to = true;
              else if (4 !== a11 && (27 === a11 && cE(t11.type) && (r11 = t11.stateNode, n11 = null), null !== (t11 = t11.child))) for (e11(t11, n11, r11, l11), t11 = t11.sibling; null !== t11; ) e11(t11, n11, r11, l11), t11 = t11.sibling;
            })(e10, d2, f10, r10);
            break;
          default:
            throw Error(u(161));
        }
      } catch (t11) {
        sO(e10, e10.return, t11);
      }
      e10.flags &= -3;
    }
    4096 & t10 && (e10.flags &= -4097);
  }
  function uc(e10, t10) {
    if (9270 & t10.subtreeFlags) for (t10 = t10.child; null !== t10; ) uf(t10, e10), t10 = t10.sibling;
    else !(function e11(t11, n10) {
      for (t11 = t11.child; null !== t11; ) {
        if (30 === t11.tag) {
          var r10 = t11.memoizedProps, l10 = t11.stateNode, a10 = ro(r10, l10), o10 = ru(r10.default, r10.update);
          if (n10) var i10 = null === (l10 = l10.clones) ? null : l10.map(cO);
          else i10 = t11.memoizedState, t11.memoizedState = null;
          l10 = t11;
          var u10 = t11.child;
          iU = 0, a10 = iK(l10, u10, a10, a10, o10, i10, false), 0 != (4 & t11.flags) && a10 && (n10 || st(t11, r10.onUpdate));
        } else 0 != (33554432 & t11.subtreeFlags) && e11(t11, n10);
        t11 = t11.sibling;
      }
    })(t10, false);
  }
  function uf(e10, t10) {
    var n10 = e10.alternate;
    if (null === n10) i$(e10, false);
    else switch (e10.tag) {
      case 3:
        if (i6 = i2 = false, ij(), uc(t10, e10), !i2 && !i4) {
          if (null !== (e10 = iA)) for (var r10 = 0; r10 < e10.length; r10 += 3) {
            n10 = e10[r10];
            var l10 = e10[r10 + 1];
            cN(n10, e10[r10 + 2]), null !== (n10 = n10.ownerDocument.documentElement) && n10.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(" + l10 + ")" });
          }
          null !== (e10 = 9 === (e10 = t10.containerInfo).nodeType ? e10.documentElement : e10.ownerDocument.documentElement) && "" === e10.style.viewTransitionName && (e10.style.viewTransitionName = "none", e10.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(root)" }), e10.animate({ width: [0, 0], height: [0, 0] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition" })), i6 = true;
        }
        iA = null;
        break;
      case 5:
      default:
        uc(t10, e10);
        break;
      case 4:
        r10 = i2, i2 = false, uc(t10, e10), i2 && (i4 = true), i2 = r10;
        break;
      case 22:
        null === e10.memoizedState && (null !== n10.memoizedState ? i$(e10, false) : uc(t10, e10));
        break;
      case 30:
        r10 = i2, l10 = ij(), i2 = false, uc(t10, e10), i2 && (e10.flags |= 4);
        var a10 = e10.memoizedProps, o10 = e10.stateNode;
        t10 = ro(a10, o10), o10 = ro(n10.memoizedProps, o10);
        var i10 = ru(a10.default, a10.update);
        "none" === i10 ? t10 = false : (a10 = n10.memoizedState, n10.memoizedState = null, n10 = e10.child, iU = 0, t10 = iK(e10, n10, t10, o10, i10, a10, true), iU !== (null === a10 ? 0 : a10.length) && (e10.flags |= 32)), 0 != (4 & e10.flags) && t10 ? (st(e10, e10.memoizedProps.onUpdate), iA = l10) : null !== l10 && (l10.push.apply(l10, iA), iA = l10), i2 = 0 != (32 & e10.flags) || r10;
    }
  }
  function ud(e10, t10) {
    if (8772 & t10.subtreeFlags) for (t10 = t10.child; null !== t10; ) i8(e10, t10.alternate, t10), t10 = t10.sibling;
  }
  function up(e10, t10) {
    var n10 = null;
    null !== e10 && null !== e10.memoizedState && null !== e10.memoizedState.cachePool && (n10 = e10.memoizedState.cachePool.pool), e10 = null, null !== t10.memoizedState && null !== t10.memoizedState.cachePool && (e10 = t10.memoizedState.cachePool.pool), e10 !== n10 && (null != e10 && e10.refCount++, null != n10 && lp(n10));
  }
  function um(e10, t10) {
    e10 = null, null !== t10.alternate && (e10 = t10.alternate.memoizedState.cache), (t10 = t10.memoizedState.cache) !== e10 && (t10.refCount++, null != e10 && lp(e10));
  }
  function uh(e10, t10, n10, r10) {
    var l10 = (335544064 & n10) === n10;
    if (t10.subtreeFlags & (l10 ? 10262 : 10256)) for (t10 = t10.child; null !== t10; ) ug(e10, t10, n10, r10), t10 = t10.sibling;
    else l10 && (function e11(t11) {
      for (t11 = t11.child; null !== t11; ) 30 === t11.tag ? iV(t11.child, false) : 0 != (33554432 & t11.subtreeFlags) && e11(t11), t11 = t11.sibling;
    })(t10);
  }
  function ug(e10, t10, n10, r10) {
    var l10 = (335544064 & n10) === n10;
    l10 && null === t10.alternate && null !== t10.return && null !== t10.return.alternate && iX(t10);
    var a10 = t10.flags;
    switch (t10.tag) {
      case 0:
      case 11:
      case 15:
        uh(e10, t10, n10, r10), 2048 & a10 && iw(9, t10);
        break;
      case 1:
      case 31:
      case 13:
      default:
        uh(e10, t10, n10, r10);
        break;
      case 3:
        uh(e10, t10, n10, r10), l10 && i6 && ("root" === (e10 = 9 === (e10 = e10.containerInfo).nodeType ? e10.body : "HTML" === e10.nodeName ? e10.ownerDocument.body : e10).style.viewTransitionName && (e10.style.viewTransitionName = ""), null !== (e10 = e10.ownerDocument.documentElement) && "none" === e10.style.viewTransitionName && (e10.style.viewTransitionName = "")), 2048 & a10 && (a10 = null, null !== t10.alternate && (a10 = t10.alternate.memoizedState.cache), (t10 = t10.memoizedState.cache) !== a10 && (t10.refCount++, null != a10 && lp(a10)));
        break;
      case 12:
        if (2048 & a10) {
          uh(e10, t10, n10, r10), a10 = t10.stateNode;
          try {
            var o10 = t10.memoizedProps, i10 = o10.id, u10 = o10.onPostCommit;
            "function" == typeof u10 && u10(i10, null === t10.alternate ? "mount" : "update", a10.passiveEffectDuration, -0);
          } catch (e11) {
            sO(t10, t10.return, e11);
          }
        } else uh(e10, t10, n10, r10);
        break;
      case 23:
        break;
      case 22:
        o10 = t10.stateNode, i10 = t10.alternate, null !== t10.memoizedState ? (l10 && null !== i10 && null === i10.memoizedState && iX(i10), 2 & o10._visibility ? uh(e10, t10, n10, r10) : uv(e10, t10)) : (l10 && null !== i10 && null !== i10.memoizedState && iX(t10), 2 & o10._visibility ? uh(e10, t10, n10, r10) : (o10._visibility |= 2, (function e11(t11, n11, r11, l11, a11) {
          for (a11 = a11 && 0 != (10256 & n11.subtreeFlags), n11 = n11.child; null !== n11; ) {
            var o11 = n11, i11 = o11.flags;
            switch (o11.tag) {
              case 0:
              case 11:
              case 15:
                e11(t11, o11, r11, l11, a11), iw(8, o11);
                break;
              case 23:
                break;
              case 22:
                var u11 = o11.stateNode;
                null !== o11.memoizedState ? 2 & u11._visibility ? e11(t11, o11, r11, l11, a11) : uv(t11, o11) : (u11._visibility |= 2, e11(t11, o11, r11, l11, a11)), a11 && 2048 & i11 && up(o11.alternate, o11);
                break;
              case 24:
                e11(t11, o11, r11, l11, a11), a11 && 2048 & i11 && um(o11.alternate, o11);
                break;
              default:
                e11(t11, o11, r11, l11, a11);
            }
            n11 = n11.sibling;
          }
        })(e10, t10, n10, r10, 0 != (10256 & t10.subtreeFlags)))), 2048 & a10 && up(i10, t10);
        break;
      case 24:
        uh(e10, t10, n10, r10), 2048 & a10 && um(t10.alternate, t10);
        break;
      case 30:
        l10 && null !== (a10 = t10.alternate) && (iV(a10.child, true), iV(t10.child, true)), uh(e10, t10, n10, r10);
    }
  }
  function uv(e10, t10) {
    if (10256 & t10.subtreeFlags) for (t10 = t10.child; null !== t10; ) {
      var n10 = t10, r10 = n10.flags;
      switch (n10.tag) {
        case 22:
          uv(e10, n10), 2048 & r10 && up(n10.alternate, n10);
          break;
        case 24:
          uv(e10, n10), 2048 & r10 && um(n10.alternate, n10);
          break;
        default:
          uv(e10, n10);
      }
      t10 = t10.sibling;
    }
  }
  var uy = 8192;
  function ub(e10, t10, n10) {
    if (e10.subtreeFlags & uy) for (e10 = e10.child; null !== e10; ) uw(e10, t10, n10), e10 = e10.sibling;
  }
  function uw(e10, t10, n10) {
    switch (e10.tag) {
      case 26:
        ub(e10, t10, n10), e10.flags & uy && (null !== e10.memoizedState ? (function(e11, t11, n11, r11) {
          if ("stylesheet" === n11.type && ("string" != typeof r11.media || false !== matchMedia(r11.media).matches) && 0 == (4 & n11.state.loading)) {
            if (null === n11.instance) {
              var l11 = fr(r11.href), a10 = t11.querySelector(fl(l11));
              if (a10) {
                null !== (t11 = a10._p) && "object" == typeof t11 && "function" == typeof t11.then && (e11.count++, e11 = fS.bind(e11), t11.then(e11, e11)), n11.state.loading |= 4, n11.instance = a10, e8(a10);
                return;
              }
              a10 = t11.ownerDocument || t11, r11 = fa(r11), (l11 = c5.get(l11)) && fc(r11, l11), e8(a10 = a10.createElement("link"));
              var o10 = a10;
              o10._p = new Promise(function(e12, t12) {
                o10.onload = e12, o10.onerror = t12;
              }), cu(a10, "link", r11), n11.instance = a10;
            }
            null === e11.stylesheets && (e11.stylesheets = /* @__PURE__ */ new Map()), e11.stylesheets.set(n11, t11), (t11 = n11.state.preload) && 0 == (3 & n11.state.loading) && (e11.count++, n11 = fS.bind(e11), t11.addEventListener("load", n11), t11.addEventListener("error", n11));
          }
        })(n10, ui, e10.memoizedState, e10.memoizedProps) : (e10 = e10.stateNode, (335544128 & t10) === t10 && fy(n10, e10)));
        break;
      case 5:
        ub(e10, t10, n10), e10.flags & uy && (e10 = e10.stateNode, (335544128 & t10) === t10 && fy(n10, e10));
        break;
      case 3:
      case 4:
        var r10 = ui;
        ui = c7(e10.stateNode.containerInfo), ub(e10, t10, n10), ui = r10;
        break;
      case 22:
        null === e10.memoizedState && (null !== (r10 = e10.alternate) && null !== r10.memoizedState ? (r10 = uy, uy = 16777216, ub(e10, t10, n10), uy = r10) : ub(e10, t10, n10));
        break;
      case 30:
        if (0 != (e10.flags & uy) && null != (r10 = e10.memoizedProps.name) && "auto" !== r10) {
          var l10 = e10.stateNode;
          l10.paired = null, null === iD && (iD = /* @__PURE__ */ new Map()), iD.set(r10, l10);
        }
        ub(e10, t10, n10);
        break;
      default:
        ub(e10, t10, n10);
    }
  }
  function uS(e10) {
    var t10 = e10.alternate;
    if (null !== t10 && null !== (e10 = t10.child)) {
      t10.child = null;
      do
        t10 = e10.sibling, e10.sibling = null, e10 = t10;
      while (null !== e10);
    }
  }
  function uk(e10) {
    var t10 = e10.deletions;
    if (0 != (16 & e10.flags)) {
      if (null !== t10) for (var n10 = 0; n10 < t10.length; n10++) {
        var r10 = t10[n10];
        i1 = r10, u_(r10, e10);
      }
      uS(e10);
    }
    if (10256 & e10.subtreeFlags) for (e10 = e10.child; null !== e10; ) uE(e10), e10 = e10.sibling;
  }
  function uE(e10) {
    switch (e10.tag) {
      case 0:
      case 11:
      case 15:
        uk(e10), 2048 & e10.flags && iS(9, e10, e10.return);
        break;
      case 3:
      case 12:
      default:
        uk(e10);
        break;
      case 22:
        var t10 = e10.stateNode;
        null !== e10.memoizedState && 2 & t10._visibility && (null === e10.return || 13 !== e10.return.tag) ? (t10._visibility &= -3, (function e11(t11) {
          var n10 = t11.deletions;
          if (0 != (16 & t11.flags)) {
            if (null !== n10) for (var r10 = 0; r10 < n10.length; r10++) {
              var l10 = n10[r10];
              i1 = l10, u_(l10, t11);
            }
            uS(t11);
          }
          for (t11 = t11.child; null !== t11; ) {
            switch ((n10 = t11).tag) {
              case 0:
              case 11:
              case 15:
                iS(8, n10, n10.return), e11(n10);
                break;
              case 22:
                2 & (r10 = n10.stateNode)._visibility && (r10._visibility &= -3, e11(n10));
                break;
              default:
                e11(n10);
            }
            t11 = t11.sibling;
          }
        })(e10)) : uk(e10);
    }
  }
  function u_(e10, t10) {
    for (; null !== i1; ) {
      var n10 = i1;
      switch (n10.tag) {
        case 0:
        case 11:
        case 15:
          iS(8, n10, t10);
          break;
        case 23:
        case 22:
          if (null !== n10.memoizedState && null !== n10.memoizedState.cachePool) {
            var r10 = n10.memoizedState.cachePool.pool;
            null != r10 && r10.refCount++;
          }
          break;
        case 24:
          lp(n10.memoizedState.cache);
      }
      if (null !== (r10 = n10.child)) r10.return = n10, i1 = r10;
      else for (n10 = e10; null !== i1; ) {
        var l10 = (r10 = i1).sibling, a10 = r10.return;
        if (!(function e11(t11) {
          var n11 = t11.alternate;
          null !== n11 && (t11.alternate = null, e11(n11)), t11.child = null, t11.deletions = null, t11.sibling = null, 5 === t11.tag && null !== (n11 = t11.stateNode) && e2(n11), t11.stateNode = null, t11.return = null, t11.dependencies = null, t11.memoizedProps = null, t11.memoizedState = null, t11.pendingProps = null, t11.stateNode = null, t11.updateQueue = null;
        })(r10), r10 === n10) {
          i1 = null;
          break;
        }
        if (null !== l10) {
          l10.return = a10, i1 = l10;
          break;
        }
        i1 = a10;
      }
    }
  }
  var ux = { getCacheForType: function(e10) {
    var t10 = la(lf), n10 = t10.data.get(e10);
    return void 0 === n10 && (n10 = e10(), t10.data.set(e10, n10)), n10;
  }, cacheSignal: function() {
    return la(lf).controller.signal;
  } }, uP = "function" == typeof WeakMap ? WeakMap : Map, uN = 0, uC = null, uT = null, uO = 0, uz = 0, uL = null, uR = false, uM = false, uI = false, uD = 0, uF = 0, uA = 0, uj = 0, uU = 0, uB = 0, uV = 0, uH = null, u$ = null, uQ = false, uW = 0, uq = 0, uX = 1 / 0, uK = null, uG = null, uY = 0, uJ = null, uZ = null, u0 = 0, u1 = 0, u2 = null, u3 = null, u4 = null, u6 = null, u5 = null, u8 = 0, u7 = null;
  function u9() {
    return 0 != (2 & uN) && 0 !== uO ? uO & -uO : null !== q.T ? sK() : e$();
  }
  function se() {
    if (0 === uB) if (0 == (536870912 & uO) || rX) {
      var e10 = ez;
      0 == (3932160 & (ez <<= 1)) && (ez = 262144), uB = e10;
    } else uB = 536870912;
    return null !== (e10 = l8.current) && (e10.flags |= 32), uB;
  }
  function st(e10, t10) {
    if (null != t10) {
      var n10 = e10.stateNode, r10 = n10.ref;
      null === r10 && (r10 = n10.ref = cR(ro(e10.memoizedProps, n10))), null === u6 && (u6 = []), u6.push(t10.bind(null, r10));
    }
  }
  function sn(e10, t10, n10) {
    (e10 === uC && (2 === uz || 9 === uz) || null !== e10.cancelPendingCommit) && (su(e10, 0), sa(e10, uO, uB, false)), eA(e10, n10), (0 == (2 & uN) || e10 !== uC) && (e10 === uC && (0 == (2 & uN) && (uj |= n10), 4 === uF && sa(e10, uO, uB, false)), sV(e10));
  }
  function sr(e10, t10, n10) {
    if (0 != (6 & uN)) throw Error(u(327));
    for (var r10 = !n10 && 0 == (127 & t10) && 0 == (t10 & e10.expiredLanes) || eI(e10, t10), l10 = r10 ? (function(e11, t11) {
      var n11 = uN;
      uN |= 2;
      var r11 = sf(), l11 = sd();
      uC !== e11 || uO !== t11 ? (uK = null, uX = ey() + 500, su(e11, t11)) : uM = eI(e11, t11);
      e: for (; ; ) try {
        if (0 !== uz && null !== uT) {
          t11 = uT;
          var a11 = uL;
          t: switch (uz) {
            case 1:
              uz = 0, uL = null, sv(e11, t11, a11, 1);
              break;
            case 2:
            case 9:
              if (lO(a11)) {
                uz = 0, uL = null, sg(t11);
                break;
              }
              t11 = function() {
                2 !== uz && 9 !== uz || uC !== e11 || (uz = 7), sV(e11);
              }, a11.then(t11, t11);
              break e;
            case 3:
              uz = 7;
              break e;
            case 4:
              uz = 5;
              break e;
            case 7:
              lO(a11) ? (uz = 0, uL = null, sg(t11)) : (uz = 0, uL = null, sv(e11, t11, a11, 7));
              break;
            case 5:
              var o11 = null;
              switch (uT.tag) {
                case 26:
                  o11 = uT.memoizedState;
                case 5:
                case 27:
                  var i11 = uT;
                  if (o11 ? fg(o11) : i11.stateNode.complete) {
                    uz = 0, uL = null;
                    var s10 = i11.sibling;
                    if (null !== s10) uT = s10;
                    else {
                      var c10 = i11.return;
                      null !== c10 ? (uT = c10, sy(c10)) : uT = null;
                    }
                    break t;
                  }
              }
              uz = 0, uL = null, sv(e11, t11, a11, 5);
              break;
            case 6:
              uz = 0, uL = null, sv(e11, t11, a11, 6);
              break;
            case 8:
              si(), uF = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        for (; null !== uT && !eg(); ) sh(uT);
        break;
      } catch (t12) {
        ss(e11, t12);
      }
      return (r8 = r5 = null, q.H = r11, q.A = l11, uN = n11, null !== uT) ? 0 : (uC = null, uO = 0, rp(), uF);
    })(e10, t10) : sm(e10, t10, true), a10 = r10; ; ) {
      if (0 === l10) uM && !r10 && sa(e10, t10, 0, false);
      else {
        if (n10 = e10.current.alternate, a10 && !(function(e11) {
          for (var t11 = e11; ; ) {
            var n11 = t11.tag;
            if ((0 === n11 || 11 === n11 || 15 === n11) && 16384 & t11.flags && null !== (n11 = t11.updateQueue) && null !== (n11 = n11.stores)) for (var r11 = 0; r11 < n11.length; r11++) {
              var l11 = n11[r11], a11 = l11.getSnapshot;
              l11 = l11.value;
              try {
                if (!nB(a11(), l11)) return false;
              } catch (e12) {
                return false;
              }
            }
            if (n11 = t11.child, 16384 & t11.subtreeFlags && null !== n11) n11.return = t11, t11 = n11;
            else {
              if (t11 === e11) break;
              for (; null === t11.sibling; ) {
                if (null === t11.return || t11.return === e11) return true;
                t11 = t11.return;
              }
              t11.sibling.return = t11.return, t11 = t11.sibling;
            }
          }
          return true;
        })(n10)) {
          l10 = sm(e10, t10, false), a10 = false;
          continue;
        }
        if (2 === l10) {
          if (a10 = t10, e10.errorRecoveryDisabledLanes & a10) var o10 = 0;
          else o10 = 0 != (o10 = -536870913 & e10.pendingLanes) ? o10 : 536870912 & o10 ? 536870912 : 0;
          if (0 !== o10) {
            t10 = o10;
            e: {
              l10 = uH;
              var i10 = e10.current.memoizedState.isDehydrated;
              if (i10 && (su(e10, o10).flags |= 256), 2 !== (o10 = sm(e10, o10, false)) && 6 !== o10) {
                if (uI && !i10) {
                  e10.errorRecoveryDisabledLanes |= a10, uj |= a10, l10 = 4;
                  break e;
                }
                a10 = u$, u$ = l10, null !== a10 && (null === u$ ? u$ = a10 : u$.push.apply(u$, a10));
              }
              l10 = o10;
            }
            if (a10 = false, 2 !== l10) continue;
          }
        }
        if (1 === l10) {
          su(e10, 0), sa(e10, t10, 0, true);
          break;
        }
        e: {
          switch (r10 = e10, a10 = l10) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((4194048 & t10) !== t10 && (62914560 & t10) !== t10) break;
            case 6:
              sa(r10, t10, uB, !uR);
              break e;
            case 2:
              u$ = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((62914560 & t10) === t10 && 10 < (l10 = uW + 300 - ey())) {
            if (sa(r10, t10, uB, !uR), 0 !== eM(r10, 0, true)) break e;
            u0 = t10, r10.timeoutHandle = cy(sl.bind(null, r10, n10, u$, uK, uQ, t10, uB, uj, uV, uR, a10, "Throttled", -0, 0), l10);
            break e;
          }
          sl(r10, n10, u$, uK, uQ, t10, uB, uj, uV, uR, a10, null, -0, 0);
        }
      }
      break;
    }
    sV(e10);
  }
  function sl(e10, t10, n10, r10, l10, a10, o10, i10, u10, s10, c10, f10, d2, p2) {
    e10.timeoutHandle = -1;
    var m2, h2, g2 = t10.subtreeFlags, v2 = (335544064 & a10) === a10;
    if (f10 = null, (v2 || 8192 & g2 || 16785408 == (16785408 & g2)) && (iD = null, uw(t10, a10, f10 = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: tz }), v2 && (g2 = f10, null != (v2 = (9 === (v2 = e10.containerInfo).nodeType ? v2 : v2.ownerDocument).__reactViewTransition) && (g2.count++, g2.waitingForViewTransition = true, g2 = fS.bind(g2), v2.finished.then(g2, g2))), null !== (m2 = f10, h2 = g2 = (62914560 & a10) === a10 ? uW - ey() : (4194048 & a10) === a10 ? uq - ey() : 0, m2.stylesheets && 0 === m2.count && f_(m2, m2.stylesheets), g2 = 0 < m2.count || 0 < m2.imgCount ? function(e11) {
      var t11 = setTimeout(function() {
        if (m2.stylesheets && f_(m2, m2.stylesheets), m2.unsuspend) {
          var e12 = m2.unsuspend;
          m2.unsuspend = null, e12();
        }
      }, 6e4 + h2);
      0 < m2.imgBytes && 0 === fb && (fb = 62500 * (function() {
        if ("function" == typeof performance.getEntriesByType) {
          for (var e12 = 0, t12 = 0, n12 = performance.getEntriesByType("resource"), r11 = 0; r11 < n12.length; r11++) {
            var l11 = n12[r11], a11 = l11.transferSize, o11 = l11.initiatorType, i11 = l11.duration;
            if (a11 && i11 && cc(o11)) {
              for (o11 = 0, i11 = l11.responseEnd, r11 += 1; r11 < n12.length; r11++) {
                var u11 = n12[r11], s11 = u11.startTime;
                if (s11 > i11) break;
                var c11 = u11.transferSize, f11 = u11.initiatorType;
                c11 && cc(f11) && (o11 += c11 * ((u11 = u11.responseEnd) < i11 ? 1 : (i11 - s11) / (u11 - s11)));
              }
              if (--r11, t12 += 8 * (a11 + o11) / (l11.duration / 1e3), 10 < ++e12) break;
            }
          }
          if (0 < e12) return t12 / e12 / 1e6;
        }
        return navigator.connection && "number" == typeof (e12 = navigator.connection.downlink) ? e12 : 5;
      })());
      var n11 = setTimeout(function() {
        if (m2.waitingForImages = false, 0 === m2.count && (m2.stylesheets && f_(m2, m2.stylesheets), m2.unsuspend)) {
          var e12 = m2.unsuspend;
          m2.unsuspend = null, e12();
        }
      }, (m2.imgBytes > fb ? 50 : 800) + h2);
      return m2.unsuspend = e11, function() {
        m2.unsuspend = null, clearTimeout(t11), clearTimeout(n11);
      };
    } : null))) {
      u0 = a10, e10.cancelPendingCommit = g2(sw.bind(null, e10, t10, a10, n10, r10, l10, o10, i10, u10, s10, c10, f10, null, d2, p2)), sa(e10, a10, o10, !s10);
      return;
    }
    sw(e10, t10, a10, n10, r10, l10, o10, i10, u10, s10, c10, f10);
  }
  function sa(e10, t10, n10, r10) {
    t10 &= ~uU, t10 &= ~uj, e10.suspendedLanes |= t10, e10.pingedLanes &= ~t10, r10 && (e10.warmLanes |= t10), r10 = e10.expirationTimes;
    for (var l10 = t10; 0 < l10; ) {
      var a10 = 31 - eN(l10), o10 = 1 << a10;
      r10[a10] = -1, l10 &= ~o10;
    }
    0 !== n10 && ej(e10, n10, t10);
  }
  function so() {
    return 0 != (6 & uN) || (sH(0, false), false);
  }
  function si() {
    if (null !== uT) {
      if (0 === uz) var e10 = uT.return;
      else e10 = uT, r8 = r5 = null, aN(e10), lD = null, lF = 0, e10 = uT;
      for (; null !== e10; ) ib(e10.alternate, e10), e10 = e10.return;
      uT = null;
    }
  }
  function su(e10, t10) {
    var n10 = e10.timeoutHandle;
    -1 !== n10 && (e10.timeoutHandle = -1, cb(n10)), null !== (n10 = e10.cancelPendingCommit) && (e10.cancelPendingCommit = null, n10()), u0 = 0, si(), uC = e10, uT = n10 = rE(e10.current, null), uO = t10, uz = 0, uL = null, uR = false, uM = eI(e10, t10), uI = false, uV = uB = uU = uj = uA = uF = 0, u$ = uH = null, uQ = false, 0 != (8 & t10) && (t10 |= 32 & t10);
    var r10 = e10.entangledLanes;
    if (0 !== r10) for (e10 = e10.entanglements, r10 &= t10; 0 < r10; ) {
      var l10 = 31 - eN(r10), a10 = 1 << l10;
      t10 |= e10[l10], r10 &= ~a10;
    }
    return uD = t10, rp(), n10;
  }
  function ss(e10, t10) {
    as = null, q.H = oP, t10 === lP || t10 === lC ? (t10 = lM(), uz = 3) : t10 === lN ? (t10 = lM(), uz = 4) : uz = t10 === oH ? 8 : null !== t10 && "object" == typeof t10 && "function" == typeof t10.then ? 6 : 1, uL = t10, null === uT && (uF = 1, oA(e10, rz(t10, e10.current)));
  }
  function sc() {
    var e10 = l8.current;
    return null === e10 || ((4194048 & uO) === uO ? null === l7 : ((62914560 & uO) === uO || 0 != (536870912 & uO)) && e10 === l7);
  }
  function sf() {
    var e10 = q.H;
    return q.H = oP, null === e10 ? oP : e10;
  }
  function sd() {
    var e10 = q.A;
    return q.A = ux, e10;
  }
  function sp() {
    uF = 4, uR || (4194048 & uO) !== uO && null !== l8.current || (uM = true), 0 == (134217727 & uA) && 0 == (134217727 & uj) || null === uC || sa(uC, uO, uB, false);
  }
  function sm(e10, t10, n10) {
    var r10 = uN;
    uN |= 2;
    var l10 = sf(), a10 = sd();
    (uC !== e10 || uO !== t10) && (uK = null, su(e10, t10)), t10 = false;
    var o10 = uF;
    e: for (; ; ) try {
      if (0 !== uz && null !== uT) {
        var i10 = uT, u10 = uL;
        switch (uz) {
          case 8:
            si(), o10 = 6;
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            null === l8.current && (t10 = true);
            var s10 = uz;
            if (uz = 0, uL = null, sv(e10, i10, u10, s10), n10 && uM) {
              o10 = 0;
              break e;
            }
            break;
          default:
            s10 = uz, uz = 0, uL = null, sv(e10, i10, u10, s10);
        }
      }
      (function() {
        for (; null !== uT; ) sh(uT);
      })(), o10 = uF;
      break;
    } catch (t11) {
      ss(e10, t11);
    }
    return t10 && e10.shellSuspendCounter++, r8 = r5 = null, uN = r10, q.H = l10, q.A = a10, null === uT && (uC = null, uO = 0, rp()), o10;
  }
  function sh(e10) {
    var t10 = id(e10.alternate, e10, uD);
    e10.memoizedProps = e10.pendingProps, null === t10 ? sy(e10) : uT = t10;
  }
  function sg(e10) {
    var t10 = e10, n10 = t10.alternate;
    switch (t10.tag) {
      case 15:
      case 0:
        t10 = o2(n10, t10, t10.pendingProps, t10.type, void 0, uO);
        break;
      case 11:
        t10 = o2(n10, t10, t10.pendingProps, t10.type.render, t10.ref, uO);
        break;
      case 5:
        aN(t10);
        var r10 = t10;
        r10 === rW && (rX ? (r0(r10), 5 === r10.tag && null != r10.stateNode && (rq = r10.stateNode)) : (r0(r10), rX = true));
      default:
        ib(n10, t10), t10 = id(n10, t10 = uT = r_(t10, uD), uD);
    }
    e10.memoizedProps = e10.pendingProps, null === t10 ? sy(e10) : uT = t10;
  }
  function sv(e10, t10, n10, r10) {
    r8 = r5 = null, aN(t10), lD = null, lF = 0;
    var l10 = t10.return;
    try {
      if ((function(e11, t11, n11, r11, l11) {
        if (n11.flags |= 32768, null !== r11 && "object" == typeof r11 && "function" == typeof r11.then) {
          if (null !== (t11 = n11.alternate) && ln(t11, n11, l11, true), null !== (n11 = l8.current)) {
            switch (n11.tag) {
              case 31:
              case 13:
              case 19:
                return null === l7 ? sp() : null === n11.alternate && 0 === uF && (uF = 3), n11.flags &= -257, n11.flags |= 65536, n11.lanes = l11, r11 === lT ? n11.flags |= 16384 : (null === (t11 = n11.updateQueue) ? n11.updateQueue = /* @__PURE__ */ new Set([r11]) : t11.add(r11), sz(e11, r11, l11)), false;
              case 22:
                return n11.flags |= 65536, r11 === lT ? n11.flags |= 16384 : (null === (t11 = n11.updateQueue) ? (t11 = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([r11]) }, n11.updateQueue = t11) : null === (n11 = t11.retryQueue) ? t11.retryQueue = /* @__PURE__ */ new Set([r11]) : n11.add(r11), sz(e11, r11, l11)), false;
            }
            throw Error(u(435, n11.tag));
          }
          return sz(e11, r11, l11), sp(), false;
        }
        if (rX) return null !== (t11 = l8.current) ? (0 == (65536 & t11.flags) && (t11.flags |= 256), t11.flags |= 65536, t11.lanes = l11, r11 !== rY && r4(rz(e11 = Error(u(422), { cause: r11 }), n11))) : (r11 !== rY && r4(rz(t11 = Error(u(423), { cause: r11 }), n11)), e11 = e11.current.alternate, e11.flags |= 65536, l11 &= -l11, e11.lanes |= l11, r11 = rz(r11, n11), l11 = oU(e11.stateNode, r11, l11), lG(e11, l11), 4 !== uF && (uF = 2)), false;
        var a10 = Error(u(520), { cause: r11 });
        if (a10 = rz(a10, n11), null === uH ? uH = [a10] : uH.push(a10), 4 !== uF && (uF = 2), null === t11) return true;
        r11 = rz(r11, n11), n11 = t11;
        do {
          switch (n11.tag) {
            case 3:
              return n11.flags |= 65536, e11 = l11 & -l11, n11.lanes |= e11, e11 = oU(n11.stateNode, r11, e11), lG(n11, e11), false;
            case 1:
              if (t11 = n11.type, a10 = n11.stateNode, 0 == (128 & n11.flags) && ("function" == typeof t11.getDerivedStateFromError || null !== a10 && "function" == typeof a10.componentDidCatch && (null === uG || !uG.has(a10)))) return n11.flags |= 65536, l11 &= -l11, n11.lanes |= l11, oV(l11 = oB(l11), e11, n11, r11), lG(n11, l11), false;
              break;
            case 22:
              if (null !== n11.memoizedState) return n11.flags |= 65536, false;
          }
          n11 = n11.return;
        } while (null !== n11);
        return false;
      })(e10, l10, t10, n10, uO)) {
        uF = 1, oA(e10, rz(n10, e10.current)), uT = null;
        return;
      }
    } catch (t11) {
      if (null !== l10) throw uT = l10, t11;
      uF = 1, oA(e10, rz(n10, e10.current)), uT = null;
      return;
    }
    32768 & t10.flags ? (rX || 1 === r10 ? e10 = true : uM || 0 != (536870912 & uO) ? e10 = false : (uR = e10 = true, (2 === r10 || 9 === r10 || 3 === r10 || 6 === r10) && null !== (r10 = l8.current) && 13 === r10.tag && (r10.flags |= 16384)), sb(t10, e10)) : sy(t10);
  }
  function sy(e10) {
    var t10 = e10;
    do {
      if (0 != (32768 & t10.flags)) return void sb(t10, uR);
      e10 = t10.return;
      var n10 = (function(e11, t11, n11) {
        var r10 = t11.pendingProps;
        switch (r$(t11), t11.tag) {
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
          case 1:
            return iy(t11), null;
          case 3:
            return n11 = t11.stateNode, r10 = null, null !== e11 && (r10 = e11.memoizedState.cache), t11.memoizedState.cache !== r10 && (t11.flags |= 2048), r9(lf), eo(), n11.pendingContext && (n11.context = n11.pendingContext, n11.pendingContext = null), (null === e11 || null === e11.child) && (r1(t11) ? ip(t11) : null === e11 || e11.memoizedState.isDehydrated && 0 == (256 & t11.flags) || (t11.flags |= 1024, r3())), iy(t11), null;
          case 26:
            var l10 = t11.type, a10 = t11.memoizedState;
            return null === e11 ? (ip(t11), null !== a10 ? (iy(t11), ih(t11, a10)) : (iy(t11), im(t11, l10, null, r10, n11))) : a10 ? a10 !== e11.memoizedState ? (ip(t11), iy(t11), ih(t11, a10)) : (iy(t11), t11.flags &= -16777217) : ((e11 = e11.memoizedProps) !== r10 && ip(t11), iy(t11), im(t11, l10, e11, r10, n11)), null;
          case 27:
            if (eu(t11), n11 = er.current, l10 = t11.type, null !== e11 && null != t11.stateNode) e11.memoizedProps !== r10 && ip(t11);
            else {
              if (!r10) {
                if (null === t11.stateNode) throw Error(u(166));
                return iy(t11), t11.subtreeFlags &= -33554433, null;
              }
              e11 = et.current, r1(t11) ? rZ(t11) : (t11.stateNode = e11 = c3(l10, r10, n11), ip(t11));
            }
            return iy(t11), t11.subtreeFlags &= -33554433, null;
          case 5:
            if (eu(t11), l10 = t11.type, null !== e11 && null != t11.stateNode) e11.memoizedProps !== r10 && ip(t11);
            else {
              if (!r10) {
                if (null === t11.stateNode) throw Error(u(166));
                return iy(t11), t11.subtreeFlags &= -33554433, null;
              }
              if (a10 = et.current, r1(t11)) rZ(t11);
              else {
                var o10 = cp(er.current);
                switch (a10) {
                  case 1:
                    a10 = o10.createElementNS("http://www.w3.org/2000/svg", l10);
                    break;
                  case 2:
                    a10 = o10.createElementNS("http://www.w3.org/1998/Math/MathML", l10);
                    break;
                  default:
                    switch (l10) {
                      case "svg":
                        a10 = o10.createElementNS("http://www.w3.org/2000/svg", l10);
                        break;
                      case "math":
                        a10 = o10.createElementNS("http://www.w3.org/1998/Math/MathML", l10);
                        break;
                      case "script":
                        (a10 = o10.createElement("div")).innerHTML = "<script><\/script>", a10 = a10.removeChild(a10.firstChild);
                        break;
                      case "select":
                        a10 = "string" == typeof r10.is ? o10.createElement("select", { is: r10.is }) : o10.createElement("select"), r10.multiple ? a10.multiple = true : r10.size && (a10.size = r10.size);
                        break;
                      default:
                        a10 = "string" == typeof r10.is ? o10.createElement(l10, { is: r10.is }) : o10.createElement(l10);
                    }
                }
                a10[eq] = t11, a10[eX] = r10;
                e: for (o10 = t11.child; null !== o10; ) {
                  if (5 === o10.tag || 6 === o10.tag) a10.appendChild(o10.stateNode);
                  else if (4 !== o10.tag && 27 !== o10.tag && null !== o10.child) {
                    o10.child.return = o10, o10 = o10.child;
                    continue;
                  }
                  if (o10 === t11) break;
                  for (; null === o10.sibling; ) {
                    if (null === o10.return || o10.return === t11) break e;
                    o10 = o10.return;
                  }
                  o10.sibling.return = o10.return, o10 = o10.sibling;
                }
                switch (t11.stateNode = a10, cu(a10, l10, r10), l10) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    r10 = !!r10.autoFocus;
                    break;
                  case "img":
                    r10 = true;
                    break;
                  default:
                    r10 = false;
                }
                r10 && ip(t11);
              }
            }
            return iy(t11), t11.subtreeFlags &= -33554433, im(t11, t11.type, null === e11 ? null : e11.memoizedProps, t11.pendingProps, n11), null;
          case 6:
            if (e11 && null != t11.stateNode) e11.memoizedProps !== r10 && ip(t11);
            else {
              if ("string" != typeof r10 && null === t11.stateNode) throw Error(u(166));
              if (e11 = er.current, r1(t11)) {
                if (e11 = t11.stateNode, n11 = t11.memoizedProps, r10 = null, null !== (l10 = rW)) switch (l10.tag) {
                  case 27:
                  case 5:
                    r10 = l10.memoizedProps;
                }
                e11[eq] = t11, (e11 = !!(e11.nodeValue === n11 || null !== r10 && true === r10.suppressHydrationWarning || ca(e11.nodeValue, n11))) || rJ(t11, true);
              } else (e11 = cp(e11).createTextNode(r10))[eq] = t11, t11.stateNode = e11;
            }
            return iy(t11), null;
          case 31:
            if (n11 = t11.memoizedState, null === e11 || null !== e11.memoizedState) {
              if (r10 = r1(t11), null !== n11) {
                if (null === e11) {
                  if (!r10) throw Error(u(318));
                  if (!(e11 = null !== (e11 = t11.memoizedState) ? e11.dehydrated : null)) throw Error(u(557));
                  e11[eq] = t11;
                } else r2(), 0 == (128 & t11.flags) && (t11.memoizedState = null), t11.flags |= 4;
                iy(t11), e11 = false;
              } else n11 = r3(), null !== e11 && null !== e11.memoizedState && (e11.memoizedState.hydrationErrors = n11), e11 = true;
              if (!e11) {
                if (256 & t11.flags) return ar(t11), t11;
                return ar(t11), null;
              }
              if (0 != (128 & t11.flags)) throw Error(u(558));
            }
            return iy(t11), null;
          case 13:
            if (r10 = t11.memoizedState, null === e11 || null !== e11.memoizedState && null !== e11.memoizedState.dehydrated) {
              if (l10 = r1(t11), null !== r10 && null !== r10.dehydrated) {
                if (null === e11) {
                  if (!l10) throw Error(u(318));
                  if (!(l10 = null !== (l10 = t11.memoizedState) ? l10.dehydrated : null)) throw Error(u(317));
                  l10[eq] = t11;
                } else r2(), 0 == (128 & t11.flags) && (t11.memoizedState = null), t11.flags |= 4;
                iy(t11), l10 = false;
              } else l10 = r3(), null !== e11 && null !== e11.memoizedState && (e11.memoizedState.hydrationErrors = l10), l10 = true;
              if (!l10) {
                if (256 & t11.flags) return ar(t11), t11;
                return ar(t11), null;
              }
            }
            if (ar(t11), 0 != (128 & t11.flags)) return t11.lanes = n11, t11;
            return n11 = null !== r10, e11 = null !== e11 && null !== e11.memoizedState, n11 && (r10 = t11.child, l10 = null, null !== r10.alternate && null !== r10.alternate.memoizedState && null !== r10.alternate.memoizedState.cachePool && (l10 = r10.alternate.memoizedState.cachePool.pool), a10 = null, null !== r10.memoizedState && null !== r10.memoizedState.cachePool && (a10 = r10.memoizedState.cachePool.pool), a10 !== l10 && (r10.flags |= 2048)), n11 !== e11 && n11 && (t11.child.flags |= 8192), ig(t11, t11.updateQueue), iy(t11), null;
          case 4:
            return eo(), null === e11 && s6(t11.stateNode.containerInfo), t11.flags |= 67108864, iy(t11), null;
          case 10:
            return r9(t11.type), iy(t11), null;
          case 19:
            if (ao(t11), null === (r10 = t11.memoizedState)) return iy(t11), null;
            if (l10 = 0 != (128 & t11.flags), null === (a10 = r10.rendering)) if (l10) iv(r10, false);
            else {
              if (0 !== uF || null !== e11 && 0 != (128 & e11.flags)) for (e11 = t11.child; null !== e11; ) {
                if (null !== (a10 = ai(e11))) {
                  for (t11.flags |= 128, iv(r10, false), t11.updateQueue = e11 = a10.updateQueue, ig(t11, e11), t11.subtreeFlags = 0, e11 = n11, n11 = t11.child; null !== n11; ) r_(n11, e11), n11 = n11.sibling;
                  return aa(t11, 1 & al.current | 2), rX && rB(t11, r10.treeForkCount), t11.child;
                }
                e11 = e11.sibling;
              }
              null !== r10.tail && ey() > uX && (t11.flags |= 128, l10 = true, iv(r10, false), t11.lanes = 4194304);
            }
            else {
              if (!l10) if (null !== (e11 = ai(a10))) {
                if (t11.flags |= 128, l10 = true, t11.updateQueue = e11 = e11.updateQueue, ig(t11, e11), iv(r10, true), null === r10.tail && "collapsed" !== r10.tailMode && "visible" !== r10.tailMode && !a10.alternate && !rX) return iy(t11), null;
              } else 2 * ey() - r10.renderingStartTime > uX && 536870912 !== n11 && (t11.flags |= 128, l10 = true, iv(r10, false), t11.lanes = 4194304);
              r10.isBackwards ? (a10.sibling = t11.child, t11.child = a10) : (null !== (e11 = r10.last) ? e11.sibling = a10 : t11.child = a10, r10.last = a10);
            }
            if (null !== r10.tail) {
              e11 = r10.tail;
              e: {
                for (n11 = e11; null !== n11; ) {
                  if (null !== n11.alternate) {
                    n11 = false;
                    break e;
                  }
                  n11 = n11.sibling;
                }
                n11 = true;
              }
              return r10.rendering = e11, r10.tail = e11.sibling, r10.renderingStartTime = ey(), e11.sibling = null, a10 = al.current, a10 = l10 ? 1 & a10 | 2 : 1 & a10, "visible" === r10.tailMode || "collapsed" === r10.tailMode || !n11 || rX ? aa(t11, a10) : (n11 = a10, ee(l8, t11), ee(al, n11), null === l7 && (l7 = t11)), rX && rB(t11, r10.treeForkCount), e11;
            }
            return iy(t11), null;
          case 22:
          case 23:
            return ar(t11), l5(), r10 = null !== t11.memoizedState, null !== e11 ? null !== e11.memoizedState !== r10 && (t11.flags |= 8192) : r10 && (t11.flags |= 8192), r10 ? 0 != (536870912 & n11) && 0 == (128 & t11.flags) && (iy(t11), 6 & t11.subtreeFlags && (t11.flags |= 8192)) : iy(t11), null !== (n11 = t11.updateQueue) && ig(t11, n11.retryQueue), n11 = null, null !== e11 && null !== e11.memoizedState && null !== e11.memoizedState.cachePool && (n11 = e11.memoizedState.cachePool.pool), r10 = null, null !== t11.memoizedState && null !== t11.memoizedState.cachePool && (r10 = t11.memoizedState.cachePool.pool), r10 !== n11 && (t11.flags |= 2048), null !== e11 && Z(lk), null;
          case 24:
            return n11 = null, null !== e11 && (n11 = e11.memoizedState.cache), t11.memoizedState.cache !== n11 && (t11.flags |= 2048), r9(lf), iy(t11), null;
          case 25:
            return null;
          case 30:
            return t11.flags |= 33554432, iy(t11), null;
        }
        throw Error(u(156, t11.tag));
      })(t10.alternate, t10, uD);
      if (null !== n10) {
        uT = n10;
        return;
      }
      if (null !== (t10 = t10.sibling)) {
        uT = t10;
        return;
      }
      uT = t10 = e10;
    } while (null !== t10);
    0 === uF && (uF = 5);
  }
  function sb(e10, t10) {
    do {
      var n10 = (function(e11, t11) {
        switch (r$(t11), t11.tag) {
          case 1:
            return 65536 & (e11 = t11.flags) ? (t11.flags = -65537 & e11 | 128, t11) : null;
          case 3:
            return r9(lf), eo(), 0 != (65536 & (e11 = t11.flags)) && 0 == (128 & e11) ? (t11.flags = -65537 & e11 | 128, t11) : null;
          case 26:
          case 27:
          case 5:
            return eu(t11), null;
          case 31:
            if (null !== t11.memoizedState) {
              if (ar(t11), null === t11.alternate) throw Error(u(340));
              r2();
            }
            return 65536 & (e11 = t11.flags) ? (t11.flags = -65537 & e11 | 128, t11) : null;
          case 13:
            if (ar(t11), null !== (e11 = t11.memoizedState) && null !== e11.dehydrated) {
              if (null === t11.alternate) throw Error(u(340));
              r2();
            }
            return 65536 & (e11 = t11.flags) ? (t11.flags = -65537 & e11 | 128, t11) : null;
          case 19:
            return ao(t11), 65536 & (e11 = t11.flags) ? (t11.flags = -65537 & e11 | 128, null !== (e11 = t11.memoizedState) && (e11.rendering = null, e11.tail = null), t11.flags |= 4, t11) : null;
          case 4:
            return eo(), null;
          case 10:
            return r9(t11.type), null;
          case 22:
          case 23:
            return ar(t11), l5(), null !== e11 && Z(lk), 65536 & (e11 = t11.flags) ? (t11.flags = -65537 & e11 | 128, t11) : null;
          case 24:
            return r9(lf), null;
          default:
            return null;
        }
      })(e10.alternate, e10);
      if (null !== n10) {
        n10.flags &= 32767, uT = n10;
        return;
      }
      if (null !== (n10 = e10.return) && (n10.flags |= 32768, n10.subtreeFlags = 0, n10.deletions = null), !t10 && null !== (e10 = e10.sibling)) {
        uT = e10;
        return;
      }
      uT = e10 = n10;
    } while (null !== e10);
    uF = 6, uT = null;
  }
  function sw(e10, t10, n10, r10, l10, a10, o10, i10, s10, c10, f10, d2) {
    e10.cancelPendingCommit = null;
    do
      sN();
    while (0 !== uY);
    if (0 != (6 & uN)) throw Error(u(327));
    if (null !== t10) {
      if (t10 === e10.current) throw Error(u(177));
      e10 === uC && (uT = uC = null, uO = 0), uZ = t10, uJ = e10, u0 = n10, u2 = l10, u3 = r10, (function(e11, t11, n11, r11, l11, a11, o11) {
        var i11, u10 = t11.lanes | t11.childLanes;
        if (u1 = u10, !(function(e12, t12, n12, r12, l12, a12) {
          var o12 = e12.pendingLanes;
          e12.pendingLanes = n12, e12.suspendedLanes = 0, e12.pingedLanes = 0, e12.warmLanes = 0, e12.expiredLanes &= n12, e12.entangledLanes &= n12, e12.errorRecoveryDisabledLanes &= n12, e12.shellSuspendCounter = 0;
          var i12 = e12.entanglements, u11 = e12.expirationTimes, s11 = e12.hiddenUpdates;
          for (n12 = o12 & ~n12; 0 < n12; ) {
            var c11 = 31 - eN(n12), f11 = 1 << c11;
            i12[c11] = 0, u11[c11] = -1;
            var d3 = s11[c11];
            if (null !== d3) for (s11[c11] = null, c11 = 0; c11 < d3.length; c11++) {
              var p2 = d3[c11];
              null !== p2 && (p2.lane &= -536870913);
            }
            n12 &= ~f11;
          }
          0 !== r12 && ej(e12, r12, 0), 0 !== a12 && 0 === l12 && 0 !== e12.tag && (e12.suspendedLanes |= a12 & ~(o12 & ~t12));
        })(e11, n11, u10 |= rd, r11, l11, a11), u6 = null, (335544064 & n11) === n11 ? (i11 = e11.transitionTypes, e11.transitionTypes = null, u5 = i11, r11 = 10262) : (u5 = null, r11 = 10256), 0 != (t11.subtreeFlags & r11) || 0 != (t11.flags & r11) ? (e11.callbackNode = null, e11.callbackPriority = 0, em(ek, function() {
          return sC(), null;
        })) : (e11.callbackNode = null, e11.callbackPriority = 0), iI = false, r11 = 0 != (13878 & t11.flags), 0 != (13878 & t11.subtreeFlags) || r11) {
          r11 = q.T, q.T = null, l11 = X.p, X.p = 2, a11 = uN, uN |= 4;
          try {
            !(function(e12, t12, n12) {
              if (e12 = e12.containerInfo, cf = fM, nq(e12 = nW(e12))) {
                if ("selectionStart" in e12) var r12 = { start: e12.selectionStart, end: e12.selectionEnd };
                else e: {
                  var l12 = (r12 = (r12 = e12.ownerDocument) && r12.defaultView || window).getSelection && r12.getSelection();
                  if (l12 && 0 !== l12.rangeCount) {
                    r12 = l12.anchorNode;
                    var a12, o12 = l12.anchorOffset, i12 = l12.focusNode;
                    l12 = l12.focusOffset;
                    try {
                      r12.nodeType, i12.nodeType;
                    } catch (e13) {
                      r12 = null;
                      break e;
                    }
                    var u11 = 0, s11 = -1, c11 = -1, f11 = 0, d3 = 0, p2 = e12, m2 = null;
                    t: for (; ; ) {
                      for (; p2 !== r12 || 0 !== o12 && 3 !== p2.nodeType || (s11 = u11 + o12), p2 !== i12 || 0 !== l12 && 3 !== p2.nodeType || (c11 = u11 + l12), 3 === p2.nodeType && (u11 += p2.nodeValue.length), null !== (a12 = p2.firstChild); ) m2 = p2, p2 = a12;
                      for (; ; ) {
                        if (p2 === e12) break t;
                        if (m2 === r12 && ++f11 === o12 && (s11 = u11), m2 === i12 && ++d3 === l12 && (c11 = u11), null !== (a12 = p2.nextSibling)) break;
                        m2 = (p2 = m2).parentNode;
                      }
                      p2 = a12;
                    }
                    r12 = -1 === s11 || -1 === c11 ? null : { start: s11, end: c11 };
                  } else r12 = null;
                }
                r12 = r12 || { start: 0, end: 0 };
              } else r12 = null;
              for (cd = { focusedElem: e12, selectionRange: r12 }, fM = false, n12 = (335544064 & n12) === n12, i1 = t12, t12 = n12 ? 9270 : 1024; null !== i1; ) {
                if (e12 = i1, n12 && null !== (r12 = e12.deletions)) for (o12 = 0; o12 < r12.length; o12++) n12 && iW(r12[o12]);
                if (null === e12.alternate && 0 != (2 & e12.flags)) n12 && iF(e12), i5(n12);
                else {
                  if (22 === e12.tag) {
                    if (r12 = e12.alternate, null !== e12.memoizedState) {
                      null !== r12 && null === r12.memoizedState && n12 && iW(r12), i5(n12);
                      continue;
                    } else if (null !== r12 && null !== r12.memoizedState) {
                      n12 && iF(e12), i5(n12);
                      continue;
                    }
                  }
                  r12 = e12.child, 0 != (e12.subtreeFlags & t12) && null !== r12 ? (r12.return = e12, i1 = r12) : (n12 && (function e13(t13) {
                    for (t13 = t13.child; null !== t13; ) {
                      if (30 === t13.tag) {
                        var n13 = t13.memoizedProps, r13 = ro(n13, t13.stateNode);
                        n13 = ru(n13.default, n13.update), t13.flags &= -5, "none" !== n13 && iB(t13, r13, n13, t13.memoizedState = [], false);
                      } else 0 != (33554432 & t13.subtreeFlags) && e13(t13);
                      t13 = t13.sibling;
                    }
                  })(e12), i5(n12));
                }
              }
              iD = null;
            })(e11, t11, n11);
          } finally {
            uN = a11, X.p = l11, q.T = r11;
          }
        }
        uY = 1, iI ? u4 = (function(e12, t12, n12, r12, l12, a12, o12, i12, u11) {
          var s11 = 9 === t12.nodeType ? t12 : t12.ownerDocument;
          try {
            var c11 = s11.startViewTransition({ update: function() {
              var t13 = s11.defaultView, n13 = t13.navigation && t13.navigation.transition, o13 = s11.fonts.status;
              r12();
              var i13 = [];
              if ("loaded" === o13 && (s11.documentElement.clientHeight, "loading" === s11.fonts.status && i13.push(s11.fonts.ready)), o13 = i13.length, null !== e12) for (var u12 = e12.suspenseyImages, c12 = 0, f12 = 0; f12 < u12.length; f12++) {
                var d3 = u12[f12];
                if (!d3.complete) {
                  var p2 = d3.getBoundingClientRect();
                  if (0 < p2.bottom && 0 < p2.right && p2.top < t13.innerHeight && p2.left < t13.innerWidth) {
                    if ((c12 += fv(d3)) > fb) {
                      i13.length = o13;
                      break;
                    }
                    d3 = new Promise(cz.bind(d3)), i13.push(d3);
                  }
                }
              }
              return 0 < i13.length ? (t13 = Promise.race([Promise.all(i13), new Promise(function(e13) {
                return setTimeout(e13, 500);
              })]).then(l12, l12), (n13 ? Promise.allSettled([n13.finished, t13]) : t13).then(a12, a12)) : (l12(), n13) ? n13.finished.then(a12, a12) : void a12();
            }, types: n12 });
            s11.__reactViewTransition = c11;
            var f11 = [];
            return c11.ready.then(function() {
              for (var e13 = s11.documentElement.getAnimations({ subtree: true }), t13 = 0; t13 < e13.length; t13++) {
                var n13 = e13[t13], r13 = n13.effect, l13 = r13.pseudoElement;
                if (null != l13 && l13.startsWith("::view-transition")) {
                  f11.push(n13), n13 = r13.getKeyframes();
                  for (var a13 = l13 = void 0, i13 = true, u12 = 0; u12 < n13.length; u12++) {
                    var c12 = n13[u12], d3 = c12.width;
                    if (void 0 === l13) l13 = d3;
                    else if (l13 !== d3) {
                      i13 = false;
                      break;
                    }
                    if (d3 = c12.height, void 0 === a13) a13 = d3;
                    else if (a13 !== d3) {
                      i13 = false;
                      break;
                    }
                    delete c12.width, delete c12.height, "none" === c12.transform && delete c12.transform;
                  }
                  i13 && void 0 !== l13 && void 0 !== a13 && (r13.setKeyframes(n13), (i13 = getComputedStyle(r13.target, r13.pseudoElement)).width !== l13 || i13.height !== a13) && ((i13 = n13[0]).width = l13, i13.height = a13, (i13 = n13[n13.length - 1]).width = l13, i13.height = a13, r13.setKeyframes(n13));
                }
              }
              o12();
            }, function(e13) {
              s11.__reactViewTransition === c11 && (s11.__reactViewTransition = null);
              try {
                "object" == typeof e13 && null !== e13 && "InvalidStateError" === e13.name && ("View transition was skipped because document visibility state is hidden." === e13.message || "Skipping view transition because document visibility state has become hidden." === e13.message || "Skipping view transition because viewport size changed." === e13.message || "Transition was aborted because of invalid state" === e13.message) && (e13 = null), null !== e13 && u11(e13);
              } finally {
                r12(), l12(), o12();
              }
            }), c11.finished.finally(function() {
              for (var e13 = 0; e13 < f11.length; e13++) f11[e13].cancel();
              s11.__reactViewTransition === c11 && (s11.__reactViewTransition = null), i12();
            }), c11;
          } catch (e13) {
            return r12(), l12(), o12(), null;
          }
        })(o11, e11.containerInfo, u5, sE, s_, sk, sx, sC, sS) : (sE(), s_(), sx());
      })(e10, t10, n10, o10, i10, s10, d2);
    }
  }
  function sS(e10) {
    0 !== uY && (0, uJ.onRecoverableError)(e10, { componentStack: null });
  }
  function sk() {
    3 === uY && (uY = 0, uf(uZ, uJ), uY = 4);
  }
  function sE() {
    if (1 === uY) {
      uY = 0;
      var e10 = uJ, t10 = uZ, n10 = u0, r10 = 0 != (13878 & t10.flags);
      if (0 != (13878 & t10.subtreeFlags) || r10) {
        r10 = q.T, q.T = null;
        var l10 = X.p;
        X.p = 2;
        var a10 = uN;
        uN |= 4;
        try {
          i3 = i4 = false, uu(t10, e10, n10), n10 = cd;
          var o10 = nW(e10.containerInfo), i10 = n10.focusedElem, u10 = n10.selectionRange;
          if (o10 !== i10 && i10 && i10.ownerDocument && (function e11(t11, n11) {
            return !!t11 && !!n11 && (t11 === n11 || (!t11 || 3 !== t11.nodeType) && (n11 && 3 === n11.nodeType ? e11(t11, n11.parentNode) : "contains" in t11 ? t11.contains(n11) : !!t11.compareDocumentPosition && !!(16 & t11.compareDocumentPosition(n11))));
          })(i10.ownerDocument.documentElement, i10)) {
            if (null !== u10 && nq(i10)) {
              var s10 = u10.start, c10 = u10.end;
              if (void 0 === c10 && (c10 = s10), "selectionStart" in i10) i10.selectionStart = s10, i10.selectionEnd = Math.min(c10, i10.value.length);
              else {
                var f10 = i10.ownerDocument || document, d2 = f10 && f10.defaultView || window;
                if (d2.getSelection) {
                  var p2 = d2.getSelection(), m2 = i10.textContent.length, h2 = Math.min(u10.start, m2), g2 = void 0 === u10.end ? h2 : Math.min(u10.end, m2);
                  !p2.extend && h2 > g2 && (o10 = g2, g2 = h2, h2 = o10);
                  var v2 = nQ(i10, h2), y2 = nQ(i10, g2);
                  if (v2 && y2 && (1 !== p2.rangeCount || p2.anchorNode !== v2.node || p2.anchorOffset !== v2.offset || p2.focusNode !== y2.node || p2.focusOffset !== y2.offset)) {
                    var b2 = f10.createRange();
                    b2.setStart(v2.node, v2.offset), p2.removeAllRanges(), h2 > g2 ? (p2.addRange(b2), p2.extend(y2.node, y2.offset)) : (b2.setEnd(y2.node, y2.offset), p2.addRange(b2));
                  }
                }
              }
            }
            for (f10 = [], p2 = i10; p2 = p2.parentNode; ) 1 === p2.nodeType && f10.push({ element: p2, left: p2.scrollLeft, top: p2.scrollTop });
            for ("function" == typeof i10.focus && i10.focus(), i10 = 0; i10 < f10.length; i10++) {
              var w2 = f10[i10];
              w2.element.scrollLeft = w2.left, w2.element.scrollTop = w2.top;
            }
          }
          fM = !!cf, cd = cf = null;
        } finally {
          uN = a10, X.p = l10, q.T = r10;
        }
      }
      e10.current = t10, uY = 2;
    }
  }
  function s_() {
    if (2 === uY) {
      uY = 0;
      var e10 = uJ, t10 = uZ, n10 = 0 != (8772 & t10.flags);
      if (0 != (8772 & t10.subtreeFlags) || n10) {
        n10 = q.T, q.T = null;
        var r10 = X.p;
        X.p = 2;
        var l10 = uN;
        uN |= 4;
        try {
          i8(e10, t10.alternate, t10);
        } finally {
          uN = l10, X.p = r10, q.T = n10;
        }
      }
      uY = 3;
    }
  }
  function sx() {
    if (4 === uY || 3 === uY) {
      uY = 0;
      var e10 = u4;
      u4 = null, ev();
      var t10 = uJ, n10 = uZ, r10 = u0, l10 = u3, a10 = (335544064 & r10) === r10 ? 10262 : 10256;
      if (0 != (n10.subtreeFlags & a10) || 0 != (n10.flags & a10) ? uY = 5 : (uY = 0, uZ = uJ = null, sP(t10, t10.pendingLanes)), 0 === (a10 = t10.pendingLanes) && (uG = null), eH(r10), n10 = n10.stateNode, eP && "function" == typeof eP.onCommitFiberRoot) try {
        eP.onCommitFiberRoot(ex, n10, void 0, 128 == (128 & n10.current.flags));
      } catch (e11) {
      }
      if (null !== l10) {
        n10 = q.T, a10 = X.p, X.p = 2, q.T = null;
        try {
          for (var o10 = t10.onRecoverableError, i10 = 0; i10 < l10.length; i10++) {
            var u10 = l10[i10];
            o10(u10.value, { componentStack: u10.stack });
          }
        } finally {
          q.T = n10, X.p = a10;
        }
      }
      if (l10 = u6, o10 = u5, u5 = null, null !== l10 && (u6 = null, null === o10 && (o10 = []), null !== e10)) for (u10 = 0; u10 < l10.length; u10++) void 0 !== (n10 = (0, l10[u10])(o10)) && e10.finished.finally(n10);
      0 != (3 & u0) && sN(), sV(t10), a10 = t10.pendingLanes, 0 != (261930 & r10) && 0 != (42 & a10) ? t10 === u7 ? u8++ : (u8 = 0, u7 = t10) : (u8 = 0, u7 = null), sH(0, false);
    }
  }
  function sP(e10, t10) {
    0 == (e10.pooledCacheLanes &= t10) && null != (t10 = e10.pooledCache) && (e10.pooledCache = null, lp(t10));
  }
  function sN() {
    return null !== u4 && (u4.skipTransition(), u4 = null), sE(), s_(), sx(), sC();
  }
  function sC() {
    if (5 !== uY) return false;
    var e10 = uJ, t10 = u1;
    u1 = 0;
    var n10 = eH(u0), r10 = q.T, l10 = X.p;
    try {
      X.p = 32 > n10 ? 32 : n10, q.T = null, n10 = u2, u2 = null;
      var a10 = uJ, o10 = u0;
      if (uY = 0, uZ = uJ = null, u0 = 0, 0 != (6 & uN)) throw Error(u(331));
      var i10 = uN;
      if (uN |= 4, uE(a10.current), ug(a10, a10.current, o10, n10), uN = i10, sH(0, false), eP && "function" == typeof eP.onPostCommitFiberRoot) try {
        eP.onPostCommitFiberRoot(ex, a10);
      } catch (e11) {
      }
      return true;
    } finally {
      X.p = l10, q.T = r10, sP(e10, t10);
    }
  }
  function sT(e10, t10, n10) {
    t10 = rz(n10, t10), t10 = oU(e10.stateNode, t10, 2), null !== (e10 = lX(e10, t10, 2)) && (eA(e10, 2), sV(e10));
  }
  function sO(e10, t10, n10) {
    if (3 === e10.tag) sT(e10, e10, n10);
    else for (; null !== t10; ) {
      if (3 === t10.tag) {
        sT(t10, e10, n10);
        break;
      }
      if (1 === t10.tag) {
        var r10 = t10.stateNode;
        if ("function" == typeof t10.type.getDerivedStateFromError || "function" == typeof r10.componentDidCatch && (null === uG || !uG.has(r10))) {
          e10 = rz(n10, e10), null !== (r10 = lX(t10, n10 = oB(2), 2)) && (oV(n10, r10, t10, e10), eA(r10, 2), sV(r10));
          break;
        }
      }
      t10 = t10.return;
    }
  }
  function sz(e10, t10, n10) {
    var r10 = e10.pingCache;
    if (null === r10) {
      r10 = e10.pingCache = new uP();
      var l10 = /* @__PURE__ */ new Set();
      r10.set(t10, l10);
    } else void 0 === (l10 = r10.get(t10)) && (l10 = /* @__PURE__ */ new Set(), r10.set(t10, l10));
    l10.has(n10) || (uI = true, l10.add(n10), e10 = sL.bind(null, e10, t10, n10), t10.then(e10, e10));
  }
  function sL(e10, t10, n10) {
    var r10 = e10.pingCache;
    null !== r10 && r10.delete(t10), e10.pingedLanes |= e10.suspendedLanes & n10, e10.warmLanes &= ~n10, uC === e10 && (uO & n10) === n10 && ((4 === uF || 3 === uF && (62914560 & uO) === uO && 300 > ey() - uW) && 0 == (2 & uN) ? su(e10, 0) : uU |= n10, uV === uO && (uV = 0)), sV(e10);
  }
  function sR(e10, t10) {
    0 === t10 && (t10 = eD()), null !== (e10 = rg(e10, t10)) && (eA(e10, t10), sV(e10));
  }
  function sM(e10) {
    var t10 = e10.memoizedState, n10 = 0;
    null !== t10 && (n10 = t10.retryLane), sR(e10, n10);
  }
  function sI(e10, t10) {
    var n10 = 0;
    switch (e10.tag) {
      case 31:
      case 13:
        var r10 = e10.stateNode, l10 = e10.memoizedState;
        null !== l10 && (n10 = l10.retryLane);
        break;
      case 19:
        r10 = e10.stateNode;
        break;
      case 22:
        r10 = e10.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    null !== r10 && r10.delete(t10), sR(e10, n10);
  }
  var sD = null, sF = null, sA = false, sj = false, sU = false, sB = 0;
  function sV(e10) {
    e10 !== sF && null === e10.next && (null === sF ? sD = sF = e10 : sF = sF.next = e10), sj = true, sA || (sA = true, cS(function() {
      0 != (6 & uN) ? em(ew, s$) : sQ();
    }));
  }
  function sH(e10, t10) {
    if (!sU && sj) {
      sU = true;
      do
        for (var n10 = false, r10 = sD; null !== r10; ) {
          if (!t10) if (0 !== e10) {
            var l10 = r10.pendingLanes;
            if (0 === l10) var a10 = 0;
            else {
              var o10 = r10.suspendedLanes, i10 = r10.pingedLanes;
              a10 = 201326741 & (a10 = (1 << 31 - eN(42 | e10) + 1) - 1 & (l10 & ~(o10 & ~i10))) ? 201326741 & a10 | 1 : a10 ? 2 | a10 : 0;
            }
            0 !== a10 && (n10 = true, sX(r10, a10));
          } else a10 = uO, 0 == (3 & (a10 = eM(r10, r10 === uC ? a10 : 0, null !== r10.cancelPendingCommit || -1 !== r10.timeoutHandle))) || eI(r10, a10) || (n10 = true, sX(r10, a10));
          r10 = r10.next;
        }
      while (n10);
      sU = false;
    }
  }
  function s$() {
    sQ();
  }
  function sQ() {
    sj = sA = false;
    var e10, t10 = 0;
    0 === sB || ((e10 = window.event) && "popstate" === e10.type ? e10 === cv || (cv = e10, 0) : (cv = null, 1)) || (t10 = sB);
    for (var n10 = ey(), r10 = null, l10 = sD; null !== l10; ) {
      var a10 = l10.next, o10 = sW(l10, n10);
      0 === o10 ? (l10.next = null, null === r10 ? sD = a10 : r10.next = a10, null === a10 && (sF = r10)) : (r10 = l10, (0 !== t10 || 0 != (3 & o10)) && (sj = true)), l10 = a10;
    }
    0 !== uY && 5 !== uY || sH(t10, false), 0 !== sB && (sB = 0);
  }
  function sW(e10, t10) {
    for (var n10 = e10.suspendedLanes, r10 = e10.pingedLanes, l10 = e10.expirationTimes, a10 = -62914561 & e10.pendingLanes; 0 < a10; ) {
      var o10 = 31 - eN(a10), i10 = 1 << o10, u10 = l10[o10];
      -1 === u10 ? (0 == (i10 & n10) || 0 != (i10 & r10)) && (l10[o10] = (function(e11, t11) {
        switch (e11) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return t11 + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return t11 + 5e3;
          default:
            return -1;
        }
      })(i10, t10)) : u10 <= t10 && (e10.expiredLanes |= i10), a10 &= ~i10;
    }
    if (t10 = uC, n10 = uO, n10 = eM(e10, e10 === t10 ? n10 : 0, null !== e10.cancelPendingCommit || -1 !== e10.timeoutHandle), r10 = e10.callbackNode, 0 === n10 || e10 === t10 && (2 === uz || 9 === uz) || null !== e10.cancelPendingCommit) return null !== r10 && null !== r10 && eh(r10), e10.callbackNode = null, e10.callbackPriority = 0;
    if (0 == (3 & n10) || eI(e10, n10)) {
      if ((t10 = n10 & -n10) === e10.callbackPriority) return t10;
      switch (null !== r10 && eh(r10), eH(n10)) {
        case 2:
        case 8:
          n10 = eS;
          break;
        case 32:
        default:
          n10 = ek;
          break;
        case 268435456:
          n10 = e_;
      }
      return n10 = em(n10, r10 = sq.bind(null, e10)), e10.callbackPriority = t10, e10.callbackNode = n10, t10;
    }
    return null !== r10 && null !== r10 && eh(r10), e10.callbackPriority = 2, e10.callbackNode = null, 2;
  }
  function sq(e10, t10) {
    if (0 !== uY && 5 !== uY) return e10.callbackNode = null, e10.callbackPriority = 0, null;
    var n10 = e10.callbackNode;
    if (sN() && e10.callbackNode !== n10) return null;
    var r10 = uO;
    return 0 === (r10 = eM(e10, e10 === uC ? r10 : 0, null !== e10.cancelPendingCommit || -1 !== e10.timeoutHandle)) ? null : (sr(e10, r10, t10), sW(e10, ey()), null != e10.callbackNode && e10.callbackNode === n10 ? sq.bind(null, e10) : null);
  }
  function sX(e10, t10) {
    if (sN()) return null;
    sr(e10, t10, true);
  }
  function sK() {
    if (0 === sB) {
      var e10 = ly;
      0 === e10 && (e10 = eO, 0 == (261888 & (eO <<= 1)) && (eO = 256)), sB = e10;
    }
    return sB;
  }
  function sG(e10) {
    return null == e10 || "symbol" == typeof e10 || "boolean" == typeof e10 ? null : "function" == typeof e10 ? e10 : tO(e10);
  }
  for (var sY = 0; sY < rr.length; sY++) {
    var sJ = rr[sY];
    rl(sJ.toLowerCase(), "on" + (sJ[0].toUpperCase() + sJ.slice(1)));
  }
  rl(n6, "onAnimationEnd"), rl(n5, "onAnimationIteration"), rl(n8, "onAnimationStart"), rl("dblclick", "onDoubleClick"), rl("focusin", "onFocus"), rl("focusout", "onBlur"), rl(n7, "onTransitionRun"), rl(n9, "onTransitionStart"), rl(re, "onTransitionCancel"), rl(rt, "onTransitionEnd"), tn("onMouseEnter", ["mouseout", "mouseover"]), tn("onMouseLeave", ["mouseout", "mouseover"]), tn("onPointerEnter", ["pointerout", "pointerover"]), tn("onPointerLeave", ["pointerout", "pointerover"]), tt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), tt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), tt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), tt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), tt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), tt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var sZ = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), s0 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(sZ));
  function s1(e10, t10) {
    t10 = 0 != (4 & t10);
    for (var n10 = 0; n10 < e10.length; n10++) {
      var r10 = e10[n10], l10 = r10.event;
      r10 = r10.listeners;
      e: {
        var a10 = void 0;
        if (t10) for (var o10 = r10.length - 1; 0 <= o10; o10--) {
          var i10 = r10[o10], u10 = i10.instance, s10 = i10.currentTarget;
          if (i10 = i10.listener, u10 !== a10 && l10.isPropagationStopped()) break e;
          a10 = i10, l10.currentTarget = s10;
          try {
            a10(l10);
          } catch (e11) {
            rs(e11);
          }
          l10.currentTarget = null, a10 = u10;
        }
        else for (o10 = 0; o10 < r10.length; o10++) {
          if (u10 = (i10 = r10[o10]).instance, s10 = i10.currentTarget, i10 = i10.listener, u10 !== a10 && l10.isPropagationStopped()) break e;
          a10 = i10, l10.currentTarget = s10;
          try {
            a10(l10);
          } catch (e11) {
            rs(e11);
          }
          l10.currentTarget = null, a10 = u10;
        }
      }
    }
  }
  function s2(e10, t10) {
    var n10 = t10[eG];
    void 0 === n10 && (n10 = t10[eG] = /* @__PURE__ */ new Set());
    var r10 = e10 + "__bubble";
    n10.has(r10) || (s5(t10, e10, 2, false), n10.add(r10));
  }
  function s3(e10, t10, n10) {
    var r10 = 0;
    t10 && (r10 |= 4), s5(n10, e10, r10, t10);
  }
  var s4 = "_reactListening" + Math.random().toString(36).slice(2);
  function s6(e10) {
    if (!e10[s4]) {
      e10[s4] = true, e9.forEach(function(t11) {
        "selectionchange" !== t11 && (s0.has(t11) || s3(t11, false, e10), s3(t11, true, e10));
      });
      var t10 = 9 === e10.nodeType ? e10 : e10.ownerDocument;
      null === t10 || t10[s4] || (t10[s4] = true, s3("selectionchange", false, t10));
    }
  }
  function s5(e10, t10, n10, r10) {
    switch (fB(t10)) {
      case 2:
        var l10 = fI;
        break;
      case 8:
        l10 = fD;
        break;
      default:
        l10 = fF;
    }
    n10 = l10.bind(null, t10, n10, e10), l10 = void 0, tB && ("touchstart" === t10 || "touchmove" === t10 || "wheel" === t10) && (l10 = true), r10 ? void 0 !== l10 ? e10.addEventListener(t10, n10, { capture: true, passive: l10 }) : e10.addEventListener(t10, n10, true) : void 0 !== l10 ? e10.addEventListener(t10, n10, { passive: l10 }) : e10.addEventListener(t10, n10, false);
  }
  function s8(e10, t10, n10, r10, l10) {
    var a10 = r10;
    if (0 == (1 & t10) && 0 == (2 & t10) && null !== r10) e: for (; ; ) {
      if (null === r10) return;
      var o10 = r10.tag;
      if (3 === o10 || 4 === o10) {
        var i10 = r10.stateNode.containerInfo;
        if (i10 === l10) break;
        if (4 === o10) for (o10 = r10.return; null !== o10; ) {
          var u10 = o10.tag;
          if ((3 === u10 || 4 === u10) && o10.stateNode.containerInfo === l10) return;
          o10 = o10.return;
        }
        for (; null !== i10; ) {
          if (null === (o10 = e3(i10))) return;
          if (5 === (u10 = o10.tag) || 6 === u10 || 26 === u10 || 27 === u10) {
            r10 = a10 = o10;
            continue e;
          }
          i10 = i10.parentNode;
        }
      }
      r10 = r10.return;
    }
    tA(function() {
      var r11 = a10, l11 = tR(n10), o11 = [];
      e: {
        var i11 = rn.get(e10);
        if (void 0 !== i11) {
          var u11 = t3, s10 = e10;
          switch (e10) {
            case "keypress":
              if (0 === tq(n10)) break e;
            case "keydown":
            case "keyup":
              u11 = nu;
              break;
            case "focusin":
              s10 = "focus", u11 = t9;
              break;
            case "focusout":
              s10 = "blur", u11 = t9;
              break;
            case "beforeblur":
            case "afterblur":
              u11 = t9;
              break;
            case "click":
              if (2 === n10.button) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              u11 = t8;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              u11 = t7;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              u11 = nf;
              break;
            case n6:
            case n5:
            case n8:
              u11 = ne;
              break;
            case rt:
              u11 = nd;
              break;
            case "scroll":
            case "scrollend":
              u11 = t6;
              break;
            case "wheel":
              u11 = np;
              break;
            case "copy":
            case "cut":
            case "paste":
              u11 = nt;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              u11 = ns;
              break;
            case "submit":
              u11 = nc;
              break;
            case "toggle":
            case "beforetoggle":
              u11 = nm;
          }
          var f10 = 0 != (4 & t10), d2 = !f10 && ("scroll" === e10 || "scrollend" === e10), p2 = f10 ? null !== i11 ? i11 + "Capture" : null : i11;
          f10 = [];
          for (var m2, h2 = r11; null !== h2; ) {
            var g2 = h2;
            if (m2 = g2.stateNode, 5 !== (g2 = g2.tag) && 26 !== g2 && 27 !== g2 || null === m2 || null === p2 || null != (g2 = tj(h2, p2)) && f10.push(s7(h2, g2, m2)), d2) break;
            h2 = h2.return;
          }
          0 < f10.length && (i11 = new u11(i11, s10, null, n10, l11), o11.push({ event: i11, listeners: f10 }));
        }
      }
      if (0 == (7 & t10)) {
        u11 = "mouseover" === e10 || "pointerover" === e10, i11 = "mouseout" === e10 || "pointerout" === e10, !(u11 && n10 !== tL && (s10 = n10.relatedTarget || n10.fromElement) && (e3(s10) || s10[eK])) && (i11 || u11) && (s10 = l11.window === l11 ? l11 : (u11 = l11.ownerDocument) ? u11.defaultView || u11.parentWindow : window, i11 ? (u11 = n10.relatedTarget || n10.toElement, i11 = r11, null !== (u11 = u11 ? e3(u11) : null) && (d2 = c(u11), f10 = u11.tag, u11 !== d2 || 5 !== f10 && 27 !== f10 && 6 !== f10) && (u11 = null)) : (i11 = null, u11 = r11), i11 !== u11 && (f10 = t8, g2 = "onMouseLeave", p2 = "onMouseEnter", h2 = "mouse", ("pointerout" === e10 || "pointerover" === e10) && (f10 = ns, g2 = "onPointerLeave", p2 = "onPointerEnter", h2 = "pointer"), d2 = null == i11 ? s10 : e6(i11), m2 = null == u11 ? s10 : e6(u11), (s10 = new f10(g2, h2 + "leave", i11, n10, l11)).target = d2, s10.relatedTarget = m2, g2 = null, e3(l11) === r11 && ((f10 = new f10(p2, h2 + "enter", u11, n10, l11)).target = m2, f10.relatedTarget = d2, g2 = f10), d2 = g2, f10 = i11 && u11 ? E(i11, u11, ce) : null, null !== i11 && ct(o11, s10, i11, f10, false), null !== u11 && null !== d2 && ct(o11, d2, u11, f10, true)));
        e: {
          if ("select" === (u11 = (i11 = r11 ? e6(r11) : window).nodeName && i11.nodeName.toLowerCase()) || "input" === u11 && "file" === i11.type) var v2, y2 = nz;
          else if (nx(i11)) if (nL) y2 = nU;
          else {
            y2 = nA;
            var b2 = nF;
          }
          else (u11 = i11.nodeName) && "input" === u11.toLowerCase() && ("checkbox" === i11.type || "radio" === i11.type) ? y2 = nj : r11 && tN(r11.elementType) && (y2 = nz);
          if (y2 && (y2 = y2(e10, r11))) {
            nP(o11, y2, n10, l11);
            break e;
          }
          b2 && b2(e10, i11, r11);
        }
        switch (b2 = r11 ? e6(r11) : window, e10) {
          case "focusin":
            (nx(b2) || "true" === b2.contentEditable) && (nK = b2, nG = r11, nY = null);
            break;
          case "focusout":
            nY = nG = nK = null;
            break;
          case "mousedown":
            nJ = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            nJ = false, nZ(o11, n10, l11);
            break;
          case "selectionchange":
            if (nX) break;
          case "keydown":
          case "keyup":
            nZ(o11, n10, l11);
        }
        if (ng) t: {
          switch (e10) {
            case "compositionstart":
              var w2 = "onCompositionStart";
              break t;
            case "compositionend":
              w2 = "onCompositionEnd";
              break t;
            case "compositionupdate":
              w2 = "onCompositionUpdate";
              break t;
          }
          w2 = void 0;
        }
        else nE ? nS(e10, n10) && (w2 = "onCompositionEnd") : "keydown" === e10 && 229 === n10.keyCode && (w2 = "onCompositionStart");
        w2 && (nb && "ko" !== n10.locale && (nE || "onCompositionStart" !== w2 ? "onCompositionEnd" === w2 && nE && (v2 = tW()) : (t$ = "value" in (tH = l11) ? tH.value : tH.textContent, nE = true)), 0 < (b2 = s9(r11, w2)).length && (w2 = new nn(w2, e10, null, n10, l11), o11.push({ event: w2, listeners: b2 }), v2 ? w2.data = v2 : null !== (v2 = nk(n10)) && (w2.data = v2))), (v2 = ny ? (function(e11, t11) {
          switch (e11) {
            case "compositionend":
              return nk(t11);
            case "keypress":
              if (32 !== t11.which) return null;
              return nw = true, " ";
            case "textInput":
              return " " === (e11 = t11.data) && nw ? null : e11;
            default:
              return null;
          }
        })(e10, n10) : (function(e11, t11) {
          if (nE) return "compositionend" === e11 || !ng && nS(e11, t11) ? (e11 = tW(), tQ = t$ = tH = null, nE = false, e11) : null;
          switch (e11) {
            case "paste":
            default:
              return null;
            case "keypress":
              if (!(t11.ctrlKey || t11.altKey || t11.metaKey) || t11.ctrlKey && t11.altKey) {
                if (t11.char && 1 < t11.char.length) return t11.char;
                if (t11.which) return String.fromCharCode(t11.which);
              }
              return null;
            case "compositionend":
              return nb && "ko" !== t11.locale ? null : t11.data;
          }
        })(e10, n10)) && 0 < (w2 = s9(r11, "onBeforeInput")).length && (b2 = new nn("onBeforeInput", "beforeinput", null, n10, l11), o11.push({ event: b2, listeners: w2 }), b2.data = v2);
        var S2 = e10;
        if ("submit" === S2 && r11 && r11.stateNode === l11) {
          var k2 = sG((l11[eX] || null).action), _2 = n10.submitter;
          _2 && null !== (S2 = (S2 = _2[eX] || null) ? sG(S2.formAction) : _2.getAttribute("formAction")) && (k2 = S2, _2 = null);
          var x2 = new t3("action", "action", null, n10, l11);
          o11.push({ event: x2, listeners: [{ instance: null, listener: function() {
            if (n10.defaultPrevented) {
              if (0 !== sB) {
                var e11 = new FormData(l11, _2);
                od(r11, { pending: true, data: e11, method: l11.method, action: k2 }, null, e11);
              }
            } else "function" == typeof k2 && (x2.preventDefault(), od(r11, { pending: true, data: e11 = new FormData(l11, _2), method: l11.method, action: k2 }, k2, e11));
          }, currentTarget: l11 }] });
        }
      }
      s1(o11, t10);
    });
  }
  function s7(e10, t10, n10) {
    return { instance: e10, listener: t10, currentTarget: n10 };
  }
  function s9(e10, t10) {
    for (var n10 = t10 + "Capture", r10 = []; null !== e10; ) {
      var l10 = e10, a10 = l10.stateNode;
      if (5 !== (l10 = l10.tag) && 26 !== l10 && 27 !== l10 || null === a10 || (null != (l10 = tj(e10, n10)) && r10.unshift(s7(e10, l10, a10)), null != (l10 = tj(e10, t10)) && r10.push(s7(e10, l10, a10))), 3 === e10.tag) return r10;
      e10 = e10.return;
    }
    return [];
  }
  function ce(e10) {
    if (null === e10) return null;
    do
      e10 = e10.return;
    while (e10 && 5 !== e10.tag && 27 !== e10.tag);
    return e10 || null;
  }
  function ct(e10, t10, n10, r10, l10) {
    for (var a10 = t10._reactName, o10 = []; null !== n10 && n10 !== r10; ) {
      var i10 = n10, u10 = i10.alternate, s10 = i10.stateNode;
      if (i10 = i10.tag, null !== u10 && u10 === r10) break;
      5 !== i10 && 26 !== i10 && 27 !== i10 || null === s10 || (u10 = s10, l10 ? null != (s10 = tj(n10, a10)) && o10.unshift(s7(n10, s10, u10)) : l10 || null != (s10 = tj(n10, a10)) && o10.push(s7(n10, s10, u10))), n10 = n10.return;
    }
    0 !== o10.length && e10.push({ event: t10, listeners: o10 });
  }
  var cn = /\r\n?/g, cr = /\u0000|\uFFFD/g;
  function cl(e10) {
    return ("string" == typeof e10 ? e10 : "" + e10).replace(cn, "\n").replace(cr, "");
  }
  function ca(e10, t10) {
    return t10 = cl(t10), cl(e10) === t10;
  }
  function co(e10, t10, n10, r10, l10, a10) {
    switch (n10) {
      case "children":
        if ("string" == typeof r10) "body" === t10 || "textarea" === t10 && "" === r10 || tE(e10, r10);
        else {
          if ("number" != typeof r10 && "bigint" != typeof r10) return;
          "body" !== t10 && tE(e10, "" + r10);
        }
        break;
      case "className":
        ts(e10, "class", r10);
        break;
      case "tabIndex":
        ts(e10, "tabindex", r10);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ts(e10, n10, r10);
        break;
      case "style":
        tP(e10, r10, a10);
        return;
      case "data":
        if ("object" !== t10) {
          ts(e10, "data", r10);
          break;
        }
      case "src":
      case "href":
        if ("" === r10 && ("a" !== t10 || "href" !== n10) || null == r10 || "function" == typeof r10 || "symbol" == typeof r10 || "boolean" == typeof r10) {
          e10.removeAttribute(n10);
          break;
        }
        r10 = tO(r10), e10.setAttribute(n10, r10);
        break;
      case "action":
      case "formAction":
        if ("function" == typeof r10) {
          e10.setAttribute(n10, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        }
        if ("function" == typeof a10 && ("formAction" === n10 ? ("input" !== t10 && co(e10, t10, "name", l10.name, l10, null), co(e10, t10, "formEncType", l10.formEncType, l10, null), co(e10, t10, "formMethod", l10.formMethod, l10, null), co(e10, t10, "formTarget", l10.formTarget, l10, null)) : (co(e10, t10, "encType", l10.encType, l10, null), co(e10, t10, "method", l10.method, l10, null), co(e10, t10, "target", l10.target, l10, null))), null == r10 || "symbol" == typeof r10 || "boolean" == typeof r10) {
          e10.removeAttribute(n10);
          break;
        }
        r10 = tO(r10), e10.setAttribute(n10, r10);
        break;
      case "onClick":
        null != r10 && (e10.onclick = tz);
        return;
      case "onScroll":
        null != r10 && s2("scroll", e10);
        return;
      case "onScrollEnd":
        null != r10 && s2("scrollend", e10);
        return;
      case "dangerouslySetInnerHTML":
        if (null != r10) {
          if ("object" != typeof r10 || !("__html" in r10)) throw Error(u(61));
          if (null != (n10 = r10.__html)) {
            if (null != l10.children) throw Error(u(60));
            (null != a10 ? a10.__html : void 0) !== n10 && (e10.innerHTML = n10);
          }
        }
        break;
      case "multiple":
        e10.multiple = r10 && "function" != typeof r10 && "symbol" != typeof r10;
        break;
      case "muted":
        e10.muted = r10 && "function" != typeof r10 && "symbol" != typeof r10;
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
      case "autoFocus":
        break;
      case "xlinkHref":
        if (null == r10 || "function" == typeof r10 || "boolean" == typeof r10 || "symbol" == typeof r10) {
          e10.removeAttribute("xlink:href");
          break;
        }
        n10 = tO(r10), e10.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n10);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        null != r10 && "function" != typeof r10 && "symbol" != typeof r10 ? e10.setAttribute(n10, r10) : e10.removeAttribute(n10);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r10 && "function" != typeof r10 && "symbol" != typeof r10 ? e10.setAttribute(n10, "") : e10.removeAttribute(n10);
        break;
      case "capture":
      case "download":
        true === r10 ? e10.setAttribute(n10, "") : false !== r10 && null != r10 && "function" != typeof r10 && "symbol" != typeof r10 ? e10.setAttribute(n10, r10) : e10.removeAttribute(n10);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        null != r10 && "function" != typeof r10 && "symbol" != typeof r10 && !isNaN(r10) && 1 <= r10 ? e10.setAttribute(n10, r10) : e10.removeAttribute(n10);
        break;
      case "rowSpan":
      case "start":
        null == r10 || "function" == typeof r10 || "symbol" == typeof r10 || isNaN(r10) ? e10.removeAttribute(n10) : e10.setAttribute(n10, r10);
        break;
      case "popover":
        s2("beforetoggle", e10), s2("toggle", e10), tu(e10, "popover", r10);
        break;
      case "xlinkActuate":
        tc(e10, "http://www.w3.org/1999/xlink", "xlink:actuate", r10);
        break;
      case "xlinkArcrole":
        tc(e10, "http://www.w3.org/1999/xlink", "xlink:arcrole", r10);
        break;
      case "xlinkRole":
        tc(e10, "http://www.w3.org/1999/xlink", "xlink:role", r10);
        break;
      case "xlinkShow":
        tc(e10, "http://www.w3.org/1999/xlink", "xlink:show", r10);
        break;
      case "xlinkTitle":
        tc(e10, "http://www.w3.org/1999/xlink", "xlink:title", r10);
        break;
      case "xlinkType":
        tc(e10, "http://www.w3.org/1999/xlink", "xlink:type", r10);
        break;
      case "xmlBase":
        tc(e10, "http://www.w3.org/XML/1998/namespace", "xml:base", r10);
        break;
      case "xmlLang":
        tc(e10, "http://www.w3.org/XML/1998/namespace", "xml:lang", r10);
        break;
      case "xmlSpace":
        tc(e10, "http://www.w3.org/XML/1998/namespace", "xml:space", r10);
        break;
      case "is":
        tu(e10, "is", r10);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (2 < n10.length && ("o" === n10[0] || "O" === n10[0]) && ("n" === n10[1] || "N" === n10[1])) return;
        tu(e10, n10 = tC.get(n10) || n10, r10);
    }
    to = true;
  }
  function ci(e10, t10, n10, r10, l10, a10) {
    switch (n10) {
      case "style":
        tP(e10, r10, a10);
        return;
      case "dangerouslySetInnerHTML":
        if (null != r10) {
          if ("object" != typeof r10 || !("__html" in r10)) throw Error(u(61));
          if (null != (n10 = r10.__html)) {
            if (null != l10.children) throw Error(u(60));
            (null != a10 ? a10.__html : void 0) !== n10 && (e10.innerHTML = n10);
          }
        }
        break;
      case "children":
        if ("string" == typeof r10) tE(e10, r10);
        else {
          if ("number" != typeof r10 && "bigint" != typeof r10) return;
          tE(e10, "" + r10);
        }
        break;
      case "onScroll":
        null != r10 && s2("scroll", e10);
        return;
      case "onScrollEnd":
        null != r10 && s2("scrollend", e10);
        return;
      case "onClick":
        null != r10 && (e10.onclick = tz);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
      case "innerText":
      case "textContent":
        return;
      default:
        if (!te.hasOwnProperty(n10)) e: {
          if ("o" === n10[0] && "n" === n10[1] && (l10 = n10.endsWith("Capture"), a10 = n10.slice(2, l10 ? n10.length - 7 : void 0), "function" == typeof (t10 = null != (t10 = e10[eX] || null) ? t10[n10] : null) && e10.removeEventListener(a10, t10, l10), "function" == typeof r10)) {
            "function" != typeof t10 && null !== t10 && (n10 in e10 ? e10[n10] = null : e10.hasAttribute(n10) && e10.removeAttribute(n10)), e10.addEventListener(a10, r10, l10);
            break e;
          }
          to = true, n10 in e10 ? e10[n10] = r10 : true === r10 ? e10.setAttribute(n10, "") : tu(e10, n10, r10);
        }
        return;
    }
    to = true;
  }
  function cu(e10, t10, n10) {
    switch (t10) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        s2("error", e10), s2("load", e10);
        var r10, l10 = false, a10 = false;
        for (r10 in n10) if (n10.hasOwnProperty(r10)) {
          var o10 = n10[r10];
          if (null != o10) switch (r10) {
            case "src":
              l10 = true;
              break;
            case "srcSet":
              a10 = true;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(u(137, t10));
            default:
              co(e10, t10, r10, o10, n10, null);
          }
        }
        a10 && co(e10, t10, "srcSet", n10.srcSet, n10, null), l10 && co(e10, t10, "src", n10.src, n10, null);
        return;
      case "input":
        s2("invalid", e10);
        var i10 = r10 = o10 = a10 = null, s10 = null, c10 = null;
        for (l10 in n10) if (n10.hasOwnProperty(l10)) {
          var f10 = n10[l10];
          if (null != f10) switch (l10) {
            case "name":
              a10 = f10;
              break;
            case "type":
              o10 = f10;
              break;
            case "checked":
              s10 = f10;
              break;
            case "defaultChecked":
              c10 = f10;
              break;
            case "value":
              r10 = f10;
              break;
            case "defaultValue":
              i10 = f10;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (null != f10) throw Error(u(137, t10));
              break;
            default:
              co(e10, t10, l10, f10, n10, null);
          }
        }
        ty(e10, r10, i10, s10, c10, o10, a10, false);
        return;
      case "select":
        for (a10 in s2("invalid", e10), l10 = o10 = r10 = null, n10) if (n10.hasOwnProperty(a10) && null != (i10 = n10[a10])) switch (a10) {
          case "value":
            r10 = i10;
            break;
          case "defaultValue":
            o10 = i10;
            break;
          case "multiple":
            l10 = i10;
          default:
            co(e10, t10, a10, i10, n10, null);
        }
        t10 = r10, n10 = o10, e10.multiple = !!l10, null != t10 ? tw(e10, !!l10, t10, false) : null != n10 && tw(e10, !!l10, n10, true);
        return;
      case "textarea":
        for (o10 in s2("invalid", e10), r10 = a10 = l10 = null, n10) if (n10.hasOwnProperty(o10) && null != (i10 = n10[o10])) switch (o10) {
          case "value":
            l10 = i10;
            break;
          case "defaultValue":
            a10 = i10;
            break;
          case "children":
            r10 = i10;
            break;
          case "dangerouslySetInnerHTML":
            if (null != i10) throw Error(u(91));
            break;
          default:
            co(e10, t10, o10, i10, n10, null);
        }
        tk(e10, l10, a10, r10);
        return;
      case "option":
        for (s10 in n10) n10.hasOwnProperty(s10) && null != (l10 = n10[s10]) && ("selected" === s10 ? e10.selected = l10 && "function" != typeof l10 && "symbol" != typeof l10 : co(e10, t10, s10, l10, n10, null));
        return;
      case "dialog":
        s2("beforetoggle", e10), s2("toggle", e10), s2("cancel", e10), s2("close", e10);
        break;
      case "iframe":
      case "object":
        s2("load", e10);
        break;
      case "video":
      case "audio":
        for (l10 = 0; l10 < sZ.length; l10++) s2(sZ[l10], e10);
        break;
      case "image":
        s2("error", e10), s2("load", e10);
        break;
      case "details":
        s2("toggle", e10);
        break;
      case "embed":
      case "source":
      case "link":
        s2("error", e10), s2("load", e10);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (c10 in n10) if (n10.hasOwnProperty(c10) && null != (l10 = n10[c10])) switch (c10) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(u(137, t10));
          default:
            co(e10, t10, c10, l10, n10, null);
        }
        return;
      default:
        if (tN(t10)) {
          for (f10 in n10) n10.hasOwnProperty(f10) && void 0 !== (l10 = n10[f10]) && ci(e10, t10, f10, l10, n10, void 0);
          return;
        }
    }
    for (i10 in n10) n10.hasOwnProperty(i10) && null != (l10 = n10[i10]) && co(e10, t10, i10, l10, n10, null);
  }
  var cs = {};
  function cc(e10) {
    switch (e10) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  var cf = null, cd = null;
  function cp(e10) {
    return 9 === e10.nodeType ? e10 : e10.ownerDocument;
  }
  function cm(e10) {
    switch (e10) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ch(e10, t10) {
    if (0 === e10) switch (t10) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return 1 === e10 && "foreignObject" === t10 ? 0 : e10;
  }
  function cg(e10, t10) {
    return "textarea" === e10 || "noscript" === e10 || "string" == typeof t10.children || "number" == typeof t10.children || "bigint" == typeof t10.children || "object" == typeof t10.dangerouslySetInnerHTML && null !== t10.dangerouslySetInnerHTML && null != t10.dangerouslySetInnerHTML.__html;
  }
  var cv = null, cy = "function" == typeof setTimeout ? setTimeout : void 0, cb = "function" == typeof clearTimeout ? clearTimeout : void 0, cw = "function" == typeof Promise ? Promise : void 0, cS = "function" == typeof queueMicrotask ? queueMicrotask : void 0 !== cw ? function(e10) {
    return cw.resolve(null).then(e10).catch(ck);
  } : cy;
  function ck(e10) {
    setTimeout(function() {
      throw e10;
    });
  }
  function cE(e10) {
    return "head" === e10;
  }
  function c_(e10, t10) {
    var n10 = t10, r10 = 0;
    do {
      var l10 = n10.nextSibling;
      if (e10.removeChild(n10), l10 && 8 === l10.nodeType) if ("/$" === (n10 = l10.data) || "/&" === n10) {
        if (0 === r10) {
          e10.removeChild(l10), f6(t10);
          return;
        }
        r10--;
      } else if ("$" === n10 || "$?" === n10 || "$~" === n10 || "$!" === n10 || "&" === n10) r10++;
      else if ("html" === n10) c6(e10.ownerDocument.documentElement);
      else if ("head" === n10) {
        c6(n10 = e10.ownerDocument.head);
        for (var a10 = n10.firstChild; a10; ) {
          var o10 = a10.nextSibling, i10 = a10.nodeName;
          a10[e0] || "SCRIPT" === i10 || "STYLE" === i10 || "LINK" === i10 && "stylesheet" === a10.rel.toLowerCase() || n10.removeChild(a10), a10 = o10;
        }
      } else "body" === n10 && c6(e10.ownerDocument.body);
      n10 = l10;
    } while (n10);
    f6(t10);
  }
  function cx(e10, t10) {
    var n10 = e10;
    e10 = 0;
    do {
      var r10 = n10.nextSibling;
      if (1 === n10.nodeType ? t10 ? (n10._stashedDisplay = n10.style.display, n10.style.display = "none") : (n10.style.display = n10._stashedDisplay || "", "" === n10.getAttribute("style") && n10.removeAttribute("style")) : 3 === n10.nodeType && (t10 ? (n10._stashedText = n10.nodeValue, n10.nodeValue = "") : n10.nodeValue = n10._stashedText || ""), r10 && 8 === r10.nodeType) if ("/$" === (n10 = r10.data)) if (0 === e10) break;
      else e10--;
      else "$" !== n10 && "$?" !== n10 && "$~" !== n10 && "$!" !== n10 || e10++;
      n10 = r10;
    } while (n10);
  }
  function cP(e10, t10, n10) {
    if (t10 = CSS.escape(t10) !== t10 ? "r-" + btoa(t10).replace(/=/g, "") : t10, e10.style.viewTransitionName = t10, null != n10 && (e10.style.viewTransitionClass = n10), "inline" === (n10 = getComputedStyle(e10)).display) {
      if (1 === (t10 = e10.getClientRects()).length) var r10 = 1;
      else for (var l10 = r10 = 0; l10 < t10.length; l10++) {
        var a10 = t10[l10];
        0 < a10.width && 0 < a10.height && r10++;
      }
      1 === r10 && ((e10 = e10.style).display = 1 === t10.length ? "inline-block" : "block", e10.marginTop = "-" + n10.paddingTop, e10.marginBottom = "-" + n10.paddingBottom);
    }
  }
  function cN(e10, t10) {
    e10 = e10.style;
    var n10 = null != (t10 = t10.style) ? t10.hasOwnProperty("viewTransitionName") ? t10.viewTransitionName : t10.hasOwnProperty("view-transition-name") ? t10["view-transition-name"] : null : null;
    e10.viewTransitionName = null == n10 || "boolean" == typeof n10 ? "" : ("" + n10).trim(), n10 = null != t10 ? t10.hasOwnProperty("viewTransitionClass") ? t10.viewTransitionClass : t10.hasOwnProperty("view-transition-class") ? t10["view-transition-class"] : null : null, e10.viewTransitionClass = null == n10 || "boolean" == typeof n10 ? "" : ("" + n10).trim(), "inline-block" === e10.display && (null == t10 ? e10.display = e10.margin = "" : (n10 = t10.display, e10.display = null == n10 || "boolean" == typeof n10 ? "" : n10, null != (n10 = t10.margin) ? e10.margin = n10 : (n10 = t10.hasOwnProperty("marginTop") ? t10.marginTop : t10["margin-top"], e10.marginTop = null == n10 || "boolean" == typeof n10 ? "" : n10, t10 = t10.hasOwnProperty("marginBottom") ? t10.marginBottom : t10["margin-bottom"], e10.marginBottom = null == t10 || "boolean" == typeof t10 ? "" : t10)));
  }
  function cC(e10, t10, n10) {
    return n10 = n10.ownerDocument.defaultView, { rect: e10, abs: "absolute" === t10.position || "fixed" === t10.position, clip: "none" !== t10.clipPath || "visible" !== t10.overflow || "none" !== t10.filter || "none" !== t10.mask || "none" !== t10.mask || "0px" !== t10.borderRadius, view: 0 <= e10.bottom && 0 <= e10.right && e10.top <= n10.innerHeight && e10.left <= n10.innerWidth };
  }
  function cT(e10) {
    return cC(e10.getBoundingClientRect(), getComputedStyle(e10), e10);
  }
  function cO(e10) {
    var t10 = e10.getBoundingClientRect();
    return cC(t10 = new DOMRect(t10.x + 2e4, t10.y + 2e4, t10.width, t10.height), getComputedStyle(e10), e10);
  }
  function cz(e10) {
    this.addEventListener("load", e10), this.addEventListener("error", e10);
  }
  function cL(e10, t10) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e10 + "(" + t10 + ")";
  }
  function cR(e10) {
    return { name: e10, group: new cL("group", e10), imagePair: new cL("image-pair", e10), old: new cL("old", e10), new: new cL("new", e10) };
  }
  function cM(e10) {
    this._fragmentFiber = e10, this._observers = this._eventListeners = null;
  }
  function cI(e10, t10, n10, r10) {
    return g(e10).addEventListener(t10, n10, r10), false;
  }
  function cD(e10, t10, n10, r10) {
    return g(e10).removeEventListener(t10, n10, r10), false;
  }
  function cF(e10) {
    return null == e10 ? "0" : "boolean" == typeof e10 ? "c=" + (e10 ? "1" : "0") : "c=" + (e10.capture ? "1" : "0");
  }
  function cA(e10, t10, n10, r10) {
    if (0 === e10.length) return -1;
    r10 = cF(r10);
    for (var l10 = 0; l10 < e10.length; l10++) {
      var a10 = e10[l10];
      if (a10.type === t10 && a10.listener === n10 && cF(a10.optionsOrUseCapture) === r10) return l10;
    }
    return -1;
  }
  function cj(e10, t10) {
    return 6 !== e10.tag && (function(e11, t11) {
      function n10() {
        r10 = true;
      }
      if (e11.ownerDocument.activeElement === e11) return true;
      var r10 = false;
      try {
        e11.ownerDocument.addEventListener("focus", n10, true), (e11.focus || HTMLElement.prototype.focus).call(e11, t11);
      } finally {
        e11.ownerDocument.removeEventListener("focus", n10, true);
      }
      return r10;
    })(e10 = g(e10), t10);
  }
  function cU(e10, t10) {
    return t10.push(e10), false;
  }
  function cB(e10, t10) {
    return 6 !== e10.tag && !!((e10 = g(e10)) === t10 || e10.contains(t10)) && (t10.blur(), true);
  }
  function cV(e10, t10) {
    return 6 !== e10.tag && (e10 = g(e10), t10.observe(e10), false);
  }
  function cH(e10, t10) {
    return 6 !== e10.tag && (e10 = g(e10), t10.unobserve(e10), false);
  }
  function c$(e10, t10) {
    if (6 === e10.tag) {
      var n10 = (e10 = e10.stateNode).ownerDocument.createRange();
      n10.selectNodeContents(e10), t10.push.apply(t10, n10.getClientRects());
    } else e10 = g(e10), t10.push.apply(t10, e10.getClientRects());
    return false;
  }
  function cQ(e10, t10) {
    var n10 = e10.ownerDocument.createRange();
    n10.selectNodeContents(e10), e10 = n10.getBoundingClientRect(), window.scrollTo(window.scrollX + e10.left, t10 ? window.scrollY + e10.top : window.scrollY + e10.bottom - window.innerHeight);
  }
  function cW(e10, t10) {
    return cq(e10 = g(e10), t10), false;
  }
  function cq(e10, t10) {
    null == e10.reactFragments && (e10.reactFragments = /* @__PURE__ */ new Set()), e10.reactFragments.add(t10);
  }
  function cX(e10, t10) {
    if (3 !== e10.nodeType) {
      var n10 = t10._eventListeners;
      if (null !== n10) for (var r10 = 0; r10 < n10.length; r10++) {
        var l10 = n10[r10];
        e10.addEventListener(l10.type, l10.listener, l10.optionsOrUseCapture);
      }
      null !== t10._observers && t10._observers.forEach(function(t11) {
        t11.observe(e10);
      }), cq(e10, t10);
    }
  }
  function cK(e10) {
    var t10 = e10.firstChild;
    for (t10 && 10 === t10.nodeType && (t10 = t10.nextSibling); t10; ) {
      var n10 = t10;
      switch (t10 = t10.nextSibling, n10.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          cK(n10), e2(n10);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if ("stylesheet" === n10.rel.toLowerCase()) continue;
      }
      e10.removeChild(n10);
    }
  }
  function cG(e10, t10) {
    for (; 8 !== e10.nodeType; ) if ((1 !== e10.nodeType || "INPUT" !== e10.nodeName || "hidden" !== e10.type) && !t10 || null === (e10 = cZ(e10.nextSibling))) return null;
    return e10;
  }
  function cY(e10) {
    return "$?" === e10.data || "$~" === e10.data;
  }
  function cJ(e10) {
    return "$!" === e10.data || "$?" === e10.data && "loading" !== e10.ownerDocument.readyState;
  }
  function cZ(e10) {
    for (; null != e10; e10 = e10.nextSibling) {
      var t10 = e10.nodeType;
      if (1 === t10 || 3 === t10) break;
      if (8 === t10) {
        if ("$" === (t10 = e10.data) || "$!" === t10 || "$?" === t10 || "$~" === t10 || "&" === t10 || "F!" === t10 || "F" === t10) break;
        if ("/$" === t10 || "/&" === t10) return null;
      }
    }
    return e10;
  }
  cL.prototype.animate = function(e10, t10) {
    return (t10 = "number" == typeof t10 ? { duration: t10 } : _({}, t10)).pseudoElement = this._selector, this._scope.animate(e10, t10);
  }, cL.prototype.getAnimations = function() {
    for (var e10 = this._scope, t10 = this._selector, n10 = e10.getAnimations({ subtree: true }), r10 = [], l10 = 0; l10 < n10.length; l10++) {
      var a10 = n10[l10].effect;
      null !== a10 && a10.target === e10 && a10.pseudoElement === t10 && r10.push(n10[l10]);
    }
    return r10;
  }, cL.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  }, cM.prototype.addEventListener = function(e10, t10, n10) {
    null === this._eventListeners && (this._eventListeners = []);
    var r10 = this._eventListeners;
    -1 === cA(r10, e10, t10, n10) && (r10.push({ type: e10, listener: t10, optionsOrUseCapture: n10 }), m(this._fragmentFiber.child, false, cI, e10, t10, n10)), this._eventListeners = r10;
  }, cM.prototype.removeEventListener = function(e10, t10, n10) {
    var r10 = this._eventListeners;
    null != r10 && 0 < r10.length && (m(this._fragmentFiber.child, false, cD, e10, t10, n10), e10 = cA(r10, e10, t10, n10), null !== this._eventListeners && this._eventListeners.splice(e10, 1));
  }, cM.prototype.dispatchEvent = function(e10) {
    var t10 = h(this._fragmentFiber);
    if (null === t10) return true;
    t10 = g(t10);
    var n10 = this._eventListeners;
    if (null !== n10 && 0 < n10.length || !e10.bubbles) {
      var r10 = document.createTextNode("");
      if (n10) for (var l10 = 0; l10 < n10.length; l10++) {
        var a10 = n10[l10];
        r10.addEventListener(a10.type, a10.listener, a10.optionsOrUseCapture);
      }
      if (t10.appendChild(r10), e10 = r10.dispatchEvent(e10), n10) for (l10 = 0; l10 < n10.length; l10++) a10 = n10[l10], r10.removeEventListener(a10.type, a10.listener, a10.optionsOrUseCapture);
      return t10.removeChild(r10), e10;
    }
    return t10.dispatchEvent(e10);
  }, cM.prototype.focus = function(e10) {
    m(this._fragmentFiber.child, true, cj, e10, void 0, void 0);
  }, cM.prototype.focusLast = function(e10) {
    var t10 = [];
    m(this._fragmentFiber.child, true, cU, t10, void 0, void 0);
    for (var n10 = t10.length - 1; 0 <= n10 && !cj(t10[n10], e10); n10--) ;
  }, cM.prototype.blur = function() {
    var e10 = h(this._fragmentFiber);
    if (null !== e10) {
      var t10 = cp(e10 = g(e10)).activeElement;
      null !== t10 && e10.contains(t10) && m(this._fragmentFiber.child, false, cB, t10, void 0, void 0);
    }
  }, cM.prototype.observeUsing = function(e10) {
    null === this._observers && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e10), m(this._fragmentFiber.child, false, cV, e10, void 0, void 0);
  }, cM.prototype.unobserveUsing = function(e10) {
    var t10 = this._observers;
    null !== t10 && t10.has(e10) && (t10.delete(e10), m(this._fragmentFiber.child, false, cH, e10, void 0, void 0));
  }, cM.prototype.getClientRects = function() {
    var e10 = [];
    return m(this._fragmentFiber.child, false, c$, e10, void 0, void 0), e10;
  }, cM.prototype.getRootNode = function(e10) {
    var t10 = h(this._fragmentFiber);
    return null === t10 ? this : g(t10).getRootNode(e10);
  }, cM.prototype.compareDocumentPosition = function(e10) {
    var t10 = h(this._fragmentFiber);
    if (null === t10) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n10 = [];
    m(this._fragmentFiber.child, false, cU, n10, void 0, void 0);
    var r10 = g(t10);
    if (0 === n10.length) {
      n10 = this._fragmentFiber;
      var l10 = r10.compareDocumentPosition(e10);
      return t10 = l10, r10 === e10 ? t10 = Node.DOCUMENT_POSITION_CONTAINS : l10 & Node.DOCUMENT_POSITION_CONTAINED_BY && (m(n10.sibling, false, b), n10 = v, v = null, t10 = null === n10 ? Node.DOCUMENT_POSITION_PRECEDING : 0 === (e10 = g(n10).compareDocumentPosition(e10)) || e10 & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING), t10 | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t10 = g(n10[0]), l10 = g(n10[n10.length - 1]);
    for (var a10 = false, o10 = this._fragmentFiber.return; null !== o10 && (4 === o10.tag && (a10 = true), 3 !== o10.tag && 5 !== o10.tag); ) o10 = o10.return;
    if (null == (a10 = a10 ? t10.parentElement : r10)) return Node.DOCUMENT_POSITION_DISCONNECTED;
    r10 = a10.compareDocumentPosition(t10) & Node.DOCUMENT_POSITION_CONTAINED_BY, a10 = a10.compareDocumentPosition(l10) & Node.DOCUMENT_POSITION_CONTAINED_BY, o10 = t10.compareDocumentPosition(e10);
    var i10 = l10.compareDocumentPosition(e10), u10 = o10 & Node.DOCUMENT_POSITION_CONTAINED_BY || i10 & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return i10 = r10 && a10 && o10 & Node.DOCUMENT_POSITION_FOLLOWING && i10 & Node.DOCUMENT_POSITION_PRECEDING, (t10 = r10 && t10 === e10 || a10 && l10 === e10 || u10 || i10 ? Node.DOCUMENT_POSITION_CONTAINED_BY : (r10 || t10 !== e10) && (a10 || l10 !== e10) ? o10 : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC) & Node.DOCUMENT_POSITION_DISCONNECTED || t10 & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || (function(e11, t11, n11, r11, l11) {
      var a11 = e3(l11);
      if (e11 & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if (n11 = !!a11) e: {
          for (; null !== a11; ) {
            if (7 === a11.tag && (a11 === t11 || a11.alternate === t11)) {
              n11 = true;
              break e;
            }
            a11 = a11.return;
          }
          n11 = false;
        }
        return n11;
      }
      if (e11 & Node.DOCUMENT_POSITION_CONTAINS) {
        if (null === a11) return a11 = l11.ownerDocument, l11 === a11 || l11 === a11.body;
        e: {
          for (a11 = t11, t11 = h(t11); null !== a11; ) {
            if ((5 === a11.tag || 3 === a11.tag) && (a11 === t11 || a11.alternate === t11)) {
              a11 = true;
              break e;
            }
            a11 = a11.return;
          }
          a11 = false;
        }
        return a11;
      }
      return e11 & Node.DOCUMENT_POSITION_PRECEDING ? ((t11 = !!a11) && !(t11 = a11 === n11) && (null === (t11 = E(n11, a11, k)) ? t11 = false : (m(t11, true, w, a11, n11), a11 = v, v = null, t11 = null !== a11)), t11) : !!(e11 & Node.DOCUMENT_POSITION_FOLLOWING) && ((t11 = !!a11) && !(t11 = a11 === r11) && (null === (t11 = E(r11, a11, k)) ? t11 = false : (m(t11, true, S, a11, r11), a11 = v, y = v = null, t11 = null !== a11)), t11);
    })(t10, this._fragmentFiber, n10[0], n10[n10.length - 1], e10) ? t10 : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  }, cM.prototype.scrollIntoView = function(e10) {
    if ("object" == typeof e10) throw Error(u(566));
    var t10 = [];
    m(this._fragmentFiber.child, false, cU, t10, void 0, void 0);
    var n10 = false !== e10;
    if (0 === t10.length) {
      var r10 = this._fragmentFiber, l10 = [null, null], a10 = h(r10);
      if (null !== a10 && (function e11(t11, n11, r11) {
        for (var l11 = 3 < arguments.length && void 0 !== arguments[3] && arguments[3]; null !== r11; ) {
          if (r11 === n11) if (l11 = true, !r11.sibling) return true;
          else r11 = r11.sibling;
          if (5 === r11.tag || 6 === r11.tag) {
            if (l11) return t11[1] = r11, true;
            t11[0] = r11;
          } else if ((22 !== r11.tag || null === r11.memoizedState) && e11(t11, n11, r11.child, l11)) return true;
          r11 = r11.sibling;
        }
        return false;
      })(l10, r10, a10.child), null === (r10 = n10 ? l10[1] || l10[0] || h(this._fragmentFiber) : l10[0] || l10[1])) return;
      if (6 === r10.tag) return void cQ(e10 = g(r10), n10);
      if (9 !== (r10 = g(r10)).nodeType) {
        if (11 === r10.nodeType) {
          null !== (n10 = "host" in r10 ? r10.host : null) && n10.scrollIntoView(e10);
          return;
        }
        r10.scrollIntoView(e10);
      }
    }
    for (r10 = n10 ? t10.length - 1 : 0; r10 !== (n10 ? -1 : t10.length); ) 6 === (l10 = t10[r10]).tag ? cQ(l10 = g(l10), n10) : g(l10).scrollIntoView(e10), r10 += n10 ? -1 : 1;
  };
  var c0 = null;
  function c1(e10) {
    e10 = e10.nextSibling;
    for (var t10 = 0; e10; ) {
      if (8 === e10.nodeType) {
        var n10 = e10.data;
        if ("/$" === n10 || "/&" === n10) {
          if (0 === t10) return cZ(e10.nextSibling);
          t10--;
        } else "$" !== n10 && "$!" !== n10 && "$?" !== n10 && "$~" !== n10 && "&" !== n10 || t10++;
      }
      e10 = e10.nextSibling;
    }
    return null;
  }
  function c2(e10) {
    e10 = e10.previousSibling;
    for (var t10 = 0; e10; ) {
      if (8 === e10.nodeType) {
        var n10 = e10.data;
        if ("$" === n10 || "$!" === n10 || "$?" === n10 || "$~" === n10 || "&" === n10) {
          if (0 === t10) return e10;
          t10--;
        } else "/$" !== n10 && "/&" !== n10 || t10++;
      }
      e10 = e10.previousSibling;
    }
    return null;
  }
  function c3(e10, t10, n10) {
    switch (t10 = cp(n10), e10) {
      case "html":
        if (!(e10 = t10.documentElement)) throw Error(u(452));
        return e10;
      case "head":
        if (!(e10 = t10.head)) throw Error(u(453));
        return e10;
      case "body":
        if (!(e10 = t10.body)) throw Error(u(454));
        return e10;
      default:
        throw Error(u(451));
    }
  }
  function c4(e10, t10, n10) {
    for (var r10 in n10) {
      var l10 = n10[r10];
      n10.hasOwnProperty(r10) && null != l10 && co(e10, t10, r10, null, cs, l10);
    }
    null != n10.dangerouslySetInnerHTML && (e10.textContent = ""), e10.onclick === tz && (e10.onclick = null), e2(e10);
  }
  function c6(e10) {
    for (var t10 = e10.attributes; t10.length; ) e10.removeAttributeNode(t10[0]);
    e2(e10);
  }
  var c5 = /* @__PURE__ */ new Map(), c8 = /* @__PURE__ */ new Set();
  function c7(e10) {
    if ("function" == typeof e10.getRootNode) {
      var t10 = e10.getRootNode();
      if (9 === t10.nodeType || 11 === t10.nodeType) return t10;
    }
    return 9 === e10.nodeType ? e10 : e10.ownerDocument;
  }
  var c9 = X.d;
  X.d = { f: function() {
    var e10 = c9.f(), t10 = so();
    return e10 || t10;
  }, r: function(e10) {
    var t10 = e4(e10);
    null !== t10 && 5 === t10.tag && "form" === t10.type ? om(t10) : c9.r(e10);
  }, D: function(e10) {
    c9.D(e10), ft("dns-prefetch", e10, null);
  }, C: function(e10, t10) {
    c9.C(e10, t10), ft("preconnect", e10, t10);
  }, L: function(e10, t10, n10) {
    if (c9.L(e10, t10, n10), fe && e10 && t10) {
      var r10 = 'link[rel="preload"][as="' + tg(t10) + '"]';
      "image" === t10 && n10 && n10.imageSrcSet ? (r10 += '[imagesrcset="' + tg(n10.imageSrcSet) + '"]', "string" == typeof n10.imageSizes && (r10 += '[imagesizes="' + tg(n10.imageSizes) + '"]')) : r10 += '[href="' + tg(e10) + '"]';
      var l10 = r10;
      switch (t10) {
        case "style":
          l10 = fr(e10);
          break;
        case "script":
          l10 = fo(e10);
      }
      if (!(c5.has(l10) || (e10 = _({ rel: "preload", href: "image" === t10 && n10 && n10.imageSrcSet ? void 0 : e10, as: t10 }, n10), c5.set(l10, e10), null !== fe.querySelector(r10) || "style" === t10 && fe.querySelector(fl(l10)) || "script" === t10 && fe.querySelector(fi(l10))))) {
        var a10 = fe.createElement("link");
        cu(a10, "link", e10), "style" === t10 && (a10[e1] = true, a10.onload = a10.onerror = function() {
          e7(a10);
        }), e8(a10), fe.head.appendChild(a10);
      }
    }
  }, m: function(e10, t10) {
    if (c9.m(e10, t10), fe && e10) {
      var n10 = t10 && "string" == typeof t10.as ? t10.as : "script", r10 = 'link[rel="modulepreload"][as="' + tg(n10) + '"][href="' + tg(e10) + '"]', l10 = r10;
      switch (n10) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          l10 = fo(e10);
      }
      if (!c5.has(l10) && (e10 = _({ rel: "modulepreload", href: e10 }, t10), c5.set(l10, e10), null === fe.querySelector(r10))) {
        switch (n10) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (fe.querySelector(fi(l10))) return;
        }
        cu(n10 = fe.createElement("link"), "link", e10), e8(n10), fe.head.appendChild(n10);
      }
    }
  }, X: function(e10, t10) {
    if (c9.X(e10, t10), fe && e10) {
      var n10 = e5(fe).hoistableScripts, r10 = fo(e10), l10 = n10.get(r10);
      l10 || ((l10 = fe.querySelector(fi(r10))) || (e10 = _({ src: e10, async: true }, t10), (t10 = c5.get(r10)) && ff(e10, t10), e8(l10 = fe.createElement("script")), cu(l10, "link", e10), fe.head.appendChild(l10)), l10 = { type: "script", instance: l10, count: 1, state: null }, n10.set(r10, l10));
    }
  }, S: function(e10, t10, n10) {
    if (c9.S(e10, t10, n10), fe && e10) {
      var r10 = e5(fe).hoistableStyles, l10 = fr(e10);
      t10 = t10 || "default";
      var a10 = r10.get(l10);
      if (!a10) {
        var o10 = { loading: 0, preload: null };
        if (a10 = fe.querySelector(fl(l10))) o10.loading = 5;
        else {
          e10 = _({ rel: "stylesheet", href: e10, "data-precedence": t10 }, n10), (n10 = c5.get(l10)) && fc(e10, n10);
          var i10 = a10 = fe.createElement("link");
          e8(i10), cu(i10, "link", e10), i10._p = new Promise(function(e11, t11) {
            i10.onload = e11, i10.onerror = t11;
          }), i10.addEventListener("load", function() {
            o10.loading |= 1;
          }), i10.addEventListener("error", function() {
            o10.loading |= 2;
          }), o10.loading |= 4, fs(a10, t10, fe);
        }
        a10 = { type: "stylesheet", instance: a10, count: 1, state: o10 }, r10.set(l10, a10);
      }
    }
  }, M: function(e10, t10) {
    if (c9.M(e10, t10), fe && e10) {
      var n10 = e5(fe).hoistableScripts, r10 = fo(e10), l10 = n10.get(r10);
      l10 || ((l10 = fe.querySelector(fi(r10))) || (e10 = _({ src: e10, async: true, type: "module" }, t10), (t10 = c5.get(r10)) && ff(e10, t10), e8(l10 = fe.createElement("script")), cu(l10, "link", e10), fe.head.appendChild(l10)), l10 = { type: "script", instance: l10, count: 1, state: null }, n10.set(r10, l10));
    }
  } };
  var fe = "u" < typeof document ? null : document;
  function ft(e10, t10, n10) {
    if (fe && "string" == typeof t10 && t10) {
      var r10 = tg(t10);
      r10 = 'link[rel="' + e10 + '"][href="' + r10 + '"]', "string" == typeof n10 && (r10 += '[crossorigin="' + n10 + '"]'), c8.has(r10) || (c8.add(r10), e10 = { rel: e10, crossOrigin: n10, href: t10 }, null === fe.querySelector(r10) && (cu(t10 = fe.createElement("link"), "link", e10), e8(t10), fe.head.appendChild(t10)));
    }
  }
  function fn(e10, t10, n10, r10) {
    var l10 = (l10 = er.current) ? c7(l10) : null;
    if (!l10) throw Error(u(446));
    switch (e10) {
      case "meta":
      case "title":
        return null;
      case "style":
        return "string" == typeof n10.precedence && "string" == typeof n10.href ? (n10 = fr(n10.href), (r10 = (t10 = e5(l10).hoistableStyles).get(n10)) || (r10 = { type: "style", instance: null, count: 0, state: null }, t10.set(n10, r10)), r10) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if ("stylesheet" === n10.rel && "string" == typeof n10.href && "string" == typeof n10.precedence) {
          e10 = fr(n10.href);
          var a10 = e5(l10).hoistableStyles, o10 = a10.get(e10);
          if (o10 || (l10 = l10.ownerDocument || l10, o10 = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, a10.set(e10, o10), (a10 = l10.querySelector(fl(e10))) ? a10._p || (o10.instance = a10, o10.state.loading = 5) : ((a10 = c5.get(e10)) || (a10 = { rel: "preload", as: "style", href: n10.href, crossOrigin: n10.crossOrigin, integrity: n10.integrity, media: n10.media, hrefLang: n10.hrefLang, referrerPolicy: n10.referrerPolicy }, c5.set(e10, a10)), (function(e11, t11, n11, r11) {
            if (t11 = e11.querySelector('link[rel="preload"][as="style"][' + t11 + "]")) {
              if (true !== t11[e1]) {
                r11.loading = 1;
                return;
              }
            } else (t11 = e11.createElement("link"))[e1] = true, t11.onload = t11.onerror = e7.bind(null, t11), cu(t11, "link", n11), e8(t11), e11.head.appendChild(t11);
            r11.preload = t11, t11.addEventListener("load", function() {
              return r11.loading |= 1;
            }), t11.addEventListener("error", function() {
              return r11.loading |= 2;
            });
          })(l10, e10, a10, o10.state))), t10 && null === r10) throw Error(u(528, ""));
          return o10;
        }
        if (t10 && null !== r10) throw Error(u(529, ""));
        return null;
      case "script":
        return t10 = n10.async, "string" == typeof (n10 = n10.src) && t10 && "function" != typeof t10 && "symbol" != typeof t10 ? (n10 = fo(n10), (r10 = (t10 = e5(l10).hoistableScripts).get(n10)) || (r10 = { type: "script", instance: null, count: 0, state: null }, t10.set(n10, r10)), r10) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e10));
    }
  }
  function fr(e10) {
    return 'href="' + tg(e10) + '"';
  }
  function fl(e10) {
    return 'link[rel="stylesheet"][' + e10 + "]";
  }
  function fa(e10) {
    return _({}, e10, { "data-precedence": e10.precedence, precedence: null });
  }
  function fo(e10) {
    return '[src="' + tg(e10) + '"]';
  }
  function fi(e10) {
    return "script[async]" + e10;
  }
  function fu(e10, t10, n10) {
    if (t10.count++, null === t10.instance) switch (t10.type) {
      case "style":
        var r10 = e10.querySelector('style[data-href~="' + tg(n10.href) + '"]');
        if (r10) return t10.instance = r10, e8(r10), r10;
        var l10 = _({}, n10, { "data-href": n10.href, "data-precedence": n10.precedence, href: null, precedence: null });
        return e8(r10 = (e10.ownerDocument || e10).createElement("style")), cu(r10, "style", l10), fs(r10, n10.precedence, e10), t10.instance = r10;
      case "stylesheet":
        l10 = fr(n10.href);
        var a10 = e10.querySelector(fl(l10));
        if (a10) return t10.state.loading |= 4, t10.instance = a10, e8(a10), a10;
        r10 = fa(n10), (l10 = c5.get(l10)) && fc(r10, l10), e8(a10 = (e10.ownerDocument || e10).createElement("link"));
        var o10 = a10;
        return o10._p = new Promise(function(e11, t11) {
          o10.onload = e11, o10.onerror = t11;
        }), cu(a10, "link", r10), t10.state.loading |= 4, fs(a10, n10.precedence, e10), t10.instance = a10;
      case "script":
        if (a10 = fo(n10.src), l10 = e10.querySelector(fi(a10))) return t10.instance = l10, e8(l10), l10;
        return r10 = n10, (l10 = c5.get(a10)) && ff(r10 = _({}, n10), l10), e8(l10 = (e10 = e10.ownerDocument || e10).createElement("script")), cu(l10, "link", r10), e10.head.appendChild(l10), t10.instance = l10;
      case "void":
        return null;
      default:
        throw Error(u(443, t10.type));
    }
    return "stylesheet" === t10.type && 0 == (4 & t10.state.loading) && (r10 = t10.instance, t10.state.loading |= 4, fs(r10, n10.precedence, e10)), t10.instance;
  }
  function fs(e10, t10, n10) {
    for (var r10 = n10.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), l10 = r10.length ? r10[r10.length - 1] : null, a10 = l10, o10 = 0; o10 < r10.length; o10++) {
      var i10 = r10[o10];
      if (i10.dataset.precedence === t10) a10 = i10;
      else if (a10 !== l10) break;
    }
    a10 ? a10.parentNode.insertBefore(e10, a10.nextSibling) : (t10 = 9 === n10.nodeType ? n10.head : n10).insertBefore(e10, t10.firstChild);
  }
  function fc(e10, t10) {
    null == e10.crossOrigin && (e10.crossOrigin = t10.crossOrigin), null == e10.referrerPolicy && (e10.referrerPolicy = t10.referrerPolicy), null == e10.title && (e10.title = t10.title);
  }
  function ff(e10, t10) {
    null == e10.crossOrigin && (e10.crossOrigin = t10.crossOrigin), null == e10.referrerPolicy && (e10.referrerPolicy = t10.referrerPolicy), null == e10.integrity && (e10.integrity = t10.integrity);
  }
  var fd = null;
  function fp(e10, t10, n10) {
    if (null === fd) {
      var r10 = /* @__PURE__ */ new Map(), l10 = fd = /* @__PURE__ */ new Map();
      l10.set(n10, r10);
    } else (r10 = (l10 = fd).get(n10)) || (r10 = /* @__PURE__ */ new Map(), l10.set(n10, r10));
    if (r10.has(e10)) return r10;
    for (r10.set(e10, null), n10 = n10.getElementsByTagName(e10), l10 = 0; l10 < n10.length; l10++) {
      var a10 = n10[l10];
      if (!(a10[e0] || a10[eq] || "link" === e10 && "stylesheet" === a10.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== a10.namespaceURI) {
        var o10 = a10.getAttribute(t10) || "";
        o10 = e10 + o10;
        var i10 = r10.get(o10);
        i10 ? i10.push(a10) : r10.set(o10, [a10]);
      }
    }
    return r10;
  }
  function fm(e10, t10, n10) {
    (e10 = e10.ownerDocument || e10).head.insertBefore(n10, "title" === t10 ? e10.querySelector("head > title") : null);
  }
  function fh(e10, t10) {
    return "img" === e10 && null != t10.src && "" !== t10.src && null == t10.onLoad && "lazy" !== t10.loading;
  }
  function fg(e10) {
    return "stylesheet" !== e10.type || 0 != (3 & e10.state.loading);
  }
  function fv(e10) {
    return (e10.width || 100) * (e10.height || 100) * ("number" == typeof devicePixelRatio ? devicePixelRatio : 1) * 0.25;
  }
  function fy(e10, t10) {
    "function" == typeof t10.decode && (e10.imgCount++, t10.complete || (e10.imgBytes += fv(t10), e10.suspenseyImages.push(t10)), e10 = fk.bind(e10), t10.decode().then(e10, e10));
  }
  var fb = 0;
  function fw(e10) {
    if (0 === e10.count && (0 === e10.imgCount || !e10.waitingForImages)) {
      if (e10.stylesheets) f_(e10, e10.stylesheets);
      else if (e10.unsuspend) {
        var t10 = e10.unsuspend;
        e10.unsuspend = null, t10();
      }
    }
  }
  function fS() {
    this.count--, fw(this);
  }
  function fk() {
    this.imgCount--, fw(this);
  }
  var fE = null;
  function f_(e10, t10) {
    e10.stylesheets = null, null !== e10.unsuspend && (e10.count++, fE = /* @__PURE__ */ new Map(), t10.forEach(fx, e10), fE = null, fS.call(e10));
  }
  function fx(e10, t10) {
    if (!(4 & t10.state.loading)) {
      var n10 = fE.get(e10);
      if (n10) var r10 = n10.get(null);
      else {
        n10 = /* @__PURE__ */ new Map(), fE.set(e10, n10);
        for (var l10 = e10.querySelectorAll("link[data-precedence],style[data-precedence]"), a10 = 0; a10 < l10.length; a10++) {
          var o10 = l10[a10];
          ("LINK" === o10.nodeName || "not all" !== o10.getAttribute("media")) && (n10.set(o10.dataset.precedence, o10), r10 = o10);
        }
        r10 && n10.set(null, r10);
      }
      o10 = (l10 = t10.instance).getAttribute("data-precedence"), (a10 = n10.get(o10) || r10) === r10 && n10.set(null, l10), n10.set(o10, l10), this.count++, r10 = fS.bind(this), l10.addEventListener("load", r10), l10.addEventListener("error", r10), a10 ? a10.parentNode.insertBefore(l10, a10.nextSibling) : (e10 = 9 === e10.nodeType ? e10.head : e10).insertBefore(l10, e10.firstChild), t10.state.loading |= 4;
    }
  }
  var fP = { $$typeof: L, Provider: null, Consumer: null, _currentValue: K, _currentValue2: K, _threadCount: 0 };
  function fN(e10, t10, n10, r10, l10, a10, o10, i10, u10) {
    this.tag = 1, this.containerInfo = e10, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = eF(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = eF(0), this.hiddenUpdates = eF(null), this.identifierPrefix = r10, this.onUncaughtError = l10, this.onCaughtError = a10, this.onRecoverableError = o10, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = u10, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function fC(e10, t10, n10, r10, l10, a10, o10, i10, u10, s10, c10, f10) {
    return e10 = new fN(e10, t10, n10, o10, u10, s10, c10, f10, i10), t10 = 1, true === a10 && (t10 |= 24), a10 = rS(3, null, null, t10), e10.current = a10, a10.stateNode = e10, t10 = ld(), t10.refCount++, e10.pooledCache = t10, t10.refCount++, a10.memoizedState = { element: r10, isDehydrated: n10, cache: t10 }, lQ(a10), e10;
  }
  function fT(e10, t10, n10, r10, l10, a10) {
    l10 = l10 ? rb : rb, null === r10.context ? r10.context = l10 : r10.pendingContext = l10, (r10 = lq(t10)).payload = { element: n10 }, null !== (a10 = void 0 === a10 ? null : a10) && (r10.callback = a10), null !== (n10 = lX(e10, r10, t10)) && (sn(n10, e10, t10), lK(n10, e10, t10));
  }
  function fO(e10, t10) {
    if (null !== (e10 = e10.memoizedState) && null !== e10.dehydrated) {
      var n10 = e10.retryLane;
      e10.retryLane = 0 !== n10 && n10 < t10 ? n10 : t10;
    }
  }
  function fz(e10, t10) {
    fO(e10, t10), (e10 = e10.alternate) && fO(e10, t10);
  }
  function fL(e10) {
    if (13 === e10.tag || 31 === e10.tag) {
      var t10 = rg(e10, 67108864);
      null !== t10 && sn(t10, e10, 67108864), fz(e10, 67108864);
    }
  }
  function fR(e10) {
    if (13 === e10.tag || 31 === e10.tag) {
      var t10 = u9(), n10 = rg(e10, t10 = eV(t10));
      null !== n10 && sn(n10, e10, t10), fz(e10, t10);
    }
  }
  var fM = true;
  function fI(e10, t10, n10, r10) {
    var l10 = q.T;
    q.T = null;
    var a10 = X.p;
    try {
      X.p = 2, fF(e10, t10, n10, r10);
    } finally {
      X.p = a10, q.T = l10;
    }
  }
  function fD(e10, t10, n10, r10) {
    var l10 = q.T;
    q.T = null;
    var a10 = X.p;
    try {
      X.p = 8, fF(e10, t10, n10, r10);
    } finally {
      X.p = a10, q.T = l10;
    }
  }
  function fF(e10, t10, n10, r10) {
    if (fM) {
      var l10 = fA(r10);
      if (null === l10) s8(e10, t10, r10, fj, n10), fG(e10, r10);
      else if ((function(e11, t11, n11, r11, l11) {
        switch (t11) {
          case "focusin":
            return fH = fY(fH, e11, t11, n11, r11, l11), true;
          case "dragenter":
            return f$ = fY(f$, e11, t11, n11, r11, l11), true;
          case "mouseover":
            return fQ = fY(fQ, e11, t11, n11, r11, l11), true;
          case "pointerover":
            var a11 = l11.pointerId;
            return fW.set(a11, fY(fW.get(a11) || null, e11, t11, n11, r11, l11)), true;
          case "gotpointercapture":
            return a11 = l11.pointerId, fq.set(a11, fY(fq.get(a11) || null, e11, t11, n11, r11, l11)), true;
        }
        return false;
      })(l10, e10, t10, n10, r10)) r10.stopPropagation();
      else if (fG(e10, r10), 4 & t10 && -1 < fK.indexOf(e10)) {
        for (; null !== l10; ) {
          var a10 = e4(l10);
          if (null !== a10) switch (a10.tag) {
            case 3:
              if ((a10 = a10.stateNode).current.memoizedState.isDehydrated) {
                var o10 = eR(a10.pendingLanes);
                if (0 !== o10) {
                  var i10 = a10;
                  for (i10.pendingLanes |= 2, i10.entangledLanes |= 2; o10; ) {
                    var u10 = 1 << 31 - eN(o10);
                    i10.entanglements[1] |= u10, o10 &= ~u10;
                  }
                  sV(a10), 0 == (6 & uN) && (uX = ey() + 500, sH(0, false));
                }
              }
              break;
            case 31:
            case 13:
              null !== (i10 = rg(a10, 2)) && sn(i10, a10, 2), so(), fz(a10, 2);
          }
          if (null === (a10 = fA(r10)) && s8(e10, t10, r10, fj, n10), a10 === l10) break;
          l10 = a10;
        }
        null !== l10 && r10.stopPropagation();
      } else s8(e10, t10, r10, null, n10);
    }
  }
  function fA(e10) {
    return fU(e10 = tR(e10));
  }
  var fj = null;
  function fU(e10) {
    if (fj = null, null !== (e10 = e3(e10))) {
      var t10 = c(e10);
      if (null === t10) e10 = null;
      else {
        var n10 = t10.tag;
        if (13 === n10) {
          if (null !== (e10 = f(t10))) return e10;
          e10 = null;
        } else if (31 === n10) {
          if (null !== (e10 = d(t10))) return e10;
          e10 = null;
        } else if (3 === n10) {
          if (t10.stateNode.current.memoizedState.isDehydrated) return 3 === t10.tag ? t10.stateNode.containerInfo : null;
          e10 = null;
        } else t10 !== e10 && (e10 = null);
      }
    }
    return fj = e10, null;
  }
  function fB(e10) {
    switch (e10) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (eb()) {
          case ew:
            return 2;
          case eS:
            return 8;
          case ek:
          case eE:
            return 32;
          case e_:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var fV = false, fH = null, f$ = null, fQ = null, fW = /* @__PURE__ */ new Map(), fq = /* @__PURE__ */ new Map(), fX = [], fK = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function fG(e10, t10) {
    switch (e10) {
      case "focusin":
      case "focusout":
        fH = null;
        break;
      case "dragenter":
      case "dragleave":
        f$ = null;
        break;
      case "mouseover":
      case "mouseout":
        fQ = null;
        break;
      case "pointerover":
      case "pointerout":
        fW.delete(t10.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fq.delete(t10.pointerId);
    }
  }
  function fY(e10, t10, n10, r10, l10, a10) {
    return null === e10 || e10.nativeEvent !== a10 ? (e10 = { blockedOn: t10, domEventName: n10, eventSystemFlags: r10, nativeEvent: a10, targetContainers: [l10] }, null !== t10 && null !== (t10 = e4(t10)) && fL(t10)) : (e10.eventSystemFlags |= r10, t10 = e10.targetContainers, null !== l10 && -1 === t10.indexOf(l10) && t10.push(l10)), e10;
  }
  function fJ(e10) {
    var t10 = e3(e10.target);
    if (null !== t10) {
      var n10 = c(t10);
      if (null !== n10) {
        if (13 === (t10 = n10.tag)) {
          if (null !== (t10 = f(n10))) {
            e10.blockedOn = t10, eQ(e10.priority, function() {
              fR(n10);
            });
            return;
          }
        } else if (31 === t10) {
          if (null !== (t10 = d(n10))) {
            e10.blockedOn = t10, eQ(e10.priority, function() {
              fR(n10);
            });
            return;
          }
        } else if (3 === t10 && n10.stateNode.current.memoizedState.isDehydrated) {
          e10.blockedOn = 3 === n10.tag ? n10.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e10.blockedOn = null;
  }
  function fZ(e10) {
    if (null !== e10.blockedOn) return false;
    for (var t10 = e10.targetContainers; 0 < t10.length; ) {
      var n10 = fA(e10.nativeEvent);
      if (null !== n10) return null !== (t10 = e4(n10)) && fL(t10), e10.blockedOn = n10, false;
      var r10 = new (n10 = e10.nativeEvent).constructor(n10.type, n10);
      tL = r10, n10.target.dispatchEvent(r10), tL = null, t10.shift();
    }
    return true;
  }
  function f0(e10, t10, n10) {
    fZ(e10) && n10.delete(t10);
  }
  function f1() {
    fV = false, null !== fH && fZ(fH) && (fH = null), null !== f$ && fZ(f$) && (f$ = null), null !== fQ && fZ(fQ) && (fQ = null), fW.forEach(f0), fq.forEach(f0);
  }
  function f2(e10, t10) {
    e10.blockedOn === t10 && (e10.blockedOn = null, fV || (fV = true, a.unstable_scheduleCallback(a.unstable_NormalPriority, f1)));
  }
  var f3 = null;
  function f4(e10) {
    f3 !== e10 && (f3 = e10, a.unstable_scheduleCallback(a.unstable_NormalPriority, function() {
      f3 === e10 && (f3 = null);
      for (var t10 = 0; t10 < e10.length; t10 += 3) {
        var n10 = e10[t10], r10 = e10[t10 + 1], l10 = e10[t10 + 2];
        if ("function" != typeof r10) if (null === fU(r10 || n10)) continue;
        else break;
        var a10 = e4(n10);
        null !== a10 && (e10.splice(t10, 3), t10 -= 3, od(a10, { pending: true, data: l10, method: n10.method, action: r10 }, r10, l10));
      }
    }));
  }
  function f6(e10) {
    function t10(t11) {
      return f2(t11, e10);
    }
    null !== fH && f2(fH, e10), null !== f$ && f2(f$, e10), null !== fQ && f2(fQ, e10), fW.forEach(t10), fq.forEach(t10);
    for (var n10 = 0; n10 < fX.length; n10++) {
      var r10 = fX[n10];
      r10.blockedOn === e10 && (r10.blockedOn = null);
    }
    for (; 0 < fX.length && null === (n10 = fX[0]).blockedOn; ) fJ(n10), null === n10.blockedOn && fX.shift();
    if (null != (n10 = (e10.ownerDocument || e10).$$reactFormReplay)) for (r10 = 0; r10 < n10.length; r10 += 3) {
      var l10 = n10[r10], a10 = n10[r10 + 1], o10 = l10[eX] || null;
      if ("function" == typeof a10) o10 || f4(n10);
      else if (o10) {
        var i10 = null;
        if (a10 && a10.hasAttribute("formAction")) {
          if (l10 = a10, o10 = a10[eX] || null) i10 = o10.formAction;
          else if (null !== fU(l10)) continue;
        } else i10 = o10.action;
        "function" == typeof i10 ? n10[r10 + 1] = i10 : (n10.splice(r10, 3), r10 -= 3), f4(n10);
      }
    }
  }
  function f5() {
    function e10(e11) {
      e11.canIntercept && "react-transition" === e11.info && e11.intercept({ handler: function() {
        return new Promise(function(e12) {
          return l10 = e12;
        });
      }, focusReset: "manual", scroll: "manual" });
    }
    function t10() {
      null !== l10 && (l10(), l10 = null), r10 || setTimeout(n10, 20);
    }
    function n10() {
      if (!r10 && !navigation.transition) {
        var e11 = navigation.currentEntry;
        e11 && null != e11.url && navigation.navigate(e11.url, { state: e11.getState(), info: "react-transition", history: "replace" });
      }
    }
    if ("object" == typeof navigation) {
      var r10 = false, l10 = null;
      return navigation.addEventListener("navigate", e10), navigation.addEventListener("navigatesuccess", t10), navigation.addEventListener("navigateerror", t10), setTimeout(n10, 100), function() {
        r10 = true, navigation.removeEventListener("navigate", e10), navigation.removeEventListener("navigatesuccess", t10), navigation.removeEventListener("navigateerror", t10), null !== l10 && (l10(), l10 = null);
      };
    }
  }
  function f8(e10) {
    this._internalRoot = e10;
  }
  function f7(e10) {
    this._internalRoot = e10;
  }
  f7.prototype.render = f8.prototype.render = function(e10) {
    var t10 = this._internalRoot;
    if (null === t10) throw Error(u(409));
    fT(t10.current, u9(), e10, t10, null, null);
  }, f7.prototype.unmount = f8.prototype.unmount = function() {
    var e10 = this._internalRoot;
    if (null !== e10) {
      this._internalRoot = null;
      var t10 = e10.containerInfo;
      fT(e10.current, 2, null, e10, null, null), so(), t10[eK] = null;
    }
  }, f7.prototype.unstable_scheduleHydration = function(e10) {
    if (e10) {
      var t10 = e$();
      e10 = { blockedOn: null, target: e10, priority: t10 };
      for (var n10 = 0; n10 < fX.length && 0 !== t10 && t10 < fX[n10].priority; n10++) ;
      fX.splice(n10, 0, e10), 0 === n10 && fJ(e10);
    }
  };
  var f9 = o.version;
  if ("19.3.0-canary-cbb046ab-20260731" !== f9) throw Error(u(527, f9, "19.3.0-canary-cbb046ab-20260731"));
  if (X.findDOMNode = function(e10) {
    var t10 = e10._reactInternals;
    if (void 0 === t10) {
      if ("function" == typeof e10.render) throw Error(u(188));
      throw Error(u(268, e10 = Object.keys(e10).join(",")));
    }
    return null === (e10 = null !== (e10 = (function(e11) {
      var t11 = e11.alternate;
      if (!t11) {
        if (null === (t11 = c(e11))) throw Error(u(188));
        return t11 !== e11 ? null : e11;
      }
      for (var n10 = e11, r10 = t11; ; ) {
        var l10 = n10.return;
        if (null === l10) break;
        var a10 = l10.alternate;
        if (null === a10) {
          if (null !== (r10 = l10.return)) {
            n10 = r10;
            continue;
          }
          break;
        }
        if (l10.child === a10.child) {
          for (a10 = l10.child; a10; ) {
            if (a10 === n10) return p(l10), e11;
            if (a10 === r10) return p(l10), t11;
            a10 = a10.sibling;
          }
          throw Error(u(188));
        }
        if (n10.return !== r10.return) n10 = l10, r10 = a10;
        else {
          for (var o10 = false, i10 = l10.child; i10; ) {
            if (i10 === n10) {
              o10 = true, n10 = l10, r10 = a10;
              break;
            }
            if (i10 === r10) {
              o10 = true, r10 = l10, n10 = a10;
              break;
            }
            i10 = i10.sibling;
          }
          if (!o10) {
            for (i10 = a10.child; i10; ) {
              if (i10 === n10) {
                o10 = true, n10 = a10, r10 = l10;
                break;
              }
              if (i10 === r10) {
                o10 = true, r10 = a10, n10 = l10;
                break;
              }
              i10 = i10.sibling;
            }
            if (!o10) throw Error(u(189));
          }
        }
        if (n10.alternate !== r10) throw Error(u(190));
      }
      if (3 !== n10.tag) throw Error(u(188));
      return n10.stateNode.current === n10 ? e11 : t11;
    })(t10)) ? (function e11(t11) {
      var n10 = t11.tag;
      if (5 === n10 || 26 === n10 || 27 === n10 || 6 === n10) return t11;
      for (t11 = t11.child; null !== t11; ) {
        if (null !== (n10 = e11(t11))) return n10;
        t11 = t11.sibling;
      }
      return null;
    })(e10) : null) ? null : e10.stateNode;
  }, "u" > typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var de = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!de.isDisabled && de.supportsFiber) try {
      ex = de.inject({ bundleType: 0, version: "19.3.0-canary-cbb046ab-20260731", rendererPackageName: "react-dom", currentDispatcherRef: q, reconcilerVersion: "19.3.0-canary-cbb046ab-20260731" }), eP = de;
    } catch (e10) {
    }
  }
  n.createRoot = function(e10, t10) {
    if (!s(e10)) throw Error(u(299));
    var n10 = false, r10 = "", l10 = oI, a10 = oD, o10 = oF;
    return null != t10 && (true === t10.unstable_strictMode && (n10 = true), void 0 !== t10.identifierPrefix && (r10 = t10.identifierPrefix), void 0 !== t10.onUncaughtError && (l10 = t10.onUncaughtError), void 0 !== t10.onCaughtError && (a10 = t10.onCaughtError), void 0 !== t10.onRecoverableError && (o10 = t10.onRecoverableError)), t10 = fC(e10, 1, false, null, null, n10, r10, null, l10, a10, o10, f5), e10[eK] = t10.current, s6(e10), new f8(t10);
  }, n.hydrateRoot = function(e10, t10, n10) {
    if (!s(e10)) throw Error(u(299));
    var r10, l10 = false, a10 = "", o10 = oI, i10 = oD, c10 = oF, f10 = null;
    return null != n10 && (true === n10.unstable_strictMode && (l10 = true), void 0 !== n10.identifierPrefix && (a10 = n10.identifierPrefix), void 0 !== n10.onUncaughtError && (o10 = n10.onUncaughtError), void 0 !== n10.onCaughtError && (i10 = n10.onCaughtError), void 0 !== n10.onRecoverableError && (c10 = n10.onRecoverableError), void 0 !== n10.formState && (f10 = n10.formState)), (t10 = fC(e10, 1, true, t10, null != n10 ? n10 : null, l10, a10, f10, o10, i10, c10, f5)).context = (r10 = null, rb), n10 = t10.current, (a10 = lq(l10 = eV(l10 = u9()))).callback = null, lX(n10, a10, l10), n10 = l10, t10.current.lanes = n10, eA(t10, n10), sV(t10), e10[eK] = t10.current, s6(e10), new f7(t10);
  }, n.version = "19.3.0-canary-cbb046ab-20260731";
}, 88014, (e, t, n) => {
  "use strict";
  e.i(47167), !(function e2() {
    if ("u" > typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e2);
    } catch (e3) {
      console.error(e3);
    }
  })(), t.exports = e.r(46480);
}, 16565, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true });
  var r = { getObjectClassLabel: function() {
    return a;
  }, isPlainObject: function() {
    return o;
  } };
  for (var l in r) Object.defineProperty(n, l, { enumerable: true, get: r[l] });
  function a(e2) {
    return Object.prototype.toString.call(e2);
  }
  function o(e2) {
    if ("[object Object]" !== a(e2)) return false;
    let t2 = Object.getPrototypeOf(e2);
    return null === t2 || t2.hasOwnProperty("isPrototypeOf");
  }
}, 2023, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true });
  var r = { default: function() {
    return o;
  }, getProperError: function() {
    return i;
  } };
  for (var l in r) Object.defineProperty(n, l, { enumerable: true, get: r[l] });
  let a = e.r(16565);
  function o(e2) {
    return "object" == typeof e2 && null !== e2 && "name" in e2 && "message" in e2;
  }
  function i(e2) {
    let t2;
    return o(e2) ? e2 : Object.defineProperty(Error((0, a.isPlainObject)(e2) ? (t2 = /* @__PURE__ */ new WeakSet(), JSON.stringify(e2, (e3, n2) => {
      if ("object" == typeof n2 && null !== n2) {
        if (t2.has(n2)) return "[Circular]";
        t2.add(n2);
      }
      return n2;
    })) : e2 + ""), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
  }
}, 28279, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "reportGlobalError", { enumerable: true, get: function() {
    return r;
  } });
  let r = "function" == typeof reportError ? reportError : (e2) => {
    globalThis.console.error(e2);
  };
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 97238, (e, t, n) => {
  "use strict";
  e.i(47167), Object.defineProperty(n, "__esModule", { value: true });
  var r = { isRecoverableError: function() {
    return c;
  }, onRecoverableError: function() {
    return f;
  } };
  for (var l in r) Object.defineProperty(n, l, { enumerable: true, get: r[l] });
  let a = e.r(55682), o = e.r(32061), i = a._(e.r(2023)), u = e.r(28279), s = /* @__PURE__ */ new WeakSet();
  function c(e2) {
    return s.has(e2);
  }
  let f = (e2) => {
    let t2 = (0, i.default)(e2) && "cause" in e2 ? e2.cause : e2;
    (0, o.isBailoutToCSRError)(t2) || (0, u.reportGlobalError)(t2);
  };
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}, 62826, (e, t, n) => {
  if (e.i(47167), /(?:^|;\s)__vercel_toolbar=1(?:;|$)/.test(document.cookie)) {
    var r = document.createElement("script");
    r.src = "https://vercel.live/_next-live/feedback/feedback.js", r.setAttribute("data-explicit-opt-in", "true"), r.setAttribute("data-cookie-opt-in", "true"), r.setAttribute("data-deployment-id", "dpl_6EdX4zWxPgTptqXzwHmRLcWxreF7"), (document.head || document.documentElement).appendChild(r);
  }
}, 17742, (e) => {
  "use strict";
  e.i(47167);
  var t = e.i(69430);
  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || t.default.init("phc_cgNNpL9lqLK50jeJICAV6xcGZDmuDnuPVxPeG8Ieg6m", { api_host: "https://us.i.posthog.com", defaults: "2026-05-30", person_profiles: "identified_only" }), e.s([]);
}, 83793, (e, t, n) => {
  t.exports = [e.r(62826), e.f({ "private-next-instrumentation-client-user": { id: () => 17742, module: () => e.r(17742) } })("private-next-instrumentation-client-user")];
}, 5526, (e, t, n) => {
  "use strict";
  e.i(47167);
  {
    let n2 = e.r(83793);
    t.exports = Array.isArray(n2) ? n2 : [n2];
  }
}]);
