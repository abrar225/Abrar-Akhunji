import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createBuildRoom, CAMERA_POSES } from '../../lib/build-room/sceneFactory';

export default function BuildRoomCanvas({ theme, project, phase, inspection, explore, resetKey, reduced, onSelect, onFailure }) {
  const container = useRef(null); const runtime = useRef(null); const callbacks = useRef({ onSelect, onFailure });
  useEffect(() => { callbacks.current = { onSelect, onFailure }; }, [onSelect, onFailure]);
  useEffect(() => {
    const host = container.current; let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' }); } catch { callbacks.current.onFailure(); return; }
    let disposed = false, raf = 0, deadline = 0, visible = true, renders = 0, slowFrames = 0, last = 0;
    const mobile = host.clientWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5)); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.shadowMap.enabled = !mobile; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute('aria-hidden', 'true'); host.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100); const target = new THREE.Vector3(0, 1, 0);
    camera.position.set(...CAMERA_POSES.hero.position);
    const controls = new OrbitControls(camera, renderer.domElement); controls.enabled = false; controls.enableDamping = false; controls.enablePan = false; controls.enableZoom = false; controls.minPolarAngle = Math.PI / 4; controls.maxPolarAngle = Math.PI * 70 / 180;
    renderer.domElement.style.touchAction = 'pan-y';
    function frame(time) {
      raf = 0; if (disposed || !visible || document.hidden) return;
      camera.lookAt(target); renderer.render(room.scene, camera); renders++;
      host.dataset.renders = String(renders); host.dataset.camera = camera.position.toArray().map(n=>n.toFixed(2)).join(','); host.dataset.triangles = String(renderer.info.render.triangles); host.dataset.drawCalls = String(renderer.info.render.calls);
      if (last && time - last > 32 && deadline > performance.now() && ++slowFrames > 120) { renderer.setPixelRatio(1); renderer.shadowMap.enabled = false; slowFrames = 0; }
      last = time;
      if (performance.now() < deadline) raf = requestAnimationFrame(frame);
    }
    function invalidate(duration = 0) { deadline = Math.max(deadline, performance.now() + duration); if (!raf && !disposed && visible && !document.hidden) raf = requestAnimationFrame(frame); }
    const room = createBuildRoom(renderer, { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light', mobile, invalidate });
    room.scene.background = null; room.floor.visible = false;
    runtime.current = { room, renderer, camera, target, controls, invalidate, mobile };
    const scrollState = { progress: 0 };
    const anchors = ['hero', 'brief', 'work', 'inspect'];
    let stops = [];
    const measure = () => { stops = anchors.map(key => {
      const el = document.querySelector(`[data-scene="${key}"]`);
      return el ? el.getBoundingClientRect().top + window.scrollY - 82 : 0;
    }); };
    const updateCamera = () => {
      const state = runtime.current;
      if (!state || state.reduced || mobile || controls.enabled) return;
      const y = stops[0] + scrollState.progress * (stops[3] - stops[0]);
      let i = 0; while (i < 2 && y > stops[i + 1]) i++;
      const t = THREE.MathUtils.clamp((y - stops[i]) / Math.max(1, stops[i+1] - stops[i]), 0, 1);
      const eased = t * t * (3 - 2 * t);
      const a = CAMERA_POSES[anchors[i]], b = CAMERA_POSES[anchors[i+1]];
      camera.position.lerpVectors(new THREE.Vector3(...a.position), new THREE.Vector3(...b.position), eased);
      target.lerpVectors(new THREE.Vector3(...a.target), new THREE.Vector3(...b.target), eased);
      room.lamp.rotation.z = -.12 + .25 * scrollState.progress;
      invalidate();
    };
    measure(); runtime.current.updateCamera = updateCamera;
    const choreography = !mobile ? gsap.to(scrollState, {progress:1,ease:'none',onUpdate:updateCamera,scrollTrigger:{
      trigger:'.story-stage',start:()=>stops[0],end:()=>stops[3],scrub:.65,invalidateOnRefresh:true,onRefreshInit:measure
    }}) : null;
    const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / Math.max(1, height); camera.updateProjectionMatrix(); invalidate(); };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) invalidate(); else { cancelAnimationFrame(raf); raf = 0; last = 0; } }); visibility.observe(mobile ? host.parentElement : host);
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else invalidate(); };
    document.addEventListener('visibilitychange', onVisibility);
    const change = () => {
      // A drag can arrive before the intersection observer catches a scroll/layout change.
      if (controls.enabled) {
        const rect = host.getBoundingClientRect();
        visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
      }
      target.copy(controls.target); invalidate();
    }; controls.addEventListener('change', change);
    const ray = new THREE.Raycaster(), pointer = new THREE.Vector2(); let down;
    const press = e => { down = [e.clientX, e.clientY]; };
    const click = e => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
      const rect = host.getBoundingClientRect(); pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1); ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(room.trays.filter(tray => tray.visible), true)[0]; if (!hit) return;
      let node = hit.object; while (node && !node.userData.projectId) node = node.parent;
      if (node) callbacks.current.onSelect(node.userData.projectId);
    };
    const failure = e => { e.preventDefault(); callbacks.current.onFailure(); };
    renderer.domElement.addEventListener('pointerdown', press); renderer.domElement.addEventListener('pointerup', click); renderer.domElement.addEventListener('webglcontextlost', failure);
    room.ready.then(() => { if (!disposed) { host.dataset.ready = 'true'; invalidate(); } });
    return () => { choreography?.scrollTrigger?.kill(); choreography?.kill(); disposed = true; cancelAnimationFrame(raf); observer.disconnect(); visibility.disconnect(); document.removeEventListener('visibilitychange', onVisibility); controls.dispose(); renderer.domElement.removeEventListener('pointerdown', press); renderer.domElement.removeEventListener('pointerup', click); renderer.domElement.removeEventListener('webglcontextlost', failure); gsap.killTweensOf(camera.position); gsap.killTweensOf(target); for (const tray of room.trays) gsap.killTweensOf(tray.position); for (const pivot of room.screenPivots) gsap.killTweensOf(pivot.position); for (const material of room.screenMaterials) gsap.killTweensOf(material); room.dispose(); renderer.dispose(); renderer.forceContextLoss(); host.replaceChildren(); runtime.current = null; };
  }, []);
  useEffect(() => {
    const r = runtime.current; if (!r) return;
    r.phase = phase; r.reduced = reduced;
    const index = ['fixo-flow', 'packetlark', 'framecast-studio'].indexOf(project);
    r.room.setTheme(theme); r.room.scene.background = null;
    const pose = CAMERA_POSES[phase] || CAMERA_POSES.work;
    const position = r.mobile ? [0, 3.5, 8.2] : pose.position;
    const tween = (obj, values, duration) => { gsap.to(obj, { ...values, duration: reduced ? 0 : duration, overwrite: true, ease: 'power3.out', onUpdate: () => r.invalidate() }); };
    if (!explore) {
      r.exploreBase = null; r.controls.enabled = false; r.renderer.domElement.style.touchAction = 'pan-y';
      if (r.mobile || reduced) {
        tween(r.camera.position, { x: position[0], y: position[1], z: position[2] }, .75);
        tween(r.target, { x: pose.target[0], y: pose.target[1], z: pose.target[2] }, .75);
      } else r.updateCamera();
    } else {
      gsap.killTweensOf(r.camera.position); gsap.killTweensOf(r.target); r.controls.target.copy(r.target); r.controls.update(); const a = r.exploreBase ?? r.controls.getAzimuthalAngle(); r.exploreBase = a; r.controls.minAzimuthAngle = a - Math.PI * 25 / 180; r.controls.maxAzimuthAngle = a + Math.PI * 25 / 180; r.controls.enabled = true; r.renderer.domElement.style.touchAction = 'none';
    }
    r.room.trays.forEach((tray, i) => {
      tray.visible = !r.mobile || i === index;
      const x = (r.mobile || phase === 'inspect') ? (i - index) * 3.1 : (i - 1) * 3.1;
      tween(tray.position, { x, y: i === index ? .44 : .35 }, .9);
    });
    r.room.screenMaterials.forEach((material, i) => { material.transparent = true; gsap.to(material, {opacity: i === index ? 1 : .78, duration: reduced ? 0 : .18, overwrite: true, onUpdate: () => r.invalidate()}); });
    r.room.screenPivots.forEach((pivot, i) => { tween(pivot.position, { y: .18 + (inspection && i === index ? .9 : 0) }, .5); r.room.layerGroups[i].visible = inspection && i === index; });
    tween(r.room.spot.target.position, { x: 0 }, .45);
    r.invalidate(reduced ? 0 : 1000);
  }, [theme, project, phase, inspection, explore, resetKey, reduced]);
  return <div ref={container} className="build-canvas" data-testid="build-canvas" />;
}
