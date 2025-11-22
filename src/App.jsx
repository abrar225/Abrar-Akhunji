import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Code2,
  Cpu,
  Terminal,
  Database,
  Layers,
  Brain,
  Download,
  User,
  Briefcase,
  CheckCircle2,
  Globe,
  Music,
  Cloud,
  Home,
  Sparkles,
  MessageSquare,
  Send,
  X,
  Bot,
  FileCode,
  Monitor,
  GraduationCap,
  Award,
  Trophy,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Replaced local import with a placeholder URL for the environment

// --- Gemini API Integration ---
const apiKey = "AIzaSyDuTixRZDgYqkCkJReZTy_WvBbToUKzrtw"; // API Key provided by environment

const PORTFOLIO_CONTEXT = `
You are an AI Assistant for Abrar Akhunji's portfolio website.
Key Information:
- Name: Abrar Akhunji
- Tagline: "I constantly try to improve."
- Education: 
  1. B.E. in Information Technology (2023-Present) at Kalol Institute of Technology & Research Center.
  2. Diploma in IT (2020-2023) at Government Polytechnic, Himmatnagar.
- Skills: 
  - AI/ML: Numpy, Pandas, OpenCV, Basic Model Training, Data Preprocessing.
  - Languages: Python, Java, PHP, JavaScript.
  - Web: Django, Flask, HTML, CSS.
  - Tools: Git, GitHub, Android Studio, VSCode, Kali Linux.
- Projects: Lyra Music AI, CivicEye, TerraFlow, NeuroVision.
- Certifications: Google Cybersecurity Professional, Smart India Hackathon 2022.
`;

// --- NEW COMPONENT: CustomCursor (Themed) ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-purple-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
      />
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-purple-500/50 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.3)'
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
};

// --- NEW COMPONENT: LoadingScreen (Tech/Terminal Style) ---
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING_SYSTEM");

  const loadingTexts = [
    "LOADING_ASSETS",
    "COMPILING_SHADERS",
    "CONNECTING_NEURAL_NET",
    "FETCHING_DATA",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Change text based on progress milestones
        const index = Math.floor((prev / 100) * loadingTexts.length);
        setText(loadingTexts[Math.min(index, loadingTexts.length - 1)]);
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#030303] text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-[300px] font-mono text-xs md:text-sm">
        <div className="flex justify-between mb-2 text-gray-500">
          <span>STATUS</span>
          <span className="text-purple-500 animate-pulse">PROCESSING</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 mb-4 relative overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            {`> ${text}...`}
          </span>
          <span className="font-bold text-purple-400 text-xl">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- NEW COMPONENT: SectionWrapper (Smoother Physics) ---
const SectionWrapper = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- ChatBot Component ---
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Abrar's AI Assistant. Ask me anything about his projects, skills, or experience! ✨" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const prompt = `System Context: ${PORTFOLIO_CONTEXT}\nUser Question: ${userMessage.text}\nAnswer:`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, error connecting to AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-6 md:right-12 z-[70] p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="text-purple-600" />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Ask AI about me
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-44 right-6 md:right-12 z-[70] w-[90vw] md:w-[380px] h-[500px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Abrar's Assistant</h3>
              <p className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Powered by Gemini</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5'}`}>{msg.text}</div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-500 animate-pulse">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-white/10 bg-black/50">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about skills..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
              <button type="submit" disabled={isLoading} className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors"><Send size={18} /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// --- 3D Background ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Core Sphere
    const geo = new THREE.IcosahedronGeometry(1.8, 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.03 });
    const core = new THREE.Mesh(geo, mat);
    scene.add(core);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 18;
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff, transparent: true, opacity: 0.3 });
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
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- Components ---

const FloatingDock = () => {
  const links = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about-me' },
    { icon: Layers, label: 'Work', href: '#work' },
    { icon: Briefcase, label: 'Exp', href: '#experience' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
      <nav className="flex items-center gap-2 px-2 py-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl ring-1 ring-white/5">
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className="group relative p-3 rounded-full hover:bg-white/20 transition-all duration-300">
            <link.icon size={20} className="text-gray-300 group-hover:text-white transition-colors" />
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              {link.label}
            </span>
          </a>
        ))}
        <div className="w-px h-6 bg-white/10 mx-1"></div>
        <a href="mailto:moabrarakhunji@gmail.com" className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">Hire Me</a>
      </nav>
    </div>
  );
};

const SectionHeader = ({ title, number }) => (
  <div className="flex items-baseline gap-4 mb-8 border-b border-white/10 pb-4">
    <span className="font-mono text-xs text-purple-400">0{number}</span>
    <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white">{title}</h2>
  </div>
);

const AdvancedProjectCard = ({ project }) => (
  <div className="w-[90vw] md:w-[60vw] flex-shrink-0 snap-center h-[65vh] md:h-[75vh]">
    <div className="group relative h-full rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-purple-500/30 shadow-2xl">
      <div className="grid md:grid-cols-2 h-full">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between relative z-20 bg-black/20 overflow-y-auto custom-scrollbar">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-purple-300 uppercase tracking-wider">{project.category}</span>
              <span className="text-xs text-gray-500 font-mono">{project.year}</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 leading-tight">{project.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>
            <ul className="space-y-3 mb-6">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-300">
                  <CheckCircle2 size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => <span key={t} className="px-2 py-1 text-[10px] border border-white/10 rounded text-gray-400">{t}</span>)}
            </div>
            <div className="flex gap-4">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs md:text-sm font-bold text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors">Live Demo <ArrowUpRight size={14} /></a>
              ) : (
                <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-600 cursor-not-allowed">Live Demo (Coming Soon)</span>
              )}

              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-white transition-colors"><Github size={14} /> Source Code</a>
              ) : (
                <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-600 cursor-not-allowed"><Github size={14} /> Source Code (Coming Soon)</span>
              )}
            </div>
          </div>
        </div>
        <div className="relative h-[200px] md:h-full overflow-hidden order-first md:order-last">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 md:bg-gradient-to-l z-10" />
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Horizontal Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || !sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const startScroll = sectionTop;
      const endScroll = sectionTop + sectionHeight - windowHeight;

      if (scrollY >= startScroll && scrollY <= endScroll) {
        const scrollPercentage = (scrollY - startScroll) / (sectionHeight - windowHeight);
        const maxScroll = scrollRef.current.scrollWidth - window.innerWidth;
        scrollRef.current.style.transform = `translateX(-${scrollPercentage * maxScroll}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    { title: "Real vs AI Image Detector", category: "COMPUTER VISION", year: "2025", description: "A deep-learning powered system that identifies whether an image is AI-generated or real using advanced image forensics and transformer-based feature extraction.", features: ["AI-vs-Real image classification", "Vision Transformer–based feature embedding", "Noise & artifact pattern detection"], tech: ["Python", "OpenCV", "NumPy", "Pandas", "TensorFlow/PyTorch"], image: "/images/real_vs_ai.png", github: null, demo: null },
    { title: "Cattle Breed Identification System", category: "AI/ML", year: "2025", description: "An ensemble-based AI tool capable of classifying 41 Indian cattle breeds using Vision Transformers and image preprocessing techniques.", features: ["Recognition of 41 unique cattle breeds", "Vision Transformer (ViT) embeddings", "Clean dataset preprocessing pipeline"], tech: ["Python", "OpenCV", "Vision Transformer"], image: "/images/Cattel Breed.png", github: "https://github.com/abrar225/AI_cattle_vison", demo: null },
    { title: "Brain Tumor Detection (MRI)", category: "HEALTHCARE AI", year: "2024", description: "A Computer Vision model trained on MRI scan data to detect tumor presence with high accuracy using classical image processing and ML techniques.", features: ["Automated MRI-based tumor detection", "Binary classification (tumor / no tumor)", "Mask processing + thresholding + contour analysis"], tech: ["Python", "OpenCV", "NumPy", "Pandas"], image: "/images/Brain Tumor Detection.png", github: "https://github.com/abrar225/Brain-Tumer-Detection-System", demo: null },
    { title: "Kid’s Space (Android App)", category: "ANDROID", year: "2023", description: "An interactive educational Android app designed for kids, focused on simple UI/UX and modular Java development.", features: ["Clean, kid-friendly UI", "Built using XML layouts", "Focused on kid's study"], tech: ["Android Studio", "XML", "Java"], image: "/images/Kid’s Space.png", github: null, demo: null }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-gray-300 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ThreeBackground />

          {/* Header */}
          <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none h-32"></div>
            <div className="pointer-events-auto">
              <span className="font-bold tracking-tighter text-xl text-white">ABRAR<span className="text-purple-500">.</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 pointer-events-auto">
              <a href="https://github.com/abrar225" className="text-xs font-mono text-gray-500 hover:text-white transition-colors">GH</a>
              <a href="https://linkedin.com/in/abrar-akhunji-1a116524b" className="text-xs font-mono text-gray-500 hover:text-white transition-colors">LI</a>
              <span className="text-xs font-mono text-gray-700">/</span>
              <span className="text-xs font-mono text-gray-500">INDIA, GJ</span>
            </div>
          </header>

          <FloatingDock />
          <ChatBot />

          <main className="relative z-10">

            {/* Hero Section */}
            <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-6 pt-32">
              <SectionWrapper className="space-y-6 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-purple-300 tracking-widest uppercase">Open to work</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                  Engineer of <br />
                  <span className="font-display text-purple-500 text-7xl md:text-9xl block mt-2 mb-2">Intelligent</span>
                  Systems.
                </h1>
                <p className="max-w-lg text-lg text-gray-400 leading-relaxed pt-4">
                  I bridge the gap between <span className="text-gray-200">complex AI models</span> and <span className="text-gray-200">scalable web architectures</span>. Building the next generation of digital products.
                </p>
              </SectionWrapper>
              <SectionWrapper delay={0.2} className="mt-24 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                {['Experience', 'Focus', 'Stack'].map((label, i) => (
                  <div key={i}>
                    <p className="text-xs font-mono text-gray-600 uppercase mb-1">{label}</p>
                    <p className="text-sm text-white">{['Early Career — AI & Web Development', 'AI/ML & Full Stack', 'Python • React • Java'][i]}</p>
                  </div>
                ))}
              </SectionWrapper>
            </section>

            {/* About Me - Fixed with 3D Tilt & Transparency */}
            <section id="about-me" className="py-40 max-w-6xl mx-auto px-6 relative z-10">
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]"></div>
              </div>

              <div className="grid md:grid-cols-12 gap-16 items-start">
                <div className="md:col-span-7 space-y-8">
                  <SectionWrapper>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <div className="h-px w-24 bg-white/10 ml-4"></div>
                      <span className="text-xs font-mono text-gray-500">bio.txt</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
                      I speak <span className="font-serif italic text-purple-400">Code</span> & <br />
                      <span className="font-serif italic text-purple-400">Algorithms.</span>
                    </h2>
                  </SectionWrapper>
                  <SectionWrapper delay={0.2} className="space-y-6 text-gray-400 text-sm leading-relaxed font-mono border-l border-white/10 pl-6 bg-gradient-to-r from-white/5 to-transparent p-4 rounded-r-xl">
                    <p>
                      <span className="text-purple-400">const</span> <span className="text-yellow-200">Abrar</span> = <span className="text-blue-300">{`{`}</span><br />
                      &nbsp;&nbsp;role: <span className="text-green-300">"AI/ML Engineer + Python Developer + Full-Stack Learner"</span>,<br />
                      &nbsp;&nbsp;location: <span className="text-green-300">"India,Gujrat,383001"</span>,<br />
                      &nbsp;&nbsp;passion: <span className="text-green-300">"Teaching Machines to See & Think in secure environment"</span><br />
                      <span className="text-blue-300">{`}`};</span>
                    </p>
                    <p>I'm an AI/ML and Python developer specializing in AI/ML, backend systems, and modern web development.
                      I enjoy turning ideas into real applications—whether it's detecting tumors using OpenCV, identifying cattle breeds with Vision Transformers, or designing smooth Android and web interfaces.
                      I love working on meaningful projects and constantly leveling up my engineering skills.</p>
                  </SectionWrapper>
                  <SectionWrapper delay={0.3} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-6 hover:bg-white/10 transition-colors backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Music size={24} /></div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Offline Mode</h4>
                      <p className="text-xs text-gray-500">When I'm not coding, I'm writing rap songs, cooking with friends, or exploring new tech ideas.</p>
                    </div>
                  </SectionWrapper>
                </div>

                <div className="md:col-span-5 relative flex justify-center md:justify-end mt-12 md:mt-0">
                  {/* Glassmorphic Profile Card */}
                  <SectionWrapper delay={0.4} className="relative w-72 h-96 rounded-2xl overflow-hidden border border-white/10 group transform transition-transform duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent z-20 mix-blend-overlay"></div>
                    <img src="images/myimg.jpg" alt="Abrar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute bottom-4 right-4 left-4 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg z-30">
                      <div className="flex items-center gap-2 text-[10px] text-gray-300 mb-1"><FileCode size={12} /><span>stack_overflow.py</span></div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-green-500"></div></div>
                    </div>
                  </SectionWrapper>
                </div>
              </div>
            </section>

            {/* Horizontal Scroll Projects Section */}
            <section id="work" ref={sectionRef} className="relative h-[400vh]">
              <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div ref={scrollRef} className="flex items-center h-full pt-0 pl-12 w-max will-change-transform">

                  {/* Intro Card */}
                  <div className="w-[400px] flex-shrink-0 flex flex-col justify-center mr-24 ml-12 pr-12 border-r border-white/10 h-[60vh]">
                    <div className="mb-8"><SectionHeader title="Selected Works" number="1" /></div>
                    <h3 className="text-5xl font-light text-white mb-6 leading-tight">
                      Crafting <br /><span className="text-purple-500">Tomorrow’s</span> <br />Intelligence.
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      A curated showcase of AI, Computer Vision, and Python-driven projects—where machine intelligence meets practical software engineering.
                      <br /><br /><span className="text-white border-b border-purple-500">Scroll Down to Explore →</span>
                    </p>
                  </div>

                  {/* Project Cards */}
                  <div className="flex gap-16 pr-24">
                    {projects.map((project, idx) => (
                      <AdvancedProjectCard key={idx} project={project} />
                    ))}
                  </div>

                  {/* End Card */}
                  <div className="w-[300px] flex-shrink-0 flex items-center justify-center">
                    <a href="https://github.com/abrar225" className="group flex flex-col items-center gap-6">
                      <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500"><ArrowUpRight size={32} /></div>
                      <span className="text-xl font-light text-gray-400 group-hover:text-white">View All Project's</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience & Skills Section (Extended) */}
            <section id="experience" className="py-32 max-w-5xl mx-auto px-6 relative z-10">
              <SectionWrapper>
                <SectionHeader title="Experience, Education & Skills" number="2" />
              </SectionWrapper>
              <div className="grid md:grid-cols-2 gap-16">

                {/* Left Column: Experience & Education */}
                <div className="space-y-16">

                  {/* Work Experience */}
                  <div>
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                      <Briefcase size={16} /> Career History
                    </h3>
                    <div className="relative border-l border-white/10 pl-8 space-y-12">
                      {[
                        { role: "Python Django Intern", date: "JULY 2025", desc: "Focusing on backend architecture & REST APIs." },
                        { role: "Web Developer & Designer Intern", date: "JUN 2024 — AUG 2024", desc: "Designed responsive interfaces & frontend logic." }
                      ].map((job, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-black"></span>
                          <span className="text-xs font-mono text-purple-400 mb-1 block">{job.date}</span>
                          <h4 className="text-lg text-white font-medium">{job.role}</h4>
                          <p className="text-sm text-gray-500 mt-2">{job.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                      <GraduationCap size={16} /> Education
                    </h3>
                    <div className="relative border-l border-white/10 pl-8 space-y-12">
                      {/* BE */}
                      <div className="relative">
                        <span className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-black"></span>
                        <span className="text-xs font-mono text-blue-400 mb-1 block">AUG 2023 — PRESENT</span>
                        <h4 className="text-lg text-white font-medium">Bachelor of Engineering (IT)</h4>
                        <p className="text-sm text-gray-300 mt-1">Kalol Institute of Technology & Research Center</p>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          <span className="text-gray-400">Coursework:</span> Data Structures & Algorithms, Python, ML, DBMS, OS
                        </p>
                      </div>

                      {/* Diploma - Added as requested */}
                      <div className="relative">
                        <span className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-black"></span>
                        <span className="text-xs font-mono text-blue-400 mb-1 block">2020 — 2023</span>
                        <h4 className="text-lg text-white font-medium">Diploma in Information Technology</h4>
                        <p className="text-sm text-gray-300 mt-1">Government Polytechnic, Himmatnagar</p>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          Specialized in foundational IT concepts and practical programming.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Skills & Certifications */}
                <div className="space-y-16">

                  {/* Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Cpu size={16} /> Technical Arsenal
                      </h3>
                      <span className="text-[10px] font-serif italic text-purple-400 flex items-center gap-1 border border-purple-500/30 px-2 py-1 rounded-full bg-purple-500/10">
                        <Quote size={10} /> I constantly try to improve.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Brain, t: "AI & Data Science", d: "Numpy, Pandas, OpenCV, Basic Models" },
                        { icon: Code2, t: "Languages", d: "Python, Java, PHP, JavaScript" },
                        { icon: Layers, t: "Web Frameworks", d: "Django, Flask, React, HTML/CSS" },
                        { icon: Terminal, t: "Tools & Platforms", d: "Git, GitHub, Android Studio, Linux" },
                        { icon: Database, t: "Databases", d: "MySQL, SQLite" },
                        { icon: Monitor, t: "Others", d: "VSCode, VirtualBox, PyCharm" }
                      ].map((s, i) => (
                        <div key={i} className="p-4 border border-white/10 rounded-lg bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-colors group">
                          <s.icon className="text-purple-400 mb-3 group-hover:text-white transition-colors" size={20} />
                          <h4 className="text-white text-sm font-medium mb-1">{s.t}</h4>
                          <p className="text-xs text-gray-600">{s.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                      <Trophy size={16} /> Certifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:border-purple-500/30 transition-colors">
                        <div className="mt-1"><Award size={18} className="text-yellow-500" /></div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Google Cybersecurity Professional</h4>
                          <p className="text-xs text-gray-500 mt-1">Google / Coursera • Sep 2025</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:border-purple-500/30 transition-colors">
                        <div className="mt-1"><Trophy size={18} className="text-purple-500" /></div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Smart India Hackathon 2022</h4>
                          <p className="text-xs text-gray-500 mt-1">Hackathon Participation</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:border-purple-500/30 transition-colors">
                        <div className="mt-1"><Brain size={18} className="text-blue-500" /></div>
                        <div>
                          <h4 className="text-white text-sm font-medium">Workshop on AI/ML Basics</h4>
                          <p className="text-xs text-gray-500 mt-1">Coursera / College-led Sessions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Contact Footer */}
            <section id="contact" className="py-24 border-t border-white/5 max-w-5xl mx-auto px-6 relative z-10">
              <SectionWrapper>
                <div className="flex flex-col md:flex-row justify-between gap-12">
                  <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Let's build the future.</h2>
                    <p className="text-gray-500 mb-8">Currently looking for new opportunities in AI Engineering and Full Stack Development.</p>
                    <a href="mailto:moabrarakhunji@gmail.com" className="inline-flex items-center gap-2 text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors text-lg">moabrarakhunji@gmail.com <ArrowUpRight size={16} /></a>
                  </div>
                  <div className="flex flex-col gap-4 justify-end">
                    <a href="https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"><Download size={16} /> Download Resume</a>
                    <div className="flex gap-4 mt-4">
                      <a href="#" className="p-3 border border-white/10 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-colors"><Github size={20} /></a>
                      <a href="#" className="p-3 border border-white/10 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-colors"><Linkedin size={20} /></a>
                    </div>
                  </div>
                </div>
                <div className="mt-24 flex justify-between items-center text-xs text-gray-700 font-mono uppercase">
                  <span>© 2025 Abrar Akhunji</span>
                  <span>Local time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST</span>
                </div>
              </SectionWrapper>
            </section>

          </main>
        </>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Unbounded:wght@400;700;900&family=Space+Mono:wght@400&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; background-color: #000; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .font-display { font-family: 'Unbounded', cursive; }
        .font-fashion { font-family: 'Space Grotesk', sans-serif; } /* Fallback/Replacement */
        .font-script { font-family: 'Unbounded', cursive; } /* Fallback/Replacement */
        .font-serif { font-family: 'Unbounded', cursive; } /* Override default serif */
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}