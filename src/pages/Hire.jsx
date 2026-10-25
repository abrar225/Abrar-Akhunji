import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowUpRight, Brain, Check, Eye, Globe, Layers, Mail, MapPin, Sparkles,
} from 'lucide-react';
import SEO from '../components/SEO';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../lib/useTheme';
import { soundFX } from '../lib/soundFX';
import { PERSON_ID, LOCATIONS, absoluteUrl, hirePath } from '../lib/content/urls.js';
import data from '../data/services.json';

const ICONS = { brain: Brain, eye: Eye, sparkles: Sparkles, layers: Layers };

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

export default function Hire() {
  const { theme, toggleTheme } = useTheme();
  const canonical = absoluteUrl(hirePath());

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${canonical}#service`,
    name: 'Abrar Akhunji — AI/ML & Full-Stack Engineering',
    url: canonical,
    description: data.intro,
    provider: { '@id': PERSON_ID },
    areaServed: LOCATIONS.map((city) => ({ '@type': 'City', name: city })),
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
    email: data.email,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering services',
      itemListElement: data.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.summary,
        },
      })),
    },
  }, {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'Work with me', item: canonical },
    ],
  }];

  return (
    <main className="min-h-dvh bg-canvas text-fg">
      <div className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 bg-canvas/80 backdrop-blur-xl border-b border-line/50">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Portfolio
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/blog/" className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors">
            The Neural Log
          </Link>
          <ThemeToggle theme={theme} toggleTheme={() => { soundFX.playToggle(); toggleTheme(); }} />
        </div>
      </div>

      <SEO
        title="Hire an AI/ML & Full-Stack Engineer in Ahmedabad | Abrar Akhunji"
        description="Hire Abrar Akhunji for AI/ML engineering, computer vision, LLM systems and full-stack product builds. Based in Ahmedabad, available in Gandhinagar, Bangalore and remotely."
        path={hirePath()}
        type="website"
        schema={schemas}
        keywords={[
          'hire AI engineer Ahmedabad',
          'computer vision engineer India',
          'LLM engineer Gandhinagar',
          'full-stack developer Bangalore',
          'AI consultant Ahmedabad',
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-28 pb-20">
        <motion.div {...fadeUp} className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent mb-5">Work with me</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-fg">
            {data.headline}
          </h1>
          <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl">{data.intro}</p>
          <p className="mt-4 text-sm text-fg/80 flex items-center gap-2">
            <span className="status-dot inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            {data.availability}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${data.email}?subject=Project%20enquiry`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-on-accent text-sm font-medium"
            >
              <Mail size={15} /> Start a conversation
            </a>
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line text-sm text-fg hover:border-accent transition-colors"
            >
              See selected work <ArrowUpRight size={15} />
            </Link>
          </div>
        </motion.div>

        <section className="mt-20" aria-labelledby="services-heading">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint mb-3">01 — Capabilities</p>
              <h2 id="services-heading" className="font-serif text-3xl md:text-4xl tracking-tight text-fg">What I build</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {data.services.map((service) => {
              const Icon = ICONS[service.icon] || Layers;
              return (
                <motion.article
                  key={service.id}
                  {...fadeUp}
                  className="rounded-2xl border border-line bg-surface p-6 md:p-7 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <Icon size={20} className="text-accent" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{service.id}</span>
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-fg">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{service.summary}</p>
                  <ul className="mt-5 space-y-2">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-fg/80 leading-relaxed">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-5 text-[11px] font-mono text-faint">{service.tech.join(' · ')}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="locations-heading">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint mb-3">02 — Coverage</p>
          <h2 id="locations-heading" className="font-serif text-3xl md:text-4xl tracking-tight text-fg">Where I work</h2>
          <p className="mt-3 text-muted text-sm max-w-2xl">
            Based in Ahmedabad. I work on-site with teams across Gujarat and travel for focused delivery in Bangalore, with remote collaboration everywhere else.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.locations.map((location) => (
              <div key={location.city} className="rounded-xl border border-line bg-surface p-5">
                <MapPin size={16} className="text-accent mb-4" />
                <h3 className="font-display text-lg text-fg tracking-tight">{location.city}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{location.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-faint flex items-center gap-2">
            <Globe size={13} /> Time zone: IST (UTC+5:30) · English, Hindi, Gujarati
          </p>
        </section>

        <section className="mt-20" aria-labelledby="process-heading">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint mb-3">03 — Process</p>
          <h2 id="process-heading" className="font-serif text-3xl md:text-4xl tracking-tight text-fg">How an engagement runs</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line">
            {data.process.map((step, index) => (
              <div key={step.title} className="bg-surface p-6">
                <p className="font-mono text-[10px] text-accent mb-4">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg text-fg tracking-tight">{step.title}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="engagements-heading">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint mb-3">04 — Engagements</p>
          <h2 id="engagements-heading" className="font-serif text-3xl md:text-4xl tracking-tight text-fg">Ways to work together</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-3">
            {data.engagements.map((item) => (
              <div key={item.title} className="rounded-xl border border-line bg-surface p-6">
                <h3 className="font-display text-lg text-fg tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="faq-heading">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint mb-3">05 — Questions</p>
          <h2 id="faq-heading" className="font-serif text-3xl md:text-4xl tracking-tight text-fg">Before you email</h2>
          <div className="mt-8 border-t border-line">
            {data.faq.map((item) => (
              <details key={item.question} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-fg font-medium">
                  {item.question}
                  <span className="text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm text-muted leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-line bg-surface p-8 md:p-10">
          <p className="font-serif italic text-accent text-lg mb-3">Have a problem worth building around?</p>
          <h2 className="font-display text-2xl md:text-3xl text-fg tracking-tight">Tell me what you are trying to ship.</h2>
          <p className="mt-3 text-sm text-muted max-w-xl">
            Send the problem, the team and the timeline. I reply within two working days.
          </p>
          <a
            href={`mailto:${data.email}?subject=Project%20enquiry`}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-on-accent text-sm font-medium break-all"
          >
            <Mail size={15} /> {data.email}
          </a>
        </section>
      </div>
    </main>
  );
}
