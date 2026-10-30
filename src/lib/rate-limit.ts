/**
 * Simple in-memory fixed-window limiter. On serverless hosts each instance has its own memory,
 * so this is best-effort. Use a shared store (e.g. Upstash Redis) for stricter limits.
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const entry = hits.get(key);
  if (!entry || entry.reset <= now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

export function resetRateLimit() {
  hits.clear();
}
