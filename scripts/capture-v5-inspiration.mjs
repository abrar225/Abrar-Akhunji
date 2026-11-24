/**
 * Local helper script to capture full-load, post-preloader desktop screenshots
 * for the V5 inspiration canvases (run outside sandbox: `node scripts/capture-v5-inspiration.mjs`).
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT_ROOT = path.resolve('docs/v5-inspiration');

async function waitForReady(page, extraMs = 5500) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(extraMs);
}

async function captureScrollSections(page, dir, prefix, maxShots = 6) {
  fs.mkdirSync(dir, { recursive: true });
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = 900;
  await page.screenshot({ path: path.join(dir, `${prefix}-01-hero.png`) });
  if (totalHeight <= vh * 1.15) return;
  const steps = Math.min(maxShots - 1, Math.max(1, Math.ceil((totalHeight - vh) / (vh * 0.85))));
  for (let i = 1; i <= steps; i++) {
    const y = Math.round(((totalHeight - vh) * i) / steps);
    await page.evaluate(pos => window.scrollTo({ top: pos, behavior: 'instant' }), y);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: path.join(dir, `${prefix}-${String(i + 1).padStart(2, '0')}.png`) });
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  // 1. Carter Ogunsola
  const carterDir = path.join(OUT_ROOT, 'carter-ogunsola', 'screenshots');
  fs.mkdirSync(carterDir, { recursive: true });
  await page.goto('https://carterogunsola.com/', { waitUntil: 'domcontentloaded' });
  await waitForReady(page, 6000);
  await page.screenshot({ path: path.join(carterDir, '01-home-press.png') });
  await page.mouse.wheel(0, 420);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(carterDir, '02-home-press-scrolled.png') });
  await page.keyboard.press('Meta+k');
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(carterDir, '03-command-palette.png') });
  for (const [slug, url] of [
    ['04-about', 'https://carterogunsola.com/about'],
    ['05-lab', 'https://carterogunsola.com/lab'],
    ['06-writing', 'https://carterogunsola.com/writing'],
    ['07-contact', 'https://carterogunsola.com/contact'],
  ]) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await waitForReady(page, 3500);
    await captureScrollSections(page, carterDir, slug, 3);
  }

  // 2. A24 Ravi Klaassens
  const a24Dir = path.join(OUT_ROOT, 'a24-raviklaassens', 'screenshots');
  fs.mkdirSync(a24Dir, { recursive: true });
  await page.goto('https://a24.raviklaassens.com/', { waitUntil: 'domcontentloaded' });
  await waitForReady(page, 6000);
  await page.screenshot({ path: path.join(a24Dir, '01-disc-shelf.png') });
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1300);
  await page.screenshot({ path: path.join(a24Dir, '02-disc-next.png') });
  await page.keyboard.press('Space');
  await page.waitForTimeout(1300);
  await page.screenshot({ path: path.join(a24Dir, '03-disc-flipped.png') });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(a24Dir, '04-film-detail.png') });

  // 3. Melon Studio
  const melonDir = path.join(OUT_ROOT, 'melon-studio', 'screenshots');
  await page.goto('https://melon.studio/', { waitUntil: 'domcontentloaded' });
  await waitForReady(page, 5000);
  await page.locator('button:has-text("Decline"), button:has-text("Accept")').first().click().catch(() => {});
  await page.waitForTimeout(500);
  await captureScrollSections(page, melonDir, 'home', 7);

  await browser.close();
  console.log('Saved all post-preloader screenshots under docs/v5-inspiration/');
}

main().catch(err => { console.error(err); process.exit(1); });
