import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// --- SHADER CODE ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;

  // Simple fbm noise
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    
    // Create organic mask
    float n = fbm(uv * 3.0);
    
    // Combine progress with noise for organic dissolve
    // The dissolve edge moves from bottom to top or based on UV.y
    float mask = smoothstep(uProgress - uSpread, uProgress, uv.y + n * 0.3);
    
    // Invert mask so it grows from top/bottom
    float alpha = 1.0 - mask;
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const DissolvePlane = ({ progress }) => {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColor: { value: new THREE.Color('#f0f4f0') }, // Light off-white/greenish
    uSpread: { value: 0.5 }
  }), []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uProgress.value = progress;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

const HeroDissolve = ({ theme }) => {
  const containerRef = useRef(null);
  const leftBranchRef = useRef(null);
  const rightBranchRef = useRef(null);
  const titleRef = useRef(null);
  const textBlockRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. GSAP Context for Cleanup
    let ctx = gsap.context(() => {
      // Shader Progress Link
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // Parallax for Branches
      gsap.to(leftBranchRef.current, {
        y: -1500,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      gsap.to(rightBranchRef.current, {
        y: -2500,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Word Reveal for Bottom Block
      const words = textBlockRef.current.querySelectorAll('.reveal-word');
      ScrollTrigger.create({
        trigger: ".bottom-block",
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          words.forEach((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            const opacity = gsap.utils.clamp(0, 1, (p - start) / (end - start));
            word.style.opacity = opacity;
            word.style.transform = `translateY(${10 * (1 - opacity)}px)`;
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const description = "Architecting the intersection of neural networks and digital interfaces. Building systems that learn, adapt, and evolve with the speed of thought.";
  const words = description.split(' ');

  return (
    <div ref={containerRef} className="relative w-full h-[185vh] overflow-hidden bg-black">
      {/* BACKGROUND LAYER (z-1) */}
      <div className="absolute inset-0 z-[1] w-full h-screen sticky top-0 overflow-hidden">
        <img 
          src="images/hero/forest_bg.png" 
          alt="Dark Forest" 
          className="w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      </div>

      {/* CANVAS LAYER (z-2) */}
      <div className="absolute inset-0 z-[2] w-full h-screen sticky top-0 pointer-events-none">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1] }}>
          <DissolvePlane progress={scrollProgress} />
        </Canvas>
      </div>

      {/* PARALLAX LAYER (z-3) */}
      <div className="absolute inset-0 z-[3] w-full h-screen sticky top-0 pointer-events-none">
        <img 
          ref={leftBranchRef}
          src="images/hero/branch_left.png" 
          alt="Branch Left" 
          className="absolute bottom-[-20%] left-[-10%] w-[60%] md:w-[40%] opacity-80 mix-blend-screen grayscale brightness-50"
        />
        <img 
          ref={rightBranchRef}
          src="images/hero/branch_right.png" 
          alt="Branch Right" 
          className="absolute bottom-[-40%] right-[-10%] w-[70%] md:w-[50%] opacity-80 mix-blend-screen grayscale brightness-50"
        />
      </div>

      {/* CONTENT LAYER (z-10) */}
      <div className="relative z-[10] w-full h-full flex flex-col items-center">
        {/* Top Block */}
        <div className="w-full h-screen flex flex-col items-center justify-center px-6">
          <div className="space-y-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">System Initialized</span>
            </div>
            <h1 ref={titleRef} className="text-6xl md:text-[12rem] font-bold tracking-tighter text-white leading-[0.8] mix-blend-difference uppercase">
              ABRAR <br /> <span className="text-purple-500">AKHUNJI</span>
            </h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.4em] mt-8">Engineering Intelligence • Gujarat, India</p>
          </div>
        </div>

        {/* Bottom Block */}
        <div className="bottom-block w-full h-[125vh] flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center">
          <h2 ref={textBlockRef} className="text-3xl md:text-6xl font-light text-white leading-tight">
            {words.map((word, i) => (
              <span 
                key={i} 
                className="reveal-word inline-block mr-[0.3em] opacity-0 transition-all duration-100 ease-out will-change-transform"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroDissolve;
