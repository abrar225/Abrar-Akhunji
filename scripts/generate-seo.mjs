#!/usr/bin/env node
/**
 * Static SEO/AEO layer for the Vite build.
 *
 * - One canonical URL shape, always with a trailing slash.
 * - Per-post semantic HTML for crawlers and no-JS visitors.
 * - Person + WebSite entities are shared; page-only schemas are stripped.
 * - Legacy date-prefixed URLs are 301-redirected in .htaccess, not duplicated
 *   as hundreds of redirect pages.
 * - Generates sitemap.xml, RSS, llms.txt and llms-full.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';
import {
  parseFrontmatter,
  parseContentBlocks,
  normalizeSlug,
  calculateReadingTime,
} from '../src/lib/content/frontmatter.js';
import { markdownToHtml } from '../src/lib/content/markdown.js';
import {
  SITE_URL,
  SITE_NAME,
  AUTHOR_ROLE,
  BLOG_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  PERSON_ID,
  WEBSITE_ID,
  LOCATIONS,
  postPath,
  postUrl,
  absoluteUrl,
  blogPath,
  hirePath,
} from '../src/lib/content/urls.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const blogDir = path.join(root, 'src/content/blogs');
const indexPath = path.join(distDir, 'index.html');
const portfolio = JSON.parse(fs.readFileSync(path.join(root, 'src/data/portfolio.json'), 'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(root, 'src/data/services.json'), 'utf8'));
const today = new Date().toISOString().slice(0, 10);

const BLOG_DESCRIPTION = 'Deep dives into AI systems, inference engineering, model architecture and production software, explained with the engineering detail that matters.';

if (!fs.existsSync(indexPath)) {
  console.error('Run `vite build` before generating the static SEO layer.');
  process.exit(1);
}

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const escapeXml = escapeHtml;
const decodeHtml = (value = '') => String(value)
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');

function writePage(relativeDir, html) {
  const dir = path.join(distDir, relativeDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`✓ /${relativeDir ? `${relativeDir}/` : ''}`);
}

function writeFile(relativePath, content) {
  const target = path.join(distDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}

function readPosts() {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md')).sort();
  const posts = files.map((file) => {
    const fileSlug = file.replace(/\.md$/, '');
    const slug = normalizeSlug(fileSlug);
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    const { sections, errors } = parseContentBlocks(content);
    if (errors.length > 0) {
      throw new Error(`${file}: ${errors.join('; ')}`);
    }
    if (!data.title || !data.date || !data.description) {
      throw new Error(`${file}: title, date and description are required`);
    }

    const text = sections
      .filter((section) => section.type !== 'interactive')
      .map((section) => section.content || '')
      .join(' ');
    const heroImage = data.heroImage ? String(data.heroImage) : null;

    return {
      slug,
      legacySlug: fileSlug,
      sourceFile: file,
      title: String(data.title),
      date: String(data.date),
      updated: String(data.updated || data.date),
      description: String(data.description),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      author: String(data.author || 'Abrar Akhunji'),
      heroImage,
      heroImageUrl: heroImage
        ? (/^https?:\/\//.test(heroImage) ? heroImage : `${SITE_URL}${heroImage}`)
        : DEFAULT_OG_IMAGE,
      techTree: data.techTree || null,
      faq: Array.isArray(data.faq) ? data.faq : null,
      sections,
      content,
      readingTime: calculateReadingTime(text),
      wordCount: text.split(/\s+/).filter(Boolean).length,
    };
  });

  return posts.sort((a, b) => {
    const byDate = new Date(b.date) - new Date(a.date);
    return byDate || a.slug.localeCompare(b.slug);
  });
}

function cleanBaseHtml(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<link\s+rel="alternate"[^>]*>/gi, '')
    .replace(/<meta\s+name="(title|description|keywords|robots|googlebot|bingbot|author)"[^>]*>/gi, '')
    .replace(/<meta\s+property="(og:[^"]+|article:[^"]+)"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, '')
    .replace(/<script\b[^>]*data-page-only[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
}

function headTags({
  title,
  description,
  pagePath,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  publishedTime,
  modifiedTime,
  keywords = [],
  schema = [],
  articleSection,
}) {
  const canonical = absoluteUrl(pagePath);
  const imageUrl = /^https?:\/\//.test(image) ? image : `${SITE_URL}${image}`;
  const isDefaultImage = imageUrl === DEFAULT_OG_IMAGE;

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeHtml(title)}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />
    <meta name="author" content="Abrar Akhunji" />
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1" />

    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${imageUrl}" />
    ${isDefaultImage ? '<meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />' : ''}
    <meta property="og:image:alt" content="${escapeHtml(imageAlt || title)}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Abrarakhunji" />
    <meta name="twitter:creator" content="@Abrarakhunji" />
    <meta name="twitter:url" content="${canonical}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt || title)}" />

    ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}" />` : ''}
    ${modifiedTime ? `<meta property="article:modified_time" content="${modifiedTime}" />` : ''}
    ${articleSection ? `<meta property="article:section" content="${escapeHtml(articleSection)}" />` : ''}
    ${keywords.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`).join('\n    ')}
    <link rel="alternate" type="application/rss+xml" title="${BLOG_NAME} — Abrar Akhunji" href="/feed.xml" />
    <link rel="alternate" type="text/markdown" title="AI summary" href="/llms.txt" />
    <link rel="alternate" type="text/markdown" title="Full AI knowledge base" href="/llms-full.txt" />

    ${schema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n    ')}
  `;
}

function renderMath(html) {
  return html.replace(
    /<span class="math-slot" data-display="([01])" data-tex="([^"]*)"><\/span>/g,
    (match, display, encodedTex) => {
      const tex = decodeHtml(encodedTex);
      try {
        return katex.renderToString(tex, {
          displayMode: display === '1',
          throwOnError: false,
          strict: false,
          output: 'mathml',
        });
      } catch {
        return `<code>${escapeHtml(tex)}</code>`;
      }
    }
  );
}

function renderWidget(section) {
  const { widgetType, config } = section;
  if (widgetType === 'chart' && Array.isArray(config.data)) {
    const xKey = config.xKey || 'metric';
    const series = Array.isArray(config.series) ? config.series : [];
    return `
      <figure class="data-table-fallback" aria-label="${escapeHtml(config.title || 'Data comparison')}">
        ${config.title ? `<h3>${escapeHtml(config.title)}</h3>` : ''}
        ${config.description ? `<p>${escapeHtml(config.description)}</p>` : ''}
        <div class="table-wrap"><table border="1" cellpadding="6" cellspacing="0">
          <thead><tr><th>${escapeHtml(xKey)}</th>${series.map((item) => `<th>${escapeHtml(item.name || item.dataKey)}</th>`).join('')}</tr></thead>
          <tbody>
            ${config.data.map((row) => `<tr><td><strong>${escapeHtml(row[xKey] ?? '')}</strong></td>${series.map((item) => `<td>${escapeHtml(row[item.dataKey] ?? '')}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table></div>
      </figure>`;
  }

  if (widgetType === 'concept' && Array.isArray(config.steps)) {
    return `
      <div class="concept-breakdown-fallback">
        ${config.title ? `<h3>${escapeHtml(config.title)}</h3>` : ''}
        <ol>${config.steps.map((step) => `<li><strong>${escapeHtml(step.title || step.label || '')}</strong>: ${escapeHtml(step.content || '')}</li>`).join('')}</ol>
      </div>`;
  }

  return '';
}

function renderSections(sections) {
  return sections.map((section) => {
    if (section.type === 'neutral') {
      return renderMath(markdownToHtml(section.content));
    }
    if (section.type === 'eli5') {
      return `<section class="section-eli5" aria-label="Simplified overview"><h2>Simplified overview</h2>${renderMath(markdownToHtml(section.content))}</section>`;
    }
    if (section.type === 'dev') {
      return `<section class="section-dev" aria-label="Technical breakdown"><h2>Technical breakdown</h2>${renderMath(markdownToHtml(section.content))}</section>`;
    }
    if (section.type === 'interactive') {
      return renderWidget(section);
    }
    return '';
  }).join('\n');
}

function renderFaq(faq) {
  if (!Array.isArray(faq) || faq.length === 0) return '';
  return `
    <section class="article-faq-section" aria-label="Frequently asked questions">
      <h2>Frequently asked questions</h2>
      <dl>
        ${faq.map((item) => `
          <div style="margin-bottom:1.5rem;">
            <dt><strong>${escapeHtml(item.question)}</strong></dt>
            <dd style="margin-top:0.5rem;color:#9AA7B8;">${escapeHtml(item.answer)}</dd>
          </div>`).join('')}
      </dl>
    </section>`;
}

function renderArticle(post) {
  const canonical = postUrl(post.slug);
  return `
    <article class="pre-rendered-blog" style="max-width:900px;margin:0 auto;padding:2rem 1.5rem;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.7;color:#E8EEF6;">
      <nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1.5rem;">
        <a href="/" style="color:#79D0E0;">Home</a> &gt;
        <a href="/blog/" style="color:#79D0E0;">${escapeHtml(BLOG_NAME)}</a> &gt;
        <span>${escapeHtml(post.title)}</span>
      </nav>
      <header style="margin-bottom:2.5rem;">
        <h1 style="font-size:2.25rem;line-height:1.2;margin:0 0 1rem;">${escapeHtml(post.title)}</h1>
        <div style="font-size:0.875rem;color:#9AA7B8;margin-bottom:1.5rem;">
          By <strong>${escapeHtml(post.author)}</strong> &bull;
          <time datetime="${post.date}">${post.date}</time> &bull;
          <span>${post.readingTime} min read</span>
        </div>
        ${post.heroImageUrl ? `<figure style="margin:1.5rem 0;"><img src="${escapeHtml(post.heroImageUrl)}" alt="${escapeHtml(post.title)}" style="max-width:100%;height:auto;border-radius:12px;" loading="eager" fetchpriority="high" /></figure>` : ''}
        <p style="font-size:1.125rem;color:#B8C4D4;font-style:italic;">${escapeHtml(post.description)}</p>
      </header>
      <div class="article-body">${renderSections(post.sections)}</div>
      ${renderFaq(post.faq)}
      <footer style="margin-top:4rem;padding-top:2rem;border-top:1px solid #283446;">
        <h2 style="font-size:1.25rem;">About the author</h2>
        <p><strong>${escapeHtml(post.author)}</strong> is an ${AUTHOR_ROLE} based in Ahmedabad, working with teams in Gandhinagar, Bangalore and remotely. <a href="/hire/" style="color:#79D0E0;">Services and availability</a>.</p>
        <p style="font-size:0.875rem;color:#9AA7B8;">Canonical URL: <a href="${canonical}" style="color:#79D0E0;">${canonical}</a></p>
      </footer>
    </article>`;
}

function buildArticleSchemas(post) {
  const canonical = postUrl(post.slug);
  const schemas = [{
    '@context': 'https://schema.org',
    '@type': ['TechArticle', 'BlogPosting'],
    '@id': `${canonical}#article`,
    headline: post.title,
    description: post.description,
    image: post.heroImageUrl,
    inLanguage: 'en-IN',
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    datePublished: post.date,
    dateModified: post.updated,
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
    keywords: post.tags.join(', '),
    articleSection: post.techTree?.branch || 'Artificial Intelligence',
    isAccessibleForFree: true,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p'],
    },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: BLOG_NAME, item: absoluteUrl(blogPath()) },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  }];

  if (Array.isArray(post.faq) && post.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return schemas;
}

function renderBlogList(posts) {
  const latest = posts[0];
  return `
    <main class="pre-rendered-blog" style="max-width:900px;margin:0 auto;padding:3rem 1.5rem;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#E8EEF6;">
      <nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1.5rem;">
        <a href="/" style="color:#79D0E0;">Home</a> &gt; <span>${escapeHtml(BLOG_NAME)}</span>
      </nav>
      <header style="margin-bottom:3rem;">
        <h1 style="font-size:2.5rem;margin:0 0 0.75rem;">${escapeHtml(BLOG_NAME)}</h1>
        <p style="font-size:1.125rem;color:#9AA7B8;max-width:700px;">${escapeHtml(BLOG_DESCRIPTION)}</p>
        <p style="font-size:0.875rem;color:#6E7C90;">By ${escapeHtml(SITE_NAME)} &bull; Last updated ${latest ? latest.updated : today}</p>
      </header>
      <section>
        <ul style="list-style:none;padding:0;">
          ${posts.map((post) => `
            <li style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #283446;">
              <time datetime="${post.date}" style="font-size:0.875rem;color:#79D0E0;display:block;margin-bottom:0.25rem;">${post.date}</time>
              <h2 style="font-size:1.5rem;margin:0 0 0.5rem;"><a href="${postPath(post.slug)}" style="text-decoration:none;color:#E8EEF6;">${escapeHtml(post.title)}</a></h2>
              <p style="color:#9AA7B8;margin:0 0 0.75rem;">${escapeHtml(post.description)}</p>
              <div style="font-size:0.75rem;color:#6E7C90;">${post.tags.map((tag) => `<span style="display:inline-block;margin-right:0.5rem;">#${escapeHtml(tag)}</span>`).join('')}</div>
            </li>`).join('')}
        </ul>
      </section>
      <section style="margin-top:3rem;padding-top:2rem;border-top:1px solid #283446;">
        <h2 style="font-size:1.25rem;">Work with me</h2>
        <p style="color:#9AA7B8;">AI/ML engineering, computer vision, LLM systems and full-stack product builds in Ahmedabad, Gandhinagar, Bangalore and remotely.</p>
        <p><a href="/hire/" style="color:#79D0E0;">Services and availability →</a></p>
      </section>
    </main>`;
}

function buildBlogListSchemas(posts) {
  return [{
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${absoluteUrl(blogPath())}#blog`,
    name: BLOG_NAME,
    url: absoluteUrl(blogPath()),
    description: BLOG_DESCRIPTION,
    inLanguage: 'en-IN',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: postUrl(post.slug),
      datePublished: post.date,
      dateModified: post.updated,
      description: post.description,
    })),
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: BLOG_NAME, item: absoluteUrl(blogPath()) },
    ],
  }];
}

function renderHire() {
  return `
    <main class="pre-rendered-blog" style="max-width:1000px;margin:0 auto;padding:3rem 1.5rem;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#E8EEF6;">
      <nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1.5rem;">
        <a href="/" style="color:#79D0E0;">Home</a> &gt; <span>Work with me</span>
      </nav>
      <header style="margin-bottom:3rem;">
        <h1 style="font-size:2.5rem;margin:0 0 1rem;">${escapeHtml(services.headline)}</h1>
        <p style="font-size:1.125rem;color:#B8C4D4;max-width:760px;">${escapeHtml(services.intro)}</p>
        <p style="color:#79D0E0;">${escapeHtml(services.availability)}</p>
      </header>
      <section>
        <h2>Engineering services</h2>
        ${services.services.map((service) => `
          <article style="margin-bottom:1.75rem;">
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.summary)}</p>
            <ul>${service.outcomes.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            <p style="font-size:0.875rem;color:#9AA7B8;">${escapeHtml(service.tech.join(' · '))}</p>
          </article>`).join('')}
      </section>
      <section>
        <h2>Locations</h2>
        <ul>${services.locations.map((location) => `<li><strong>${escapeHtml(location.city)}</strong> — ${escapeHtml(location.note)}</li>`).join('')}</ul>
      </section>
      <section>
        <h2>How an engagement runs</h2>
        <ol>${services.process.map((step) => `<li><strong>${escapeHtml(step.title)}</strong> — ${escapeHtml(step.description)}</li>`).join('')}</ol>
      </section>
      <section>
        <h2>Ways to work together</h2>
        <ul>${services.engagements.map((item) => `<li><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.description)}</li>`).join('')}</ul>
      </section>
      <section>
        <h2>Questions</h2>
        ${services.faq.map((item) => `<div style="margin-bottom:1.5rem;"><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></div>`).join('')}
      </section>
      <footer style="margin-top:3rem;padding-top:2rem;border-top:1px solid #283446;">
        <h2>Start a conversation</h2>
        <p>Email <a href="mailto:${escapeHtml(services.email)}" style="color:#79D0E0;">${escapeHtml(services.email)}</a> with the problem, the team and the timeline.</p>
      </footer>
    </main>`;
}

function buildHireSchemas() {
  const canonical = absoluteUrl(hirePath());
  return [{
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${canonical}#service`,
    name: `${SITE_NAME} — AI/ML & Full-Stack Engineering`,
    url: canonical,
    description: services.intro,
    provider: { '@id': PERSON_ID },
    areaServed: LOCATIONS.map((city) => ({ '@type': 'City', name: city })),
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
    email: services.email,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering services',
      itemListElement: services.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.summary },
      })),
    },
  }, {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: services.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Work with me', item: canonical },
    ],
  }];
}

function renderHome(posts) {
  const featured = portfolio.projects.slice(0, 6);
  return `
    <main class="pre-rendered-portfolio" style="max-width:1050px;margin:0 auto;padding:3rem 1.5rem;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.7;color:#E8EEF6;background:#070B12;">
      <header style="margin-bottom:3rem;border-bottom:1px solid #283446;padding-bottom:2.5rem;">
        <h1 style="font-size:2.75rem;line-height:1.2;margin:0 0 0.5rem;color:#F9FAFB;letter-spacing:-0.02em;">Abrar Akhunji</h1>
        <p style="font-size:1.35rem;color:#79D0E0;margin:0 0 0.75rem;font-weight:600;">AI/ML &amp; Full-Stack Engineer in Ahmedabad</p>
        <p style="font-size:1.05rem;color:#B8C4D4;max-width:850px;margin:0 0 0.75rem;">${escapeHtml(DEFAULT_DESCRIPTION)}</p>
        <p style="color:#9AA7B8;margin:0 0 1.5rem;">Available in ${LOCATIONS.slice(0, 3).join(', ')} and remotely.</p>
        <nav aria-label="Quick links" style="display:flex;gap:1.25rem;flex-wrap:wrap;font-size:0.95rem;">
          <a href="#services" style="color:#79D0E0;">Services ↓</a>
          <a href="#work" style="color:#79D0E0;">Selected work ↓</a>
          <a href="#experience" style="color:#79D0E0;">Experience ↓</a>
          <a href="/blog/" style="color:#79D0E0;">${escapeHtml(BLOG_NAME)} →</a>
          <a href="/hire/" style="color:#79D0E0;">Hire →</a>
          <a href="mailto:${escapeHtml(services.email)}" style="color:#79D0E0;">${escapeHtml(services.email)}</a>
        </nav>
      </header>

      <section id="services" style="margin-bottom:3.5rem;">
        <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #283446;padding-bottom:0.75rem;">Services</h2>
        ${services.services.map((service) => `
          <article style="margin-bottom:1.5rem;">
            <h3 style="font-size:1.25rem;margin:0 0 0.35rem;">${escapeHtml(service.title)}</h3>
            <p style="color:#B8C4D4;margin:0;">${escapeHtml(service.summary)}</p>
          </article>`).join('')}
        <p><a href="/hire/" style="color:#79D0E0;">Full service list, process and availability →</a></p>
      </section>

      <section id="work" style="margin-bottom:3.5rem;">
        <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #283446;padding-bottom:0.75rem;">Selected work</h2>
        ${featured.map((project) => `
          <article style="margin-bottom:2rem;">
            <h3 style="font-size:1.4rem;margin:0 0 0.35rem;">${escapeHtml(project.title)} <span style="font-weight:400;color:#79D0E0;font-size:0.9rem;">${escapeHtml(project.category)} · ${escapeHtml(project.year)}</span></h3>
            <p style="color:#B8C4D4;">${escapeHtml(project.description)}</p>
            <p style="font-size:0.9rem;color:#9AA7B8;">Stack: ${escapeHtml(project.tech.join(', '))}</p>
            <p style="font-size:0.9rem;"><a href="${escapeHtml(project.github)}" style="color:#79D0E0;">GitHub</a>${project.demo ? ` &bull; <a href="${escapeHtml(project.demo)}" style="color:#79D0E0;">Live demo</a>` : ''}</p>
          </article>`).join('')}
      </section>

      <section id="experience" style="margin-bottom:3.5rem;">
        <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #283446;padding-bottom:0.75rem;">Experience &amp; education</h2>
        <ul>
          ${portfolio.experience.map((job) => `<li style="margin-bottom:1rem;"><strong>${escapeHtml(job.role)}</strong> — ${escapeHtml(job.date)}. ${escapeHtml(job.desc)}</li>`).join('')}
        </ul>
        <ul>
          ${portfolio.education.map((edu) => `<li style="margin-bottom:0.75rem;"><strong>${escapeHtml(edu.degree)}</strong> — ${escapeHtml(edu.school)} (${escapeHtml(edu.date)})</li>`).join('')}
        </ul>
      </section>

      <section style="margin-bottom:3.5rem;">
        <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #283446;padding-bottom:0.75rem;">Skills</h2>
        <ul>${portfolio.skills.map((skill) => `<li><strong>${escapeHtml(skill.t)}:</strong> ${escapeHtml(skill.d)}</li>`).join('')}</ul>
      </section>

      <section style="margin-bottom:3.5rem;">
        <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #283446;padding-bottom:0.75rem;">Recognition</h2>
        <ul>${portfolio.certifications.map((item) => `<li><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.desc)}</li>`).join('')}</ul>
      </section>

      <section style="margin-bottom:3.5rem;">
        <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #283446;padding-bottom:0.75rem;">Latest from ${escapeHtml(BLOG_NAME)}</h2>
        <ul>${posts.slice(0, 6).map((post) => `<li style="margin-bottom:0.75rem;"><a href="${postPath(post.slug)}" style="color:#79D0E0;">${escapeHtml(post.title)}</a> <span style="color:#6E7C90;">(${post.date})</span></li>`).join('')}</ul>
        <p><a href="/blog/" style="color:#79D0E0;">All engineering notes →</a></p>
      </section>

      <footer id="contact" style="border-top:1px solid #283446;padding-top:2.5rem;color:#9AA7B8;">
        <h2 style="font-size:1.5rem;color:#F9FAFB;margin:0 0 1rem;">Contact</h2>
        <p>Email: <a href="mailto:${escapeHtml(services.email)}" style="color:#79D0E0;">${escapeHtml(services.email)}</a> &bull;
          GitHub: <a href="https://github.com/abrar225" style="color:#79D0E0;">github.com/abrar225</a> &bull;
          LinkedIn: <a href="https://www.linkedin.com/in/abrar-akhunji/" style="color:#79D0E0;">linkedin.com/in/abrar-akhunji</a> &bull;
          X: <a href="https://x.com/Abrarakhunji" style="color:#79D0E0;">@Abrarakhunji</a>
        </p>
        <p style="font-size:0.875rem;">Machine-readable: <a href="/llms.txt" style="color:#79D0E0;">/llms.txt</a> &bull; <a href="/llms-full.txt" style="color:#79D0E0;">/llms-full.txt</a> &bull; <a href="/feed.xml" style="color:#79D0E0;">RSS</a> &bull; <a href="/sitemap.xml" style="color:#79D0E0;">Sitemap</a></p>
        <p style="font-size:0.8rem;color:#6E7C90;">&copy; ${new Date().getFullYear()} Abrar Akhunji. All rights reserved.</p>
      </footer>
    </main>`;
}

function renderFeed(posts) {
  const items = posts.slice(0, 25);
  const lastBuild = items[0]?.updated || today;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(BLOG_NAME)} — ${escapeXml(SITE_NAME)}</title>
    <link>${absoluteUrl(blogPath())}</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>abrar@abrarakhunji.com (${escapeXml(SITE_NAME)})</managingEditor>
    <webMaster>abrar@abrarakhunji.com (${escapeXml(SITE_NAME)})</webMaster>
    ${items.map((post) => {
      const url = postUrl(post.slug);
      const html = renderSections(post.sections).replace(/]]>/g, ']]]]><![CDATA[>');
      return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>abrar@abrarakhunji.com (${escapeXml(post.author)})</author>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`;
    }).join('\n    ')}
  </channel>
</rss>`;
}

function renderSitemap(posts) {
  const latest = posts[0]?.updated || today;
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: latest, changefreq: 'weekly', priority: '1.0' },
    { loc: absoluteUrl(blogPath()), lastmod: latest, changefreq: 'daily', priority: '0.9' },
    { loc: absoluteUrl(hirePath()), lastmod: latest, changefreq: 'monthly', priority: '0.9' },
    ...posts.map((post) => ({
      loc: postUrl(post.slug),
      lastmod: post.updated,
      changefreq: 'monthly',
      priority: '0.8',
      image: post.heroImageUrl,
      title: post.title,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
    ${item.image ? `<image:image><image:loc>${escapeXml(item.image)}</image:loc><image:title>${escapeXml(item.title)}</image:title></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;
}

function renderLlmsTxt(posts) {
  return `# ${SITE_NAME} — AI/ML & Full-Stack Engineer in Ahmedabad
> ${DEFAULT_DESCRIPTION}

- **Website:** ${SITE_URL}/
- **Blog:** ${absoluteUrl(blogPath())}
- **Services:** ${absoluteUrl(hirePath())}
- **Email:** ${services.email}
- **GitHub:** https://github.com/abrar225
- **LinkedIn:** https://www.linkedin.com/in/abrar-akhunji/
- **X:** https://x.com/Abrarakhunji

## About
${SITE_NAME} is an AI/ML and full-stack engineer based in Ahmedabad, India. He builds computer vision systems, LLM and retrieval pipelines, and production web products. Current work includes autonomous coding agents, multi-provider model routing, and applied vision systems for healthcare and agriculture.

## Services
${services.services.map((service) => `- **${service.title}:** ${service.summary}`).join('\n')}

## Locations
${LOCATIONS.map((city) => `- ${city}`).join('\n')}

## Selected projects
${portfolio.projects.slice(0, 6).map((project) => `- **${project.title}** (${project.category}, ${project.year}): ${project.description} Tech: ${project.tech.join(', ')}. ${project.github}`).join('\n')}

## Engineering notes (${posts.length} posts)
${posts.map((post) => `- [${post.title}](${postUrl(post.slug)}): ${post.description} (${post.date})`).join('\n')}

## Core subject pillars
- **Systems & inference:** vLLM, SGLang, KV-cache optimisation, speculative decoding, quantisation, Apple Silicon inference.
- **Model architecture:** Mixture-of-Experts, Multi-Head Latent Attention, Mamba, test-time compute, non-autoregressive models.
- **Agentic engineering:** tool calling, memory architectures, context compression, evaluation harnesses, containment and guardrails.
- **Applied AI:** medical imaging, agricultural vision, synthetic-image detection.

## Contact
- Email: ${services.email}
- Availability: ${services.availability}
- Working with teams in ${LOCATIONS.slice(0, 3).join(', ')} and remotely.

## Machine-readable endpoints
- Sitemap: ${SITE_URL}/sitemap.xml
- RSS: ${SITE_URL}/feed.xml
- Full archive: ${SITE_URL}/llms-full.txt
`;
}

function renderLlmsFull(posts) {
  const header = `# ${SITE_NAME} — Full Engineering Archive
> Comprehensive collection of daily AI engineering guides, architecture teardowns and FAQ solutions.
> Author: ${SITE_NAME} (${SITE_URL}/)
> Last updated: ${today}

## Services
${services.services.map((service) => `### ${service.title}\n${service.summary}\nDeliverables: ${service.outcomes.join('; ')}.`).join('\n\n')}

## Locations
${LOCATIONS.join(', ')}.

---
`;
  const body = posts.map((post) => {
    const cleanBody = post.content
      .replace(/^:::interactive[\s\S]*?^:::\s*$/gm, '')
      .replace(/^:::eli5\s*$/gm, '### Simplified overview')
      .replace(/^:::dev\s*$/gm, '### Technical breakdown')
      .replace(/^:::\s*$/gm, '');
    return `\n## ${post.title}\n**URL:** ${postUrl(post.slug)}\n**Published:** ${post.date}\n**Updated:** ${post.updated}\n**Tags:** ${post.tags.join(', ')}\n**Summary:** ${post.description}\n\n### Full content\n\n${cleanBody.trim()}\n${post.faq?.length ? `\n### FAQ\n${post.faq.map((item) => `- **Q: ${item.question}**\n  A: ${item.answer}`).join('\n')}\n` : ''}\n---\n`;
  }).join('');
  return header + body;
}

function renderRobots() {
  return `# ${SITE_URL}/
# Maintained by ${SITE_NAME}

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# AI search and assistant crawlers
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

# Machine-readable knowledge
# ${SITE_URL}/llms.txt
# ${SITE_URL}/llms-full.txt
# ${SITE_URL}/feed.xml
`;
}

function main() {
  const baseHtml = fs.readFileSync(indexPath, 'utf8');
  const posts = readPosts();

  // Blog posts
  for (const post of posts) {
    const html = cleanBaseHtml(baseHtml)
      .replace('</head>', `${headTags({
        title: `${post.title} | Abrar Akhunji`,
        description: post.description,
        pagePath: postPath(post.slug),
        type: 'article',
        image: post.heroImageUrl,
        imageAlt: post.title,
        publishedTime: post.date,
        modifiedTime: post.updated,
        keywords: post.tags,
        articleSection: post.techTree?.branch,
        schema: buildArticleSchemas(post),
      })}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${renderArticle(post)}</div>`);
    writePage(`blog/${post.slug}`, html);
  }

  // Blog index
  const blogHtml = cleanBaseHtml(baseHtml)
    .replace('</head>', `${headTags({
      title: `${BLOG_NAME} — AI & Systems Engineering Blog | Abrar Akhunji`,
      description: BLOG_DESCRIPTION,
      pagePath: blogPath(),
      keywords: ['AI engineering blog', 'LLM inference', 'agent systems', 'model architecture', 'computer vision engineering'],
      schema: buildBlogListSchemas(posts),
    })}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderBlogList(posts)}</div>`);
  writePage('blog', blogHtml);

  // Hire page
  const hireHtml = cleanBaseHtml(baseHtml)
    .replace('</head>', `${headTags({
      title: 'Hire an AI/ML & Full-Stack Engineer in Ahmedabad | Abrar Akhunji',
      description: 'Hire Abrar Akhunji for AI/ML engineering, computer vision, LLM systems and full-stack product builds. Based in Ahmedabad, available in Gandhinagar, Bangalore and remotely.',
      pagePath: hirePath(),
      keywords: ['hire AI engineer Ahmedabad', 'computer vision engineer India', 'LLM engineer Gandhinagar', 'full-stack developer Bangalore', 'AI consultant Ahmedabad'],
      schema: buildHireSchemas(),
    })}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderHire()}</div>`);
  writePage('hire', hireHtml);

  // Homepage fallback (head is already the homepage head)
  let homeHtml = baseHtml.replace(
    /<div id="root">[\s\S]*<\/div>\s*<script type="module"/,
    `<div id="root"></div>\n    <script type="module"`
  );
  homeHtml = homeHtml.replace('<div id="root"></div>', `<div id="root">${renderHome(posts)}</div>`);
  fs.writeFileSync(indexPath, homeHtml, 'utf8');
  console.log('✓ / (home fallback)');

  writeFile('feed.xml', renderFeed(posts));
  console.log('✓ /feed.xml');

  writeFile('sitemap.xml', renderSitemap(posts));
  console.log(`✓ /sitemap.xml (${posts.length + 3} URLs)`);

  writeFile('llms.txt', renderLlmsTxt(posts));
  writeFile('llms-full.txt', renderLlmsFull(posts));
  console.log('✓ /llms.txt and /llms-full.txt');

  writeFile('robots.txt', renderRobots());
  console.log('✓ /robots.txt');

  console.log(`\nStatic SEO layer complete: ${posts.length} posts, trailing-slash canonicals, shared Person/WebSite entities.`);
}

main();
