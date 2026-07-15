import { Link } from 'react-router-dom';
import { getAllBlogs } from '../lib/blogUtils';
import SEO from '../components/SEO';
import SectionWrapper from '../components/SectionWrapper';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Magnetic from '../components/Magnetic';

export default function BlogList() {
  const blogs = getAllBlogs();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Abrar Akhunji's Tech & AI Blog",
    "url": "https://abrar225.github.io/Abrar-Akhunji/blog",
    "description": "Deep dives into new AI technologies and IT sector news, explained simply.",
    "author": {
      "@type": "Person",
      "name": "Abrar Akhunji"
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 max-w-[1000px] mx-auto px-6 md:px-12">
      <SEO 
        title="Blog | Abrar Akhunji" 
        description="Deep dives into new AI technologies and IT sector news, explained simply." 
        url="/blog"
        schema={schema}
      />

      <div className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-fg mb-4">The Neural <span className="text-accent">Log.</span></h1>
          <p className="text-muted text-sm md:text-base max-w-xl">
            Breaking down the latest in AI, Machine Learning, and Software Engineering into simple, actionable insights.
          </p>
        </div>
        <Magnetic strength={0.2}>
          <Link to="/" className="hidden md:flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </Magnetic>
      </div>

      <div className="space-y-6">
        {blogs.length === 0 ? (
          <div className="p-8 border border-line border-dashed rounded-xl text-center text-muted">
            No posts yet. The first one is dropping soon!
          </div>
        ) : (
          blogs.map((blog, i) => (
            <SectionWrapper key={blog.slug} delay={i * 0.1} className="block group">
              <Link to={`/blog/${blog.slug}`} className="block p-6 rounded-2xl border border-line bg-surface hover:border-accent/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-faint">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {blog.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-elevated text-[10px] uppercase tracking-widest rounded-md text-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-2xl font-medium text-fg mb-3 group-hover:text-accent transition-colors tracking-tight">
                  {blog.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed line-clamp-2">
                  {blog.description}
                </p>
              </Link>
            </SectionWrapper>
          ))
        )}
      </div>

      <div className="mt-12 flex md:hidden">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
