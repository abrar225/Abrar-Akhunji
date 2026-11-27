import { useSyncExternalStore } from 'react';
let volatileTheme = 'light';
function readTheme() {
  try { return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { return volatileTheme; }
}
function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
  document.documentElement.style.colorScheme = theme;
  const color = document.querySelector('meta[name="theme-color"]');
  if (color) color.content = theme === 'dark' ? '#121331' : '#fffaf0';
}
const subscribe = (callback) => {
  function sync(event) {
    if (event.type === 'storage' && event.key !== 'theme' && event.key !== null) return;
    applyTheme(readTheme());
    callback();
  }
  window.addEventListener('themechange', sync);
  window.addEventListener('storage', sync);
  return () => { window.removeEventListener('themechange', sync); window.removeEventListener('storage', sync); };
};
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light');
  const toggleTheme = () => {
    const next = readTheme() === 'light' ? 'dark' : 'light';
    volatileTheme = next;
    try { localStorage.setItem('theme', next); } catch { /* unavailable */ }
    applyTheme(next);
    window.dispatchEvent(new Event('themechange'));
  };
  return { theme, toggleTheme };
}
