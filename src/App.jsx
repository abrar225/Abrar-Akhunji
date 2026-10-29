import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import SiteHeader from './components/site/SiteHeader';
import SiteFooter from './components/site/SiteFooter';
import SiteMotion from './components/site/SiteMotion';
import IntroLoader from './components/site/IntroLoader';
import Soundscape from './components/site/Soundscape';
import WorkshopCreatures from './components/site/WorkshopCreatures';
import { useTheme } from './lib/useTheme';
import NotFound from './pages/NotFound';

const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Hire = lazy(() => import('./pages/Hire'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

function RouteScroll() {
  const { pathname, hash, search } = useLocation();
  const previous = useRef(null);

  useEffect(() => {
    const from = previous.current;
    previous.current = { pathname, hash, search };
    if (from?.pathname === pathname && from.search !== search && (from.hash === hash || !hash)) return;
    let disposed = false;
    const scroll = () => {
      if (disposed) return;
      if (hash) {
        let id;
        try { id = decodeURIComponent(hash.slice(1)); } catch { id = ''; }
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: !from || from.pathname !== pathname || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo(0, 0);
    };

    const timer = setTimeout(() => {
      if (hash) document.fonts.ready.then(scroll);
      else scroll();
    }, 160);
    return () => { disposed = true; clearTimeout(timer); };
  }, [pathname, hash, search]);

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
  const { theme } = useTheme();
  const [intro, setIntro] = useState(() => window.location.pathname === '/' && !window.location.hash && !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const completeIntro = useCallback(() => setIntro(false), []);
  useEffect(() => { document.documentElement.classList.remove('light','dark'); document.documentElement.classList.add(theme); document.documentElement.style.colorScheme = theme; }, [theme]);
  return (
    <>
      {intro && <IntroLoader onComplete={completeIntro}/>}
      <SiteMotion/>
      <div className="site-experience" inert={intro || undefined}>
      <RouteBoundary>
      <RouteScroll />
      <a className="skip-link" href="#route-content">Skip to content</a>
      <SiteHeader/>
      <Soundscape/>
      <WorkshopCreatures/>
      <div id="route-content" tabIndex={-1}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </div>
      <SiteFooter/>
      </RouteBoundary>
      </div>
    </>
  );
}
