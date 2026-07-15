import React, { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import {
  Github, Linkedin, ArrowUpRight, Briefcase, GraduationCap,
  Trophy, Download, Instagram, Music, Cpu,
  ScanEye, BrainCircuit, Network, Blocks, Rocket, Send,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// eager (lightweight / above-the-fold)
import CursorBubble from '../components/CursorBubble';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingScreen from '../components/LoadingScreen';
import ThemeToggle from '../components/ThemeToggle';
import FloatingDock from '../components/FloatingDock';
import SectionHeader from '../components/SectionHeader';
import SectionWrapper from '../components/SectionWrapper';
import DigitalTwin from '../components/DigitalTwin';
import ProjectShowcase from '../components/ProjectShowcase';
import SplitText from '../components/SplitText';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import HorizontalWords from '../components/HorizontalWords';
import VerticalMarquee from '../components/VerticalMarquee';
import RepelText from '../components/RepelText';

// lazy (heavy deps)
const ThreeBackground = lazy(() => import('../components/ThreeBackground'));

import { PROJECTS, EXPERIENCE, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants/portfolio';

gsap.registerPlugin(ScrollTrigger);

const TECH_CRAWLER = [
  'Python', 'PyTorch', 'TensorFlow', 'Computer Vision', 'React', 'Django',
  'Next.js', 'OpenCV', 'Vision Transformers', 'REST APIs', 'Three.js', 'Firebase',
];

// `sticker` is a Lucide icon component — rendered + animated by HorizontalWords
const HWORDS = [
  { text: 'SENSE', sticker: ScanEye },
  { text: 'LEARN', sticker: BrainCircuit },
  { text: 'REASON', sticker: Network },
  { text: 'BUILD', sticker: Blocks },
  { text: 'DEPLOY', sticker: Rocket },
  { text: 'SHIP', sticker: Send },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.className = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  useLayoutEffect(() => {
    if (isLoading) return;
    let lenis;
    let updateLenis;

    const ctx = gsap.context(() => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      lenis.on('scroll', ScrollTrigger.update);
      updateLenis = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    });

    // truus detail: playful tab title on blur
    const originalTitle = document.title;
    const onVis = () => { document.title = document.hidden ? 'Come back! 👋 — Abrar' : originalTitle; };
    document.addEventListener('visibilitychange', onVis);

    const t = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      if (lenis) lenis.destroy();
      if (updateLenis) gsap.ticker.remove(updateLenis);
      document.removeEventListener('visibilitychange', onVis);
      delete window.__lenis;
      clearTimeout(t);
      ctx.revert();
    };
  }, [isLoading]);

  const socials = [
    { label: 'GH', href: 'https://github.com/abrar225' },
    { label: 'LI', href: 'https://www.linkedin.com/in/abrar-akhunji/' },
    { label: 'IG', href: 'https://www.instagram.com/strick.9_/' },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-canvas text-fg font-body antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="grain" aria-hidden="true" />
        <CursorBubble />

        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Suspense fallback={null}>
              <ThreeBackground theme={theme} />
            </Suspense>

            {/* ── Header ── */}
            <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
              <Magnetic as="div" strength={0.3} className="pointer-events-auto">
                <a href="#home" className="font-display font-bold tracking-tight text-lg text-white">
                  ABRAR<span className="text-accent">.</span>
                </a>
              </Magnetic>
              <div className="flex items-center gap-5 md:gap-7 pointer-events-auto">
                <div className="hidden md:flex items-center gap-6">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-white/70 hover:text-accent transition-colors">
                      {s.label}
                    </a>
                  ))}
                  <span className="text-xs font-mono text-white/40">IND · GJ</span>
                </div>
                <div className="mix-blend-normal"><ThemeToggle theme={theme} toggleTheme={toggleTheme} /></div>
              </div>
            </header>

            <FloatingDock />

            {/* AI Digital Twin — neural orb assistant (agentic: can drive the site) */}
            <DigitalTwin
              setTheme={setTheme}
              highlightProject={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            />

            <main id="main-content" className="relative z-10">
              {/* ── Hero ── */}
              <section id="home" className="min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16 relative">
                <div className="flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted mb-10 md:mb-16">
                  <span>( Portfolio — 2026 )</span>
                  <span className="hidden md:inline">Full-Stack · AI / ML</span>
                </div>

                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-line bg-surface mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-mono text-accent tracking-widest uppercase">Open to work</span>
                </div>

                <h1 className="text-hero font-display font-medium text-fg">
                  <SplitText text="Engineer of" type="word" trigger="mount" delay={0.15} as="span" className="block" />
                  <SplitText text="Intelligent" type="char" trigger="mount" delay={0.35} stagger={0.045}
                    as="span" className="block font-serif text-accent" />
                  <SplitText text="Systems." type="word" trigger="mount" delay={0.55} as="span" className="block" />
                </h1>

                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                  <p className="md:col-span-6 md:col-start-7 text-base md:text-lg text-muted leading-relaxed">
                    I bridge the gap between <span className="text-fg">complex AI models</span> and{' '}
                    <span className="text-fg">scalable web architectures</span> — building the next generation of intelligent digital products.
                  </p>
                </div>

                <SectionWrapper delay={0.3} className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-line pt-8">
                  {[
                    ['Focus', 'AI/ML · Full-Stack'],
                    ['Stack', 'Python · React · Django'],
                    ['Based in', 'Gujarat, India'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">{k}</p>
                      <p className="text-sm text-fg font-medium">{v}</p>
                    </div>
                  ))}
                </SectionWrapper>

              </section>

              {/* ── Tech crawler (right after hero) ── */}
              <section className="py-6 md:py-8 border-y border-line bg-surface/50 overflow-hidden">
                <Marquee duration={40}>
                  {TECH_CRAWLER.map((item, i) => (
                    <span key={i} className="flex items-center font-display text-2xl md:text-4xl font-medium tracking-tight px-6 md:px-10">
                      <span className={i % 2 ? 'text-accent' : 'text-fg'}>{item}</span>
                      <span className="text-accent mx-6 md:mx-10 text-lg">✦</span>
                    </span>
                  ))}
                </Marquee>
              </section>

              {/* ── HorizontalWords statement band (pinned scrub — truus) ── */}
              <HorizontalWords words={HWORDS} />

              {/* ── About ── */}
              <section id="about-me" className="py-24 md:py-40 max-w-[1400px] mx-auto px-6 md:px-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                  <div className="md:col-span-7 space-y-10">
                    <span className="font-mono text-xs text-accent">( About )</span>

                    {/* interactive spring headline — letters flee the cursor/finger (pretext DNA) */}
                    <RepelText
                      text="I teach machines to see & think."
                      className="font-serif text-fg text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight cursor-default"
                    />

                    <SectionWrapper delay={0.1} className="space-y-6 text-muted text-sm md:text-base leading-relaxed max-w-xl pt-2">
                      <p>
                        I'm an <span className="text-fg">AI/ML &amp; Python developer</span> specializing in backend
                        systems and modern web development. I enjoy turning ideas into real applications — whether it's
                        detecting brain tumors from MRI scans or classifying 41 cattle breeds with Vision Transformers.
                      </p>
                    </SectionWrapper>

                    <SectionWrapper delay={0.2} className="font-mono text-xs md:text-sm leading-relaxed bg-surface border border-line rounded-xl p-6 max-w-xl">
                      <p className="text-faint mb-3">// identity.ts</p>
                      <p>
                        <span className="text-accent">const</span> <span className="text-fg">abrar</span> = {'{'}<br />
                        &nbsp;&nbsp;role: <span className="text-accent-soft">"AI/ML Engineer + Full-Stack Dev"</span>,<br />
                        &nbsp;&nbsp;location: <span className="text-accent-soft">"Gujarat, India"</span>,<br />
                        &nbsp;&nbsp;passion: <span className="text-accent-soft">"Teaching machines to see &amp; think"</span>,<br />
                        {'}'};
                      </p>
                    </SectionWrapper>

                    <SectionWrapper delay={0.3} className="p-6 bg-surface border border-line rounded-xl flex items-center gap-6 max-w-xl hover:border-accent/40 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-elevated flex items-center justify-center text-accent flex-shrink-0">
                        <Music size={22} />
                      </div>
                      <div>
                        <h4 className="text-fg font-medium text-sm mb-1">Offline Mode</h4>
                        <p className="text-xs text-muted">When I'm not coding, I'm writing rap songs, cooking with friends, or exploring new tech ideas.</p>
                      </div>
                    </SectionWrapper>
                  </div>

                  <div className="md:col-span-5 md:sticky md:top-32 flex justify-center">
                    <div className="relative w-64 md:w-full max-w-sm">
                      <SectionWrapper className="relative rounded-2xl overflow-hidden border border-line group aspect-[4/5]">
                        <div data-cursor="Hey 👋" className="w-full h-full">
                          <img src="/images/myimg.webp" alt="Portrait of Abrar Akhunji" loading="lazy" decoding="async"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/myimg.jpg'; }}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700" />
                        </div>
                      </SectionWrapper>
                      <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-accent text-[#0F0E0C] rounded-lg font-mono text-[10px] uppercase tracking-widest shadow-xl">
                        Open to work
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Work (Live Browser Split showcase) ── */}
              <section id="work" className="relative w-full bg-canvas py-20 md:py-28">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
                    <div className="max-w-2xl">
                      <SectionHeader title="Selected Works" number="01" kicker="Scroll to explore" />
                      <h3 className="text-mega font-serif text-fg leading-[0.95] mt-2">
                        Crafting tomorrow's <span className="text-accent">intelligence.</span>
                      </h3>
                    </div>
                    <Magnetic strength={0.4} className="hidden md:block">
                      <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer"
                        data-cursor="GitHub" className="group flex items-center gap-4">
                        <span className="text-sm font-display text-muted group-hover:text-fg transition-colors">All projects</span>
                        <span className="w-14 h-14 rounded-full border border-line group-hover:bg-accent group-hover:border-accent text-fg group-hover:text-[#0F0E0C] flex items-center justify-center transition-all duration-500">
                          <ArrowUpRight size={22} />
                        </span>
                      </a>
                    </Magnetic>
                  </div>

                  <ProjectShowcase projects={PROJECTS} />

                  <div className="flex md:hidden justify-center mt-12">
                    <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 border border-line rounded-full text-sm font-medium text-fg">
                      View all projects <ArrowUpRight size={16} className="text-accent" />
                    </a>
                  </div>
                </div>
              </section>

              {/* ── The Stack (vertical double marquee of logos) ── */}
              <section className="py-24 md:py-32 max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div>
                    <SectionHeader title="The Stack" number="02" kicker="Always shipping" />
                    <p className="text-muted text-sm md:text-base leading-relaxed max-w-md mt-6">
                      A living toolkit spanning machine learning, computer vision and full-stack web —
                      the tools I reach for to take an idea from notebook to production.
                    </p>
                    <div className="flex flex-wrap gap-2.5 mt-8">
                      {['AI / ML', 'Computer Vision', 'Backend', 'Full-Stack', 'Realtime'].map((t) => (
                        <span key={t} className="tag px-4 py-2 text-xs font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                  <VerticalMarquee />
                </div>
              </section>

              {/* ── Experience / Education / Skills / Certs ── */}
              <section id="experience" className="py-24 md:py-32 max-w-[1400px] mx-auto px-6 md:px-12 relative bg-canvas">
                <SectionWrapper><SectionHeader title="Path & Recognition" number="03" kicker="Experience · Education · Certs" /></SectionWrapper>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                  <div className="space-y-20">
                    <div>
                      <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-10 flex items-center gap-3">
                        <Briefcase size={14} className="text-accent" /> Career History
                      </h3>
                      <div className="relative border-l border-line ml-2 pl-8 space-y-12">
                        {EXPERIENCE.map((job, i) => (
                          <SectionWrapper key={i} delay={i * 0.05} className="relative group">
                            <span className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20 group-hover:scale-125 transition-transform" />
                            <span className="text-[10px] font-mono text-accent mb-2 block tracking-wider">{job.date}</span>
                            <h4 className="text-xl text-fg font-medium tracking-tight">{job.role}</h4>
                            <p className="text-sm text-muted mt-2 leading-relaxed max-w-md">{job.desc}</p>
                          </SectionWrapper>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-10 flex items-center gap-3">
                        <GraduationCap size={16} className="text-accent" /> Education
                      </h3>
                      <div className="relative border-l border-line ml-2 pl-8 space-y-12">
                        {EDUCATION.map((edu, i) => (
                          <SectionWrapper key={i} delay={i * 0.05} className="relative group">
                            <span className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20 group-hover:scale-125 transition-transform" />
                            <span className="text-[10px] font-mono text-accent mb-2 block tracking-wider">{edu.date}</span>
                            <h4 className="text-xl text-fg font-medium tracking-tight">{edu.degree}</h4>
                            <p className="text-sm text-muted mt-1">{edu.school}</p>
                          </SectionWrapper>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-20">
                    <div>
                      <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-10 flex items-center gap-3">
                        <Cpu size={16} className="text-accent" /> Technical Arsenal
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {SKILLS.map((skill, i) => (
                          <SectionWrapper key={i} delay={i * 0.04}
                            className="p-5 border border-line bg-surface rounded-xl hover:border-accent/40 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                              <div className="p-2 rounded-lg bg-elevated text-accent group-hover:scale-110 transition-transform">
                                {skill.icon && <skill.icon size={20} />}
                              </div>
                              <div>
                                <h4 className="text-fg text-base font-medium mb-1 tracking-tight">{skill.t}</h4>
                                <p className="text-[11px] text-muted leading-relaxed">{skill.d}</p>
                              </div>
                            </div>
                          </SectionWrapper>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-10 flex items-center gap-3">
                        <Trophy size={16} className="text-accent" /> Certifications
                      </h3>
                      <div className="space-y-3">
                        {CERTIFICATIONS.map((cert, i) => {
                          const Inner = (
                            <div className={`p-5 border border-line bg-surface rounded-xl transition-all duration-300 flex items-center gap-5 ${cert.driveLink ? 'hover:border-accent/50 hover:bg-elevated' : ''}`}>
                              <div className="w-11 h-11 flex-shrink-0 rounded-full bg-elevated flex items-center justify-center text-accent">
                                {cert.icon && <cert.icon size={20} />}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-fg text-base font-medium tracking-tight">{cert.title}</h4>
                                <p className="text-xs text-muted mt-1">{cert.desc}</p>
                              </div>
                              {cert.driveLink && <ArrowUpRight size={16} className="text-accent flex-shrink-0" />}
                            </div>
                          );
                          return cert.driveLink ? (
                            <a key={i} href={cert.driveLink} target="_blank" rel="noopener noreferrer" data-cursor="View" className="block">{Inner}</a>
                          ) : <div key={i}>{Inner}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Contact / Footer ── */}
              <footer id="contact" className="pt-24 md:pt-32 border-t border-line bg-canvas relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                  <span className="font-mono text-xs text-accent">( Contact )</span>
                  <SplitText
                    text="Let's build the future."
                    type="word"
                    className="text-hero font-serif text-fg mt-6 mb-10"
                  />
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                    <Magnetic strength={0.25}>
                      <a href="mailto:abrar@abrarakhunji.com" data-cursor="Email"
                        className="inline-flex items-center gap-3 text-2xl md:text-4xl font-display font-medium text-fg link-underline">
                        abrar@abrarakhunji.com <ArrowUpRight size={28} className="text-accent" />
                      </a>
                    </Magnetic>
                    <div className="flex flex-col gap-4">
                      <a href="https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing"
                        target="_blank" rel="noopener noreferrer" data-cursor="Download"
                        className="flex items-center gap-3 px-6 py-3 border border-line text-fg hover:bg-accent hover:border-accent hover:text-[#0F0E0C] rounded-full text-sm font-medium transition-all">
                        <Download size={16} /> Download Resume
                      </a>
                      <div className="flex gap-3">
                        {[
                          { icon: Github, href: 'https://github.com/abrar225' },
                          { icon: Linkedin, href: 'https://www.linkedin.com/in/abrar-akhunji/' },
                          { icon: Instagram, href: 'https://www.instagram.com/strick.9_/' },
                        ].map((s, i) => (
                          <Magnetic as="span" key={i} strength={0.4} className="inline-block">
                            <a href={s.href} target="_blank" rel="noopener noreferrer"
                              className="w-11 h-11 flex items-center justify-center rounded-full border border-line text-muted hover:text-accent hover:border-accent transition-colors">
                              <s.icon size={18} />
                            </a>
                          </Magnetic>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden border-t border-line py-6">
                  <Marquee duration={30} reverse>
                    {['AVAILABLE FOR WORK', 'AI / ML ENGINEER', 'FULL-STACK DEVELOPER', 'LET\'S TALK'].map((t, i) => (
                      <span key={i} className="flex items-center font-display text-xl md:text-2xl font-medium px-6 text-muted">
                        {t} <span className="text-accent mx-6">✦</span>
                      </span>
                    ))}
                  </Marquee>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-faint">
                  <span>© 2026 Abrar Akhunji</span>
                  <a href="#home" className="hover:text-accent transition-colors">Back to top ↑</a>
                  <span>Built with React · GSAP · Three.js</span>
                </div>
              </footer>
            </main>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
