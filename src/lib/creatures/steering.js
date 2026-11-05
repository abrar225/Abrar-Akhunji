const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

// ponytail: mature atmospheric workshop inhabitants - Pip (spider) & Spool (butterfly)
export function createCreatures(width, height, habitat = null) {
  const defaultWeb = { x: width - 36, y: 140 };
  const defaultFlowers = [{ x: 36, y: height * 0.7 }, { x: width - 42, y: height * 0.82 }];
  const homes = habitat || { web: defaultWeb, flowers: defaultFlowers };
  const initialWeb = homes.web || homes.webs?.[0] || defaultWeb;
  const rawWebs = homes.webs || [initialWeb];
  const webs = rawWebs.map(w => ({ ...w }));
  const flowers = (homes.flowers?.length ? homes.flowers : defaultFlowers).map(p => ({ ...p }));

  return [
    {
      name: 'Pip',
      kind: 'spider',
      x: initialWeb.x - 24,
      y: initialWeb.y + 27,
      vx: 0,
      vy: 0,
      state: 'resting',
      until: 0.6,
      phase: 0,
      speed: 110,
      home: { ...initialWeb },
      webs,
      activeWebs: [{ x: initialWeb.x, y: initialWeb.y, radius: 46, created: 0, corner: 'top-right' }],
      anchor: 0,
      nextAnchor: 0,
      previousAnchor: 0,
      patrolAt: 3.5,
      thread: 36,
      plumbDepth: 0,
      swingFrom: null,
      swingTo: null,
      pivot: null,
      swingStart: 0,
      swingDuration: 1.6
    },
    {
      name: 'Spool',
      kind: 'butterfly',
      x: flowers[0].x,
      y: flowers[0].y - 7,
      vx: 0,
      vy: 0,
      state: 'perched',
      until: 1.4,
      phase: 0,
      speed: 160,
      target: 0,
      visits: 0,
      flowers
    }
  ];
}

export function advanceCreatures(agents, seconds, time, pointer, width, height, isIdle = true) {
  let left = clamp(Number.isFinite(seconds) ? seconds : 0, 0, 0.2);
  while (left > 0) {
    const dt = Math.min(left, 1 / 120);
    left -= dt;

    for (const a of agents) {
      const distance = pointer ? Math.hypot(a.x - pointer.x, a.y - pointer.y) : Infinity;

      if (a.kind === 'spider') {
        // Pointer reaction: retreat immediately into corner nook
        if (distance < 55 && a.state !== 'retreating') {
          a.state = 'retreating';
          a.until = time + 1.6;
        }

        // When user is actively interacting and Pip is not in a swing or plumb-line, stay calm
        if (!isIdle && !['swinging', 'plumb_line', 'retreating'].includes(a.state)) {
          a.state = 'resting';
          a.speed = 90;
          const targetX = a.home.x - 24;
          const targetY = a.home.y + 27;
          a.x += (targetX - a.x) * 6 * dt;
          a.y += (targetY - a.y) * 6 * dt;
          a.vx = 0;
          a.vy = 0;
          a.phase += dt * 0.4;
          continue;
        }

        // Autonomous idle-triggered actions: margin swinging or plumb-line descent
        if (isIdle && a.webs?.length > 1 && time >= a.patrolAt && !['retreating', 'swinging', 'plumb_line'].includes(a.state)) {
          a.actionCount = (a.actionCount || 0) + 1;
          const shouldPlumb = a.actionCount % 2 === 0;
          if (shouldPlumb) {
            // Drop a craftsman plumb-line down the outer margin
            a.state = 'plumb_line';
            a.swingStart = time;
            a.plumbDepth = clamp((height - a.home.y) * 0.12, 70, 160);
            a.swingDuration = 3.6; // 1.4s down, 0.8s pause, 1.4s up
            a.until = time + a.swingDuration;
            a.patrolAt = time + a.swingDuration + 5.0;
          } else {
            // Swing or traverse to adjacent margin rafter
            const patrol = a.patrol || a.webs.map((_, i) => i);
            a.previousAnchor = a.anchor;
            a.nextAnchor = patrol[(patrol.indexOf(a.anchor) + 1) % patrol.length];
            const target = a.webs[a.nextAnchor];
            const dist = Math.hypot(target.x - a.x, target.y - a.y);

            a.swingFrom = { x: a.x, y: a.y };
            a.swingTo = { x: target.x - 24, y: target.y + 27 };
            a.swingStart = time;
            a.swingDuration = clamp(dist / 200, 1.2, 2.6);
            a.until = time + a.swingDuration;
            a.pivot = {
              x: (a.swingFrom.x + a.swingTo.x) / 2,
              y: Math.min(a.swingFrom.y, a.swingTo.y) - Math.max(45, dist * 0.25)
            };
            a.state = 'swinging';
            a.speed = Math.min(650, Math.max(110, dist / 1.8));
            a.patrolAt = time + a.swingDuration + 6.0;
          }
        }

        // Process states
        if (a.state === 'plumb_line') {
          const p = clamp((time - a.swingStart) / a.swingDuration, 0, 1);
          let currentDrop = 0;
          if (p < 0.38) {
            // Descending
            const ease = 0.5 - 0.5 * Math.cos((p / 0.38) * Math.PI);
            currentDrop = a.plumbDepth * ease;
          } else if (p < 0.62) {
            // Resting at plumb depth, micro harmonic sway
            currentDrop = a.plumbDepth + Math.sin(time * 2.8) * 3;
          } else {
            // Ascending back up
            const ease = 0.5 + 0.5 * Math.cos(((p - 0.62) / 0.38) * Math.PI);
            currentDrop = a.plumbDepth * ease;
          }

          const targetX = a.home.x - 24 + Math.sin(time * 2.0) * 2;
          const targetY = a.home.y + 27 + currentDrop;
          a.vx = (targetX - a.x) / Math.max(dt, 0.001);
          a.vy = (targetY - a.y) / Math.max(dt, 0.001);
          a.x = targetX;
          a.y = targetY;
          a.thread = currentDrop + 36;
          a.phase += dt * 3.0;

          if (p >= 1) {
            a.state = 'resting';
            a.until = time + 2.5;
            a.vx = 0;
            a.vy = 0;
            a.thread = 36;
          }
        } else if (a.state === 'swinging') {
          const p = clamp((time - a.swingStart) / a.swingDuration, 0, 1);
          const sag = Math.sin(p * Math.PI) * Math.max(38, Math.hypot(a.swingTo.x - a.swingFrom.x, a.swingTo.y - a.swingFrom.y) * 0.22);
          const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
          const nx = a.swingFrom.x + (a.swingTo.x - a.swingFrom.x) * ease;
          const ny = a.swingFrom.y + (a.swingTo.y - a.swingFrom.y) * p + sag;

          a.vx = (nx - a.x) / Math.max(dt, 0.001);
          a.vy = (ny - a.y) / Math.max(dt, 0.001);
          a.x = nx;
          a.y = ny;
          a.thread = Math.hypot(a.x - (a.pivot?.x || a.x), a.y - (a.pivot?.y || a.y));

          if (p >= 1) {
            // Landed on margin rafter corner
            a.anchor = a.nextAnchor;
            a.home = a.webs[a.anchor];
            a.state = 'weaving';
            a.until = time + 1.8;
            a.speed = 110;
            a.vx = 0;
            a.vy = 0;
            a.swingFrom = null;
            a.swingTo = null;
            a.pivot = null;

            if (!a.activeWebs) a.activeWebs = [];
            if (!a.activeWebs.some(w => Math.hypot(w.x - a.home.x, w.y - a.home.y) < 32)) {
              a.activeWebs.push({ x: a.home.x, y: a.home.y, radius: 46, created: time });
              if (a.activeWebs.length > 6) a.activeWebs.shift();
            }
          }
        } else if (a.state === 'weaving') {
          a.vx = 0;
          a.vy = 0;
          a.phase += dt * 18;
          if (time >= a.until) {
            a.state = 'resting';
            a.until = time + 2.5;
          }
        } else {
          if (time >= a.until) {
            a.state = a.state === 'resting' ? 'descending' : a.state === 'descending' ? 'returning' : 'resting';
            a.until = time + (a.state === 'resting' ? 2 : 2.4);
          }
          a.speed = 110;
          const hanging = a.state === 'descending';
          a.thread = hanging ? 95 : 36;
          const retreating = a.state === 'retreating';
          const targetX = a.home.x - (retreating ? 8 : 24) + (hanging ? Math.sin(time * 3) * 8 : 0);
          const targetY = a.home.y + (retreating ? 8 : hanging ? 65 : 27);
          const ax = (targetX - a.x) * 18, ay = (targetY - 20 - a.y) * 18 + 360;
          a.vx = (a.vx + ax * dt) * Math.exp(-7 * dt);
          a.vy = (a.vy + ay * dt) * Math.exp(-7 * dt);
        }
      } else {
        // Butterfly (Spool)
        const spider = agents[0];
        const silk = spider?.state === 'swinging' || spider?.state === 'plumb_line'
          ? { x: spider.x, y: spider.y }
          : (spider?.webs?.length > 1 ? { x: spider.home.x - 30, y: spider.home.y + 45 } : null);

        if (a.state === 'snared') {
          if (time < a.until) continue;
          a.state = 'fleeing';
          a.until = time + 1.2;
          a.escape = { x: a.x + (a.x < width / 2 ? 55 : -55), y: a.y + 40 };
        }

        // Active user: Spool stays perched peacefully on margin flower/rafter
        if (!isIdle && a.state === 'perched' && distance >= 55) {
          const flower = a.flowers[a.target] || a.flowers[0];
          a.x = flower.x;
          a.y = flower.y - 7;
          a.vx = 0;
          a.vy = 0;
          a.phase += dt * 0.8;
          continue;
        }

        if (a.state === 'perched') {
          const flower = a.flowers[a.target] || a.flowers[0];
          a.x = flower.x;
          a.y = flower.y - 7;
          a.vx = 0;
          a.vy = 0;
          if (distance < 55) {
            a.state = 'fleeing';
            a.until = time + 1.2;
            a.escape = { x: a.x + (pointer.x > a.x ? -55 : 55), y: a.y - 60 };
            a.target = (a.target + 1) % a.flowers.length;
          } else if (isIdle && time >= a.until) {
            a.visits++;
            a.target = (a.target + 1) % a.flowers.length;
            a.state = 'flying';
            a.until = time + 16;
          } else {
            continue;
          }
        }

        if (distance < 45 && a.state !== 'fleeing') {
          a.state = 'fleeing';
          a.until = time + 1.2;
          a.escape = { x: a.x + (pointer.x > a.x ? -55 : 55), y: a.y - 60 };
        } else if (a.state === 'fleeing' && time > a.until) {
          a.state = 'flying';
          a.until = time + 16;
        } else if (pointer && distance > 64 && distance < 140 && a.state === 'flying') {
          a.state = 'curious';
          a.until = time + 1.2;
        } else if (a.state === 'curious' && time > a.until) {
          a.state = 'returning';
          a.until = time + 16;
        }

        const flower = a.flowers[a.target] || a.flowers[0];
        let tx = flower.x, ty = flower.y - 7;
        if (a.state === 'curious' && pointer) {
          tx = pointer.x - 70;
          ty = pointer.y - 45;
        }
        if (a.state === 'fleeing') {
          tx = a.escape.x;
          ty = a.escape.y;
        }
        if (a.state === 'flying' || a.state === 'returning') {
          ty -= Math.min(38, Math.abs(tx - a.x) * 0.4) * (0.7 + 0.3 * Math.sin(time * 6));
        }

        if (silk && a.state === 'flying' && a.visits % 3 === 1) {
          a.snare ||= silk;
          tx = a.snare.x;
          ty = a.snare.y;
          if (Math.hypot(tx - a.x, ty - a.y) < 14) {
            a.snare = null;
            a.state = 'snared';
            a.until = time + 0.95;
            a.vx = 0;
            a.vy = 0;
            a.visits++;
            continue;
          }
        }

        const dx = tx - a.x, dy = ty - a.y;
        const dist = Math.max(1, Math.hypot(dx, dy));
        const desired = Math.min(a.speed, dist * 1.8);
        const flap = Math.sin(time * 24);
        const lift = 340 + flap * 38;

        a.vx += (dx / dist * desired - a.vx) * 2.8 * dt;
        a.vy += ((dy / dist * desired - a.vy) * 2.8 + 340 - lift) * dt;

        if (!['curious', 'fleeing'].includes(a.state) && Math.hypot(flower.x - a.x, flower.y - 7 - a.y) < 9 && Math.hypot(a.vx, a.vy) < 32) {
          a.state = 'perched';
          a.speed = 160;
          a.until = time + 1.8 + (a.visits % 3) * 0.5;
          a.x = flower.x;
          a.y = flower.y - 7;
          a.vx = 0;
          a.vy = 0;
        }
      }

      const speed = Math.hypot(a.vx, a.vy);
      if (speed > a.speed) {
        a.vx *= a.speed / speed;
        a.vy *= a.speed / speed;
      }

      a.x = clamp(a.x + a.vx * dt, 14, Math.max(14, width - 14));
      a.y = clamp(a.y + a.vy * dt, 40, Math.max(40, height - 20));
      a.phase += Math.hypot(a.vx, a.vy) * dt * 0.08;
    }
  }
  return agents;
}
