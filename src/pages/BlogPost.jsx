import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import {
  getBlogBySlug,
  loadBlog,
  markPostAsRead,
  getAllBlogs,
  getRelatedBlogs,
} from '../lib/blogUtils';
import { markdownToHtml } from '../lib/content/markdown.js';
import { postPath, postUrl, absoluteUrl, PERSON_ID, WEBSITE_ID } from '../lib/content/urls.js';
import SEO from '../components/SEO';
import NotFound from './NotFound';
import ModeToggle from '../components/blog/ModeToggle';
import WebSpeechPlayer from '../components/blog/WebSpeechPlayer';
import InteractiveBlock from '../components/blog/InteractiveBlock';
import ReadingProgress from '../components/blog/ReadingProgress';
import MessageScroller from '../components/blog/MessageScroller';
import { BlogPostActions } from '../components/blog/BlogPostActions';
import { extractSourcesFromMarkdown } from '../components/agents/Citations';
import { ArrowLeft, Calendar, User, Share2, Clock, Check, ChevronRight, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import ThemeToggle from '../components/ThemeToggle';
import { soundFX } from '../lib/soundFX';
import { useTheme } from '../lib/useTheme';

function readBookmarks() {
  try {
    const value = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function safeMarkdown(source) {
  try {
    return markdownToHtml(source);
  } catch (error) {
    console.error('[blog] markdown render failed', error);
    return '<p class="text-muted">This section could not be rendered.</p>';
  }
}

function PostSkeleton() {
  return (
    <div className="max-w-[800px] mx-auto px-6 md:px-12 pt-24 pb-16" aria-busy="true" aria-label="Loading article">
      <div className="h-3 w-24 rounded bg-elevated animate-pulse mb-6" />
      <div className="h-10 w-full rounded bg-elevated animate-pulse mb-3" />
      <div className="h-10 w-4/5 rounded bg-elevated animate-pulse mb-8" />
      <div className="h-3 w-64 rounded bg-elevated animate-pulse mb-10" />
      <div className="aspect-video w-full rounded-2xl bg-elevated animate-pulse mb-10" />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-4 rounded bg-elevated animate-pulse mb-3" style={{ width: `${92 - i * 7}%` }} />
      ))}
    </div>
  );
}

function LoadError({ error, onRetry }) {
  return (
    <div className="max-w-[800px] mx-auto px-6 md:px-12 pt-28 pb-20 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent mb-4">Reader error</p>
      <h1 className="font-serif text-4xl text-fg mb-4">This post could not be opened.</h1>
      <p className="text-muted text-sm max-w-md mx-auto mb-8">
        {error?.message || 'Something interrupted the request. Your connection may have dropped.'}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-3 rounded-full bg-accent text-on-accent text-sm font-medium"
        >
          Try again
        </button>
        <Link to="/blog" className="px-5 py-3 rounded-full border border-line text-sm text-fg hover:border-accent transition-colors">
          All notes
        </Link>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { theme, toggleTheme } = useTheme();
  const meta = getBlogBySlug(slug);
  const [post, setPost] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [mode, setMode] = useState('eli5');
  const [bookmarked, setBookmarked] = useState(() => readBookmarks().includes(meta?.slug));
  const [shareState, setShareState] = useState('idle');
  const contentRef = useRef(null);
  const lenisRef = useRef(null);
  const shareTimer = useRef(null);

  // Load only this post's markdown.
  useEffect(() => {
    if (!meta) return undefined;
    let cancelled = false;
    setPost(null);
    setLoadError(null);
    setMode('eli5');

    loadBlog(meta)
      .then((loaded) => {
        if (!cancelled) setPost(loaded);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error);
      });

    return () => { cancelled = true; };
  }, [meta, reloadKey]);

  useEffect(() => {
    if (!meta) return;
    setBookmarked(readBookmarks().includes(meta.slug));
  }, [meta]);

  useEffect(() => () => {
    if (shareTimer.current) clearTimeout(shareTimer.current);
  }, []);

  // Smooth inertial scrolling for the reader.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    if (post) markPostAsRead(post.slug);
  }, [post]);

  const hasDualMode = Boolean(meta?.hasDualMode);

  const renderedContent = useMemo(() => {
    if (!post) return [];
    return post.sections.map((section, i) => {
      if (section.type === 'neutral') {
        return { type: 'html', html: safeMarkdown(section.content), key: `neutral-${i}` };
      }
      if (section.type === 'eli5' && mode === 'eli5') {
        return { type: 'html', html: safeMarkdown(section.content), key: `eli5-${i}` };
      }
      if (section.type === 'dev' && mode === 'dev') {
        return { type: 'html', html: safeMarkdown(section.content), key: `dev-${i}` };
      }
      if (section.type === 'interactive') {
        return { type: 'interactive', widgetType: section.widgetType, config: section.config, key: `interactive-${i}` };
      }
      return null;
    }).filter(Boolean);
  }, [post, mode]);

  const sources = useMemo(
    () => (post ? extractSourcesFromMarkdown(post.content) : []),
    [post]
  );

  const related = useMemo(() => getRelatedBlogs(meta, 3), [meta]);

  // Typeset math after the current mode's HTML is in the DOM.
  useEffect(() => {
    let cancelled = false;
    const root = contentRef.current;
    if (!root || !post || !root.querySelector('.math-slot')) return undefined;

    Promise.all([import('katex'), import('katex/dist/katex.min.css')]).then(([{ default: katex }]) => {
      if (cancelled) return;
      root.querySelectorAll('.math-slot').forEach((el) => {
        if (el.dataset.rendered) return;
        const tex = el.dataset.tex || '';
        try {
          katex.render(tex, el, {
            displayMode: el.dataset.display === '1',
            throwOnError: false,
            strict: false,
          });
        } catch {
          el.textContent = tex;
        }
        el.dataset.rendered = '1';
      });
      if (lenisRef.current) {
        setTimeout(() => lenisRef.current?.resize(), 60);
      }
    });

    return () => { cancelled = true; };
  }, [post, mode, renderedContent]);

  if (!meta) return <NotFound />;
  if (meta.slug !== slug) return <Navigate to={postPath(meta.slug)} replace />;

  const allBlogs = getAllBlogs();
  const currentIndex = allBlogs.findIndex((item) => item.slug === meta.slug);
  const prevPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const canonicalUrl = postUrl(meta.slug);

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': ['TechArticle', 'BlogPosting'],
    '@id': `${canonicalUrl}#article`,
    headline: post?.title || meta.title,
    description: meta.description,
    image: meta.heroImage ? absoluteUrl(meta.heroImage) : undefined,
    inLanguage: 'en-IN',
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    datePublished: meta.date,
    dateModified: post?.updated || meta.updated || meta.date,
    timeRequired: `PT${meta.readingTime}M`,
    wordCount: post ? post.content.split(/\s+/).filter(Boolean).length : undefined,
    keywords: meta.tags.join(', '),
    articleSection: meta.techTree?.branch || 'Artificial Intelligence',
    isAccessibleForFree: true,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p'],
    },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'The Neural Log', item: 'https://abrarakhunji.com/blog/' },
      { '@type': 'ListItem', position: 3, name: meta.title, item: canonicalUrl },
    ],
  }];

  if (post?.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  const handleShare = async () => {
    if (!post) return;
    const url = canonicalUrl;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.description, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareState('copied');
      if (shareTimer.current) clearTimeout(shareTimer.current);
      shareTimer.current = setTimeout(() => setShareState('idle'), 1800);
    } catch (error) {
      if (error?.name !== 'AbortError') setShareState('error');
    }
  };

  const toggleBookmark = () => {
    if (!post) return;
    try {
      const bookmarks = readBookmarks();
      const next = bookmarked
        ? bookmarks.filter((value) => value !== post.slug)
        : [...new Set([...bookmarks, post.slug])];
      localStorage.setItem('bookmarkedPosts', JSON.stringify(next));
      setBookmarked(!bookmarked);
    } catch {
      setShareState('error');
    }
  };

  return (
    <>
      <ReadingProgress />
      <SEO
        title={`${meta.title} | Abrar Akhunji`}
        description={meta.description}
        path={postPath(meta.slug)}
        type="article"
        image={meta.heroImage}
        publishedTime={meta.date}
        modifiedTime={post?.updated || meta.updated}
        keywords={meta.tags}
        schema={schemas}
      />

      <article className="min-h-dvh bg-canvas text-fg">
        <div className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 bg-canvas/80 backdrop-blur-xl border-b border-line/50">
          <Link to="/blog/" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
            <ArrowLeft size={16} /> The Neural Log
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/hire/" className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors">
              Work with me
            </Link>
            <ThemeToggle theme={theme} toggleTheme={() => { soundFX.playToggle(); toggleTheme(); }} />
            <button
              type="button"
              onClick={toggleBookmark}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
              aria-pressed={bookmarked}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${bookmarked ? 'bg-accent border-accent text-on-accent' : 'bg-surface border-line text-muted hover:text-accent hover:border-accent'}`}
            >
              <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share this article"
                className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
              >
                {shareState === 'copied' ? <Check size={14} /> : <Share2 size={14} />}
              </button>
            </Magnetic>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          {shareState === 'copied' ? 'Link copied to clipboard' : shareState === 'error' ? 'Could not copy the link' : ''}
        </span>

        <div className="pt-20 pb-8 max-w-[800px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 flex-wrap mb-6"
          >
            {meta.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-elevated text-xs font-mono uppercase tracking-widest rounded-full text-accent border border-accent/20">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-5xl font-serif text-fg mb-6 leading-[1.1] tracking-tight"
          >
            {meta.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 border-y border-line text-sm font-mono text-muted"
          >
            <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {meta.date}</span>
            <span className="flex items-center gap-2"><User size={14} className="text-accent" /> Written by {meta.author}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> {meta.readingTime} min read</span>
          </motion.div>

          {meta.heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-8 rounded-2xl overflow-hidden border border-line shadow-2xl bg-surface aspect-video"
            >
              <img
                src={meta.heroImage}
                alt={meta.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          )}
        </div>

        {!post && !loadError && <PostSkeleton />}
        {loadError && <LoadError error={loadError} onRetry={() => setReloadKey((key) => key + 1)} />}

        {post && (
          <>
            <div className="max-w-[800px] mx-auto px-6 md:px-12 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <WebSpeechPlayer contentRef={contentRef} />
                {hasDualMode && <ModeToggle mode={mode} onToggle={setMode} />}
              </motion.div>
            </div>

            <MessageScroller key={post.slug} contentRef={contentRef} mode={mode} lenisRef={lenisRef} />

            <div className="max-w-[800px] mx-auto px-6 md:px-12 pb-16" ref={contentRef}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
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
                    return (
                      <div key={section.key} className="my-8">
                        <InteractiveBlock widgetType={section.widgetType} config={section.config} />
                      </div>
                    );
                  })}
                </div>

                <BlogPostActions copyText={post.content} sources={sources} slug={post.slug} />
              </motion.div>
            </div>

            <div className="max-w-[800px] mx-auto px-6 md:px-12 pb-16">
              <div className="rounded-2xl border border-line bg-surface p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-2">Build the next system</p>
                  <p className="text-fg font-display text-xl tracking-tight">Need this kind of engineering on your team?</p>
                  <p className="text-muted text-sm mt-1">Available in Ahmedabad, Gandhinagar, Bangalore and remotely.</p>
                </div>
                <Link to="/hire/" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-on-accent text-sm font-medium whitespace-nowrap">
                  Work with me <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className="max-w-[800px] mx-auto px-6 md:px-12 pb-16">
                <p className="text-xs font-mono text-accent uppercase tracking-widest mb-5">Related notes</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {related.map((item) => (
                    <Link key={item.slug} to={postPath(item.slug)} className="group p-5 rounded-xl border border-line bg-surface hover:border-accent/40 transition-all">
                      <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">{item.date} · {item.readingTime} min</p>
                      <h2 className="text-sm font-medium text-fg group-hover:text-accent transition-colors line-clamp-2">{item.title}</h2>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(prevPost || nextPost) && (
              <div className="max-w-[800px] mx-auto px-6 md:px-12 pb-20">
                <div className="border-t border-line pt-10">
                  <p className="text-xs font-mono text-accent uppercase tracking-widest mb-6">Continue reading</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prevPost && (
                      <Link to={postPath(prevPost.slug)} className="group p-5 rounded-xl border border-line bg-surface hover:border-accent/40 transition-all">
                        <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">← Previous</p>
                        <h3 className="text-fg font-medium tracking-tight group-hover:text-accent transition-colors line-clamp-2">{prevPost.title}</h3>
                      </Link>
                    )}
                    {nextPost && (
                      <Link to={postPath(nextPost.slug)} className="group p-5 rounded-xl border border-line bg-surface hover:border-accent/40 transition-all md:text-right">
                        <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">Next →</p>
                        <h3 className="text-fg font-medium tracking-tight group-hover:text-accent transition-colors line-clamp-2">{nextPost.title}</h3>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </article>
    </>
  );
}
