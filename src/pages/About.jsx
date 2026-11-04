import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, GraduationCap, MapPin, Code2, Terminal, Briefcase, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { PERSON_ID, ORGANIZATION_ID, absoluteUrl, aboutPath } from '../lib/content/urls.js';
import portfolio from '../data/portfolio.json';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

export default function About() {
  const canonical = absoluteUrl(aboutPath());

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${canonical}#about`,
    name: 'About Abrar Akhunji — AI/ML & Full-Stack Engineer',
    url: canonical,
    description: 'Background, engineering philosophy, education and technical journey of Abrar Akhunji, an AI and full-stack engineer in Ahmedabad, India.',
    mainEntity: { '@id': PERSON_ID },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: canonical },
    ],
  }];

  return (
    <>
      <SEO
        title="About Abrar Akhunji | AI & Full-Stack Engineer"
        description="Learn about Abrar Akhunji, an AI/ML and full-stack software engineer based in Ahmedabad, India. Background, education, philosophy and technical expertise."
        path={aboutPath()}
        schema={schemas}
        keywords={['About Abrar Akhunji', 'AI engineer Ahmedabad', 'ML developer India', 'software engineer biography']}
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
          <p className="text-xs uppercase tracking-widest text-accent font-mono mb-2">About the Engineer</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
            Abrar Akhunji
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed font-light">
            AI/ML and full-stack software engineer based in Ahmedabad, Gujarat, India.
            Focused on bridging model research, system engineering, and production interfaces that run reliably.
          </p>
        </motion.header>

        {/* Quick Facts Grid */}
        <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <div className="p-5 rounded-xl border border-border bg-surface/40 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
              <MapPin size={20} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-fg">Location &amp; Hub</h2>
              <p className="text-sm text-muted mt-1">Ahmedabad, Gujarat, India. Collaborating across Gandhinagar, Bangalore and globally remote.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-surface/40 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-fg">Specialization</h2>
              <p className="text-sm text-muted mt-1">Computer vision, local model inference (MLX, Whisper, vLLM), autonomous coding agents, and high-throughput web backends.</p>
            </div>
          </div>
        </motion.div>

        {/* Narrative Section */}
        <motion.section {...fadeUp} className="space-y-6 text-base text-muted leading-relaxed mb-16 border-t border-border pt-12">
          <h2 className="text-2xl font-display font-semibold text-fg">The Journey</h2>
          <p>
            I began building software to eliminate manual frictions. From developing end-to-end full-stack architectures
            to training deep learning models, my work centers on making software genuinely usable, resilient, and fast.
          </p>
          <p>
            My recent work explores local AI execution, autonomous developer toolchains, and deep-dive technical writing
            on model inference architectures such as Multi-Head Latent Attention (MLA), KV-cache optimization, and speculative decoding.
          </p>
        </motion.section>

        {/* Experience Section */}
        <motion.section {...fadeUp} className="mb-16 border-t border-border pt-12">
          <h2 className="text-2xl font-display font-semibold text-fg mb-6 flex items-center gap-2">
            <Briefcase size={22} className="text-accent" />
            <span>Experience &amp; Milestones</span>
          </h2>
          <div className="space-y-6">
            {portfolio.experience.map((exp, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-border bg-surface/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-base font-semibold text-fg">{exp.role}</h3>
                  <span className="text-xs font-mono text-muted">{exp.date}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education & Credentials */}
        <motion.section {...fadeUp} className="mb-16 border-t border-border pt-12">
          <h2 className="text-2xl font-display font-semibold text-fg mb-6 flex items-center gap-2">
            <GraduationCap size={22} className="text-accent" />
            <span>Education &amp; Credentials</span>
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-border bg-surface/20">
              <h3 className="text-base font-semibold text-fg">Bachelor of Engineering in Information Technology</h3>
              <p className="text-sm text-muted mt-1">Kalol Institute of Technology &amp; Research Center (KITRC)</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-surface/20">
              <h3 className="text-base font-semibold text-fg">Diploma in Information Technology</h3>
              <p className="text-sm text-muted mt-1">Government Polytechnic, Himmatnagar</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-surface/20">
              <h3 className="text-base font-semibold text-fg">Google Cybersecurity Professional Certificate</h3>
              <p className="text-sm text-muted mt-1">Network security, Python automation, Linux defense, and incident response.</p>
            </div>
          </div>
        </motion.section>

        {/* Connect & Legal Footer Navigation */}
        <motion.section {...fadeUp} className="border-t border-border pt-12">
          <h2 className="text-2xl font-display font-semibold text-fg mb-4">Get in Touch</h2>
          <p className="text-muted mb-6">
            Have a project, role, or technical problem in mind? Reach out directly.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/contact/"
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-contrast font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <Mail size={16} />
              <span>Contact me</span>
            </Link>
            <Link
              to="/hire/"
              className="px-5 py-2.5 rounded-lg border border-border hover:bg-surface/50 text-fg transition-colors"
            >
              Services &amp; Availability
            </Link>
            <Link
              to="/terms/"
              className="px-4 py-2 text-sm text-muted hover:text-fg transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy/"
              className="px-4 py-2 text-sm text-muted hover:text-fg transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  );
}
