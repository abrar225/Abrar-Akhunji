import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildStages, HOLD_SECONDS, MORPH_SECONDS, STAGE_SECONDS } from './heroTopologies';
import { soundFX } from '../lib/soundFX';

/**
 * Hero instrument: three particle topologies drawn into an ASCII glyph field.
 * 01 attention cortex, 02 auth lattice, 03 ViT loop.
 * Reduced motion holds one still frame. Offscreen frames are skipped.
 */

const GLYPHS = ' .:-+*=%@#01';
const CELL = 64;

function hash(i) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function cssSrgb(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const color = new THREE.Color(raw);
  const encode = (u) => (u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055);
  return new THREE.Vector3(encode(color.r), encode(color.g), encode(color.b));
}

function makeAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = CELL * GLYPHS.length;
  canvas.height = CELL;
  const ctx = canvas.getContext('2d');
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = `600 ${Math.floor(CELL * 0.68)}px "DM Mono", ui-monospace, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < GLYPHS.length; i += 1) {
      const glyph = GLYPHS[i];
      if (glyph !== ' ') ctx.fillText(glyph, i * CELL + CELL / 2, CELL * 0.54);
    }
  };
  draw();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return { texture, redraw: () => { draw(); texture.needsUpdate = true; } };
}

function stageAt(time) {
  const cycle = STAGE_SECONDS * 3;
  const u = ((time % cycle) + cycle) % cycle;
  const index = Math.min(2, Math.floor(u / STAGE_SECONDS));
  const local = u - index * STAGE_SECONDS;
  const morph = local <= HOLD_SECONDS ? 0 : (local - HOLD_SECONDS) / MORPH_SECONDS;
  const smooth = morph * morph * (3 - 2 * morph);
  return { index, smooth, next: (index + 1) % 3 };
}

const POINT_VERT = `
attribute float aSeed;
attribute float aHot;
uniform float uPoint;
varying float vHot;
varying float vSeed;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vHot = aHot;
  vSeed = aSeed;
  gl_PointSize = uPoint * mix(0.7, 1.15, aHot);
}
`;

const POINT_FRAG = `
uniform float uTime;
varying float vHot;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.04, d);
  float twinkle = 0.78 + 0.22 * sin(uTime * 2.2 + vSeed * 9.0);
  float energy = core * mix(0.5, 1.0, vHot) * twinkle;
  gl_FragColor = vec4(vec3(energy), 1.0);
}
`;

const RIBBON_VERT = `
attribute vec3 aStart;
attribute vec3 aEnd;
attribute float aSeed;
uniform float uWidth;
uniform vec2 uResolution;
varying float vAlong;
varying float vAcross;
varying float vSeed;
void main() {
  vec4 ca = projectionMatrix * modelViewMatrix * vec4(aStart, 1.0);
  vec4 cb = projectionMatrix * modelViewMatrix * vec4(aEnd, 1.0);
  float along = position.y + 0.5;
  vec4 clip = mix(ca, cb, along);
  vec2 ndcA = ca.xy / max(abs(ca.w), 0.0001);
  vec2 ndcB = cb.xy / max(abs(cb.w), 0.0001);
  vec2 dir = ndcB - ndcA;
  float len = length(dir);
  vec2 nrm = len < 1e-4 ? vec2(0.0, 1.0) : vec2(-dir.y, dir.x) / len;
  vec2 ndcPerPx = vec2(2.0 / max(uResolution.x, 1.0), 2.0 / max(uResolution.y, 1.0));
  clip.xy += nrm * position.x * uWidth * ndcPerPx * clip.w;
  gl_Position = clip;
  vAlong = along;
  vAcross = position.x;
  vSeed = aSeed;
}
`;

const RIBBON_FRAG = `
uniform float uTime;
uniform float uFade;
varying float vAlong;
varying float vAcross;
varying float vSeed;
void main() {
  float across = smoothstep(0.5, 0.02, abs(vAcross));
  float phase = fract(vAlong * 9.0);
  float bead = smoothstep(0.34, 0.04, abs(phase - 0.5));
  float travel = fract(vAlong - uTime * 0.62 + vSeed);
  float pulse = smoothstep(0.0, 0.02, travel) * smoothstep(0.18, 0.02, travel);
  float energy = max(bead * 0.58, pulse) * across * uFade;
  if (energy < 0.1) discard;
  gl_FragColor = vec4(vec3(energy), 1.0);
}
`;

const POST_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const POST_FRAG = `
uniform sampler2D uScene;
uniform sampler2D uAtlas;
uniform float uCount;
uniform float uCell;
uniform vec2 uResolution;
uniform vec3 uDim;
uniform vec3 uBright;
uniform vec3 uHot;
varying vec2 vUv;
void main() {
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 origin = cell * uCell;
  float lum = 0.0;
  for (int y = 0; y < 3; y++) {
    for (int x = 0; x < 3; x++) {
      vec2 s = origin + (vec2(float(x), float(y)) + 0.5) * (uCell / 3.0);
      lum = max(lum, texture2D(uScene, s / uResolution).r);
    }
  }
  if (lum < 0.12) discard;
  float idx = clamp(floor(mix(1.0, uCount - 1.0, pow(clamp(lum, 0.0, 1.0), 0.72))), 0.0, uCount - 1.0);
  vec2 cellUv = fract(gl_FragCoord.xy / uCell);
  vec2 atlasUv = vec2((idx + cellUv.x) / uCount, cellUv.y);
  vec4 glyph = texture2D(uAtlas, atlasUv);
  if (glyph.a < 0.35) discard;
  float t = clamp(lum, 0.0, 1.0);
  vec3 col = mix(uDim, uBright, smoothstep(0.12, 0.7, t));
  col = mix(col, uHot, smoothstep(0.8, 1.0, t));
  gl_FragColor = vec4(col, 1.0);
}
`;

function glowState() {
  return {
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.MaxEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
  };
}

function makeRibbon(maxEdges) {
  const base = new THREE.PlaneGeometry(1, 1);
  const geo = new THREE.InstancedBufferGeometry();
  geo.setIndex(base.getIndex().clone());
  geo.setAttribute('position', base.getAttribute('position').clone());
  geo.setAttribute('uv', base.getAttribute('uv').clone());
  geo.setAttribute('aStart', new THREE.InstancedBufferAttribute(new Float32Array(maxEdges * 3), 3));
  geo.setAttribute('aEnd', new THREE.InstancedBufferAttribute(new Float32Array(maxEdges * 3), 3));
  geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(new Float32Array(maxEdges), 1));
  geo.instanceCount = 0;
  base.dispose();
  return geo;
}

export default function ThreeBackground({ theme = 'dark', onPhase, seekRef }) {
  const mountRef = useRef(null);
  const onPhaseRef = useRef(onPhase);

  useEffect(() => {
    onPhaseRef.current = onPhase;
  }, [onPhase]);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const isDark = theme !== 'light';
    const count = mobile ? 144 : 180;
    const stages = buildStages(count);
    const maxEdges = stages.reduce((max, stage) => Math.max(max, stage.edges.length / 2), 1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        premultipliedAlpha: false,
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.autoClear = false;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mountNode.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    camera.position.set(0, 0.06, 6.2);
    camera.lookAt(0, 0, 0);

    const { texture, redraw } = makeAtlas();
    const uTime = { value: reduced ? 0.4 : 0 };
    const uResolution = { value: new THREE.Vector2(1, 1) };
    const uWidth = { value: 8 };
    const uPoint = { value: 12 };

    const pos = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const hot = new Float32Array(count);
    for (let i = 0; i < count; i += 1) seeds[i] = hash(i + 1);
    pos.set(stages[0].pos);
    hot.set(stages[0].hot);

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pointsGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    pointsGeo.setAttribute('aHot', new THREE.BufferAttribute(hot, 1));
    const pointsMat = new THREE.ShaderMaterial({
      uniforms: { uTime, uPoint },
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      ...glowState(),
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    points.frustumCulled = false;

    const ribbonMat = () => new THREE.ShaderMaterial({
      uniforms: {
        uTime,
        uWidth,
        uResolution,
        uFade: { value: 1 },
      },
      vertexShader: RIBBON_VERT,
      fragmentShader: RIBBON_FRAG,
      ...glowState(),
      side: THREE.DoubleSide,
    });
    const ribbonA = new THREE.Mesh(makeRibbon(maxEdges), ribbonMat());
    const ribbonB = new THREE.Mesh(makeRibbon(maxEdges), ribbonMat());
    ribbonA.frustumCulled = false;
    ribbonB.frustumCulled = false;

    const group = new THREE.Group();
    group.rotation.order = 'YXZ';
    group.add(ribbonA, ribbonB, points);
    scene.add(group);

    const rt = new THREE.WebGLRenderTarget(2, 2, { depthBuffer: false, stencilBuffer: false });
    rt.texture.colorSpace = THREE.NoColorSpace;
    rt.texture.minFilter = THREE.LinearFilter;
    rt.texture.magFilter = THREE.LinearFilter;
    rt.texture.generateMipmaps = false;

    const postUniforms = {
      uScene: { value: rt.texture },
      uAtlas: { value: texture },
      uCount: { value: GLYPHS.length },
      uCell: { value: 12 },
      uResolution,
      uDim: { value: cssSrgb('--color-accent-deep', isDark ? '#2A8FA0' : '#084552') },
      uBright: { value: cssSrgb('--color-accent', isDark ? '#79D0E0' : '#0C6474') },
      uHot: { value: cssSrgb('--color-fg', isDark ? '#E8EEF6' : '#10151C') },
    };
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 2);
    postCamera.position.z = 1;
    const postQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: postUniforms,
        vertexShader: POST_VERT,
        fragmentShader: POST_FRAG,
        depthTest: false,
        depthWrite: false,
      }),
    );
    postQuad.frustumCulled = false;
    postScene.add(postQuad);

    const fillRibbon = (mesh, edges) => {
      const geo = mesh.geometry;
      const start = geo.getAttribute('aStart');
      const end = geo.getAttribute('aEnd');
      const seedAttr = geo.getAttribute('aSeed');
      const m = Math.min(edges.length / 2, start.count);
      for (let k = 0; k < m; k += 1) {
        const i = edges[k * 2];
        const j = edges[k * 2 + 1];
        start.setXYZ(k, pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
        end.setXYZ(k, pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        seedAttr.setX(k, seeds[i]);
      }
      start.needsUpdate = true;
      end.needsUpdate = true;
      seedAttr.needsUpdate = true;
      geo.instanceCount = m;
      mesh.visible = m > 0;
    };

    const mixPositions = (from, to, smooth) => {
      const a = from.pos;
      const b = to.pos;
      const hotA = from.hot;
      const hotB = to.hot;
      const bell = 4 * smooth * (1 - smooth);
      for (let i = 0; i < count; i += 1) {
        const o = i * 3;
        const dx = b[o] - a[o];
        const dy = b[o + 1] - a[o + 1];
        const dz = b[o + 2] - a[o + 2];
        const seed = seeds[i];
        let ox = 0;
        let oy = 0;
        let oz = 0;
        const len = Math.hypot(dx, dy, dz);
        if (len > 1e-4 && bell > 1e-4) {
          let px = -dy;
          let py = dx;
          let pz = 0.35 * len;
          const along = (px * dx + py * dy + pz * dz) / (len * len);
          px -= dx * along;
          py -= dy * along;
          pz -= dz * along;
          let pl = Math.hypot(px, py, pz);
          if (pl < 1e-5) {
            px = 0;
            py = 1;
            pz = 0;
            const alongY = dy / (len * len);
            px -= dx * alongY;
            py -= dy * alongY;
            pz -= dz * alongY;
            pl = Math.hypot(px, py, pz) || 1;
          }
          px /= pl;
          py /= pl;
          pz /= pl;
          const qx = (dy * pz - dz * py) / len;
          const qy = (dz * px - dx * pz) / len;
          const qz = (dx * py - dy * px) / len;
          const ang = smooth * Math.PI * (1.15 + seed * 0.85) + seed * 4;
          const lift = bell * (0.16 + seed * 0.2);
          const cs = Math.cos(ang) * lift;
          const sn = Math.sin(ang) * lift;
          ox = px * cs + qx * sn;
          oy = py * cs + qy * sn;
          oz = pz * cs + qz * sn;
        }
        pos[o] = a[o] + dx * smooth + ox;
        pos[o + 1] = a[o + 1] + dy * smooth + oy;
        pos[o + 2] = a[o + 2] + dz * smooth + oz;
        const mix = hotA[i] + (hotB[i] - hotA[i]) * smooth;
        hot[i] = Math.min(1, mix + bell * (0.55 + seed * 0.4));
      }
      pointsGeo.getAttribute('position').needsUpdate = true;
      pointsGeo.getAttribute('aHot').needsUpdate = true;
    };

    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (event) => {
      pointer.x = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointer.y = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.02 });
    io.observe(mountNode);

    const layout = () => {
      const w = mountNode.clientWidth || 1;
      const h = mountNode.clientHeight || 1;
      const narrow = window.innerWidth < 1024;
      const mid = !narrow && w < 1280;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      camera.aspect = w / Math.max(1, h);
      camera.position.set(0, narrow ? 0 : 0.06, narrow ? 3.15 : 6.2);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      const bw = renderer.domElement.width || 1;
      const bh = renderer.domElement.height || 1;
      rt.setSize(bw, bh);
      uResolution.value.set(bw, bh);
      const cell = (narrow ? (w < 640 ? 9 : 11) : 14) * dpr;
      postUniforms.uCell.value = cell;
      uWidth.value = cell * (narrow ? 0.78 : 0.7);
      uPoint.value = cell * (narrow ? 1.02 : 0.92);
      // Mobile/tablet (<1024): centered at large scale inside the dedicated stage box.
      // 1024–1279: shift right so the field clears the hero copy. ≥1280 stays put.
      const mobileScale = w < 480 ? 0.72 : w < 768 ? 0.76 : 0.78;
      group.scale.setScalar(narrow ? mobileScale : mid ? 0.5 : 0.88);
      group.position.x = narrow ? 0 : mid ? 1.62 : 1.18;
      group.position.y = narrow ? 0 : mid ? 0.04 : -0.04;
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(mountNode);

    let alive = true;
    const fontTask = document.fonts?.ready?.then(() => {
      if (alive) redraw();
    });
    void fontTask;

    let elapsed = reduced ? 0.4 : 0;
    let lastIndex = -1;
    let jumped = true;
    let painted = false;
    let suppressMorph = false;
    let raf = 0;
    let last = performance.now();

    const seekTo = (index) => {
      const next = ((index % 3) + 3) % 3;
      elapsed = next * STAGE_SECONDS + 0.001;
      jumped = true;
      suppressMorph = true;
    };
    if (seekRef) seekRef.current = seekTo;

    const frame = (dt) => {
      if (!reduced) elapsed += dt;
      current.x += (pointer.x - current.x) * 0.055;
      current.y += (pointer.y - current.y) * 0.055;
      const scroll = window.__lenis?.scroll ?? window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollT = Math.min(1, Math.max(0, scroll / max));
      const yaw = reduced ? 0.34 : 0.34 + Math.sin(elapsed * 0.5) * 0.22;
      const pitch = reduced ? 0.05 : Math.sin(elapsed * 0.33) * 0.08;
      group.rotation.y = yaw + current.x * 0.28;
      group.rotation.x = pitch - current.y * 0.16 + scrollT * 0.1;
      uTime.value = reduced ? 0.4 : elapsed;

      const posed = stageAt(elapsed);
      mixPositions(stages[posed.index], stages[posed.next], reduced ? 0 : posed.smooth);
      const bell = 4 * posed.smooth * (1 - posed.smooth);
      const flash = 1 + bell * 0.8;
      fillRibbon(ribbonA, stages[posed.index].edges);
      ribbonA.material.uniforms.uFade.value = reduced ? 1 : (1 - posed.smooth) * flash;
      if (!reduced && posed.smooth > 0.001) {
        fillRibbon(ribbonB, stages[posed.next].edges);
        ribbonB.material.uniforms.uFade.value = posed.smooth * flash;
      } else {
        ribbonB.visible = false;
      }

      if (jumped || posed.index !== lastIndex) {
        const prev = lastIndex;
        const manual = suppressMorph;
        lastIndex = posed.index;
        jumped = false;
        suppressMorph = false;
        if (prev !== -1 && !manual && visible && !reduced) soundFX.playStageMorph(posed.index);
        onPhaseRef.current?.({ index: posed.index });
      }

      renderer.setRenderTarget(rt);
      renderer.setClearColor(0x000000, 1);
      renderer.clear(true, false, false);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.setClearColor(0x000000, 0);
      renderer.clear(true, false, false);
      renderer.render(postScene, postCamera);
      painted = true;
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if ((document.hidden || !visible) && !jumped) return;
      if (reduced && painted && !jumped) return;
      frame(dt);
    };

    if (reduced) frame(0);
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      if (seekRef) seekRef.current = null;
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
      io.disconnect();
      pointsGeo.dispose();
      pointsMat.dispose();
      ribbonA.geometry.dispose();
      ribbonB.geometry.dispose();
      ribbonA.material.dispose();
      ribbonB.material.dispose();
      postQuad.geometry.dispose();
      postQuad.material.dispose();
      texture.dispose();
      rt.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mountNode) mountNode.removeChild(renderer.domElement);
    };
  }, [theme, seekRef]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
