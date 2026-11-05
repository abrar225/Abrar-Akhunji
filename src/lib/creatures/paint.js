// ponytail: architectural blueprint sketchbook silk & atmospheric creature rendering
export function paintHabitats(ctx, agents, flowers, time, scroll, ink, blue, paper) {
  ctx.lineWidth = 0.6;
  const spider = agents[0];
  if (spider) {
    const h = spider.home;
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.18; // soft, subtle architectural blueprint ink opacity

    // Render structural corner webs in architectural margins
    const websToDraw = spider.activeWebs?.length ? spider.activeWebs : (spider.webs || [h]);
    for (const anchor of websToDraw) {
      if (anchor.y - scroll < -140 || anchor.y - scroll > innerHeight + 140) continue;
      const rad = anchor.radius || 46;
      // Precision blueprint spokes radiating into the rafter corner
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 2 + (i * Math.PI) / 10;
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(anchor.x + Math.cos(angle) * (rad * 1.3), anchor.y + Math.sin(angle) * (rad * 1.3));
        ctx.stroke();
      }
      // Delicate tension arcs
      for (const fraction of [0.32, 0.58, 0.82, 1.05]) {
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, rad * fraction, Math.PI / 2, Math.PI);
        ctx.stroke();
      }
    }

    // Render silk thread based on state
    if (spider.state === 'plumb_line') {
      // Craftsman plumb-line: delicate vertical thread with micro-catenary sway
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(h.x - 24, h.y + 18);
      ctx.quadraticCurveTo(
        h.x - 24 + Math.sin(time * 2.2) * 2.5,
        (h.y + 18 + spider.y - 9) / 2,
        spider.x,
        spider.y - 9
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else if (spider.state === 'swinging' && spider.pivot && spider.swingFrom) {
      // Dynamic tension line during margin swings
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(spider.swingFrom.x, spider.swingFrom.y);
      ctx.lineTo(spider.pivot.x, spider.pivot.y);
      ctx.stroke();

      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(spider.pivot.x, spider.pivot.y);
      ctx.quadraticCurveTo(
        (spider.pivot.x + spider.x) / 2 + Math.sin(time * 5) * 2,
        (spider.pivot.y + spider.y) / 2,
        spider.x,
        spider.y - 9
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      // Resting anchor silk
      const tail = spider.state === 'traversing' ? spider.webs?.[spider.previousAnchor] : null;
      if (tail) {
        ctx.beginPath();
        ctx.moveTo(tail.x - 24, tail.y + 18);
        ctx.quadraticCurveTo((tail.x + spider.x) / 2, (tail.y + spider.y) / 2 + 16, spider.x, spider.y - 9);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(h.x - 24, h.y + 18);
      ctx.quadraticCurveTo((h.x + spider.x) / 2 - 8, (h.y + spider.y) / 2 + 12, spider.x, spider.y - 9);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // Render margin flowers & botanical perches
  for (const f of flowers) {
    if (f.y - scroll < -80 || f.y - scroll > innerHeight + 80) continue;
    if (f.isFlower !== false) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(0, 38);
      ctx.quadraticCurveTo(-5, 18, 0, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-6, 25, 7, 2.5, -0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        ctx.fillStyle = paper;
        ctx.strokeStyle = blue;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * 5, Math.sin(a) * 5, 4.5, 2.8, a, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Render Pip and Spool
  for (const a of agents) {
    if (a.y - scroll < -140 || a.y - scroll > innerHeight + 140) continue;
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = 1.2;

    if (a.kind === 'spider') {
      if (a.state === 'swinging' && (Math.abs(a.vx) > 5 || Math.abs(a.vy) > 5)) {
        ctx.rotate(Math.atan2(a.vy, a.vx) + Math.PI / 2);
      }
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const gait = Math.sin(a.phase + (i % 2) * Math.PI) * Math.min(2.5, Math.hypot(a.vx, a.vy) * 0.1);
          const rootY = -4 + i * 3;
          ctx.beginPath();
          ctx.moveTo(side * 3, rootY);
          ctx.lineTo(side * (10 + (i % 2) * 2.5), rootY - 8 + i * 3.5 + gait);
          ctx.lineTo(side * (16 - (i % 2) * 2), rootY - 12 + i * 6 - gait);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.ellipse(0, 4, 4.5, 7.5, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -4.5, 3.8, 4.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = blue;
      ctx.beginPath();
      ctx.ellipse(0, 4, 1.2, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = paper;
      for (const x of [-1.4, 1.4]) {
        ctx.beginPath();
        ctx.arc(x, -5.5, 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Butterfly (Spool)
      ctx.rotate(a.state === 'perched' ? -0.12 : Math.max(-0.3, Math.min(0.3, a.vx * 0.003)));
      const opening = a.state === 'snared'
        ? 0.25 + 0.12 * Math.sin(time * 28)
        : a.state === 'perched'
          ? 0.35 + 0.12 * Math.sin(time * 1.4) // calm, meditative breathing
          : 0.24 + 0.76 * Math.abs(Math.sin(time * 12));

      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * opening, 1);
        ctx.fillStyle = blue;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.bezierCurveTo(18, -28, 28, -15, 21, -4);
        ctx.bezierCurveTo(17, 1, 11, 2, 2, 2);
        ctx.bezierCurveTo(23, 0, 22, 20, 12, 15);
        ctx.bezierCurveTo(5, 14, 2, 5, 0, 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = paper;
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(2, 0);
          ctx.lineTo(16 + i * 2, -7 - i * 4.5);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        for (const [x, y] of [[19, -11], [13, 11], [17, -3]]) {
          ctx.fillStyle = paper;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.ellipse(0, 1, 1.8, 8.5, 0, 0, Math.PI * 2);
      ctx.fill();
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(s, -5);
        ctx.quadraticCurveTo(s * 3.5, -14, s * 6, -13);
        ctx.stroke();
        if (a.state === 'perched') {
          ctx.beginPath();
          ctx.moveTo(s, 4.5);
          ctx.lineTo(s * 3.5, 7.5);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }
}
