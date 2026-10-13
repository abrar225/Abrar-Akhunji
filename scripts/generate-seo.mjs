import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const SITE_URL = 'https://abrarakhunji.com';
const AUTHOR_NAME = 'Abrar Akhunji';
const AUTHOR_ROLE = 'Senior AI & Full-Stack Systems Engineer';
const SOCIAL_LINKS = [
  'https://github.com/abrar225',
  'https://x.com/Abrarakhunji',
  'https://linkedin.com/in/abrarakhunji'
];

// Paths
const distDir = path.resolve('dist');
const blogDir = path.resolve('src/content/blogs');
const indexPath = path.join(distDir, 'index.html');
const blogOutDir = path.join(distDir, 'blog');

if (!fs.existsSync(blogOutDir)) {
  fs.mkdirSync(blogOutDir, { recursive: true });
}

// Read base index.html
let baseHtml = '';
try {
  baseHtml = fs.readFileSync(indexPath, 'utf-8');
} catch (e) {
  console.error("Run `vite build` first before generating SEO static files.");
  process.exit(1);
}

/**
 * Strips out default homepage-specific tags from base index.html
 * to ensure zero duplicate canonicals, titles, or descriptions on subpages.
 */
function cleanBaseHtml(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="(title|description|keywords|robots|googlebot|bingbot|author)"[\s\S]*?>/gi, '')
    .replace(/<meta\s+property="(og:[^\"]+|article:[^\"]+)"[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="twitter:[^\"]+"[\s\S]*?>/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
}

/**
 * Parses custom blog blocks (:::eli5, :::dev, :::interactive) into semantic HTML for crawlers.
 */
function renderMarkdownToSemanticHtml(rawMarkdown) {
  const lines = rawMarkdown.split('\n');
  const sections = [];
  let currentBlock = null;
  let currentContent = [];
  let neutralContent = [];
  let widgetType = '';

  for (const line of lines) {
    if (line.trim().startsWith(':::eli5')) {
      if (neutralContent.length > 0) {
        sections.push({ type: 'neutral', content: neutralContent.join('\n') });
        neutralContent = [];
      }
      currentBlock = 'eli5';
      currentContent = [];
      continue;
    }
    if (line.trim().startsWith(':::dev')) {
      if (neutralContent.length > 0) {
        sections.push({ type: 'neutral', content: neutralContent.join('\n') });
        neutralContent = [];
      }
      currentBlock = 'dev';
      currentContent = [];
      continue;
    }
    if (line.trim().startsWith(':::interactive')) {
      if (neutralContent.length > 0) {
        sections.push({ type: 'neutral', content: neutralContent.join('\n') });
        neutralContent = [];
      }
      const parts = line.trim().split(' ');
      widgetType = parts[1] || 'concept';
      currentBlock = 'interactive';
      currentContent = [];
      continue;
    }

    if (line.trim() === ':::' && currentBlock) {
      if (currentBlock === 'interactive') {
        let config = {};
        try {
          config = JSON.parse(currentContent.join('\n'));
        } catch {
          config = { raw: currentContent.join('\n') };
        }
        sections.push({ type: 'interactive', widgetType, config });
      } else {
        sections.push({ type: currentBlock, content: currentContent.join('\n') });
      }
      currentBlock = null;
      currentContent = [];
      widgetType = '';
      continue;
    }

    if (currentBlock) {
      currentContent.push(line);
    } else {
      neutralContent.push(line);
    }
  }

  if (neutralContent.length > 0) {
    sections.push({ type: 'neutral', content: neutralContent.join('\n') });
  }

  // Convert sections into semantic HTML elements
  let html = '';
  for (const sec of sections) {
    if (sec.type === 'neutral') {
      html += marked.parse(sec.content);
    } else if (sec.type === 'eli5') {
      html += `\n<section class="section-eli5" aria-label="Simplified Overview">\n`;
      html += `<h2>Simplified Overview (ELI5)</h2>\n`;
      html += marked.parse(sec.content);
      html += `\n</section>\n`;
    } else if (sec.type === 'dev') {
      html += `\n<section class="section-dev" aria-label="Technical Architecture Deep Dive">\n`;
      html += `<h2>Senior Developer Systems Breakdown</h2>\n`;
      html += marked.parse(sec.content);
      html += `\n</section>\n`;
    } else if (sec.type === 'interactive') {
      if (sec.widgetType === 'chart' && sec.config.data) {
        html += `\n<figure class="data-table-fallback" aria-label="${sec.config.title || 'Data Comparison'}">\n`;
        if (sec.config.title) html += `<h3>${sec.config.title}</h3>\n`;
        if (sec.config.description) html += `<p>${sec.config.description}</p>\n`;
        html += `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;margin:1rem 0;">\n<thead><tr>`;
        const xKey = sec.config.xKey || 'metric';
        html += `<th>${xKey}</th>`;
        if (sec.config.series) {
          for (const s of sec.config.series) {
            html += `<th>${s.name || s.dataKey}</th>`;
          }
        }
        html += `</tr></thead>\n<tbody>\n`;
        for (const row of sec.config.data) {
          html += `<tr><td><strong>${row[xKey] || ''}</strong></td>`;
          if (sec.config.series) {
            for (const s of sec.config.series) {
              html += `<td>${row[s.dataKey] ?? ''}</td>`;
            }
          }
          html += `</tr>\n`;
        }
        html += `</tbody></table>\n</figure>\n`;
      } else if (sec.widgetType === 'concept' && sec.config.steps) {
        html += `\n<div class="concept-breakdown-fallback">\n`;
        if (sec.config.title) html += `<h3>${sec.config.title}</h3>\n`;
        html += `<ol>\n`;
        for (const st of sec.config.steps) {
          html += `<li><strong>${st.title || st.label}</strong>: ${st.content}</li>\n`;
        }
        html += `</ol>\n</div>\n`;
      }
    }
  }

  return html;
}

// 1. Process all markdown files
const mdFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const blogs = [];

for (const file of mdFiles) {
  const fileSlug = file.replace('.md', '');
  // Clean evergreen topic slug without leading YYYY-MM-DD- date prefix
  const cleanSlug = fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const rawContent = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const { data, content } = matter(rawContent);

  const title = `${data.title} | ${AUTHOR_NAME}`;
  const rawTitle = data.title || 'Untitled';
  const description = data.description || '';
  const canonicalUrl = `${SITE_URL}/blog/${cleanSlug}`;
  const legacyUrl = fileSlug !== cleanSlug ? `${SITE_URL}/blog/${fileSlug}` : null;
  const heroImageUrl = data.heroImage
    ? (data.heroImage.startsWith('http') ? data.heroImage : `${SITE_URL}${data.heroImage}`)
    : `${SITE_URL}/images/myimg.webp`;

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const postDate = data.date || new Date().toISOString().split('T')[0];

  blogs.push({
    fileSlug,
    cleanSlug,
    title: rawTitle,
    description,
    canonicalUrl,
    legacyUrl,
    date: postDate,
    tags: data.tags || [],
    author: data.author || AUTHOR_NAME,
    heroImageUrl,
    faq: data.faq || [],
    techTree: data.techTree || null,
    wordCount,
    rawContent: content
  });
}

// Sort blogs newest first
blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

// 2. Generate Static HTML for each blog post
for (const blog of blogs) {
  const { cleanSlug, fileSlug, title, description, canonicalUrl, date, tags, author, heroImageUrl, faq, techTree, wordCount, rawContent } = blog;
  const pageTitle = `${title} | ${AUTHOR_NAME}`;

  // Build JSON-LD Schemas (TechArticle + BreadcrumbList + FAQPage)
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": ["TechArticle", "BlogPosting"],
      "headline": title,
      "description": description,
      "image": heroImageUrl,
      "inLanguage": "en-US",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "url": canonicalUrl,
      "datePublished": date,
      "dateModified": date,
      "wordCount": wordCount,
      "keywords": tags.join(', '),
      "articleSection": techTree?.branch || "Artificial Intelligence",
      "author": {
        "@type": "Person",
        "name": author,
        "url": SITE_URL,
        "jobTitle": AUTHOR_ROLE,
        "sameAs": SOCIAL_LINKS
      },
      "publisher": {
        "@type": "Person",
        "name": AUTHOR_NAME,
        "url": SITE_URL
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${SITE_URL}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": canonicalUrl
        }
      ]
    }
  ];

  if (faq && Array.isArray(faq) && faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  // Compile Head SEO tags
  const seoHead = `
    <title>${pageTitle}</title>
    <meta name="title" content="${pageTitle}" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${tags.join(', ')}" />
    <meta name="author" content="${author}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Search Engine Indexing Directives (AEO & GEO optimized) -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${heroImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${title}" />
    <meta property="og:site_name" content="${AUTHOR_NAME}" />
    <meta property="og:locale" content="en_US" />
    <meta property="article:published_time" content="${date}" />
    <meta property="article:modified_time" content="${date}" />
    <meta property="article:author" content="${SITE_URL}" />
    ${tags.map(t => `<meta property="article:tag" content="${t}" />`).join('\n    ')}

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Abrarakhunji" />
    <meta name="twitter:creator" content="@Abrarakhunji" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${heroImageUrl}" />
    <meta name="twitter:image:alt" content="${title}" />

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">${JSON.stringify(schemas)}</script>
  `;

  // Render semantic pre-rendered body for initial crawler response (eliminates soft 404 / empty #root penalty)
  const semanticArticleBody = renderMarkdownToSemanticHtml(rawContent);
  const faqHtml = (faq && Array.isArray(faq) && faq.length > 0)
    ? `
      <section class="article-faq-section" aria-label="Frequently Asked Questions">
        <h2>Frequently Asked Questions</h2>
        <dl>
          ${faq.map(item => `
            <div style="margin-bottom:1.5rem;">
              <dt><strong>${item.question}</strong></dt>
              <dd style="margin-top:0.5rem;color:#a0a0a0;">${item.answer}</dd>
            </div>
          `).join('')}
        </dl>
      </section>
    `
    : '';

  const prerenderedArticle = `
    <article class="pre-rendered-blog" style="max-width:900px;margin:0 auto;padding:2rem 1.5rem;font-family:sans-serif;line-height:1.7;">
      <nav aria-label="Breadcrumb" style="font-size:0.875rem;margin-bottom:1.5rem;">
        <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; <span>${title}</span>
      </nav>
      <header style="margin-bottom:2.5rem;">
        <h1 style="font-size:2.25rem;line-height:1.25;margin-bottom:1rem;">${title}</h1>
        <div style="font-size:0.875rem;color:#888;margin-bottom:1.5rem;">
          <span>By <strong>${author}</strong></span> &bull;
          <time datetime="${date}">${date}</time> &bull;
          <span>${Math.ceil(wordCount / 200)} min read</span>
        </div>
        ${heroImageUrl ? `<figure style="margin:1.5rem 0;"><img src="${heroImageUrl}" alt="${title}" width="1200" height="630" style="max-width:100%;height:auto;border-radius:12px;" /></figure>` : ''}
        <p style="font-size:1.125rem;color:#b0b0b0;font-style:italic;">${description}</p>
      </header>
      <div class="article-body">
        ${semanticArticleBody}
      </div>
      ${faqHtml}
      <footer style="margin-top:4rem;padding-top:2rem;border-top:1px solid #333;">
        <h3>About the Author</h3>
        <p><strong>${author}</strong> is a ${AUTHOR_ROLE} exploring AI system designs, foundation models, and scalable architectures. Connect on <a href="https://github.com/abrar225">GitHub</a>, <a href="https://x.com/Abrarakhunji">X (Twitter)</a>, or <a href="https://linkedin.com/in/abrarakhunji">LinkedIn</a>.</p>
      </footer>
    </article>
  `;

  // Inject into index.html using cleaned base HTML (eliminates duplicate homepage canonical & meta tags)
  const cleanedBase = cleanBaseHtml(baseHtml);
  let pageHtml = cleanedBase.replace('</head>', `${seoHead}</head>`);
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${prerenderedArticle}</div>`);

  // Write primary canonical file at /blog/${cleanSlug}/index.html
  const postDir = path.join(blogOutDir, cleanSlug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  fs.writeFileSync(path.join(postDir, 'index.html'), pageHtml);
  console.log(`✓ Canonical SEO Page: /blog/${cleanSlug}`);

  // If the file originally had a date prefix, write a redirecting static page at /blog/${fileSlug}/index.html
  if (fileSlug !== cleanSlug) {
    const legacyDir = path.join(blogOutDir, fileSlug);
    if (!fs.existsSync(legacyDir)) {
      fs.mkdirSync(legacyDir, { recursive: true });
    }
    const redirectHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Redirecting to ${pageTitle}...</title>
  <link rel="canonical" href="${canonicalUrl}" />
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />
  <script>window.location.replace("${canonicalUrl}");</script>
</head>
<body style="background:#070B12;color:#E8EEF6;font-family:sans-serif;padding:2rem;">
  <p>Redirecting to <a href="${canonicalUrl}" style="color:#79D0E0;">${canonicalUrl}</a>...</p>
</body>
</html>`;
    fs.writeFileSync(path.join(legacyDir, 'index.html'), redirectHtml);
    console.log(`  ↪ Legacy Redirect: /blog/${fileSlug} → /blog/${cleanSlug}`);
  }
}

// 3. Generate Static HTML for the Blog List page (/blog)
const blogListTitle = `The Neural Log — AI & Systems Engineering Blog | ${AUTHOR_NAME}`;
const blogListDesc = "Senior-level architectural deep dives into breaking AI developments, inference engineering, agentic systems, and frontier model internals.";
const blogListUrl = `${SITE_URL}/blog`;

const blogListSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Neural Log by Abrar Akhunji",
    "url": blogListUrl,
    "description": blogListDesc,
    "author": {
      "@type": "Person",
      "name": AUTHOR_NAME,
      "url": SITE_URL,
      "jobTitle": AUTHOR_ROLE,
      "sameAs": SOCIAL_LINKS
    },
    "blogPost": blogs.map(b => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "url": b.canonicalUrl,
      "datePublished": b.date,
      "description": b.description
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": blogListUrl
      }
    ]
  }
];

const blogListSeoHead = `
    <title>${blogListTitle}</title>
    <meta name="title" content="${blogListTitle}" />
    <meta name="description" content="${blogListDesc}" />
    <link rel="canonical" href="${blogListUrl}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${blogListUrl}" />
    <meta property="og:title" content="${blogListTitle}" />
    <meta property="og:description" content="${blogListDesc}" />
    <meta property="og:image" content="${SITE_URL}/images/myimg.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Abrarakhunji" />
    <meta name="twitter:creator" content="@Abrarakhunji" />
    <meta name="twitter:url" content="${blogListUrl}" />
    <meta name="twitter:title" content="${blogListTitle}" />
    <meta name="twitter:description" content="${blogListDesc}" />
    <meta name="twitter:image" content="${SITE_URL}/images/myimg.webp" />
    <script type="application/ld+json">${JSON.stringify(blogListSchemas)}</script>
`;

const prerenderedBlogList = `
  <main style="max-width:900px;margin:0 auto;padding:3rem 1.5rem;font-family:sans-serif;">
    <header style="margin-bottom:3rem;">
      <h1 style="font-size:2.5rem;margin-bottom:0.75rem;">The Neural Log</h1>
      <p style="font-size:1.125rem;color:#888;">${blogListDesc}</p>
    </header>
    <section>
      <ul style="list-style:none;padding:0;">
        ${blogs.map(b => `
          <li style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #222;">
            <time datetime="${b.date}" style="font-size:0.875rem;color:#79D0E0;display:block;margin-bottom:0.25rem;">${b.date}</time>
            <h2 style="font-size:1.5rem;margin:0 0 0.5rem 0;">
              <a href="/blog/${b.cleanSlug}" style="text-decoration:none;color:#fff;">${b.title}</a>
            </h2>
            <p style="color:#a0a0a0;margin:0 0 0.75rem 0;">${b.description}</p>
            <div style="font-size:0.75rem;color:#666;">
              ${b.tags.map(t => `<span style="display:inline-block;margin-right:0.5rem;padding:0.2rem 0.5rem;background:#1a1a1a;border-radius:4px;">#${t}</span>`).join('')}
            </div>
          </li>
        `).join('')}
      </ul>
    </section>
  </main>
`;

  const cleanedListBase = cleanBaseHtml(baseHtml);
  let blogListHtml = cleanedListBase.replace('</head>', `${blogListSeoHead}</head>`);
  blogListHtml = blogListHtml.replace('<div id="root"></div>', `<div id="root">${prerenderedBlogList}</div>`);
fs.writeFileSync(path.join(blogOutDir, 'index.html'), blogListHtml);
console.log(`✓ Blog List SEO Page: /blog`);

// 3.5. Generate Pre-rendered Homepage for AI Assistants & Non-JS Crawlers
const prerenderedHomepage = `
  <main class="pre-rendered-portfolio" style="max-width:1050px;margin:0 auto;padding:3rem 1.5rem;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.7;color:#E8EEF6;background:#070B12;">
    <header role="banner" style="margin-bottom:3rem;border-bottom:1px solid #1F2937;padding-bottom:2.5rem;">
      <h1 style="font-size:2.75rem;line-height:1.2;margin:0 0 0.5rem 0;color:#F9FAFB;letter-spacing:-0.02em;">Abrar Akhunji</h1>
      <p style="font-size:1.35rem;color:#79D0E0;margin:0 0 1rem 0;font-weight:600;">AI/ML Engineer &amp; Full-Stack Systems Developer</p>
      <p style="font-size:1.1rem;color:#9CA3AF;max-width:850px;margin:0 0 1.5rem 0;">
        Building production-ready systems spanning autonomous AI developer tooling, full-scale food delivery platforms, and healthcare computer vision models. Gujarat, India &bull; Open to Work.
      </p>
      <nav aria-label="Quick links" style="display:flex;gap:1.25rem;flex-wrap:wrap;font-size:0.95rem;">
        <a href="#projects" style="color:#79D0E0;text-decoration:none;font-weight:500;">Featured Projects &darr;</a>
        <a href="#skills" style="color:#79D0E0;text-decoration:none;font-weight:500;">Technical Skills &darr;</a>
        <a href="#experience" style="color:#79D0E0;text-decoration:none;font-weight:500;">Experience &darr;</a>
        <a href="/blog" style="color:#79D0E0;text-decoration:none;font-weight:500;">Neural Log (Blog) &rarr;</a>
        <a href="/llms.txt" style="color:#79D0E0;text-decoration:none;font-weight:500;">AI Dossier (/llms.txt) &rarr;</a>
        <a href="mailto:moabrarakhunji@gmail.com" style="color:#79D0E0;text-decoration:none;font-weight:500;">moabrarakhunji@gmail.com</a>
      </nav>
    </header>

    <section id="about" style="margin-bottom:3.5rem;">
      <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #1F2937;padding-bottom:0.75rem;margin-bottom:1.25rem;">About &amp; Systems Philosophy</h2>
      <p style="color:#D1D5DB;font-size:1.05rem;margin-bottom:1rem;">
        Abrar Akhunji is a Senior AI/ML Engineer and Full-Stack Systems Developer pursuing a B.E. in Information Technology at Kalol Institute of Technology &amp; Research Center. He specializes in designing robust architectures where deep learning intelligence tightly couples with production web backends.
      </p>
      <p style="color:#D1D5DB;font-size:1.05rem;margin-bottom:1rem;">
        His work spans autonomous coding agent loops (FixO CLI), high-concurrency event-driven delivery platforms (GourmetGo), agricultural vision transformers (Cattle Breed ID), and clinical medical imaging diagnostics (Brain Tumor MRI detection).
      </p>
    </section>

    <section id="projects" style="margin-bottom:3.5rem;">
      <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #1F2937;padding-bottom:0.75rem;margin-bottom:1.5rem;">Featured Engineering Systems</h2>
      
      <article style="background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:2rem;margin-bottom:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.5rem;color:#F9FAFB;margin:0;">FixO CLI — Autonomous AI Coding Platform</h3>
          <span style="background:#1E293B;color:#79D0E0;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.8rem;font-weight:600;">AI DEVTOOL &bull; 2026</span>
        </div>
        <p style="color:#D1D5DB;font-size:1rem;margin-bottom:1rem;">
          An autonomous, open-source AI coding platform that lives in your terminal. FixO connects 20+ free LLM providers directly to your codebase to fix bugs, refactor code, run tests, and install packages without browser round-trips or API billing hurdles.
        </p>
        <div style="background:#111827;border-left:3px solid #79D0E0;padding:0.75rem 1rem;margin-bottom:1rem;font-family:monospace;font-size:0.9rem;color:#A5F3FC;">
          <strong>Architecture:</strong> Terminal CLI Engine (Node.js) &rarr; Tree-Sitter AST Workspace Indexer &rarr; Multi-Provider LLM Router (FreeLLMAPI) &rarr; Shadow Staging &amp; LSP Syntax Verifier &rarr; Autonomous Test Loop.
        </div>
        <ul style="color:#9CA3AF;margin-bottom:1.25rem;padding-left:1.25rem;">
          <li>Multi-AI router across 20+ free providers with automatic failover and load balancing.</li>
          <li>Self-correcting autonomous test execution loop that iterates until test suites pass.</li>
          <li>Atomic shadow staging, LSP pre-save syntax checks, and credential scrubbing vault.</li>
          <li>Tree-Sitter AST workspace indexing for JavaScript, TypeScript, Python, and Go.</li>
        </ul>
        <div style="margin-bottom:1rem;">
          <strong style="color:#E5E7EB;font-size:0.9rem;">Tech Stack:</strong>
          <span style="color:#9CA3AF;font-size:0.9rem;"> Node.js, SQLite, Tree-Sitter, LSP, MCP, Ollama</span>
        </div>
        <div>
          <a href="https://github.com/abrar225/FixO" style="color:#79D0E0;margin-right:1.5rem;text-decoration:none;">GitHub Repository &rarr;</a>
          <a href="https://fixo.firehox.com/" style="color:#79D0E0;text-decoration:none;">Live Platform Demo &rarr;</a>
        </div>
      </article>

      <article style="background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:2rem;margin-bottom:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.5rem;color:#F9FAFB;margin:0;">GourmetGo — Multi-Portal Food Delivery Ecosystem</h3>
          <span style="background:#1E293B;color:#79D0E0;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.8rem;font-weight:600;">FULL STACK &bull; 2026</span>
        </div>
        <p style="color:#D1D5DB;font-size:1rem;margin-bottom:1rem;">
          A production-scale food ordering and delivery ecosystem featuring four synchronized modules: Customer, Restaurant Vendor, Delivery Rider, and Master Admin panel.
        </p>
        <div style="background:#111827;border-left:3px solid #79D0E0;padding:0.75rem 1rem;margin-bottom:1rem;font-family:monospace;font-size:0.9rem;color:#A5F3FC;">
          <strong>Architecture:</strong> Next.js 14 Client App &rarr; Django 5.0 REST API Backend &rarr; Redis / WebSockets (Django Channels) &rarr; Razorpay Gateway &rarr; Cloudinary Asset Management.
        </div>
        <ul style="color:#9CA3AF;margin-bottom:1.25rem;padding-left:1.25rem;">
          <li>Real-time live order tracking and push notifications powered by Django Channels &amp; Redis.</li>
          <li>End-to-end payment processing with Razorpay integration (UPI and COD support).</li>
          <li>Browser geolocation-based restaurant discovery within a dynamic 15km operational radius.</li>
          <li>Comprehensive administrator dashboard for vendor onboarding, payout reconciliation, and system metrics.</li>
        </ul>
        <div style="margin-bottom:1rem;">
          <strong style="color:#E5E7EB;font-size:0.9rem;">Tech Stack:</strong>
          <span style="color:#9CA3AF;font-size:0.9rem;"> Next.js 14, React, Django 5.0, Django Channels, Redis, Razorpay, Tailwind CSS</span>
        </div>
        <div>
          <a href="https://github.com/abrar225/GourmetGo" style="color:#79D0E0;margin-right:1.5rem;text-decoration:none;">GitHub Repository &rarr;</a>
          <a href="https://gourmet-go.vercel.app/" style="color:#79D0E0;text-decoration:none;">Live Platform &rarr;</a>
        </div>
      </article>

      <article style="background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:2rem;margin-bottom:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.5rem;color:#F9FAFB;margin:0;">Cattle Breed Identification System</h3>
          <span style="background:#1E293B;color:#79D0E0;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.8rem;font-weight:600;">AI / COMPUTER VISION &bull; 2025</span>
        </div>
        <p style="color:#D1D5DB;font-size:1rem;margin-bottom:1rem;">
          An ensemble-based computer vision tool capable of accurately classifying 41 indigenous Indian cattle breeds using Vision Transformers (ViT) and fine-grained feature extraction.
        </p>
        <div style="background:#111827;border-left:3px solid #79D0E0;padding:0.75rem 1rem;margin-bottom:1rem;font-family:monospace;font-size:0.9rem;color:#A5F3FC;">
          <strong>Architecture:</strong> Gradio Web Interface &rarr; Vision Transformer (ViT) Backbone &rarr; Softmax 41-Class Classification Head &rarr; Real-time Inference Engine.
        </div>
        <div style="margin-bottom:1rem;">
          <strong style="color:#E5E7EB;font-size:0.9rem;">Tech Stack:</strong>
          <span style="color:#9CA3AF;font-size:0.9rem;"> Python, OpenCV, Vision Transformers (ViT), PyTorch, Gradio</span>
        </div>
        <div>
          <a href="https://github.com/abrar225/AI_cattle_vison" style="color:#79D0E0;margin-right:1.5rem;text-decoration:none;">GitHub Repository &rarr;</a>
          <a href="https://huggingface.co/spaces/abrar225/BreedAI" style="color:#79D0E0;text-decoration:none;">HuggingFace Space Demo &rarr;</a>
        </div>
      </article>

      <article style="background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:2rem;margin-bottom:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.5rem;color:#F9FAFB;margin:0;">Brain Tumor Detection (MRI)</h3>
          <span style="background:#1E293B;color:#79D0E0;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.8rem;font-weight:600;">HEALTHCARE AI &bull; 2024</span>
        </div>
        <p style="color:#D1D5DB;font-size:1rem;margin-bottom:1rem;">
          Clinical diagnostic computer vision model trained on medical MRI imaging datasets to identify brain neoplasms with high sensitivity using morphological filtering, contour extraction, and classifier pipelines.
        </p>
        <div style="background:#111827;border-left:3px solid #79D0E0;padding:0.75rem 1rem;margin-bottom:1rem;font-family:monospace;font-size:0.9rem;color:#A5F3FC;">
          <strong>Architecture:</strong> MRI Scan Ingestion &rarr; Grayscale Masking &amp; Adaptive Thresholding &rarr; Morphological Contour Analysis &rarr; Feature Vector &rarr; Tumor Classification.
        </div>
        <div style="margin-bottom:1rem;">
          <strong style="color:#E5E7EB;font-size:0.9rem;">Tech Stack:</strong>
          <span style="color:#9CA3AF;font-size:0.9rem;"> Python, OpenCV, NumPy, Pandas, Scikit-Learn</span>
        </div>
        <div>
          <a href="https://github.com/abrar225/Brain-Tumer-Detection-System" style="color:#79D0E0;text-decoration:none;">GitHub Repository &rarr;</a>
        </div>
      </article>

      <article style="background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:2rem;margin-bottom:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.5rem;color:#F9FAFB;margin:0;">Real vs AI Image Detector</h3>
          <span style="background:#1E293B;color:#79D0E0;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.8rem;font-weight:600;">FORENSICS &bull; 2025</span>
        </div>
        <p style="color:#D1D5DB;font-size:1rem;margin-bottom:1rem;">
          Image forensics and deep learning pipeline designed to distinguish authentic photographic images from diffusion- and GAN-generated synthetic artifacts.
        </p>
        <div>
          <a href="https://github.com/abrar225/Real-vs-AI-Image-Detector" style="color:#79D0E0;text-decoration:none;">GitHub Repository &rarr;</a>
        </div>
      </article>

      <article style="background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.5rem;color:#F9FAFB;margin:0;">Library Management System</h3>
          <span style="background:#1E293B;color:#79D0E0;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.8rem;font-weight:600;">FULL STACK &bull; 2025</span>
        </div>
        <p style="color:#D1D5DB;font-size:1rem;margin-bottom:1rem;">
          High-performance relational library automation system handling physical cataloging, patron loan records, and fine assessment computations.
        </p>
        <div>
          <a href="https://github.com/abrar225/Library-Management-System" style="color:#79D0E0;text-decoration:none;">GitHub Repository &rarr;</a>
        </div>
      </article>
    </section>

    <section id="skills" style="margin-bottom:3.5rem;">
      <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #1F2937;padding-bottom:0.75rem;margin-bottom:1.5rem;">Technical Skills Matrix</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;">
        <div style="background:#0D1117;border:1px solid #1F2937;border-radius:8px;padding:1.5rem;">
          <h3 style="color:#79D0E0;font-size:1.15rem;margin:0 0 0.5rem 0;">AI &amp; Data Science</h3>
          <p style="color:#9CA3AF;margin:0;font-size:0.95rem;">Python, TensorFlow, PyTorch, OpenCV, Vision Transformers, NumPy, Pandas, Scikit-Learn, Deep Learning</p>
        </div>
        <div style="background:#0D1117;border:1px solid #1F2937;border-radius:8px;padding:1.5rem;">
          <h3 style="color:#79D0E0;font-size:1.15rem;margin:0 0 0.5rem 0;">Full-Stack &amp; Frameworks</h3>
          <p style="color:#9CA3AF;margin:0;font-size:0.95rem;">React, Next.js, Django, Django Channels, WebSockets, REST APIs, JavaScript, TypeScript, Tailwind CSS</p>
        </div>
        <div style="background:#0D1117;border:1px solid #1F2937;border-radius:8px;padding:1.5rem;">
          <h3 style="color:#79D0E0;font-size:1.15rem;margin:0 0 0.5rem 0;">Databases &amp; Caching</h3>
          <p style="color:#9CA3AF;margin:0;font-size:0.95rem;">Redis, MySQL, SQLite, Firebase Firestore, Cloudinary</p>
        </div>
        <div style="background:#0D1117;border:1px solid #1F2937;border-radius:8px;padding:1.5rem;">
          <h3 style="color:#79D0E0;font-size:1.15rem;margin:0 0 0.5rem 0;">Developer Tooling</h3>
          <p style="color:#9CA3AF;margin:0;font-size:0.95rem;">Git, GitHub, Linux, Docker, Vite, Three.js, GSAP, Lenis, AST Indexing</p>
        </div>
      </div>
    </section>

    <section id="experience" style="margin-bottom:3.5rem;">
      <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #1F2937;padding-bottom:0.75rem;margin-bottom:1.5rem;">Professional Experience &amp; Internships</h2>
      <div style="margin-bottom:1.5rem;border-left:2px solid #79D0E0;padding-left:1.25rem;">
        <h3 style="font-size:1.25rem;color:#F9FAFB;margin:0;">Full-Stack Python Intern &bull; BrainyBeam IT Solutions</h3>
        <span style="color:#79D0E0;font-size:0.875rem;">JAN 2026 — MAR 2026</span>
        <p style="color:#9CA3AF;margin:0.5rem 0 0 0;">Advanced Django architecture, enterprise Python ecosystems, database design, and asynchronous API integrations.</p>
      </div>
      <div style="margin-bottom:1.5rem;border-left:2px solid #79D0E0;padding-left:1.25rem;">
        <h3 style="font-size:1.25rem;color:#F9FAFB;margin:0;">Python Django Intern &bull; BrainyBeam IT Solutions</h3>
        <span style="color:#79D0E0;font-size:0.875rem;">JUL 2025</span>
        <p style="color:#9CA3AF;margin:0.5rem 0 0 0;">Focused on backend REST API creation, authentication flows, and relational schema management.</p>
      </div>
      <div style="border-left:2px solid #79D0E0;padding-left:1.25rem;">
        <h3 style="font-size:1.25rem;color:#F9FAFB;margin:0;">Web Developer &amp; Designer Intern</h3>
        <span style="color:#79D0E0;font-size:0.875rem;">JUN 2024 — AUG 2024</span>
        <p style="color:#9CA3AF;margin:0.5rem 0 0 0;">Crafted responsive frontend interfaces and interactive web components.</p>
      </div>
    </section>

    <section id="education" style="margin-bottom:3.5rem;">
      <h2 style="font-size:1.85rem;color:#F9FAFB;border-bottom:1px solid #1F2937;padding-bottom:0.75rem;margin-bottom:1.5rem;">Education &amp; Credentials</h2>
      <ul style="list-style:none;padding:0;color:#D1D5DB;">
        <li style="margin-bottom:1rem;">
          <strong>Bachelor of Engineering in Information Technology:</strong> Kalol Institute of Technology &amp; Research Center (Aug 2023 — Present)
        </li>
        <li style="margin-bottom:1rem;">
          <strong>Diploma in Information Technology:</strong> Government Polytechnic, Himmatnagar (2020 — 2023)
        </li>
        <li style="margin-bottom:1rem;">
          <strong>Google Cybersecurity Professional Certificate:</strong> 8-course credential issued by Google (Coursera)
        </li>
        <li style="margin-bottom:1rem;">
          <strong>GUNIpreneur Bootcamp:</strong> 2nd Runner Up for Most Innovative Idea (Ganpat University SSIP)
        </li>
        <li>
          <strong>Smart India Hackathon:</strong> National participant in system engineering track
        </li>
      </ul>
    </section>

    <footer id="contact" role="contentinfo" style="border-top:1px solid #1F2937;padding-top:2.5rem;color:#9CA3AF;">
      <h2 style="font-size:1.5rem;color:#F9FAFB;margin:0 0 1rem 0;">Connect &amp; Verify</h2>
      <p style="margin-bottom:1.5rem;">
        Email: <a href="mailto:moabrarakhunji@gmail.com" style="color:#79D0E0;">moabrarakhunji@gmail.com</a> &bull;
        LinkedIn: <a href="https://linkedin.com/in/abrar-akhunji/" style="color:#79D0E0;">linkedin.com/in/abrar-akhunji/</a> &bull;
        GitHub: <a href="https://github.com/abrar225" style="color:#79D0E0;">github.com/abrar225</a> &bull;
        X (Twitter): <a href="https://x.com/Abrarakhunji" style="color:#79D0E0;">@Abrarakhunji</a>
      </p>
      <div style="background:#0D1117;border:1px solid #1F2937;border-radius:8px;padding:1rem;font-size:0.9rem;">
        <strong>Machine-Readable Endpoints for AI Systems:</strong><br />
        &bull; <a href="/llms.txt" style="color:#79D0E0;">/llms.txt</a> (Standard summary dossier)<br />
        &bull; <a href="/llms-full.txt" style="color:#79D0E0;">/llms-full.txt</a> (Comprehensive markdown knowledge base)<br />
        &bull; <a href="/sitemap.xml" style="color:#79D0E0;">/sitemap.xml</a> (Search and crawler index)
      </div>
      <p style="font-size:0.8rem;margin-top:1.5rem;color:#6B7280;">
        &copy; 2026 Abrar Akhunji. All rights reserved.
      </p>
    </footer>
  </main>
`;

let homepageHtml = fs.readFileSync(indexPath, 'utf-8');
homepageHtml = homepageHtml.replace('<div id="root"></div>', `<div id="root">${prerenderedHomepage}</div>`);
fs.writeFileSync(indexPath, homepageHtml);
console.log(`✓ Homepage Pre-rendered with High-Density Semantic Shell: /index.html`);

/** Helper to strictly escape XML special characters */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// 4. Generate Enhanced Google-Compliant Sitemap (with XSLT design & image extensions)
const today = new Date().toISOString().split('T')[0];
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

for (const b of blogs) {
  const modDate = b.date ? new Date(b.date).toISOString().split('T')[0] : today;
  const safeTitle = escapeXml(b.title);
  const commentTitle = b.title.replace(/--/g, '-').replace(/&/g, '&amp;');
  sitemap += `  <!-- ${commentTitle} -->
  <url>
    <loc>${escapeXml(b.canonicalUrl)}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${b.heroImageUrl ? `
    <image:image>
      <image:loc>${escapeXml(b.heroImageUrl)}</image:loc>
      <image:title>${safeTitle}</image:title>
    </image:image>` : ''}
  </url>
`;
}

sitemap += `</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`✓ Generated sitemap.xml with ${blogs.length + 2} URLs & Image Extensions.`);

// Ensure public/sitemap.xsl is copied to dist/sitemap.xsl
const xslSrc = path.resolve('public/sitemap.xsl');
const xslDest = path.join(distDir, 'sitemap.xsl');
if (fs.existsSync(xslSrc)) {
  fs.copyFileSync(xslSrc, xslDest);
  console.log(`✓ Copied sitemap.xsl to dist/sitemap.xsl`);
}

// 5. Generate llms.txt & llms-full.txt (GEO / AEO Specification)
let llmsTxt = `# ${AUTHOR_NAME} — Technical Portfolio & Neural Log
> Senior AI & Full-Stack Systems Engineer specializing in foundation models, LLM serving architectures, and agentic systems.

- **Website:** ${SITE_URL}
- **Blog:** ${SITE_URL}/blog
- **GitHub:** https://github.com/abrar225
- **X (Twitter):** https://x.com/Abrarakhunji
- **LinkedIn:** https://linkedin.com/in/abrarakhunji

## About
Abrar Akhunji writes daily deep-dive systems architectural teardowns and engineering analyses covering the latest breakthroughs in artificial intelligence, local inference (vLLM, SGLang, MLX, llama.cpp), model architectures (MoE, Multi-Token Prediction, Latent Attention), and autonomous agent frameworks.

## Latest AI Deep Dives
`;

for (const b of blogs) {
  llmsTxt += `- [${b.title}](${b.canonicalUrl}): ${b.description} (${b.date})\n`;
}

llmsTxt += `\n## Core Subject Pillars
- **Systems & Inference:** High-throughput serving, KV-cache optimization, kernel fusion, FP8/FP4 quantization, Apple Silicon M5 acceleration.
- **Frontier AI Architectures:** Non-autoregressive models, reasoning loops (GRPO, MCTS), Multi-Head Latent Attention (MLA), DualPipe parallelism.
- **Agentic Engineering:** Tool calling protocols, memory graphs (Mem0, Graphiti), containment steganography, AST code editing loops.
`;

fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt);
console.log(`✓ Generated /llms.txt for AI Search Engines & LLM scrapers.`);

// Generate llms-full.txt (Full high-density text for LLM context windows)
let llmsFullTxt = `# ${AUTHOR_NAME} — The Neural Log (Full Deep-Dive Archive)
> Comprehensive collection of daily AI engineering guides, architectural blueprints, and FAQ solutions.
> Author: ${AUTHOR_NAME} (${SITE_URL})
> Last updated: ${today}

---
`;

for (const b of blogs) {
  llmsFullTxt += `\n## ${b.title}\n`;
  llmsFullTxt += `**URL:** ${b.canonicalUrl}\n`;
  llmsFullTxt += `**Published:** ${b.date}\n`;
  llmsFullTxt += `**Tags:** ${b.tags.join(', ')}\n`;
  llmsFullTxt += `**Summary:** ${b.description}\n\n`;
  llmsFullTxt += `### Full Content\n\n`;
  // Strip out markdown delimiters like :::eli5 and :::dev but keep the content
  const cleanBody = b.rawContent
    .replace(/^:::eli5\s*$/gm, '### Simplified Overview (ELI5)')
    .replace(/^:::dev\s*$/gm, '### Senior Developer Systems Breakdown')
    .replace(/^:::interactive\s+\w+\s*[\s\S]*?^:::\s*$/gm, '')
    .replace(/^:::\s*$/gm, '');
  llmsFullTxt += cleanBody.trim() + '\n\n';

  if (b.faq && b.faq.length > 0) {
    llmsFullTxt += `### Frequently Asked Questions\n`;
    for (const f of b.faq) {
      llmsFullTxt += `- **Q: ${f.question}**\n  A: ${f.answer}\n`;
    }
    llmsFullTxt += '\n';
  }
  llmsFullTxt += `---\n`;
}

fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt);
console.log(`✓ Generated /llms-full.txt for comprehensive LLM ingestion.`);

// 6. Generate Robots.txt with All AI Crawlers + LLM references
const robots = `# ${SITE_URL}
# Primary domain: abrarakhunji.com
# Maintained by ${AUTHOR_NAME}

User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# AI Assistants & Search Engines (AEO/GEO Allowed)
# Google AI & Gemini Search
User-agent: Google-Extended
Allow: /

# OpenAI / ChatGPT / SearchGPT
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic / Claude
User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity AI Search Engine
User-agent: PerplexityBot
Allow: /

# Microsoft Bing & Copilot
User-agent: Bingbot
Allow: /

# Apple Intelligence
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Meta AI
User-agent: FacebookBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

# Cohere AI
User-agent: cohere-ai
Allow: /

# ByteDance / TikTok AI
User-agent: Bytespider
Allow: /

# Machine-Readable AI Knowledge Standards (GEO / LLMO)
# See: ${SITE_URL}/llms.txt
# See: ${SITE_URL}/llms-full.txt
`;

fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
console.log(`✓ Generated robots.txt with complete AI crawler directives.`);
