(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 88536, (e) => {
  e.v({ goal: "goals-module__36VUjW__goal", goals: "goals-module__36VUjW__goals", headline: "goals-module__36VUjW__headline", here: "goals-module__36VUjW__here", hero: "goals-module__36VUjW__hero", kicker: "goals-module__36VUjW__kicker", label: "goals-module__36VUjW__label", name: "goals-module__36VUjW__name", nameBig: "goals-module__36VUjW__nameBig", number: "goals-module__36VUjW__number", panel: "goals-module__36VUjW__panel", path: "goals-module__36VUjW__path", slash: "goals-module__36VUjW__slash", step: "goals-module__36VUjW__step", stop: "goals-module__36VUjW__stop", stopLink: "goals-module__36VUjW__stopLink", stops: "goals-module__36VUjW__stops", sub: "goals-module__36VUjW__sub", tick: "goals-module__36VUjW__tick", top: "goals-module__36VUjW__top", track: "goals-module__36VUjW__track", type: "goals-module__36VUjW__type" });
}, 64641, (e) => {
  "use strict";
  var a = e.i(43476), l = e.i(22016), s = e.i(88653), t = e.i(63209), r = e.i(32181), n = e.i(71645), i = e.i(88536);
  let d = "learn-progress", o = /* @__PURE__ */ new Set();
  function u() {
    try {
      return localStorage.getItem(d) ?? "{}";
    } catch {
      return "{}";
    }
  }
  function c(e2) {
    try {
      localStorage.setItem(d, JSON.stringify(e2));
    } catch {
    }
    o.forEach((e3) => e3());
  }
  let _ = (e2) => (o.add(e2), () => {
    o.delete(e2);
  });
  function h(e2) {
    try {
      let a2 = JSON.parse(e2);
      return { goal: a2.goal, done: a2.done ?? {} };
    } catch {
      return { done: {} };
    }
  }
  let m = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }, p = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
  e.s(["LearnGoals", 0, function({ goals: e2, total: d2 }) {
    let o2 = h((0, n.useSyncExternalStore)(_, u, () => "{}")), j = e2.find((e3) => e3.id === o2.goal) ?? e2[0], g = new Set(o2.done[j.id] ?? []), f = j.stops.findIndex((e3) => !g.has(e3.slug)), x = -1 === f ? j.stops.length - 1 : f;
    return (0, a.jsx)(t.MotionConfig, { reducedMotion: "user", children: (0, a.jsxs)("section", { className: i.default.hero, "aria-labelledby": "learn-title", "data-world-hero": "", children: [(0, a.jsxs)("div", { className: i.default.top, children: [(0, a.jsxs)("div", { children: [(0, a.jsxs)("span", { className: i.default.kicker, children: ["Learn \xB7 ", d2, " free roadmaps, prompts and builds"] }), (0, a.jsxs)("h1", { id: "learn-title", className: i.default.headline, children: ["Tell me where", (0, a.jsx)("br", {}), "you\u2019re headed."] })] }), (0, a.jsx)("p", { className: i.default.sub, children: "Pick a goal and the roadmaps line up in order. Tick each one off as you go; your place is saved in this browser." })] }), (0, a.jsxs)("div", { className: i.default.panel, children: [(0, a.jsxs)("div", { className: i.default.goals, role: "radiogroup", "aria-label": "I want to", children: [(0, a.jsx)("span", { className: i.default.label, children: "I want to" }), e2.map((e3, l2) => (0, a.jsxs)("span", { className: i.default.goal, children: [l2 > 0 && (0, a.jsx)("span", { className: i.default.slash, "aria-hidden": "true", children: "/" }), (0, a.jsx)("button", { type: "button", role: "radio", "aria-checked": e3.id === j.id, onClick: () => {
      let a2;
      return a2 = e3.id, c({ ...h(u()), goal: a2 });
    }, children: e3.label })] }, e3.id))] }), (0, a.jsxs)("div", { className: i.default.path, children: [(0, a.jsx)("i", { className: i.default.track, "aria-hidden": "true", children: (0, a.jsx)(r.motion.i, { initial: false, animate: { scaleX: x / (j.stops.length - 1) }, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }) }), (0, a.jsx)(s.AnimatePresence, { mode: "wait", initial: false, children: (0, a.jsx)(r.motion.ol, { className: i.default.stops, variants: m, initial: "hidden", animate: "show", exit: { opacity: 0, x: -40, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }, children: j.stops.map((e3, s2) => {
      let t2 = g.has(e3.slug), n2 = s2 === f;
      return (0, a.jsxs)(r.motion.li, { variants: p, className: i.default.stop, "data-done": t2 ? "" : void 0, "data-here": n2 ? "" : void 0, children: [(0, a.jsxs)(l.default, { href: `/blog/${e3.slug}`, className: i.default.stopLink, children: [(0, a.jsx)("span", { className: i.default.step, children: n2 ? "You are here" : e3.step }), e3.number ? (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("span", { className: i.default.number, children: e3.number }), (0, a.jsx)("span", { className: i.default.name, children: e3.name })] }) : (0, a.jsx)("span", { className: i.default.nameBig, children: e3.name }), (0, a.jsxs)("span", { className: i.default.type, children: [e3.type, " \xB7 Free"] })] }), (0, a.jsxs)("button", { type: "button", className: i.default.tick, "aria-pressed": t2, onClick: () => {
        var a2;
        let l2, s3;
        return a2 = e3.slug, void ((s3 = new Set((l2 = h(u())).done[j.id] ?? [])).has(a2) ? s3.delete(a2) : s3.add(a2), c({ ...l2, goal: j.id, done: { ...l2.done, [j.id]: [...s3] } }));
      }, "aria-label": t2 ? `Mark "${e3.name}" as not done` : `Mark "${e3.name}" as done`, children: [(0, a.jsx)("svg", { viewBox: "0 0 24 24", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: (0, a.jsx)("path", { d: "M5 12.5l4.5 4.5L19 7.5" }) }), (0, a.jsx)("span", { children: t2 ? "Done" : "Mark done" })] })] }, e3.slug);
    }) }, j.id) })] })] })] }) });
  }]);
}, 96324, (e) => {
  e.v({ bar: "learn-module___ZG8WG__bar", body: "learn-module___ZG8WG__body", count: "learn-module___ZG8WG__count", empty: "learn-module___ZG8WG__empty", filter: "learn-module___ZG8WG__filter", filters: "learn-module___ZG8WG__filters", flip: "learn-module___ZG8WG__flip", list: "learn-module___ZG8WG__list", meta: "learn-module___ZG8WG__meta", page: "learn-module___ZG8WG__page", play: "learn-module___ZG8WG__play", preview: "learn-module___ZG8WG__preview", previewFrame: "learn-module___ZG8WG__previewFrame", rise: "learn-module___ZG8WG__rise", row: "learn-module___ZG8WG__row", search: "learn-module___ZG8WG__search", slash: "learn-module___ZG8WG__slash", title: "learn-module___ZG8WG__title" });
}, 1934, (e) => {
  "use strict";
  var a = e.i(43476), l = e.i(22016), s = e.i(71645), t = e.i(96324);
  let r = [["All", null], ["Roadmaps", ["resource"]], ["Prompts", ["prompt"]], ["Builds", ["build"]], ["Career", ["career"]]], n = (e2) => e2.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ");
  e.s(["LearnIndex", 0, function({ posts: e2, hero: i }) {
    let [d, o] = (0, s.useState)(0), [u, c] = (0, s.useState)(""), _ = (0, s.useRef)(null), h = (0, s.useMemo)(() => {
      let a2 = r[d][1], l2 = n(u).split(" ").filter(Boolean);
      return e2.filter((e3) => (!a2 || a2.includes(e3.type)) && l2.every((a3) => n(`${e3.title} ${e3.description} ${e3.label}`).includes(a3)));
    }, [d, u, e2]);
    (0, s.useEffect)(() => {
      let e3 = (e4) => {
        let a2 = e4.target;
        "/" !== e4.key || e4.metaKey || e4.ctrlKey || a2.closest("input, textarea, [contenteditable]") || (e4.preventDefault(), _.current?.focus());
      };
      return addEventListener("keydown", e3), () => removeEventListener("keydown", e3);
    }, []);
    let [m, p] = (0, s.useState)(null), j = h.find((e3) => e3.slug === m && e3.reel) ?? h.find((e3) => e3.reel) ?? null;
    return (0, a.jsxs)("div", { className: t.default.page, children: [i, (0, a.jsxs)("div", { className: t.default.body, children: [(0, a.jsxs)("section", { "aria-labelledby": "learn-heading", children: [(0, a.jsxs)("div", { className: t.default.bar, children: [(0, a.jsx)("div", { className: t.default.filters, role: "radiogroup", "aria-label": "Show", children: r.map(([e3], l2) => (0, a.jsxs)("span", { className: t.default.filter, children: [l2 > 0 && (0, a.jsx)("span", { className: t.default.slash, "aria-hidden": "true", children: "/" }), (0, a.jsx)("button", { type: "button", role: "radio", "aria-checked": d === l2, onClick: () => o(l2), children: e3 })] }, e3)) }), (0, a.jsxs)("label", { className: t.default.search, children: [(0, a.jsxs)("svg", { viewBox: "0 0 24 24", width: "15", height: "15", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", "aria-hidden": "true", children: [(0, a.jsx)("circle", { cx: "11", cy: "11", r: "6.5" }), (0, a.jsx)("path", { d: "M20 20l-4.2-4.2" })] }), (0, a.jsx)("span", { className: "sr-only", children: "Search posts" }), (0, a.jsx)("input", { ref: _, type: "search", value: u, onChange: (e3) => c(e3.target.value), placeholder: `Search ${e2.length} posts`, onKeyDown: (e3) => {
      "Escape" === e3.key && (c(""), e3.currentTarget.blur());
    } }), !u && (0, a.jsx)("kbd", { "aria-hidden": "true", children: "/" })] })] }), (0, a.jsxs)("p", { id: "learn-heading", className: t.default.count, "aria-live": "polite", children: [h.length, " ", 1 === h.length ? "post" : "posts", u && ` for \u201C${u}\u201D`] }), 0 === h.length && (0, a.jsxs)("p", { className: t.default.empty, children: ["Nothing yet for \u201C", u, "\u201D. Try a topic like ", (0, a.jsx)("button", { type: "button", onClick: () => c("react"), children: "react" }), " or ", (0, a.jsx)("button", { type: "button", onClick: () => c("prompt"), children: "prompt" }), "."] }), (0, a.jsx)("ul", { className: t.default.list, children: h.map((e3, s2) => (0, a.jsx)("li", { "data-reveal": "up", style: { "--d": `${s2 % 6 * 60}ms` }, children: (0, a.jsxs)(l.default, { href: `/blog/${e3.slug}`, className: t.default.row, "data-cursor": "Read", "data-active": m === e3.slug ? "" : void 0, onMouseEnter: () => p(e3.slug), onFocus: () => p(e3.slug), children: [(0, a.jsx)("span", { className: t.default.meta, children: e3.date }), (0, a.jsx)("span", { className: t.default.meta, children: e3.label }), (0, a.jsx)("span", { className: t.default.title, children: (0, a.jsx)("span", { children: e3.title }) }), (0, a.jsx)("span", { className: t.default.play, "aria-label": e3.reel ? "Has a Reel" : void 0, children: e3.reel ? "\u25B6" : "" })] }) }, e3.slug)) })] }), (0, a.jsx)("aside", { className: t.default.preview, "aria-hidden": "true", children: (0, a.jsxs)("div", { className: t.default.previewFrame, children: [j?.reel && (0, a.jsx)("video", { className: t.default.flip, src: j.reel.preview, poster: j.reel.poster, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "none" }, j.reel.id), (0, a.jsx)("span", { children: j ? `\u25B6 ${j.reel?.title}` : "" })] }) })] })] });
  }]);
}]);
