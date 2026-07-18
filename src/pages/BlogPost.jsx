import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { getBlogBySlug, markdownToHtml, markPostAsRead, getAllBlogs } from '../lib/blogUtils';
import SEO from '../components/SEO';
import ModeToggle from '../components/blog/ModeToggle';
import WebSpeechPlayer from '../components/blog/WebSpeechPlayer';
import InteractiveBlock from '../components/blog/InteractiveBlock';
import ReadingProgress from '../components/blog/ReadingProgress';
import { ArrowLeft, Calendar, User, Share2, Clock, ChevronRight, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';

export default function BlogPost() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);
  const [mode, setMode] = useState('eli5');
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
      return bookmarks.includes(slug);
    } catch { 
      return false; 
    }
  });
  const contentRef = useRef(null);

  // Mark post as read when user visits
  useEffect(() => {
    if (blog) {
      markPostAsRead(slug);
    }
  }, [slug, blog]);

  // Determine if the blog has dual-mode content
  const hasDualMode = blog ? blog.sections.some((s) => s.type === 'eli5' || s.type === 'dev') : false;

  // Build the rendered HTML from sections based on current mode
  const renderedContent = useMemo(() => {
    if (!blog) return [];
    return blog.sections.map((section, i) => {
      if (section.type === 'neutral') {
        return { type: 'html', html: markdownToHtml(section.content), key: `neutral-${i}` };
      }
      if (section.type === 'eli5' && mode === 'eli5') {
        return { type: 'html', html: markdownToHtml(section.content), key: `eli5-${i}` };
      }
      if (section.type === 'dev' && mode === 'dev') {
        return { type: 'html', html: markdownToHtml(section.content), key: `dev-${i}` };
      }
      if (section.type === 'interactive') {
        return { type: 'interactive', widgetType: section.widgetType, config: section.config, key: `interactive-${i}` };
      }
      return null;
    }).filter(Boolean);
  }, [blog, mode]);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Get next/previous posts for navigation
  const allBlogs = getAllBlogs();
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  const prevPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

  const schemas = [];
  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.heroImage ? (blog.heroImage.startsWith('http') ? blog.heroImage : `https://abrarakhunji.com${blog.heroImage}`) : `https://abrarakhunji.com/images/myimg.webp`,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "url": "https://abrarakhunji.com"
    },
    "datePublished": blog.date,
    "url": `https://abrarakhunji.com/blog/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://abrarakhunji.com/blog/${slug}`
    },
    "publisher": {
      "@type": "Person",
      "name": "Abrar Akhunji",
      "url": "https://abrarakhunji.com"
    }
  };
  schemas.push(mainSchema);

  if (blog.faq && Array.isArray(blog.faq)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": blog.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const toggleBookmark = () => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
      const updated = isBookmarked ? bookmarks.filter((s) => s !== slug) : [...bookmarks, slug];
      localStorage.setItem('bookmarkedPosts', JSON.stringify(updated));
      setIsBookmarked(!isBookmarked);
    } catch { /* ignore */ }
  };

  return (
    <>
      <ReadingProgress />
      <SEO
        title={`${blog.title} | Abrar Akhunji`}
        description={blog.description}
        url={`/blog/${slug}`}
        type="article"
        image={blog.heroImage}
        schema={schemas.length === 1 ? schemas[0] : schemas}
      />

      <article className="min-h-screen bg-canvas text-fg">
        {/* ── Top Bar ── */}
        <div className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 bg-canvas/80 backdrop-blur-xl border-b border-line/50">
          <Link to="/blog" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
            <ArrowLeft size={16} /> Posts
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleBookmark} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${isBookmarked ? 'bg-accent border-accent text-[#0F0E0C]' : 'bg-surface border-line text-muted hover:text-accent hover:border-accent'}`}>
              <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <Magnetic strength={0.3}>
              <button onClick={handleShare} className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors">
                <Share2 size={14} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* ── Hero Area ── */}
        <div className="pt-24 pb-8 max-w-[800px] mx-auto px-6 md:px-12">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 flex-wrap mb-6"
          >
            {blog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-elevated text-xs font-mono uppercase tracking-widest rounded-full text-accent border border-accent/20">
                {tag}
              </span>
            ))}
          </motion.div>



          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-5xl font-serif text-fg mb-6 leading-[1.1] tracking-tight"
          >
            {blog.title}
          </motion.h1>

          {/* Meta Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 py-5 border-y border-line text-sm font-mono text-muted"
          >
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-accent" /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <User size={14} className="text-accent" /> Written by {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-accent" /> {blog.readingTime} min read
            </span>
          </motion.div>
        </div>

        {/* ── Control Panel (Audio + Mode Toggle) ── */}
        <div className="max-w-[800px] mx-auto px-6 md:px-12 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Audio Player */}
            <WebSpeechPlayer contentRef={contentRef} />

            {/* Mode Toggle */}
            {hasDualMode && (
              <ModeToggle mode={mode} onToggle={setMode} />
            )}
          </motion.div>
        </div>

        {/* ── Blog Content ── */}
        <div className="max-w-[800px] mx-auto px-6 md:px-12 pb-16" ref={contentRef}>
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Render sections one by one, interleaving interactive blocks */}
            {renderedContent.map((section) => {
              if (section.type === 'html') {
                return (
                  <div
                    key={section.key}
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                );
              }
              if (section.type === 'interactive') {
                return (
                  <div key={section.key} className="my-8">
                    <InteractiveBlock widgetType={section.widgetType} config={section.config} />
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        </div>

        {/* ── Next in the Tech Tree ── */}
        {(prevPost || nextPost) && (
          <div className="max-w-[800px] mx-auto px-6 md:px-12 pb-20">
            <div className="border-t border-line pt-10">
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-6">Continue Reading</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link to={`/blog/${prevPost.slug}`} className="group p-5 rounded-xl border border-line bg-surface hover:border-accent/40 transition-all">
                    <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">← Previous</p>
                    <h3 className="text-fg font-medium tracking-tight group-hover:text-accent transition-colors line-clamp-2">{prevPost.title}</h3>
                  </Link>
                )}
                {nextPost && (
                  <Link to={`/blog/${nextPost.slug}`} className="group p-5 rounded-xl border border-line bg-surface hover:border-accent/40 transition-all text-right md:text-right">
                    <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">Next →</p>
                    <h3 className="text-fg font-medium tracking-tight group-hover:text-accent transition-colors line-clamp-2">{nextPost.title}</h3>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
