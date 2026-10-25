# Deploying to Hostinger

The site is a static build. There is no PHP, database, API key or server process to deploy.

## 1. Build

```bash
npm install
npm run build
```

This produces `dist/` containing:

```
dist/
├─ index.html                  home shell + crawler fallback
├─ 404.html                    custom static 404
├─ .htaccess                   headers, legacy 301s, caching, 404 wiring
├─ assets/                     hashed JS/CSS
├─ blog/<slug>/index.html      canonical static article
├─ blog/index.html
├─ hire/index.html
├─ sitemap.xml
├─ feed.xml
├─ robots.txt
├─ llms.txt
├─ llms-full.txt
└─ images/
```

The build fails if a post has malformed frontmatter, an unclosed `:::` block, invalid widget JSON, a missing image, a duplicate slug or unsafe HTML.

## 2. Deploy

### Option A — Hostinger API

Requires the credentials created by the Hostinger MCP flow at `~/.config/hostinger-mcp/credentials.json` (override with `HOSTINGER_CREDENTIALS`).

```bash
npm run deploy:hostinger
```

The script builds `dist.zip` fresh, uploads it with TUS and triggers the Hostinger deploy. It does not reuse a stale archive.

### Option B — Upload manually

Upload the **contents** of `dist/` into Hostinger's `public_html/`. Keep `.htaccess` and `404.html`; both are required.

## 3. Post-deploy verification

```bash
# Canonical URLs resolve
curl -I https://abrarakhunji.com/
curl -I https://abrarakhunji.com/blog/
curl -I https://abrarakhunji.com/hire/

# A post returns 200 and its canonical ends in a slash
curl -s https://abrarakhunji.com/blog/hy-memory-2-0-tencent-30b-a3b-attributed-reinforcement-learning/ \
  | grep -o '<link rel="canonical"[^>]*>'

# Legacy URL redirects once, to the clean slug
curl -I https://abrarakhunji.com/blog/2026-10-24-hy-memory-2-0-tencent-30b-a3b-attributed-reinforcement-learning

# The dead API stays dead
curl -I https://abrarakhunji.com/api/twin.php

# Custom 404
curl -I https://abrarakhunji.com/this-page-does-not-exist/

# Security headers
curl -I https://abrarakhunji.com/ | grep -Ei 'strict-transport|x-content-type|referrer-policy|permissions-policy'
```

Expected results:

- `/blog/2026-...` → 301 to `/blog/<clean-slug>/`.
- `/api/twin.php` → 404 (the file no longer exists).
- Unknown paths → 404 with the branded page.
- The sitemap contains only canonical URLs (no `/blog/2026-`).
- `feed.xml` returns valid RSS.
- `robots.txt` references the sitemap.
- No `.DS_Store` or `.env` is publicly reachable.

## 4. Caching

`.htaccess` sets:

- HTML: no cache, so publishing is immediate.
- Hashed JS/CSS and images: one year.
- XML/TXT: one hour.

If Hostinger's CDN is enabled, purge it after a deploy if the new HTML does not appear.

## 5. Search Console

After the first deploy with this architecture:

1. Inspect `/`, `/blog/`, `/hire/` and three posts; confirm the canonical matches the URL.
2. Resubmit `sitemap.xml`.
3. Request indexing for `/hire/`, `/blog/` and the five strongest posts.
4. Expect the old date-prefixed redirect URLs to fall out of the index.
5. Review "Page indexing" reasons in two weeks. If "Crawled – currently not indexed" persists on posts, improve sourcing and internal links rather than resubmitting.

## 6. Rollback

Before deploying, keep the previous build:

```bash
cp -R dist "dist-backup-$(date +%Y%m%d-%H%M)"
```

To roll back, restore that directory's contents to `public_html/`. The generated files are deterministic from the git revision, so rebuilding the previous revision is usually simpler.

## 7. Cleanup from the old architecture

- The PHP proxy (`public/api/`), `gen-php-config.mjs`, the terminal UI and the FreeLLM key are gone.
- If `.env` still contains `FREELLM_*` keys, rotate them in the provider dashboard and delete the file. The build no longer reads it.
- The old Hostinger/GitHub Pages dual deploy is gone; Hostinger is the only target.
