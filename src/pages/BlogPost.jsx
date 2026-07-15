import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogBySlug, markdownToHtml } from '../lib/blogUtils';
import SEO from '../components/SEO';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Magnetic from '../components/Magnetic';

export default function BlogPost() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const htmlContent = markdownToHtml(blog.content);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "url": "https://abrar225.github.io/Abrar-Akhunji"
    },
    "datePublished": blog.date,
    "url": `https://abrar225.github.io/Abrar-Akhunji/blog/${slug}`
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen pt-28 pb-24 max-w-[800px] mx-auto px-6 md:px-12">
      <SEO 
        title={`${blog.title} | Abrar Akhunji`} 
        description={blog.description} 
        url={`/blog/${slug}`}
        type="article"
        schema={schema}
      />

      <div className="mb-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft size={16} /> Back to posts
        </Link>
        
        <div className="flex gap-2 flex-wrap mb-6">
          {blog.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-elevated text-xs font-mono uppercase tracking-widest rounded-md text-accent">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-serif text-fg mb-6 leading-[1.1] tracking-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between py-6 border-y border-line">
          <div className="flex items-center gap-6 text-sm font-mono text-muted">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-accent" /> {blog.date}</span>
            <span className="flex items-center gap-2"><User size={16} className="text-accent" /> {blog.author}</span>
          </div>
          <Magnetic strength={0.3}>
            <button onClick={handleShare} className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors">
              <Share2 size={16} />
            </button>
          </Magnetic>
        </div>
      </div>

      <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />

    </article>
  );
}
