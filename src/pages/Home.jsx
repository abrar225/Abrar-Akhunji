import { useState, useEffect, useLayoutEffect, useRef, useCallback, lazy, Suspense } from 'react';
import {
  Github, Linkedin, ArrowUpRight, Download, Instagram,
  Calendar, Brain, Eye, Sparkles, Layers,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CursorBubble from '../components/CursorBubble';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingScreen from '../components/LoadingScreen';
import ThemeToggle from '../components/ThemeToggle';
import FloatingDock from '../components/FloatingDock';
import SectionHeader from '../components/SectionHeader';
import ProjectShowcase from '../components/ProjectShowcase';
import SplitText from '../components/SplitText';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import HorizontalWords from '../components/HorizontalWords';
import VerticalMarquee from '../components/VerticalMarquee';
import RepelText from '../components/RepelText';
import TiltSurface from '../components/TiltSurface';
import { ScrollThread, ProgressiveBlur, StoryMotion } from '../components/ScrollStory';
import { ArrowNudge } from '../components/icons/motionIcons';
import FooterAsciiLife from '../components/FooterAsciiLife';
import MarkedText from '../components/MarkedText';
import { SKILL_PHRASES, RECORD_PHRASES } from '../lib/highlightPhrases';
import { STAGE_SECONDS } from '../components/heroTopologies';
import { soundFX } from '../lib/soundFX';
import { useTheme } from '../lib/useTheme';

const ThreeBackground = lazy(() => import('../components/ThreeBackground'));

import { PROJECTS, EXPERIENCE, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants/portfolio';
import { getLatestBlogs } from '../lib/blogUtils';
import { postPath } from '../lib/content/urls.js';
import servicesData from '../data/services.json';

const SERVICE_ICONS = { brain: Brain, eye: Eye, sparkles: Sparkles, layers: Layers };

gsap.registerPlugin(ScrollTrigger);

const RESUME = 'https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing';

const DISCIPLINES = [
  'Python', 'PyTorch', 'TensorFlow', 'Computer Vision', 'React', 'Django',
  'Next.js', 'OpenCV', 'Vision Transformers', 'REST APIs', 'Three.js', 'Firebase',
];

const HWORDS = [
  { text: 'Sense' },
  { text: 'Learn' },
  { text: 'Reason' },
  { text: 'Build' },
  { text: 'Ship' },
];

const PHASES = [
  'LLM ATTENTION CORTEX',
  'ZERO-TRUST AUTH LATTICE',
  'ViT PERCEPTION & AGENT LOOP',
];

const NOTE_SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

function SimReadout({ sim, seekRef }) {
  const reduce = useReducedMotion();
  const phase = PHASES[sim.index] || PHASES[0];
  return (
    <div>
      <p data-sim-phase={sim.index} aria-live="polite" className="font-mono text-[9px] min-[380px]:text-[10px] tracking-[0.12em] min-[380px]:tracking-[0.14em] uppercase text-fg/85 whitespace-nowrap">
        <span className="text-accent">[0{sim.index + 1}/03]</span>
        <span className="ml-2">{phase}</span>
      </p>
      <div className="mt-2 h-px w-36 overflow-hidden bg-line mx-auto xl:mx-0" aria-hidden="true">
        <div
          key={`${sim.index}-${sim.nonce}`}
          className="h-full w-full origin-left bg-accent"
          style={reduce ? { transform: 'scaleX(1)' } : { animation: `sim-fill ${STAGE_SECONDS}s linear forwards` }}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1 xl:justify-start">
        {PHASES.map((name, i) => (
          <button
            key={name}
            type="button"
            aria-label={name}
            aria-pressed={sim.index === i}
            onClick={() => {
              soundFX.playStageMorph(i, { manual: true });
              seekRef.current?.(i);
            }}
            className="p-1"
          >
            <span className={`block h-1 rounded-full transition-all ${sim.index === i ? 'w-6 bg-accent' : 'w-3 bg-line hover:bg-faint'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function scrollToId(event, hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  event.preventDefault();
  if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    try { return sessionStorage.getItem('abrar_intro_seen') !== '1'; } catch { return true; }
  });
  const { theme, toggleTheme: flipTheme } = useTheme();
  const seekRef = useRef(null);
  const [sim, setSim] = useState({ index: 0, nonce: 0 });
  const onPhase = useCallback((next) => {
    setSim((prev) => ({ index: next.index, nonce: prev.nonce + 1 }));
  }, []);

  const handleIntroComplete = useCallback(() => {
    try { sessionStorage.setItem('abrar_intro_seen', '1'); } catch { /* storage unavailable */ }
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    soundFX.playToggle();
    flipTheme();
  };

  useEffect(() => {
    if (isLoading) return undefined;
    const nodes = document.querySelectorAll('.hl-mark');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [isLoading]);

  useLayoutEffect(() => {
    if (isLoading) return undefined;
    let lenis;
    let updateLenis;

    const ctx = gsap.context(() => {
      lenis = new Lenis({
        duration: 1.15,
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

    const originalTitle = document.title;
    const onVis = () => { document.title = document.hidden ? 'Come back! 👋 — Abrar' : originalTitle; };
    document.addEventListener('visibilitychange', onVis);

    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
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

  const latestBlogs = getLatestBlogs(4);

  return (
    <ErrorBoundary>
      <div className="min-h-dvh bg-canvas text-fg font-body antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="grain" aria-hidden="true" />
        <CursorBubble />

        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={handleIntroComplete} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
              <div className="pointer-events-auto flex items-center justify-between gap-4 px-6 md:px-12 py-5">
                <Magnetic as="div" strength={0.3}>
                  <a href="#home" onClick={(e) => scrollToId(e, '#home')} className="font-display font-semibold tracking-[-0.04em] text-lg text-fg">
                    ABRAR.
                  </a>
                </Magnetic>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="hidden sm:flex items-center gap-4 md:gap-5">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="me noopener noreferrer"
                        className="text-[11px] font-mono text-muted hover:text-fg transition-colors">
                        {s.label}
                      </a>
                    ))}
                  </div>
                  <Link to="/blog/" className="relative text-[11px] font-mono uppercase tracking-[0.16em] text-muted hover:text-fg transition-colors">
                    Blog
                    <span className="status-dot absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-accent" />
                  </Link>
                  <Link to="/hire/" className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.16em] text-muted hover:text-fg transition-colors">
                    Hire
                  </Link>
                  <span className="hidden lg:inline font-mono text-[11px] tracking-[0.16em] text-muted">Ahmedabad, IN</span>
                  <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
              </div>
            </header>

            <FloatingDock />
            <ScrollThread />
            <ProgressiveBlur />
            <StoryMotion />

            <main id="main-content" className="relative z-10">
              <section id="home" className="relative min-h-[100svh] overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 pt-20 sm:pt-24 lg:pt-28 pb-24 xl:pb-32 min-h-[100svh] flex flex-col justify-start xl:justify-end">
                  <div className="relative z-10 max-w-3xl">
                    <div className="hero-kicker flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5 mb-4 md:mb-7 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-muted">
                      <span className="inline-flex items-center gap-2 text-accent">
                        <span className="status-dot w-1.5 h-1.5 rounded-full bg-accent" />
                        Open to work
                      </span>
                      <span className="text-faint">Portfolio 2026</span>
                      <span className="hidden sm:inline text-faint">Ahmedabad, India</span>
                    </div>

                    <h1 className="text-hero hero-lines font-display font-medium text-fg">
                      <SplitText text="Engineer of" type="word" trigger="mount" delay={0.08} as="span" className="block" />
                      <SplitText
                        text="Intelligent"
                        type="word"
                        trigger="mount"
                        delay={0.22}
                        as="span"
                        className="block font-serif italic font-normal hero-serif"
                      />
                      <SplitText text="Systems." type="word" trigger="mount" delay={0.42} as="span" className="block" />
                    </h1>

                    <p className="hero-lead mt-4 sm:mt-6 md:mt-8 max-w-xl text-[0.95rem] sm:text-base md:text-[1.125rem] text-muted leading-[1.55] sm:leading-relaxed" data-speakable="true">
                      I bridge the gap between <span className="hl-mark">complex AI models</span> and{' '}
                      <span className="hl-mark">scalable web architectures</span> — building the next generation of{' '}
                      <span className="hl-mark">intelligent digital products</span>.
                    </p>

                    <div className="hero-actions mt-5 sm:mt-7 md:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <motion.a
                        href="#work"
                        onClick={(e) => scrollToId(e, '#work')}
                        initial="rest"
                        whileHover="hover"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-accent text-on-accent text-[12.5px] sm:text-sm font-medium press-effect"
                      >
                        Selected works <ArrowNudge size={15} />
                      </motion.a>
                      <a
                        href={RESUME}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Resume"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-line text-fg text-[12.5px] sm:text-sm font-medium hover:border-accent transition-colors press-effect"
                      >
                        <Download size={14} /> Resume
                      </a>
                      <a
                        href="#contact"
                        onClick={(e) => scrollToId(e, '#contact')}
                        className="inline-flex items-center px-2 sm:px-3 py-2.5 sm:py-3 text-[12.5px] sm:text-sm text-fg/80 hover:text-fg transition-colors"
                      >
                        Contact
                      </a>
                    </div>
                  </div>

                  <div className="relative mt-6 sm:mt-8 w-full xl:static xl:mt-0">
                    <div className="pointer-events-auto relative z-20 mx-auto w-fit max-w-[calc(100%-1rem)] p-0 text-center xl:absolute xl:left-auto xl:right-14 xl:top-28 xl:mx-0 xl:max-w-[320px] xl:text-left xl:[text-shadow:0_1px_0_var(--color-canvas)]">
                      <SimReadout sim={sim} seekRef={seekRef} />
                    </div>
                    <div
                      className="ascii-stage relative mt-4 -mx-5 sm:-mx-6 md:-mx-12 h-[240px] sm:h-[260px] md:h-[clamp(200px,24vh,240px)] w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] xl:absolute xl:inset-0 xl:mx-0 xl:mt-0 xl:h-full xl:w-full"
                      aria-hidden="true"
                    >
                      <Suspense fallback={null}>
                        <ThreeBackground theme={theme} seekRef={seekRef} onPhase={onPhase} />
                      </Suspense>
                      <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-canvas via-canvas/65 to-transparent xl:block" />
                    </div>
                  </div>
                </div>

                <div className="hidden xl:flex absolute right-14 bottom-40 z-10 items-end gap-10 pointer-events-none [text-shadow:0_1px_0_var(--color-canvas)]">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint mb-1">Focus</p>
                    <p className="text-sm text-fg">AI/ML · Full-Stack</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint mb-1">Stack</p>
                    <p className="text-sm text-fg">Python · React · Django</p>
                  </div>
                </div>
              </section>

              <section className="border-y border-line overflow-hidden" aria-hidden="true">
                <Marquee duration={48}>
                  {DISCIPLINES.map((item) => (
                    <span key={item} className="flex items-center font-display text-lg md:text-2xl font-medium tracking-tight px-5 md:px-7 text-muted">
                      {item}
                      <span className="text-accent mx-5 md:mx-7 font-serif italic text-xl">/</span>
                    </span>
                  ))}
                </Marquee>
              </section>

              <section id="work" className="relative w-full py-20 md:py-28">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4 md:mb-6">
                    <SectionHeader title="Selected works" kicker="Proof, first." index="01 — Studies" className="mb-0 flex-1" />
                    <Magnetic strength={0.35} className="hidden md:block">
                      <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer"
                        data-cursor="GitHub" className="group flex items-center gap-4">
                        <span className="text-sm text-muted group-hover:text-fg transition-colors">All projects</span>
                        <span className="w-12 h-12 rounded-full border border-line group-hover:bg-accent group-hover:border-accent text-fg group-hover:text-on-accent flex items-center justify-center transition-colors duration-300">
                          <ArrowUpRight size={18} />
                        </span>
                      </a>
                    </Magnetic>
                  </div>
                  <ProjectShowcase projects={PROJECTS} />
                  <div className="flex md:hidden justify-center mt-10">
                    <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-line rounded-full text-sm text-fg">
                      All projects <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </section>

              <section id="practice" className="py-20 md:py-28 border-t border-line">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                  <SectionHeader title="The practice" kicker="Tools I actually ship with." index="02 — Capabilities" />
                  <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
                    <div className="lg:col-span-6 grid sm:grid-cols-2 gap-x-8">
                      {SKILLS.map((skill, i) => (
                        <TiltSurface key={skill.t}>
                          <article className="border-t border-line py-6 md:py-7 min-h-[148px] flex flex-col">
                            <div className="flex items-center justify-between mb-6 text-accent">
                              <span className="font-mono text-[10px] tracking-[0.18em] text-faint">{String(i + 1).padStart(2, '0')}</span>
                              {skill.icon && <skill.icon size={18} />}
                            </div>
                            <h3 className="font-display text-lg tracking-tight text-fg">{skill.t}</h3>
                            <p className="mt-2 text-sm text-muted leading-relaxed"><MarkedText text={skill.d} phrases={SKILL_PHRASES} /></p>
                          </article>
                        </TiltSurface>
                      ))}
                    </div>
                    <div className="lg:col-span-6 overflow-hidden h-[420px] md:h-[480px] lg:border-l lg:border-line lg:pl-10">
                      <VerticalMarquee />
                    </div>
                  </div>
                </div>
              </section>

              <section id="experience" className="py-20 md:py-28 border-t border-line">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                  <SectionHeader title="Record" kicker="Where the work was made." index="03 — Path" />
                  <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-7">
                      <h3 className="font-serif italic text-2xl text-fg mb-2">Experience</h3>
                      <div className="border-t border-line">
                        {EXPERIENCE.map((job) => (
                          <article key={job.role} className="grid md:grid-cols-[9.5rem_1fr] gap-2 md:gap-8 py-6 border-b border-line">
                            <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{job.date}</p>
                            <div>
                              <h4 className="font-display text-xl md:text-2xl tracking-tight text-fg">{job.role}</h4>
                              <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl"><MarkedText text={job.desc} phrases={RECORD_PHRASES} /></p>
                            </div>
                          </article>
                        ))}
                      </div>

                      <h3 className="font-serif italic text-2xl text-fg mt-14 mb-2">Education</h3>
                      <div className="grid sm:grid-cols-2 sm:gap-x-10 border-t border-line">
                        {EDUCATION.map((edu) => (
                          <article key={edu.degree} className="py-6 border-b border-line">
                            <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase mb-4">{edu.date}</p>
                            <h4 className="font-display text-xl tracking-tight text-fg leading-snug"><span className="hl-mark">{edu.degree}</span></h4>
                            <p className="mt-2 text-sm text-muted">{edu.school}</p>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <h3 className="font-serif italic text-2xl text-fg mb-2">Recognition</h3>
                      <div className="border-t border-line">
                        {CERTIFICATIONS.map((cert, i) => {
                          const body = (
                            <div className="grid grid-cols-[2.2rem_1fr_auto] gap-3 py-4 border-b border-line items-start">
                              <span className="font-mono text-[11px] text-faint pt-1">{String(i + 1).padStart(2, '0')}</span>
                              <div>
                                <h4 className="text-fg font-medium tracking-tight">{cert.title}</h4>
                                <p className="text-sm text-muted mt-1 leading-relaxed"><MarkedText text={cert.desc} phrases={RECORD_PHRASES} /></p>
                              </div>
                              {cert.driveLink ? <ArrowUpRight size={15} className="text-accent mt-1" /> : <span />}
                            </div>
                          );
                          return cert.driveLink ? (
                            <a key={cert.title} href={cert.driveLink} target="_blank" rel="noopener noreferrer" data-cursor="View" className="block hover:bg-surface/70 transition-colors">
                              {body}
                            </a>
                          ) : (
                            <div key={cert.title}>{body}</div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <HorizontalWords words={HWORDS} />

              <section id="about-me" className="py-20 md:py-28">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                  <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-7">
                      <div data-chapter className="chapter-reveal">
                      <p className="font-serif italic text-accent text-xl md:text-2xl mb-4">The person at the bench.</p>
                      <RepelText
                        text="I teach machines to see & think."
                        plate="see & think."
                        className="font-serif text-fg text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight"
                      />
                      </div>
                      <p className="mt-8 max-w-xl text-muted text-base leading-relaxed">
                        I&apos;m an <span className="hl-mark">AI/ML and full-stack engineer</span> specializing in backend
                        systems, computer vision and the web layer that puts a model in someone&apos;s hands. I enjoy turning
                        ideas into real applications — whether it&apos;s detecting{' '}
                        <span className="hl-mark">brain tumors from MRI scans</span> or classifying{' '}
                        <span className="hl-mark">41 cattle breeds with Vision Transformers</span>.
                      </p>
                      <div className="mt-10 grid sm:grid-cols-3 border-y border-line">
                        <article className="py-6 sm:pr-6">
                          <p className="font-mono text-[10px] tracking-[0.18em] text-faint mb-4">01</p>
                          <h3 className="font-display text-lg text-fg tracking-tight">Practice</h3>
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            AI/ML and Python, with <span className="hl-mark">backend systems</span> and the web layer that puts a model in someone&apos;s hands.
                          </p>
                        </article>
                        <article className="py-6 sm:px-6 sm:border-l border-line border-t sm:border-t-0">
                          <p className="font-mono text-[10px] tracking-[0.18em] text-faint mb-4">02</p>
                          <h3 className="font-display text-lg text-fg tracking-tight">Research</h3>
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            <span className="hl-mark">Tumor presence in MRI scans</span>, and 41 Indian cattle breeds read by a <span className="hl-mark">Vision Transformer</span>.
                          </p>
                        </article>
                        <article className="py-6 sm:pl-6 sm:border-l border-line border-t sm:border-t-0">
                          <p className="font-mono text-[10px] tracking-[0.18em] text-faint mb-4">03</p>
                          <h3 className="font-display text-lg text-fg tracking-tight">Off the bench</h3>
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            Writing rap, cooking with friends, and chasing the next <span className="hl-mark">technical idea</span>. Based in Ahmedabad.
                          </p>
                        </article>
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                      <figure className="relative">
                        <div data-cursor="Hello" className="relative overflow-hidden aspect-[4/5] bg-elevated">
                          <img
                            src="/images/myimg.webp"
                            alt="Portrait of Abrar Akhunji"
                            width="960"
                            height="1200"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/myimg.jpg'; }}
                            className="absolute inset-0 w-full h-full object-cover object-[center_20%] grayscale hover:grayscale-0 transition-[filter] duration-700"
                          />
                        </div>
                        <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-faint">
                          <span>Abrar Akhunji</span>
                          <span>Open to work</span>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </section>

              {latestBlogs.length > 0 && (
                <section id="writing" className="py-20 md:py-28 border-t border-line">
                  <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2">
                      <SectionHeader title="Field notes" kicker={<>Writing on the <span className="hl-mark">systems</span> I study.</>} index="04 — Notes" className="mb-0 flex-1" />
                      <Magnetic strength={0.35} className="hidden md:block">
                        <Link to="/blog/" data-cursor="Notes" className="group flex items-center gap-4">
                          <span className="text-sm text-muted group-hover:text-fg transition-colors">All notes</span>
                          <span className="w-12 h-12 rounded-full border border-line group-hover:bg-accent group-hover:border-accent text-fg group-hover:text-on-accent flex items-center justify-center transition-colors">
                            <ArrowUpRight size={18} />
                          </span>
                        </Link>
                      </Magnetic>
                    </div>
                    <div className="grid items-stretch lg:grid-cols-12 gap-6 md:gap-8">
                      {latestBlogs.map((blog, i) => {
                        const wide = i === 0 || i === 3;
                        return (
                          <TiltSurface key={blog.slug} className={NOTE_SPANS[i]}>
                            <Link
                              to={postPath(blog.slug)}
                              data-cursor="Read"
                              className="group bg-canvas flex h-full flex-col border border-line"
                            >
                              {blog.heroImage && (
                                <div className={`overflow-hidden bg-elevated ${wide ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
                                  <img src={blog.heroImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                                </div>
                              )}
                              <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                                  <Calendar size={11} />
                                  <span>{blog.date}</span>
                                  {blog.tags.slice(0, 1).map((tag) => (
                                    <span key={tag} className="text-accent">{tag}</span>
                                  ))}
                                </div>
                                <h3 className={`font-display tracking-tight text-fg leading-snug ${wide ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                                  {blog.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted line-clamp-3">{blog.description}</p>
                              </div>
                            </Link>
                          </TiltSurface>
                        );
                      })}
                    </div>
                    <div className="flex md:hidden justify-center mt-8">
                      <Link to="/blog/" className="inline-flex items-center gap-2 px-5 py-3 border border-line rounded-full text-sm text-fg">
                        All notes <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              <section id="services" className="py-20 md:py-28 border-t border-line">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <SectionHeader
                      title="Work with me"
                      kicker={<>AI/ML, vision and product builds for teams in <span className="hl-mark">Ahmedabad, Gandhinagar and Bangalore</span>.</>}
                      index="05 — Engagements"
                      className="mb-0 flex-1"
                    />
                    <Magnetic strength={0.35} className="hidden md:block">
                      <Link to="/hire/" className="group flex items-center gap-4">
                        <span className="text-sm text-muted group-hover:text-fg transition-colors">Services &amp; availability</span>
                        <span className="w-12 h-12 rounded-full border border-line group-hover:bg-accent group-hover:border-accent text-fg group-hover:text-on-accent flex items-center justify-center transition-colors">
                          <ArrowUpRight size={18} />
                        </span>
                      </Link>
                    </Magnetic>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
                    {servicesData.services.map((service) => {
                      const Icon = SERVICE_ICONS[service.icon] || Layers;
                      return (
                        <Link key={service.id} to="/hire/" className="group bg-canvas p-6 hover:bg-surface transition-colors">
                          <Icon size={18} className="text-accent mb-6" />
                          <h3 className="font-display text-lg text-fg tracking-tight group-hover:text-accent transition-colors">{service.title}</h3>
                          <p className="mt-2 text-sm text-muted leading-relaxed">{service.summary}</p>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {servicesData.locations.map((location) => (
                      <span key={location.city} className="px-3 py-1.5 rounded-full border border-line text-[11px] font-mono text-muted">
                        {location.city}
                      </span>
                    ))}
                    <span className="text-[11px] font-mono text-faint">· {servicesData.availability}</span>
                  </div>

                  <div className="flex md:hidden mt-8">
                    <Link to="/hire/" className="inline-flex items-center gap-2 px-5 py-3 border border-line rounded-full text-sm text-fg">
                      Services &amp; availability <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </section>

              <footer id="contact" className="border-t border-line pt-16 md:pt-24">
                <div className="mx-auto max-w-[1440px] px-6 pb-12 md:px-12 md:pb-16">
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
                    <div className="min-w-0 lg:col-span-5">
                      <div className="[perspective:1000px]">
                        <div data-chapter className="chapter-reveal">
                          <p className="font-serif text-xl italic text-accent md:text-2xl">A conversation, not a ticket.</p>
                          <h2 className="text-contact mt-4 max-w-3xl font-serif text-fg">
                            Let&apos;s build the <span className="hl-solid">future</span>.
                          </h2>
                        </div>
                      </div>
                      <a
                        href="mailto:abrar@abrarakhunji.com"
                        data-cursor="Email"
                        className="link-underline mt-8 inline-flex max-w-full min-w-0 items-center gap-3 break-all font-display font-medium text-fg text-[clamp(1.15rem,4.5vw,2.25rem)] sm:break-normal"
                      >
                        abrar@abrarakhunji.com <ArrowUpRight size={26} className="shrink-0 text-accent" />
                      </a>
                      <Link to="/hire/" className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
                        Services &amp; availability in Ahmedabad, Gandhinagar and Bangalore <ArrowUpRight size={14} />
                      </Link>
                      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <a
                          href={RESUME}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="Resume"
                          className="press-effect inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent"
                        >
                          <Download size={15} /> Download resume
                        </a>
                        <div className="flex gap-2">
                          {[
                            { icon: Github, href: 'https://github.com/abrar225', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/abrar-akhunji/', label: 'LinkedIn' },
                            { icon: Instagram, href: 'https://www.instagram.com/strick.9_/', label: 'Instagram' },
                          ].map((s) => (
                            <a
                              key={s.label}
                              href={s.href}
                              target="_blank"
                              rel="me noopener noreferrer"
                              aria-label={s.label}
                              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
                            >
                              <s.icon size={16} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 h-64 sm:h-80 md:h-96 lg:col-span-7 lg:h-[430px]">
                      <FooterAsciiLife theme={theme} />
                    </div>
                  </div>
                </div>
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-28 md:pb-32 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono uppercase tracking-[0.16em] text-faint">
                  <span>© 2026 Abrar Akhunji</span>
                  <span className="text-center">Ahmedabad · Gandhinagar · Bangalore · Remote</span>
                  <a href="#home" onClick={(e) => scrollToId(e, '#home')} className="hover:text-fg transition-colors">Back to top</a>
                </div>
              </footer>
            </main>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
