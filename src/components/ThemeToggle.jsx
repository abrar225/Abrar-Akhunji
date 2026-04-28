import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme, className = "" }) => (
  <motion.button
    onClick={toggleTheme}
    className={`p-2.5 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-600" />}
  </motion.button>
);

export default ThemeToggle;
