(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 46875, (e) => {
  e.v({ arrow: "brand-module__9BPywa__arrow", audience: "brand-module__9BPywa__audience", audienceText: "brand-module__9BPywa__audienceText", bars: "brand-module__9BPywa__bars", big: "brand-module__9BPywa__big", chips: "brand-module__9BPywa__chips", col: "brand-module__9BPywa__col", contact: "brand-module__9BPywa__contact", demo: "brand-module__9BPywa__demo", dial: "brand-module__9BPywa__dial", facts: "brand-module__9BPywa__facts", float: "brand-module__9BPywa__float", formats: "brand-module__9BPywa__formats", gender: "brand-module__9BPywa__gender", headline: "brand-module__9BPywa__headline", hero: "brand-module__9BPywa__hero", heroText: "brand-module__9BPywa__heroText", included: "brand-module__9BPywa__included", kicker: "brand-module__9BPywa__kicker", mini: "brand-module__9BPywa__mini", note: "brand-module__9BPywa__note", page: "brand-module__9BPywa__page", period: "brand-module__9BPywa__period", periods: "brand-module__9BPywa__periods", phone: "brand-module__9BPywa__phone", quality: "brand-module__9BPywa__quality", rates: "brand-module__9BPywa__rates", ratesLink: "brand-module__9BPywa__ratesLink", reel: "brand-module__9BPywa__reel", reelFoot: "brand-module__9BPywa__reelFoot", reelStats: "brand-module__9BPywa__reelStats", result: "brand-module__9BPywa__result", section: "brand-module__9BPywa__section", shelf: "brand-module__9BPywa__shelf", split: "brand-module__9BPywa__split", stage: "brand-module__9BPywa__stage", steps: "brand-module__9BPywa__steps", stick: "brand-module__9BPywa__stick", sticker: "brand-module__9BPywa__sticker", strip: "brand-module__9BPywa__strip", strips: "brand-module__9BPywa__strips", sub: "brand-module__9BPywa__sub", title: "brand-module__9BPywa__title", titleRow: "brand-module__9BPywa__titleRow", topReels: "brand-module__9BPywa__topReels", wanted: "brand-module__9BPywa__wanted", who: "brand-module__9BPywa__who", worked: "brand-module__9BPywa__worked" });
}, 23693, (e) => {
  "use strict";
  var a = e.i(43476), r = e.i(71645), _ = e.i(19657);
  function l(e2) {
    return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(e2);
  }
  _.default.reels.views, _.default.reelStats.stats;
  var d = e.i(46875);
  e.s(["HoverReel", 0, function({ reel: e2, label: _2, stats: t, index: n }) {
    let o = (0, r.useRef)(null), s = () => {
      o.current?.play().catch(() => {
      });
    }, i = () => {
      let e3 = o.current;
      e3 && (e3.pause(), e3.currentTime = 0);
    };
    return (0, a.jsxs)("a", { className: d.default.reel, href: e2.href, target: "_blank", rel: "noopener noreferrer", "data-cursor": "Play", style: void 0 !== n ? { "--i": n } : void 0, onMouseEnter: s, onMouseLeave: i, onFocus: s, onBlur: i, "aria-label": `Watch "${e2.title}" on Instagram`, children: [(0, a.jsx)("video", { ref: o, src: e2.preview, poster: e2.poster, muted: true, loop: true, playsInline: true, preload: "none", "aria-hidden": "true" }), (0, a.jsxs)("span", { className: d.default.reelFoot, children: [(0, a.jsxs)("span", { children: ["\u25B6 ", _2 ?? e2.title] }), e2.views && (0, a.jsx)("b", { children: e2.views })] }), t && (0, a.jsxs)("span", { className: d.default.reelStats, "aria-hidden": "true", children: [(0, a.jsxs)("span", { children: [l(t.likes), " likes"] }), (0, a.jsxs)("span", { children: [l(t.shares), " shares"] })] })] });
  }], 23693);
}, 65796, (e) => {
  e.v({ blank: "brief-module__DxIl8G__blank", brief: "brief-module__DxIl8G__brief", briefActions: "brief-module__DxIl8G__briefActions", briefFoot: "brief-module__DxIl8G__briefFoot", briefLine: "brief-module__DxIl8G__briefLine", ghost: "brief-module__DxIl8G__ghost", kicker: "brief-module__DxIl8G__kicker", send: "brief-module__DxIl8G__send", slash: "brief-module__DxIl8G__slash", when: "brief-module__DxIl8G__when" });
}, 40937, (e) => {
  "use strict";
  var a = e.i(43476), r = e.i(71645), _ = e.i(31338), l = e.i(89631), d = e.i(65796);
  e.s(["Brief", 0, function({ kicker: e2, start: t, first: n, middle: o, second: s, end: i, when: u, subject: c, page: m, ask: b, accent: h, accentOn: f }) {
    let [w, p] = (0, r.useState)(""), [y, P] = (0, r.useState)(""), [B, x] = (0, r.useState)(0), k = w.trim() || n.placeholder, g = y.trim() || s.placeholder, j = `${t} ${k} ${o} ${g}${i} ${u[B]}.`, v = `mailto:${_.PERSON.email}?subject=${encodeURIComponent(`${c} ${k}`)}&body=${encodeURIComponent(`Hi Avi,

${j}

`)}`, I = encodeURIComponent(`Read ${_.SITE}/llms.txt and ${_.SITE}${m}. ${j} ${b} Then draft a short message I can email him at ${_.PERSON.email}.`), $ = (e3, r2, _2) => (0, a.jsx)("input", { className: d.default.blank, value: e3, onChange: (e4) => r2(e4.target.value), placeholder: _2.placeholder, "aria-label": _2.label, style: { "--chars": Math.max(e3.length, _2.placeholder.length) + 1 } });
    return (0, a.jsxs)("form", { className: d.default.brief, id: "brief", style: { "--accent": h, "--accent-on": f }, onSubmit: (e3) => {
      e3.preventDefault(), window.location.href = v;
    }, children: [(0, a.jsx)("span", { className: d.default.kicker, children: e2 }), (0, a.jsxs)("p", { className: d.default.briefLine, children: [t, " ", $(w, p, n), " ", o, " ", $(y, P, s), i, " ", (0, a.jsx)("span", { className: d.default.when, role: "radiogroup", "aria-label": "When", children: u.map((e3, r2) => (0, a.jsxs)("span", { children: [r2 > 0 && (0, a.jsx)("span", { className: d.default.slash, "aria-hidden": "true", children: " / " }), (0, a.jsx)("button", { type: "button", role: "radio", "aria-checked": B === r2, onClick: () => x(r2), children: e3 })] }, e3)) }), "."] }), (0, a.jsxs)("div", { className: d.default.briefFoot, children: [(0, a.jsxs)("span", { className: d.default.kicker, children: ["Goes to ", _.PERSON.email, ". Avi replies himself."] }), (0, a.jsxs)("div", { className: d.default.briefActions, children: [(0, a.jsx)("a", { className: d.default.ghost, href: `https://claude.ai/new?q=${I}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Ask Claude about this brief", children: (0, a.jsx)(l.AiIcon, { path: l.CLAUDE }) }), (0, a.jsx)("a", { className: d.default.ghost, href: `https://chatgpt.com/?q=${I}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Ask ChatGPT about this brief", children: (0, a.jsx)(l.AiIcon, { path: l.OPENAI }) }), (0, a.jsx)("button", { type: "submit", className: d.default.send, "data-magnetic": "", children: "Send to Avi \u2197" })] })] })] });
  }]);
}]);
