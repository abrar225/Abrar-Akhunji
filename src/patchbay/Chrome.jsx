import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { EMAIL, RESUME } from '../lib/projects';
import { useTheme } from '../lib/useTheme';

const directory = [
  ['Work', '/work/'], ['Writing', '/blog/'], ['About', '/about/'],
  ['Hire', '/hire/'], ['Contact', '/contact/'], ['Agents at Work', '/agents-at-work/'],
];

function Mark() {
  return <svg aria-hidden="true" width="26" height="20" viewBox="0 0 26 20" fill="none"><path d="M1 16C9 16 7 3 13 3s4 13 12 13" stroke="currentColor" strokeWidth="3" /></svg>;
}

export function PatchHeader() {
  const menu = useRef(null);
  const trigger = useRef(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (menu.current?.open) menu.current.close();
  }, [location.key]);

  function closeMenu() { menu.current.close(); }

  return (
    <header className="patch-header">
      <div className="patch-wide patch-header-inner">
        <Link to="/" className="patch-brand" aria-label="Abrar Akhunji, home"><Mark /><span>AA</span></Link>
        <nav className="patch-main-links" aria-label="Primary">
          <NavLink to="/work/">Work</NavLink>
          <NavLink to="/blog/" className="patch-extra">Writing</NavLink>
          <NavLink to="/about/" className="patch-extra">About</NavLink>
          <a href={RESUME}>Résumé</a>
          <NavLink to="/contact/">Contact</NavLink>
        </nav>
        <div className="patch-header-actions">
          <button type="button" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button type="button" ref={trigger} aria-label="Open menu" aria-haspopup="dialog" aria-controls="patch-menu" onClick={() => menu.current.showModal()}>
            <Menu size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
      <dialog className="patch-menu" id="patch-menu" ref={menu} aria-label="Portfolio menu" onClose={() => trigger.current?.focus({ preventScroll: true })}>
        <div className="patch-wide">
          <button className="patch-close" onClick={closeMenu} aria-label="Close menu"><X aria-hidden="true" /></button>
          <nav aria-label="Site directory">
            <Link to="/">Home</Link>
            {directory.map(([name, url]) => url.startsWith('/agents')
              ? <a href={url} key={url}>{name}</a>
              : <Link to={url} key={url}>{name}</Link>)}
            <a href={RESUME}>Résumé <ArrowUpRight aria-hidden="true" /></a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}

export function PatchFooter() {
  return (
    <footer className="patch-footer" id="playground">
      <div className="patch-wide patch-footer-grid">
        <div><Mark /><p>Let’s work together.</p><a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <nav aria-label="Footer">{directory.map(([name, path]) => path.startsWith('/agents') ? <a key={path} href={path}>{name}</a> : <Link key={path} to={path}>{name}</Link>)}</nav>
        <nav aria-label="Elsewhere">
          <a href="https://github.com/abrar225">GitHub</a><a href="https://www.linkedin.com/in/abrar-akhunji/">LinkedIn</a><a href={RESUME}>Résumé</a>
          <Link to="/privacy/">Privacy</Link><Link to="/terms/">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}

export function PatchStatus({ error, reset }) {
  return <div className="patch-wide patch-status" role={error ? 'alert' : 'status'}>
    <Mark />
    {error ? <><h1>This page couldn’t open.</h1><p>Refresh to reconnect, or return to the portfolio.</p><button onClick={reset}>Try again</button> <Link to="/">Home</Link></> : <p>Opening page…</p>}
  </div>;
}
