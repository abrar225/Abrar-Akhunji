import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Hire = lazy(() => import('./pages/Hire'));

function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scroll = () => {
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          if (window.__lenis?.scrollTo) window.__lenis.scrollTo(target, { offset: -72 });
          else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo(0, 0);
    };

    const timer = setTimeout(scroll, 160);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function RouteBoundary({ children }) {
  const location = useLocation();
  return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>;
}

function RouteFallback() {
  return (
    <div className="min-h-dvh bg-canvas flex items-center justify-center" aria-busy="true" aria-label="Loading page">
      <div className="flex items-center gap-3 text-fg">
        <span className="font-display font-semibold tracking-[-0.04em]">ABRAR.</span>
        <span className="h-px w-10 bg-accent animate-pulse" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouteBoundary>
      <RouteScroll />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </RouteBoundary>
  );
}
