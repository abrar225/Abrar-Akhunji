const motion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const root = document.documentElement;
const arrival = document.querySelector('[data-arrival]');
const next = document.querySelector('[data-next]');
const clamp = (value) => Math.min(1, Math.max(0, value));
const hasReverseOption = new URLSearchParams(location.search).get('scroll') === 'reverse';

let reverse = 'reverse' in root.dataset;
let travel = 0;
let progress = 0;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;
let frame = 0;
let previousTime;

function render(timestamp) {
  frame = 0;
  const elapsed = previousTime ? Math.min(48, timestamp - previousTime) : 16;
  previousTime = timestamp;
  const follow = 1 - Math.exp(-elapsed / 76);
  progress += (travel - progress) * follow;
  pointerX += (targetX - pointerX) * follow;
  pointerY += (targetY - pointerY) * follow;

  arrival.style.setProperty('--p', progress.toFixed(4));
  arrival.style.setProperty('--cut', Math.sin(Math.PI * progress).toFixed(4));
  arrival.style.setProperty('--x', pointerX.toFixed(4));
  arrival.style.setProperty('--y', pointerY.toFixed(4));
  next.style.setProperty('--p', progress.toFixed(4));
  next.style.setProperty('--cut', Math.sin(Math.PI * progress).toFixed(4));

  if (Math.abs(travel - progress) + Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.001) {
    frame = requestAnimationFrame(render);
  } else {
    previousTime = undefined;
  }
}

function update() {
  if (!motion.matches && !frame) frame = requestAnimationFrame(render);
}

function measure() {
  const hero = arrival.getBoundingClientRect();
  const sceneDistance = Math.abs(arrival.offsetTop - next.offsetTop);
  travel = clamp((reverse ? hero.top : -hero.top) / Math.max(1, sceneDistance));
  update();
}

function syncScrollMode() {
  const permitted = matchMedia('(min-width: 850px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  const shouldReverse = document.body.classList.contains('ascent') && hasReverseOption && permitted;
  if (shouldReverse !== reverse) {
    const current = travel;
    if (shouldReverse) root.dataset.reverse = '';
    else delete root.dataset.reverse;
    reverse = shouldReverse;
    const position = arrival.offsetTop + (reverse ? -1 : 1) * current * Math.abs(arrival.offsetTop - next.offsetTop);
    window.scrollTo(0, position);
  }
  measure();
}

window.addEventListener('scroll', measure, { passive: true });
window.addEventListener('resize', syncScrollMode, { passive: true });
window.addEventListener('pageshow', measure);
if (document.fonts) document.fonts.ready.then(measure);

motion.addEventListener('change', () => {
  if (motion.matches) {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = undefined;
    for (const scene of [arrival, next]) {
      for (const property of ['--p', '--cut', '--x', '--y']) scene.style.removeProperty(property);
    }
  }
  syncScrollMode();
});

function followPointer(event) {
  if (motion.matches || event.pointerType !== 'mouse') return;
  const bounds = arrival.getBoundingClientRect();
  targetX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
  targetY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
  update();
}

function clearPointer() {
  targetX = 0;
  targetY = 0;
  update();
}

function syncPointer() {
  const usePointer = finePointer.matches && !motion.matches && document.body.classList.contains('ascent');
  arrival.removeEventListener('pointermove', followPointer);
  arrival.removeEventListener('pointerleave', clearPointer);
  if (usePointer) {
    arrival.addEventListener('pointermove', followPointer, { passive: true });
    arrival.addEventListener('pointerleave', clearPointer);
  } else clearPointer();
}

if (document.body.classList.contains('ascent')) {
  finePointer.addEventListener('change', syncPointer);
  motion.addEventListener('change', syncPointer);
  syncPointer();
}
measure();
