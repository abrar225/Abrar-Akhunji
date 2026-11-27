import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return <main className="patch-wide patch-status">
    <SEO title="Page not found | Abrar Akhunji" description="Page not found. Return to the portfolio or explore the work and writing." path="/404/" noindex />
    <p className="patch-label">404</p>
    <h1>This signal ends here.</h1>
    <p>The address doesn’t point to a page.</p>
    <div className="patch-actions"><Link to="/">Return home</Link><Link to="/work/">Browse work</Link><Link to="/blog/">Read writing</Link></div>
  </main>;
}
