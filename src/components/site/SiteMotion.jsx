import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/** Small, additive feedback. The native pointer and text selection stay available. */
export default function SiteMotion() {
  const cursor = useRef(null);
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
  useEffect(() => {
    const node = cursor.current;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0, x = 0, y = 0, targetX = 0, targetY = 0, showing = false, magnet = null;
    const enabled = () => fine.matches && !reduced.matches;
    const releaseMagnet = () => { if (magnet) magnet.style.translate = ''; magnet = null; };
    function hide() {
      showing = false; node.classList.remove('is-visible', 'is-pressed');
      if (raf) cancelAnimationFrame(raf); raf = 0; releaseMagnet();
    }
    function frame() {
      raf = 0;
      if (!showing || document.hidden || !enabled()) return;
      x += (targetX - x) * .22; y += (targetY - y) * .22;
      const dx=targetX-x,dy=targetY-y;
      node.style.setProperty('--cursor-angle', `${Math.atan2(dy,dx)*180/Math.PI}deg`);
      node.style.setProperty('--cursor-speed', String(Math.min(1,Math.hypot(dx,dy)/35)));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .3) raf = requestAnimationFrame(frame);
    }
    function move(event) {
      if (!enabled() || event.pointerType !== 'mouse') { hide(); return; }
      const target = event.target instanceof Element ? event.target.closest('[data-cursor], a, button, summary, [role=tab]') : null;
      if (!target || !window.getSelection()?.isCollapsed || target.closest('input, textarea, select, pre, code, [contenteditable=true]')) { hide(); return; }
      const href=target.getAttribute('href')||'';
      node.dataset.label = target.dataset.cursor || (target.tagName==='SUMMARY'?'Unfold':target.tagName==='BUTTON'?'Choose':href.startsWith('mailto:')?'Say hello':href.includes('/blog/')?'Read':href.includes('/work/')?'Open build':href.startsWith('#')?'Jump':href.startsWith('http')?'Visit':'Open');
      node.dataset.kind = target.tagName==='BUTTON'?'control':href.startsWith('#')?'chapter':'link';
      targetX = event.clientX; targetY = event.clientY;
      node.style.transform = `translate3d(${targetX-14}px,${targetY-14}px,0)`;
      const label=getComputedStyle(node,'::after'),labelWidth=parseFloat(label.width)+parseFloat(label.paddingLeft)+parseFloat(label.paddingRight)+2;
      node.style.setProperty('--label-x',`${targetX+26+labelWidth>innerWidth-12?-labelWidth-12:38}px`);
      node.style.setProperty('--label-y',`${targetY>innerHeight-45?-30:3}px`);
      if (!showing) { x = targetX; y = targetY; showing = true; node.classList.add('is-visible'); }
      const nextMagnet = target.closest('[data-magnetic]');
      if (magnet !== nextMagnet) { releaseMagnet(); magnet = nextMagnet; }
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
        const dy = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
        magnet.style.translate = `${dx * 4}px ${dy * 3}px`;
      }
      if (!raf) raf = requestAnimationFrame(frame);
    }
    const keyboard = event => { if(event.key==='Tab')hide(); };
    const leave = event => { if (!event.relatedTarget) hide(); };
    const press=()=>{if(showing)node.classList.add('is-pressed');};
    const release=()=>node.classList.remove('is-pressed');
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    document.addEventListener('keydown',keyboard);document.addEventListener('pointercancel',hide);document.addEventListener('pointerdown',press,{passive:true});document.addEventListener('pointerup',release,{passive:true});
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('blur', hide);
    fine.addEventListener('change', hide); reduced.addEventListener('change', hide);
    return () => {
      hide(); document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', leave);
      document.removeEventListener('keydown',keyboard);document.removeEventListener('pointercancel',hide);document.removeEventListener('pointerdown',press);document.removeEventListener('pointerup',release);
      document.removeEventListener('visibilitychange', hide); window.removeEventListener('scroll', hide); window.removeEventListener('blur', hide);
      fine.removeEventListener('change', hide); reduced.removeEventListener('change', hide);
    };
  }, [pathname]);
  return <div ref={cursor} className="intent-cursor" aria-hidden="true"><i className="cursor-orbit"/><span className="cursor-center"/></div>;
}
