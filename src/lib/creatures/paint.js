// ponytail: render dynamic webs, swinging silk, and perches across the site
export function paintHabitats(ctx, agents, flowers, time, scroll, ink, blue, paper) {
  ctx.lineWidth = 0.8;
  const spider = agents[0];
  if (spider) {
    const h = spider.home;
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.22;

    // Render active webs created across components on the website
    const websToDraw = spider.activeWebs?.length ? spider.activeWebs : (spider.webs || [h]);
    for (const anchor of websToDraw) {
      if (anchor.y - scroll < -140 || anchor.y - scroll > innerHeight + 140) continue;
      const rad = anchor.radius || 48;
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 2 + (i * Math.PI) / 10;
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(anchor.x + Math.cos(angle) * (rad * 1.4), anchor.y + Math.sin(angle) * (rad * 1.4));
        ctx.stroke();
      }
      for (const fraction of [0.3, 0.55, 0.8, 1.05]) {
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, rad * fraction, Math.PI / 2, Math.PI);
        ctx.stroke();
      }
    }

    // Render dynamic silk during component swinging
    if (spider.state === 'swinging' && spider.pivot && spider.swingFrom) {
      ctx.globalAlpha = 0.45;
      // Anchor line to overhead suspension
      ctx.beginPath();
      ctx.moveTo(spider.swingFrom.x, spider.swingFrom.y);
      ctx.lineTo(spider.pivot.x, spider.pivot.y);
      ctx.stroke();

      // Dynamic swinging thread to Pip
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.moveTo(spider.pivot.x, spider.pivot.y);
      ctx.quadraticCurveTo(
        (spider.pivot.x + spider.x) / 2 + Math.sin(time * 6) * 3,
        (spider.pivot.y + spider.y) / 2,
        spider.x,
        spider.y - 9
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      // Legacy or traversing tail
      const tail = spider.state === 'traversing' ? spider.webs?.[spider.previousAnchor] : null;
      if (tail) {
        ctx.beginPath();
        ctx.moveTo(tail.x - 24, tail.y + 18);
        ctx.quadraticCurveTo((tail.x + spider.x) / 2, (tail.y + spider.y) / 2 + 16, spider.x, spider.y - 9);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(h.x - 24, h.y + 18);
      ctx.quadraticCurveTo((h.x + spider.x) / 2 - 12, (h.y + spider.y) / 2 + 17, spider.x, spider.y - 9);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // Render flowers and component perches
  for (const f of flowers) {
    if (f.y - scroll < -80 || f.y - scroll > innerHeight + 80) continue;
    if (f.isFlower !== false) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(0, 42);
      ctx.quadraticCurveTo(-6, 20, 0, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-7, 28, 8, 3, -0.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        ctx.fillStyle = paper;
        ctx.strokeStyle = blue;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * 6, Math.sin(a) * 6, 5, 3, a, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
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
    ctx.lineWidth = 1.4;

    if (a.kind === 'spider') {
      if (a.state === 'swinging' && (Math.abs(a.vx) > 5 || Math.abs(a.vy) > 5)) {
        ctx.rotate(Math.atan2(a.vy, a.vx) + Math.PI / 2);
      }
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const gait = Math.sin(a.phase + (i % 2) * Math.PI) * Math.min(3, Math.hypot(a.vx, a.vy) * 0.1);
          const rootY = -4 + i * 3;
          ctx.beginPath();
          ctx.moveTo(side * 3, rootY);
          ctx.lineTo(side * (11 + (i % 2) * 3), rootY - 9 + i * 4 + gait);
          ctx.lineTo(side * (18 - (i % 2) * 2), rootY - 14 + i * 7 - gait);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.ellipse(0, 4, 5, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -5, 4, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = blue;
      ctx.beginPath();
      ctx.ellipse(0, 4, 1.4, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = paper;
      for (const x of [-1.5, 1.5]) {
        ctx.beginPath();
        ctx.arc(x, -6, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.rotate(a.state === 'perched' ? -0.15 : Math.max(-0.35, Math.min(0.35, a.vx * 0.003)));
      const opening = a.state === 'snared'
        ? 0.25 + 0.12 * Math.sin(time * 30)
        : a.state === 'perched'
          ? 0.35 + 0.13 * Math.sin(time * 1.5)
          : 0.22 + 0.78 * Math.abs(Math.sin(time * 13));

      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * opening, 1);
        ctx.fillStyle = blue;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.bezierCurveTo(20, -30, 30, -17, 23, -5);
        ctx.bezierCurveTo(19, 1, 12, 2, 2, 2);
        ctx.bezierCurveTo(25, 0, 24, 22, 13, 17);
        ctx.bezierCurveTo(6, 15, 3, 6, 0, 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = paper;
        ctx.globalAlpha = 0.65;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(2, 0);
          ctx.lineTo(18 + i * 2, -8 - i * 5);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        for (const [x, y] of [[21, -12], [15, 12], [19, -4]]) {
          ctx.fillStyle = paper;
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.ellipse(0, 1, 2, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(s, -6);
        ctx.quadraticCurveTo(s * 4, -16, s * 7, -14);
        ctx.stroke();
        if (a.state === 'perched') {
          ctx.beginPath();
          ctx.moveTo(s, 5);
          ctx.lineTo(s * 4, 8);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }
}
