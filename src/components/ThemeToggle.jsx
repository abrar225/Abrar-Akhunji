import React from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme, className = '' }) => {
  const onClick = (event) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = () => {
      flushSync(() => toggleTheme());
    };
    if (reduce || typeof document.startViewTransition !== 'function') {
      run();
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const end = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transition = document.startViewTransition(run);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${end}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 560,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    }).catch(() => {});
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 text-fg hover:text-accent transition-colors duration-300 ${className}`}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </motion.button>
  );
};

export default ThemeToggle;
