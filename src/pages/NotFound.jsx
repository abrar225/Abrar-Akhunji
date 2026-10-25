import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, PenLine, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-canvas text-fg flex flex-col">
      <SEO
        title="Page not found | Abrar Akhunji"
        description="That page does not exist. Head back to the portfolio, the Neural Log, or get in touch."
        path="/404/"
        noindex
      />

      <div className="flex-1 max-w-[900px] w-full mx-auto px-6 md:px-12 pt-28 pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent mb-5">Error 404</p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-fg max-w-2xl">
          This page slipped out of the index.
        </h1>
        <p className="mt-6 max-w-xl text-muted leading-relaxed">
          The URL is wrong, the page moved, or a link went stale. Nothing is broken on your side.
          Pick a route below and keep going.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <Link to="/" className="group rounded-xl border border-line bg-surface p-5 hover:border-accent/50 transition-colors">
            <ArrowLeft size={16} className="text-accent mb-4" />
            <p className="font-display text-fg tracking-tight">Portfolio</p>
            <p className="text-xs text-muted mt-1">Back to the front page</p>
          </Link>
          <Link to="/blog/" className="group rounded-xl border border-line bg-surface p-5 hover:border-accent/50 transition-colors">
            <PenLine size={16} className="text-accent mb-4" />
            <p className="font-display text-fg tracking-tight">The Neural Log</p>
            <p className="text-xs text-muted mt-1">AI and systems deep dives</p>
          </Link>
          <Link to="/hire/" className="group rounded-xl border border-line bg-surface p-5 hover:border-accent/50 transition-colors">
            <Compass size={16} className="text-accent mb-4" />
            <p className="font-display text-fg tracking-tight">Work with me</p>
            <p className="text-xs text-muted mt-1">Services, availability, contact</p>
          </Link>
        </div>

        <p className="mt-10 text-sm text-muted flex items-center gap-2">
          <Mail size={14} className="text-accent" />
          Still stuck? <a href="mailto:abrar@abrarakhunji.com" className="text-fg underline decoration-line underline-offset-4 hover:text-accent">abrar@abrarakhunji.com</a>
        </p>
      </div>
    </main>
  );
}
