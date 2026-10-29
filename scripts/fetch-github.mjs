import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { writeFileSync, renameSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../src/data/github-contributions.json', import.meta.url));
const query = `query($username: String!) {
  user(login: $username) {
    login url
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}`;
const levels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const validUsername = name => typeof name === 'string' && /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(name);
const nonnegativeInteger = value => Number.isSafeInteger(value) && value >= 0;

export function buildSnapshot(response, username, fetchedAt = new Date().toISOString()) {
  if (!validUsername(username)) throw new Error('Supply a valid GitHub username.');
  if (response.errors?.length) throw new Error('GitHub returned GraphQL errors.');
  const user = response.data?.user;
  if (!user || user.login?.toLowerCase() !== username.toLowerCase() || user.url !== `https://github.com/${user.login}`) throw new Error('GitHub returned an unexpected profile.');
  const calendar = user.contributionsCollection?.contributionCalendar;
  if (!calendar || !nonnegativeInteger(calendar.totalContributions) || !Array.isArray(calendar.weeks)) throw new Error('GitHub returned an invalid contribution calendar.');
  let previous = '';
  const days = calendar.weeks.flatMap(week => {
    if (!Array.isArray(week.contributionDays)) throw new Error('GitHub returned an invalid week.');
    return week.contributionDays.map(day => {
      const stamp = /^\d{4}-\d{2}-\d{2}$/.test(day.date) ? Date.parse(`${day.date}T00:00:00Z`) : NaN;
      if (!Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== day.date || day.date <= previous) throw new Error('Calendar dates must be real, unique and ordered UTC dates.');
      if (!Number.isInteger(day.weekday) || day.weekday !== new Date(stamp).getUTCDay()) throw new Error('A calendar weekday does not match its UTC date.');
      if (!nonnegativeInteger(day.contributionCount) || !Object.hasOwn(levels, day.contributionLevel)) throw new Error('A calendar count or contribution level is invalid.');
      previous = day.date;
      return { date: day.date, weekday: day.weekday, count: day.contributionCount, level: levels[day.contributionLevel] };
    });
  });
  if (!days.length) throw new Error('GitHub returned an empty calendar.');
  const dailyTotalContributions = days.reduce((sum, day) => sum + day.count, 0);
  if (!nonnegativeInteger(dailyTotalContributions)) throw new Error('Calendar daily total exceeds the supported integer range.');
  return { username: user.login, profileUrl: user.url, fetchedAt, source: 'GitHub GraphQL contributionCalendar', totalContributions: calendar.totalContributions, dailyTotalContributions, days };
}

export async function refresh(username = 'abrar225') {
  if (!validUsername(username)) throw new Error('Supply a valid GitHub username.');
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  let raw;
  if (token) {
    let response;
    try {
      response = await fetch('https://api.github.com/graphql', {
        method: 'POST', signal: AbortSignal.timeout(30_000),
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'abrar-portfolio-contributions' },
        body: JSON.stringify({ query, variables: { username } }),
      });
    } catch { throw new Error('GitHub network request failed. Verify the connection and token configuration.'); }
    if (!response.ok) throw new Error(`GitHub request failed (HTTP ${response.status}).`);
    raw = await response.text();
  } else {
    try {
      raw = execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`, '-f', `username=${username}`], { encoding: 'utf8', timeout: 30_000, maxBuffer: 4 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch {
      throw new Error('GitHub CLI query failed. Check gh auth status, or supply GH_TOKEN/GITHUB_TOKEN.');
    }
  }
  let response;
  try { response = JSON.parse(raw); } catch { throw new Error('GitHub returned invalid JSON.'); }
  const snapshot = buildSnapshot(response, username);
  const temporary = `${output}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, { flag: 'wx' });
    renameSync(temporary, output);
  } finally { rmSync(temporary, { force: true }); }
  const peak = snapshot.days.reduce((best, day) => day.count > best.count ? day : best);
  console.log(`${snapshot.username}: ${snapshot.totalContributions} reported contributions; ${snapshot.dailyTotalContributions} summed daily counts; ${snapshot.days.length} days; peak ${peak.count} on ${peak.date}.`);
  return snapshot;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length > 3) { console.error('Usage: node scripts/fetch-github.mjs [username]'); process.exitCode = 1; }
  else await refresh(process.argv[2]).catch(error => { console.error(`Contribution refresh failed; last good snapshot retained. ${error.message}`); process.exitCode = 1; });
}
