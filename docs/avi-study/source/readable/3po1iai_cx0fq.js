(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 22676, (e) => {
  e.v({ bar: "commits-module__q-XA3a__bar", foot: "commits-module__q-XA3a__foot", head: "commits-module__q-XA3a__head", hero: "commits-module__q-XA3a__hero", home: "commits-module__q-XA3a__home", kicker: "commits-module__q-XA3a__kicker", num: "commits-module__q-XA3a__num", page: "commits-module__q-XA3a__page", replay: "commits-module__q-XA3a__replay", section: "commits-module__q-XA3a__section", stage: "commits-module__q-XA3a__stage", tip: "commits-module__q-XA3a__tip" });
}, 49098, (e) => {
  "use strict";
  var t = e.i(43476), l = e.i(22016), a = e.i(71645), o = e.i(22676);
  let n = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"], i = [["#e6e8eb", "#f0f2f4", "#d6d9dd"], ["#9be9a8", "#c1f2c9", "#7fd18d"], ["#40c463", "#73d68d", "#33a852"], ["#30a14e", "#52b86c", "#258540"], ["#216e39", "#2f8a4b", "#185a2d"]], r = ["#b5b5b0", "#56c26f", "#30a14e", "#216e39", "#14532d"], s = "#111111", c = "#6e6e73", h = "#2da44e", f = "#ef3b2d", d = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], m = (e2, t2 = 0, l2 = 1) => Math.max(t2, Math.min(l2, e2)), u = (e2) => 1 - Math.pow(1 - e2, 3), p = (e2) => e2 < 0.5 ? 4 * e2 * e2 * e2 : 1 - Math.pow(-2 * e2 + 2, 3) / 2, g = (e2) => 1 + 2.6 * Math.pow(e2 - 1, 3) + 1.6 * Math.pow(e2 - 1, 2), b = (e2) => {
    let t2 = 43758.5453 * Math.sin(91.345 * e2);
    return t2 - Math.floor(t2);
  };
  function y(e2, t2, l2) {
    let a2 = (e3) => [1, 3, 5].map((t3) => parseInt(e3.slice(t3, t3 + 2), 16)), o2 = a2(e2), n2 = a2(t2);
    return `rgb(${o2.map((e3, t3) => Math.round(e3 + (n2[t3] - e3) * l2)).join(",")})`;
  }
  function x(e2, t2, l2, a2, o2, n2) {
    e2.beginPath(), e2.roundRect(t2, l2, a2, o2, Math.min(n2, a2 / 2, o2 / 2));
  }
  function M(e2, t2) {
    e2.beginPath(), e2.moveTo(t2[0], t2[1]);
    for (let l2 = 2; l2 < t2.length; l2 += 2) e2.lineTo(t2[l2], t2[l2 + 1]);
    e2.closePath(), e2.fill();
  }
  function A({ scene: e2, draw: l2, label: n2, hero: i2 }) {
    let r2 = (0, a.useRef)(null), s2 = (0, a.useRef)(null), c2 = (0, a.useRef)(null), h2 = (0, a.useRef)(null);
    return (0, a.useEffect)(() => {
      let e3 = r2.current, t2 = s2.current, a2 = t2.getContext("2d"), o2 = c2.current, n3 = matchMedia("(prefers-reduced-motion: reduce)").matches, i3 = getComputedStyle(e3), f2 = { serif: i3.getPropertyValue("--font-serif").trim() || "Georgia, serif", mono: i3.getPropertyValue("--font-mono").trim() || "monospace" }, d2 = 0, m2 = 0, u2 = 0, p2 = false, g2 = null, b2 = (e4, t3 = 0, l3 = 0) => {
        if (!e4) {
          o2.style.opacity = "0";
          return;
        }
        o2.textContent = e4, o2.style.left = `${t3}px`, o2.style.top = `${l3}px`, o2.style.opacity = "1";
      }, y2 = (e4) => {
        a2.clearRect(0, 0, d2, m2), l2({ ctx: a2, w: d2, h: m2, t: n3 || null === h2.current ? 1 / 0 : e4 - h2.current, mouse: g2, fonts: f2, tip: b2 });
      }, x2 = (e4) => {
        y2(e4), u2 = p2 ? requestAnimationFrame(x2) : 0;
      }, M2 = new ResizeObserver(() => {
        let l3 = e3.getBoundingClientRect(), o3 = Math.min(2, devicePixelRatio || 1);
        d2 = l3.width, m2 = l3.height, t2.width = Math.max(1, Math.round(d2 * o3)), t2.height = Math.max(1, Math.round(m2 * o3)), a2.setTransform(o3, 0, 0, o3, 0, 0), y2(performance.now());
      });
      M2.observe(e3);
      let A2 = new IntersectionObserver(([e4]) => {
        (p2 = e4.isIntersecting) && (null === h2.current && (h2.current = performance.now()), u2 || (u2 = requestAnimationFrame(x2)));
      }, { threshold: 0.4 });
      A2.observe(e3);
      let T = (t3) => {
        let l3 = e3.getBoundingClientRect();
        g2 = [t3.clientX - l3.left, t3.clientY - l3.top];
      }, _ = () => {
        g2 = null, b2(null);
      };
      return e3.addEventListener("pointermove", T), e3.addEventListener("pointerleave", _), document.fonts?.ready.then(() => y2(performance.now())), () => {
        cancelAnimationFrame(u2), M2.disconnect(), A2.disconnect(), e3.removeEventListener("pointermove", T), e3.removeEventListener("pointerleave", _);
      };
    }, [l2]), (0, t.jsxs)("div", { ref: r2, className: o.default.stage, "data-scene": e2, "data-hero": i2 || void 0, children: [(0, t.jsx)("canvas", { ref: s2, role: "img", "aria-label": n2 }), (0, t.jsx)("div", { ref: c2, className: o.default.tip, "aria-hidden": true }), (0, t.jsx)("button", { type: "button", className: o.default.replay, onClick: () => {
      h2.current = performance.now();
    }, children: "\u21BB Replay" })] });
  }
  e.s(["Commits", 0, function({ data: e2, madeHow: T }) {
    let { scenes: _, stats: v } = (0, a.useMemo)(() => (function(e3) {
      let t2 = e3.counts, l2 = t2.length, a2 = Math.ceil(l2 / 7), o2 = [...e3.levels].map(Number), A2 = /* @__PURE__ */ new Date(`${e3.start}T00:00:00`), T2 = (e4) => {
        let t3 = new Date(A2);
        return t3.setDate(t3.getDate() + e4), t3;
      }, _2 = (e4) => T2(e4).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), v2 = (e4) => Math.round(e4).toLocaleString("en-US"), k2 = t2.reduce((e4, t3) => e4 + t3, 0), S2 = (t3) => v2(t3 / k2 * e3.total), $2 = (e4) => Math.floor(e4 / 7), w = (e4) => e4 % 7, P = Array.from({ length: a2 }, (e4, l3) => t2.slice(7 * l3, 7 * l3 + 7).reduce((e5, t3) => e5 + t3, 0)), j = t2.indexOf(Math.max(...t2)), R = P.indexOf(Math.max(...P)), q = t2[j], C = P[R], D = l2 - 1;
      0 === t2[D] && D--;
      let I = D;
      for (; I > 0 && t2[I - 1] > 0; ) I--;
      let E = D - I + 1;
      function F(e4, t3, o3, n2, i2 = true) {
        let r2 = i2 && n2 > 1.1 * o3, s2 = r2 ? 7 : a2, c2 = r2 ? a2 : 7, h2 = Math.min(o3 / s2, n2 / c2), f2 = e4 + (o3 - h2 * s2) / 2, d2 = t3 + (n2 - h2 * c2) / 2;
        return { s: h2, c: 0.82 * h2, ox: f2, oy: d2, turn: r2, pos: (e5) => r2 ? [f2 + w(e5) * h2, d2 + $2(e5) * h2] : [f2 + $2(e5) * h2, d2 + w(e5) * h2], hit: (e5, t4) => {
          let a3 = Math.floor((e5 - f2) / h2), o4 = Math.floor((t4 - d2) / h2), n3 = r2 ? 7 * o4 + a3 : 7 * a3 + o4;
          return a3 >= 0 && o4 >= 0 && a3 < s2 && o4 < c2 && n3 < l2 ? n3 : -1;
        } };
      }
      let N = (e4, t3) => `400 ${t3}px ${e4.fonts.serif}`, W = (e4, t3) => `500 ${t3}px ${e4.fonts.mono}`;
      function X(e4, t3, l3, a3, o3, n2, i2 = "left") {
        let { ctx: r2 } = e4;
        r2.textAlign = i2, r2.textBaseline = "alphabetic", r2.fillStyle = s, r2.font = N(e4, n2), r2.fillText(t3, a3, o3 + 0.8 * n2), r2.fillStyle = c, r2.font = W(e4, 11), r2.fillText(l3.toUpperCase(), a3, o3 + 0.8 * n2 + 20);
      }
      return { scenes: { skyline: function(e4) {
        let { ctx: n2, w: r2, h: c2, t: h2 } = e4, f2 = 0.92 * r2 / (a2 + 3.3000000000000003 + 1), d2 = 0.55 * f2, p2 = 0.34 * f2, g2 = 0.74 * f2, b2 = 0.74 * d2, y2 = -(0.74 * p2), x2 = (r2 - (a2 * f2 + 6 * d2)) / 2, A3 = 0.9 * c2, T3 = 0.56 * c2;
        n2.fillStyle = "#ebebe7", M(n2, [x2 - 0.3 * f2, A3 + 0.25 * f2, x2 + a2 * f2, A3 + 0.25 * f2, x2 + a2 * f2 + 6 * d2 + b2 + 0.3 * f2, A3 - 6 * p2 + y2 - 0.2 * f2, x2 + 6 * d2 + b2, A3 - 6 * p2 + y2 - 0.2 * f2]);
        let v3 = null;
        for (let e5 = 0; e5 < 7; e5++) {
          let r3 = 6 - e5;
          for (let s2 = 0; s2 < a2; s2++) {
            let a3 = 7 * s2 + e5;
            if (a3 >= l2) continue;
            let c3 = u(m((h2 - 200 - 30 * s2 - 55 * e5) / 900)), _3 = Math.max(1.5, Math.sqrt(t2[a3] / q) * T3 * c3), k4 = x2 + s2 * f2 + r3 * d2, S3 = A3 - r3 * p2, [$3, w2, P2] = i[o2[a3]];
            n2.fillStyle = P2, M(n2, [k4 + g2, S3, k4 + g2, S3 - _3, k4 + g2 + b2, S3 - _3 + y2, k4 + g2 + b2, S3 + y2]), n2.fillStyle = $3, n2.fillRect(k4, S3 - _3, g2, _3), n2.fillStyle = w2, M(n2, [k4, S3 - _3, k4 + g2, S3 - _3, k4 + g2 + b2, S3 - _3 + y2, k4 + b2, S3 - _3 + y2]), a3 === j && (v3 = [k4 + g2 / 2 + b2 / 2, S3 - _3 + y2 / 2]);
          }
        }
        let k3 = u(m((h2 - 3e3) / 600));
        if (v3 && k3 > 0) {
          let [t3, l3] = v3, a3 = 0.12 * c2, o3 = t3 > 0.65 * r2, i2 = t3 + (o3 ? -8 : 8);
          n2.globalAlpha = k3, n2.strokeStyle = s, n2.lineWidth = 1, n2.beginPath(), n2.moveTo(t3, l3 - 4), n2.lineTo(t3, l3 - 4 - (l3 - 4 - a3) * k3), n2.stroke(), n2.fillStyle = s, n2.beginPath(), n2.arc(t3, l3 - 4, 2.5, 0, 2 * Math.PI), n2.fill(), X(e4, `${q} commits`, `${_2(j)}, best day`, i2, a3 - 14, Math.max(20, 0.026 * r2), o3 ? "right" : "left"), n2.globalAlpha = 1;
        }
      }, wave: function(e4) {
        let { ctx: a3, w: i2, h: r2, t: c2, mouse: f2 } = e4, d2 = i2 < 640, p2 = F(0.05 * i2, r2 * (d2 ? 0.24 : 0.36), 0.9 * i2, r2 * (d2 ? 0.72 : 0.56)), b2 = 0;
        for (let e5 = 0; e5 < l2; e5++) {
          let l3 = m((c2 - (150 + ($2(e5) + 1.6 * w(e5)) * 22)) / 560);
          if (l3 <= 0) continue;
          b2 += t2[e5];
          let [i3, r3] = p2.pos(e5), s2 = p2.c * (0.2 + 0.8 * g(l3)), f3 = (p2.c - s2) / 2;
          a3.globalAlpha = m(3 * l3), a3.fillStyle = l3 < 1 ? y(o2[e5] ? h : "#a6dcb3", n[o2[e5]], u(m((l3 - 0.35) / 0.65))) : n[o2[e5]], x(a3, i3 + f3, r3 + f3, s2, s2, 0.2 * s2), a3.fill();
        }
        a3.globalAlpha = 1, X(e4, S2(b2), "contributions in the last year", 0.05 * i2, 0.07 * r2, Math.min(96, 0.08 * i2));
        let M2 = f2 ? p2.hit(...f2) : -1;
        if (M2 >= 0) {
          let [l3, o3] = p2.pos(M2);
          a3.strokeStyle = s, a3.lineWidth = 1.5, x(a3, l3 - 1, o3 - 1, p2.c + 2, p2.c + 2, 0.25 * p2.c), a3.stroke(), e4.tip(`${t2[M2]} on ${_2(M2)}`, l3 + p2.c / 2, o3);
        } else e4.tip(null);
      }, pulse: function(e4) {
        let { ctx: t3, w: i2, h: r2, t: s2 } = e4, f2 = F(0.05 * i2, 0.5 * r2, 0.9 * i2, 0.42 * r2, false), d2 = 0.12 * r2, g2 = 0.28 * r2, b2 = (e5) => f2.ox + e5 * f2.s + f2.c / 2, M2 = (e5) => d2 + g2 * (1 - P[e5] / C), A3 = p(m((s2 - 150) / 1800)) * (a2 - 1);
        t3.strokeStyle = s2 > 2700 ? y(h, "#9be9a8", 0.6 * m((s2 - 1800 - 900) / 900)) : h, t3.lineWidth = 2, t3.lineJoin = "round", t3.beginPath();
        for (let e5 = 0; e5 <= Math.floor(A3); e5++) e5 ? t3.lineTo(b2(e5), M2(e5)) : t3.moveTo(b2(e5), M2(e5));
        let T3 = Math.floor(A3), v3 = A3 - T3, k3 = b2(T3), S3 = M2(T3);
        T3 < a2 - 1 && (k3 += (b2(T3 + 1) - k3) * v3, S3 += (M2(T3 + 1) - S3) * v3), t3.lineTo(k3, S3), t3.stroke(), s2 < 2250 && (t3.fillStyle = h, t3.beginPath(), t3.arc(k3, S3, 5, 0, 2 * Math.PI), t3.fill(), t3.globalAlpha = 0.18, t3.beginPath(), t3.arc(k3, S3, 11, 0, 2 * Math.PI), t3.fill(), t3.globalAlpha = 1);
        for (let e5 = 0; e5 < l2; e5++) {
          let l3 = $2(e5), i3 = u(m((s2 - 150 - l3 / (a2 - 1) * 1800 - 250 - 40 * w(e5)) / 650));
          if (i3 <= 0) continue;
          let [r3, c2] = f2.pos(e5), d3 = b2(l3) - f2.c / 2, p2 = M2(l3), g3 = f2.c * (0.35 + 0.65 * i3);
          t3.globalAlpha = m(2 * i3), t3.fillStyle = i3 < 1 ? y(h, n[o2[e5]], i3) : n[o2[e5]], x(t3, d3 + (f2.c - g3) / 2 + (r3 - d3) * i3, p2 + (c2 - p2) * i3, g3, g3, 0.2 * g3), t3.fill();
        }
        let j2 = m((s2 - 1800 - 700) / 500);
        if (j2 > 0) {
          t3.globalAlpha = j2, t3.font = W(e4, 11), t3.fillStyle = c;
          let l3 = R > 0.6 * a2;
          t3.textAlign = l3 ? "right" : "left", t3.textBaseline = "bottom", t3.fillText(`BEST WEEK: ${C} FROM ${_2(7 * R).toUpperCase()}`, b2(R) + (l3 ? -10 : 10), M2(R) - 4), t3.globalAlpha = 1;
        }
      }, clock: function(e4) {
        let { ctx: i2, w: r2, h: f2, t: u2 } = e4, g2 = r2 < 640, b2 = g2 ? 0.5 * r2 : 0.34 * r2, x2 = g2 ? 0.4 * f2 : 0.5 * f2, M2 = Math.min(g2 ? 0.36 * r2 : 0.28 * r2, f2 * (g2 ? 0.32 : 0.42)), _3 = 0.42 * M2, v3 = (M2 - _3) / 7, k3 = 2 * Math.PI, P2 = p(m((u2 - 150) / 3400)) * k3, j2 = k3 / a2, R2 = 0;
        for (let e5 = 0; e5 < l2; e5++) {
          let l3 = $2(e5) * j2, a3 = P2 - l3;
          if (a3 <= 0) continue;
          R2 += t2[e5];
          let r3 = m(a3 / 0.5), s2 = _3 + w(e5) * v3, c2 = 0.12 * v3, f3 = -Math.PI / 2 + l3 + 0.08 * j2, d2 = -Math.PI / 2 + l3 + 0.92 * j2;
          i2.globalAlpha = r3, i2.fillStyle = r3 < 1 ? y(h, n[o2[e5]], r3) : n[o2[e5]], i2.beginPath(), i2.arc(b2, x2, s2 + v3 - c2, f3, d2), i2.arc(b2, x2, s2 + c2, d2, f3, true), i2.closePath(), i2.fill();
        }
        i2.globalAlpha = 1, i2.font = W(e4, 10), i2.fillStyle = c, i2.textAlign = "center", i2.textBaseline = "middle";
        for (let e5 = 0; e5 < a2; e5++) {
          let t3 = T2(7 * e5);
          if (t3.getDate() > 7) continue;
          let l3 = -Math.PI / 2 + e5 * j2;
          i2.fillText(d[t3.getMonth()].toUpperCase(), b2 + Math.cos(l3) * (M2 + 15), x2 + Math.sin(l3) * (M2 + 15));
        }
        let q2 = P2 >= k3 - 1e-3;
        if (!q2) {
          let e5 = -Math.PI / 2 + P2;
          i2.strokeStyle = s, i2.lineWidth = 1.5, i2.beginPath(), i2.moveTo(b2 + Math.cos(e5) * _3 * 0.85, x2 + Math.sin(e5) * _3 * 0.85), i2.lineTo(b2 + Math.cos(e5) * (M2 + 4), x2 + Math.sin(e5) * (M2 + 4)), i2.stroke();
        }
        i2.fillStyle = s, i2.font = N(e4, 0.2 * M2), i2.fillText(`${E}d`, b2, x2 - 0.03 * M2), i2.font = W(e4, 9), i2.fillStyle = c, i2.fillText("STREAK", b2, x2 + 0.13 * M2);
        let C2 = T2(7 * Math.min(a2 - 1, Math.floor(P2 / j2))), D2 = q2 ? `${d[A2.getMonth()]} ${A2.getFullYear()} to ${d[T2(l2 - 1).getMonth()]} ${T2(l2 - 1).getFullYear()}` : `now passing ${d[C2.getMonth()]} ${C2.getFullYear()}`, I2 = Math.min(88, g2 ? 0.12 * r2 : 0.07 * r2);
        X(e4, S2(R2), q2 ? `contributions, ${D2}` : D2, g2 ? 0.08 * r2 : 0.62 * r2, g2 ? 0.8 * f2 : 0.5 * f2 - 0.6 * I2, I2);
      }, streak: function(e4) {
        let { ctx: t3, w: a3, h: i2, t: r2 } = e4, c2 = a3 < 640, d2 = F(0.05 * a3, i2 * (c2 ? 0.22 : 0.34), 0.9 * a3, i2 * (c2 ? 0.74 : 0.58)), b2 = p(m((r2 - 400) / 3800)) * (E - 1), y2 = I + Math.floor(b2), M2 = (e5) => {
          let [t4, l3] = d2.pos(e5);
          return [t4 + d2.c / 2, l3 + d2.c / 2];
        };
        for (let e5 = 0; e5 < l2; e5++) {
          let [l3, a4] = d2.pos(e5), i3 = n[0], s2 = d2.c;
          if (e5 < I) t3.globalAlpha = 0.35, i3 = n[o2[e5]];
          else if (e5 <= y2 && r2 > 400) {
            let t4 = g(m((b2 - (e5 - I)) / 2.5));
            i3 = n[o2[e5]], s2 = d2.c * (0.6 + 0.4 * t4);
          }
          t3.fillStyle = i3, x(t3, l3 + (d2.c - s2) / 2, a4 + (d2.c - s2) / 2, s2, s2, 0.2 * s2), t3.fill(), t3.globalAlpha = 1;
        }
        if (I > 0) {
          let [e5, l3] = M2(I - 1), a4 = 0.32 * d2.c;
          t3.strokeStyle = f, t3.lineWidth = 1.75, t3.beginPath(), t3.moveTo(e5 - a4, l3 - a4), t3.lineTo(e5 + a4, l3 + a4), t3.moveTo(e5 + a4, l3 - a4), t3.lineTo(e5 - a4, l3 + a4), t3.stroke();
        }
        let A3 = r2 > 4200;
        if (r2 > 400 && !A3) {
          let [e5, l3] = M2(y2);
          if (y2 < D) {
            let [t4, a5] = M2(y2 + 1), o4 = b2 - Math.floor(b2);
            e5 += (t4 - e5) * o4, l3 += (a5 - l3) * o4;
          }
          t3.lineWidth = 1.5, t3.lineCap = "round";
          let [a4, o3] = [e5, l3];
          for (let e6 = 0; e6 < 14 && y2 - e6 >= I; e6++) {
            let [l4, n2] = M2(y2 - e6);
            t3.strokeStyle = `rgba(17,17,17,${(1 - e6 / 14) * 0.7})`, t3.beginPath(), t3.moveTo(a4, o3), t3.lineTo(l4, n2), t3.stroke(), [a4, o3] = [l4, n2];
          }
          t3.fillStyle = h, t3.beginPath(), t3.arc(e5, l3, Math.max(3, 0.3 * d2.c), 0, 2 * Math.PI), t3.fill();
        }
        if (A3 && !d2.turn) {
          let l3 = u(m((r2 - 3800 - 400) / 600)), [a4] = d2.pos(I), [o3] = d2.pos(D), n2 = d2.oy + 7 * d2.s + 0.6 * d2.s, i3 = a4 + (o3 + d2.c - a4) * l3;
          t3.strokeStyle = s, t3.lineWidth = 1, t3.beginPath(), t3.moveTo(a4, n2 - 4), t3.lineTo(a4, n2 + 4), t3.moveTo(a4, n2), t3.lineTo(i3, n2), l3 >= 1 && (t3.moveTo(i3, n2 - 4), t3.lineTo(i3, n2 + 4)), t3.stroke(), t3.globalAlpha = l3, t3.font = W(e4, 11), t3.fillStyle = s, t3.textAlign = "center", t3.textBaseline = "top", t3.fillText(`${E} DAYS`, (a4 + o3 + d2.c) / 2, n2 + 8), t3.globalAlpha = 1;
        }
        let T3 = Math.min(96, 0.08 * a3);
        X(e4, A3 ? `${E} days` : `Day ${Math.max(1, Math.floor(b2) + 1)}`, A3 ? "in a row, and counting" : `since ${_2(I)}`, 0.05 * a3, 0.06 * i2, T3), I > 0 && !c2 && (t3.textAlign = "right", t3.font = W(e4, 11), t3.fillStyle = f, t3.fillText(`LAST DAY OFF: ${_2(I - 1).toUpperCase()}`, 0.95 * a3, 0.06 * i2 + 0.8 * T3 + 20));
      }, terminal: function(t3) {
        let { ctx: n2, w: i2, h: f2, t: d2 } = t3, u2 = F(0.05 * i2, 0.2 * f2, 0.9 * i2, f2 * (i2 < 640 ? 0.66 : 0.6)), p2 = "avi@github ~ $ ./contributions.sh", g2 = Math.floor(m((d2 - 200) / 1100) * p2.length), y2 = Math.max(12, Math.min(18, 0.017 * i2)), x2 = 0.05 * i2, M2 = Math.floor(d2 / 530) % 2 == 0 || d2 > 1e8;
        n2.textBaseline = "middle", n2.textAlign = "left", n2.font = W(t3, y2), n2.fillStyle = s, n2.fillText(p2.slice(0, g2), x2, 0.1 * f2);
        let A3 = "01{}<>/$#*+=~";
        n2.textAlign = "center", n2.font = W(t3, 0.95 * u2.s);
        let T3 = 0;
        for (let e4 = 0; e4 < l2; e4++) {
          let t4 = 1450 + (u2.turn ? 80 * w(e4) + 10 * $2(e4) : 26 * $2(e4)) + 200 * b(e4), l3 = t4 + 450 + 450 * b(e4 + 7);
          if (d2 < t4) continue;
          T3 = Math.max(T3, l3);
          let [a3, i3] = u2.pos(e4);
          d2 < l3 ? (n2.fillStyle = c, n2.fillText(A3[Math.floor(b(13 * e4 + Math.floor(d2 / 70)) * A3.length)], a3 + u2.c / 2, i3 + u2.c / 2)) : (n2.fillStyle = r[o2[e4]], n2.fillText(".:+#@"[o2[e4]], a3 + u2.c / 2, i3 + u2.c / 2));
        }
        let _3 = d2 > 1450 + (u2.turn ? 480 + 10 * a2 : 26 * a2) + 1100;
        if (n2.textAlign = "left", n2.font = W(t3, y2), _3) {
          let t4 = `${v2(e3.total)} contributions  \xB7  ${E} day streak  \xB7  best day ${q}`, l3 = Math.floor(m((d2 - (1450 + (u2.turn ? 480 + 10 * a2 : 26 * a2) + 1100)) / 900) * t4.length);
          if (n2.fillStyle = h, n2.fillText(t4.slice(0, l3), x2, 0.92 * f2), M2) {
            let e4 = n2.measureText(t4.slice(0, l3)).width;
            n2.fillStyle = s, n2.fillRect(x2 + e4 + 4, 0.92 * f2 - 0.55 * y2, 0.55 * y2, 1.1 * y2);
          }
        } else if (M2) {
          let e4 = n2.measureText(p2.slice(0, g2)).width;
          n2.fillStyle = s, n2.fillRect(x2 + e4 + 4, 0.1 * f2 - 0.55 * y2, 0.55 * y2, 1.1 * y2);
        }
      } }, stats: { streak: E, streakFrom: _2(I), best: q, bestDay: _2(j), bestWeek: C, bestWeekFrom: _2(7 * R) } };
    })(e2), [e2]), k = e2.total.toLocaleString("en-US"), S = (/* @__PURE__ */ new Date(`${e2.fetchedAt}T00:00:00`)).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), $ = [{ scene: "skyline", title: "As a city", text: `Every day becomes a building, as tall as that day's commits. The city rises front to back, then points at my biggest day: ${v.best} on ${v.bestDay}.` }, { scene: "pulse", title: "Week by week", text: `Each week's total as one line, then every week pours down into its seven days. My biggest week was ${v.bestWeek} contributions, from ${v.bestWeekFrom}.` }, { scene: "clock", title: "Round the year", text: "The same calendar wrapped into a ring: a ring per weekday, a spoke per week, read by a hand that sweeps the whole year." }, { scene: "streak", title: "The streak", text: `${v.streak} days without a day off, since ${v.streakFrom}. A thread stitches through every one of them in order. The red cross is the last day I didn't push anything.` }, { scene: "terminal", title: "In the terminal", text: "Where the README starts: the command types itself, the grid scrambles in glyphs and settles into the same five shades, one character per day." }];
    return (0, t.jsxs)("main", { className: o.default.page, children: [(0, t.jsxs)("div", { className: o.default.bar, children: [(0, t.jsx)(l.default, { href: "/", className: o.default.home, children: "Avi." }), (0, t.jsxs)("p", { className: o.default.kicker, children: [(0, t.jsxs)("a", { href: `https://github.com/${e2.login}`, target: "_blank", rel: "noreferrer", children: ["github.com/", e2.login] }), (0, t.jsxs)("span", { children: ["Updated ", S] })] })] }), (0, t.jsxs)("header", { className: o.default.hero, children: [(0, t.jsxs)("h1", { children: [k, " commits in a year. ", (0, t.jsx)("em", { children: "Six ways to draw them." })] }), (0, t.jsx)("p", { children: "My real GitHub contribution graph, pulled from the GitHub API and drawn six different ways. Each one is a canvas and about a hundred lines of code. Pick one for your own portfolio. Hover a square for its day." })] }), (0, t.jsx)(A, { scene: "wave", draw: _.wave, hero: true, label: `The contribution grid: ${e2.counts.length} squares, one per day, shaded by commits, dropping in on a diagonal wave while the total counts up to ${k}.` }), $.map((e3, l2) => (0, t.jsxs)("section", { className: o.default.section, children: [(0, t.jsxs)("div", { className: o.default.head, children: [(0, t.jsx)("span", { className: o.default.num, children: String(l2 + 2).padStart(2, "0") }), (0, t.jsx)("h2", { children: e3.title }), (0, t.jsx)("p", { children: e3.text })] }), (0, t.jsx)(A, { scene: e3.scene, draw: _[e3.scene], label: `${e3.title}: ${e3.text}` })] }, e3.scene)), (0, t.jsx)("footer", { className: o.default.foot, children: (0, t.jsxs)("p", { children: ["Data: GitHub's GraphQL API, ", (0, t.jsx)("code", { children: "contributionsCollection.contributionCalendar" }), " for ", (0, t.jsxs)("a", { href: `https://github.com/${e2.login}`, target: "_blank", rel: "noreferrer", children: ["@", e2.login] }), ", last fetched ", S, "."] }) }), T] });
  }], 49098);
}]);
