import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({ theme }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Core Sphere
    const geo = new THREE.IcosahedronGeometry(1.8, 2);
    const mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x8b5cf6 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.03 : 0.08
    });
    const core = new THREE.Mesh(geo, mat);
    scene.add(core);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 18;
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: isDark ? 0xffffff : 0x000000,
      transparent: true,
      opacity: isDark ? 0.3 : 0.15
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      core.rotation.y += 0.002;
      core.rotation.x += 0.001;
      particles.rotation.y -= 0.0005;
      camera.position.y = window.scrollY * -0.002; // Parallax
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [theme]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeBackground;
