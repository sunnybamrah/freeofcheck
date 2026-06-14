import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";

// Set a tiny daily budget BEFORE the modules load so the ceiling is read low.
process.env.OPENFDA_DAILY_BUDGET = "1";

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
      inactive_ingredient: ["talc"],
      openfda: { generic_name: ["metformin"], spl_set_id: ["s"] },
    },
  ],
};

// Loaded dynamically so they pick up the low OPENFDA_DAILY_BUDGET above.
let api: typeof import("./api").api;
let clearCache: typeof import("./cache")._clearCache;

beforeAll(async () => {
  ({ api } = await import("./api"));
  ({ _clearCache: clearCache } = await import("./cache"));
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("daily budget cap", () => {
  it("serves the first miss, then 503 budget_exhausted on the next cache miss", async () => {
    clearCache();
    vi.stubGlobal("fetch", async () => res(200, foundPage));

    const r1 = await api.request("/check?drug=metformin");
    expect(r1.status).toBe(200); // first upstream call allowed (budget=1)

    const r2 = await api.request("/check?drug=ibuprofen"); // different drug -> cache miss
    expect(r2.status).toBe(503);
    expect((await r2.json()).code).toBe("budget_exhausted");
  });
});
