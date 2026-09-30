import { useEffect, useState } from 'react';

function readTheme() {
  try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
}

/** Dark/light preference shared by the portfolio and the blog. */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const next = readTheme();
    if (typeof document !== 'undefined') applyTheme(next);
    return next;
  });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  return { theme, toggleTheme };
}
