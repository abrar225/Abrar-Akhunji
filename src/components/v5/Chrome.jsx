import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, BookOpen, Fingerprint, Grid2X2, House, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import VersionSwitcher from '../site/VersionSwitcher';
import { PaperEdge } from './PaperEdge';
import { useTheme } from '../../lib/useTheme';
import { EMAIL, RESUME } from '../../lib/projects';

const links = [
  ['Home', '/', House],
  ['Work', '/work/', Grid2X2],
  ['Writing', '/blog/', BookOpen],
  ['About', '/about/', Fingerprint],
];

export function SignalMark() {
  return <span className="signal-mark" aria-hidden="true"><i /><i /><i /></span>;
}

export function SignalHeader() {
  const location = useLocation();
  const [menuLocation, setMenuLocation] = useState(null);
  const open = menuLocation === location.key;
  const { theme, toggleTheme } = useTheme();
  const trigger = useRef(null);
  const navigation = links.map(([name, href, Icon]) => (
    <NavLink key={name} to={href} end={href === '/'} onClick={() => setMenuLocation(null)}>
      <Icon aria-hidden="true" size={17} />{name}
    </NavLink>
  ));
  return (
    <header className="signal-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setMenuLocation(null);
        trigger.current?.focus();
      }
    }}>
      <div className="signal-wrap signal-header-inner">
        <Link to="/" className="signal-brand signal-header-brand" aria-label="Abrar Akhunji"><SignalMark /><span>AA<span className="signal-brand-last"> / Portfolio</span></span></Link>
        <nav className="signal-nav" aria-label="Main navigation">{navigation}</nav>
        <div className="signal-header-actions header-actions">
          <VersionSwitcher />
          <button className="signal-theme" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <a className="signal-resume" href={RESUME} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
          <Link className="signal-contact-button" to="/contact/">Contact <ArrowUpRight size={15} /></Link>
          <button ref={trigger} className="signal-menu" type="button" aria-expanded={open} aria-controls="signal-mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setMenuLocation(open ? null : location.key)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <nav className="signal-mobile-nav" id="signal-mobile-nav" hidden={!open} aria-label="Mobile navigation">
        {navigation}
        <NavLink to="/contact/" onClick={() => setMenuLocation(null)}>Contact</NavLink>
        <NavLink to="/hire/" onClick={() => setMenuLocation(null)}>Work with me</NavLink>
        <a className="signal-menu-resume" href={RESUME} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}

export function SignalFooter() {
  return (
    <footer className="signal-footer" id="playground">
      <PaperEdge />
      <div className="signal-wrap">
        <div className="signal-footer-main">
          <div className="signal-footer-directory">
            <p className="signal-label">Abrar Akhunji / Explore</p>
            <nav aria-label="Portfolio index">
              <Link to="/work/">Projects <ArrowUpRight size={17} /></Link>
              <Link to="/blog/">The Neural Log <ArrowUpRight size={17} /></Link>
              <Link to="/about/">Background <ArrowUpRight size={17} /></Link>
            </nav>
          </div>
          <div className="signal-reply-slip">
            <p className="signal-label"><Mail size={19} aria-hidden="true" /> Recruiting &amp; collaborations</p>
            <Link className="signal-footer-heading" to="/contact/">Get in touch <ArrowDownRight aria-hidden="true" /></Link>
            <a href={`mailto:${EMAIL}`} className="signal-inline">{EMAIL} <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="signal-footer-end">
          <Link className="signal-brand" to="/"><SignalMark />Abrar Akhunji</Link>
          <nav aria-label="Footer">
            <Link to="/hire/">Hire</Link>
            <a href="/agents-at-work/">Agents at Work</a>
            <a href="https://github.com/abrar225" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/abrar-akhunji/" target="_blank" rel="noreferrer">LinkedIn</a>
            <Link to="/privacy/">Privacy</Link>
            <Link to="/terms/">Terms</Link>
          </nav>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
