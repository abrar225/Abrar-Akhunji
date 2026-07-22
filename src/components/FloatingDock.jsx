import React, { useState, useCallback } from 'react';
import {
  Home, User, Layers, Briefcase, Mail, FileText,
  PenLine, Terminal, Volume2, VolumeX, LayoutGrid, X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { soundFX } from '../lib/soundFX';

const ARC_START_DEG = 5;
const ARC_END_DEG = 175;
const SPRING = { type: 'spring', stiffness: 420, damping: 24 };

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
function MobileRadialNav({ onOpenTerminal }) {
  const [isOpen, setIsOpen] = useState(false);
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
    { icon: Home, label: 'Home', action: () => { location.href = '#home'; close(); } },
    { icon: User, label: 'About', action: () => { location.href = '#about-me'; close(); } },
    { icon: Layers, label: 'Work', action: () => { location.href = '#work'; close(); } },
    { icon: Briefcase, label: 'Path', action: () => { location.href = '#experience'; close(); } },
    {
      icon: FileText, label: 'CV',
      action: () => {
        window.open('https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing', '_blank', 'noopener');
        close();
      },
    },
    { icon: Mail, label: 'Contact', action: () => { location.href = '#contact'; close(); } },
    {
      icon: Terminal, label: 'CLI',
      action: () => { close(); setTimeout(() => onOpenTerminal?.(), 150); },
    },
    {
      icon: muted ? VolumeX : Volume2,
      label: muted ? 'Unmute' : 'Mute',
      action: () => { toggleAudio(); /* don't close — let user see the toggle */ },
    },
    {
      icon: PenLine, label: 'Blog',
      action: () => { close(); setTimeout(() => navigate('/blog'), 150); },
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
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  x: pos.x,
                  y: pos.y,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
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
                      ? 'bg-accent text-[#0F0E0C] border-accent/50'
                      : 'bg-surface/95 backdrop-blur-xl text-fg border-line hover:border-accent/50 hover:text-accent'
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
          className="relative z-[61] pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full bg-accent text-[#0F0E0C] shadow-[0_0_30px_-5px_var(--color-accent)] mb-4"
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulse ring (only when closed) */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
          )}

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
function DesktopDock({ onOpenTerminal }) {
  const [muted, setMuted] = useState(() => soundFX.isMuted());

  const toggleAudio = () => {
    const nextMuted = soundFX.toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) soundFX.playClick();
  };

  const links = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about-me' },
    { icon: Layers, label: 'Work', href: '#work' },
    { icon: Briefcase, label: 'Path', href: '#experience' },
    {
      icon: FileText,
      label: 'Resume',
      href: 'https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing',
      target: '_blank',
    },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[60] max-w-max pb-[env(safe-area-inset-bottom,0px)] mb-[env(safe-area-inset-bottom,0px)]">
      <nav className="flex items-center justify-center gap-1 px-3 py-2 bg-surface/80 backdrop-blur-xl border border-line rounded-full shadow-2xl">
        {links.map((link, idx) => (
          <Magnetic as="span" key={idx} strength={0.4} className="inline-block">
            <a
              href={link.href}
              target={link.target || '_self'}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="group relative flex p-3 rounded-full text-muted hover:text-accent hover:bg-elevated transition-colors duration-300"
            >
              <link.icon size={17} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-fg text-canvas rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.label}
              </span>
            </a>
          </Magnetic>
        ))}
        <div className="w-px h-6 bg-line mx-1" />
        <Magnetic as="span" strength={0.4} className="inline-block">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onOpenTerminal?.();
            }}
            onMouseEnter={() => soundFX.playHover()}
            aria-label="FixO CLI Terminal"
            className="group relative flex p-3 rounded-full text-muted hover:text-accent hover:bg-elevated transition-colors duration-300 cursor-pointer"
          >
            <Terminal size={17} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-fg text-canvas rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              CLI Mode (~ / Cmd+K)
            </span>
          </button>
        </Magnetic>
        <Magnetic as="span" strength={0.4} className="inline-block">
          <button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={() => soundFX.playHover()}
            aria-label="Toggle Sound Effects"
            className="group relative flex p-3 rounded-full text-muted hover:text-accent hover:bg-elevated transition-colors duration-300 cursor-pointer"
          >
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-fg text-canvas rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {muted ? 'Unmute SFX' : 'Mute SFX'}
            </span>
          </button>
        </Magnetic>
        <div className="w-px h-6 bg-line mx-1" />
        <Magnetic as="span" strength={0.4} className="inline-block">
          <Link
            to="/blog"
            aria-label="Blog"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="group relative flex p-3 rounded-full text-muted hover:text-accent hover:bg-elevated transition-colors duration-300"
          >
            <PenLine size={17} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-fg text-canvas rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Blog
            </span>
          </Link>
        </Magnetic>
        <div className="w-px h-6 bg-line mx-1" />
        <Magnetic as="span" strength={0.4} className="inline-block">
          <a
            href="mailto:abrar@abrarakhunji.com"
            data-cursor="Say hi"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="block px-4 py-2 bg-accent text-[#0F0E0C] rounded-full text-sm font-semibold hover:bg-accent-soft transition-colors"
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
const FloatingDock = ({ onOpenTerminal }) => {
  return (
    <>
      {/* Mobile: radial arc navigation */}
      <MobileRadialNav onOpenTerminal={onOpenTerminal} />
      {/* Desktop/tablet: horizontal pill dock */}
      <div className="hidden md:block">
        <DesktopDock onOpenTerminal={onOpenTerminal} />
      </div>
    </>
  );
};

export default FloatingDock;
