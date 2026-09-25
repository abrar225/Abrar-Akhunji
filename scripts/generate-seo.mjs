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
<body style="background:#0F0E0C;color:#fff;font-family:sans-serif;padding:2rem;">
  <p>Redirecting to <a href="${canonicalUrl}" style="color:#FF5A1F;">${canonicalUrl}</a>...</p>
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
            <time datetime="${b.date}" style="font-size:0.875rem;color:#FF5A1F;display:block;margin-bottom:0.25rem;">${b.date}</time>
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
