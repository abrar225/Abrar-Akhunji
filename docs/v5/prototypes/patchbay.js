const routes = {
  packet: {
    input: 'Request', title: 'PacketLark', status: 'Developer software / Released',
    description: 'A local API workbench for repeatable requests, response inspection, and isolated test scripts.',
    decision: 'A local workspace', reason: 'Collections and environments remain inspectable files.',
    filename: 'packetlark.webp', alt: 'PacketLark’s request workbench with its response panel',
    caption: 'Request workbench', href: 'https://github.com/abrar225/packetlark',
    light: '#e6fa8d', dark: '#b5ce66',
  },
  voice: {
    input: 'Voice', title: 'Fixo Flow', status: 'Local AI / Desktop preview',
    description: 'English dictation with local speech recognition, writing styles and recoverable history.',
    decision: 'Recognition stays local', reason: 'Local inference avoids a cloud transcription dependency.',
    filename: 'fixo-flow.webp', alt: 'The Fixo Flow writing styles interface',
    caption: 'Writing styles', href: 'https://github.com/abrar225/FixoFlow',
    light: '#ffd85b', dark: '#d9ab34',
  },
  screen: {
    input: 'Screen', title: 'Framecast Studio', status: 'Native software / In development',
    description: 'A macOS studio that composes and records separate landscape and portrait outputs.',
    decision: 'Two deliberate outputs', reason: 'Horizontal and vertical compositions keep their own geometry and recording settings.',
    filename: 'framecast-studio.webp', alt: 'Framecast Studio’s macOS editor with landscape and portrait canvases',
    caption: 'Scene editor', href: 'https://abrarakhunji.com/blog/framecast-studio-native-macos-dual-canvas-broadcast-architecture/',
    light: '#f59bb6', dark: '#b76a87',
  },
};

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const journey = document.querySelector('.journey');
const work = document.querySelector('#work');
const proof = document.querySelector('.rest-proof img');
const inspect = document.querySelector('[data-inspect]');
const dialog = document.querySelector('.interface-dialog');
const zoom = dialog.querySelector('[data-zoom]');
const zoomHelp = dialog.querySelector('[data-zoom-help]');
const interfaceViewport = dialog.querySelector('.interface-viewport');

function showDetail(isZoomed) {
  zoom.setAttribute('aria-pressed', String(isZoomed));
  interfaceViewport.classList.toggle('is-zoomed', isZoomed);
  zoomHelp.hidden = !isZoomed;
  interfaceViewport.scrollTo(0, 0);
}

if (typeof dialog.showModal === 'function') {
  inspect.hidden = false;
  zoom.addEventListener('click', () => {
    showDetail(zoom.getAttribute('aria-pressed') === 'false');
  });
  inspect.addEventListener('click', () => {
    const route = routes[selected];
    dialog.querySelector('h2').textContent = `${route.title} interface`;
    const image = dialog.querySelector('img');
    image.src = proof.currentSrc || proof.src;
    image.alt = route.alt;
    showDetail(false);
    dialog.showModal();
  });
}
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const narrow = matchMedia('(max-width: 819px)');
const buttons = [...document.querySelectorAll('[data-route]')];
const base = '/assets/build-room/products/';
const pictures = Object.fromEntries(Object.entries(routes).map(([key, route]) => {
  const asset = new Image();
  asset.src = base + route.filename;
  return [key, asset];
}));

let selected = 'packet';
let routeBend = 0;
let routeTarget = 0;
let width, height, workTop, proofRect, pixelRatio;
let renderFrame = 0;
let previousTime, previousY;
let progress = 0;
let impulse = 0;
let impulseSpeed = 0;

const clamp = (value) => Math.max(0, Math.min(1, value));
const mix = (first, second, part) => first + (second - first) * part;
const ease = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const ramp = (start, end, value) => ease((value - start) / (end - start));

function select(key) {
  selected = key;
  const route = routes[key];
  routeTarget = { packet: 0, voice: .7, screen: -.58 }[key];
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.route === key));
  for (const [field, selector] of Object.entries({
    title: 'project-title', status: 'status', description: 'description', decision: 'decision', reason: 'reason',
  })) document.querySelector(`[data-${selector}]`).textContent = route[field];
  document.querySelector('.route-caption').textContent = `${route.input} → ${route.title}`;
  document.querySelector('[data-caption]').textContent = `${route.title} / ${route.caption}`;
  document.querySelector('[data-source]').href = route.href;
  proof.alt = route.alt;
  proof.src = base + route.filename;
  update();
}

for (const button of buttons) button.addEventListener('click', () => select(button.dataset.route));

const ribbon = [
  [-1.06,.39],[-.73,.87],[-.46,.63],[-.23,.27],
  [.06,-.24],[.05,-.77],[.45,-.65],
  [.97,-.48],[.8,.24],[.42,.24],
  [.12,.24],[.03,-.21],[1.04,-.36],
];
const border = [
  [-1,-1],[-.35,-1],[.35,-1],[1,-1],
  [1,-.35],[1,.35],[1,1],
  [.35,1],[-.35,1],[-1,1],
  [-1,.35],[-1,-.35],[-1,-1],
];

function pointAt(points, fraction) {
  const index = Math.min(3, Math.floor(fraction * 4));
  const t = fraction * 4 - index;
  const a = 1 - t;
  const i = 3 * index;
  return [0, 1].map((axis) => a ** 3 * points[i][axis]
    + 3 * a * a * t * points[i + 1][axis]
    + 3 * a * t * t * points[i + 2][axis]
    + t ** 3 * points[i + 3][axis]);
}

function resize() {
  if (!context || reduce.matches) return;
  const bounds = canvas.getBoundingClientRect();
  width = bounds.width;
  height = bounds.height;
  pixelRatio = Math.min(2, devicePixelRatio);
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  workTop = work.getBoundingClientRect().top + scrollY;
  const image = proof.getBoundingClientRect();
  proofRect = { x: image.left + image.width / 2, y: image.top + scrollY - workTop + image.height / 2,
    w: image.width, h: image.height };
  previousY = scrollY;
  update();
}

function paint() {
  const p = progress;
  const mobile = narrow.matches;
  const route = routes[selected];
  const unfold = ramp(.47, .98, p);
  const bend = Math.sin(Math.PI * ramp(.03, .86, p));
  const horizontalTravel = ramp(.37, .79, p);
  const verticalTravel = ramp(mobile ? .34 : .56, mobile ? .84 : 1, p);
  const lift = (p > .1 && p < .95 ? impulse : 0);
  const x = mix(width * (mobile ? .5 : .72) - width * (mobile ? .01 : .12) * bend, proofRect.x, horizontalTravel);
  const mobileApproach = mobile ? Math.min(height * .19, Math.max(0, workTop - scrollY) * .67) * ramp(.49, .72, p) : 0;
  const y = mix(height * (mobile ? .74 : .49) - height * (mobile ? .13 : .16) * bend, proofRect.y, verticalTravel)
    + mobileApproach - Math.max(0, scrollY - workTop);
  const w = mix(width * (mobile ? .365 : .218) * (1 + .10 * bend), proofRect.w / 2, unfold);
  const h = mix(height * (mobile ? .177 : .34), proofRect.h / 2, unfold);
  const angle = (mobile ? -.055 : -.16) + (mobile ? .22 : .38) * bend + .06 * lift;
  context.clearRect(0, 0, width, height);
  context.save();
  context.translate(x, y + (mobile ? 10 : 25) * lift);
  context.rotate(angle * (1 - unfold));

  const shape = ribbon.map(([u, v], index) => {
    const direction = Math.sin(index * .8) * routeBend;
    return [mix(u + direction * .12, border[index][0], unfold), mix(v + direction * .43, border[index][1], unfold)];
  });
  const strip = [];
  const length = 88;
  for (let index = 0; index <= length; index += 1) {
    const t = index / length;
    const [u, v] = pointAt(shape, t);
    const [nextX, nextY] = pointAt(shape, Math.min(.99999, t + .001));
    const [lastX, lastY] = pointAt(shape, Math.max(0, t - .001));
    const dx = (nextX - lastX) * w;
    const dy = (nextY - lastY) * h;
    const distance = Math.hypot(dx, dy) || 1;
    const twist = Math.cos(t * 7.3 - p * 5.8 + routeBend * 1.6);
    const rail = mix((mobile ? 19 : 39) * (.30 + .7 * Math.abs(twist)), mobile ? 3.6 : 6, unfold);
    const drape = Math.sin(5 * t + routeBend) * routeBend * 20 * (1 - unfold);
    const curl = lift * Math.sin(t * 7 - 3) * (mobile ? 12 : 28) * (1 - unfold);
    const cy = v * h + drape + curl;
    strip.push({ x: u * w, y: cy, a: -dy / distance * rail, b: dx / distance * rail, twist });
  }

  const asset = pictures[selected];
  const aperture = ramp(.43, 1, unfold);
  if (asset.complete && asset.naturalWidth && aperture > 0) {
    context.save();
    context.beginPath();
    for (const [i, point] of strip.entries()) {
      if (i === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
    context.closePath();
    context.clip();
    context.globalAlpha = aperture;
    context.fillStyle = '#121331';
    context.fillRect(-w, -h, 2 * w, 2 * h);
    const scale = Math.min(w * 2 / asset.naturalWidth, h * 2 / asset.naturalHeight);
    const aw = asset.naturalWidth * scale;
    const ah = asset.naturalHeight * scale;
    context.drawImage(asset, -aw / 2, -ah / 2, aw, ah);
    context.restore();
  }

  function fillSlice(first, second, left, right, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(first.x + first.a * left, first.y + first.b * left);
    context.lineTo(second.x + second.a * left, second.y + second.b * left);
    context.lineTo(second.x + second.a * right, second.y + second.b * right);
    context.lineTo(first.x + first.a * right, first.y + first.b * right);
    context.closePath();
    context.fill();
  }

  context.save();
  context.translate(mobile ? 3 : 7, mobile ? 7 : 13);
  for (let i = 0; i < length; i += 1) fillSlice(strip[i], strip[i + 1], -1, 1, '#12133145');
  context.restore();
  for (let i = 0; i < length; i += 1) {
    const first = strip[i];
    const second = strip[i + 1];
    fillSlice(first, second, -1, 1, first.twist >= 0 || unfold > .72 ? route.light : route.dark);
    fillSlice(first, second, .72, 1, '#fffaf0ac');
    fillSlice(first, second, -.84, -.59, '#12133182');
  }
  context.restore();
}

function tick(time) {
  renderFrame = 0;
  const dt = Math.min(32, previousTime ? time - previousTime : 16);
  previousTime = time;
  const y = scrollY;
  const target = clamp(y / Math.max(workTop, 1));
  const velocity = Math.max(-1, Math.min(1, (y - previousY) / Math.max(1, dt) / 1.55));
  previousY = y;
  progress = mix(progress, target, 1 - Math.exp(-dt / 68));
  routeBend = mix(routeBend, routeTarget, 1 - Math.exp(-dt / 105));
  const seconds = dt / 1000;
  impulseSpeed += (velocity * 196 - 188 * impulse - 15 * impulseSpeed) * seconds;
  impulse += impulseSpeed * seconds;
  const pull = Math.sin(Math.PI * ramp(.42, .99, progress)) * (.84 + .45 * impulse);
  journey.style.setProperty('--paper-pull', pull.toFixed(3));
  journey.style.setProperty('--field-pull', (routeBend * .55 + impulse * .63).toFixed(3));
  journey.style.setProperty('--caption-opacity', ramp(.87, .975, progress).toFixed(3));
  paint();

  if (Math.abs(progress - target) + Math.abs(impulse) + Math.abs(impulseSpeed / 10)
    + Math.abs(routeBend - routeTarget) > .002) update();
  else previousTime = undefined;
}

function update() {
  if (!context || reduce.matches || !proofRect || renderFrame) return;
  renderFrame = requestAnimationFrame(tick);
}

function mode() {
  document.body.classList.toggle('is-live', Boolean(context && !reduce.matches));
  if (reduce.matches) {
    cancelAnimationFrame(renderFrame);
    renderFrame = 0;
    for (const property of ['--paper-pull', '--field-pull', '--caption-opacity']) journey.style.removeProperty(property);
  } else resize();
}

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', resize, { passive: true });
window.addEventListener('pageshow', () => { resize(); progress = clamp(scrollY / Math.max(workTop || 1, 1)); });
proof.addEventListener('load', resize);
document.fonts.ready.then(resize);
reduce.addEventListener('change', mode);
mode();
