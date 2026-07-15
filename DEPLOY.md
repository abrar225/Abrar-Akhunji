# Deploying to Hostinger

This site is a static build **plus a tiny PHP proxy** for the AI Digital Twin.
The proxy keeps the FreeLLMAPI key off the client and enforces the daily limit
server-side. Everything ships inside the `dist/` folder — one upload.

## 1. Build

```bash
npm install      # first time only (syncs the trimmed dependency list)
npm run build
```

This produces `dist/`, including:

```
dist/
├─ index.html, assets/…        ← static site (NO API key inside)
└─ api/
   ├─ twin.php                 ← the secure proxy
   ├─ config.php               ← your key (generated from .env, server-side only)
   └─ .htaccess                ← blocks config.php + the rate-limit store from the web
```

The build **fails safe**: `scripts/gen-php-config.mjs` bakes the key from
`.env` into `dist/api/config.php`. If `.env` has no key, it warns you.

## 2. Upload

Upload the **contents of `dist/`** into Hostinger's `public_html/`
(via hPanel File Manager or FTP). That's it.

## 3. Verify (2 minutes)

- Open the site → click the orb → ask **"who is Abrar?"** → instant answer (free, local).
- Ask something off-topic (e.g. "capital of France") → this hits the LLM through
  the proxy. Open DevTools → Network → confirm the request goes to
  `/api/twin.php` (not to the gateway) and **no key** is visible.
- Confirm the key is hidden: visit `https://yourdomain.com/api/config.php`
  directly → it must return **403/blank**, never the key.
- Rate limit: the 11th LLM question in a day returns a friendly "limit reached"
  message; local questions still work for free.

## Security model (only one credential: the FreeLLMAPI key)

| Concern | How it's handled |
|---|---|
| Key in client bundle | **Never** — verified at build; key lives only in `dist/api/config.php` |
| Direct access to config | Blocked by `.htaccess` (`Require all denied`) |
| Rate-limit bypass (clear storage / incognito) | Enforced **server-side per IP**; localStorage is only a UI mirror |
| Parallel-request race | Slot is **reserved before** the upstream call; refunded only on upstream failure |
| Other sites calling your proxy | Optional `TWIN_ALLOW_ORIGINS` allowlist in `.env` |

### Hardening options
- **Best:** instead of the baked key, set `FREELLM_API_KEY` as a real
  environment variable in hPanel — `config.php` prefers it via `getenv()`.
- Set `TWIN_ALLOW_ORIGINS=https://yourdomain.com` in `.env` before building.
- **Rotate the current key** — it was shared in plaintext during development.
- Change the cap anytime with `TWIN_DAILY_LIMIT` in `.env` (default 10).

## Local development

`npm run dev` has no PHP, so it calls the gateway directly using the `VITE_*`
dev keys in `.env` (dev server never ships to production). To test the real
proxy locally, point the client at your deployed one:
`VITE_TWIN_PROXY=https://yourdomain.com/api/twin.php`.
