import { useEffect, useRef } from 'react';

const INTERACTIVE = '[data-cursor], a, button, summary, [role="tab"], [role="button"]';
const NATIVE = 'input, textarea, select, pre, code, [contenteditable]:not([contenteditable="false"]), iframe';

/** The hotspot tracks 1:1. Only the small decorative halo follows with inertia. */
export default function SiteCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current, html = document.documentElement;
    const halo = node.querySelector('.cursor-halo');
    const label = node.querySelector('.cursor-label');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const contrast = matchMedia('(forced-colors: active)');
    let frame = 0, x = 0, y = 0, haloX = 0, haloY = 0, hasPointer = false, showing = false, magnet = null;
    let retarget = true, labelWidth = 0;
    const enabled = () => fine.matches && !reduced.matches && !contrast.matches;
    const releaseMagnet = () => { if (magnet) magnet.style.translate = ''; magnet = null; };
    function hide() {
      showing = false;
      node.classList.remove('is-visible', 'is-pressed');
      html.classList.remove('custom-cursor-active');
      releaseMagnet();
      cancelAnimationFrame(frame); frame = 0;
    }
    function identify() {
      retarget = false;
      const target = document.elementFromPoint(x, y);
      if (!target || target.closest(NATIVE) || !window.getSelection()?.isCollapsed) { hide(); return; }
      const control = target.closest(INTERACTIVE);
      const disabled = control?.matches(':disabled, [aria-disabled="true"]');
      const surface = target.closest('[data-cursor-mode]');
      const kind = disabled ? 'dot' : control?.dataset.cursorMode || (control && control.tagName !== 'CANVAS' ? 'link' : surface?.dataset.cursorMode || 'dot');
      const href = control?.getAttribute('href') || '';
      const text = disabled ? '' : control?.dataset.cursor || (control?.tagName === 'SUMMARY' ? 'Unfold' : control?.tagName === 'BUTTON' ? 'Choose' : href.startsWith('mailto:') ? 'Say hello' : href.includes('/blog/') ? 'Read' : href.includes('/work/') ? 'Open build' : href.startsWith('#') ? 'Jump' : href.startsWith('http') ? 'Visit' : control ? 'Open' : '');
      if (node.dataset.label !== text) {
        node.dataset.label = text;
        label.textContent = text;
        labelWidth = text.length * 6.5 + 20;
      }
      node.dataset.kind = kind;
      node.dataset.theme = target.closest('[data-cursor-theme]')?.dataset.cursorTheme || 'page';
      // Generic links need only a ring. Only authored interaction verbs get a label.
      node.dataset.hasLabel = String(Boolean(control?.dataset.cursor && !disabled));
      const nextMagnet = disabled ? null : control?.closest('[data-magnetic]');
      if (magnet !== nextMagnet) { releaseMagnet(); magnet = nextMagnet; }
      if (!showing) { haloX = x; haloY = y; showing = true; }
      node.classList.add('is-visible');
      html.classList.add('custom-cursor-active');
    }
    function paint() {
      frame = 0;
      if (!hasPointer || document.hidden || !enabled()) { hide(); return; }
      if (retarget) identify();
      if (!showing) return;
      node.style.transform = `translate3d(${x}px,${y}px,0)`;
      haloX += (x - haloX) * .3; haloY += (y - haloY) * .3;
      halo.style.transform = `translate3d(${haloX - x}px,${haloY - y}px,0)`;
      label.style.left = `${x + 26 + labelWidth > innerWidth - 8 ? -labelWidth - 16 : 26}px`;
      label.style.top = `${y > innerHeight - 45 ? -34 : 16}px`;
      if (magnet) {
        const box = magnet.getBoundingClientRect();
        magnet.style.translate = `${Math.max(-3, Math.min(3, (x - box.left - box.width / 2) * .08))}px ${Math.max(-2, Math.min(2, (y - box.top - box.height / 2) * .08))}px`;
      }
      if (Math.abs(x - haloX) + Math.abs(y - haloY) > .15) frame = requestAnimationFrame(paint);
    }
    const schedule = () => { if (!frame && hasPointer) frame = requestAnimationFrame(paint); };
    const move = event => {
      if (event.pointerType !== 'mouse') { hasPointer = false; hide(); return; }
      x = event.clientX; y = event.clientY; hasPointer = true; retarget = true;
      schedule();
    };
    const refresh = () => { retarget = true; schedule(); };
    const leave = event => { if (!event.relatedTarget) { hasPointer = false; hide(); } };
    const blur = () => { hasPointer = false; hide(); };
    const key = () => { hasPointer = false; hide(); };
    const press = event => { if (event.pointerType === 'mouse' && showing) node.classList.add('is-pressed'); };
    const release = () => node.classList.remove('is-pressed');
    const preference = () => { if (!enabled()) hide(); else refresh(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', refresh, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    document.addEventListener('pointerdown', press, { passive: true });
    document.addEventListener('pointerup', release, { passive: true });
    document.addEventListener('pointercancel', blur);
    document.addEventListener('keydown', key);
    document.addEventListener('selectionchange', refresh);
    document.addEventListener('visibilitychange', blur);
    window.addEventListener('scroll', refresh, { passive: true, capture: true });
    window.addEventListener('resize', refresh);
    window.addEventListener('blur', blur);
    window.addEventListener('portfolio:intro-complete', refresh);
    fine.addEventListener('change', preference); reduced.addEventListener('change', preference); contrast.addEventListener('change', preference);
    return () => {
      hide();
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerover', refresh);
      document.removeEventListener('pointerout', leave); document.removeEventListener('pointerdown', press); document.removeEventListener('pointerup', release);
      document.removeEventListener('pointercancel', blur); document.removeEventListener('keydown', key);
      document.removeEventListener('selectionchange', refresh); document.removeEventListener('visibilitychange', blur);
      window.removeEventListener('scroll', refresh, true); window.removeEventListener('resize', refresh); window.removeEventListener('blur', blur);
      window.removeEventListener('portfolio:intro-complete', refresh);
      fine.removeEventListener('change', preference); reduced.removeEventListener('change', preference); contrast.removeEventListener('change', preference);
    };
  }, []);
  return <div ref={ref} className="intent-cursor" data-kind="dot" aria-hidden="true">
    <span className="cursor-halo"/><span className="cursor-center"/>
    <svg className="cursor-hand" width="28" height="32" viewBox="0 0 28 32" fill="currentColor" stroke="var(--cursor-outline)" strokeWidth="1.25" strokeLinejoin="round"><path d="M8 2c-1.1 0-2 .9-2 2v13l-1.6-2a2.2 2.2 0 0 0-3.5 2.6L7 27c.9 1.4 2.3 2 4 2h8c3.8 0 6-3 6-7v-9a2 2 0 0 0-4 0v-2a2 2 0 0 0-4 0V9a2 2 0 0 0-4 0V4c0-1.1-.9-2-2-2Z"/></svg>
    <svg className="cursor-pixel" width="24" height="32" viewBox="0 0 12 16" fill="currentColor" stroke="var(--cursor-outline)" strokeWidth=".6" shapeRendering="crispEdges"><path d="M0 0h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1H6v2h1v2h1v2H5v-2H4v-2H3V9H2v1H1v1H0Z"/></svg>
    <span className="cursor-label"/>
  </div>;
}
