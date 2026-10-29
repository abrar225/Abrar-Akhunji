import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSnapshot, refresh } from '../../scripts/fetch-github.mjs';
const response = () => ({ data: { user: { login: 'abrar225', url: 'https://github.com/abrar225', contributionsCollection: { contributionCalendar: { totalContributions: 99, weeks: [{ contributionDays: [
  { date: '2026-10-27', weekday: 2, contributionCount: 2, contributionLevel: 'FIRST_QUARTILE' },
  { date: '2026-10-28', weekday: 3, contributionCount: 0, contributionLevel: 'NONE' },
] }] } } } } });
test('GitHub reported totals and individual days remain independent and unscaled', () => {
  const snapshot = buildSnapshot(response(), 'abrar225', '2026-10-28T18:00:00Z');
  assert.equal(snapshot.totalContributions, 99); assert.equal(snapshot.dailyTotalContributions, 2);
  assert.deepEqual(snapshot.days.map(day => [day.count, day.level]), [[2, 1], [0, 0]]);
});
test('ambiguous or malformed calendars cannot replace a valid snapshot', () => {
  for (const mutate of [r => { r.data.user.login = 'someone-else'; }, r => { r.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays[1].date = '2026-10-27'; }, r => { r.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays[0].weekday = 0; }, r => { r.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays[0].contributionCount = -1; }, r => { r.errors = [{ message: 'request failed' }]; }]) {
    const raw = response(); mutate(raw); assert.throws(() => buildSnapshot(raw, 'abrar225'));
  }
});
test('an invalid refresh request leaves the last good calendar byte-for-byte intact', async () => {
  const path = new URL('../../src/data/github-contributions.json', import.meta.url); const before = readFileSync(path);
  await assert.rejects(refresh('not a username')); assert.deepEqual(readFileSync(path), before);
});
