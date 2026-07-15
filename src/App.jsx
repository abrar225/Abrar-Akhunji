import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
// Lazy load blog pages to keep main bundle small
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Suspense>
  );
}
