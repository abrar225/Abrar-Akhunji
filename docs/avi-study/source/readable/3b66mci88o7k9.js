(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 65796, (e) => {
  e.v({ blank: "brief-module__DxIl8G__blank", brief: "brief-module__DxIl8G__brief", briefActions: "brief-module__DxIl8G__briefActions", briefFoot: "brief-module__DxIl8G__briefFoot", briefLine: "brief-module__DxIl8G__briefLine", ghost: "brief-module__DxIl8G__ghost", kicker: "brief-module__DxIl8G__kicker", send: "brief-module__DxIl8G__send", slash: "brief-module__DxIl8G__slash", when: "brief-module__DxIl8G__when" });
}, 40937, (e) => {
  "use strict";
  var l = e.i(43476), a = e.i(71645), r = e.i(31338), i = e.i(89631), s = e.i(65796);
  e.s(["Brief", 0, function({ kicker: e2, start: t, first: d, middle: _, second: o, end: u, when: n, subject: c, page: m, ask: b, accent: h, accentOn: p }) {
    let [f, x] = (0, a.useState)(""), [T, A] = (0, a.useState)(""), [X, j] = (0, a.useState)(0), g = f.trim() || d.placeholder, v = T.trim() || o.placeholder, k = `${t} ${g} ${_} ${v}${u} ${n[X]}.`, w = `mailto:${r.PERSON.email}?subject=${encodeURIComponent(`${c} ${g}`)}&body=${encodeURIComponent(`Hi Avi,

${k}

`)}`, N = encodeURIComponent(`Read ${r.SITE}/llms.txt and ${r.SITE}${m}. ${k} ${b} Then draft a short message I can email him at ${r.PERSON.email}.`), I = (e3, a2, r2) => (0, l.jsx)("input", { className: s.default.blank, value: e3, onChange: (e4) => a2(e4.target.value), placeholder: r2.placeholder, "aria-label": r2.label, style: { "--chars": Math.max(e3.length, r2.placeholder.length) + 1 } });
    return (0, l.jsxs)("form", { className: s.default.brief, id: "brief", style: { "--accent": h, "--accent-on": p }, onSubmit: (e3) => {
      e3.preventDefault(), window.location.href = w;
    }, children: [(0, l.jsx)("span", { className: s.default.kicker, children: e2 }), (0, l.jsxs)("p", { className: s.default.briefLine, children: [t, " ", I(f, x, d), " ", _, " ", I(T, A, o), u, " ", (0, l.jsx)("span", { className: s.default.when, role: "radiogroup", "aria-label": "When", children: n.map((e3, a2) => (0, l.jsxs)("span", { children: [a2 > 0 && (0, l.jsx)("span", { className: s.default.slash, "aria-hidden": "true", children: " / " }), (0, l.jsx)("button", { type: "button", role: "radio", "aria-checked": X === a2, onClick: () => j(a2), children: e3 })] }, e3)) }), "."] }), (0, l.jsxs)("div", { className: s.default.briefFoot, children: [(0, l.jsxs)("span", { className: s.default.kicker, children: ["Goes to ", r.PERSON.email, ". Avi replies himself."] }), (0, l.jsxs)("div", { className: s.default.briefActions, children: [(0, l.jsx)("a", { className: s.default.ghost, href: `https://claude.ai/new?q=${N}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Ask Claude about this brief", children: (0, l.jsx)(i.AiIcon, { path: i.CLAUDE }) }), (0, l.jsx)("a", { className: s.default.ghost, href: `https://chatgpt.com/?q=${N}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Ask ChatGPT about this brief", children: (0, l.jsx)(i.AiIcon, { path: i.OPENAI }) }), (0, l.jsx)("button", { type: "submit", className: s.default.send, "data-magnetic": "", children: "Send to Avi \u2197" })] })] })] });
  }]);
}, 24051, (e) => {
  e.v({ browser: "build-module__TrXlAa__browser", browserBar: "build-module__TrXlAa__browserBar", browserView: "build-module__TrXlAa__browserView", case: "build-module__TrXlAa__case", caseHead: "build-module__TrXlAa__caseHead", caseStats: "build-module__TrXlAa__caseStats", caseText: "build-module__TrXlAa__caseText", cases: "build-module__TrXlAa__cases", chips: "build-module__TrXlAa__chips", clients: "build-module__TrXlAa__clients", companies: "build-module__TrXlAa__companies", dots: "build-module__TrXlAa__dots", end: "build-module__TrXlAa__end", experiment: "build-module__TrXlAa__experiment", experimentTitle: "build-module__TrXlAa__experimentTitle", headline: "build-module__TrXlAa__headline", hero: "build-module__TrXlAa__hero", heroText: "build-module__TrXlAa__heroText", kicker: "build-module__TrXlAa__kicker", lab: "build-module__TrXlAa__lab", links: "build-module__TrXlAa__links", page: "build-module__TrXlAa__page", private: "build-module__TrXlAa__private", product: "build-module__TrXlAa__product", products: "build-module__TrXlAa__products", proof: "build-module__TrXlAa__proof", section: "build-module__TrXlAa__section", shippedList: "build-module__TrXlAa__shippedList", shots: "build-module__TrXlAa__shots", sub: "build-module__TrXlAa__sub", thumb: "build-module__TrXlAa__thumb", thumbText: "build-module__TrXlAa__thumbText", title: "build-module__TrXlAa__title", titleRow: "build-module__TrXlAa__titleRow", wall: "build-module__TrXlAa__wall" });
}, 24010, (e) => {
  "use strict";
  var l = e.i(43476), a = e.i(22016), r = e.i(71645), i = e.i(24051);
  function s({ item: e2 }) {
    let t = (0, r.useRef)(null), d = () => {
      t.current?.play().catch(() => {
      });
    }, _ = () => {
      let e3 = t.current;
      e3 && (e3.pause(), e3.currentTime = 0);
    };
    return (0, l.jsx)("li", { children: (0, l.jsxs)(a.default, { href: `/blog/${e2.slug}`, className: i.default.experiment, "data-cursor": "Play", onMouseEnter: d, onMouseLeave: _, onFocus: d, onBlur: _, children: [(0, l.jsx)("video", { ref: t, src: e2.reel.preview, poster: e2.reel.poster, muted: true, loop: true, playsInline: true, preload: "none", "aria-hidden": "true" }), (0, l.jsx)("span", { className: i.default.experimentTitle, children: (0, l.jsx)("span", { children: e2.title }) })] }) });
  }
  e.s(["ExperimentWall", 0, function({ items: e2 }) {
    return (0, l.jsx)("ul", { className: i.default.wall, "data-scroll-track": "", children: e2.map((e3) => (0, l.jsx)(s, { item: e3 }, e3.slug)) });
  }, "ShotGallery", 0, function({ shots: e2 }) {
    let [a2, s2] = (0, r.useState)(0);
    return (0, r.useEffect)(() => {
      if (e2.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let l2 = setInterval(() => s2((l3) => (l3 + 1) % e2.length), 3200);
      return () => clearInterval(l2);
    }, [e2.length]), (0, l.jsxs)("div", { className: i.default.browser, children: [(0, l.jsxs)("div", { className: i.default.browserBar, "aria-hidden": "true", children: [(0, l.jsx)("i", {}), (0, l.jsx)("i", {}), (0, l.jsx)("i", {})] }), (0, l.jsx)("div", { className: i.default.browserView, children: e2.map((e3, r2) => (0, l.jsx)("img", { src: e3.src, alt: e3.alt, loading: "lazy", "data-on": r2 === a2 ? "" : void 0 }, e3.src)) }), e2.length > 1 && (0, l.jsx)("div", { className: i.default.dots, "aria-hidden": "true", children: e2.map((e3, r2) => (0, l.jsx)("i", { "data-on": r2 === a2 ? "" : void 0 }, e3.src)) })] });
  }]);
}]);
