import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import VersionSwitcher from '../site/VersionSwitcher';
import { useTheme } from '../../lib/useTheme';
import { RESUME } from '../../lib/projects';

const chapters = [
  ['Work', '#work'],
  ['About', '#about-me'],
  ['Writing', '#writing'],
  ['Contact', '#contact'],
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const progress = useRef(null);
  const trigger = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const close = () => setOpen(false);

  useEffect(() => {
    const sections = [...document.querySelectorAll('.v5-home > section[id]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const limit = document.documentElement.scrollHeight - innerHeight;
      progress.current.style.transform = `scaleX(${limit > 0 ? Math.min(1, scrollY / limit) : 0})`;
      const current = sections.findLast(section => section.getBoundingClientRect().top <= innerHeight * .4);
      setActive(current?.id === 'engineering' ? '#work' : current ? `#${current.id}` : '#home');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <header className="v5-header" onKeyDown={event => {
      if (open && event.key === 'Escape') {
        close();
        trigger.current?.focus();
      }
    }}>
      <div className="v5-wrap v5-header-inner">
        <a className="v5-brand" href="#home" onClick={close} aria-label="Abrar Akhunji home">AA<span>.</span></a>
        <nav className="v5-desktop-nav" aria-label="Main navigation">
          {chapters.map(([text, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined}>{text}</a>)}
        </nav>
        <div className="v5-header-actions header-actions">
          <VersionSwitcher />
          <ThemeToggle className="v5-theme" theme={theme} toggleTheme={toggleTheme} />
          <a className="v5-header-resume" href={RESUME} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
          <button className="v5-menu-button" type="button" ref={trigger} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="v5-mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav hidden={!open} id="v5-mobile-navigation" className="v5-mobile-nav" aria-label="Mobile navigation">
        {chapters.map(([text, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} onClick={close}>{text}<ArrowUpRight size={18} /></a>)}
        <Link to="/hire/" onClick={close}>Hire me<ArrowUpRight size={18} /></Link>
      </nav>
      <div className="v5-reading-progress" ref={progress} aria-hidden="true" />
    </header>
  );
}

export function HomeFooter() {
  return (
    <footer id="playground" className="v5-footer">
      <div className="v5-wrap v5-footer-inner">
        <span>© {new Date().getFullYear()} Abrar Akhunji</span>
        <nav aria-label="Footer">
          <Link to="/work/">All work</Link>
          <Link to="/hire/">Hire</Link>
          <Link to="/terms/">Terms</Link>
          <Link to="/privacy/">Privacy</Link>
        </nav>
        <a href="#home">Back to top <ArrowUp size={15} /></a>
      </div>
    </footer>
  );
}
