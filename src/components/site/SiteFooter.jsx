import { Link } from 'react-router-dom';
import AsciiSignal from './AsciiSignal';
export default function SiteFooter() {
  return <footer id="playground" className="site-footer portfolio-footer"><div className="footer-intro"><p>Ideas in. Useful things out.</p><a href="#route-content">Back to the top ↑</a></div><h2 className="sr-only">Abrar Akhunji</h2><AsciiSignal variant="name"/><div className="footer-meta"><span>© {new Date().getFullYear()} Abrar Akhunji</span><span>Made with care. Built to be used.</span><div className="footer-links"><Link to="/about/">About</Link><Link to="/contact/">Contact</Link><Link to="/hire/">Hire</Link><Link to="/work/">All work</Link><Link to="/terms/">Terms</Link><Link to="/privacy/">Privacy</Link><a href="https://github.com/abrar225" target="_blank" rel="noreferrer">GitHub</a><a href="mailto:abrar@abrarakhunji.com">Say hello</a></div></div></footer>;
}
