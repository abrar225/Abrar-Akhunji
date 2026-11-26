import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useRef } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import { SignalFooter, SignalHeader } from './components/v5/Chrome';
import NotFound from './pages/NotFound';

const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Hire = lazy(() => import('./pages/Hire'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));

function RouteContent({ children }) {
  const { pathname, hash } = useLocation();
  const previous = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    if (from && from !== pathname) content.current.focus({ preventScroll: true });
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView();
      return true;
    };

    if (scrollToTarget()) return;
    // Direct article links can target headings inserted after Markdown loads.
    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    observer.observe(content.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash]);

  return <div id="route-content" className="signal-route" tabIndex={-1} ref={content}>{children}</div>;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="signal-shell">
      <a className="skip-link" href="#route-content">Skip to content</a>
      <SignalHeader />
      <RouteContent>
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<div className="signal-loading" role="status">Loading page…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/hire" element={<Hire />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </RouteContent>
      <SignalFooter />
    </div>
  );
}
