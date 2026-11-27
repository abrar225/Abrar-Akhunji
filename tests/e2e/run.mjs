import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const results = [];
let server;
let testBrowser;

function check(name, condition, detail = '') {
  const ok = Boolean(condition);
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : ` — ${detail}`}`);
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // not up yet
    }
    await sleep(500);
  }
  return false;
}

async function main() {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  server = spawn(npx, ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let serverLog = '';
  server.stdout.on('data', (chunk) => { serverLog += chunk; });
  server.stderr.on('data', (chunk) => { serverLog += chunk; });

  if (!(await waitForServer(`${BASE}/`))) {
    throw new Error(`Preview server did not start.\n${serverLog}`);
  }

  const browser = await chromium.launch({ headless: true, channel: process.env.PATCHBAY_CHROME_CHANNEL || undefined });
  testBrowser = browser;
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.route('**/*', route => new URL(route.request().url()).origin === BASE ? route.continue() : route.abort());
  await context.addInitScript(() => {
    try { sessionStorage.setItem('patchbay-arrived', '1'); } catch { /* ignore */ }
  });

  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource: net::ERR_FAILED')) consoleErrors.push([message.text(), message.location().url].filter(Boolean).join(' — '));
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  // ── Home ────────────────────────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1', { timeout: 20_000 });
  await page.waitForTimeout(900);

  if (process.env.PORTFOLIO_CAPTURE_DIR) {
    await page.screenshot({ path: `${process.env.PORTFOLIO_CAPTURE_DIR}/desktop.png`, animations: 'disabled' });
  }
  const home = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText || '',
    canonical: document.querySelector('link[rel=canonical]')?.href,
    metaDescription: document.querySelector('meta[name=description]')?.content || '',
    hasServices: Boolean(document.querySelector('#services')),
    hasHireLink: [...document.querySelectorAll('a')].some((a) => a.getAttribute('href') === '/hire/'),
    imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
  }));

  check('home renders the V5 identity', /Abrar\s+Akhunji/i.test(home.h1), home.h1);
  check('home title targets Ahmedabad', /Ahmedabad/.test(home.title), home.title);
  check('home canonical is the root URL', home.canonical === 'https://abrarakhunji.com/', home.canonical);
  check('home description mentions Ahmedabad', /Ahmedabad/.test(home.metaDescription), home.metaDescription);
  check('home has the services section', home.hasServices);
  check('home links to the hire page', home.hasHireLink);
  check('every home image has an alt attribute', home.imagesWithoutAlt === 0, `${home.imagesWithoutAlt} missing`);
  const inkCursor = page.locator('.patch-cursor-field');
  await page.mouse.move(340, 250);
  await inkCursor.waitFor({state:'attached'});
  const firstPoint = await inkCursor.evaluate(node => node.style.transform);
  await page.mouse.move(770, 300);
  await page.waitForFunction(point => document.querySelector('.patch-cursor-field').style.transform !== point, firstPoint);
  check('the desktop ink responds to pointer movement', await inkCursor.count() === 1);

  const writingLinks = page.locator('#writing ol a');
  check('home presents three direct article links', await writingLinks.count() === 3);
  await writingLinks.first().focus();
  check('home article link is keyboard reachable', await writingLinks.first().evaluate(link => link === document.activeElement));

  const internalLinks = await page.evaluate(() => [...new Set(
    [...document.querySelectorAll('a[href^="/"]')]
      .map((a) => a.getAttribute('href').split('#')[0])
      .filter(Boolean)
  )].slice(0, 20));
  const brokenLinks = [];
  for (const href of internalLinks) {
    const response = await page.request.get(`${BASE}${href}`);
    if (response.status() >= 400) brokenLinks.push(`${href} → ${response.status()}`);
  }
  check('home internal links resolve', brokenLinks.length === 0, brokenLinks.join(', '));

  // ── Blog list ────────────────────────────────────────────────
  await page.goto(`${BASE}/blog/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  const blogList = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.innerText || '',
    title: document.title,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    postLinks: document.querySelectorAll('a[href^="/blog/"]').length,
  }));
  check('blog list uses the Neural Log brand', /The Neural Log/.test(blogList.h1), blogList.h1);
  check('blog list canonical has a trailing slash', blogList.canonical === 'https://abrarakhunji.com/blog/', blogList.canonical);
  check('blog list renders at least 50 posts', blogList.postLinks >= 50, `${blogList.postLinks} links`);

  await page.getByRole('button', { name: 'Tech Tree' }).click();
  await page.waitForTimeout(700);
  const treeText = await page.locator('body').innerText();
  check('tech tree renders branches', treeText.includes('Autonomous Agent Memory'), treeText.slice(0, 160));
  const firstBranch = page.locator('button').filter({ hasText: /\d+\/\d+/ }).first();
  if (await firstBranch.count()) {
    await firstBranch.click();
    await page.waitForTimeout(900);
    const expandedText = await page.locator('body').innerText();
    check('tech tree expands and shows node states', /(level \d|locked)/i.test(expandedText), expandedText.slice(-220));
  } else {
    check('tech tree expands and shows node states', false, 'no expandable branch');
  }

  // ── Blog post ────────────────────────────────────────────────
  const slug = 'hy-memory-2-0-tencent-30b-a3b-attributed-reinforcement-learning';
  await page.goto(`${BASE}/blog/${slug}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('article h1', { timeout: 20_000 });
  await page.waitForSelector('.markdown-body', { timeout: 20_000 });

  const post = await page.evaluate(() => ({
    canonical: document.querySelector('link[rel=canonical]')?.href,
    robots: document.querySelector('meta[name=robots]')?.content || '',
    jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
    headline: document.querySelector('article h1')?.innerText || '',
    hasDeveloperMode: Boolean(document.querySelector('[aria-label="Developer mode"]')),
    hasArticle: Boolean(document.querySelector('.markdown-body')),
    hasFaqSchema: document.documentElement.innerHTML.includes('"@type":"FAQPage"')
      || document.documentElement.innerHTML.includes('"@type": "FAQPage"'),
  }));

  check('post canonical uses the trailing-slash URL', post.canonical === `https://abrarakhunji.com/blog/${slug}/`, post.canonical);
  check('post is indexable', /index/.test(post.robots), post.robots);
  check('post emits structured data', post.jsonLd >= 3, `${post.jsonLd} blocks`);
  check('post includes FAQ schema', post.hasFaqSchema);
  check('post has a reading-mode toggle', post.hasDeveloperMode);
  check('post renders article content', post.hasArticle);

  await page.getByRole('radio', { name: 'Developer mode' }).click();
  await page.waitForTimeout(500);
  const developerChecked = await page.getByRole('radio', { name: 'Developer mode' }).getAttribute('aria-checked');
  check('developer mode can be selected', developerChecked === 'true', developerChecked);

  // ── Hire ─────────────────────────────────────────────────────
  await page.goto(`${BASE}/hire/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  const hire = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.innerText || '',
    canonical: document.querySelector('link[rel=canonical]')?.href,
    faqCount: document.querySelectorAll('details').length,
    body: document.body.innerText,
  }));
  check('hire page loads', hire.h1.length > 10, hire.h1);
  check('hire canonical is /hire/', hire.canonical === 'https://abrarakhunji.com/hire/', hire.canonical);
  check('hire page covers every target location', ['Ahmedabad', 'Gandhinagar', 'Bangalore', 'Remote'].every((city) => hire.body.includes(city)));
  check('hire page has an FAQ', hire.faqCount >= 5, `${hire.faqCount} entries`);

  // ── 404 ──────────────────────────────────────────────────────
  await page.goto(`${BASE}/this-page-does-not-exist/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  const notFound = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.innerText || '',
    body: document.body.innerText,
    robots: document.querySelector('meta[name=robots]')?.content || '',
  }));
  check('unknown route shows the custom 404', /This signal ends here/.test(`${notFound.h1}\n${notFound.body}`), notFound.h1);
  check('404 is noindex', /noindex/.test(notFound.robots), notFound.robots);

  // ── Theme ────────────────────────────────────────────────────
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  await page.waitForTimeout(500);
  const beforeTheme = await page.evaluate(() => document.documentElement.className);
  const themeButton = page.locator('button[aria-label*="theme" i]').first();
  if (await themeButton.count()) {
    await themeButton.click();
    await page.waitForTimeout(800);
    const afterTheme = await page.evaluate(() => ({
      className: document.documentElement.className,
      stored: localStorage.getItem('theme'),
    }));
    check('theme toggle updates the document', afterTheme.className !== beforeTheme, `${beforeTheme} → ${afterTheme.className}`);
    check('theme choice is persisted', afterTheme.stored === (afterTheme.className.includes('light') ? 'light' : 'dark'), afterTheme.stored);
  } else {
    check('theme toggle is reachable', false, 'no button with a theme aria-label');
  }

  // ── Mobile ───────────────────────────────────────────────────
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobileContext.addInitScript(() => {
    try { sessionStorage.setItem('patchbay-arrived', '1'); } catch { /* ignore */ }
  });
  const mobile = await mobileContext.newPage();
  await mobile.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await mobile.waitForSelector('h1');
  await mobile.waitForTimeout(800);

  if (process.env.PORTFOLIO_CAPTURE_DIR) {
    await mobile.screenshot({ path: `${process.env.PORTFOLIO_CAPTURE_DIR}/mobile.png`, animations: 'disabled', fullPage: true });
  }
  const mobileLayout = await mobile.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  check('mobile home has no horizontal overflow', mobileLayout.scrollWidth <= mobileLayout.innerWidth + 2, JSON.stringify(mobileLayout));

  check('touch devices mount no custom cursor',
    await mobile.locator('.patch-cursor-field').count() === 0);

  const navButton = mobile.locator('button[aria-label="Open menu"]');
  check('mobile navigation trigger exists', (await navButton.count()) === 1);
  if (await navButton.count()) {
    await navButton.click();
    await mobile.waitForTimeout(500);
    await mobile.keyboard.press('Escape');
    check('Escape closes the mobile navigation and restores focus', await navButton.evaluate(button => document.activeElement === button));
    await navButton.click();
    const hireItem = mobile.getByRole('navigation', { name: 'Site directory' }).getByRole('link', { name: 'Hire' });
    if (await hireItem.count()) {
      await hireItem.first().click();
      await mobile.waitForURL('**/hire/', { timeout: 10_000 });
      check('mobile hire navigation works', mobile.url().endsWith('/hire/'), mobile.url());
    } else {
      check('mobile hire navigation works', false, 'Hire item not found');
    }
  }
  await mobile.goto(`${BASE}/work/`);
  await mobile.getByRole('button', { name:'COMPUTER VISION', exact:true }).tap();
  await mobile.getByRole('status').filter({hasText:'1 project'}).waitFor();
  check('mobile can filter projects in the document flow', await mobile.locator('.patch-work-list li').count()===1);

  await page.goto(`${BASE}/work/`);
  await page.waitForSelector('.patch-work-list');
  check('archive exposes all ten case studies', await page.locator('.patch-work-list li').count() === 10);
  await page.locator('.patch-work-list li a').nth(1).focus();
  await page.locator('.patch-work-preview figcaption').filter({hasText:'PacketLark'}).waitFor();
  check('desktop project preview follows keyboard focus', await page.locator('.patch-work-preview').isVisible());
  await page.goto(`${BASE}/work/packetlark/`);
  const zoom = page.getByRole('button', { name: 'Inspect interface' });
  await zoom.click();
  const dialog = page.getByRole('dialog', { name: 'PacketLark interface' });
  await dialog.waitFor();
  await page.keyboard.press('Escape');
  check('project image can be expanded and dismissed with focus restored',
    !await dialog.isVisible() && await zoom.evaluate(button => document.activeElement === button));

  for (const slug of ['fixo-flow','packetlark','framecast-studio','cattle-breed']) {
    const response = await page.goto(`${BASE}/work/${slug}/`);
    await page.waitForSelector('.patch-case-body');
    check(`${slug} case study loads directly`, response.status() === 200 && await page.locator('.patch-case-body h2').count() >= 6);
    check(`${slug} has the canonical URL`, await page.locator('link[rel=canonical]').getAttribute('href') === `https://abrarakhunji.com/work/${slug}/`);
  }
  await page.goto(`${BASE}/work/not-a-project/`);
  await page.waitForSelector('meta[name=robots][content*=noindex]', {state:'attached'});
  check('unknown project is noindex', /noindex/.test(await page.locator('meta[name=robots]').getAttribute('content')));
  await page.goto(`${BASE}/?project=packetlark#work`);
  const activeProject = page.locator('#patch-project');
  await activeProject.waitFor();
  check('project query selects PacketLark', await activeProject.innerText() === 'PacketLark');
  const selector = page.getByRole('group', { name: 'Choose which project to follow' });
  await selector.getByRole('button', { name: /Fixo Flow/ }).click();
  await selector.getByRole('button', { name: /Framecast/ }).click();
  const packetLark = selector.getByRole('button', { name: /PacketLark/ });
  await packetLark.focus();
  await packetLark.press('Enter');
  await selector.locator('button[aria-pressed=true]').filter({ hasText: 'PacketLark' }).waitFor();
  check('keyboard selection updates the evidence and selected state',
    await activeProject.innerText() === 'PacketLark'
    && await packetLark.getAttribute('aria-pressed') === 'true'
    && /PacketLark/i.test(await page.locator('#engineering').innerText()));
  check('selection preserves the work fragment', new URL(page.url()).hash === '#work');
  check('featured work retains a direct case study link',
    await page.getByRole('link', { name: 'Read the case study' }).getAttribute('href') === '/work/packetlark/');
  await page.goto(`${BASE}/?project=unknown#work`);
  await activeProject.waitFor();
  check('unknown project query uses the default', await activeProject.innerText() === 'PacketLark');

  const navigation = page.getByRole('navigation', { name: 'Primary' });
  await navigation.getByRole('link', { name: 'Work' }).click();
  await page.locator('.patch-work-page h1').waitFor();
  check('page transition focuses the new content and leaves one route',
    await page.locator('.patch-route:focus').count() === 1
    && await page.locator('.patch-route').count() === 1
    && await page.locator('#main-content').count() === 0);
  await page.getByRole('link', { name: 'Abrar Akhunji, home' }).click();
  await page.locator('#patch-name').waitFor();
  check('returning home after a transition restores focus to the route',
    await page.locator('.patch-route:focus').count() === 1);

  for (const path of ['work/', 'work/packetlark/', 'blog/', 'about/', 'hire/', 'contact/', 'terms/', 'privacy/', 'missing-page/']) {
    await page.goto(`${BASE}/${path}`);
    await page.locator('.patch-route h1').waitFor();
    check(`/${path} shares V5 chrome`, await page.locator('.patch-header').count() === 1
      && await page.locator('.patch-footer').count() === 1 && await page.locator('.site-header').count() === 0);
  }

  const fallbackContext = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const fallback = await fallbackContext.newPage();
  await fallback.goto(`${BASE}/#work`);
  await fallback.getByRole('group', { name: 'Choose which project to follow' }).getByRole('button', { name: /PacketLark/ }).click();
  check('reduced motion keeps projects selectable', await fallback.locator('#patch-project').innerText() === 'PacketLark');
  const poster = fallback.locator('.patch-author img');
  await poster.scrollIntoViewIfNeeded();
  check('reduced motion keeps the printed portrait visible',
    await poster.evaluate(img => img.complete && img.naturalWidth > 0)
    && await fallback.locator('.patch-route').evaluate(route => getComputedStyle(route).transform === 'none'));
  await fallbackContext.close();

  await mobileContext.close();

  check('no uncaught page errors', pageErrors.length === 0, pageErrors.join(' | '));
  check('no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));

  await browser.close();

  const failed = results.filter((result) => !result.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  if (failed.length > 0) {
    console.error('\nFailures:');
    failed.forEach((failure) => console.error(`- ${failure.name}: ${failure.detail}`));
    process.exitCode = 1;
  }
  if (pageErrors.length > 0) console.error(`\nPage errors:\n${pageErrors.join('\n')}`);
  if (consoleErrors.length > 0) console.error(`\nConsole errors:\n${consoleErrors.join('\n')}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (testBrowser) await testBrowser.close().catch(() => {});
    if (server) server.kill('SIGTERM');
  });
