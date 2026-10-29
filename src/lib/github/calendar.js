const DAY_MS = 86_400_000;

export function dateNumber(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new TypeError(`Invalid calendar date: ${value}`);
  const result = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(result) || new Date(result).toISOString().slice(0, 10) !== value) throw new TypeError(`Invalid calendar date: ${value}`);
  return result;
}

/** Sunday-first UTC weeks. Missing and future cells have no contribution count. */
export function buildContributionCalendar(days, throughDate = days.at(-1)?.date) {
  if (!days.length) return { cells: [], weeks: [], months: [] };
  const through = dateNumber(throughDate);
  const observed = [...days].filter(day => dateNumber(day.date) <= through).sort((a, b) => a.date.localeCompare(b.date));
  if (!observed.length) return { cells: [], weeks: [], months: [] };
  const byDate = new Map(observed.map(day => [day.date, day]));
  const first = dateNumber(observed[0].date), last = dateNumber(observed.at(-1).date);
  const start = first - new Date(first).getUTCDay() * DAY_MS;
  const end = last + (6 - new Date(last).getUTCDay()) * DAY_MS;
  const cells = [], weeks = [], months = [];
  for (let time = start; time <= end; time += DAY_MS) {
    const date = new Date(time).toISOString().slice(0, 10), source = byDate.get(date);
    const weekday = new Date(time).getUTCDay(), week = Math.floor((time - start) / (7 * DAY_MS));
    const cell = { date, weekday, week, available: Boolean(source), future: time > through, count: source ? source.count : null, level: source ? source.level : null };
    cells.push(cell); (weeks[week] ||= []).push(cell);
    if (new Date(time).getUTCDate() === 1) months.push({ week, label: new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(time), date });
  }
  return { cells, weeks, months };
}

/** An in-progress day may be empty; current streaks can end yesterday. Older gaps interrupt them. */
export function getContributionStats(snapshot) {
  const throughDate = snapshot.fetchedAt?.slice(0, 10) || snapshot.days.at(-1)?.date;
  if (!snapshot.days.length) return { totalContributions: snapshot.totalContributions || 0, activeDays: 0, longestStreak: 0, currentStreak: 0, peak: null, firstDate: null, lastDate: null, throughDate };
  const through = dateNumber(throughDate), days = [...snapshot.days].filter(day => dateNumber(day.date) <= through).sort((a, b) => a.date.localeCompare(b.date));
  let longestStreak = 0, streak = 0, previous = null, activeDays = 0, peak = null;
  for (const day of days) {
    const time = dateNumber(day.date);
    if (day.count > 0) { activeDays++; streak = previous !== null && time - previous === DAY_MS ? streak + 1 : 1; }
    else streak = 0;
    if (streak > longestStreak) longestStreak = streak;
    if (!peak || day.count > peak.count) peak = day;
    previous = time;
  }
  const counts = new Map(days.map(day => [dateNumber(day.date), day.count]));
  let currentDate = counts.get(through) > 0 ? through : through - DAY_MS, currentStreak = 0;
  while (counts.get(currentDate) > 0) { currentStreak++; currentDate -= DAY_MS; }
  return { totalContributions: snapshot.totalContributions, activeDays, longestStreak, currentStreak, peak, firstDate: days[0]?.date || null, lastDate: days.at(-1)?.date || null, throughDate };
}

export function contributionHeight(count, maximum, height) {
  return count > 0 && maximum > 0 ? Math.sqrt(count / maximum) * height : 0;
}

export function formatContributionDate(date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(dateNumber(date));
}

export function contributionLabel(day) {
  return day.available === false || day.count == null ? `No data for ${formatContributionDate(day.date)}` : `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatContributionDate(day.date)}`;
}
