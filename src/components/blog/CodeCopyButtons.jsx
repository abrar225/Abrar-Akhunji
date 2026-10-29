import { useEffect } from 'react';

/** Controls sit beside authored code without changing the article's spoken text. */
export default function CodeCopyButtons({ contentRef, refreshKey }) {
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const timers = new Set(), controls = [];
    root.querySelectorAll('.markdown-body pre').forEach(pre => {
      const code = pre.querySelector('code');
      if (!code) return;
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'reader-code-copy';
      const label = value => { button.dataset.label = value; button.setAttribute('aria-label', value); };
      label('Copy code');
      const copy = async () => {
        let copied = false;
        try { await navigator.clipboard.writeText(code.textContent); copied = true; }
        catch {
          const range = document.createRange(); range.selectNodeContents(code);
          const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
          copied = document.execCommand('copy');
        }
        label(copied ? 'Code copied' : 'Select code to copy');
        const timer = setTimeout(() => { timers.delete(timer); label('Copy code'); }, 1600); timers.add(timer);
      };
      button.addEventListener('click', copy); pre.append(button);
      controls.push(() => { button.removeEventListener('click', copy); button.remove(); });
    });
    return () => { timers.forEach(clearTimeout); controls.forEach(cleanup => cleanup()); };
  }, [contentRef, refreshKey]);
  return null;
}
