import React from 'react';
import { Home, User, Layers, Briefcase, Mail } from 'lucide-react';

const FloatingDock = ({ theme }) => {
  const links = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about-me' },
    { icon: Layers, label: 'Work', href: '#work' },
    { icon: Briefcase, label: 'Exp', href: '#experience' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[95vw] max-w-max">
      <nav className={`flex items-center justify-center gap-1 md:gap-2 px-2 py-2 ${theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-xl border rounded-full shadow-2xl ring-1 ring-white/5`}>
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className={`group relative p-2 md:p-3 rounded-full ${theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-black/10'} transition-all duration-300`}>
            <link.icon size={18} className={`${theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-black'} transition-colors`} />
            <span className={`absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} border border-white/10 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl`}>
              {link.label}
            </span>
          </a>
        ))}
        <div className={`w-px h-6 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} mx-1 md:mx-1`}></div>
        <a href="mailto:moabrarakhunji@gmail.com" className={`px-3 md:px-4 py-1.5 md:py-2 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full text-[10px] md:text-sm font-bold transition-colors`}>Hire Me</a>
      </nav>
    </div>
  );
};

export default FloatingDock;
