import { LRUCache } from "lru-cache";
import type { CheckResponse } from "../src/lib/types";

// Stateless, volatile in-memory cache — RAM only, never persisted, keyed by the
// public normalized drug query (NEVER by user/IP/session). This honors the
// "store nothing per user" rule: it caches public FDA data, not people.
// TTL 24h is safe: openFDA label data refreshes ~weekly.
const TTL = Number(process.env.CACHE_TTL_MS) || 1000 * 60 * 60 * 24;

const labelCache = new LRUCache<string, CheckResponse>({
  max: 600,
  ttl: TTL,
});

export function getCached(drugKey: string): CheckResponse | undefined {
  return labelCache.get(drugKey);
}

export function setCached(drugKey: string, value: CheckResponse): void {
  labelCache.set(drugKey, value);
}

export function cacheSize(): number {
  return labelCache.size;
}

/** test-only */
export function _clearCache(): void {
  labelCache.clear();
}
