import React, { useEffect, useRef } from 'react';
import { soundFX } from '../lib/soundFX';

/**
 * Footer river: a 3D ASCII school under a high waterline,
 * with dolphins that breach, arc, and dive nose-first.
 * +y is up. +z is toward the viewer. No emoticon glyphs.
 */

const FISH_N = 5;
const FISH_N_NARROW = 3;
const DOLPHIN_N = 2;
const DOLPHIN_N_NARROW = 1;
const RAMP = ' .:-=+*#%@';
const CREST = '~-=:.';
const Y_SURFACE = 0.35;
const HORIZON = 0.36;
const AIR_T = 1.18;
const PLUNGE_T = 1.32;
const POINTER_GAP = 240;

function hash(i) {
  const x = Math.sin(i * 91.7 + 19.2) * 17381.13;
  return x - Math.floor(x);
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function limit(vx, vy, vz, max) {
  const m = Math.hypot(vx, vy, vz);
  if (m > max && m > 0) {
    const s = max / m;
    return [vx * s, vy * s, vz * s];
  }
  return [vx, vy, vz];
}

function makeFish(i, count) {
  const lane = i - (count - 1) / 2;
  const gap = count <= 3 ? 0.56 : 0.34;
  const depths = count <= 3 ? [-0.32, -0.64, -0.96] : [-0.24, -0.46, -0.7, -0.92, -0.4];
  const homeX = lane * gap;
  const homeY = depths[i] ?? -0.6;
  return {
    x: homeX,
    y: homeY,
    z: (hash(i + 5) - 0.5) * 0.2,
    vx: 0.18,
    vy: 0,
    vz: 0.02,
    seed: hash(i + 12),
    kind: 'fish',
    heading: 0,
    bank: 0,
    homeX,
    homeY,
  };
}

function makeDolphin(i, count, narrow) {
  const travel = narrow ? 1.16 : 1.52;
  const jumpH = narrow ? 0.24 : 0.32;
  const lead = i === 0;
  return {
    x: lead ? -0.35 : 0.28,
    y: lead ? Y_SURFACE + jumpH * 0.55 : -0.16,
    z: lead ? 0.08 : -0.1,
    vx: lead ? travel / AIR_T : -0.36,
    vy: lead ? 0.45 : 0,
    vz: 0,
    seed: hash(i + 21),
    bank: 0,
    bend: lead ? 0.78 : 0.16,
    fin: narrow ? 0.34 : 0.48,
    glideY: i === 0 ? -0.22 : -0.34,
    travel,
    jumpH,
    mode: lead ? 'air' : 'glide',
    glideLeft: 2.15 + i * 0.45,
    risePitch: 0,
    airU: lead ? 0.22 : 0,
    launchX: narrow ? -0.48 : -0.7,
    arcTravel: travel,
    arcH: jumpH,
    entryX: 0.4,
    plungeU: 0,
    aimX: null,
  };
}

function makeBubble(i) {
  return {
    x: (hash(i + 40) - 0.5) * 1.7,
    y: -0.2 - hash(i + 41) * 0.85,
    z: (hash(i + 42) - 0.5) * 0.45,
    v: 0.08 + hash(i + 43) * 0.1,
  };
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const pick = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  return {
    fg: pick('--color-fg', '#E8EEF6'),
    accent: pick('--color-accent', '#79D0E0'),
    deep: pick('--color-accent-deep', '#2A8FA0'),
  };
}

function updateAttitude(agent, dt) {
  const heading = Math.atan2(agent.vz, agent.vx);
  let delta = heading - agent.heading;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  const rate = delta / Math.max(0.008, dt);
  const target = Math.max(-0.7, Math.min(0.7, rate * 0.18));
  agent.bank += (target - agent.bank) * Math.min(1, dt * 5);
  agent.heading = heading;
}

function boundRange(value, min, max) {
  if (value < min) return (min - value) * 2.4;
  if (value > max) return (max - value) * 2.4;
  return 0;
}

function stepFish(agent, flock, other, dt, cursor, time) {
  let sx = 0;
  let sy = 0;
  let sz = 0;
  let ax = 0;
  let ay = 0;
  let az = 0;
  let cx = 0;
  let cy = 0;
  let cz = 0;
  let n = 0;

  for (let i = 0; i < flock.length; i += 1) {
    const o = flock[i];
    if (o === agent) continue;
    const dx = agent.x - o.x;
    const dy = agent.y - o.y;
    const dz = agent.z - o.z;
    const d = Math.hypot(dx, dy, dz);
    if (d < 1.35 && d > 1e-4) {
      if (d < 0.9) {
        sx += dx / d;
        sy += dy / d;
        sz += dz / d;
      }
      ax += o.vx;
      ay += o.vy;
      az += o.vz;
      cx += o.x;
      cy += o.y;
      cz += o.z;
      n += 1;
    }
  }

  let fx = sx * 2.2;
  let fy = sy * 2.2;
  let fz = sz * 2.2;
  if (n > 0) {
    fx += (ax / n - agent.vx) * 0.4;
    fy += (ay / n - agent.vy) * 0.4;
    fz += (az / n - agent.vz) * 0.4;
    fx += (cx / n - agent.x) * 0.04;
    fy += (cy / n - agent.y) * 0.04;
    fz += (cz / n - agent.z) * 0.04;
  }

  for (let i = 0; i < other.length; i += 1) {
    const o = other[i];
    const dx = agent.x - o.x;
    const dy = agent.y - o.y;
    const dz = agent.z - o.z;
    const d = Math.hypot(dx, dy, dz);
    if (d < 0.16 && d > 1e-4) {
      fx += (dx / d) * 0.8;
      fy += (dy / d) * 0.8;
      fz += (dz / d) * 0.8;
    }
  }

  fy += (agent.homeY - agent.y) * 2.4;
  fx += (agent.homeX - agent.x) * 2.2;
  fx += Math.sin(time * 0.85 + agent.seed * 9) * 0.18;
  fy += Math.sin(time * 0.7 + agent.seed * 12) * 0.08;
  fz -= agent.vz * 1.1;
  fx += (0.18 - agent.vx) * 1.6;
  fy += boundRange(agent.y, -1.05, 0.02);
  fz += boundRange(agent.z, -0.55, 0.55);

  if (cursor) {
    const dx = cursor.x - agent.x;
    const dy = cursor.y - agent.y;
    const d = Math.hypot(dx, dy) + 0.0001;
    if (d < 0.9) {
      const push = d < 0.16 ? -1.25 : 0.42;
      fx += (dx / d) * push;
      fy += (dy / d) * push;
      const swirl = (1 - d / 0.9) * 0.62;
      fx += (-dy / d) * swirl;
      fy += (dx / d) * swirl;
    }
  }

  [fx, fy, fz] = limit(fx, fy, fz, 2.3);
  const vx = agent.vx + fx * dt;
  const vy = agent.vy + fy * dt;
  const vz = agent.vz + fz * dt;
  const [lx, ly, lz] = limit(vx, vy, vz, 0.36);
  agent.vx = lx;
  agent.vy = ly;
  agent.vz = lz;
  agent.x += agent.vx * dt;
  agent.y += agent.vy * dt;
  agent.z += agent.vz * dt;
  if (agent.x > 0.92) agent.x = 0.92;
  if (agent.x < -0.92) agent.x = -0.92;
  if (agent.y > 0.02) agent.y = 0.02;
  if (agent.y < -1.05) agent.y = -1.05;
  updateAttitude(agent, dt);
}

function updateDolphin(d, dt, time) {
  if (d.mode === 'glide') {
    const goingBack = d.x > -0.18;
    const targetVx = goingBack ? -0.38 : 0.24;
    d.vx += (targetVx - d.vx) * Math.min(1, dt * 3);
    d.vy += (0 - d.vy) * Math.min(1, dt * 3);
    d.vz = 0.01;
    d.x += d.vx * dt;
    const bob = Math.sin(time * 2.1 + d.seed * 6) * 0.016;
    d.y += (d.glideY + bob - d.y) * Math.min(1, dt * 2.4);
    d.bend = 0.16;
    d.risePitch = 0;
    if (d.glideLeft > 0) d.glideLeft -= dt;
    if (d.x < -0.18 && d.glideLeft <= 0) d.mode = 'rise';
  } else if (d.mode === 'rise') {
    d.risePitch = Math.min(0.74, (d.risePitch || 0) + dt * 1.05);
    if (d.aimX != null) {
      const desired = clamp(d.aimX - d.travel * 0.38, -0.98, 0.2);
      d.x += (desired - d.x) * Math.min(1, dt * 1.7);
    }
    const spd = 0.58;
    d.vx += (Math.cos(d.risePitch) * spd - d.vx) * Math.min(1, dt * 4);
    d.vy = Math.sin(d.risePitch) * spd;
    d.vz = 0;
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.bend = 0.25 + d.risePitch * 0.45;
    if (d.y >= Y_SURFACE) {
      d.launchX = clamp(d.x, -1.05, 0.9);
      d.arcTravel = Math.min(d.travel, Math.max(0.62, 1.02 - d.launchX));
      d.arcH = d.jumpH * (d.arcTravel / d.travel);
      d.x = d.launchX;
      d.y = Y_SURFACE;
      d.airU = 0;
      d.mode = 'air';
      d.aimX = null;
    }
  } else if (d.mode === 'air') {
    d.airU = Math.min(1, d.airU + dt / AIR_T);
    const u = d.airU;
    d.x = d.launchX + d.arcTravel * u;
    d.y = Y_SURFACE + d.arcH * 4 * u * (1 - u);
    d.vx = d.arcTravel / AIR_T;
    d.vy = (d.arcH * 4 * (1 - 2 * u)) / AIR_T;
    d.vz = 0;
    d.bend = 0.82;
    if (u >= 1) {
      d.entryX = d.x;
      d.plungeU = 0;
      d.mode = 'plunge';
    }
  } else {
    d.plungeU = Math.min(1, d.plungeU + dt / PLUNGE_T);
    const u = d.plungeU;
    const ease = u * u * (3 - 2 * u);
    d.x = d.entryX + 0.22 * u;
    d.y = (Y_SURFACE - 0.01) + (d.glideY - (Y_SURFACE - 0.01)) * ease;
    const pitch = -0.78 * (1 - ease);
    d.vx = Math.cos(pitch) * 0.46;
    d.vy = Math.sin(pitch) * 0.46;
    d.vz = 0;
    d.bend = 0.32 * (1 - u);
    if (u >= 1) {
      d.mode = 'glide';
      d.glideLeft = 2.5 + d.seed * 1.6;
      d.y = d.glideY;
      d.risePitch = 0;
    }
  }
  if (d.mode !== 'air') {
    if (d.x > 1.18) d.x = -1.05;
    if (d.x < -1.18) d.x = 1.02;
  }
  d.bank = Math.sin(time * 1.5 + d.seed * 5) * 0.07;
}

function promptBreach(dolphins, aimX) {
  const aim = clamp(aimX, -0.8, 0.75);
  let pick = null;
  for (let i = 0; i < dolphins.length; i += 1) {
    const d = dolphins[i];
    if (d.mode === 'air') continue;
    if (!pick || d.mode === 'glide' || (d.mode === 'rise' && pick.mode === 'plunge')) pick = d;
  }
  const target = pick || dolphins[0];
  target.aimX = aim;
  if (target.mode === 'glide' || target.mode === 'plunge') {
    target.mode = 'rise';
    target.risePitch = Math.max(target.risePitch || 0, 0.18);
  }
}

function fishPose(time, seed) {
  const phase = seed * 6.283185;
  const swim = 4.8 + seed * 1.4;
  const lateral = (s) => (0.004 + 0.14 * s * s) * Math.sin(s * Math.PI * 1.15 - time * swim + phase);
  const spine = [];
  for (let i = 0; i <= 9; i += 1) {
    const s = i / 9;
    const x = 0.24 - s * 0.5;
    let girth = 0.2;
    if (s < 0.14) girth = 0.16 + (s / 0.14) * 0.55;
    else if (s < 0.62) girth = 0.95 - ((s - 0.34) / 0.3) ** 2 * 0.28;
    else girth = 0.34 * (1 - (s - 0.62) / 0.38) + 0.1;
    spine.push([x, 0, lateral(s), Math.max(0.1, girth)]);
  }
  const mid = spine[3];
  const shoulder = spine[2];
  const dorsal = [
    [mid[0] + 0.02, 0.01, mid[2], 0.2],
    [mid[0] - 0.02, 0.2, mid[2], 0.1],
    [mid[0] - 0.08, 0.05, lateral(0.55), 0.06],
  ];
  const pec = (sign) => [
    [shoulder[0], -0.02, shoulder[2], 0.16],
    [shoulder[0] - 0.08, -0.08, shoulder[2] + sign * 0.08, 0.05],
  ];
  const tail = spine[spine.length - 1];
  const fork = (y) => [
    [tail[0] + 0.01, 0, tail[2], 0.1],
    [tail[0] - 0.09, y, tail[2] * 0.4, 0.045],
  ];
  return { spine, dorsal, pecL: pec(1), pecR: pec(-1), forkU: fork(0.32), forkD: fork(-0.3) };
}

function dolphinPose(time, seed, bend, fin) {
  const phase = seed * 6.283185;
  const swim = 6.4 + seed * 1.1;
  const span = 0.84;
  const nose = 0.4;
  const undulate = (s) => (0.008 + 0.16 * s * s * s) * Math.sin(s * Math.PI * 1.25 - time * swim + phase);
  const spine = [];
  for (let i = 0; i <= 12; i += 1) {
    const s = i / 12;
    const x = nose - s * span;
    let girth = 0.16;
    if (s < 0.18) girth = 0.04 + (s / 0.18) * 0.1;
    else if (s < 0.32) {
      const m = (s - 0.18) / 0.14;
      girth = 0.14 + Math.sin(m * Math.PI * 0.5) * 0.78;
    } else if (s < 0.66) {
      const m = (s - 0.42) / 0.24;
      girth = 0.94 - m * m * 0.24;
    } else {
      girth = 0.55 * (1 - (s - 0.66) / 0.34) + 0.05;
    }
    const y = undulate(s) - bend * 0.22 * x * x;
    spine.push([x, y, 0, Math.max(0.05, girth)]);
  }
  const at = (s) => {
    const x = nose - s * span;
    return [x, undulate(s) - bend * 0.22 * x * x];
  };
  const [dx, dy] = at(0.44);
  const dorsal = [
    [dx + 0.03, dy + 0.03, 0, 0.26],
    [dx - 0.02, dy + fin * 0.58, 0, 0.2],
    [dx - 0.1, dy + fin, 0, 0.14],
    [dx - 0.22, dy + fin * 0.58, 0, 0.1],
    [dx - 0.3, dy + fin * 0.16, 0, 0.06],
  ];
  const [px, py] = at(0.3);
  const pec = (sign) => [
    [px + 0.02, py - 0.03, sign * 0.02, 0.2],
    [px - 0.05, py - 0.1, sign * 0.1, 0.1],
    [px - 0.14, py - 0.05, sign * 0.14, 0.045],
  ];
  const tail = spine[spine.length - 1];
  const fluke = (sign) => [
    [tail[0] + 0.04, tail[1], 0, 0.22],
    [tail[0] - 0.02, tail[1] + sign * 0.12, 0, 0.16],
    [tail[0] - 0.07, tail[1] + sign * (sign > 0 ? 0.3 : 0.27), 0, 0.09],
  ];
  const belly = spine.map((p) => [p[0], p[1] - p[3] * 0.22, 0, Math.max(0.05, p[3] * 0.62)]);
  const ridge = spine.map((p) => [p[0], p[1] + p[3] * 0.16, 0, Math.max(0.04, p[3] * 0.38)]);
  return { spine, belly, ridge, dorsal, pecL: pec(1), pecR: pec(-1), flukeU: fluke(1), flukeD: fluke(-1) };
}

function facingOf(agent) {
  return {
    ...agent,
    vx: 0.34,
    vy: agent.vy * 0.4,
    vz: agent.vz * 0.3 + 0.02,
  };
}

function basisOf(agent, viewYaw) {
  let fx = agent.vx;
  let fy = agent.vy;
  let fz = agent.vz;
  const fl = Math.hypot(fx, fy, fz);
  if (fl < 1e-4) {
    fx = 1;
    fy = 0;
    fz = 0;
  } else {
    fx /= fl;
    fy /= fl;
    fz /= fl;
  }

  let rx = 1;
  let ry = 0;
  let rz = 0;
  if (Math.hypot(fx, fz) >= 0.08) {
    rx = fz;
    rz = -fx;
    const rl = Math.hypot(rx, rz) || 1;
    rx /= rl;
    rz /= rl;
  }
  let ux = fy * rz - fz * ry;
  let uy = fz * rx - fx * rz;
  let uz = fx * ry - fy * rx;
  const cb = Math.cos(agent.bank || 0);
  const sb = Math.sin(agent.bank || 0);
  const brx = rx * cb + ux * sb;
  const bry = ry * cb + uy * sb;
  const brz = rz * cb + uz * sb;
  const bux = ux * cb - rx * sb;
  const buy = uy * cb - ry * sb;
  const buz = uz * cb - rz * sb;

  const cy = Math.cos(viewYaw);
  const sy = Math.sin(viewYaw);
  const rotY = (x, y, z) => [x * cy + z * sy, y, -x * sy + z * cy];
  const f = rotY(fx, fy, fz);
  const r = rotY(brx, bry, brz);
  const u = rotY(bux, buy, buz);
  return {
    fx: f[0], fy: f[1], fz: f[2],
    rx: r[0], ry: r[1], rz: r[2],
    ux: u[0], uy: u[1], uz: u[2],
  };
}

export default function FooterAsciiLife({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 767px)').matches;
    const fishCount = narrow ? FISH_N_NARROW : FISH_N;
    const dolphinCount = narrow ? DOLPHIN_N_NARROW : DOLPHIN_N;
    const fish = Array.from({ length: fishCount }, (_, i) => makeFish(i, fishCount));
    const dolphins = Array.from({ length: dolphinCount }, (_, i) => makeDolphin(i, dolphinCount, narrow));
    const bubbles = Array.from({ length: narrow ? 10 : 18 }, (_, i) => makeBubble(i));
    const ripples = [];
    const motes = [];
    const trails = [];
    const colors = { current: readColors() };
    const cursor = { x: 0, y: 0, on: false, upper: false };
    let lum = new Float32Array(0);
    let depth = new Float32Array(0);
    let tint = new Uint8Array(0);
    let gridCols = 0;
    let gridRows = 0;
    let visible = true;
    let alive = true;
    let raf = 0;
    let lastPointerSound = 0;
    let lastAutoBreach = 0;
    let lastAutoSplash = 0;

    const addRipple = (x, power, time) => {
      ripples.push({ x, born: time, life: 1.55, speed: 0.78, amp: 2.15 * power });
      if (ripples.length > 8) ripples.shift();
    };

    const addBurst = (x, y, kind) => {
      const splash = kind === 'splash';
      const n = splash ? 16 : 12;
      for (let i = 0; i < n; i += 1) {
        const ang = Math.PI * 0.5 + (hash(i + 70) - 0.5) * (splash ? 2.3 : 1.15);
        const sp = (splash ? 0.4 : 0.48) + hash(i + 80) * (splash ? 0.95 : 0.7);
        motes.push({
          x: x + (hash(i + 3) - 0.5) * 0.08,
          y,
          z: (hash(i + 8) - 0.5) * 0.16,
          vx: Math.cos(ang) * sp * (splash ? 1 : 0.55),
          vy: Math.abs(Math.sin(ang)) * sp,
          life: splash ? 0.72 : 0.55,
          age: 0,
          lum: splash ? 0.55 + hash(i + 15) * 0.45 : 0.34 + hash(i + 16) * 0.4,
        });
      }
      if (motes.length > 48) motes.splice(0, motes.length - 48);
    };

    const addTrail = (x, y) => {
      for (let i = 0; i < 4; i += 1) {
        trails.push({
          x: x + (hash(i + 11) - 0.5) * 0.14,
          y: y - 0.03 - i * 0.045,
          z: (hash(i + 19) - 0.5) * 0.1,
          v: 0.16 + i * 0.05,
          life: 1.35,
          age: 0,
        });
      }
      if (trails.length > 24) trails.splice(0, trails.length - 24);
    };

    const cue = (kind) => {
      if (reduced || !visible || soundFX.isMuted()) return;
      const now = performance.now();
      if (kind === 'breach') {
        if (now - lastAutoBreach < 2800 || now - lastPointerSound < 520) return;
        lastAutoBreach = now;
        soundFX.playDolphinBreach(0.8);
      } else if (now - lastAutoSplash >= 2000) {
        lastAutoSplash = now;
        soundFX.playDolphinSplash(0.8);
      }
    };

    const paint = (time) => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.max(1, Math.floor(w * dpr));
      const bh = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      const cols = Math.max(12, Math.round(w / 8));
      const rows = Math.max(10, Math.round(h / 8));
      const cellX = w / cols;
      const cellY = h / rows;
      if (cols !== gridCols || rows !== gridRows) {
        gridCols = cols;
        gridRows = rows;
        lum = new Float32Array(cols * rows);
        depth = new Float32Array(cols * rows);
        tint = new Uint8Array(cols * rows);
      } else {
        lum.fill(0);
        tint.fill(0);
      }
      depth.fill(-9);

      const horizonBase = Math.floor(rows * HORIZON);
      for (let c = 0; c < cols; c += 1) {
        const worldX = ((c + 0.5) / cols - 0.5) / 0.42;
        let disp = Math.sin(worldX * 7.4 + time * 1.35) * 0.62
          + Math.sin(worldX * 15.2 - time * 1.85) * 0.28;
        for (let i = 0; i < ripples.length; i += 1) {
          const rip = ripples[i];
          const age = time - rip.born;
          if (age < 0 || age > rip.life) continue;
          const radius = age * rip.speed;
          const dist = Math.abs(worldX - rip.x);
          const ring = Math.exp(-((dist - radius) ** 2) / (0.018 + age * 0.03));
          disp += Math.sin(age * 16) * ring * rip.amp * (1 - age / rip.life);
        }
        const layers = [
          { drow: -1, lum: 0.24 },
          { drow: 0, lum: 0.66 },
          { drow: 1, lum: 0.36 },
        ];
        for (let i = 0; i < layers.length; i += 1) {
          const layer = layers[i];
          const row = horizonBase + layer.drow + Math.round(disp * (layer.drow === 0 ? 1 : 0.65));
          if (row < 0 || row >= rows) continue;
          const idx = row * cols + c;
          if (layer.lum >= lum[idx]) {
            lum[idx] = layer.lum;
            tint[idx] = 4;
            depth[idx] = -1.15;
          }
        }
      }
      for (let r = horizonBase + 2; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const crest = Math.sin(c * 0.48 + time * 1.05) * Math.sin(r * 0.28 - time * 0.58);
          if (crest < 0.78) continue;
          const idx = r * cols + c;
          lum[idx] = (crest - 0.78) * 1.2;
          tint[idx] = 3;
          depth[idx] = -1.5;
        }
      }

      const splat = (x, y, z, value, rad, kind) => {
        const denom = 2.6 - z;
        if (denom < 0.3 || value < 0.08) return;
        const s = 2.6 / denom;
        const sx = (0.5 + x * s * 0.42) * w;
        const sy = (0.5 - y * s * 0.4) * h;
        const radPx = Math.max(Math.min(cellX, cellY) * 0.62, rad * s * 0.4 * h);
        const c0 = Math.max(0, Math.floor((sx - radPx) / cellX));
        const c1 = Math.min(cols - 1, Math.ceil((sx + radPx) / cellX));
        const r0 = Math.max(0, Math.floor((sy - radPx) / cellY));
        const r1 = Math.min(rows - 1, Math.ceil((sy + radPx) / cellY));
        for (let r = r0; r <= r1; r += 1) {
          for (let c = c0; c <= c1; c += 1) {
            const px = (c + 0.5) * cellX;
            const py = (r + 0.5) * cellY;
            const dist = Math.hypot(px - sx, py - sy) / radPx;
            if (dist > 1) continue;
            const v = value * (1 - dist * dist);
            if (v < 0.08) continue;
            const idx = r * cols + c;
            const brighter = z > depth[idx] - 0.02 && v > lum[idx];
            const occludes = z > depth[idx] + 0.08 && v > 0.22;
            if (brighter || occludes) {
              lum[idx] = v;
              depth[idx] = z;
              tint[idx] = kind;
            }
          }
        }
      };

      for (let i = 0; i < bubbles.length; i += 1) {
        const bubble = bubbles[i];
        splat(bubble.x, bubble.y, bubble.z, 0.4, 0.016, 3);
      }
      for (let i = 0; i < trails.length; i += 1) {
        const trail = trails[i];
        const fade = 1 - trail.age / trail.life;
        splat(trail.x, trail.y, trail.z, 0.5 * fade, 0.02, 3);
      }
      for (let i = 0; i < motes.length; i += 1) {
        const mote = motes[i];
        const fade = 1 - mote.age / mote.life;
        splat(mote.x, mote.y, mote.z + 0.2, mote.lum * fade, 0.02, 5);
      }

      const unit = Math.min(cellX, cellY);
      // Cell size stays ~8px while body length tracks canvas width.
      // Scale stamp radius with width so a wide stage stays solid, not skeletal.
      const bulk = Math.max(1, Math.min(1.65, w / 560));
      const place = (agent, basis, p) => {
        const ox = basis.fx * p[0] + basis.ux * p[1] + basis.rx * p[2];
        const oy = basis.fy * p[0] + basis.uy * p[1] + basis.ry * p[2];
        const oz = basis.fz * p[0] + basis.uz * p[1] + basis.rz * p[2];
        const yLift = oy + oz * 0.72;
        const zDepth = oz * 0.35;
        const x = agent.x + ox;
        const y = agent.y + yLift;
        const z = agent.z * 0.25 + zDepth;
        const persp = 2.6 / Math.max(0.35, 2.6 - z);
        return {
          z,
          persp,
          sx: (0.5 + x * persp * 0.42) * w,
          sy: (0.5 - y * persp * 0.4) * h,
          girth: p[3],
        };
      };
      const stamp = (sx, sy, z, radPx, value, kind) => {
        if (value < 0.08 || radPx < 0.5) return;
        const c0 = Math.max(0, Math.floor((sx - radPx) / cellX));
        const c1 = Math.min(cols - 1, Math.ceil((sx + radPx) / cellX));
        const r0 = Math.max(0, Math.floor((sy - radPx) / cellY));
        const r1 = Math.min(rows - 1, Math.ceil((sy + radPx) / cellY));
        for (let r = r0; r <= r1; r += 1) {
          for (let c = c0; c <= c1; c += 1) {
            const px = (c + 0.5) * cellX;
            const py = (r + 0.5) * cellY;
            const dist = Math.hypot(px - sx, py - sy) / radPx;
            if (dist > 1) continue;
            const v = value * (1 - dist * dist);
            if (v < 0.08) continue;
            const idx = r * cols + c;
            if ((z > depth[idx] - 0.02 && v > lum[idx]) || (z > depth[idx] + 0.08 && v > 0.22)) {
              lum[idx] = v;
              depth[idx] = z;
              tint[idx] = kind;
            }
          }
        }
      };
      const stroke = (agent, basis, pts, value, kind, radiusCells) => {
        const projected = pts.map((p) => place(agent, basis, p));
        for (let i = 0; i < projected.length - 1; i += 1) {
          const a = projected[i];
          const b = projected[i + 1];
          const dist = Math.hypot(b.sx - a.sx, b.sy - a.sy);
          const steps = Math.max(1, Math.ceil(dist / (unit * 0.42)));
          for (let s = 0; s <= steps; s += 1) {
            const t = s / steps;
            const girth = a.girth + (b.girth - a.girth) * t;
            const persp = a.persp + (b.persp - a.persp) * t;
            stamp(
              a.sx + (b.sx - a.sx) * t,
              a.sy + (b.sy - a.sy) * t,
              a.z + (b.z - a.z) * t,
              Math.max(unit * 0.42, girth * radiusCells * unit * persp) * bulk,
              value,
              kind,
            );
          }
        }
      };

      const drawList = fish.concat(dolphins);
      drawList.sort((a, b) => a.z - b.z);
      for (let i = 0; i < drawList.length; i += 1) {
        const agent = drawList[i];
        if (agent.kind === 'fish') {
          const basis = basisOf(facingOf(agent), 0.16);
          const pose = fishPose(time, agent.seed);
          stroke(agent, basis, pose.spine, 1, 2, 1.65);
          stroke(agent, basis, pose.dorsal, 0.72, 2, 0.8);
          stroke(agent, basis, pose.pecL, 0.4, 2, 0.55);
          stroke(agent, basis, pose.pecR, 0.4, 2, 0.55);
          stroke(agent, basis, pose.forkU, 0.66, 2, 0.6);
          stroke(agent, basis, pose.forkD, 0.66, 2, 0.6);
        } else {
          const basis = basisOf(agent, 0);
          const pose = dolphinPose(time, agent.seed, agent.bend, agent.fin);
          stroke(agent, basis, pose.belly, 0.32, 1, 1.6);
          stroke(agent, basis, pose.spine, 0.56, 1, 2.6);
          stroke(agent, basis, pose.ridge, 0.96, 1, 1.3);
          stroke(agent, basis, pose.dorsal, 0.9, 1, 1.15);
          stroke(agent, basis, pose.pecL, 0.42, 1, 0.85);
          stroke(agent, basis, pose.pecR, 0.42, 1, 0.85);
          stroke(agent, basis, pose.flukeU, 0.74, 1, 1.45);
          stroke(agent, basis, pose.flukeD, 0.74, 1, 1.45);
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${Math.max(7, Math.round(Math.min(cellX, cellY) * 1.15))}px "DM Mono", ui-monospace, monospace`;
      const palette = colors.current;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const idx = r * cols + c;
          const value = lum[idx];
          const kind = tint[idx];
          if (value < 0.08 || kind === 0) continue;
          let glyph;
          if (kind === 4) {
            const flow = Math.floor(time * 5 + c * 0.85);
            const bias = value > 0.5 ? 0 : value > 0.32 ? 2 : 3;
            glyph = CREST[(flow + bias) % CREST.length];
          } else {
            const gi = Math.max(1, Math.min(RAMP.length - 1, Math.round(value * (RAMP.length - 1))));
            glyph = RAMP[gi];
            if (glyph === ' ') continue;
          }
          if (kind === 1) ctx.fillStyle = value > 0.62 ? palette.fg : palette.accent;
          else if (kind === 2) ctx.fillStyle = value > 0.58 ? palette.accent : palette.deep;
          else if (kind === 5) ctx.fillStyle = value > 0.55 ? palette.fg : palette.accent;
          else ctx.fillStyle = palette.accent;
          if (kind === 3) ctx.globalAlpha = 0.2 + value * 0.4;
          else if (kind === 4) ctx.globalAlpha = 0.42 + value * 0.45;
          else if (kind === 5) ctx.globalAlpha = 0.5 + value * 0.45;
          else ctx.globalAlpha = 0.62 + Math.min(0.38, value * 0.38);
          ctx.fillText(glyph, (c + 0.5) * cellX, (r + 0.5) * cellY);
        }
      }
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      const lead = dolphins[0];
      lead.mode = 'air';
      lead.airU = 0.5;
      lead.launchX = narrow ? -0.42 : -0.66;
      lead.arcTravel = lead.travel;
      lead.arcH = lead.jumpH;
      lead.bend = 0.82;
    }
    dolphins.forEach((d) => updateDolphin(d, 0, reduced ? 1.15 : 0));

    const layout = () => paint(reduced ? 1.15 : 0);
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.02 });
    io.observe(canvas);

    const pointerWorld = (event, rect) => {
      const fx = (event.clientX - rect.left) / Math.max(1, rect.width);
      const fy = (event.clientY - rect.top) / Math.max(1, rect.height);
      return {
        x: (fx - 0.5) / 0.42,
        y: (0.5 - fy) / 0.4,
        upper: fy < 0.42,
        inside: fx >= 0 && fx <= 1 && fy >= 0 && fy <= 1,
      };
    };

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      const point = pointerWorld(event, rect);
      cursor.on = point.inside;
      cursor.upper = point.upper;
      if (!point.inside) return;
      cursor.x = point.x;
      cursor.y = point.y;
      const now = performance.now();
      if (!event.movementX && !event.movementY) return;
      const moved = Math.hypot(event.movementX, event.movementY);
      if (moved < 12 || now - lastPointerSound < POINTER_GAP) {
        if (point.upper && moved >= 12) promptBreach(dolphins, point.x);
        return;
      }
      lastPointerSound = now;
      const amount = 0.55 + Math.min(0.45, moved / 80);
      if (point.upper) {
        promptBreach(dolphins, point.x);
        if (visible && !soundFX.isMuted()) soundFX.playDolphinBreach(amount);
      } else if (visible && !soundFX.isMuted()) {
        soundFX.playFishSchool(amount);
      }
    };
    const onDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const point = pointerWorld(event, rect);
      if (!point.inside) return;
      cursor.on = true;
      cursor.x = point.x;
      cursor.y = point.y;
      cursor.upper = point.upper;
      if (point.upper) promptBreach(dolphins, point.x);
      const now = performance.now();
      if (now - lastPointerSound < POINTER_GAP) return;
      lastPointerSound = now;
      if (!visible || soundFX.isMuted()) return;
      if (point.upper) soundFX.playDolphinBreach(0.85);
      else soundFX.playFishSchool(0.85);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    canvas.addEventListener('pointerdown', onDown);

    const fontTask = document.fonts?.ready?.then(() => {
      if (alive) colors.current = readColors();
    });
    void fontTask;

    if (reduced) {
      paint(1.15);
    } else {
      let last = performance.now();
      const loop = (now) => {
        raf = requestAnimationFrame(loop);
        if (document.hidden || !visible) {
          last = now;
          return;
        }
        const dt = Math.min(0.033, (now - last) / 1000);
        last = now;
        const t = now / 1000;
        const aim = cursor.on && !cursor.upper ? cursor : null;
        const submerged = dolphins.filter((d) => d.y < Y_SURFACE - 0.02);
        for (let i = 0; i < fish.length; i += 1) stepFish(fish[i], fish, submerged, dt, aim, t);
        for (let i = 0; i < dolphins.length; i += 1) {
          const d = dolphins[i];
          const prev = d.mode;
          updateDolphin(d, dt, t);
          if (d.mode === 'air' && prev !== 'air') {
            addBurst(d.x, Y_SURFACE, 'breach');
            addRipple(d.x, 0.72, t);
            cue('breach');
          } else if (d.mode === 'plunge' && prev === 'air') {
            addBurst(d.x, Y_SURFACE, 'splash');
            addRipple(d.x, 1, t);
            addTrail(d.x, Y_SURFACE - 0.03);
            cue('splash');
          }
        }
        for (let i = 0; i < bubbles.length; i += 1) {
          const bubble = bubbles[i];
          bubble.y += bubble.v * dt;
          if (bubble.y > Y_SURFACE - 0.05) {
            bubble.y = -1.02;
            bubble.x = (hash(i + Math.floor(t * 3) + 40) - 0.5) * 1.7;
          }
        }
        for (let i = motes.length - 1; i >= 0; i -= 1) {
          const mote = motes[i];
          mote.age += dt;
          mote.vy -= 1.85 * dt;
          mote.x += mote.vx * dt;
          mote.y += mote.vy * dt;
          if (mote.age >= mote.life) motes.splice(i, 1);
        }
        for (let i = trails.length - 1; i >= 0; i -= 1) {
          const trail = trails[i];
          trail.age += dt;
          trail.y += trail.v * dt;
          if (trail.age >= trail.life || trail.y > Y_SURFACE - 0.03) trails.splice(i, 1);
        }
        for (let i = ripples.length - 1; i >= 0; i -= 1) {
          if (t - ripples[i].born > ripples[i].life) ripples.splice(i, 1);
        }
        paint(t);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, [theme]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      role="img"
      aria-label="ASCII river with breaching dolphins above a school of fish"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
