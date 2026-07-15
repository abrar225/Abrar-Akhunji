import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://abrar225.github.io/Abrar-Akhunji';

// Paths
const distDir = path.resolve('dist');
const blogDir = path.resolve('src/content/blogs');
const indexPath = path.join(distDir, 'index.html');

// Create blog output directory if it doesn't exist
const blogOutDir = path.join(distDir, 'blog');
if (!fs.existsSync(blogOutDir)) {
  fs.mkdirSync(blogOutDir, { recursive: true });
}

// Read base index.html
let baseHtml = '';
try {
  baseHtml = fs.readFileSync(indexPath, 'utf-8');
} catch (e) {
  console.error("Run `npm run build` first before generating SEO static files.");
  process.exit(1);
}

// 1. Generate Static HTML for each Blog Post
const mdFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const blogs = [];

for (const file of mdFiles) {
  const slug = file.replace('.md', '');
  const rawContent = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const { data } = matter(rawContent);

  const title = `${data.title} | Abrar Akhunji`;
  const description = data.description || '';
  const url = `${SITE_URL}/blog/${slug}`;

  blogs.push({ slug, date: data.date, url });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": data.author || "Abrar Akhunji",
      "url": SITE_URL
    },
    "datePublished": data.date,
    "url": url
  };

  // Inject Meta tags and Schema into <head>
  const seoHead = `
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${url}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  `;

  // Replace existing <title> (if any) or just insert before </head>
  const htmlWithSeo = baseHtml.replace('</head>', `${seoHead}</head>`);

  // Create physical folder for the blog slug (e.g. dist/blog/my-post/index.html)
  const postDir = path.join(blogOutDir, slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  fs.writeFileSync(path.join(postDir, 'index.html'), htmlWithSeo);
  console.log(`Generated SEO static page for: /blog/${slug}`);
}

// Generate static HTML for the Blog List page (/blog)
const blogListTitle = "Blog | Abrar Akhunji";
const blogListDesc = "Deep dives into new AI technologies and IT sector news, explained simply.";
const blogListSeoHead = `
    <title>${blogListTitle}</title>
    <meta name="title" content="${blogListTitle}" />
    <meta name="description" content="${blogListDesc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE_URL}/blog" />
    <meta property="og:title" content="${blogListTitle}" />
    <meta property="og:description" content="${blogListDesc}" />
`;
const blogListHtml = baseHtml.replace('</head>', `${blogListSeoHead}</head>`);
fs.writeFileSync(path.join(blogOutDir, 'index.html'), blogListHtml);
console.log(`Generated SEO static page for: /blog`);

// 2. Generate Sitemap
const today = new Date().toISOString().split('T')[0];
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add Home
sitemap += `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>\n`;
// Add Blog List
sitemap += `  <url>\n    <loc>${SITE_URL}/blog</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;

// Add Individual Blogs
for (const b of blogs) {
  // Use post date if available, otherwise today
  const modDate = b.date ? new Date(b.date).toISOString().split('T')[0] : today;
  sitemap += `  <url>\n    <loc>${b.url}</loc>\n    <lastmod>${modDate}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
}

sitemap += `</urlset>`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${blogs.length + 2} URLs.`);

// 3. Generate Robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
console.log(`Generated robots.txt.`);
