# 🚀 SEO, AEO & GEO Engineering Standards for Abrar Akhunji Blog

This document defines the strict publication, architecture, and optimization standards for all blog posts on [abrarakhunji.com/blog](https://abrarakhunji.com/blog).

---

## 1. URL Architecture & Clean Evergreen Slugs (Rule #1)
- **Zero Date-Prefixed URLs:** Never use `YYYY-MM-DD-` in public URLs. Search engines penalize dated URLs for evergreen technical searches.
  - ❌ Bad: `https://abrarakhunji.com/blog/2026-09-25-typesafe-ai-jev`
  - ✅ Good: `https://abrarakhunji.com/blog/typesafe-ai-jev-non-autoregressive-decision-engine`
- **File Naming:** In `src/content/blogs/`, files may be named `[topic-slug].md` or `YYYY-MM-DD-[topic-slug].md`. The `generate-seo.mjs` script automatically extracts `cleanSlug` by stripping the date prefix and creates:
  1. The canonical static HTML page at `dist/blog/[clean-slug]/index.html`.
  2. A backwards-compatible redirect at `dist/blog/[dated-slug]/index.html` with `<link rel="canonical">` and instant refresh so legacy links never 404.

---

## 2. Topic Discovery & Viral Trend Alignment
Before drafting any post, research breaking AI developments across:
1. **High-Velocity Sources:**
   - Reddit `/r/LocalLLaMA`, `/r/ArtificialInteligence`
   - YouTube / Twitter: Mehul Mohan (@mehulmpt), WTF Code (@wtf-code), Codvyn (@codvyn), The AI Adventurer
   - GitHub Trending AI repositories & HackerNews front page
2. **Intent Keyword Targeting:**
   - Target queries that senior developers, researchers, and tech leads search for: comparative evaluations (e.g. `MLX vs GGUF M5`), new breakthrough model architectures (e.g. `TypeSafe AI Jev RLCD`, `FlashMLA`, `DualPipe`), and inference systems optimization (`RadixAttention`, `Chunked Prefill`).

---

## 3. Answer Engine Optimization (AEO) & Inverted Pyramid
AI engines (ChatGPT, Perplexity, Google AI Overviews, Claude) extract direct answers from high-authority sources.
1. **Direct Answer Under Every H2:** The first two sentences under every heading must directly answer the question/concept without filler or prelude.
2. **Structured Formats:** Use lists, bullet points, and data tables.
3. **Interactive Widget Fallbacks:** Always use `:::interactive concept` and `:::interactive chart`. The build script compiles these into semantic HTML `<ol>` steps and `<table>` figures, allowing Google to generate rich featured snippets.

---

## 4. Pre-Rendered Semantic HTML (Zero Soft 404s)
- `scripts/generate-seo.mjs` injects the complete, pre-rendered semantic `<article>` inside `<div id="root">` of every static HTML page.
- Crawlers (Googlebot, Bingbot, PerplexityBot) receive 100% of the body text, headings, author byline, and FAQs on the initial HTTP response without requiring JavaScript execution.
- When loaded in the browser, React mounts over `#root` into the interactive application with zero layout shifts.

---

## 5. Structured Data & E-E-A-T (JSON-LD)
Every post automatically generates three Schema.org entities:
1. **`TechArticle` / `BlogPosting`:** Includes `headline`, `description`, `image` (1200x630), `datePublished`, `dateModified`, `wordCount`, `keywords`, `inLanguage`, and Author profile (`jobTitle`, `sameAs` to GitHub, X, LinkedIn).
2. **`BreadcrumbList`:** Establishes Google Rich Results breadcrumbs (`Home > Blog > Post Title`).
3. **`FAQPage`:** Embeds question-and-answer pairs directly into the SERP snippet.

---

## 6. Generative Engine Optimization (GEO & LLMO)
1. **`llms.txt`:** High-level summary of the site, author credentials, subject pillars, and catalog of all deep dives with canonical links and summaries.
2. **`llms-full.txt`:** Full unformatted markdown corpus of all articles and FAQ pairs for direct LLM ingestion.
3. **`robots.txt`:** Explicitly permits all major AI crawlers (`Google-Extended`, `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Applebot`, `Meta-ExternalAgent`).
