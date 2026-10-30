(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 2355, (t) => {
  "use strict";
  var e = t.i(47167), i = t.i(71645), s = t.i(18566);
  function o() {
    return "u" > typeof window;
  }
  function n() {
    return "production";
  }
  function r() {
    return "development" === ((o() ? window.vam : n()) || "production");
  }
  function l(t2) {
    return RegExp(`/${t2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=[/?#]|$)`);
  }
  function a(t2) {
    return t2.startsWith("http://") || t2.startsWith("https://") || t2.startsWith("/") ? t2 : `/${t2}`;
  }
  function h(t2) {
    return (0, i.useEffect)(() => {
      var e2;
      t2.beforeSend && (null == (e2 = window.va) || e2.call(window, "beforeSend", t2.beforeSend));
    }, [t2.beforeSend]), (0, i.useEffect)(() => {
      !(function(t3 = { debug: true }, e2) {
        var i2;
        if (!o()) return;
        let { beforeSend: s2, src: l2, dataset: h2 } = (function(t4, e3) {
          var i3, s3;
          let o2 = t4;
          if (e3) try {
            o2 = { ...null == (i3 = JSON.parse(e3)) ? void 0 : i3.analytics, ...t4 };
          } catch {
          }
          !(function(t5 = "auto") {
            if ("auto" === t5) {
              window.vam = n();
              return;
            }
            window.vam = t5;
          })(o2.mode);
          let l3 = { sdkn: "@vercel/analytics" + (o2.framework ? `/${o2.framework}` : ""), sdkv: "2.0.1" };
          return o2.disableAutoTrack && (l3.disableAutoTrack = "1"), o2.viewEndpoint && (l3.viewEndpoint = a(o2.viewEndpoint)), o2.eventEndpoint && (l3.eventEndpoint = a(o2.eventEndpoint)), o2.sessionEndpoint && (l3.sessionEndpoint = a(o2.sessionEndpoint)), r() && false === o2.debug && (l3.debug = "false"), o2.dsn && (l3.dsn = o2.dsn), o2.endpoint ? l3.endpoint = o2.endpoint : o2.basePath && (l3.endpoint = a(`${o2.basePath}/insights`)), { beforeSend: o2.beforeSend, src: (s3 = o2).scriptSrc ? a(s3.scriptSrc) : r() ? "https://va.vercel-scripts.com/v1/script.debug.js" : s3.basePath ? a(`${s3.basePath}/insights/script.js`) : "/_vercel/insights/script.js", dataset: l3 };
        })(t3, e2);
        if (window.va || (window.va = function(...t4) {
          window.vaq || (window.vaq = []), window.vaq.push(t4);
        }), s2 && (null == (i2 = window.va) || i2.call(window, "beforeSend", s2)), document.head.querySelector(`script[src*="${l2}"]`)) return;
        let c2 = document.createElement("script");
        for (let [t4, e3] of (c2.src = l2, Object.entries(h2))) c2.dataset[t4] = e3;
        c2.defer = true, c2.onerror = () => {
          let t4 = r() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
          console.log(`[Vercel Web Analytics] Failed to load script from ${l2}. ${t4}`);
        }, document.head.appendChild(c2);
      })({ framework: t2.framework || "react", basePath: t2.basePath ?? (function() {
        if (void 0 !== e.default && void 0 !== e.default.env) return e.default.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
      })(), ...void 0 !== t2.route && { disableAutoTrack: true }, ...t2 }, t2.configString ?? (function() {
        if (void 0 !== e.default && void 0 !== e.default.env) return e.default.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG;
      })());
    }, []), (0, i.useEffect)(() => {
      t2.route && t2.path && (function({ route: t3, path: e2 }) {
        var i2;
        null == (i2 = window.va) || i2.call(window, "pageview", { route: t3, path: e2 });
      })({ route: t2.route, path: t2.path });
    }, [t2.route, t2.path]), null;
  }
  function c(t2) {
    let o2, n2, r2, { route: a2, path: c2 } = (o2 = (0, s.useParams)(), n2 = (0, s.useSearchParams)(), r2 = (0, s.usePathname)(), o2 ? { route: (function(t3, e2) {
      if (!t3 || !e2) return t3;
      let i2 = t3;
      try {
        let t4 = Object.entries(e2);
        for (let [e3, s2] of t4) if (!Array.isArray(s2)) {
          let t5 = l(s2);
          t5.test(i2) && (i2 = i2.replace(t5, `/[${e3}]`));
        }
        for (let [e3, s2] of t4) if (Array.isArray(s2)) {
          let t5 = l(s2.join("/"));
          t5.test(i2) && (i2 = i2.replace(t5, `/[...${e3}]`));
        }
        return i2;
      } catch {
        return t3;
      }
    })(r2, Object.keys(o2).length ? o2 : Object.fromEntries(n2.entries())), path: r2 } : { route: null, path: r2 });
    return i.default.createElement(h, { path: c2, route: a2, ...t2, basePath: (function() {
      if (void 0 !== e.default && void 0 !== e.default.env) return e.default.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
    })(), configString: (function() {
      if (void 0 !== e.default && void 0 !== e.default.env) return '{"analytics":{"scriptSrc":"8b824500e8f61de5/script.js","viewEndpoint":"8b824500e8f61de5/view","eventEndpoint":"8b824500e8f61de5/event","sessionEndpoint":"8b824500e8f61de5/session"},"speedInsights":{"scriptSrc":"f4a28f18ebe8f21d/script.js","endpoint":"f4a28f18ebe8f21d/vitals"}}';
    })(), framework: "next" });
  }
  t.s(["Analytics", 0, function(t2) {
    return i.default.createElement(i.Suspense, { fallback: null }, i.default.createElement(c, { ...t2 }));
  }]);
}, 8745, (t) => {
  "use strict";
  var e = t.i(43476), i = t.i(22016), s = t.i(18566), o = t.i(31338), n = t.i(54749);
  t.s(["SiteFooter", 0, function() {
    let t2 = (0, s.usePathname)();
    return (0, n.isHomePath)(t2) || (0, n.isBarePath)(t2) ? null : (0, e.jsx)("footer", { className: "mx-auto mt-24 max-w-5xl border-t border-ink/10 px-4 py-8 text-sm text-ink-soft sm:px-6", children: (0, e.jsxs)("div", { className: "flex flex-wrap gap-x-6 gap-y-2", children: [(0, e.jsx)("a", { href: o.PERSON.socials.instagram, children: "Instagram" }), (0, e.jsx)("a", { href: o.PERSON.socials.youtube, children: "YouTube" }), (0, e.jsx)("a", { href: o.PERSON.socials.linkedin, children: "LinkedIn" }), (0, e.jsx)("a", { href: o.PERSON.socials.github, children: "GitHub" }), (0, e.jsx)("a", { href: `mailto:${o.PERSON.email}`, children: o.PERSON.email }), (0, e.jsx)(i.default, { href: "/blog/feed.xml", children: "RSS" }), (0, e.jsx)(i.default, { href: "/privacy", children: "Privacy" }), (0, e.jsx)(i.default, { href: "/developers", children: "Developers" }), (0, e.jsx)(i.default, { href: "/fitness", children: "Fitness" })] }) });
  }]);
}, 36852, (t) => {
  "use strict";
  var e = t.i(43476), i = t.i(22016), s = t.i(63209), o = t.i(32181), n = t.i(54749), r = t.i(18566), l = t.i(71645), a = t.i(31338), h = t.i(46698), c = t.i(4765), d = t.i(65785);
  let u = { tech: "Build", studio: "Brand", learn: "Learn" };
  function p({ world: t2, pathname: s2, push: o2 }) {
    return (0, e.jsx)("nav", { "aria-label": "Worlds", className: "world-nav", children: d.WORLD_IDS.map((n2) => (0, e.jsxs)("span", { className: "world-option", children: [(0, e.jsx)("span", { className: "mode-slash", "aria-hidden": "true", children: "/" }), (0, e.jsx)(i.default, { href: d.WORLDS[n2].href, className: "world-link", style: { "--world": d.WORLDS[n2].color, "--world-on": d.WORLDS[n2].on }, "aria-current": t2 === n2 ? "page" : void 0, onMouseEnter: () => {
      (0, d.setWorldState)({ preview: n2 }), (0, h.preloadWorld)(n2);
    }, onFocus: () => (0, h.preloadWorld)(n2), onMouseLeave: () => (0, d.setWorldState)({ preview: null }), onNavigate: (t3) => {
      s2 !== d.WORLDS[n2].href && (t3.preventDefault(), (0, h.openWorld)(n2, o2));
    }, children: u[n2] })] }, n2)) });
  }
  let m = { type: "spring", stiffness: 700, damping: 18 };
  function v() {
    return (0, e.jsxs)("span", { className: "site-wordmark", "aria-hidden": "true", children: [(0, e.jsxs)("span", { className: "wordmark-name", children: [(0, e.jsx)("span", { className: "wordmark-first", children: "Avi" }), (0, e.jsx)("span", { className: "wordmark-last", children: " Vashishta" }), "."] }), (0, e.jsx)("span", { className: "wordmark-name wordmark-line", children: "I build cool things with AI." })] });
  }
  t.s(["SiteHeader", 0, function() {
    let t2 = (0, n.useHomeEntrance)(), u2 = (0, r.usePathname)(), f = (0, r.useRouter)(), g = (0, c.useHomeMode)(), w = (0, n.isHomePath)(u2), S = (0, d.worldForPath)(u2);
    return ((0, l.useEffect)(() => {
      (0, d.setWorldState)({ page: S, chosen: null, preview: null }), (0, h.revealWorldTransition)(u2), (0, c.setHomeMode)("human");
    }, [u2, S]), (0, n.isHeaderlessPath)(u2)) ? null : (0, e.jsx)(s.MotionConfig, { reducedMotion: "user", children: (0, e.jsxs)(o.motion.header, { className: "site-header", "data-home": w ? "" : void 0, initial: !!w && { opacity: 0, visibility: "hidden" }, animate: { visibility: !w || t2 ? "visible" : "hidden", opacity: !w || t2 ? 1 : 0 }, transition: { duration: 0.6 * !(0, n.entranceIsImmediate)(), delay: w && t2 && !(0, n.entranceIsImmediate)() ? 0.2 : 0 }, children: [(0, e.jsxs)("div", { className: "site-left", "data-home": w ? "" : void 0, children: [w ? (0, e.jsx)(i.default, { href: "/", className: "site-mark", "aria-label": `${a.PERSON.name}, home`, onClick: () => window.dispatchEvent(new Event("home:reset")), children: (0, e.jsx)(v, {}) }) : (0, e.jsx)(i.default, { href: "/", className: "site-mark mark-short", "aria-label": `${a.PERSON.name}, home`, children: "Avi." }), (0, e.jsx)(p, { world: S, pathname: u2, push: (t3) => f.push(t3) })] }), (0, e.jsx)("div", { className: "mode-switch", "data-mode": g, "data-world": S ?? void 0, role: "group", "aria-label": "View this page as", style: S ? { "--world": d.WORLDS[S].color, "--world-on": d.WORLDS[S].on } : void 0, children: ["human", "agent"].map((t3, i2) => (0, e.jsxs)("span", { className: "mode-option", children: [i2 > 0 && (0, e.jsx)("span", { className: "mode-slash", "aria-hidden": "true", children: "/" }), (0, e.jsx)(o.motion.button, { type: "button", "aria-pressed": g === t3, whileTap: { scale: 0.9 }, transition: m, onClick: () => (0, c.setHomeMode)(t3), children: "human" === t3 ? "Human" : "Agent" })] }, t3)) })] }) });
  }]);
}, 37874, (t) => {
  "use strict";
  var e = t.i(43476), i = t.i(88653), s = t.i(18566), o = t.i(4765), n = t.i(54749), r = t.i(65785), l = t.i(37572);
  let a = { tech: "founder", studio: "brand", learn: "student" }, h = { tech: "build", studio: "brand", learn: "learn" };
  t.s(["PageModeSwap", 0, function({ children: t2 }) {
    let c = (0, s.usePathname)(), d = "agent" === (0, o.useHomeMode)() && !(0, n.isHomePath)(c), u = (0, r.worldForPath)(c), p = u ? a[u] : c.startsWith("/developers") ? "developer" : "curious";
    return (0, e.jsxs)(e.Fragment, { children: [(0, e.jsx)("div", { style: { display: d ? "none" : "contents" }, children: t2 }), (0, e.jsx)("div", { style: { "--from": `url("${u ? `/worlds/${h[u]}.webp` : "/home/sky-light.webp"}")` }, children: (0, e.jsx)(i.AnimatePresence, { children: d && (0, e.jsx)(l.AgentPage, { inline: true, initial: p }, "agent") }) })] });
  }]);
}, 63104, (t) => {
  "use strict";
  var e = t.i(43476), i = "1.3.26";
  function s(t2, e2, i2) {
    return Math.max(t2, Math.min(e2, i2));
  }
  var o = class {
    isRunning = false;
    value = 0;
    from = 0;
    to = 0;
    currentTime = 0;
    lerp;
    duration;
    easing;
    onUpdate;
    advance(t2) {
      if (!this.isRunning) return;
      let e2 = false;
      if (this.duration && this.easing) {
        this.currentTime += t2;
        let i3 = s(0, this.currentTime / this.duration, 1), o3 = (e2 = i3 >= 1) ? 1 : this.easing(i3);
        this.value = this.from + (this.to - this.from) * o3;
      } else if (this.lerp) {
        var i2, o2, n2, r2;
        this.value = (i2 = this.value, o2 = this.to, n2 = 60 * this.lerp, (1 - (r2 = 1 - Math.exp(-n2 * t2))) * i2 + r2 * o2), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, e2 = true);
      } else this.value = this.to, e2 = true;
      e2 && this.stop(), this.onUpdate?.(this.value, e2);
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t2, e2, { lerp: i2, duration: s2, easing: o2, onStart: n2, onUpdate: r2 }) {
      this.from = this.value = t2, this.to = e2, this.lerp = i2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, n2?.(), this.onUpdate = r2;
    }
  }, n = class {
    width = 0;
    height = 0;
    scrollHeight = 0;
    scrollWidth = 0;
    debouncedResize;
    wrapperResizeObserver;
    contentResizeObserver;
    constructor(t2, e2, { autoResize: i2 = true, debounce: s2 = 250 } = {}) {
      this.wrapper = t2, this.content = e2, i2 && (this.debouncedResize = /* @__PURE__ */ (function(t3, e3) {
        let i3;
        return function(...s3) {
          clearTimeout(i3), i3 = setTimeout(() => {
            i3 = void 0, t3.apply(this, s3);
          }, e3);
        };
      })(this.resize, s2), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
    }
    destroy() {
      this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
    }
    resize = () => {
      this.onWrapperResize(), this.onContentResize();
    };
    onWrapperResize = () => {
      this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    };
    onContentResize = () => {
      this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    };
    get limit() {
      return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
    }
  }, r = class {
    events = {};
    emit(t2, ...e2) {
      let i2 = this.events[t2] || [];
      for (let t3 = 0, s2 = i2.length; t3 < s2; t3++) i2[t3]?.(...e2);
    }
    on(t2, e2) {
      return this.events[t2] ? this.events[t2].push(e2) : this.events[t2] = [e2], () => {
        this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
      };
    }
    off(t2, e2) {
      this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
    }
    destroy() {
      this.events = {};
    }
  };
  let l = 100 / 6, a = { passive: false };
  function h(t2, e2) {
    return 1 === t2 ? l : 2 === t2 ? e2 : 1;
  }
  var c = class {
    touchStart = { x: 0, y: 0 };
    lastDelta = { x: 0, y: 0 };
    window = { width: 0, height: 0 };
    emitter = new r();
    constructor(t2, e2 = { wheelMultiplier: 1, touchMultiplier: 1 }) {
      this.element = t2, this.options = e2, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, a), this.element.addEventListener("touchstart", this.onTouchStart, a), this.element.addEventListener("touchmove", this.onTouchMove, a), this.element.addEventListener("touchend", this.onTouchEnd, a);
    }
    on(t2, e2) {
      return this.emitter.on(t2, e2);
    }
    destroy() {
      this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, a), this.element.removeEventListener("touchstart", this.onTouchStart, a), this.element.removeEventListener("touchmove", this.onTouchMove, a), this.element.removeEventListener("touchend", this.onTouchEnd, a);
    }
    onTouchStart = (t2) => {
      let { clientX: e2, clientY: i2 } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = e2, this.touchStart.y = i2, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    };
    onTouchMove = (t2) => {
      let { clientX: e2, clientY: i2 } = t2.targetTouches ? t2.targetTouches[0] : t2, s2 = -(e2 - this.touchStart.x) * this.options.touchMultiplier, o2 = -(i2 - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = e2, this.touchStart.y = i2, this.lastDelta = { x: s2, y: o2 }, this.emitter.emit("scroll", { deltaX: s2, deltaY: o2, event: t2 });
    };
    onTouchEnd = (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    };
    onWheel = (t2) => {
      let { deltaX: e2, deltaY: i2, deltaMode: s2 } = t2, o2 = h(s2, this.window.width), n2 = h(s2, this.window.height);
      e2 *= o2, i2 *= n2, e2 *= this.options.wheelMultiplier, i2 *= this.options.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e2, deltaY: i2, event: t2 });
    };
    onWindowResize = () => {
      this.window = { width: window.innerWidth, height: window.innerHeight };
    };
  };
  let d = (t2) => Math.min(1, 1.001 - 2 ** (-10 * t2));
  var u = class {
    _isScrolling = false;
    _isStopped = false;
    _isLocked = false;
    _preventNextNativeScrollEvent = false;
    _resetVelocityTimeout = null;
    _rafId = null;
    _isDraggingSelection = false;
    reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isTouching;
    isIos;
    time = 0;
    userData = {};
    lastVelocity = 0;
    velocity = 0;
    direction = 0;
    options;
    targetScroll;
    animatedScroll;
    animate = new o();
    emitter = new r();
    dimensions;
    virtualScroll;
    constructor({ wrapper: t2 = window, content: e2 = document.documentElement, eventsTarget: s2 = t2, smoothWheel: o2 = true, syncTouch: r2 = false, syncTouchLerp: l2 = 0.075, touchInertiaExponent: a2 = 1.7, duration: h2, easing: u2, lerp: p2 = 0.1, infinite: m2 = false, orientation: v2 = "vertical", gestureOrientation: f2 = "horizontal" === v2 ? "both" : "vertical", touchMultiplier: g = 1, wheelMultiplier: w = 1, autoResize: S = true, prevent: y, virtualScroll: b, overscroll: E = true, autoRaf: x = false, anchors: T = false, autoToggle: N = false, allowNestedScroll: R = false, __experimental__naiveDimensions: L = false, naiveDimensions: M = L, stopInertiaOnNavigate: A = false, respectReducedMotion: P = true } = {}) {
      window.lenisVersion = i, window.lenis || (window.lenis = {}), window.lenis.version = i, "horizontal" === v2 && (window.lenis.horizontal = true), true === r2 && (window.lenis.touch = true), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), t2 && t2 !== document.documentElement || (t2 = window), "number" == typeof h2 && "function" != typeof u2 ? u2 = d : "function" == typeof u2 && "number" != typeof h2 && (h2 = 1), this.options = { wrapper: t2, content: e2, eventsTarget: s2, smoothWheel: o2, syncTouch: r2, syncTouchLerp: l2, touchInertiaExponent: a2, duration: h2, easing: u2, lerp: p2, infinite: m2, gestureOrientation: f2, orientation: v2, touchMultiplier: g, wheelMultiplier: w, autoResize: S, prevent: y, virtualScroll: b, overscroll: E, autoRaf: x, anchors: T, autoToggle: N, allowNestedScroll: R, naiveDimensions: M, stopInertiaOnNavigate: A, respectReducedMotion: P }, this.dimensions = new n(t2, e2, { autoResize: S }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: true }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new c(s2, { touchMultiplier: g, wheelMultiplier: w }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
    }
    destroy() {
      this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: true }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
    }
    on(t2, e2) {
      return this.emitter.on(t2, e2);
    }
    off(t2, e2) {
      return this.emitter.off(t2, e2);
    }
    onScrollEnd = (t2) => {
      t2 instanceof CustomEvent || "smooth" !== this.isScrolling && false !== this.isScrolling || t2.stopPropagation();
    };
    dispatchScrollendEvent = () => {
      this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", { bubbles: this.options.wrapper === window, detail: { lenisScrollEnd: true } }));
    };
    get overflow() {
      let t2 = this.isHorizontal ? "overflow-x" : "overflow-y";
      return getComputedStyle(this.rootElement)[t2];
    }
    checkOverflow() {
      ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
    }
    onTransitionEnd = (t2) => {
      t2.propertyName?.includes("overflow") && t2.target === this.rootElement && this.checkOverflow();
    };
    setScroll(t2) {
      this.isHorizontal ? this.options.wrapper.scrollTo({ left: t2, behavior: "instant" }) : this.options.wrapper.scrollTo({ top: t2, behavior: "instant" });
    }
    onClick = (t2) => {
      let e2 = t2.composedPath().filter((t3) => t3 instanceof HTMLAnchorElement && t3.href).map((t3) => new URL(t3.href)), i2 = new URL(window.location.href);
      if (this.options.anchors) {
        let t3 = e2.find((t4) => i2.host === t4.host && i2.pathname === t4.pathname && t4.hash);
        if (t3) {
          let e3 = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0, i3 = decodeURIComponent(t3.hash);
          this.scrollTo(i3, e3);
          return;
        }
      }
      if (this.options.stopInertiaOnNavigate && e2.some((t3) => i2.host === t3.host && i2.pathname !== t3.pathname)) return void this.reset();
    };
    onPointerDown = (t2) => {
      1 === t2.button && this.reset();
    };
    isTouchOnSelectionHandle(t2) {
      let e2 = window.getSelection();
      if (!e2 || e2.isCollapsed || 0 === e2.rangeCount) return false;
      let i2 = t2.targetTouches[0] ?? t2.changedTouches[0];
      if (!i2) return false;
      let s2 = e2.getRangeAt(0).getClientRects();
      if (0 === s2.length) return false;
      let o2 = s2[0], n2 = s2[s2.length - 1], r2 = 40 >= Math.hypot(i2.clientX - o2.left, i2.clientY - o2.top), l2 = 40 >= Math.hypot(i2.clientX - n2.right, i2.clientY - n2.bottom);
      return r2 || l2;
    }
    onVirtualScroll = (t2) => {
      if ("function" == typeof this.options.virtualScroll && false === this.options.virtualScroll(t2)) return;
      let { deltaX: e2, deltaY: i2, event: s2 } = t2;
      if (this.emitter.emit("virtual-scroll", { deltaX: e2, deltaY: i2, event: s2 }), s2.ctrlKey || s2.lenisStopPropagation) return;
      let o2 = s2.type.includes("touch"), n2 = s2.type.includes("wheel");
      if (o2 && this.isIos && ("touchstart" === s2.type && (this._isDraggingSelection = this.isTouchOnSelectionHandle(s2)), this._isDraggingSelection)) {
        "touchend" === s2.type && (this._isDraggingSelection = false);
        return;
      }
      this.isTouching = "touchstart" === s2.type || "touchmove" === s2.type;
      let r2 = 0 === e2 && 0 === i2;
      if (this.options.syncTouch && o2 && "touchstart" === s2.type && r2 && !this.isStopped && !this.isLocked) return void this.reset();
      let l2 = "vertical" === this.options.gestureOrientation && 0 === i2 || "horizontal" === this.options.gestureOrientation && 0 === e2;
      if (r2 || l2) return;
      let a2 = s2.composedPath();
      a2 = a2.slice(0, a2.indexOf(this.rootElement));
      let h2 = this.options.prevent, c2 = Math.abs(e2) >= Math.abs(i2) ? "horizontal" : "vertical";
      if (a2.find((t3) => t3 instanceof HTMLElement && ("function" == typeof h2 && h2?.(t3) || t3.hasAttribute?.("data-lenis-prevent") || "vertical" === c2 && t3.hasAttribute?.("data-lenis-prevent-vertical") || "horizontal" === c2 && t3.hasAttribute?.("data-lenis-prevent-horizontal") || o2 && t3.hasAttribute?.("data-lenis-prevent-touch") || n2 && t3.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(t3, { deltaX: e2, deltaY: i2 })))) return;
      if (this.isStopped || this.isLocked) {
        s2.cancelable && s2.preventDefault();
        return;
      }
      if (!(this.options.syncTouch && o2 || this.options.smoothWheel && n2)) {
        this.isScrolling = "native", this.animate.stop(), s2.lenisStopPropagation = true;
        return;
      }
      let d2 = i2;
      "both" === this.options.gestureOrientation ? d2 = Math.abs(i2) > Math.abs(e2) ? i2 : e2 : "horizontal" === this.options.gestureOrientation && (d2 = e2), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i2 > 0 || this.animatedScroll === this.limit && i2 < 0)) && (s2.lenisStopPropagation = true), s2.cancelable && s2.preventDefault();
      let u2 = o2 && this.options.syncTouch, p2 = o2 && "touchend" === s2.type;
      p2 && (d2 = Math.sign(d2) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + d2, { programmatic: false, ...u2 ? { lerp: p2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing } });
    };
    resize() {
      this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    onNativeScroll = () => {
      if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
        this._preventNextNativeScrollEvent = false;
        return;
      }
      if (false === this.isScrolling || "native" === this.isScrolling) {
        let t2 = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t2, this.direction = Math.sign(this.animatedScroll - t2), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
        }, 400));
      }
    };
    reset() {
      this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
    }
    start() {
      if (this.isStopped) {
        if (this.options.autoToggle) return void this.rootElement.style.removeProperty("overflow");
        this.internalStart();
      }
    }
    internalStart() {
      this.isStopped && (this.reset(), this.isStopped = false, this.emit());
    }
    stop() {
      if (!this.isStopped) {
        if (this.options.autoToggle) return void this.rootElement.style.setProperty("overflow", "clip");
        this.internalStop();
      }
    }
    internalStop() {
      this.isStopped || (this.reset(), this.isStopped = true, this.emit());
    }
    raf = (t2) => {
      let e2 = t2 - (this.time || t2);
      this.time = t2, this.animate.advance(1e-3 * e2), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
    };
    scrollTo(t2, { offset: e2 = 0, immediate: i2 = false, lock: o2 = false, programmatic: n2 = true, lerp: r2 = n2 ? this.options.lerp : void 0, duration: l2 = n2 ? this.options.duration : void 0, easing: a2 = n2 ? this.options.easing : void 0, onStart: h2, onComplete: c2, force: u2 = false, userData: p2 } = {}) {
      if (this.prefersReducedMotion && (n2 ? i2 = true : (r2 = 1, l2 = void 0, a2 = void 0)), (this.isStopped || this.isLocked) && !u2) return;
      let m2 = t2, v2 = e2;
      if ("string" == typeof m2 && ["top", "left", "start", "#"].includes(m2)) m2 = 0;
      else if ("string" == typeof m2 && ["bottom", "right", "end"].includes(m2)) m2 = this.limit;
      else {
        let t3 = null;
        if ("string" == typeof m2 ? (t3 = m2.startsWith("#") ? document.getElementById(m2.slice(1)) : document.querySelector(m2)) || ("#top" === m2 ? m2 = 0 : console.warn("Lenis: Target not found", m2)) : m2 instanceof HTMLElement && m2?.nodeType && (t3 = m2), t3) {
          if (this.options.wrapper !== window) {
            let t4 = this.rootElement.getBoundingClientRect();
            v2 -= this.isHorizontal ? t4.left : t4.top;
          }
          let e3 = t3.getBoundingClientRect(), i3 = getComputedStyle(t3), s2 = this.isHorizontal ? Number.parseFloat(i3.scrollMarginLeft) : Number.parseFloat(i3.scrollMarginTop), o3 = getComputedStyle(this.rootElement), n3 = this.isHorizontal ? Number.parseFloat(o3.scrollPaddingLeft) : Number.parseFloat(o3.scrollPaddingTop);
          m2 = (this.isHorizontal ? e3.left : e3.top) + this.animatedScroll - (Number.isNaN(s2) ? 0 : s2) - (Number.isNaN(n3) ? 0 : n3);
        }
      }
      if ("number" == typeof m2) {
        if (m2 += v2, this.options.infinite) {
          if (n2) {
            this.targetScroll = this.animatedScroll = this.scroll;
            let t3 = m2 - this.animatedScroll;
            t3 > this.limit / 2 ? m2 -= this.limit : t3 < -this.limit / 2 && (m2 += this.limit);
          }
        } else m2 = s(0, m2, this.limit);
        if (m2 === this.targetScroll) {
          h2?.(this), c2?.(this);
          return;
        }
        if (this.userData = p2 ?? {}, i2) {
          this.animatedScroll = this.targetScroll = m2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), c2?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          });
          return;
        }
        n2 || (this.targetScroll = m2), "number" == typeof l2 && "function" != typeof a2 ? a2 = d : "function" == typeof a2 && "number" != typeof l2 && (l2 = 1), this.animate.fromTo(this.animatedScroll, m2, { duration: l2, easing: a2, lerp: r2, onStart: () => {
          o2 && (this.isLocked = true), this.isScrolling = "smooth", h2?.(this);
        }, onUpdate: (t3, e3) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), n2 && (this.targetScroll = t3), e3 || this.emit(), e3 && (this.reset(), this.emit(), c2?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        } });
      }
    }
    preventNextNativeScrollEvent() {
      this._preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
        this._preventNextNativeScrollEvent = false;
      });
    }
    hasNestedScroll(t2, { deltaX: e2, deltaY: i2 }) {
      let s2, o2, n2, r2, l2, a2, h2, c2, d2, u2, p2, m2, v2, f2, g, w, S = Date.now();
      t2._lenis || (t2._lenis = {});
      let y = t2._lenis;
      if (S - (y.time ?? 0) > 2e3) {
        y.time = Date.now();
        let e3 = window.getComputedStyle(t2);
        if (y.computedStyle = e3, s2 = ["auto", "overlay", "scroll"].includes(e3.overflowX), o2 = ["auto", "overlay", "scroll"].includes(e3.overflowY), l2 = ["auto"].includes(e3.overscrollBehaviorX), a2 = ["auto"].includes(e3.overscrollBehaviorY), y.hasOverflowX = s2, y.hasOverflowY = o2, !(s2 || o2)) return false;
        h2 = t2.scrollWidth, c2 = t2.scrollHeight, d2 = t2.clientWidth, u2 = t2.clientHeight, n2 = h2 > d2, r2 = c2 > u2, y.isScrollableX = n2, y.isScrollableY = r2, y.scrollWidth = h2, y.scrollHeight = c2, y.clientWidth = d2, y.clientHeight = u2, y.hasOverscrollBehaviorX = l2, y.hasOverscrollBehaviorY = a2;
      } else n2 = y.isScrollableX, r2 = y.isScrollableY, s2 = y.hasOverflowX, o2 = y.hasOverflowY, h2 = y.scrollWidth, c2 = y.scrollHeight, d2 = y.clientWidth, u2 = y.clientHeight, l2 = y.hasOverscrollBehaviorX, a2 = y.hasOverscrollBehaviorY;
      if (!(s2 && n2 || o2 && r2)) return false;
      let b = Math.abs(e2) >= Math.abs(i2) ? "horizontal" : "vertical";
      if ("horizontal" === b) p2 = Math.round(t2.scrollLeft), m2 = h2 - d2, v2 = e2, f2 = s2, g = n2, w = l2;
      else {
        if ("vertical" !== b) return false;
        p2 = Math.round(t2.scrollTop), m2 = c2 - u2, v2 = i2, f2 = o2, g = r2, w = a2;
      }
      return !w && (p2 >= m2 || p2 <= 0) || (v2 > 0 ? p2 < m2 : p2 > 0) && f2 && g;
    }
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    get limit() {
      return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      let t2 = this.options.wrapper;
      return this.isHorizontal ? t2.scrollX ?? t2.scrollLeft : t2.scrollY ?? t2.scrollTop;
    }
    get scroll() {
      var t2;
      return this.options.infinite ? (this.animatedScroll % (t2 = this.limit) + t2) % t2 : this.animatedScroll;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isScrolling() {
      return this._isScrolling;
    }
    set isScrolling(t2) {
      this._isScrolling !== t2 && (this._isScrolling = t2, this.updateClassName());
    }
    get isStopped() {
      return this._isStopped;
    }
    set isStopped(t2) {
      this._isStopped !== t2 && (this._isStopped = t2, this.updateClassName());
    }
    get isLocked() {
      return this._isLocked;
    }
    set isLocked(t2) {
      this._isLocked !== t2 && (this._isLocked = t2, this.updateClassName());
    }
    get isSmooth() {
      return "smooth" === this.isScrolling;
    }
    get prefersReducedMotion() {
      return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches;
    }
    get className() {
      let t2 = "lenis";
      return this.options.autoToggle && (t2 += " lenis-autoToggle"), this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), "smooth" === this.isScrolling && (t2 += " lenis-smooth"), t2;
    }
    updateClassName() {
      this.cleanUpClassName(), this.className.split(" ").forEach((t2) => {
        this.rootElement.classList.add(t2);
      });
    }
    cleanUpClassName() {
      for (let t2 of Array.from(this.rootElement.classList)) ("lenis" === t2 || t2.startsWith("lenis-")) && this.rootElement.classList.remove(t2);
    }
  }, p = t.i(18566), m = t.i(71645);
  function v(t2) {
    let e2 = t2.match(/^([^\d]*)([\d,]*\.?\d+)([\s\S]*)$/);
    if (!e2) return null;
    let i2 = e2[2];
    return { prefix: e2[1], value: parseFloat(i2.replace(/,/g, "")), decimals: (i2.split(".")[1] ?? "").length, commas: i2.includes(","), suffix: e2[3] };
  }
  function f(t2, e2) {
    let i2 = e2.commas ? t2.toLocaleString("en-US", { minimumFractionDigits: e2.decimals, maximumFractionDigits: e2.decimals }) : t2.toFixed(e2.decimals);
    return e2.prefix + i2 + e2.suffix;
  }
  t.s(["MotionSystem", 0, function() {
    let t2 = (0, p.usePathname)(), i2 = (0, m.useRef)(null), s2 = (0, m.useRef)(null);
    return (0, m.useEffect)(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
      let t3 = new u({ autoRaf: true, lerp: 0.085, allowNestedScroll: true, stopInertiaOnNavigate: true, prevent: (t4) => !!t4.closest("[data-lenis-prevent]") });
      return i2.current = t3, window.__lenis = t3, () => {
        t3.destroy(), i2.current = null;
      };
    }, []), (0, m.useEffect)(() => {
      i2.current?.scrollTo(0, { immediate: true, force: true }), i2.current?.resize();
    }, [t2]), (0, m.useEffect)(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let t3 = /* @__PURE__ */ new WeakSet(), e2 = new IntersectionObserver((t4) => {
        for (let i4 of t4) i4.isIntersecting && (i4.target.setAttribute("data-inview", ""), e2.unobserve(i4.target), i4.target.hasAttribute("data-count") && (function(t5) {
          let e3 = t5.dataset.countTo ?? t5.textContent ?? "", i5 = v(e3.trim());
          if (!i5) return;
          let s4 = performance.now();
          setTimeout(() => {
            t5.textContent = e3;
          }, 1700);
          let o2 = (n2) => {
            let r2 = Math.min(1, (n2 - s4) / 1300), l2 = 1 - Math.pow(1 - r2, 4);
            (t5.textContent !== e3 || !(r2 >= 1)) && (t5.textContent = r2 < 1 ? f(i5.value * l2, i5) : e3, r2 < 1 && requestAnimationFrame(o2));
          };
          requestAnimationFrame(o2);
        })(i4.target));
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }), i3 = () => {
        document.querySelectorAll("[data-reveal]:not([data-inview]), [data-count]:not([data-inview])").forEach((i4) => {
          var s4;
          let o2, n2;
          t3.has(i4) || (t3.add(i4), i4.hasAttribute("data-count") && ((n2 = v((o2 = (s4 = i4).dataset.countTo ?? s4.textContent ?? "").trim())) ? (s4.dataset.countTo = o2, s4.style.minWidth = `${s4.getBoundingClientRect().width}px`, s4.getBoundingClientRect().top > innerHeight && (s4.textContent = f(0, n2))) : s4.removeAttribute("data-count")), e2.observe(i4));
        });
      };
      i3();
      let s3 = new MutationObserver(() => i3());
      return s3.observe(document.body, { childList: true, subtree: true }), () => {
        e2.disconnect(), s3.disconnect(), document.querySelectorAll("[data-count-to]:not([data-inview])").forEach((t4) => {
          t4.textContent = t4.dataset.countTo ?? t4.textContent;
        });
      };
    }, [t2]), (0, m.useEffect)(() => {
      let t3 = document.documentElement, e2 = document.querySelector(".site-header"), i3 = scrollY, s3 = 0, o2 = () => {
        s3 = 0;
        let o3 = scrollY, n3 = Math.max(1, t3.scrollHeight - innerHeight);
        if (t3.style.setProperty("--progress", (o3 / n3).toFixed(4)), document.querySelectorAll("[data-world-hero]").forEach((t4) => {
          let e3 = t4.getBoundingClientRect();
          t4.style.setProperty("--hero-p", Math.min(1, Math.max(0, -e3.top / Math.max(1, e3.height))).toFixed(4));
        }), document.querySelectorAll("[data-scroll-track]").forEach((t4) => {
          let e3 = t4.getBoundingClientRect(), i4 = (innerHeight - e3.top) / (innerHeight + e3.height);
          t4.style.setProperty("--scroll-p", Math.min(1, Math.max(0, i4)).toFixed(4));
        }), document.querySelectorAll("[data-stack]").forEach((t4) => {
          let e3 = [...t4.children];
          e3.forEach((t5, i4) => {
            let s4 = e3[i4 + 1];
            if (!s4) return;
            let o4 = t5.getBoundingClientRect(), n4 = s4.getBoundingClientRect();
            t5.style.setProperty("--cover", Math.min(1, Math.max(0, 1 - (n4.top - o4.top) / Math.max(1, o4.height))).toFixed(4));
          });
        }), e2 && !t3.classList.contains("world-transition-active")) {
          let t4 = o3 > i3 + 2, s4 = o3 < i3 - 2;
          o3 < 120 || s4 ? e2.removeAttribute("data-hidden") : t4 && e2.setAttribute("data-hidden", ""), e2.toggleAttribute("data-scrolled", o3 > 8);
        }
        i3 = o3;
      }, n2 = () => {
        s3 || (s3 = requestAnimationFrame(o2));
      };
      return o2(), addEventListener("scroll", n2, { passive: true }), addEventListener("resize", n2), () => {
        removeEventListener("scroll", n2), removeEventListener("resize", n2), cancelAnimationFrame(s3);
      };
    }, [t2]), (0, m.useEffect)(() => {
      if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let t3 = s2.current, e2 = null, i3 = -100, o2 = -100, n2 = -100, r2 = -100, l2 = 0, a2 = () => {
        i3 += (n2 - i3) * 0.22, o2 += (r2 - o2) * 0.22, t3.style.transform = `translate3d(${i3}px, ${o2}px, 0)`, l2 = Math.abs(n2 - i3) + Math.abs(r2 - o2) > 0.3 ? requestAnimationFrame(a2) : 0;
      }, h2 = (i4) => {
        n2 = i4.clientX, r2 = i4.clientY, l2 || (l2 = requestAnimationFrame(a2));
        let s3 = i4.target instanceof Element ? i4.target : null, o3 = s3?.closest("[data-cursor]");
        o3 ? (t3.textContent = o3.dataset.cursor ?? "", t3.dataset.on = "") : delete t3.dataset.on;
        let h3 = s3?.closest("[data-magnetic]") ?? null;
        if (e2 && e2 !== h3 && (e2.style.translate = ""), e2 = h3, h3) {
          let t4 = h3.getBoundingClientRect(), e3 = (i4.clientX - (t4.left + t4.width / 2)) / t4.width, s4 = (i4.clientY - (t4.top + t4.height / 2)) / t4.height;
          h3.style.translate = `${(8 * e3).toFixed(1)}px ${(6 * s4).toFixed(1)}px`;
        }
      }, c2 = () => {
        delete t3.dataset.on, e2 && (e2.style.translate = ""), e2 = null;
      };
      return addEventListener("pointermove", h2, { passive: true }), document.addEventListener("pointerleave", c2), () => {
        removeEventListener("pointermove", h2), document.removeEventListener("pointerleave", c2), cancelAnimationFrame(l2);
      };
    }, []), (0, e.jsx)("div", { ref: s2, className: "cursor-label", "aria-hidden": "true" });
  }], 63104);
}]);
