import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../lib/blogUtils';
import SEO from '../components/SEO';
import SectionWrapper from '../components/SectionWrapper';
import TechTree from '../components/blog/TechTree';
import { ArrowLeft, Calendar, User, List, GitBranch, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/Magnetic';

export default function BlogList() {
  const blogs = getAllBlogs();
  const [view, setView] = useState('list'); // 'list' | 'tree'

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
    <div className="min-h-screen bg-canvas text-fg pt-28 pb-16 max-w-[1000px] mx-auto px-6 md:px-12">
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
              className="font-mono text-xs text-accent mb-3"
            >
              ( Blog )
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-fg mb-4"
            >
              The Neural <span className="text-accent">Log.</span>
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
          <Magnetic strength={0.2}>
            <Link to="/" className="hidden md:flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mt-2">
              <ArrowLeft size={16} /> Portfolio
            </Link>
          </Magnetic>
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
                  <Link to={`/blog/${blog.slug}`} className="block p-6 rounded-2xl border border-line bg-surface hover:border-accent/40 transition-all duration-300 hover:bg-surface/80">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-4 text-xs font-mono text-faint">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readingTime} min</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {blog.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-elevated text-[10px] uppercase tracking-widest rounded-full text-accent font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-medium text-fg mb-2 group-hover:text-accent transition-colors tracking-tight">
                      {blog.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed line-clamp-2">
                      {blog.description}
                    </p>

                    {/* Footer: byline + feature indicators */}
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                        <User size={12} className="text-accent" />
                        Written by <span className="text-fg">{blog.author}</span>
                      </span>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-faint uppercase tracking-widest">
                        <span className="flex items-center gap-1">🎧 Audio</span>
                        {blog.sections.some((s) => s.type === 'eli5') && <span className="flex items-center gap-1">🧒 ELI5</span>}
                        {blog.sections.some((s) => s.type === 'interactive') && <span className="flex items-center gap-1">🎮 Interactive</span>}
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
