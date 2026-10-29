import { useEffect, useId, useRef, useState } from 'react';
import { RotateCcw, Grid2X2, Building2, ArrowUpRight } from 'lucide-react';
import { siteAudio, cityCrossings } from '../../lib/audio/siteAudio';
import snapshot from '../../data/github-contributions.json';
import { buildContributionCalendar, getContributionStats, contributionHeight, contributionLabel, formatContributionDate } from '../../lib/github/calendar';
import './github-city.css';

const stats = getContributionStats(snapshot);
const calendar = buildContributionCalendar(snapshot.days, stats.throughDate);
const peakIndex = calendar.cells.findIndex(day => day.date === stats.peak?.date);
const number = new Intl.NumberFormat('en');
const dailyTotal = snapshot.days.reduce((sum, day) => sum + day.count, 0);
const DURATION = 3450;
const LIGHT_LEVELS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const DARK_LEVELS = ['#29332e', '#0e4429', '#006d32', '#26a641', '#39d353'];

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${[16, 8, 0].map(shift => Math.max(0, Math.min(255, ((n >> shift) & 255) + amount))).join(',')})`;
}
function inside(point, polygon) {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    if ((a[1] > point[1]) !== (b[1] > point[1]) && point[0] < (b[0] - a[0]) * (point[1] - a[1]) / (b[1] - a[1]) + a[0]) result = !result;
  }
  return result;
}

export default function GitHubCity({ className = '' }) {
  const canvasRef = useRef(null), surfaceRef = useRef(null), runtimeRef = useRef(null);
  const selectedRef = useRef(peakIndex), viewRef = useRef('city');
  const [selected, setSelected] = useState(calendar.cells[peakIndex]);
  const [view, setView] = useState('city');
  const id = useId();
  useEffect(() => {
    const canvas = canvasRef.current, surface = surfaceRef.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, raf = 0, lastTime = null, elapsed = motion.matches ? DURATION : 0;
    let started = false, visible = false, disposed = false, renders = 0, hitAreas = [], births = 0, audioStart = siteAudio.metrics().pops, cycle = 0;
    const dark = () => document.documentElement.classList.contains('dark');
    const active = () => visible && !document.hidden && viewRef.current === 'city';
    const paintPolygon = (points, color, stroke) => {
      ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath();
      ctx.fillStyle = color; ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = .55; ctx.stroke(); }
    };
    function draw() {
      if (disposed || !width) return;
      const isDark = dark(), levels = isDark ? DARK_LEVELS : LIGHT_LEVELS;
      const ink = isDark ? '#e8ebe2' : '#20251f', muted = isDark ? '#a2b1a5' : '#637168';
      ctx.clearRect(0, 0, width, height); hitAreas = [];
      const padding = width < 500 ? 15 : 34;
      const unit = (width - padding * 2) / (calendar.weeks.length + 3.9), face = unit * .83, side = unit * .44, depth = unit * .37;
      const baseline = height - (width < 500 ? 38 : 48), maxHeight = height * .58, origin = padding;
      const baseRight = origin + calendar.weeks.length * unit;
      paintPolygon([[origin - 5, baseline + 5], [baseRight + side + 5, baseline + 5], [baseRight + side + 6 * side + 5, baseline - 6 * depth], [origin + 6 * side - 5, baseline - 6 * depth]], isDark ? '#1d2922' : '#dce2d8');
      // Sunday is furthest away. Painting the back rows first preserves overlap.
      const order = [...calendar.cells].sort((a, b) => a.weekday - b.weekday || a.week - b.week);
      for (const day of order) {
        const index = day.week * 7 + day.weekday, back = 6 - day.weekday;
        const x = origin + day.week * unit + back * side, y = baseline - back * depth;
        if (!day.available) {
          ctx.strokeStyle = isDark ? '#566258' : '#b5c1b5'; ctx.lineWidth = .55;
          ctx.setLineDash([1, 2]); ctx.strokeRect(x, y - 2, face, 2); ctx.setLineDash([]); continue;
        }
        const delay = 200 + day.week * 30 + day.weekday * 55;
        const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (elapsed - delay) / 900));
        const growth = 1 - Math.pow(1 - progress, 3);
        const tall = contributionHeight(day.count, stats.peak?.count || 0, maxHeight) * growth;
        const color = levels[day.level];
        const front = [[x, y], [x + face, y], [x + face, y - tall], [x, y - tall]];
        const right = [[x + face, y], [x + face + side, y - depth], [x + face + side, y - tall - depth], [x + face, y - tall]];
        const top = [[x, y - tall], [x + face, y - tall], [x + face + side, y - tall - depth], [x + side, y - tall - depth]];
        if (tall > 0) { paintPolygon(front, color); paintPolygon(right, shade(color, -25)); }
        paintPolygon(top, shade(color, day.count ? 17 : 0), isDark ? '#263c2e' : '#d8e3d8');
        if (index === selectedRef.current) { ctx.strokeStyle = ink; ctx.lineWidth = 1.3; ctx.beginPath(); top.forEach(([px, py], n) => n ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); ctx.stroke(); }
        hitAreas.push({ index, polygons: [top, front, right], roof: [x + face / 2 + side / 2, y - tall - depth / 2] });
      }
      ctx.fillStyle = muted; ctx.font = `${width < 500 ? 9 : 11}px "Instrument Sans", sans-serif`; ctx.textBaseline = 'middle';
      for (const [index, month] of calendar.months.entries()) {
        if (width < 600 && index % 2 !== 0) continue;
        ctx.fillText(month.label, origin + month.week * unit, baseline + 24);
      }
      const picked = hitAreas.find(item => item.index === selectedRef.current);
      if (picked && (motion.matches || elapsed >= 3000)) {
        const day = calendar.cells[picked.index], [x, y] = picked.roof;
        const label = `${number.format(day.count)} contributions`;
        ctx.font = `600 ${width < 500 ? 21 : 29}px Bricolage, sans-serif`;
        const labelX = Math.max(16, Math.min(width - 16 - ctx.measureText(label).width, x + 10)), labelY = Math.max(35, y - (width < 500 ? 55 : 75));
        ctx.strokeStyle = muted; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, labelY + 4); ctx.lineTo(labelX - 4, labelY + 4); ctx.stroke();
        ctx.fillStyle = ink; ctx.beginPath(); ctx.arc(x, y, 2.3, 0, Math.PI * 2); ctx.fill();
        ctx.font = `600 ${width < 500 ? 21 : 29}px Bricolage, sans-serif`; ctx.textBaseline = 'alphabetic';
        ctx.fillText(label, labelX, labelY);
        ctx.font = `11px "Instrument Sans", sans-serif`; ctx.fillStyle = muted;
        ctx.fillText(`${formatContributionDate(day.date)}${day.date === stats.peak?.date ? ' · Best day' : ''}`, labelX, labelY + 20);
      }
      canvas.dataset.ready = 'true'; canvas.dataset.renders = String(++renders);
    }
    function stop() { siteAudio.cityActive(false);siteAudio.cancel('city'); if (raf) cancelAnimationFrame(raf); raf = 0; lastTime = null; canvas.dataset.playing = 'false'; }
    function tick(time) {
      raf = 0;
      if (!active() || disposed) { stop(); return; }
      const before=elapsed;
      if (lastTime !== null) elapsed = Math.min(DURATION, elapsed + time - lastTime);
      const born=cityCrossings(calendar.cells,before,elapsed);births+=born.length;siteAudio.city(born,calendar.weeks.length);
      canvas.dataset.births=String(births);canvas.dataset.soundEvents=String(siteAudio.metrics().pops-audioStart);canvas.dataset.cycle=String(cycle);
      if(before<DURATION&&elapsed===DURATION)siteAudio.cue('city-complete',{group:'city',gain:.5,throttle:0});
      lastTime = time; draw();
      if (elapsed < DURATION && !motion.matches) { canvas.dataset.playing = 'true'; raf = requestAnimationFrame(tick); }
      else {siteAudio.cityActive(false);lastTime=null;canvas.dataset.playing='false';}
    }
    function resume() {
      if (!active() || disposed) return;
      if (motion.matches) elapsed = DURATION;
      if (elapsed < DURATION && !raf) { siteAudio.cityActive(!motion.matches);started = true; canvas.dataset.playing = 'true'; raf = requestAnimationFrame(tick); }
      else draw();
    }
    function resize() {
      width = surface.clientWidth; height = Math.max(315, Math.min(490, width * .49));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); canvas.style.height = `${height}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    }
    function choose(index) {
      if (!calendar.cells[index]?.available || index === selectedRef.current) return;
      selectedRef.current = index; setSelected(calendar.cells[index]); siteAudio.cue('select',{rate:1+calendar.cells[index].level*.08,gain:.45,throttle:.07});draw();
    }
    const point = event => { const rect = canvas.getBoundingClientRect(); return [event.clientX - rect.left, event.clientY - rect.top]; };
    function inspect(event) {
      const p = point(event), hit = [...hitAreas].reverse().find(area => area.polygons.some(polygon => inside(p, polygon)));
      canvas.style.cursor = hit ? 'pointer' : 'default'; if (hit) choose(hit.index);
    }
    function key(event) {
      let next = selectedRef.current;
      const jumps = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
      if (event.key === 'Home') next = calendar.cells.findIndex(d => d.available);
      else if (event.key === 'End') next = calendar.cells.findLastIndex(d => d.available);
      else if (jumps[event.key]) {
        const jump = jumps[event.key]; next += jump;
        while (next >= 0 && next < calendar.cells.length && !calendar.cells[next].available) next += jump;
      } else return;
      event.preventDefault(); choose(next);
    }
    const visibility = () => { if (document.hidden) stop(); else resume(); };
    const motionChange = () => { if (motion.matches) { stop(); elapsed = DURATION; draw(); } else if (started) resume(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .4; if (visible) resume(); else stop(); }, { threshold: [0, .4] });
    const sizes = new ResizeObserver(resize), themeObserver = new MutationObserver(() => draw());
    sizes.observe(surface); observer.observe(canvas); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    canvas.addEventListener('pointermove', inspect); canvas.addEventListener('pointerdown', inspect); canvas.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', visibility); motion.addEventListener('change', motionChange);
    runtimeRef.current = {
      replay() { stop();births=0;audioStart=siteAudio.metrics().pops;cycle++;siteAudio.cue(motion.matches?'city-complete':'replay',{group:'city',gain:.65,throttle:0}); selectedRef.current = peakIndex; setSelected(calendar.cells[peakIndex]); elapsed = motion.matches ? DURATION : 0; started = true; draw(); resume(); },
      setView() { if (viewRef.current === 'city') resume(); else stop(); },
      select: choose,
    };
    resize();
    document.fonts.ready.then(() => { if (!disposed) draw(); });
    return () => {
      disposed = true; stop(); observer.disconnect(); sizes.disconnect(); themeObserver.disconnect();
      canvas.removeEventListener('pointermove', inspect); canvas.removeEventListener('pointerdown', inspect); canvas.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', visibility); motion.removeEventListener('change', motionChange); runtimeRef.current = null;
    };
  }, []);
  function changeView(next) { viewRef.current = next; setView(next); runtimeRef.current?.setView(); }
  return <div className={`github-city ${className}`}>
    <div className="github-city-top"><div><p className="github-city-total"><strong>{number.format(stats.totalContributions)}</strong> GitHub contributions</p><p id={`${id}-summary`} className="github-city-range">{formatContributionDate(stats.firstDate)} – {formatContributionDate(stats.lastDate)}. Each building is one day.</p></div><div className="github-city-switch" aria-label="Contribution view"><button type="button" aria-pressed={view === 'city'} onClick={() => changeView('city')}><Building2 size={14}/>As a city</button><button type="button" aria-pressed={view === 'grid'} onClick={() => changeView('grid')}><Grid2X2 size={14}/>As a grid</button></div></div>
    <div className="github-city-surface" ref={surfaceRef}>
      <canvas ref={canvasRef} data-cursor="Inspect" hidden={view !== 'city'} tabIndex={0} role="img" aria-label="Interactive city of GitHub contributions. Use arrow keys to inspect a day." aria-describedby={`${id}-summary ${id}-help ${id}-selected`} data-ready="false" data-renders="0" data-playing="false" />
      {view === 'grid' && <div className="github-calendar-scroll"><div className="github-calendar-grid" style={{ '--weeks': calendar.weeks.length }} role="group" aria-label="GitHub contribution calendar">{calendar.weeks.map((week, i) => <div className="github-calendar-week" key={i}>{week.map(day => <button key={day.date} type="button" className={`contribution-cell level-${day.level ?? 'unavailable'}`} disabled={!day.available} aria-label={contributionLabel(day)} aria-pressed={selected?.date === day.date} title={contributionLabel(day)} onClick={() => runtimeRef.current?.select(day.week * 7 + day.weekday)} />)}</div>)}</div></div>}
      {view === 'city' && <button type="button" className="github-city-replay" onClick={() => runtimeRef.current?.replay()}><RotateCcw size={13}/>Replay</button>}
    </div>
    <div className="github-city-inspection"><output id={`${id}-selected`} aria-live="polite"><strong>{selected ? number.format(selected.count) : '0'} {selected?.count === 1 ? 'contribution' : 'contributions'}</strong><span>{selected && formatContributionDate(selected.date)}{selected?.date === stats.peak?.date ? ' · Best day' : ''}</span></output><div className="github-city-legend" aria-label="GitHub contribution intensity"><span>Less</span>{LIGHT_LEVELS.map((_, i) => <i key={i} className={`level-${i}`}/>)}<span>More</span></div></div>
    <p className="github-city-help" id={`${id}-help`}>Hover or tap a building. Keyboard: arrows to move by day or week, Home and End for the first and last day. Building heights use a square-root scale.</p>
    <div className="github-city-source"><span>GitHub snapshot · Updated {formatContributionDate(stats.throughDate)}</span><a href={snapshot.profileUrl} target="_blank" rel="noreferrer">View @{snapshot.username}<ArrowUpRight size={13}/></a></div>
    <details className="github-city-data"><summary>Read the daily contribution data</summary><p>GitHub contributions include more than commits. Missing calendar cells are unavailable; future dates are not counted as zero.</p>{dailyTotal !== snapshot.totalContributions && <p>GitHub reports {number.format(snapshot.totalContributions)} total contributions; the available daily records add up to {number.format(dailyTotal)}. The city shows those daily records without adjusting their counts.</p>}<div className="github-city-table-wrap" tabIndex={0} role="region" aria-label="Scrollable daily contribution table"><table><caption>{number.format(dailyTotal)} contributions across {snapshot.days.length} reported days. Longest active streak: {stats.longestStreak} days.</caption><thead><tr><th scope="col">Date</th><th scope="col">Contributions</th><th scope="col">GitHub intensity</th></tr></thead><tbody>{snapshot.days.map(day => <tr key={day.date}><th scope="row">{formatContributionDate(day.date)}</th><td>{day.count}</td><td>{day.level} of 4</td></tr>)}</tbody></table></div></details>
  </div>;
}
