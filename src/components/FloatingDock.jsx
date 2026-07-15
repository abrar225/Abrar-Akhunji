import React from 'react';
import { Home, User, Layers, Briefcase, Mail, FileText } from 'lucide-react';
import Magnetic from './Magnetic';

const FloatingDock = () => {
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
    <div className="fixed bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-[60] w-[95vw] max-w-max">
      <nav className="flex items-center justify-center gap-0.5 md:gap-1 px-2 py-2 bg-surface/80 backdrop-blur-xl border border-line rounded-full shadow-2xl">
        {links.map((link, idx) => (
          <Magnetic as="span" key={idx} strength={0.4} className="inline-block">
            <a
              href={link.href}
              target={link.target || '_self'}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              className="group relative flex p-2.5 md:p-3 rounded-full text-muted hover:text-accent hover:bg-elevated transition-colors duration-300"
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
          <a
            href="mailto:moabrarakhunji@gmail.com"
            data-cursor="Say hi"
            className="block px-4 py-2 bg-accent text-[#0F0E0C] rounded-full text-xs md:text-sm font-semibold hover:bg-accent-soft transition-colors"
          >
            Hire Me
          </a>
        </Magnetic>
      </nav>
    </div>
  );
};

export default FloatingDock;
