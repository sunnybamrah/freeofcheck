import { Hono } from "hono";
import type { Context } from "hono";
import { getConnInfo } from "@hono/node-server/conninfo";
import {
  fetchAllLabels,
  normalizeDrug,
  suggest,
  budgetStatus,
  NotFoundError,
  UpstreamError,
  TimeoutError,
  BudgetError,
} from "./openfda";
import { getCached, setCached, cacheSize } from "./cache";
import { takeToken } from "./ratelimit";
import { DICTIONARY_VERSION } from "../src/lib/allergens";
import type { ApiError } from "../src/lib/types";

export const api = new Hono();

function clientIp(c: Context): string {
  const fwd = c.req.header("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  try {
    return getConnInfo(c).remote.address ?? "unknown";
  } catch {
    return "unknown";
  }
}

// Per-IP rate limit on all /api routes.
api.use("*", async (c, next) => {
  const r = takeToken(clientIp(c));
  if (!r.allowed) {
    c.header("Retry-After", String(r.retryAfterSec));
    const body: ApiError = {
      error: "Too many requests. Please slow down for a moment.",
      code: "rate_limited",
    };
    return c.json(body, 429);
  }
  await next();
});

function nearBudget(): boolean {
  const b = budgetStatus();
  return b.used >= b.ceiling * 0.9;
}

api.get("/check", async (c) => {
  const drugRaw = (c.req.query("drug") ?? "").trim();
  if (!drugRaw || drugRaw.length > 120) {
    const body: ApiError = { error: "Please enter a medicine name.", code: "bad_request" };
    return c.json(body, 400);
  }

  const key = "labels:" + normalizeDrug(drugRaw);

  const cached = getCached(key);
  if (cached) {
    return c.json({ ...cached, fromCache: true, degraded: nearBudget() });
  }

  try {
    const result = await fetchAllLabels(drugRaw);
    setCached(key, result);
    return c.json({ ...result, degraded: nearBudget() });
  } catch (err) {
    if (err instanceof NotFoundError) {
      const body: ApiError = {
        error: `We couldn't find a medicine named "${drugRaw}". Check the spelling, or try the active ingredient.`,
        code: "not_found",
        suggestions: err.suggestions,
      };
      return c.json(body, 404);
    }
    if (err instanceof BudgetError) {
      const body: ApiError = {
        error: "We're seeing very high traffic right now. Please try again shortly.",
        code: "budget_exhausted",
      };
      return c.json(body, 503);
    }
    if (err instanceof TimeoutError) {
      const body: ApiError = {
        error: "The FDA database took too long to respond. Please try again in a moment.",
        code: "timeout",
      };
      return c.json(body, 504);
    }
    if (err instanceof UpstreamError) {
      const body: ApiError = {
        error: "We couldn't reach the FDA database just now. This is on our end, not yours.",
        code: "upstream_unavailable",
      };
      return c.json(body, 502);
    }
    const body: ApiError = {
      error: "Something went wrong on our end. Please try again.",
      code: "upstream_unavailable",
    };
    return c.json(body, 502);
  }
});

api.get("/suggest", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  if (q.length < 2) return c.json({ suggestions: [] });
  const suggestions = await suggest(q).catch(() => []);
  return c.json({ suggestions });
});

// PHI-free service metadata for the freshness banner / monitoring.
api.get("/meta", (c) => {
  const b = budgetStatus();
  return c.json({
    dictionaryVersion: DICTIONARY_VERSION,
    cacheSize: cacheSize(),
    budget: { used: b.used, ceiling: b.ceiling, day: b.day, degraded: nearBudget() },
    source: "openFDA drug/label + DailyMed",
  });
});
