import { useEffect, useRef, useState } from 'react';
import { siteAudio } from '../../lib/audio/siteAudio';

const chapters = [['home', 'Hello'], ['brief', 'The idea'], ['work', 'The builds'], ['about-me', 'The builder'], ['activity', 'GitHub'], ['contact', 'Say hello']];

export default function ChapterNavigation() {
  const [jump, setJump] = useState(null), [announcement, setAnnouncement] = useState('');
  const timers = useRef([]), navRef = useRef(null);
  const sequence = useRef(0);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => {
    const interrupt = event => {
      if (event.type === 'keydown' && !['Escape', 'PageUp', 'PageDown', 'ArrowUp', 'ArrowDown', 'Home', 'End', ' '].includes(event.key)) return;
      clear(); setJump(null);
    };
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('keydown', interrupt);
    return () => { clear(); window.removeEventListener('wheel', interrupt); window.removeEventListener('touchstart', interrupt); window.removeEventListener('keydown', interrupt); };
  }, []);
  function follow(event, index) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const [id, label] = chapters[index], target = document.getElementById(id);
    if (!target) return;
    event.preventDefault(); clear();
    siteAudio.cancel('chapter'); siteAudio.cue('chapter',{group:'chapter',rate:1,throttle:0});
    const links = [...navRef.current.querySelectorAll('a')], from = Math.max(0, links.findIndex(link => link.hasAttribute('aria-current')));
    const land = () => {
      history.pushState(history.state, '', `#${id}`);
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      target.tabIndex = -1; target.focus({ preventScroll: true });
      setAnnouncement(`Chapter ${index + 1} of ${chapters.length}: ${label}`);
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(target.getBoundingClientRect().top - 100) < 8) { setJump(null); land(); return; }
    setJump({ from, index, label, key: ++sequence.current });
    timers.current = [setTimeout(land, 180), setTimeout(() => setJump(null), 700)];
  }
  return <>
    <nav ref={navRef} className="story-dock" aria-label="Build Room chapters"><i className="chapter-current" aria-hidden="true" />{chapters.map(([id, label], index) => <a key={id} href={`#${id}`} onClick={event => follow(event, index)}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>)}<i className="story-progress" aria-hidden="true" /></nav>
    <span className="sr-only" role="status">{announcement}</span>
    {jump && <div className={`chapter-jump ${jump.index < jump.from ? 'is-reverse' : ''}`} key={jump.key} aria-hidden="true"><div className="chapter-scan"/><div className="chapter-jump-copy"><span>{String(jump.from + 1).padStart(2, '0')} <b>→</b> {String(jump.index + 1).padStart(2, '0')}</span><p>{jump.label}</p><pre>{'> > > > > > > > > > > > > > > >'}</pre></div></div>}
  </>;
}
