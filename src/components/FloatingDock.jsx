import React, { useState, useCallback, useEffect } from 'react';
import {
  Home, User, Layers, Briefcase, Mail, FileText,
  PenLine, Volume2, VolumeX, LayoutGrid, X, Cpu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Magnetic from './Magnetic';
import { MotionGlyph } from './icons/motionIcons';
import { soundFX } from '../lib/soundFX';

const ARC_START_DEG = 5;
const ARC_END_DEG = 175;
const SPRING = { type: 'spring', stiffness: 300, damping: 22 };

/** Convert degrees → radians */
const deg2rad = (d) => (d * Math.PI) / 180;

/** Get x,y offset for item at index `i` out of `total` items along the arc */
function arcPosition(i, total, radius) {
  const angle = ARC_START_DEG + (i / (total - 1)) * (ARC_END_DEG - ARC_START_DEG);
  const rad = deg2rad(angle);
  return {
    x: Math.cos(rad) * radius * -1, // negate so left side of arc is on the left
    y: Math.sin(rad) * radius * -1,  // negative = upward
  };
}

/* ═══════════════════════════════════════════════════════════════════
   MobileRadialNav — FAB + arc fan-out (only rendered on < md)
   ═══════════════════════════════════════════════════════════════════ */
function scrollToId(hash) {
  const el = document.querySelector(hash);
  if (!el) return false;
  if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: 'smooth' });
  return true;
}

function MobileRadialNav() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const [muted, setMuted] = useState(() => soundFX.isMuted());
  const navigate = useNavigate();

  const toggleAudio = useCallback(() => {
    const nextMuted = soundFX.toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) soundFX.playClick();
  }, []);

  const close = useCallback(() => {
    soundFX.playClick();
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    soundFX.playClick();
    setIsOpen((prev) => !prev);
  }, []);

  /* Each item: { icon, label, action() } */
  const items = [
    { icon: Home, label: 'Home', action: () => { scrollToId('#home'); close(); } },
    { icon: Layers, label: 'Work', action: () => { scrollToId('#work'); close(); } },
    { icon: Cpu, label: 'Practice', action: () => { scrollToId('#practice'); close(); } },
    { icon: Briefcase, label: 'Record', action: () => { scrollToId('#experience'); close(); } },
    { icon: User, label: 'About', action: () => { scrollToId('#about-me'); close(); } },
    {
      icon: PenLine, label: 'Notes',
      action: () => {
        close();
        if (!scrollToId('#writing')) setTimeout(() => navigate('/blog'), 150);
      },
    },
    {
      icon: FileText, label: 'CV',
      action: () => {
        window.open('https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing', '_blank', 'noopener');
        close();
      },
    },
    {
      icon: muted ? VolumeX : Volume2,
      label: muted ? 'Unmute' : 'Mute',
      action: () => { toggleAudio(); },
    },
    {
      icon: Mail, label: 'Hire',
      action: () => { window.location.href = 'mailto:abrar@abrarakhunji.com'; close(); },
      accent: true,
    },
  ];

  const totalItems = items.length;
  // Dynamically calculate radius based on screen width (approx 42% of width, capped at 160px)
  const radius = Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.42 : 160, 160);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] pointer-events-none md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[59] pointer-events-auto"
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* ── Arc items ── */}
      <div className="relative z-[60] flex items-end justify-center pointer-events-none"
        style={{ height: `${radius + 80}px` }}
      >
        <AnimatePresence>
          {isOpen && items.map((item, i) => {
            const pos = arcPosition(i, totalItems, radius);
            return (
              <motion.button
                key={item.label}
                type="button"
                aria-label={item.label}
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playClick();
                  item.action();
                }}
                initial={{ opacity: 0, x: 0, y: 0, scale: prefersReduced ? 1 : 0 }}
                animate={{
                  opacity: 1,
                  x: prefersReduced ? 0 : pos.x,
                  y: prefersReduced ? 0 : pos.y,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: prefersReduced ? 1 : 0,
                }}
                transition={{
                  ...SPRING,
                  delay: i * 0.03,
                }}
                className={`absolute pointer-events-auto flex flex-col items-center gap-1 ${
                  item.accent ? '' : ''
                }`}
                style={{ bottom: '28px' }}
              >
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full border shadow-lg transition-colors ${
                    item.accent
                      ? 'bg-accent text-on-accent border-accent/50'
                      : 'glass text-fg border-white/15 hover:border-accent/50 hover:text-accent'
                  }`}
                >
                  <item.icon size={18} />
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* ── FAB trigger ── */}
        <motion.button
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={toggle}
          className="relative z-[61] pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full bg-accent text-on-accent shadow-lg mb-4"
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ ...SPRING, duration: 0.3 }}
          >
            {isOpen ? <X size={22} strokeWidth={2.5} /> : <LayoutGrid size={20} />}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DesktopDock — horizontal pill (only rendered on md+, unchanged)
   ═══════════════════════════════════════════════════════════════════ */
const PILL = { type: 'spring', bounce: 0, duration: 0.45 };

function DockAnchor({ link, active, onHash }) {
  const isActive = Boolean(link.id) && link.id === active;
  return (
    <motion.a
      href={link.href}
      target={link.target || '_self'}
      rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-label={link.label}
      aria-current={isActive ? 'true' : undefined}
      initial="rest"
      whileHover="hover"
      onMouseEnter={() => soundFX.playHover()}
      onClick={(event) => {
        soundFX.playClick();
        if (link.href.startsWith('#')) {
          event.preventDefault();
          onHash(link.href);
        }
      }}
      className={`group relative flex p-3 rounded-full transition-colors duration-300 ${isActive ? 'text-fg' : 'text-muted hover:text-accent'}`}
    >
      {isActive && (
        <motion.span
          layoutId="dock-pill"
          className="absolute inset-0 rounded-full bg-elevated"
          transition={PILL}
        />
      )}
      <MotionGlyph icon={link.icon} active={isActive} />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-fg text-canvas rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {link.label}
      </span>
    </motion.a>
  );
}

function DesktopDock() {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(() => soundFX.isMuted());
  const [active, setActive] = useState('home');

  const toggleAudio = () => {
    const nextMuted = soundFX.toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) soundFX.playClick();
  };

  useEffect(() => {
    const ids = ['home', 'work', 'practice', 'experience', 'about-me', 'writing', 'contact'];
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;
    const ratios = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });
      let best = null;
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      if (best) setActive(best);
    }, { rootMargin: '-42% 0px -48% 0px', threshold: [0, 0.2, 0.45, 0.7] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const onHash = (hash) => {
    const found = scrollToId(hash);
    if (!found && hash === '#writing') navigate('/blog');
  };

  const links = [
    { icon: Home, label: 'Home', href: '#home', id: 'home' },
    { icon: Layers, label: 'Work', href: '#work', id: 'work' },
    { icon: Cpu, label: 'Practice', href: '#practice', id: 'practice' },
    { icon: Briefcase, label: 'Record', href: '#experience', id: 'experience' },
    { icon: User, label: 'About', href: '#about-me', id: 'about-me' },
    { icon: PenLine, label: 'Notes', href: '#writing', id: 'writing' },
    {
      icon: FileText,
      label: 'Resume',
      href: 'https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing',
      target: '_blank',
    },
    { icon: Mail, label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[60] max-w-max pb-[env(safe-area-inset-bottom,0px)] mb-[env(safe-area-inset-bottom,0px)]">
      <nav className="flex items-center justify-center gap-1 px-3 py-2 glass border-white/[0.12] rounded-full shadow-2xl" aria-label="Sections">
        {links.map((link) => (
          <DockAnchor key={link.label} link={link} active={active} onHash={onHash} />
        ))}
        <div className="w-px h-6 bg-line mx-1" />
        <motion.button
          type="button"
          onClick={toggleAudio}
          onMouseEnter={() => soundFX.playHover()}
          aria-label="Toggle Sound Effects"
          initial="rest"
          whileHover="hover"
          className="group relative flex p-3 rounded-full text-muted hover:text-accent transition-colors duration-300 cursor-pointer"
        >
          <MotionGlyph icon={muted ? VolumeX : Volume2} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-fg text-canvas rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {muted ? 'Unmute SFX' : 'Mute SFX'}
          </span>
        </motion.button>
        <div className="w-px h-6 bg-line mx-1" />
        <Magnetic as="span" strength={0.4} className="inline-block">
          <a
            href="mailto:abrar@abrarakhunji.com"
            data-cursor="Say hi"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="block px-4 py-2 bg-accent text-on-accent rounded-full text-sm font-semibold hover:bg-accent-soft transition-colors"
          >
            Hire Me
          </a>
        </Magnetic>
      </nav>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FloatingDock — renders the right nav for each breakpoint
   ═══════════════════════════════════════════════════════════════════ */
const FloatingDock = () => {
  return (
    <>
      <MobileRadialNav />
      <div className="hidden md:block">
        <DesktopDock />
      </div>
    </>
  );
};

export default FloatingDock;
