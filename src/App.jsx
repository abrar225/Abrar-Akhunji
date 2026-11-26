import { Routes, Route, matchRoutes, useLocation } from 'react-router-dom';
import { Suspense, use, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import { SignalFooter, SignalHeader } from './components/v5/Chrome';
import NotFound from './pages/NotFound';

const pages = [
  ['/', Home],
  ['/about', () => import('./pages/About'), true],
  ['/contact', () => import('./pages/Contact'), true],
  ['/terms', () => import('./pages/Terms'), true],
  ['/privacy', () => import('./pages/Privacy'), true],
  ['/blog', () => import('./pages/BlogList'), true],
  ['/blog/:slug', () => import('./pages/BlogPost'), true],
  ['/hire', () => import('./pages/Hire'), true],
  ['/work', () => import('./pages/Work'), true],
  ['/work/:slug', () => import('./pages/CaseStudy'), true],
  ['*', NotFound],
].map(([path, entry, deferred]) => {
  if (!deferred) return { path, Component: entry };

  let resolved;
  let pending;
  const preload = () => {
    pending ??= entry().then((module) => {
      resolved = module.default;
      return module;
    });
    return pending;
  };
  const Component = () => {
    const Page = resolved || use(preload()).default;
    return <Page />;
  };

  return { path, Component, preload };
});

function RouteContent({ children, page, hash, onArrival, animate }) {
  const content = useRef(null);

  useLayoutEffect(() => { onArrival(page, content.current); }, [page, onArrival]);

  useLayoutEffect(() => {
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
  }, [hash]);

  return (
    <motion.div id="route-content" className="signal-route" tabIndex={-1} ref={content}
      initial={animate ? { opacity: .45, y: 18 } : false}
      animate={{ opacity: 1, y: 0, transition: { duration: animate ? .32 : 0, ease: [.21,.68,.29,1] } }}
      exit={animate ? { opacity: .26, y: -9, transition: { duration: .14, ease: 'easeIn' } } : { transition: { duration: 0 } }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const page = location.pathname.replace(/\/$/, '') || '/';
  const lastPage = useRef(null);
  const onArrival = useCallback((nextPage, element) => {
    if (lastPage.current && lastPage.current !== nextPage) element.focus({ preventScroll: true });
    lastPage.current = nextPage;
  }, []);
  const reduce = useReducedMotion();
  useEffect(() => {
    // Fetch the next route during the exit, before its first animated paint.
    const match = matchRoutes(pages, page)?.[0];
    match?.route.preload?.().catch(() => {
      // Let the route error boundary handle failed imports at render time.
    });
  }, [page]);
  return (
    <div className="signal-shell">
      <a className="skip-link" href="#route-content">Skip to content</a>
      <SignalHeader />
      <AnimatePresence mode="wait" initial={false}>
        <RouteContent key={page} page={page} hash={location.hash} onArrival={onArrival} animate={!reduce}>
          <ErrorBoundary>
            <Suspense fallback={<div className="signal-loading" role="status">Loading page…</div>}>
              <Routes location={location}>
                {pages.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </RouteContent>
      </AnimatePresence>
      <SignalFooter />
    </div>
  );
}
