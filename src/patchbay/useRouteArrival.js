import { useLayoutEffect, useRef } from 'react';

export function useRouteArrival(location, type, content) {
  const entries = useRef(new Map());
  const previous = useRef(null);

  useLayoutEffect(() => {
    const native = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => { history.scrollRestoration = native; };
  }, []);

  useLayoutEffect(() => {
    const { key, pathname, hash } = location;
    const before = previous.current;
    previous.current = { pathname, hash };
    const changedPath = before && before.pathname !== pathname;
    const stored = type === 'POP' ? entries.current.get(key) : undefined;
    let watcher;
    let cancelTimer;
    let waiting = false;

    if (changedPath) content.current.focus({ preventScroll: true });

    const recover = () => {
      if (stored !== undefined) {
        window.scrollTo(0, stored);
        return Math.abs(window.scrollY - stored) < 2;
      }
      if (!hash || hash === '#route-content') return true;
      let id;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return true; }
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView();
      return true;
    };

    if (stored !== undefined || (hash && (!before || changedPath || before.hash !== hash))) {
      waiting = !recover();
      if (waiting) {
        const stop = () => { waiting = false; watcher.disconnect(); };
        watcher = new MutationObserver(() => { if (recover()) stop(); });
        watcher.observe(content.current, { childList: true, subtree: true });
        cancelTimer = setTimeout(stop, 1500);
      }
    } else if (changedPath) window.scrollTo(0, 0);

    const remember = () => {
      if (!waiting) entries.current.set(key, window.scrollY);
    };
    remember();
    window.addEventListener('scroll', remember, { passive: true });
    return () => {
      window.removeEventListener('scroll', remember);
      watcher?.disconnect();
      clearTimeout(cancelTimer);
    };
  }, [content, location, type]);
}
