// Per-IP token bucket. In-memory, best-effort abuse protection on the proxy.
// Default 30 req/min (spec §5.3). We never log the IP anywhere — it lives only
// as a transient map key and is evicted after the window.
const LIMIT = Number(process.env.RATE_LIMIT) || 30; // tokens per window
const WINDOW_MS = 60_000;
const REFILL_PER_MS = LIMIT / WINDOW_MS;

interface Bucket {
  tokens: number;
  last: number;
}
const buckets = new Map<string, Bucket>();

export interface RateResult {
  allowed: boolean;
  retryAfterSec: number;
}

export function takeToken(ip: string): RateResult {
  const now = Date.now();
  let b = buckets.get(ip);
  if (!b) {
    b = { tokens: LIMIT, last: now };
    buckets.set(ip, b);
  }
  // refill
  b.tokens = Math.min(LIMIT, b.tokens + (now - b.last) * REFILL_PER_MS);
  b.last = now;

  if (b.tokens >= 1) {
    b.tokens -= 1;
    return { allowed: true, retryAfterSec: 0 };
  }
  const needed = 1 - b.tokens;
  return { allowed: false, retryAfterSec: Math.ceil(needed / REFILL_PER_MS / 1000) };
}

// Periodically evict idle buckets so the map can't grow unbounded.
const sweeper = setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS * 5;
  for (const [ip, b] of buckets) if (b.last < cutoff) buckets.delete(ip);
}, WINDOW_MS);
// Don't keep the process alive just for the sweeper.
if (typeof sweeper.unref === "function") sweeper.unref();

/** test-only */
export function _resetRateLimit(): void {
  buckets.clear();
}
