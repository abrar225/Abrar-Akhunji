import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SiteCursor from './SiteCursor';

/** Shared editorial highlights and pointer feedback. */
export default function SiteMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    const root = document.getElementById('route-content');
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new WeakSet();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-highlighted');
        observer.unobserve(entry.target);
      });
    }, { threshold: .4, rootMargin: '0px 0px -8% 0px' });
    function collect(node) {
      if (!(node instanceof Element)) return;
      const selector = '[data-highlight], .ink-highlight, .hl-mark, .markdown-body p > strong:first-child';
      const marks = [...node.querySelectorAll(selector)];
      if (node.matches(selector)) marks.unshift(node);
      marks.forEach(mark => {
        if (seen.has(mark) || mark.closest('pre, code, .katex')) return;
        seen.add(mark); mark.classList.add('ink-highlight');
        if (reduced.matches) mark.classList.add('is-highlighted');
        else observer.observe(mark);
      });
    }
    collect(root);
    const changes = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(collect)));
    changes.observe(root, { childList: true, subtree: true });
    const settle = () => { if (reduced.matches) root.querySelectorAll('.ink-highlight').forEach(mark => mark.classList.add('is-highlighted')); };
    reduced.addEventListener('change', settle);
    return () => { observer.disconnect(); changes.disconnect(); reduced.removeEventListener('change', settle); };
  }, [pathname]);
  return <SiteCursor/>;
}
