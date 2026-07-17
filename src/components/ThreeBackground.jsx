import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground — a slow, warm particle field with a faint wireframe core.
 * Recoloured for Ink & Ember: ember points on espresso (dark) or ink points on
 * bone (light). Deliberately low-opacity so it reads as texture, not focus.
 */
const ThreeBackground = ({ theme }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isDark = theme === 'dark';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Snapshot the mount node — ref.current may differ by cleanup time
    const mountNode = mountRef.current;
    if (mountNode) mountNode.appendChild(renderer.domElement);

    // faint wireframe core
    const geo = new THREE.IcosahedronGeometry(2.1, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff5a1f,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.05 : 0.07,
    });
    const core = new THREE.Mesh(geo, mat);
    scene.add(core);

    // drifting particles
    const count = 1400;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.022,
      color: isDark ? 0xf4f1ea : 0x141414,
      transparent: true,
      opacity: isDark ? 0.28 : 0.16,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouse);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      core.rotation.y += 0.0016;
      core.rotation.x += 0.0009;
      particles.rotation.y -= 0.0004;
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.6 - window.scrollY * 0.0018 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      if (mountNode) mountNode.innerHTML = '';
      geo.dispose();
      mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeBackground;
