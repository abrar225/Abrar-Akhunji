/**
 * Three hero topologies for the ASCII field.
 * Local space is y-up. Signal flows toward +x.
 * Each stage is a diagram in the camera plane (the camera sits on +z).
 * Layers sit on a shallow z shelf so yaw reads as depth without stacking into a cloud.
 * Every stage uses the same particle count so positions morph by index.
 * Hold 2.55s, morph 0.85s — one stage is 3.4s.
 */

export const HOLD_SECONDS = 2.55;
export const MORPH_SECONDS = 0.85;
export const STAGE_SECONDS = HOLD_SECONDS + MORPH_SECONDS;

const TAU = Math.PI * 2;

function setP(pos, i, x, y, z) {
  const o = i * 3;
  pos[o] = x;
  pos[o + 1] = y;
  pos[o + 2] = z;
}

function createLinker(count, cap = 4000) {
  const list = [];
  const seen = new Set();
  return {
    add(a, b) {
      if (list.length >= cap * 2) return;
      if (a === b || a < 0 || b < 0 || a >= count || b >= count) return;
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const key = `${lo}:${hi}`;
      if (seen.has(key)) return;
      seen.add(key);
      list.push(a, b);
    },
    done() {
      return Uint16Array.from(list);
    },
  };
}

function span(i, count) {
  return count <= 1 ? 0.5 : i / (count - 1);
}

function cycle(link, start, count) {
  for (let i = 0; i < count; i += 1) link.add(start + i, start + ((i + 1) % count));
}

function column(pos, hot, start, count, x, y0, y1, heat, zAmp = 0.14, z0 = 0) {
  for (let i = 0; i < count; i += 1) {
    const t = span(i, count);
    setP(pos, start + i, x, y0 + (y1 - y0) * t, z0 + Math.sin(t * Math.PI) * zAmp);
    hot[start + i] = heat;
  }
}

function spine(link, start, count) {
  for (let i = 0; i < count - 1; i += 1) link.add(start + i, start + i + 1);
}

function ring(pos, hot, start, count, cx, radius, heat, zAmp = 0.16, z0 = 0) {
  for (let i = 0; i < count; i += 1) {
    const a = (i / Math.max(1, count)) * TAU;
    setP(
      pos,
      start + i,
      cx + Math.cos(a) * radius,
      Math.sin(a) * radius,
      z0 + Math.sin(a * 2) * zAmp,
    );
    hot[start + i] = heat;
  }
}

function slot(n, ratio, min, multiple) {
  const raw = Math.max(min, Math.round((n * ratio) / multiple) * multiple);
  return raw;
}

function budget(n) {
  let tok = slot(n, 0.07, 6, 1);
  let attn = slot(n, 0.14, 12, 2);
  let exp = slot(n, 0.36, 20, 4);
  let out = n - tok - attn - exp;
  while (out < 8 && exp > 20) {
    exp -= 4;
    out = n - tok - attn - exp;
  }
  while (out < 8 && attn > 12) {
    attn -= 2;
    out = n - tok - attn - exp;
  }
  if (out < 4) {
    tok = Math.max(4, tok - (4 - out));
    out = n - tok - attn - exp;
  }

  let client = slot(n, 0.07, 6, 1);
  let ringN = slot(n, 0.15, 12, 2);
  let wall = slot(n, 0.22, 16, 4);
  let noise = slot(n, 0.05, 4, 2);
  let back = n - client - ringN - wall - noise;
  while (back < 8 && wall > 16) {
    wall -= 4;
    back = n - client - ringN - wall - noise;
  }
  while (back < 8 && ringN > 12) {
    ringN -= 2;
    back = n - client - ringN - wall - noise;
  }
  if (back < 6) {
    client = Math.max(4, client - (6 - back));
    back = n - client - ringN - wall - noise;
  }

  let shell = slot(n, 0.08, 6, 1);
  const patchMultiple = n >= 60 ? 6 : 4;
  let patch = slot(n, 0.34, patchMultiple * 2, patchMultiple);
  let core = slot(n, 0.12, 8, 1);
  let loop = n - shell - patch - core;
  while (loop < 8 && patch > patchMultiple * 2) {
    patch -= patchMultiple;
    loop = n - shell - patch - core;
  }
  while (loop < 8 && core > 8) {
    core -= 1;
    loop = n - shell - patch - core;
  }
  if (loop < 6) {
    shell = Math.max(4, shell - (6 - loop));
    loop = n - shell - patch - core;
  }

  return {
    llm: { tok, attn, exp, out },
    auth: { client, ring: ringN, wall, noise, back },
    vit: { shell, patch, core, loop },
  };
}

function layoutLlm(n) {
  const pos = new Float32Array(n * 3);
  const hot = new Float32Array(n);
  const { tok, attn, exp, out } = budget(n).llm;
  const iAttn = tok;
  const iExp = tok + attn;
  const iOut = iExp + exp;
  const half = attn / 2;
  const per = exp / 4;

  column(pos, hot, 0, tok, -1.52, -0.72, 0.72, 0.55, 0.14, -0.22);
  ring(pos, hot, iAttn, half, -0.78, 0.24, 0.92, 0.16, -0.06);
  ring(pos, hot, iAttn + half, half, -0.78, 0.5, 1, 0.2, 0.04);

  for (let layer = 0; layer < 4; layer += 1) {
    const heat = layer === 1 || layer === 2 ? 0.95 : 0.4;
    column(pos, hot, iExp + layer * per, per, -0.02 + layer * 0.32, -0.66, 0.66, heat, 0.16, -0.06 + layer * 0.09);
  }

  const outCols = 2;
  const outRows = Math.ceil(out / outCols);
  for (let i = 0; i < out; i += 1) {
    const c = i % outCols;
    const r = Math.floor(i / outCols);
    const y = outRows <= 1 ? 0 : (r / (outRows - 1) - 0.5) * 0.84;
    setP(pos, iOut + i, 1.36 + c * 0.16, y, 0.26 + (c - 0.5) * 0.1);
    hot[iOut + i] = 0.78;
  }

  const link = createLinker(n);
  spine(link, 0, tok);
  cycle(link, iAttn, half);
  cycle(link, iAttn + half, half);
  for (let i = 0; i < half; i += 2) link.add(iAttn + i, iAttn + half + i);
  for (let i = 0; i < tok; i += 1) link.add(i, iAttn + half + (i % half));
  for (let i = 0; i < half; i += 2) link.add(iAttn + half + i, iExp + (i % per));
  for (let layer = 0; layer < 4; layer += 1) {
    spine(link, iExp + layer * per, per);
    if (layer < 3) {
      for (let j = 0; j < per; j += 1) link.add(iExp + layer * per + j, iExp + (layer + 1) * per + j);
    }
  }
  for (let j = 0; j < per; j += 2) link.add(iExp + 3 * per + j, iOut + (j % out));
  for (let r = 0; r < outRows; r += 1) {
    const a = iOut + r * outCols;
    if (a + 1 < iOut + out) link.add(a, a + 1);
  }
  for (let c = 0; c < outCols; c += 1) {
    for (let r = 0; r < outRows - 1; r += 1) {
      const a = iOut + r * outCols + c;
      const b = a + outCols;
      if (b < iOut + out) link.add(a, b);
    }
  }

  return { pos, edges: link.done(), hot };
}

function layoutAuth(n) {
  const pos = new Float32Array(n * 3);
  const hot = new Float32Array(n);
  const { client, ring: ringN, wall, noise, back } = budget(n).auth;
  const iRing = client;
  const iWall = client + ringN;
  const iNoise = iWall + wall;
  const iBack = iNoise + noise;
  const half = ringN / 2;
  const cols = 4;
  const rows = Math.ceil(wall / cols);

  ring(pos, hot, 0, client, -1.5, 0.2, 0.5, 0.12, -0.24);
  ring(pos, hot, iRing, half, -0.58, 0.28, 0.9, 0.16, -0.02);
  ring(pos, hot, iRing + half, half, -0.58, 0.56, 1, 0.22, 0.08);

  for (let i = 0; i < wall; i += 1) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = 0.42 + (cols === 1 ? 0 : c / (cols - 1)) * 0.26;
    const y = rows <= 1 ? 0 : (r / (rows - 1) - 0.5) * 1.42;
    const z = (c - (cols - 1) / 2) * 0.16;
    setP(pos, iWall + i, x + z * z * 4, y, z);
    hot[iWall + i] = r === Math.floor(rows / 2) ? 0.95 : 0.38;
  }

  for (let i = 0; i < noise; i += 1) {
    const side = i % 2 === 0 ? 1 : -1;
    const t = span(Math.floor(i / 2), Math.ceil(noise / 2));
    setP(pos, iNoise + i, 0.38 + t * 0.34, side * (0.96 + (i % 3) * 0.06), side * 0.22);
    hot[iNoise + i] = 0.22;
  }

  const innerN = Math.max(4, Math.floor(back / 3));
  const outerN = back - innerN;
  ring(pos, hot, iBack, innerN, 1.32, 0.16, 0.7, 0.12, 0.24);
  ring(pos, hot, iBack + innerN, outerN, 1.32, 0.36, 0.88, 0.18, 0.32);

  const link = createLinker(n);
  cycle(link, 0, client);
  cycle(link, iRing, half);
  cycle(link, iRing + half, half);
  for (let i = 0; i < half; i += 2) link.add(iRing + i, iRing + half + i);
  for (let i = 0; i < client; i += 2) link.add(i, iRing + (i % half));
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const idx = r * cols + c;
      if (idx >= wall) continue;
      if (c + 1 < cols && idx + 1 < wall) link.add(iWall + idx, iWall + idx + 1);
      if (idx + cols < wall) link.add(iWall + idx, iWall + idx + cols);
    }
  }
  for (let k = 0; k < 4; k += 1) {
    const gate = iWall + Math.min(wall - 1, 1 + k * cols);
    link.add(iRing + half + ((k * 2) % half), gate);
    link.add(gate, iBack + innerN + (k % outerN));
  }
  for (let i = 0; i < noise; i += 1) link.add(iWall + (i % wall), iNoise + i);
  cycle(link, iBack, innerN);
  cycle(link, iBack + innerN, outerN);
  for (let i = 0; i < innerN; i += 1) link.add(iBack + i, iBack + innerN + (i % outerN));

  return { pos, edges: link.done(), hot };
}

function layoutVit(n) {
  const pos = new Float32Array(n * 3);
  const hot = new Float32Array(n);
  const { shell, patch, core, loop } = budget(n).vit;
  const iPatch = shell;
  const iCore = shell + patch;
  const iLoop = iCore + core;
  const cols = n >= 60 ? 6 : 4;
  const rows = Math.ceil(patch / cols);

  ring(pos, hot, 0, shell, -1.48, 0.28, 0.46, 0.14, -0.2);

  for (let i = 0; i < patch; i += 1) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = -0.78 + (cols === 1 ? 0 : c / (cols - 1)) * 0.78;
    const y = rows <= 1 ? 0 : (r / (rows - 1) - 0.5) * 1.28;
    setP(pos, iPatch + i, x, y, ((r + c) % 2 === 0 ? 0.12 : -0.1) + c * 0.025);
    hot[iPatch + i] = 0.9;
  }

  const coreInner = Math.max(4, Math.floor(core / 3));
  const coreOuter = core - coreInner;
  ring(pos, hot, iCore, coreInner, 0.58, 0.12, 1, 0.12, 0.14);
  ring(pos, hot, iCore + coreInner, coreOuter, 0.58, 0.28, 0.84, 0.18, 0.22);

  for (let i = 0; i < loop; i += 1) {
    const a = (i / Math.max(1, loop)) * TAU;
    setP(pos, iLoop + i, 1.3 + Math.cos(a) * 0.26, Math.sin(a) * 0.68, 0.16 + Math.sin(a * 2) * 0.18);
    hot[iLoop + i] = 0.72;
  }

  const link = createLinker(n);
  cycle(link, 0, shell);
  for (let i = 0; i < shell; i += 2) link.add(i, iPatch + (i % cols));
  for (let i = 0; i < patch; i += 1) {
    const c = i % cols;
    if (c + 1 < cols && i + 1 < patch && Math.floor((i + 1) / cols) === Math.floor(i / cols)) {
      link.add(iPatch + i, iPatch + i + 1);
    }
    if (i + cols < patch) link.add(iPatch + i, iPatch + i + cols);
  }
  const rightCol = cols - 1;
  for (let r = 0; r < rows; r += 1) {
    const idx = r * cols + rightCol;
    if (idx < patch) link.add(iPatch + idx, iCore + coreInner + (r % coreOuter));
  }
  cycle(link, iCore, coreInner);
  cycle(link, iCore + coreInner, coreOuter);
  for (let i = 0; i < coreInner; i += 1) link.add(iCore + i, iCore + coreInner + (i % coreOuter));
  cycle(link, iLoop, loop);
  const outbound = iLoop;
  const inbound = iLoop + Math.floor(loop / 2);
  link.add(iCore + coreInner, outbound);
  link.add(inbound, iCore);
  link.add(inbound, iCore + coreInner + Math.floor(coreOuter / 2));

  return { pos, edges: link.done(), hot };
}

export function buildStages(count) {
  return [layoutLlm(count), layoutAuth(count), layoutVit(count)];
}

export function validateTopologies(count) {
  const stages = buildStages(count);
  const errors = [];
  stages.forEach((stage, s) => {
    if (stage.pos.length !== count * 3) errors.push(`pos ${s}`);
    if (stage.hot.length !== count) errors.push(`hot ${s}`);
    for (let i = 0; i < stage.pos.length; i += 1) {
      if (!Number.isFinite(stage.pos[i]) || Math.abs(stage.pos[i]) > 2.2) errors.push(`coord ${s} ${i} ${stage.pos[i]}`);
    }
    for (let e = 0; e < stage.edges.length; e += 2) {
      const a = stage.edges[e];
      const b = stage.edges[e + 1];
      if (a === b || a < 0 || b < 0 || a >= count || b >= count) errors.push(`edge ${s} ${a}->${b}`);
    }
  });
  return { errors, edges: stages.map((stage) => stage.edges.length / 2) };
}
