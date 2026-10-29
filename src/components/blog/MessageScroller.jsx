import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/** A single contents list: sticky beside the article, a native disclosure on phones. */
export default function MessageScroller({ contentRef, mode }) {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');
  const disclosureRef = useRef(null);
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1200px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1200px)');
    const change = () => setWide(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return undefined;
    let headings = [];
    let frame = 0;
    let scanFrame = 0;
    let disposed = false;
    let signature = '';
    let initialHashHandled = false;

    const updateActive = () => {
      frame = 0;
      if (!headings.length) return;
      const line = Math.min(180, window.innerHeight * .25);
      let current = headings[0];
      for (const heading of headings) {
        if (heading.element.getBoundingClientRect().top > line) break;
        current = heading;
      }
      headings.forEach((heading) => heading.element.classList.toggle('is-reading', heading === current));
      setActiveId(current.id);
    };
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(updateActive); };
    const scan = () => {
      scanFrame = 0;
      if (disposed) return;
      const used = new Set();
      headings = [...root.querySelectorAll('h2, h3')].filter(element => !element.closest('button')).map((element, index) => {
        const label = element.textContent.trim();
        const base = element.dataset.readerAnchor || element.id || label.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-') || `section-${index + 1}`;
        element.dataset.readerAnchor = base;
        let id = base, suffix = 2;
        while (used.has(id) || (document.getElementById(id) && document.getElementById(id) !== element && !root.contains(document.getElementById(id)))) id = `${base}-${suffix++}`;
        used.add(id);
        element.id = id;
        return { id, label, level: Number(element.tagName.slice(1)), element };
      }).filter((heading) => heading.label);
      const nextSignature = JSON.stringify(headings.map(({ id, label, level }) => ({ id, label, level })));
      if (signature !== nextSignature) {
        signature = nextSignature;
        setSections(headings.map(({ id, label, level }) => ({ id, label, level })));
      }
      if (!initialHashHandled && headings.length && window.location.hash) {
        initialHashHandled = true;
        let hash;
        try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { hash = ''; }
        const target = headings.find((heading) => heading.id === hash);
        if (target) target.element.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      scheduleUpdate();
    };
    const scheduleScan = () => { if (!scanFrame) scanFrame = requestAnimationFrame(scan); };
    const mutation = new MutationObserver(scheduleScan);
    mutation.observe(root, { childList: true, subtree: true, characterData: true });
    const resize = new ResizeObserver(scheduleUpdate);
    resize.observe(root);
    root.addEventListener('load', scheduleUpdate, true);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    document.fonts?.ready.then(() => { if (!disposed) scheduleUpdate(); });
    scheduleScan();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scanFrame);
      mutation.disconnect();
      resize.disconnect();
      root.removeEventListener('load', scheduleUpdate, true);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      headings.forEach(({ element }) => element.classList.remove('is-reading'));
    };
  }, [contentRef, mode]);

  if (sections.length < 2) return null;
  const params = new URLSearchParams(window.location.search);
  if (mode === 'dev') params.set('mode', 'dev'); else params.delete('mode');
  const linkPrefix = params.size ? `?${params}` : '';
  const followHeading = (event, id) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(window.history.state, '', `${linkPrefix}#${encodeURIComponent(id)}`);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (disclosureRef.current && window.innerWidth < 1200) disclosureRef.current.open = false;
    target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    setActiveId(id);
  };

  return <aside className="reader-contents">
    <details ref={disclosureRef} open={wide}>
      <summary tabIndex={wide ? -1 : undefined}>In this article <ChevronDown size={16} aria-hidden="true" /></summary>
      <nav aria-label="Table of contents"><ol>{sections.map((section) => <li key={section.id} className={section.level === 3 ? 'contents-subheading' : undefined}><a href={`${linkPrefix}#${encodeURIComponent(section.id)}`} onClick={(event) => followHeading(event, section.id)} aria-current={activeId === section.id ? 'location' : undefined}><span>{section.label}</span></a></li>)}</ol></nav>
    </details>
  </aside>;
}
