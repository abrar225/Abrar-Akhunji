import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, webkit } from 'playwright';

const origin = process.env.PATCHBAY_ORIGIN || 'http://127.0.0.1:5183';
const directory = process.env.PATCHBAY_CAPTURE_DIR || 'docs/v5/evidence/motion-pass';
const browser = await (process.env.PATCHBAY_BROWSER === 'webkit' ? webkit.launch() :
  chromium.launch({ channel: 'chrome', args: ['--enable-unsafe-swiftshader'] }));
await mkdir(directory, { recursive: true });
const desktop = { viewport: { width: 1440, height: 900 } };
const mobile = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };
const result = [];
const errors = [];
const shot = (page, name, options = {}) => page.screenshot({ path: join(directory, name + '.jpg'), quality: 85, ...options });
const button = (page, name) => page.getByRole('button', { name, exact: true });

async function check(name, options, run) {
  const context = await browser.newContext(options);
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push({ url: page.url(), error: error.message }));
  try {
    result.push({ name, status: 'PASS', detail: await run(page, context) });
  } catch (error) {
    result.push({ name, status: 'FAIL', detail: error.message });
  } finally {
    await context.close();
  }
}

function visit(page, route) {
  return page.goto(origin + route, { waitUntil: 'domcontentloaded' });
}

async function themeRatio(page) {
  return page.locator('.reading-desk .patch-page-lead').evaluate(lead => {
    function luminance(color) {
      const channels = color.match(/\d+/g).slice(0, 3).map(value => Number(value) / 255)
        .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
      return channels.reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
    }
    const background = luminance(getComputedStyle(lead).backgroundColor);
    return [...lead.querySelectorAll('h1, p')].map(element => {
      const color = luminance(getComputedStyle(element).color);
      return (Math.max(color, background) + .05) / (Math.min(color, background) + .05);
    });
  });
}

try {
  await check('Writing masthead contrast, rapid theme changes and reload persistence', desktop, async page => {
    await visit(page, '/blog/');
    await page.locator('.reading-desk h1').waitFor();
    const light = await themeRatio(page);
    await button(page, 'Switch to dark theme').click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
    const dark = await themeRatio(page);
    assert.ok([...light, ...dark].length >= 4 && [...light, ...dark].every(ratio => ratio >= 4.5));
    await page.waitForTimeout(320);
    await shot(page, '1440-writing-dark');
    await page.locator('.patch-header-actions button').first().evaluate(element => { element.click(); element.click(); });
    await button(page, 'Switch to light theme').waitFor();
    await page.reload();
    await button(page, 'Switch to light theme').waitFor();
    return { light, dark };
  });

  await check('Work preview follows scroll first and supports mouse and keyboard overrides', desktop, async page => {
    await visit(page, '/work/');
    const figure = page.locator('.patch-work-preview');
    await figure.waitFor();
    const rows = page.locator('.patch-work-list li');
    const active = () => page.locator('.patch-work-list [data-preview=true]').getAttribute('data-project');
    const initial = await active();
    const third = await rows.nth(2).getAttribute('data-project');
    await rows.nth(2).evaluate(element => scrollBy(0, element.getBoundingClientRect().top - innerHeight * .45));
    await page.waitForFunction(slug => document.querySelector('.patch-work-list [data-preview=true]')?.dataset.project === slug, third);
    const second = await rows.nth(1).getAttribute('data-project');
    await rows.nth(1).hover();
    assert.equal(await active(), second);
    await page.mouse.move(1410, 120);
    assert.equal(await active(), third);
    await page.keyboard.press('Tab');
    await rows.nth(4).locator('a').focus();
    assert.equal(await active(), await rows.nth(4).getAttribute('data-project'));
    await rows.nth(4).locator('a').evaluate(link => link.blur());
    await page.waitForTimeout(310);
    await shot(page, '1440-work-preview');
    return { initial, scroll: third, hover: second };
  });

  await check('About trace draws and reverses with scrolling', desktop, async page => {
    await visit(page, '/about/');
    const path = page.locator('.patch-timeline-trace [data-draw]').first();
    await path.waitFor({ state: 'attached' });
    const offset = () => path.evaluate(element => Number.parseFloat(getComputedStyle(element).strokeDashoffset));
    const start = await offset();
    await page.locator('#experience').evaluate(element => scrollBy(0, element.getBoundingClientRect().top - innerHeight * .28));
    await page.waitForTimeout(200);
    const middle = await offset();
    assert.ok(middle < start && middle >= 0, `${middle} should be lower than ${start}`);
    await shot(page, '1440-about-trace');
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(180);
    assert.ok(await offset() > middle);
    return { start, middle };
  });

  await check('Hero rotates Request, Voice, and Screen and pauses on request', desktop, async page => {
    await visit(page, '/');
    const selection = '.patch-selectors button[aria-pressed=true]';
    await page.locator(selection).waitFor();
    assert.match(await page.locator(selection).textContent(), /Request/);
    await page.waitForFunction(selector => document.querySelector(selector)?.textContent.includes('Voice'), selection, { timeout: 11000 });
    await page.waitForFunction(selector => document.querySelector(selector)?.textContent.includes('Screen'), selection, { timeout: 11000 });
    await button(page, 'Pause autoplay').click();
    await button(page, 'Play project rotation').waitFor();
    assert.match(await page.locator(selection).textContent(), /Screen/);
    assert.match(page.url(), /project=framecast-studio/);
    await shot(page, '1440-hero-screen');
  });

  await check('First-visit loader responds to a pending asset, skips and stays dismissed', desktop, async page => {
    await page.route('**/products/packetlark.webp', async route => {
      await new Promise(resolve => setTimeout(resolve, 1700));
      await route.continue();
    });
    await visit(page, '/');
    const skip = button(page, 'Skip intro');
    await skip.waitFor();
    await shot(page, '1440-loading');
    await skip.press('Enter');
    await page.locator('.patch-loading').waitFor({ state: 'detached' });
    assert.equal(await page.evaluate(() => document.activeElement.id), 'patch-name');
    await page.reload();
    await page.locator('.patch-hero h1').waitFor();
    assert.equal(await page.locator('.patch-loading').count(), 0);
  });

  await check('Menu, cursor, click-origin ripple and favicon', desktop, async page => {
    await visit(page, '/contact/');
    await page.getByRole('heading', { name: 'Let’s talk.' }).waitFor();
    await shot(page, '1440-contact');
    const open = button(page, 'Open menu');
    await open.click();
    const menu = page.getByRole('dialog', { name: 'Portfolio menu' });
    await menu.waitFor();
    await page.waitForTimeout(650);
    await shot(page, '1440-menu');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#patch-menu').open);
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Open menu');
    await page.locator('.patch-contact-email').hover();
    await page.waitForFunction(() => document.querySelector('.patch-global-cursor').dataset.action === 'true');
    const grid = page.locator('.patch-ripple');
    await grid.scrollIntoViewIfNeeded();
    const cells = grid.locator('[data-ripple-cell]');
    await cells.nth(0).click();
    await page.waitForFunction(() => {
      const cells = document.querySelectorAll('.patch-ripple-dot');
      return Number(getComputedStyle(cells[0]).opacity) > Number(getComputedStyle(cells[cells.length - 1]).opacity) + .1;
    });
    await shot(page, '1440-footer');
    const iconUrl = await page.locator('link[rel=icon]').getAttribute('href');
    const response = await page.request.get(new URL(iconUrl, origin).href);
    assert.match(await response.text(), /M1 16C9 16 7 3 13 3/);
  });

  await check('Contact retains a usable email link and copy action', desktop, async (page, context) => {
    const chromiumClipboard = browser.browserType().name() === 'chromium';
    if (chromiumClipboard) await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await visit(page, '/contact/');
    const email = page.getByRole('link', { name: 'abrar@abrarakhunji.com', exact: true }).first();
    assert.equal(await email.getAttribute('href'), 'mailto:abrar@abrarakhunji.com');
    await button(page, 'Copy email').click();
    await page.getByRole('status').filter({ hasText: 'Email address copied.' }).waitFor();
    if (chromiumClipboard) assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'abrar@abrarakhunji.com');
  });

  await check('Phone layout and reduced motion fallbacks', mobile, async page => {
    await visit(page, '/contact/');
    await page.getByRole('heading', { name: 'Let’s talk.' }).waitFor();
    await shot(page, '390-contact');
    const menu = page.getByRole('dialog', { name: 'Portfolio menu' });
    await button(page, 'Open menu').tap();
    for (const name of ['Work', 'Résumé', 'Contact']) {
      assert.ok(await menu.getByRole('link', { name, exact: true }).isVisible());
    }
    assert.equal(await page.getByRole('navigation', { name: 'Primary' }).isVisible(), false);
    await page.waitForTimeout(650);
    await shot(page, '390-menu');
    await menu.getByRole('link', { name: 'Work', exact: true }).tap();
    await page.waitForURL('**/work/');
    await page.locator('.patch-work-inline').first().waitFor();
    await shot(page, '390-work');
    assert.equal(await page.locator('.patch-global-cursor').count(), 0);
    for (const path of ['/about/', '/blog/', '/contact/']) {
      await visit(page, path);
      await page.locator('main h1').waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path);
    }

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await visit(page, '/about/');
    await page.locator('[data-draw]').first().waitFor({ state: 'attached' });
    assert.equal(await page.locator('[data-draw]').first().evaluate(element => getComputedStyle(element).strokeDasharray), 'none');
    await shot(page, '390-about-reduced', { fullPage: true });
    await visit(page, '/');
    await page.locator('.patch-selectors').waitFor();
    assert.equal(await page.locator('.patch-autoplay, .patch-loading, .patch-cursor-field, .patch-assembly canvas').count(), 0);
  });

  for (const viewport of [desktop, mobile]) {
    await check(`Writing cover preserves its intrinsic size ratio at ${viewport.viewport.width}px`, viewport, async page => {
      await visit(page, '/blog/');
      await page.waitForFunction(() => document.querySelector('.patch-desk-cover img')?.naturalWidth > 0);
      const cover = page.locator('.patch-desk-cover');
      const geometry = await cover.evaluate(wrapper => {
        const image = wrapper.querySelector('img');
        const { width, height } = image.getBoundingClientRect();
        return { error: Math.abs(height - width * image.naturalHeight / image.naturalWidth),
          gap: Math.abs(wrapper.getBoundingClientRect().height - height) };
      });
      assert.ok(geometry.error < 1 && geometry.gap < 1, JSON.stringify(geometry));
      await cover.scrollIntoViewIfNeeded();
      await shot(page, `${viewport.viewport.width}-writing-cover`);
      return geometry;
    });
  }
} finally {
  await browser.close();
  await writeFile(join(directory, 'checks.json'), JSON.stringify({ result, errors }, null, 2) + '\n');
  console.log(JSON.stringify({ result, errors }, null, 2));
  if (errors.length || result.some(check => check.status === 'FAIL')) process.exitCode = 1;
}
