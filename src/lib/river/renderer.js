// Original ASCII projection/animal silhouettes recovered from the owner’s published footer.
import { fishPose, dolphinPose, facingOf, basisOf } from './geometry';
const RAMP = ' .:-=+*#%@', CREST = '~-=:.', HORIZON = .36;
function readColors() { const style=getComputedStyle(document.documentElement); return {fg:style.getPropertyValue('--color-fg').trim(),accent:style.getPropertyValue('--color-accent').trim(),deep:style.getPropertyValue('--color-muted').trim()}; }
export function createRiverRenderer(canvas) {
 const ctx=canvas.getContext('2d',{alpha:true}); if(!ctx)return null;
 let lum=new Float32Array(0),depth=new Float32Array(0),tint=new Uint8Array(0),gridCols=0,gridRows=0;
return function paint(world) {
      const { time, fish, dolphins, bubbles, ripples, motes, trails } = world;
      const colors = { current: readColors() };
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
}
