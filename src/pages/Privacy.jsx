import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl, privacyPath } from '../lib/content/urls.js';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

export default function Privacy() {
  const canonical = absoluteUrl(privacyPath());

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#privacy`,
    name: 'Privacy Policy — Abrar Akhunji',
    url: canonical,
    description: 'Privacy practices, data handling, and privacy commitments for visitors of abrarakhunji.com.',
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: canonical },
    ],
  }];

  return (
    <>
      <SEO
        title="Privacy Policy | Abrar Akhunji"
        description="Privacy practices, cookies, local storage, and data protection policies for abrarakhunji.com."
        path={privacyPath()}
        schema={schemas}
        keywords={['Privacy Policy', 'data protection', 'Abrar Akhunji']}
      />

      <main className="min-h-screen bg-canvas text-fg pt-28 pb-24 px-6 sm:px-10 max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
        </motion.div>

        <motion.header {...fadeUp} className="mb-14">
          <p className="text-xs uppercase tracking-widest text-accent font-mono mb-2">Data Protection</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-muted">Last updated: November 2026</p>
        </motion.header>

        <motion.div {...fadeUp} className="space-y-10 text-muted leading-relaxed text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <ShieldCheck size={20} className="text-accent" />
              <span>1. Overview &amp; Commitment</span>
            </h2>
            <p>
              Your privacy is respected. This site does not sell, rent, or trade your personal data. We do not use intrusive third-party cross-site ad tracking networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <Server size={20} className="text-accent" />
              <span>2. Information We Collect</span>
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-fg">Direct Inquiries:</strong> When you email us at <a href="mailto:abrar@abrarakhunji.com" className="text-accent hover:underline">abrar@abrarakhunji.com</a>, we retain your email address and message history solely to reply to your inquiry.</li>
              <li><strong className="text-fg">Server Logs:</strong> Standard web server access logs (IP address, user agent, requested URL, timestamp) are kept temporarily for security diagnostics and abuse prevention.</li>
              <li><strong className="text-fg">Local Storage:</strong> We store minimal preferences locally in your browser (such as your chosen light/dark color scheme) using browser <code className="text-xs font-mono">localStorage</code>. This data never leaves your device.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <EyeOff size={20} className="text-accent" />
              <span>3. Cookies &amp; Tracking</span>
            </h2>
            <p>
              This website does not deploy third-party advertising cookies or cross-site tracking pixels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <Lock size={20} className="text-accent" />
              <span>4. Data Retention &amp; Rights</span>
            </h2>
            <p>
              You have the right to request access to or deletion of any email correspondence you have sent us. To make a request, contact <a href="mailto:abrar@abrarakhunji.com" className="text-accent hover:underline">abrar@abrarakhunji.com</a>.
            </p>
          </section>
        </motion.div>

        {/* Footer Navigation */}
        <motion.footer {...fadeUp} className="border-t border-border mt-16 pt-8 flex flex-wrap gap-4 items-center text-sm text-muted">
          <Link to="/about/" className="hover:text-fg transition-colors">About</Link>
          <Link to="/contact/" className="hover:text-fg transition-colors">Contact</Link>
          <Link to="/terms/" className="hover:text-fg transition-colors">Terms of Service</Link>
          <Link to="/hire/" className="hover:text-fg transition-colors">Work with me</Link>
        </motion.footer>
      </main>
    </>
  );
}
