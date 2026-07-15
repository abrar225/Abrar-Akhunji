/**
 * rateLimit — per-browser daily cap for LLM calls.
 *
 * Persists in localStorage so it survives hard refreshes; resets each calendar
 * day. NOTE: localStorage can be cleared / bypassed in incognito — true
 * enforcement needs a server. This is the pragmatic guard for a static site and
 * stops casual brute-forcing of the (token-costing) LLM path. Local/static
 * answers do NOT consume this budget.
 */

const KEY = 'twin_llm_usage_v1';
export const DAILY_LIMIT = 10;

const today = () => new Date().toISOString().slice(0, 10);

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (raw.date !== today()) return { date: today(), count: 0 };
    return { date: raw.date, count: Number(raw.count) || 0 };
  } catch {
    return { date: today(), count: 0 };
  }
}

export function remaining() {
  return Math.max(0, DAILY_LIMIT - read().count);
}

export function canAsk() {
  return remaining() > 0;
}

/** Increment usage; returns the number of LLM questions still left today. */
export function consume() {
  const u = read();
  const next = { date: u.date, count: u.count + 1 };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — fail open */
  }
  return Math.max(0, DAILY_LIMIT - next.count);
}

/**
 * Sync the local mirror to the server's authoritative remaining count. The
 * server (PHP proxy) is the real gate; this just keeps the UI meter honest and
 * lets us short-circuit obvious over-limit calls before hitting the network.
 */
export function mirror(remainingCount) {
  const n = Number(remainingCount);
  if (!Number.isFinite(n)) return;
  const count = Math.max(0, DAILY_LIMIT - n);
  try {
    localStorage.setItem(KEY, JSON.stringify({ date: today(), count }));
  } catch {
    /* ignore */
  }
}
