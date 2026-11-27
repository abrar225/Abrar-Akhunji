import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion, useScroll } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, RotateCcw, Sun, X } from 'lucide-react';
import { EMAIL, RESUME } from '../lib/projects';
import { useTheme } from '../lib/useTheme';
import VersionSwitcher from '../components/site/VersionSwitcher';

const directory = [
  ['Work', '/work/'], ['Writing', '/blog/'], ['About', '/about/'],
  ['Hire', '/hire/'], ['Contact', '/contact/'],
];

function Mark() {
  return <svg aria-hidden="true" width="26" height="20" viewBox="0 0 26 20" fill="none"><path d="M1 16C9 16 7 3 13 3s4 13 12 13" stroke="currentColor" strokeWidth="3" /></svg>;
}

export function PatchHeader() {
  const menu = useRef(null);
  const trigger = useRef(null);
  const themeTransition = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (menu.current?.open) menu.current.close();
  }, [location.pathname]);

  function changeTheme() {
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      toggleTheme();
      return;
    }
    if (themeTransition.current) {
      const pending = themeTransition.current;
      pending.skipTransition();
      void pending.updateCallbackDone.then(toggleTheme, toggleTheme);
      return;
    }
    const transition = document.startViewTransition(() => flushSync(toggleTheme));
    themeTransition.current = transition;
    function finish() { if (themeTransition.current === transition) themeTransition.current = null; }
    void transition.ready.catch(() => {});
    void transition.finished.then(finish, finish);
  }

  return (
    <header className="patch-header">
      <div className="patch-wide patch-header-inner">
        <Link to="/" className="patch-brand" aria-label="Abrar Akhunji, home"><Mark /><span>AA</span></Link>
        <nav className="patch-main-links" aria-label="Primary">
          <NavLink to="/work/">Work</NavLink>
          <NavLink to="/blog/">Writing</NavLink>
          <NavLink to="/about/">About</NavLink>
          <a href={RESUME}>Résumé</a>
          <NavLink to="/contact/">Contact</NavLink>
        </nav>
        <div className="patch-header-actions">
          <VersionSwitcher />
          <button type="button" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={changeTheme}>
            {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button type="button" ref={trigger} aria-label="Open menu" aria-haspopup="dialog" aria-controls="patch-menu" aria-expanded={expanded} onClick={() => {
            trigger.current.focus({ preventScroll: true });
            menu.current.showModal();
            setExpanded(true);
          }}>
            <Menu size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
      <motion.span aria-hidden="true" className="patch-scroll-progress" style={{ scaleX: scrollYProgress }} />
      <dialog className="patch-menu" id="patch-menu" ref={menu} aria-label="Portfolio menu" onClose={() => {
        setExpanded(false);
        if (document.activeElement === document.body) trigger.current?.focus({ preventScroll: true });
      }}>
        <div className="patch-wide">
          <div className="patch-menu-head"><Mark /><button className="patch-close" onClick={() => menu.current.close()} aria-label="Close menu" autoFocus><X aria-hidden="true" /></button></div>
          <nav aria-label="Site directory" onClick={event => {
            if (event.target.closest('a[aria-current="page"]')) menu.current.close();
          }}>
            <NavLink to="/" end>Home</NavLink>
            {directory.map(([name, url]) => <NavLink to={url} key={url}>{name}</NavLink>)}
            <a href={RESUME}>Résumé <ArrowUpRight aria-hidden="true" /></a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}

const rippleColumns = 12;
const rippleRows = 5;

function FooterSignature() {
  const grid = useRef(null);
  const name = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    function clear() {
      animation.current?.revert();
      animation.current = null;
    }
    preference.addEventListener('change', clear);
    return () => { preference.removeEventListener('change', clear); clear(); };
  }, []);

  async function ripple(origin) {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const button = grid.current;
    const modules = await Promise.all([import('./scroll'), import('gsap/SplitText')]).catch(() => null);
    if (!modules) return;
    const [{ gsap }, { SplitText }] = modules;
    if (preference.matches || grid.current !== button) return;
    animation.current?.revert();
    gsap.registerPlugin(SplitText);
    const stagger = { grid: [rippleRows, rippleColumns], from: origin, amount: .49, repeat: 1, yoyo: true };
    animation.current = gsap.context(() => {
      const split = SplitText.create(name.current, { type: 'words', aria: 'none' });
      gsap.timeline()
        .to('.patch-ripple-dot', { scale: 1.53, opacity: 1, duration: .24, ease: 'power2.out', stagger }, 0)
        .fromTo(split.words, { yPercent: 4 }, { yPercent: 0, duration: .52, stagger: .065, ease: 'power3.out' }, .07);
      return () => split.revert();
    }, button);
  }

  function tapGrid(event) {
    const hit = event.target.closest('[data-ripple-cell]');
    ripple(event.detail && hit ? Number(hit.dataset.rippleCell) : 'center');
  }

  return <div className="patch-wide patch-signature">
    <div className="patch-ripple-frame">
      <button className="patch-ripple-replay" type="button" onClick={() => ripple('center')}><RotateCcw size={15} aria-hidden="true" /> Replay</button>
      <button ref={grid} className="patch-ripple" type="button" onClick={tapGrid} aria-label="Send a ripple through the footer">
        {Array.from({ length: rippleColumns * rippleRows }, (_, index) => (
          <span key={index} data-ripple-cell={index} aria-hidden="true"><i className="patch-ripple-dot" /></span>
        ))}
      </button>
    </div>
    <p ref={name}>Abrar Akhunji</p>
  </div>;
}

export function PatchFooter() {
  const home = useLocation().pathname === '/';
  return (
    <footer className="patch-footer" id="playground">
      <div className="patch-wide patch-footer-grid">
        <div id={home ? 'contact' : undefined}><Mark />
          {home && <span className="patch-label patch-footer-status">Open to engineering roles &amp; collaborations</span>}
          <p>{home ? 'Let’s make something useful.' : 'Let’s work together.'}</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={16} aria-hidden="true" /></a>
          {home && <div id="services" className="patch-actions"><Link to="/contact/">Contact Abrar</Link><Link to="/hire/">Engineering services</Link></div>}
        </div>
        <nav aria-label="Footer">{directory.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}</nav>
        <nav aria-label="Elsewhere">
          <a href="https://github.com/abrar225">GitHub</a><a href="https://www.linkedin.com/in/abrar-akhunji/">LinkedIn</a><a href={RESUME}>Résumé</a>
          <Link to="/privacy/">Privacy</Link><Link to="/terms/">Terms</Link>
        </nav>
      </div>
      <FooterSignature />
    </footer>
  );
}

export function PatchStatus({ error, reset }) {
  return <div className="patch-wide patch-status" role={error ? 'alert' : 'status'}>
    <Mark />
    {error ? <><h1>This page couldn’t open.</h1><p>Refresh to reconnect, or return to the portfolio.</p><button onClick={reset}>Try again</button> <Link to="/">Home</Link></> : <p>Opening page…</p>}
  </div>;
}
