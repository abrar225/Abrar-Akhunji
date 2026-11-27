import { lazy, Suspense, useRef } from 'react';
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { PatchFooter, PatchHeader, PatchStatus } from './patchbay/Chrome';
import { useRouteArrival } from './patchbay/useRouteArrival';

const pages = [
  ['/', Home],
  ['/about', lazy(() => import('./pages/About'))],
  ['/contact', lazy(() => import('./pages/Contact'))],
  ['/terms', lazy(() => import('./pages/Terms'))],
  ['/privacy', lazy(() => import('./pages/Privacy'))],
  ['/blog', lazy(() => import('./pages/BlogList'))],
  ['/blog/:slug', lazy(() => import('./pages/BlogPost'))],
  ['/hire', lazy(() => import('./pages/Hire'))],
  ['/work', lazy(() => import('./pages/Work'))],
  ['/work/:slug', lazy(() => import('./pages/CaseStudy'))],
  ['*', NotFound],
];

export default function App() {
  const location = useLocation();
  const type = useNavigationType();
  const reduce = useReducedMotion();
  const content = useRef(null);
  const page = location.pathname.replace(/\/$/, '') || '/';
  useRouteArrival(location, type, content);

  return (
    <div className="patch-shell" data-portfolio-version="v5">
      <a className="patch-skip" href="#route-content">Skip to content</a>
      <PatchHeader />
      <div id="route-content" className="patch-route" tabIndex={-1} ref={content}>
        <ErrorBoundary key={page} fallback={(props) => <PatchStatus {...props} />}>
          <Suspense fallback={<PatchStatus />}>
            <motion.div key={page}
              initial={reduce ? false : { opacity: .72 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : .18 }}>
              <Routes>
                {pages.map(([path, Page]) => (
                  <Route key={path} path={path} element={<div className={'patch-interior signal-shell'}><Page /></div>} />
                ))}
              </Routes>
            </motion.div>
          </Suspense>
        </ErrorBoundary>
      </div>
      <PatchFooter />
    </div>
  );
}
