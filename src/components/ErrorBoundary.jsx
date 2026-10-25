import React from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ui] render error', error, errorInfo);
  }

  reset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) {
      return this.props.fallback({ error: this.state.error, reset: this.reset });
    }

    return (
      <div className="min-h-dvh bg-canvas text-fg flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent mb-5">Unexpected error</p>
          <AlertTriangle size={28} className="text-accent mb-5" />
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-fg">
            Something broke on this page.
          </h1>
          <p className="mt-4 text-sm text-muted leading-relaxed">
            The interface hit an error it could not recover from. Reloading usually fixes it. If it keeps happening, email
            {' '}
            <a href="mailto:abrar@abrarakhunji.com" className="text-fg underline decoration-line underline-offset-4 hover:text-accent">
              abrar@abrarakhunji.com
            </a>
            .
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-on-accent text-sm font-medium"
            >
              <RefreshCw size={15} /> Reload
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line text-sm text-fg hover:border-accent transition-colors"
            >
              <ArrowLeft size={15} /> Back home
            </a>
          </div>

          {import.meta.env.DEV && this.state.error && (
            <details className="mt-8 text-xs text-muted">
              <summary className="cursor-pointer text-faint">Error details (development only)</summary>
              <pre className="mt-3 overflow-auto rounded-lg border border-line bg-surface p-4 text-[11px] leading-relaxed">
                {String(this.state.error?.stack || this.state.error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
