import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme, className = '' }) => (
  <motion.button
    onClick={toggleTheme}
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    className={`p-2.5 bg-surface border border-line rounded-full text-fg hover:text-accent hover:border-accent transition-colors duration-300 ${className}`}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
  >
    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
  </motion.button>
);

export default ThemeToggle;
