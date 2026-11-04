import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { PERSON_ID, ORGANIZATION_ID, absoluteUrl, contactPath, SOCIAL_LINKS } from '../lib/content/urls.js';
import services from '../data/services.json';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

export default function Contact() {
  const canonical = absoluteUrl(contactPath());

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${canonical}#contact`,
    name: 'Contact Abrar Akhunji — Engineering & Inquiries',
    url: canonical,
    description: 'Get in touch with Abrar Akhunji for AI/ML engineering, consulting, full-stack systems and technical partnerships.',
    mainEntity: { '@id': PERSON_ID },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: canonical },
    ],
  }];

  return (
    <>
      <SEO
        title="Contact Abrar Akhunji | AI & Full-Stack Engineer"
        description="Contact Abrar Akhunji for AI/ML engineering engagements, full-stack contracts, technical architecture reviews, or full-time roles."
        path={contactPath()}
        schema={schemas}
        keywords={['Contact Abrar Akhunji', 'hire AI engineer', 'contact ML consultant Ahmedabad']}
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
          <p className="text-xs uppercase tracking-widest text-accent font-mono mb-2">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
            Contact &amp; Collaboration
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed font-light">
            I work directly with technical founders, engineering teams, and product leaders to build
            AI systems, computer vision models, and production web applications.
          </p>
        </motion.header>

        {/* Primary Contact Channels */}
        <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-border bg-surface/30 flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-accent/10 text-accent inline-block mb-4">
                <Mail size={24} />
              </div>
              <h2 className="text-lg font-semibold text-fg">Direct Email</h2>
              <p className="text-sm text-muted mt-1 mb-4">
                The fastest way to reach me for projects, technical questions, and proposals.
              </p>
            </div>
            <a
              href={`mailto:${services.email}`}
              className="text-base font-mono text-accent hover:underline flex items-center gap-2 font-medium"
            >
              <span>{services.email}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface/30 flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-accent/10 text-accent inline-block mb-4">
                <Clock size={24} />
              </div>
              <h2 className="text-lg font-semibold text-fg">Response SLA &amp; Hours</h2>
              <p className="text-sm text-muted mt-1">
                Typically respond within 24 business hours. Active across Indian Standard Time (IST, UTC+5:30) with regular overlap for EU and US-East collaborators.
              </p>
            </div>
            <span className="text-xs font-mono text-muted uppercase tracking-wider mt-4">
              Status: {services.availability.slice(0, 36)}...
            </span>
          </div>
        </motion.div>

        {/* Locations */}
        <motion.section {...fadeUp} className="mb-16 border-t border-border pt-12">
          <h2 className="text-2xl font-display font-semibold text-fg mb-6 flex items-center gap-2">
            <MapPin size={22} className="text-accent" />
            <span>Locations Served</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.locations.map((loc, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-surface/20">
                <h3 className="text-sm font-semibold text-fg">{loc.city}</h3>
                <p className="text-xs text-muted mt-1">{loc.note}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* External Profiles */}
        <motion.section {...fadeUp} className="mb-16 border-t border-border pt-12">
          <h2 className="text-2xl font-display font-semibold text-fg mb-6 flex items-center gap-2">
            <MessageSquare size={22} className="text-accent" />
            <span>Verified Public Channels</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/abrar225"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface/50 transition-colors inline-flex items-center gap-2"
            >
              <span>GitHub (@abrar225)</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/abrar-akhunji/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface/50 transition-colors inline-flex items-center gap-2"
            >
              <span>LinkedIn (Abrar Akhunji)</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://x.com/Abrarakhunji"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface/50 transition-colors inline-flex items-center gap-2"
            >
              <span>X (@Abrarakhunji)</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://huggingface.co/abrar225"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface/50 transition-colors inline-flex items-center gap-2"
            >
              <span>Hugging Face</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.section>

        {/* Footer Navigation */}
        <motion.footer {...fadeUp} className="border-t border-border pt-8 flex flex-wrap gap-4 items-center text-sm text-muted">
          <Link to="/about/" className="hover:text-fg transition-colors">About</Link>
          <Link to="/hire/" className="hover:text-fg transition-colors">Services &amp; Pricing</Link>
          <Link to="/work/" className="hover:text-fg transition-colors">Selected Work</Link>
          <Link to="/terms/" className="hover:text-fg transition-colors">Terms of Service</Link>
          <Link to="/privacy/" className="hover:text-fg transition-colors">Privacy Policy</Link>
        </motion.footer>
      </main>
    </>
  );
}
