import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllBlogs, getTopTags } from '../lib/blogUtils';
import { postPath, blogPath, BLOG_NAME } from '../lib/content/urls.js';
import SEO from '../components/SEO';
import SectionWrapper from '../components/SectionWrapper';
import TechTree from '../components/blog/TechTree';
import { ArrowLeft, ArrowUpRight, Calendar, User, List, GitBranch, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import ThemeToggle from '../components/ThemeToggle';
import { soundFX } from '../lib/soundFX';
import { useTheme } from '../lib/useTheme';

const BLOG_DESCRIPTION = 'Deep dives into AI systems, inference engineering, model architecture and production software, explained with the engineering detail that matters.';

export default function BlogList() {
  const allBlogs = getAllBlogs();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const [view, setView] = useState('list');
  const { theme, toggleTheme } = useTheme();

  const tags = useMemo(() => getTopTags(10), []);
  const blogs = useMemo(
    () => (activeTag ? allBlogs.filter((blog) => blog.tags.includes(activeTag)) : allBlogs),
    [allBlogs, activeTag]
  );

  const onToggleTheme = () => {
    soundFX.playToggle();
    toggleTheme();
  };

  const setTag = (tag) => {
    if (!tag) {
      setSearchParams({}, { replace: true });
      return;
    }
    setSearchParams({ tag }, { replace: true });
  };

  const schema = [{
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://abrarakhunji.com/blog/#blog',
    'name': BLOG_NAME,
    'url': 'https://abrarakhunji.com/blog/',
    'description': BLOG_DESCRIPTION,
    'inLanguage': 'en-IN',
    'author': { '@id': 'https://abrarakhunji.com/#person' },
    'publisher': { '@id': 'https://abrarakhunji.com/#person' },
    'blogPost': allBlogs.map((blog) => ({
      '@type': 'BlogPosting',
      'headline': blog.title,
      'url': `https://abrarakhunji.com${postPath(blog.slug)}`,
      'datePublished': blog.date,
      'dateModified': blog.updated || blog.date,
      'description': blog.description,
    })),
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: BLOG_NAME, item: 'https://abrarakhunji.com/blog/' },
    ],
  }];

  return (
    <div className="min-h-dvh bg-canvas text-fg pt-28 pb-16 max-w-[1000px] mx-auto px-6 md:px-12">
      <SEO
        title={`${BLOG_NAME} — AI & Systems Engineering Blog | Abrar Akhunji`}
        description={BLOG_DESCRIPTION}
        path={blogPath()}
        keywords={['AI engineering blog', 'LLM inference', 'agent systems', 'model architecture', 'computer vision engineering']}
        schema={schema}
      />

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
              {BLOG_NAME}.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted text-sm md:text-base max-w-xl leading-relaxed"
            >
              Field notes on AI systems, inference engineering and production software.
              Explained simply, then taken apart properly.
            </motion.p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Link to="/hire" className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors">
              Work with me
            </Link>
            <ThemeToggle theme={theme} toggleTheme={onToggleTheme} />
            <Magnetic strength={0.2}>
              <Link to="/" className="hidden md:flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
                <ArrowLeft size={16} /> Portfolio
              </Link>
            </Magnetic>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 p-1 bg-surface border border-line rounded-full w-fit"
        >
          <button
            type="button"
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              view === 'list' ? 'bg-elevated text-fg border border-line' : 'text-muted hover:text-fg'
            }`}
          >
            <List size={14} /> List
          </button>
          <button
            type="button"
            aria-pressed={view === 'tree'}
            onClick={() => setView('tree')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              view === 'tree' ? 'bg-elevated text-fg border border-line' : 'text-muted hover:text-fg'
            }`}
          >
            <GitBranch size={14} /> Tech Tree
          </button>
        </motion.div>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-3">Topics</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTag(null)}
              aria-pressed={!activeTag}
              className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${
                !activeTag
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-line text-muted hover:border-accent/40 hover:text-fg'
              }`}
            >
              All posts
            </button>
            {tags.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTag(tag)}
                aria-pressed={activeTag === tag}
                className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${
                  activeTag === tag
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-line text-muted hover:border-accent/40 hover:text-fg'
                }`}
              >
                {tag} <span className="text-faint">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

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
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {blogs.length} {blogs.length === 1 ? 'note' : 'notes'}
              {activeTag ? ` · ${activeTag}` : ''}
            </p>
            {blogs.length === 0 ? (
              <div className="p-10 border border-line border-dashed rounded-2xl text-center">
                <p className="text-2xl mb-2">∅</p>
                <p className="text-muted text-sm">No posts in this topic yet.</p>
                <button type="button" onClick={() => setTag(null)} className="mt-4 text-xs font-mono text-accent underline underline-offset-4">
                  Show all posts
                </button>
              </div>
            ) : (
              blogs.map((blog, i) => (
                <SectionWrapper key={blog.slug} delay={i * 0.05} className="block group">
                  <Link to={postPath(blog.slug)} className="grid md:grid-cols-12 gap-4 md:gap-8 py-7 border-b border-line">
                    <div className="md:col-span-3 font-mono text-[11px] tracking-[0.14em] uppercase text-faint pt-1">
                      <span className="block text-accent mb-2">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                      <span className="flex items-center gap-1.5 mt-1"><Clock size={12} /> {blog.readingTime} min</span>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="text-xl md:text-2xl font-display tracking-tight text-fg mb-2 group-hover:text-accent transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed line-clamp-2">{blog.description}</p>
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
            <TechTree blogs={allBlogs} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 rounded-2xl border border-line bg-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg text-fg tracking-tight">Building something in this space?</p>
          <p className="text-sm text-muted mt-1">I build AI/ML, computer vision and full-stack systems in Ahmedabad, Gandhinagar, Bangalore and remotely.</p>
        </div>
        <Link to="/hire" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-on-accent text-sm font-medium whitespace-nowrap">
          Work with me <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="mt-8 flex md:hidden">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
