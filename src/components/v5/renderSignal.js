import * as THREE from 'three';
import { SIGNAL_RINGS, SIGNAL_SIDES, signalPoint, signalTone } from './signalGeometry';

export function mountSignal(container) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
  if (!context) return null;
  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2.3, 2.3, 2.3, -2.3, .1, 20);
  camera.position.z = 7;
  const coordinates = [];
  const colors = [];
  const color = new THREE.Color();
  for (let ring = 0; ring < SIGNAL_RINGS; ring++) {
    for (let side = 0; side < SIGNAL_SIDES; side++) {
      coordinates.push(...signalPoint(ring, side));
      const tone = signalTone(ring, side);
      color.setRGB(...tone.map((value) => value / 255), THREE.SRGBColorSpace);
      colors.push(color.r, color.g, color.b);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(coordinates, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const dot = document.createElement('canvas');
  dot.width = dot.height = 32;
  const brush = dot.getContext('2d');
  brush.fillStyle = '#fff';
  brush.beginPath();
  brush.arc(16, 16, 13, 0, Math.PI * 2);
  brush.fill();
  const map = new THREE.CanvasTexture(dot);
  const material = new THREE.PointsMaterial({ map, size: 2.5, sizeAttenuation: false, vertexColors: true, transparent: true, alphaTest: .12 });
  const sculpture = new THREE.Points(geometry, material);
  scene.add(sculpture);

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = true;
  let visible = true;
  let frame = 0;
  let phase = 0;
  let previousTime;
  let pointerX = 0;
  let pointerY = 0;
  let tiltX = 0;
  let tiltY = 0;

  const render = (time = 0) => {
    frame = 0;
    const animated = active && visible && !document.hidden && !motion.matches;
    if (animated) {
      phase += previousTime === undefined ? 0 : Math.min(time - previousTime, 32) * .00032;
      tiltX += (pointerY - tiltX) * .07;
      tiltY += (pointerX - tiltY) * .07;
      previousTime = time;
    } else {
      previousTime = undefined;
    }
    sculpture.rotation.set(.46 + tiltX * .35 + Math.sin(phase) * .15, -.43 + tiltY * .48 + Math.sin(phase * .76) * .22, -.28 + phase * .32);
    renderer.render(scene, camera);
    if (animated) frame = requestAnimationFrame(render);
  };

  const sync = () => {
    cancelAnimationFrame(frame);
    previousTime = undefined;
    render();
  };
  const resize = new ResizeObserver(() => {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;
    const ratio = width / height;
    const span = 2.22;
    camera.left = -span * Math.max(1, ratio);
    camera.right = -camera.left;
    camera.top = span * Math.max(1, 1 / ratio);
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    material.size = Math.max(2.15, Math.min(width, height) / 150);
    renderer.setSize(width, height, false);
    sync();
  });
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  const move = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = container.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - .5;
    pointerY = (event.clientY - bounds.top) / bounds.height - .5;
  };
  const leave = () => { pointerX = 0; pointerY = 0; };
  const fallback = (event) => {
    event.preventDefault();
    active = false;
    cancelAnimationFrame(frame);
    container.dataset.ready = 'false';
  };
  const restore = () => {
    container.dataset.ready = 'true';
    update(allowMotion);
  };
  const update = (enabled) => {
    allowMotion = enabled;
    active = enabled;
    sync();
  };
  let allowMotion = true;

  resize.observe(container);
  intersection.observe(container);
  container.addEventListener('pointermove', move, { passive: true });
  container.addEventListener('pointerleave', leave);
  renderer.domElement.addEventListener('webglcontextlost', fallback);
  renderer.domElement.addEventListener('webglcontextrestored', restore);
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  container.dataset.ready = 'true';

  return {
    update,
    dispose() {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerleave', leave);
      renderer.domElement.removeEventListener('webglcontextlost', fallback);
      renderer.domElement.removeEventListener('webglcontextrestored', restore);
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      geometry.dispose();
      material.dispose();
      map.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete container.dataset.ready;
    },
  };
}
