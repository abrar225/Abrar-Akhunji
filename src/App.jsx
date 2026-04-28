import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Trophy,
  Download,
  Instagram,
  FileCode,
  Music,
  Cpu
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ThreeBackground from './components/ThreeBackground';
import ThemeToggle from './components/ThemeToggle';
import ChatBot from './components/ChatBot';
import FloatingDock from './components/FloatingDock';
import SectionHeader from './components/SectionHeader';
import SectionWrapper from './components/SectionWrapper';
import ProjectCard from './components/ProjectCard';
import TextPressure from './components/TextPressure';

// Constants
import { PROJECTS, EXPERIENCE, SKILLS, EDUCATION, CERTIFICATIONS } from './constants/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [heroStyle, setHeroStyle] = useState('serif');

  const HERO_STYLES = {
    cyber: {
      top: "font-script opacity-40 tracking-widest text-3xl",
      bottom: "font-script text-white/90 tracking-tight text-5xl",
      pressure: "font-custom text-purple-500"
    },
    minimal: {
      top: "font-display font-light tracking-[0.2em] text-xl opacity-60",
      bottom: "font-display font-bold tracking-tighter text-6xl",
      pressure: ""
    },
    chaos: {
      top: "font-custom text-2xl opacity-50",
      bottom: "font-custom text-6xl text-purple-400 rotate-1",
      pressure: "font-custom"
    },
    glass: {
      top: "font-display uppercase tracking-[0.5em] text-sm opacity-30",
      bottom: "font-display font-black text-7xl text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]",
      pressure: "opacity-80"
    },
    serif: {
      top: "font-serif italic text-3xl sm:text-4xl md:text-5xl opacity-80 tracking-tight",
      bottom: "font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-purple-300 leading-[0.8] mt-4",
      pressure: "font-serif"
    },
    spatial: {
      top: "font-display text-xl sm:text-2xl md:text-3xl font-light tracking-[0.4em] uppercase text-white/30",
      bottom: "font-custom text-5xl sm:text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-600 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]",
      pressure: ""
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useLayoutEffect(() => {
    if (isLoading) return;

    let lenis;
    let updateLenis;

    let ctx = gsap.context(() => {
      // 1. Lenis Smooth Scroll
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      updateLenis = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateLenis);

      // 2. Hero Animations
      const heroElements = heroTextRef.current?.children;
      if (heroElements) {
        const tl = gsap.timeline();
        tl.fromTo(heroElements[0], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2)
          .fromTo(heroElements[2], { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.4)
          .fromTo(heroElements[3], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.6);
      }

      // 3. Responsive Scroll
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (sectionRef.current && scrollRef.current) {
          const amountToScroll = scrollRef.current.scrollWidth - window.innerWidth;
          gsap.to(scrollRef.current, {
            x: -amountToScroll,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${amountToScroll}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      if (lenis) lenis.destroy();
      if (updateLenis) gsap.ticker.remove(updateLenis);
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#030303] text-gray-300' : 'bg-[#f8f9fa] text-gray-800'} font-sans selection:bg-purple-500/30 selection:text-purple-200 transition-colors duration-300`}>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} theme={theme} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ThreeBackground theme={theme} />

          {/* Header */}
          <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 pointer-events-none">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-black/50 to-transparent' : 'bg-gradient-to-b from-white/50 to-transparent'} pointer-events-none h-32`}></div>
            <div className="pointer-events-auto">
              <span className={`font-bold tracking-tighter text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>ABRAR<span className="text-purple-500">.</span></span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
              <div className="hidden md:flex items-center gap-6">
                <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}>GH</a>
                <a href="https://www.linkedin.com/in/abrar-akhunji/" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}>LI</a>
                <a href="https://www.instagram.com/strick.9_/" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}>IG</a>
                <span className="text-xs font-mono text-gray-700">/</span>
                <span className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>INDIA, GJ</span>
              </div>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </header>

          <FloatingDock theme={theme} />
          <ChatBot theme={theme} />

          <main className="relative z-10">
            {/* Hero Section */}
            <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-10">
              <SectionWrapper className="space-y-6 flex flex-col items-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${theme === 'dark' ? 'border-purple-500/20 bg-purple-500/10' : 'border-purple-500/30 bg-purple-100/50'} backdrop-blur-md`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                  <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} tracking-widest uppercase`}>Open to work</span>
                </div>
                <h1 ref={heroTextRef} className={`text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'} leading-[1.1] md:leading-[0.9] flex flex-col items-center overflow-visible`}>
                  <span className={`inline-block ${HERO_STYLES[heroStyle].top}`}>Engineer of</span>
                  <TextPressure 
                    text="Intelligent" 
                    height="auto"
                    proximity={250}
                    className={`py-2 ${HERO_STYLES[heroStyle].pressure}`}
                  />
                  <span className={`inline-block ${HERO_STYLES[heroStyle].bottom}`}>Systems.</span>
                </h1>
                <p className={`max-w-lg text-base md:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed pt-4`}>
                  I bridge the gap between <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>complex AI models</span> and <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>scalable web architectures</span>. Building the next generation of digital products.
                </p>
              </SectionWrapper>
              <SectionWrapper delay={0.2} className="mt-16 md:mt-24 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 border-t border-white/10 sm:border-t pt-8">
                {['Experience', 'Focus', 'Stack'].map((label, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <p className={`text-[10px] md:text-xs font-mono ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} uppercase mb-1`}>{label}</p>
                    <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>{['Early Career — AI & Web Development', 'AI/ML & Full Stack', 'Python • React • Java'][i]}</p>
                  </div>
                ))}
              </SectionWrapper>
            </section>

            {/* About Me */}
            <section id="about-me" className="py-24 md:py-40 max-w-6xl mx-auto px-6 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                <div className="md:col-span-7 space-y-8">
                  <SectionWrapper>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <div className={`h-px w-24 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} ml-4`}></div>
                      <span className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>bio.txt</span>
                    </div>
                    <h2 className={`text-4xl md:text-6xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} leading-tight`}>
                      I speak <span className="font-serif italic text-purple-400">Code</span> & <br />
                      <span className="font-serif italic text-purple-400">Algorithms.</span>
                    </h2>
                  </SectionWrapper>
                  <SectionWrapper delay={0.2} className={`space-y-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed font-mono border-l ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'} pl-6 p-4 rounded-r-xl`}>
                    <p>
                      <span className="text-purple-400">const</span> <span className={theme === 'dark' ? 'text-yellow-200' : 'text-yellow-600'}>Abrar</span> = <span className="text-blue-400">{`{`}</span><br />
                      &nbsp;&nbsp;role: <span className="text-green-500">"AI/ML Engineer + Python Developer + Full-Stack Learner"</span>,<br />
                      &nbsp;&nbsp;location: <span className="text-green-500">"India,Gujrat,383001"</span>,<br />
                      &nbsp;&nbsp;passion: <span className="text-green-500">"Teaching Machines to See & Think"</span><br />
                      <span className="text-blue-400">{`}`};</span>
                    </p>
                    <p>I'm an AI/ML and Python developer specializing in backend systems and modern web development. I enjoy turning ideas into real applications—whether it's detecting tumors or identifying cattle breeds.</p>
                  </SectionWrapper>
                  <SectionWrapper delay={0.3} className={`p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'} border rounded-2xl flex items-center gap-6 hover:bg-purple-500/5 transition-colors backdrop-blur-sm`}>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Music size={24} /></div>
                    <div>
                      <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} font-medium text-sm mb-1`}>Offline Mode</h4>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>When I'm not coding, I'm writing rap songs, cooking with friends, or exploring new tech ideas.</p>
                    </div>
                  </SectionWrapper>
                </div>
                <div className="md:col-span-5 relative flex justify-center mt-12 md:mt-0">
                  <SectionWrapper delay={0.4} className={`relative w-64 md:w-72 h-80 md:h-96 rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} group transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl`}>
                    <img src="images/myimg.jpg" alt="Abrar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className={`absolute bottom-4 right-4 left-4 p-3 ${theme === 'dark' ? 'bg-black/60 border-white/10' : 'bg-white/60 border-black/10'} backdrop-blur-xl border rounded-lg z-30`}>
                      <div className={`flex items-center gap-2 text-[10px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}><FileCode size={12} /><span>stack_overflow.py</span></div>
                      <div className={`h-1 w-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} rounded-full overflow-hidden`}><div className="h-full w-2/3 bg-green-500"></div></div>
                    </div>
                  </SectionWrapper>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section id="work" ref={sectionRef} className={`relative w-full overflow-hidden z-30 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-[#f8f9fa]'}`}>
              <div className="min-h-screen md:flex md:items-center overflow-x-hidden md:overflow-hidden py-24 md:py-0">
                <div ref={scrollRef} className="flex flex-col md:flex-row md:items-center h-full gap-12 md:gap-0 md:pl-12 w-full md:w-max will-change-transform">
                  <div className={`w-full md:w-[400px] flex-shrink-0 flex flex-col justify-center px-6 md:px-0 md:mr-24 md:ml-12 md:pr-12 md:border-r ${theme === 'dark' ? 'md:border-white/10' : 'md:border-black/10'} h-auto md:h-[60vh]`}>
                    <div className="mb-8"><SectionHeader title="Selected Works" number="1" theme={theme} /></div>
                    <h3 className={`text-4xl md:text-5xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6 leading-tight`}>
                      Crafting <br /><span className="text-purple-500">Tomorrow’s</span> <br />Intelligence.
                    </h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-12 md:gap-16 px-6 md:px-0 md:pr-24">
                    {PROJECTS.map((project, idx) => (
                      <ProjectCard key={idx} project={project} theme={theme} />
                    ))}
                  </div>
                  <div className="w-full md:w-[300px] flex-shrink-0 flex items-center justify-center py-12 md:py-0">
                    <a href="https://github.com/abrar225" className="group flex flex-col items-center gap-6">
                      <div className={`w-20 md:w-24 h-20 md:h-24 rounded-full border ${theme === 'dark' ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/20 hover:bg-black hover:text-white'} flex items-center justify-center transition-all duration-500`}><ArrowUpRight size={32} /></div>
                      <span className={`text-lg md:text-xl font-light ${theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-black'}`}>View All Projects</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience, Education & Skills */}
            <section id="experience" className={`py-24 md:py-32 max-w-6xl mx-auto px-6 relative z-40 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-[#f8f9fa]'}`}>
              <SectionWrapper>
                <SectionHeader title="Experience, Education & Skills" number="2" theme={theme} />
              </SectionWrapper>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Left Column: Career & Education */}
                <div className="space-y-20">
                  {/* Career History */}
                  <div>
                    <h3 className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-10 flex items-center gap-3`}>
                      <Briefcase size={14} className="text-purple-500" /> Career History
                    </h3>
                    <div className={`relative border-l ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} ml-2 pl-8 space-y-12`}>
                      {EXPERIENCE.map((job, i) => (
                        <div key={i} className="relative group">
                          <span className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-purple-500/20 group-hover:scale-125 transition-transform"></span>
                          <span className="text-[10px] font-mono text-purple-400 mb-2 block tracking-wider">{job.date}</span>
                          <h4 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium tracking-tight`}>{job.role}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-3 leading-relaxed max-w-md`}>{job.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-10 flex items-center gap-3`}>
                      <GraduationCap size={16} className="text-blue-500" /> Education
                    </h3>
                    <div className={`relative border-l ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} ml-2 pl-8 space-y-12`}>
                      {EDUCATION.map((edu, i) => (
                        <div key={i} className="relative group">
                          <span className={`absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full ${edu.color || 'bg-blue-500'} ring-4 ring-blue-500/20 group-hover:scale-125 transition-transform`}></span>
                          <span className="text-[10px] font-mono text-blue-400 mb-2 block tracking-wider">{edu.date}</span>
                          <h4 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium tracking-tight`}>{edu.degree}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} mt-1`}>{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Skills & Certifications */}
                <div className="space-y-20">
                  {/* Technical Arsenal */}
                  <div>
                    <h3 className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-10 flex items-center gap-3`}>
                      <Cpu size={16} className="text-purple-500" /> Technical Arsenal
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SKILLS.map((skill, i) => (
                        <div key={i} className={`p-5 border ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'} rounded-xl backdrop-blur-sm hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 group`}>
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} text-purple-500 group-hover:scale-110 transition-transform`}>
                              {skill.icon && <skill.icon size={20} />}
                            </div>
                            <div>
                              <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-base font-medium mb-1 tracking-tight`}>{skill.t}</h4>
                              <p className={`text-[10px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} leading-relaxed`}>{skill.d}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-10 flex items-center gap-3`}>
                      <Trophy size={16} className="text-yellow-500" /> Certifications
                    </h3>
                    <div className="space-y-4">
                      {CERTIFICATIONS.map((cert, i) => (
                        <div key={i} className={`p-5 border ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'} rounded-xl backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300 flex items-center gap-6`}>
                          <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center ${cert.color}`}>
                            {cert.icon && <cert.icon size={24} />}
                          </div>
                          <div>
                            <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg font-medium tracking-tight`}>{cert.title}</h4>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-1`}>{cert.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer id="contact" className={`py-12 md:py-24 border-t ${theme === 'dark' ? 'border-white/5 bg-[#030303]' : 'border-black/5 bg-[#f8f9fa]'} max-w-5xl mx-auto px-6 relative z-50`}>
              <SectionWrapper>
                <div className="flex flex-col md:flex-row justify-between gap-12">
                  <div className="max-w-xl">
                    <h2 className={`text-4xl md:text-5xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6`}>Let's build the future.</h2>
                    <a href="mailto:moabrarakhunji@gmail.com" className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-black'} border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors text-lg`}>moabrarakhunji@gmail.com <ArrowUpRight size={16} /></a>
                  </div>
                  <div className="flex flex-col gap-4 justify-end">
                    <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-6 py-3 border ${theme === 'dark' ? 'border-white/10 text-gray-400 hover:bg-white/5 hover:text-white' : 'border-black/10 text-gray-600 hover:bg-black/5 hover:text-black'} rounded-lg text-sm transition-colors`}><Download size={16} /> View Github</a>
                  </div>
                </div>
                <div className={`mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px] ${theme === 'dark' ? 'text-gray-700' : 'text-gray-400'} font-mono uppercase border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} pt-8`}>
                  <span>© 2025 Abrar Akhunji</span>
                </div>
              </SectionWrapper>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}