import { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllBlogs, getTopTags } from '../lib/blogUtils';
import { postPath, blogPath, BLOG_NAME } from '../lib/content/urls.js';
import SEO from '../components/SEO';
import TechTree from '../components/blog/TechTree';
import { ArrowLeft, ArrowUpRight, List, GitBranch, Search, X } from 'lucide-react';

const BLOG_DESCRIPTION = 'Deep dives into AI systems, inference engineering, model architecture and production software, explained with the engineering detail that matters.';
const dateLabel = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function BlogList() {
  const allBlogs = getAllBlogs();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const query = searchParams.get('q') || '';
  const [view, setView] = useState('list');
  const searchRef = useRef(null);
  useEffect(() => {
    const shortcut = event => {
      const editing = event.target instanceof Element && event.target.closest('input, textarea, [contenteditable=true]');
      if (event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault(); searchRef.current?.focus();
      } else if (event.key === 'Escape' && event.target === searchRef.current) {
        event.preventDefault();
        if (searchRef.current.value) {
          const next = new URLSearchParams(window.location.search); next.delete('q');
          setSearchParams(next, { replace: true, preventScrollReset: true });
        } else searchRef.current.blur();
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, [setSearchParams]);
  const tags = useMemo(() => getTopTags(10), []);
  const blogs = useMemo(() => {
    const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    return allBlogs.filter((blog) => {
      if (activeTag && !blog.tags.includes(activeTag)) return false;
      const text = `${blog.title} ${blog.description} ${blog.tags.join(' ')}`.toLocaleLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [allBlogs, activeTag, query]);
  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };
  const featured = !activeTag && !query.trim() ? blogs[0] : null;
  const remaining = featured ? blogs.slice(1) : blogs;
  const schema = [{
    '@context': 'https://schema.org', '@type': 'Blog',
    '@id': 'https://abrarakhunji.com/blog/#blog', name: BLOG_NAME,
    url: 'https://abrarakhunji.com/blog/', description: BLOG_DESCRIPTION, inLanguage: 'en-IN',
    author: { '@id': 'https://abrarakhunji.com/#person' }, publisher: { '@id': 'https://abrarakhunji.com/#person' },
    blogPost: allBlogs.map((blog) => ({
      '@type': 'BlogPosting', headline: blog.title,
      url: `https://abrarakhunji.com${postPath(blog.slug)}`,
      datePublished: blog.date, dateModified: blog.updated || blog.date, description: blog.description,
    })),
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: BLOG_NAME, item: 'https://abrarakhunji.com/blog/' },
    ],
  }];

  return (
    <main className="reading-desk">
      <SEO title={`${BLOG_NAME} — AI & Systems Engineering Blog | Abrar Akhunji`} description={BLOG_DESCRIPTION} path={blogPath()}
        keywords={['AI engineering blog', 'LLM inference', 'agent systems', 'model architecture', 'computer vision engineering']} schema={schema} />
      <div className="desk-topline">
        <Link to="/" className="desk-back"><ArrowLeft size={16} /> Abrar Akhunji</Link>
      </div>
      <header className="desk-header">
        <p className="desk-note">A working collection of ideas</p>
        <h1>{BLOG_NAME}<span aria-hidden="true">.</span></h1>
        <p>Field notes on AI systems, inference engineering and production software. Explained simply, then taken apart properly.</p>
      </header>
      <div className="desk-tools">
        <label className="desk-search"><Search size={18} /><span className="sr-only">Search articles</span><input ref={searchRef} type="search" placeholder="Find a thought, a model, a system…" value={query} onChange={(event) => updateFilter('q', event.target.value)} /><kbd className="desk-search-hint" aria-hidden="true">/</kbd></label>
        <div className="desk-view" aria-label="Article view">
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={16} /> List</button>
          <button type="button" aria-pressed={view === 'tree'} onClick={() => setView('tree')}><GitBranch size={16} /> Tech Tree</button>
        </div>
      </div>
      <div className="desk-topics" aria-label="Filter articles by topic">
        <button type="button" aria-pressed={!activeTag} onClick={() => updateFilter('tag', null)}>All posts <span>{allBlogs.length}</span></button>
        {tags.map(({ tag, count }) => <button key={tag} type="button" aria-pressed={activeTag === tag} onClick={() => updateFilter('tag', tag)}>{tag} <span>{count}</span></button>)}
        {activeTag && !tags.some(({ tag }) => tag === activeTag) && <button type="button" aria-pressed="true" onClick={() => updateFilter('tag', null)}>{activeTag} <X size={12} /></button>}
      </div>
      <p className="desk-result" role="status">{blogs.length} {blogs.length === 1 ? 'note' : 'notes'}{activeTag ? ` on ${activeTag}` : ''}{query.trim() ? ` matching “${query.trim()}”` : ''}</p>
      {view === 'tree' ? <div className="desk-tree"><TechTree blogs={blogs} /></div> : <>
        {featured && <section className="desk-feature" aria-label="Latest article">
          <div className="desk-feature-meta"><span>Latest note</span><time dateTime={featured.date}>{dateLabel(featured.date)}</time><span>{featured.readingTime} min read</span></div>
          <Link to={postPath(featured.slug)} data-cursor="Read" className="desk-feature-link"><h2>{featured.title}</h2><p>{featured.description}</p><span className="desk-read">Read the note <ArrowUpRight size={17} /></span></Link>
        </section>}
        {blogs.length === 0 ? <div className="desk-empty"><h2>No notes found.</h2><p>Try another topic or a different search.</p><button type="button" onClick={() => setSearchParams({}, { replace: true, preventScrollReset: true })}>Show all notes</button></div> : <div className="desk-articles">
          {remaining.map((blog) => <article key={blog.slug} className="desk-entry"><time dateTime={blog.date}>{dateLabel(blog.date)}</time><Link to={postPath(blog.slug)} data-cursor="Read"><h2>{blog.title}</h2><p>{blog.description}</p><span>{blog.tags.slice(0, 2).join(' / ')}<span className="desk-entry-time">{blog.readingTime} min</span></span></Link><ArrowUpRight className="desk-entry-arrow" size={20} aria-hidden="true" /></article>)}
        </div>}
      </>}
      <footer className="desk-footer"><div><p>Have a useful problem in mind?</p><span>I build AI applications and full-stack products.</span></div><Link to="/hire/">Work with me <ArrowUpRight size={17} /></Link></footer>
    </main>
  );
}
