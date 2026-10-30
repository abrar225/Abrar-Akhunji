(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 19910, (e) => {
  e.v({ count: "made-of-dots-module__wPNgza__count", hint: "made-of-dots-module__wPNgza__hint", home: "made-of-dots-module__wPNgza__home", label: "made-of-dots-module__wPNgza__label", loader: "made-of-dots-module__wPNgza__loader", name: "made-of-dots-module__wPNgza__name", page: "made-of-dots-module__wPNgza__page", ring: "made-of-dots-module__wPNgza__ring", role: "made-of-dots-module__wPNgza__role", stage: "made-of-dots-module__wPNgza__stage" });
}, 39407, (e) => {
  "use strict";
  var t = e.i(43476), a = e.i(22016), n = e.i(71645), o = e.i(90072), i = e.i(8560), r = e.i(19910);
  let l = `
  attribute vec3 aNormal;
  attribute float aPart;
  attribute float aRand;
  uniform float uTime, uAssemble, uSize, uGlint, uShine;
  uniform vec2 uHead;
  uniform vec3 uLight, uRingCenter;
  uniform float uRingRadius;
  varying float vBright, vGlint, vAlpha;

  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec3 home = position * 2e-4;
    vec3 n = aNormal;

    // The head turns on the neck; the shoulders follow a little.
    float head = smoothstep(-1.5, -.8, home.y);
    mat3 turn = rotY(uHead.x * (.25 + .75 * head)) * rotX(uHead.y * head);
    vec3 pivot = vec3(0., -1.1, 0.);
    home = turn * (home - pivot) + pivot;
    n = turn * n;

    // Breathing: every dot drifts a hair along its normal on its own clock.
    home += n * sin(uTime * 1.4 + aRand * 60.) * .006;

    // The entrance: dots leave the loader ring in a sweep and arc forward into place.
    float r2 = hash(aRand * 91.7);
    float t = clamp((uAssemble - aRand * .45) / .55, 0., 1.);
    float e = t < .5 ? 4. * t * t * t : 1. - pow(-2. * t + 2., 3.) / 2.;
    float ang = aRand * 6.2831853;
    vec3 start = uRingCenter + vec3(cos(ang), sin(ang), 0.) * uRingRadius * (1. + (r2 - .5) * .06);
    vec3 p = mix(start, home, e);
    float arc = sin(e * 3.1415926);
    p += vec3(sin(aRand * 40. + uTime * .3), cos(aRand * 31.), .9 + r2 * 1.4) * arc * .45;

    vec4 world = modelMatrix * vec4(p, 1.);
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    // Light: a soft key from the top left, the cursor's light up close, and a rim.
    vec3 wn = normalize(mat3(modelMatrix) * n);
    vec3 toLight = uLight - world.xyz;
    float lit = max(dot(wn, normalize(toLight)), 0.) / (1. + dot(toLight, toLight) * .32);
    float key = max(dot(wn, normalize(vec3(-.5, .6, .7))), 0.);
    float facing = (viewMatrix * vec4(wn, 0.)).z;
    float rim = pow(1. - abs(facing), 3.);
    // Mostly an even grey, like a scan: the shape comes from the outline, the light only adds to it.
    float b = .3 + key * .14 + lit * 1.5 + rim * .12;
    b *= mix(.55, 1., smoothstep(-.3, .25, facing)); // the far side of the head a little darker
    float specs = step(1.5, aPart);
    b *= 1. - specs * .1;
    b *= .7 + r2 * .5; // no two dots quite alike
    // A glint runs across the specs every few seconds.
    vGlint = specs * smoothstep(.09, 0., abs(position.x * 2e-4 - uGlint));
    b += vGlint * 1.2;
    // The shine: once everyone has landed, one band of light sweeps down the bust from the top left.
    float band = home.y - home.x * .5 - uShine;
    float shine = exp(-band * band * 4.);
    b += shine * 1.3;
    vBright = b;
    vAlpha = mix(.75, 1., e);

    float size = uSize * (.45 + r2 * r2 * 1.3) * (1. + shine * .6);
    gl_PointSize = size / -mv.z;
  }
`, s = `
  uniform vec3 uInk, uBlue;
  varying float vBright, vGlint, vAlpha;
  void main() {
    vec2 c = gl_PointCoord - .5;
    float r = length(c);
    if (r > .5) discard;
    float a = exp(-r * r * 16.) * vAlpha; // soft, like a lens, not a hard pixel
    gl_FragColor = vec4(mix(uInk, uBlue, clamp(vGlint, 0., 1.) * .7) * vBright * a, 1.);
  }
`, u = `
  attribute float aRand;
  uniform float uTime, uSize, uOn;
  varying float vB;
  void main() {
    vec3 p = position;
    p.y = mod(p.y + uTime * (.03 + aRand * .05) + 6., 12.) - 6.;
    p.x += sin(uTime * .2 + aRand * 40.) * .15;
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (.5 + aRand) / -mv.z;
    vB = (.1 + aRand * .18) * uOn;
  }
`, d = `
  uniform vec3 uInk;
  varying float vB;
  void main() {
    float r = length(gl_PointCoord - .5);
    if (r > .5) discard;
    gl_FragColor = vec4(uInk * vB * exp(-r * r * 16.), 1.);
  }
`, m = `
  uniform float uSize, uOn;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uOn / -mv.z;
  }
`, c = `
  void main() {
    float r = length(gl_PointCoord - .5) * 2.;
    float core = smoothstep(.14, .08, r);
    float glow = exp(-r * 4.) * .45 + exp(-r * 12.) * .7;
    gl_FragColor = vec4(vec3(core + glow), 1.);
  }
`;
  e.s(["MadeOfDots", 0, function({ madeHow: e2 }) {
    let h = (0, n.useRef)(null), [f, v] = (0, n.useState)(0), [g, p] = (0, n.useState)("loading"), [w, b] = (0, n.useState)(false);
    (0, n.useEffect)(() => {
      let e3 = h.current;
      if (!e3) return;
      let t2 = matchMedia("(prefers-reduced-motion: reduce)").matches, a2 = new AbortController(), n2 = false, r2 = 0, f2 = () => {
      };
      return (async () => {
        try {
          let h2 = await fetch("/lab/dots/avi.bin", { signal: a2.signal });
          if (!h2.ok || !h2.body) throw Error(String(h2.status));
          let g2 = Number(h2.headers.get("content-length")) || 0, w2 = h2.body.getReader(), b2 = [], x2 = 0;
          for (; ; ) {
            let { done: e4, value: t3 } = await w2.read();
            if (e4) break;
            b2.push(t3), x2 += t3.length, v(g2 ? x2 / g2 : Math.min(0.95, x2 / 67e4));
          }
          let _ = new Uint8Array(x2), y = 0;
          for (let e4 of b2) _.set(e4, y), y += e4.length;
          if (v(1), await new Promise((e4) => setTimeout(e4, 380 * !t2)), n2) return;
          f2 = (function(e4, t3, a3, n3) {
            let h3 = new DataView(t3).getUint32(0, true), f3 = new Int16Array(t3, 4, 3 * h3), v2 = new Int8Array(t3, 4 + 6 * h3, 3 * h3), g3 = new Uint8Array(t3, 4 + 9 * h3, h3), p2 = new Float32Array(h3);
            for (let e5 = 0; e5 < h3; e5++) p2[e5] = Math.random();
            let w3 = new o.BufferGeometry();
            w3.setAttribute("position", new o.BufferAttribute(f3, 3)), w3.setAttribute("aNormal", new o.BufferAttribute(v2, 3, true)), w3.setAttribute("aPart", new o.BufferAttribute(g3, 1)), w3.setAttribute("aRand", new o.BufferAttribute(p2, 1));
            let b3 = new i.WebGLRenderer({ antialias: false, powerPreference: "high-performance" }), x3 = Math.min(devicePixelRatio, 2);
            b3.setPixelRatio(x3), e4.appendChild(b3.domElement);
            let _2 = new o.Scene(), y2 = new o.PerspectiveCamera(30, 1, 0.1, 100), A = new o.Vector3(0, -0.15, 0), M = getComputedStyle(e4), P = (e5, t4) => new o.Color(M.getPropertyValue(e5).trim() || t4);
            b3.setClearColor(P("--color-night", "#1a1a1c"));
            let R = { uTime: { value: 0 }, uAssemble: { value: +!!a3 }, uSize: { value: 26 * x3 }, uGlint: { value: -9 }, uShine: { value: 99 }, uHead: { value: new o.Vector2() }, uLight: { value: new o.Vector3(-1.4, 1.2, 1.6) }, uRingCenter: { value: new o.Vector3() }, uRingRadius: { value: 1 }, uInk: { value: P("--color-paper", "#f3f3f1") }, uBlue: { value: P("--color-tech", "#2f55ff") } }, S = new o.Points(w3, new o.ShaderMaterial({ vertexShader: l, fragmentShader: s, uniforms: R, transparent: true, depthWrite: false, blending: o.AdditiveBlending }));
            S.frustumCulled = false, _2.add(S);
            let z = { uSize: { value: 240 * x3 }, uOn: { value: 0 } }, B = new o.BufferGeometry();
            B.setAttribute("position", new o.Float32BufferAttribute([0, 0, 0], 3));
            let C = new o.Points(B, new o.ShaderMaterial({ vertexShader: m, fragmentShader: c, uniforms: z, transparent: true, depthWrite: false, blending: o.AdditiveBlending }));
            C.frustumCulled = false, _2.add(C);
            let N = new Float32Array(2700), T = new Float32Array(900);
            for (let e5 = 0; e5 < 900; e5++) N.set([(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, -6 + 8 * Math.random()], 3 * e5), T[e5] = Math.random();
            let k = new o.BufferGeometry();
            k.setAttribute("position", new o.BufferAttribute(N, 3)), k.setAttribute("aRand", new o.BufferAttribute(T, 1));
            let L = { uTime: R.uTime, uSize: { value: 22 * x3 }, uOn: { value: +!!a3 }, uInk: R.uInk }, j = new o.Points(k, new o.ShaderMaterial({ vertexShader: u, fragmentShader: d, uniforms: L, transparent: true, depthWrite: false, blending: o.AdditiveBlending }));
            j.frustumCulled = false, _2.add(j);
            let V = () => {
              let t4 = e4.clientWidth, a4 = e4.clientHeight;
              b3.setSize(t4, a4, false), y2.aspect = t4 / a4;
              let n4 = Math.tan(o.MathUtils.degToRad(15)), i2 = Math.max(2.35 / n4, 1.7 / (n4 * y2.aspect));
              y2.position.set(0, A.y, i2), y2.lookAt(A), y2.updateProjectionMatrix();
              let r3 = 2 * i2 * n4 / a4;
              R.uRingCenter.value.set(0, A.y, 0), R.uRingRadius.value = 92 * r3;
            };
            V();
            let G = new ResizeObserver(V);
            G.observe(e4);
            let O = new o.Vector2(), F = new o.Vector2(), I = -1, E = false, H = new o.Raycaster(), U = new o.Plane(new o.Vector3(0, 0, 1), -2.6), W = new o.Vector3(-1.4, 1.2, 1.5), q = (t4) => {
              let a4 = e4.getBoundingClientRect();
              O.set((t4.clientX - a4.left) / a4.width * 2 - 1, -(2 * ((t4.clientY - a4.top) / a4.height)) + 1), E = "touch" === t4.pointerType, I = performance.now();
            }, X = () => {
              I = -1;
            };
            e4.addEventListener("pointermove", q), e4.addEventListener("pointerdown", q), e4.addEventListener("pointerleave", X);
            let Y = performance.now(), D = Y, K = false, J = Y + 4600, Q = (e5) => {
              r2 = requestAnimationFrame(Q);
              let t4 = Math.min(0.05, (e5 - D) / 1e3);
              D = e5;
              let i2 = (e5 - Y) / 1e3;
              R.uTime.value = a3 ? 0 : i2, a3 || (R.uAssemble.value = Math.min(1, i2 / 2.6));
              let l2 = R.uAssemble.value;
              !K && l2 > 0.55 && (K = true, n3());
              let s2 = (e6) => 1 - Math.exp(-t4 * e6);
              if (I < 0 || E && e5 - I > 1500 ? (W.set(1.9 * Math.sin(0.45 * i2), 0.5 + 0.8 * Math.cos(0.33 * i2), 2.6), F.lerp(new o.Vector2(0.35 * Math.sin(0.45 * i2), 0.12 * Math.cos(0.33 * i2)), s2(1.5))) : (H.setFromCamera(O, y2), H.ray.intersectPlane(U, W), F.lerp(new o.Vector2(0.5 * O.x, 0.18 * O.y), s2(3))), a3 && F.set(0, 0), R.uLight.value.lerp(W, s2(a3 ? 60 : 5)), C.position.copy(R.uLight.value), R.uHead.value.set(F.x, -F.y), z.uOn.value += (Math.min(1, 1.6 * l2) - z.uOn.value) * s2(4), L.uOn.value += (1 - L.uOn.value) * s2(0.8), !a3) {
                let e6 = (i2 - 2.3400000000000003) / 2.2;
                R.uShine.value = e6 < 0 || e6 > 1 ? 99 : 2.8 - (1 - (1 - e6) ** 2) * 7.4;
              }
              if (!a3 && e5 > J) {
                let t5 = (e5 - J) / 900;
                R.uGlint.value = -0.9 + 1.8 * t5, t5 > 1 && (J = e5 + 4200, R.uGlint.value = -9);
              }
              b3.render(_2, y2);
            };
            return r2 = requestAnimationFrame(Q), () => {
              cancelAnimationFrame(r2), G.disconnect(), e4.removeEventListener("pointermove", q), e4.removeEventListener("pointerdown", q), e4.removeEventListener("pointerleave", X), w3.dispose(), B.dispose(), k.dispose(), S.material.dispose(), C.material.dispose(), j.material.dispose(), b3.dispose(), b3.domElement.remove();
            };
          })(e3, _.buffer, t2, () => p("ready"));
        } catch (e4) {
          n2 || (console.error(e4), b(true));
        }
      })(), () => {
        n2 = true, a2.abort(), f2();
      };
    }, []);
    let x = Math.round(100 * f);
    return (0, t.jsxs)("main", { className: r.default.page, "data-phase": g, children: [(0, t.jsx)("div", { ref: h, className: r.default.stage, "aria-hidden": "true" }), (0, t.jsxs)("div", { className: r.default.loader, role: "progressbar", "aria-label": "Loading the dots", "aria-valuenow": x, "aria-valuemin": 0, "aria-valuemax": 100, children: [(0, t.jsx)("svg", { viewBox: "-110 -110 220 220", className: r.default.ring, children: Array.from({ length: 96 }, (e3, a2) => {
      let n2 = a2 / 96 * Math.PI * 2 - Math.PI / 2;
      return (0, t.jsx)("circle", { cx: +(92 * Math.cos(n2)).toFixed(2), cy: +(92 * Math.sin(n2)).toFixed(2), r: 1.6, "data-on": a2 / 96 < f || void 0 }, a2);
    }) }), (0, t.jsx)("span", { className: r.default.count, children: w ? "Could not load" : String(x).padStart(3, "0") }), (0, t.jsx)("span", { className: r.default.label, children: w ? "Refresh to try again" : "66,000 dots" })] }), (0, t.jsx)(a.default, { href: "/", className: r.default.home, children: "Avi." }), (0, t.jsx)("h1", { className: r.default.name, children: "Avi Vashishta" }), (0, t.jsx)("p", { className: r.default.role, children: "Builds cool things with AI" }), (0, t.jsx)("p", { className: r.default.hint, children: "Move the light" }), e2] });
  }]);
}]);
