import { useSyncExternalStore } from 'react';
const subscribe = (callback) => {
  window.addEventListener('themechange', callback);
  window.addEventListener('storage', callback);
  return () => { window.removeEventListener('themechange', callback); window.removeEventListener('storage', callback); };
};
let volatileTheme = 'light';
function readTheme() {
  try { return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { return volatileTheme; }
}
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light');
  const toggleTheme = () => {
    const next = readTheme() === 'light' ? 'dark' : 'light';
    volatileTheme = next;
    try { localStorage.setItem('theme', next); } catch { /* unavailable */ }
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(next);
    document.documentElement.style.colorScheme = next;
    window.dispatchEvent(new Event('themechange'));
  };
  return { theme, toggleTheme };
}
