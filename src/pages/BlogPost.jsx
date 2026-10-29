import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
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
import CodeCopyButtons from '../components/blog/CodeCopyButtons';
import { BlogPostActions } from '../components/blog/BlogPostActions';
import { extractSourcesFromMarkdown } from '../components/agents/Citations';
import { ArrowLeft, ArrowUpRight, Share2, Check, Bookmark } from 'lucide-react';

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
  const meta = getBlogBySlug(slug);
  const [post, setPost] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'dev' ? 'dev' : 'eli5';
  const setMode = next => {
    const params = new URLSearchParams(searchParams);
    if (next === 'dev') params.set('mode', 'dev'); else params.delete('mode');
    setSearchParams(params, { replace: true, preventScrollReset: true });
  };
  const [bookmarked, setBookmarked] = useState(() => readBookmarks().includes(meta?.slug));
  const [shareState, setShareState] = useState('idle');
  const contentRef = useRef(null);
  const shareTimer = useRef(null);

  // Load only this post's markdown.
  useEffect(() => {
    if (!meta) return undefined;
    let cancelled = false;
    setPost(null);
    setLoadError(null);

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
      <ReadingProgress contentRef={contentRef} refreshKey={`${meta.slug}:${mode}:${Boolean(post)}`} />
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
      <article className="editorial-reader">
        <div className="reader-toolbar">
          <Link to="/blog/" className="reader-back"><ArrowLeft size={16} /> The Neural Log</Link>
          <div className="reader-toolbar-actions">
            <button type="button" onClick={toggleBookmark} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this article'} aria-pressed={bookmarked} className="reader-icon-button">
              <Bookmark size={17} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button type="button" onClick={handleShare} aria-label="Share this article" className="reader-icon-button">
              {shareState === 'copied' ? <Check size={17} /> : <Share2 size={17} />}
            </button>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">{shareState === 'copied' ? 'Link copied to clipboard' : shareState === 'error' ? 'Could not copy the link' : ''}</span>
        <header className="reader-header">
          <div className="reader-tags">{meta.tags.map((tag) => <Link key={tag} to={`/blog/?tag=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div>
          <h1>{meta.title}</h1>
          <p className="reader-description">{meta.description}</p>
          <div className="reader-byline"><span>By {meta.author}</span><time dateTime={meta.date}>{new Date(`${meta.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time><span>{meta.readingTime} min read</span></div>
          {meta.heroImage && <figure className="reader-hero"><img src={meta.heroImage} alt={meta.title} loading="eager" decoding="async" fetchPriority="high" /></figure>}
        </header>
        {!post && !loadError && <PostSkeleton />}
        {loadError && <LoadError error={loadError} onRetry={() => setReloadKey((key) => key + 1)} />}
        {post && <>
          <div className="reader-layout">
            <div className="reader-column">
              <div className="reader-controls"><WebSpeechPlayer key={`${post.slug}:${mode}`} contentRef={contentRef} />{hasDualMode && <div className="reader-mode"><span>Choose your reading depth</span><ModeToggle mode={mode} onToggle={setMode} /></div>}</div>
              <div ref={contentRef} className="reader-content">
                {renderedContent.map((section) => section.type === 'html'
                  ? <div key={section.key} className="markdown-body" dangerouslySetInnerHTML={{ __html: section.html }} />
                  : <div key={section.key} className="reader-interactive"><InteractiveBlock widgetType={section.widgetType} config={section.config} /></div>)}
              </div>
              <CodeCopyButtons contentRef={contentRef} refreshKey={`${post.slug}:${mode}`} />
              <BlogPostActions key={post.slug} copyText={post.content} sources={sources} slug={post.slug} />
            </div>
            <MessageScroller key={post.slug} contentRef={contentRef} mode={mode} />
          </div>
          <footer className="reader-ending">
            {related.length > 0 && <section className="reader-related"><h2>Related notes</h2><div>{related.map((item) => <Link key={item.slug} to={postPath(item.slug)} data-cursor="Read"><span>{item.date} / {item.readingTime} min</span><h3>{item.title}</h3><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div></section>}
            {(prevPost || nextPost) && <nav className="reader-next" aria-label="Continue reading">
              {prevPost && <Link to={postPath(prevPost.slug)} data-cursor="Read"><span>Previous note</span><h3>{prevPost.title}</h3></Link>}
              {nextPost && <Link to={postPath(nextPost.slug)} data-cursor="Read"><span>Next note</span><h3>{nextPost.title}</h3></Link>}
            </nav>}
            <div className="reader-invitation"><div><p>Have a useful problem in mind?</p><span>Let’s turn it into something people can use.</span></div><Link to="/hire/">Work with me <ArrowUpRight size={17} /></Link></div>
          </footer>
        </>}
      </article>
    </>
  );
}
