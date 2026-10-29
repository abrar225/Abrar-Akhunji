import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import SoundControl from './SoundControl';
import { useTheme } from '../../lib/useTheme';
import { RESUME } from '../../lib/projects';

export default function SiteHeader() {
  const [open, setOpen] = useState(false); const { theme, toggleTheme } = useTheme(); const location = useLocation();
  const links = [['Work', '/work/'], ['About', '/#about-me'], ['Writing', '/blog/'], ['Hire', '/hire/']];
  return <header className="site-header">
    <Link className="wordmark" to="/" onClick={() => setOpen(false)} aria-label="Abrar Akhunji home">abrar<span className="wordmark-dot">.</span><span className="wordmark-caption">The build room</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={label} data-cursor="Open" data-magnetic to={href} aria-current={location.pathname.replace(/\/$/, '') === href.replace(/\/$/, '') || (label === 'Work' && location.pathname.startsWith('/work/')) ? 'page' : undefined}>{label}</Link>)}</nav>
    <div className="header-actions"><SoundControl/><ThemeToggle theme={theme} toggleTheme={toggleTheme} /><a className="header-resume" href={RESUME} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a><button className="mobile-nav-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{links.map(([label, href]) => <Link key={label} data-cursor="Open" data-magnetic to={href} aria-label={label} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={18}/></Link>)}<a href={RESUME} onClick={() => setOpen(false)}>Resume</a></nav>}
  </header>;
}
