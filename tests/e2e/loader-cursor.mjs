// Run with: ego-browser nodejs < tests/e2e/loader-cursor.mjs
// Reuses the browser task space for this goal; does not launch another browser.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const task = await taskSpace('Original workshop opening revision');
const page = await task.newPage();
const base = 'http://127.0.0.1:5173';
const output = '/Users/abrarakhunji/Desktop/Abrar-Portfolio/abrar-portfolio-web/docs/loader-cursor/verification';
const report = { checks: [], views: [], errors: [], resizeNotifications: [] };
await fs.mkdir(output, { recursive: true });
const pass = name => { report.checks.push(name); console.log('PASS', name); };
const state = () => page.evaluate(() => {
  const n = document.querySelector('.intent-cursor');
  const rect = n.getBoundingClientRect();
  return { visible: n.classList.contains('is-visible'), kind: n.dataset.kind, label: n.dataset.label, x: rect.x, y: rect.y, native: getComputedStyle(document.body).cursor, labelBox: n.querySelector('.cursor-label').getBoundingClientRect().toJSON() };
});
const waitKind = kind => page.waitForFunction(k => document.querySelector('.intent-cursor')?.dataset.kind === k && document.querySelector('.intent-cursor')?.classList.contains('is-visible'), kind);
const metrics = async (width, height, mobile = false) => {
  await page.cdp('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  await page.cdp('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: 1 });
};
const scrollTo = selector => page.evaluate(s => { const n = document.querySelector(s); window.scrollTo({ top: scrollY + n.getBoundingClientRect().top - 150, behavior: 'instant' }); }, selector);
const hoverCenter = async selector => {
  const point = await page.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x + r.width / 2, y: Math.max(100, Math.min(innerHeight - 100, r.y + r.height / 2)) }; }, selector);
  await page.mouse.move(point.x, point.y);
  return point;
};
try {
  // This notification was reproduced on #home with no intro present; retain it separately.
  await page.cdp('Page.addScriptToEvaluateOnNewDocument', { source: "window.__loaderErrors=[];window.__resizeNotifications=[];addEventListener('error',e=>(e.message==='ResizeObserver loop completed with undelivered notifications.'?window.__resizeNotifications:window.__loaderErrors).push(e.message));addEventListener('unhandledrejection',e=>window.__loaderErrors.push(String(e.reason)));" });
  await page.cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  for (const [width, height] of [[1440, 900], [768, 1000], [390, 844], [360, 800], [844, 390]]) {
    await metrics(width, height, width < 768 || height < 500);
    await page.goto(base + '/');
    await page.waitForSelector('.intro-loader[data-phase=playing]');
    assert.equal(await page.evaluate(() => document.querySelector('.site-experience').inert), true);
    await page.waitForFunction(() => parseInt(document.querySelector('.intro-percentage')?.textContent) >= 95);
    const layout = await page.evaluate(() => {
      const rect = s => document.querySelector(s).getBoundingClientRect().toJSON();
      return { statement: rect('.intro-statement'), skip: rect('.intro-skip'), counter: rect('.intro-progress'), w: innerWidth, h: innerHeight, color: getComputedStyle(document.querySelector('.intro-loader')).backgroundColor, font: getComputedStyle(document.querySelector('.intro-line')).fontFamily, fullText: [...document.querySelectorAll('.intro-letter')].every(n => +getComputedStyle(n).opacity > .98), overflow: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    assert.ok(['rgb(232, 235, 226)', 'rgb(32, 37, 31)'].includes(layout.color)); assert.match(layout.font, /Bricolage/); assert.equal(layout.overflow, false);
    assert.ok(layout.fullText, `${width}: full statement becomes legible`);
    assert.ok(layout.skip.x >= layout.counter.right + 6, `${width}: skip and counter never overlap`);
    assert.ok(layout.statement.bottom < layout.counter.y, `${width}: statement clears the progress`);
    assert.ok(layout.skip.bottom <= height && layout.skip.height >= 44);
    await page.screenshot({ path: `${output}/${width}x${height}-loader.png` });
    report.views.push({ width, height, layout });
    await page.waitForSelector('.intro-loader', { state: 'detached', timeout: 9000 });
    assert.equal(await page.evaluate(() => document.querySelector('.site-experience').inert || document.documentElement.style.overflow === 'hidden'), false);
    assert.deepEqual(await page.evaluate(() => window.__loaderErrors), []);
    report.resizeNotifications.push(...await page.evaluate(() => window.__resizeNotifications));
    console.log('PASS loader viewport', width, height);
  }
  pass('Reference colors, font, complete word reveal, responsive non-overlapping controls and automatic release at five viewports');

  await metrics(1440, 900);
  await page.goto(base + '/'); await page.waitForSelector('.intro-loader');
  await page.click('.intro-skip'); await page.waitForSelector('.intro-loader', { state: 'detached' });
  await page.mouse.move(410, 190); await waitKind('dot');
  let cursor = await state(); assert.equal(cursor.x, 410); assert.equal(cursor.y, 190); assert.equal(cursor.native, 'none');
  pass('Skip dismisses; dot is visible over ordinary content and its hotspot equals mouse coordinates');
  await page.hover('.desktop-nav a[href="/work/"]'); await waitKind('link');
  await page.mouse.down(); assert.equal(await page.evaluate(() => document.querySelector('.intent-cursor').classList.contains('is-pressed')), true); await page.mouse.up();
  await page.click('.desktop-nav a[href="/work/"]'); await page.waitForURL('**/work/'); await page.waitForSelector('.work-card');
  assert.equal(await page.evaluate(() => document.querySelectorAll('.intro-loader').length), 0);
  await page.mouse.move(700, 190); await waitKind('dot');
  pass('Links and press feedback work; cursor remains available across routes without replaying intro');

  await page.goto(base + '/#contact'); await page.waitForSelector('.footer-river canvas');
  assert.equal(await page.evaluate(() => document.querySelectorAll('.intro-loader').length), 0);
  await scrollTo('.footer-river canvas'); await page.waitForSelector('.footer-river canvas[data-ready=true]'); await hoverCenter('.footer-river canvas'); await waitKind('hand');
  await page.screenshot({ path: `${output}/cursor-hand.png` });
  await scrollTo('.ascii-name canvas'); await hoverCenter('.ascii-name canvas'); await waitKind('pixel');
  assert.equal((await state()).label, 'Scatter');
  await page.screenshot({ path: `${output}/cursor-pixel.png` });
  await scrollTo('.github-city canvas'); await hoverCenter('.github-city canvas'); await waitKind('pixel');
  assert.equal((await state()).label, 'Inspect');
  pass('Deep links bypass intro; river uses a hand, signature and contribution city use the pixel pointer');
  const riverX = await page.evaluate(() => { const r = document.querySelector('.footer-river canvas').getBoundingClientRect(); return r.x + r.width / 2; });
  await scrollTo('.hero-copy'); await page.mouse.move(riverX, 200); await waitKind('dot');
  const beforeScroll = await state();
  await scrollTo('.footer-river canvas'); await waitKind('hand');
  cursor = await state(); assert.equal(cursor.x, beforeScroll.x); assert.equal(cursor.y, beforeScroll.y);
  pass('Scrolling with a stationary pointer preserves its position and visibility');

  await page.goto(base + '/#home'); await page.waitForSelector('.hero-copy');
  await page.click('button[aria-label="Sound and creature settings"]');
  await page.hover('#sound-panel input[type="range"] >> nth=0');
  await page.waitForFunction(() => !document.documentElement.classList.contains('custom-cursor-active'));
  assert.equal((await state()).visible, false);
  await page.click('button[aria-label="Close sound settings"]');
  await page.evaluate(() => { const s = getSelection(), r = document.createRange(); r.selectNodeContents(document.querySelector('.hero-description')); s.removeAllRanges(); s.addRange(r); });
  await page.mouse.move(600, 260); await page.waitForFunction(() => !document.documentElement.classList.contains('custom-cursor-active'));
  await page.evaluate(() => getSelection().removeAllRanges());
  await page.mouse.move(600, 270); await waitKind('dot');
  await page.keyboard.press('Tab'); assert.equal((await state()).visible, false);
  pass('Native range controls, selected text and keyboard navigation release the custom cursor');
  await page.mouse.move(800, 290); await waitKind('dot');
  await page.evaluate(() => { window.__cursorPaints = 0; window.__cursorObserver = new MutationObserver(() => window.__cursorPaints++); window.__cursorObserver.observe(document.querySelector('.intent-cursor'), { subtree: true, attributes: true, attributeFilter: ['style'] }); });
  await page.mouse.move(820, 310);
  await page.waitForFunction(() => { const m = new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.cursor-halo')).transform); return Math.abs(m.m41) + Math.abs(m.m42) < .15; });
  const paints = await page.evaluate(() => window.__cursorPaints);
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 350)));
  assert.equal(await page.evaluate(() => window.__cursorPaints), paints);
  pass('Pointer animation settles and stops writing to the DOM while idle');

  for (const preference of ['reduce', 'no-preference']) {
    await page.cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: preference }] });
    await page.goto(base + '/');
    if (preference === 'reduce') {
      await page.waitForSelector('.hero-copy'); assert.equal(await page.evaluate(() => document.querySelectorAll('.intro-loader').length), 0);
      await page.mouse.move(400, 250); assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.intent-cursor')).display), 'none');
    } else {
      await page.waitForSelector('.intro-loader'); await page.keyboard.press('Escape'); await page.waitForSelector('.intro-loader', { state: 'detached' });
    }
  }
  pass('Reduced motion bypasses opening and uses native pointer; Escape releases the normal intro');
  await page.goto(base + '/'); await page.waitForSelector('.intro-loader'); await page.keyboard.press('Tab'); await page.waitForSelector('.intro-loader', { state: 'detached' });
  assert.equal(await page.evaluate(() => document.querySelector('.site-experience').inert), false);
  pass('Tab dismisses immediately without trapping keyboard users');
  await page.mouse.move(600, 300); await waitKind('dot');
  await page.cdp('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] });
  await page.waitForFunction(() => !document.documentElement.classList.contains('custom-cursor-active'));
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.intent-cursor')).display), 'none');
  pass('Forced colors restores native cursor');
  await page.cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await metrics(390, 844, true); await page.goto(base + '/#contact'); await page.waitForSelector('.hero-copy');
  await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: 200, clientY: 300, bubbles: true })));
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('custom-cursor-active')), false);
  pass('Touch input retains the native touch experience');
  report.errors = await page.evaluate(() => window.__loaderErrors);
  assert.deepEqual(report.errors, []);
  report.verdict = 'PASS';
} catch (error) {
  console.error(await page.evaluate(() => { const n = document.querySelector('.intent-cursor'), r = n?.getBoundingClientRect(); return { hidden: document.hidden, cursor: n?.outerHTML.slice(0, 300), under: r ? document.elementFromPoint(r.x, r.y)?.outerHTML.slice(0, 200) : null }; }));
  report.verdict = 'FAIL'; report.error = error.stack || String(error); console.error(error); process.exitCode = 1;
} finally {
  await page.cdp('Emulation.setEmulatedMedia', { features: [] });
  await page.cdp('Emulation.clearDeviceMetricsOverride');
  await page.cdp('Emulation.setTouchEmulationEnabled', { enabled: false });
  await fs.writeFile(output + '/report.json', JSON.stringify(report, null, 2));
  console.log('VERDICT:', report.verdict);
}
