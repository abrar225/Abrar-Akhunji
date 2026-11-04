import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Scale, Bot, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl, termsPath } from '../lib/content/urls.js';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

export default function Terms() {
  const canonical = absoluteUrl(termsPath());

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#terms`,
    name: 'Terms of Service — Abrar Akhunji',
    url: canonical,
    description: 'Terms of service, agent access policies, content licensing, and legal disclosures for abrarakhunji.com.',
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: canonical },
    ],
  }];

  return (
    <>
      <SEO
        title="Terms of Service | Abrar Akhunji"
        description="Terms of service, automated agent access policy, and legal agreements for abrarakhunji.com."
        path={termsPath()}
        schema={schemas}
        keywords={['Terms of Service', 'legal terms', 'agent policy', 'Abrar Akhunji']}
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
          <p className="text-xs uppercase tracking-widest text-accent font-mono mb-2">Legal Terms</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-muted">Last updated: November 2026</p>
        </motion.header>

        <motion.div {...fadeUp} className="space-y-10 text-muted leading-relaxed text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <Scale size={20} className="text-accent" />
              <span>1. Agreement to Terms</span>
            </h2>
            <p>
              By accessing or using <strong className="text-fg">abrarakhunji.com</strong> (the “Site”), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue use of the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <Bot size={20} className="text-accent" />
              <span>2. Automated Agent Access &amp; Content Signals</span>
            </h2>
            <p>
              Automated AI agents, web crawlers, and retrieval systems are welcome to access this site under explicit conditions declared in our <code className="px-1.5 py-0.5 rounded bg-surface border border-border text-xs font-mono">robots.txt</code> and content headers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-fg">Search and Indexing:</strong> Permitted (<code className="text-xs font-mono">search=yes</code>). Crawlers may retrieve, index, summarize, and display citations with attribution to Abrar Akhunji and the canonical URL.</li>
              <li><strong className="text-fg">Model Training:</strong> Prohibited without written authorization (<code className="text-xs font-mono">ai-train=no</code>). Scraping this site for frontier foundation model pre-training is not permitted.</li>
              <li><strong className="text-fg">Machine-Readable Discovery:</strong> Agents are encouraged to fetch <Link to="/llms.txt" className="text-accent hover:underline">/llms.txt</Link>, <Link to="/llms-full.txt" className="text-accent hover:underline">/llms-full.txt</Link>, and our MCP Server Card at <code className="text-xs font-mono">/.well-known/mcp/server-card.json</code>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <FileText size={20} className="text-accent" />
              <span>3. Intellectual Property Rights</span>
            </h2>
            <p>
              All original content, including articles, architecture teardowns, software designs, code snippets, visual graphics, and branding on this Site, are the proprietary intellectual property of Abrar Akhunji, unless otherwise noted.
            </p>
            <p>
              Open-source software projects linked from this site (such as repositories on GitHub) are governed by their respective open-source licenses (e.g., MIT, Apache 2.0).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg flex items-center gap-2">
              <Shield size={20} className="text-accent" />
              <span>4. Disclaimer &amp; Limitation of Liability</span>
            </h2>
            <p>
              The content provided on this Site is for informational, educational, and professional showcase purposes only. While technical guides and benchmark measurements are verified with diligence, content is provided &ldquo;as is&rdquo; without warranties of any kind.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India, subject to the jurisdiction of the courts located in Ahmedabad, Gujarat, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display font-semibold text-fg">6. Contact &amp; Questions</h2>
            <p>
              For legal inquiries, licensing requests, or questions regarding these Terms, contact <a href="mailto:abrar@abrarakhunji.com" className="text-accent hover:underline">abrar@abrarakhunji.com</a> or visit our <Link to="/contact/" className="text-accent hover:underline">Contact page</Link>.
            </p>
          </section>
        </motion.div>

        {/* Footer Navigation */}
        <motion.footer {...fadeUp} className="border-t border-border mt-16 pt-8 flex flex-wrap gap-4 items-center text-sm text-muted">
          <Link to="/about/" className="hover:text-fg transition-colors">About</Link>
          <Link to="/contact/" className="hover:text-fg transition-colors">Contact</Link>
          <Link to="/privacy/" className="hover:text-fg transition-colors">Privacy Policy</Link>
          <Link to="/hire/" className="hover:text-fg transition-colors">Work with me</Link>
        </motion.footer>
      </main>
    </>
  );
}
