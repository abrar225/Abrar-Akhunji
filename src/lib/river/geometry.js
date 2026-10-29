// Recovered from abrar225/Abrar-Akhunji, blob 8f976978b9b4c3d699197d0753780943fe639658.
export function fishPose(time, seed) {
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

export function dolphinPose(time, seed, bend, fin) {
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

export function facingOf(agent) {
  const fx = agent.faceX ?? agent.vx;
  const fy = agent.faceY ?? agent.vy;
  const fz = agent.faceZ ?? agent.vz;
  if (Math.hypot(fx, fy, fz) < 0.04) {
    return {
      ...agent,
      vx: Math.cos(agent.heading || 0) * 0.28,
      vy: fy,
      vz: Math.sin(agent.heading || 0) * 0.28,
    };
  }
  return {
    ...agent,
    vx: fx,
    vy: fy,
    vz: fz,
  };
}

export function basisOf(agent, viewYaw) {
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

