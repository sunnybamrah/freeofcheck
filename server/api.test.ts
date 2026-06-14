import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { api } from "./api";
import { _clearCache } from "./cache";
import { _resetRateLimit, takeToken } from "./ratelimit";
import { _resetBudget } from "./openfda";

function res(status: number, body: unknown) {
  return {
    status,
    ok: status >= 200 && status < 300,
    json: async () => body,
  } as unknown as Response;
}

const foundPage = {
  meta: { results: { total: 1 } },
  results: [
    {
      id: "spl-1",
      effective_time: "20240101",
      inactive_ingredient: ["lactose monohydrate, magnesium stearate"],
      openfda: {
        brand_name: ["Glucophage"],
        generic_name: ["metformin hydrochloride"],
        manufacturer_name: ["Maker"],
        route: ["ORAL"],
        spl_set_id: ["set-1"],
      },
    },
  ],
};

beforeEach(() => {
  _clearCache();
  _resetRateLimit();
  _resetBudget();
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("/check — cache", () => {
  it("misses then hits cache (upstream called once for two identical queries)", async () => {
    const spy = vi.fn(async () => res(200, foundPage));
    vi.stubGlobal("fetch", spy);

    const r1 = await api.request("/check?drug=metformin");
    expect(r1.status).toBe(200);
    const b1 = await r1.json();
    expect(b1.fromCache).toBe(false);
    expect(b1.labels).toHaveLength(1);

    const r2 = await api.request("/check?drug=Metformin"); // case-insensitive key
    const b2 = await r2.json();
    expect(b2.fromCache).toBe(true);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("rejects an empty drug query with 400", async () => {
    const r = await api.request("/check?drug=");
    expect(r.status).toBe(400);
    expect((await r.json()).code).toBe("bad_request");
  });
});

describe("/check — not found", () => {
  it("returns 404 with did-you-mean suggestions", async () => {
    vi.stubGlobal("fetch", async (url: string) => {
      if (url.includes("*")) {
        return res(200, { results: [{ openfda: { generic_name: ["metformin hydrochloride"] } }] });
      }
      return res(404, { error: { code: "NOT_FOUND" } });
    });
    const r = await api.request("/check?drug=metformun");
    expect(r.status).toBe(404);
    const b = await r.json();
    expect(b.code).toBe("not_found");
    expect(Array.isArray(b.suggestions)).toBe(true);
  });
});

describe("/check — upstream errors map cleanly (never 500 the SPA)", () => {
  it("maps upstream 502 -> 502 upstream_unavailable", async () => {
    vi.stubGlobal("fetch", async () => res(502, {}));
    const r = await api.request("/check?drug=metformin");
    expect(r.status).toBe(502);
    expect((await r.json()).code).toBe("upstream_unavailable");
  });
});

describe("rate limiting", () => {
  it("returns 429 once the per-IP bucket is drained", async () => {
    vi.stubGlobal("fetch", async () => res(200, foundPage));
    // Drain the default 30-token bucket for the test client's IP ("unknown").
    for (let i = 0; i < 30; i++) takeToken("unknown");
    const r = await api.request("/check?drug=metformin");
    expect(r.status).toBe(429);
    expect(r.headers.get("Retry-After")).toBeTruthy();
    expect((await r.json()).code).toBe("rate_limited");
  });
});

describe("/meta", () => {
  it("exposes PHI-free service metadata", async () => {
    const r = await api.request("/meta");
    expect(r.status).toBe(200);
    const b = await r.json();
    expect(b.dictionaryVersion).toBeTruthy();
    expect(b.budget).toBeDefined();
  });
});
