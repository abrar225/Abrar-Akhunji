import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../lib/blogUtils';
import SEO from '../components/SEO';
import SectionWrapper from '../components/SectionWrapper';
import TechTree from '../components/blog/TechTree';
import { ArrowLeft, Calendar, User, List, GitBranch, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import ThemeToggle from '../components/ThemeToggle';
import { soundFX } from '../lib/soundFX';
import { useTheme } from '../lib/useTheme';

export default function BlogList() {
  const blogs = getAllBlogs();
  const [view, setView] = useState('list'); // 'list' | 'tree'
  const { theme, toggleTheme } = useTheme();
  const onToggleTheme = () => {
    soundFX.playToggle();
    toggleTheme();
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Abrar Akhunji's Tech & AI Blog",
    "url": "https://abrarakhunji.com/blog",
    "description": "Deep dives into new AI technologies and IT sector news, explained simply.",
    "author": {
      "@type": "Person",
      "name": "Abrar Akhunji",
      "url": "https://abrarakhunji.com"
    }
  };

  return (
    <div className="min-h-dvh bg-canvas text-fg pt-28 pb-16 max-w-[1000px] mx-auto px-6 md:px-12">
      <SEO
        title="Blog | Abrar Akhunji"
        description="Deep dives into new AI technologies and IT sector news, explained simply."
        url="/blog"
        schema={schema}
      />

      {/* ── Header ── */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif italic text-accent text-lg mb-3"
            >
              Writing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-fg mb-4 leading-[1.05]"
            >
              Field notes.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted text-sm md:text-base max-w-xl leading-relaxed"
            >
              Breaking down the latest in AI, Machine Learning, and Software Engineering
              into simple, actionable insights. Daily.
            </motion.p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <ThemeToggle theme={theme} toggleTheme={onToggleTheme} />
            <Magnetic strength={0.2}>
              <Link to="/" className="hidden md:flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
                <ArrowLeft size={16} /> Portfolio
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* ── View Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 p-1 bg-surface border border-line rounded-full w-fit"
        >
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              view === 'list' ? 'bg-elevated text-fg border border-line' : 'text-muted hover:text-fg'
            }`}
          >
            <List size={14} /> List
          </button>
          <button
            onClick={() => setView('tree')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              view === 'tree' ? 'bg-elevated text-fg border border-line' : 'text-muted hover:text-fg'
            }`}
          >
            <GitBranch size={14} /> Tech Tree
          </button>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {blogs.length === 0 ? (
              <div className="p-10 border border-line border-dashed rounded-2xl text-center">
                <p className="text-2xl mb-2">📝</p>
                <p className="text-muted text-sm">No posts yet. The first one is dropping soon!</p>
              </div>
            ) : (
              blogs.map((blog, i) => (
                <SectionWrapper key={blog.slug} delay={i * 0.08} className="block group">
                  <Link to={`/blog/${blog.slug}`} className="grid md:grid-cols-12 gap-4 md:gap-8 py-7 border-b border-line">
                    <div className="md:col-span-3 font-mono text-[11px] tracking-[0.14em] uppercase text-faint pt-1">
                      <span className="block text-accent mb-2">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                      <span className="flex items-center gap-1.5 mt-1"><Clock size={12} /> {blog.readingTime} min</span>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="text-xl md:text-2xl font-display tracking-tight text-fg mb-2 group-hover:text-accent transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed line-clamp-2">
                        {blog.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[11px] font-mono text-faint">
                        <span className="inline-flex items-center gap-1.5"><User size={12} /> {blog.author}</span>
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-accent">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </SectionWrapper>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tree"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <TechTree blogs={blogs} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 flex md:hidden">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
