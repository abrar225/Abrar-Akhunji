import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildContributionCalendar, getContributionStats, contributionHeight, contributionLabel, dateNumber } from '../../src/lib/github/calendar.js';

const day = (date, count, level = count ? 1 : 0) => ({ date, count, level });
test('calendar preserves authentic levels, zeroes, and unavailable padding', () => {
  const calendar = buildContributionCalendar([day('2026-10-26', 0), day('2026-10-27', 14, 3), day('2026-10-28', 1, 1)], '2026-10-28');
  assert.equal(calendar.weeks.length, 1);
  assert.deepEqual(calendar.cells.map(cell => cell.weekday), [0, 1, 2, 3, 4, 5, 6]);
  assert.equal(calendar.cells[0].count, null); assert.equal(calendar.cells[0].available, false); assert.equal(calendar.cells[0].future, false);
  assert.equal(calendar.cells[1].count, 0); assert.equal(calendar.cells[1].available, true);
  assert.equal(calendar.cells[2].level, 3); assert.equal(calendar.cells[4].count, null); assert.equal(calendar.cells[4].future, true);
});
test('calendar uses UTC across month, year, leap-day and DST boundaries', () => {
  const calendar = buildContributionCalendar([day('2024-02-28', 1), day('2024-02-29', 2), day('2024-03-01', 3)], '2024-03-01');
  assert.equal(calendar.cells.find(d => d.date === '2024-02-29').weekday, 4);
  assert.deepEqual(calendar.months.map(m => m.label), ['Mar']);
  const year = buildContributionCalendar([day('2025-12-31', 1), day('2026-01-01', 2)], '2026-01-01');
  assert.equal(year.weeks.length, 1); assert.equal(year.cells[0].date, '2025-12-28');
  assert.equal(dateNumber('2026-03-09') - dateNumber('2026-03-08'), 86_400_000);
  assert.throws(() => dateNumber('2026-02-30'), /Invalid calendar date/);
});
test('streaks break on missing or inactive dates and respect snapshot boundary', () => {
  const stats = getContributionStats({ fetchedAt: '2026-01-08T15:00:00Z', totalContributions: 12, days: [day('2026-01-01', 2), day('2026-01-02', 3), day('2026-01-03', 0), day('2026-01-05', 1), day('2026-01-07', 2), day('2026-01-08', 4), day('2026-01-09', 100)] });
  assert.equal(stats.longestStreak, 2); assert.equal(stats.currentStreak, 2); assert.equal(stats.activeDays, 5);
  assert.equal(stats.peak.date, '2026-01-08'); assert.equal(stats.peak.count, 4); assert.equal(stats.totalContributions, 12);
  const inactive = getContributionStats({ fetchedAt: '2026-01-03T00:00:00Z', totalContributions: 5, days: [day('2026-01-01', 2), day('2026-01-02', 3), day('2026-01-03', 0)] });
  assert.equal(inactive.currentStreak, 2, 'an empty in-progress day keeps yesterday’s streak');
  const pending = getContributionStats({ fetchedAt: '2026-01-03T00:00:00Z', totalContributions: 5, days: [day('2026-01-01', 2), day('2026-01-02', 3)] });
  assert.equal(pending.currentStreak, 2, 'today may not have a reported record yet');
  const broken = getContributionStats({ fetchedAt: '2026-01-04T00:00:00Z', totalContributions: 5, days: [day('2026-01-01', 2), day('2026-01-02', 3), day('2026-01-03', 0)] });
  assert.equal(broken.currentStreak, 0, 'a full inactive day breaks the streak');
});
test('square-root heights preserve zero and the maximum without changing counts', () => {
  assert.equal(contributionHeight(0, 100, 200), 0);
  assert.equal(contributionHeight(25, 100, 200), 100);
  assert.equal(contributionHeight(100, 100, 200), 200);
  assert.equal(contributionLabel({ date: '2026-01-01', count: 1 }), '1 contribution on 1 Jan 2026');
  assert.equal(contributionLabel({ date: '2026-01-01', count: null, available: false }), 'No data for 1 Jan 2026');
});
test('real snapshot remains internally consistent and its peak date is exact', () => {
  const snapshot = JSON.parse(fs.readFileSync(new URL('../../src/data/github-contributions.json', import.meta.url)));
  const stats = getContributionStats(snapshot), calendar = buildContributionCalendar(snapshot.days, stats.throughDate);
  assert.equal(snapshot.days.reduce((sum, d) => sum + d.count, 0), snapshot.dailyTotalContributions);
  assert.equal(calendar.cells.filter(d => d.available).length, snapshot.days.length);
  assert.deepEqual(stats.peak, snapshot.days.reduce((a, b) => a.count >= b.count ? a : b));
  for (const d of snapshot.days) { assert.ok(d.level >= 0 && d.level <= 4); assert.ok(d.count >= 0); }
});
