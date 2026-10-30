(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 57937, (e) => {
  "use strict";
  var t = e.i(71645), o = e.i(69430);
  e.s(["PostClient", 0, function({ slug: e2, title: r }) {
    return (0, t.useEffect)(() => {
      o.default.capture("article_viewed", { slug: e2, title: r });
      let t2 = Array.from(document.querySelectorAll(".post [data-copy]")).map((e3) => {
        let t3 = () => {
          let t4 = e3.getAttribute("data-copy"), o2 = t4 && document.getElementById(t4) || e3.closest(".promptbox")?.querySelector(".prompt, pre, code");
          if (!o2) return;
          let r2 = e3.textContent, a = () => {
            e3.textContent = "Copied", e3.classList.add("done"), setTimeout(() => {
              e3.textContent = r2, e3.classList.remove("done");
            }, 1600);
          };
          navigator.clipboard?.writeText(o2.innerText).then(a, () => {
            let e4 = document.createRange();
            e4.selectNodeContents(o2);
            let t5 = window.getSelection();
            t5?.removeAllRanges(), t5?.addRange(e4), document.execCommand("copy"), t5?.removeAllRanges(), a();
          });
        };
        return e3.addEventListener("click", t3), [e3, t3];
      });
      return () => t2.forEach(([e3, t3]) => e3.removeEventListener("click", t3));
    }, [e2, r]), null;
  }]);
}, 79504, (e) => {
  "use strict";
  var t = e.i(43476), o = e.i(71645), r = e.i(6193);
  e.s(["PostAside", 0, function({ reel: e2, sections: a }) {
    let [s, l] = (0, o.useState)(null), n = (0, o.useRef)(null);
    return ((0, o.useEffect)(() => {
      let e3 = n.current;
      if (!e3 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let t2 = () => {
        e3.preload = "auto", e3.play().catch(() => {
        });
      }, o2 = setTimeout(() => (window.requestIdleCallback ?? ((e4) => e4()))(t2), 600);
      return () => clearTimeout(o2);
    }, []), (0, o.useEffect)(() => {
      document.querySelectorAll(".post [data-current]").forEach((e3) => e3.removeAttribute("data-current")), s && document.getElementById(s)?.setAttribute("data-current", "");
    }, [s]), (0, o.useEffect)(() => {
      let e3 = a.map((e4) => document.getElementById(e4.id)).filter((e4) => !!e4), t2 = new IntersectionObserver((e4) => {
        let t3 = e4.filter((e5) => e5.isIntersecting).sort((e5, t4) => e5.boundingClientRect.top - t4.boundingClientRect.top)[0];
        t3 && l(t3.target.id);
      }, { rootMargin: "0px 0px -70% 0px" });
      return e3.forEach((e4) => t2.observe(e4)), () => t2.disconnect();
    }, [a]), !e2 && a.length < 2) ? null : (0, t.jsxs)("aside", { className: r.default.aside, children: [e2 && (0, t.jsxs)("figure", { className: r.default.reel, children: [(0, t.jsx)("figcaption", { children: "You came from this Reel" }), (0, t.jsx)("video", { ref: n, src: e2.preview, poster: e2.poster, muted: true, loop: true, playsInline: true, preload: "none", "aria-label": `Reel: ${e2.title}` }), (0, t.jsxs)("div", { className: r.default.reelFoot, children: [(0, t.jsxs)("span", { children: ["\u25B6 ", e2.views ? `${e2.views} views` : "Plays muted"] }), (0, t.jsx)("a", { href: e2.href, target: "_blank", rel: "noopener noreferrer", children: "Watch on Instagram \u2197" })] })] }), a.length > 1 && (0, t.jsxs)("nav", { className: r.default.toc, "aria-label": "On this page", children: [(0, t.jsx)("span", { children: "On this page" }), (0, t.jsx)("ol", { children: a.map((e3, o2) => (0, t.jsx)("li", { children: (0, t.jsxs)("a", { href: `#${e3.id}`, "aria-current": s === e3.id ? "location" : void 0, children: [(0, t.jsx)("i", { children: String(o2 + 1).padStart(2, "0") }), (0, t.jsx)("b", { children: e3.text })] }) }, e3.id)) })] })] });
  }]);
}, 30506, (e) => {
  "use strict";
  var t = e.i(43476), o = e.i(71645), r = e.i(6193);
  e.s(["PostOutput", 0, function({ href: e2, title: a }) {
    let s = (0, o.useRef)(null), [l, n] = (0, o.useState)(0), [i, d] = (0, o.useState)(false), [u, c] = (0, o.useState)(false);
    (0, o.useEffect)(() => {
      let e3 = s.current;
      if (!e3) return;
      let t2 = new ResizeObserver(([e4]) => n(e4.contentRect.width / 1440)), o2 = new IntersectionObserver(([e4]) => {
        e4.isIntersecting && (d(true), o2.disconnect());
      }, { rootMargin: "200px" });
      return t2.observe(e3), o2.observe(e3), () => {
        t2.disconnect(), o2.disconnect();
      };
    }, []);
    let p = new URL(e2, "https://avivashishta.com");
    return (0, t.jsxs)("figure", { className: r.default.output, children: [(0, t.jsxs)("figcaption", { children: [(0, t.jsx)("span", { children: "The output, live" }), (0, t.jsxs)("span", { className: r.default.outputUrl, children: ["avivashishta.com", p.pathname] })] }), (0, t.jsxs)("a", { ref: s, href: e2, className: r.default.outputWindow, "data-loaded": u ? "" : void 0, "aria-label": `Open the live page: ${a}`, "data-cursor": "Open", children: [i && l > 0 && (0, t.jsx)("iframe", { src: e2, title: `Live preview: ${a}`, tabIndex: -1, "aria-hidden": "true", loading: "lazy", onLoad: () => c(true), style: { width: 1440, height: 900, transform: `scale(${l})` } }), (0, t.jsx)("span", { className: r.default.outputOpen, children: "Open the live page \u2197" })] })] });
  }]);
}, 6193, (e) => {
  e.v({ aside: "post-module__ZjFDNa__aside", body: "post-module__ZjFDNa__body", keep: "post-module__ZjFDNa__keep", lede: "post-module__ZjFDNa__lede", "made-how": "post-module__ZjFDNa__made-how", madeHow: "post-module__ZjFDNa__madeHow", meta: "post-module__ZjFDNa__meta", output: "post-module__ZjFDNa__output", outputOpen: "post-module__ZjFDNa__outputOpen", outputUrl: "post-module__ZjFDNa__outputUrl", outputWindow: "post-module__ZjFDNa__outputWindow", reel: "post-module__ZjFDNa__reel", reelFoot: "post-module__ZjFDNa__reelFoot", title: "post-module__ZjFDNa__title", toc: "post-module__ZjFDNa__toc", wrap: "post-module__ZjFDNa__wrap" });
}]);
