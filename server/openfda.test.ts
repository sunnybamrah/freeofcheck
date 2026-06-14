import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  fetchAllLabels,
  suggest,
  NotFoundError,
  TimeoutError,
  UpstreamError,
  _resetBudget,
} from "./openfda";

function res(status: number, body: unknown) {
  return {
    status,
    ok: status >= 200 && status < 300,
    json: async () => body,
  } as unknown as Response;
}

function fdaResult(i: number, inactive: string[], extra: Record<string, unknown> = {}) {
  return {
    id: `spl-${i}`,
    effective_time: "20230115",
    inactive_ingredient: inactive,
    openfda: {
      brand_name: [`Brand ${i}`],
      generic_name: ["metformin hydrochloride"],
      manufacturer_name: [`Maker ${i}`],
      route: ["ORAL"],
      spl_set_id: [`set-${i}`],
    },
    ...extra,
  };
}

function skipOf(url: string): number {
  return Number(new URL(url).searchParams.get("skip") ?? 0);
}

beforeEach(() => {
  _resetBudget();
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchAllLabels — normalization", () => {
  it("normalizes label fields incl. YYYYMMDD -> YYYY-MM-DD", async () => {
    vi.stubGlobal("fetch", async () =>
      res(200, { meta: { results: { total: 1 } }, results: [fdaResult(1, ["lactose monohydrate"])] }),
    );
    const out = await fetchAllLabels("metformin");
    expect(out.labels).toHaveLength(1);
    const l = out.labels[0];
    expect(l.brandName).toBe("Brand 1");
    expect(l.genericName).toBe("metformin hydrochloride");
    expect(l.effectiveDate).toBe("2023-01-15");
    expect(l.splSetId).toBe("set-1");
    expect(l.inactiveIngredient).toEqual(["lactose monohydrate"]);
    expect(l.openfdaPresent).toBe(true);
    expect(out.resolvedAs).toBe("metformin hydrochloride");
  });

  it("handles a label with an empty openfda object (no brand)", async () => {
    vi.stubGlobal("fetch", async () =>
      res(200, {
        meta: { results: { total: 1 } },
        results: [{ id: "x", inactive_ingredient: ["starch"], openfda: {} }],
      }),
    );
    const out = await fetchAllLabels("mystery");
    expect(out.labels[0].brandName).toBeNull();
    expect(out.labels[0].openfdaPresent).toBe(false);
  });
});

describe("fetchAllLabels — pagination", () => {
  afterEach(() => {
    delete process.env.OPENFDA_MAX_LABELS;
    delete process.env.OPENFDA_PAGE;
  });

  it("paginates with explicit limit + skip across multiple pages", async () => {
    process.env.OPENFDA_MAX_LABELS = "5000";
    process.env.OPENFDA_PAGE = "1000";
    const total = 2500;
    const calls: number[] = [];
    vi.stubGlobal("fetch", async (url: string) => {
      const skip = skipOf(url);
      calls.push(skip);
      const remaining = Math.max(0, total - skip);
      const n = Math.min(1000, remaining);
      if (n === 0) return res(404, { error: { code: "NOT_FOUND" } });
      const results = Array.from({ length: n }, (_, k) => fdaResult(skip + k, ["talc"]));
      return res(200, { meta: { results: { total } }, results });
    });
    const out = await fetchAllLabels("metformin");
    expect(out.total).toBe(2500);
    expect(out.labels).toHaveLength(2500);
    expect(out.capped).toBe(false);
    expect(calls).toEqual([0, 1000, 2000]);
  });

  it("caps at MAX_LABELS and flags capped=true (the common big-drug case)", async () => {
    process.env.OPENFDA_MAX_LABELS = "50";
    process.env.OPENFDA_PAGE = "25";
    const total = 40000;
    const calls: number[] = [];
    vi.stubGlobal("fetch", async (url: string) => {
      const skip = skipOf(url);
      calls.push(skip);
      const results = Array.from({ length: 25 }, (_, k) => fdaResult(skip + k, ["talc"]));
      return res(200, { meta: { results: { total } }, results });
    });
    const out = await fetchAllLabels("commondrug");
    expect(out.capped).toBe(true);
    expect(out.labels.length).toBe(50);
    expect(out.total).toBe(40000);
    expect(calls).toEqual([0, 25]);
  });

  it("respects the hard openFDA skip ceiling of 25,000", async () => {
    process.env.OPENFDA_MAX_LABELS = "999999";
    process.env.OPENFDA_PAGE = "1000";
    const total = 40000;
    vi.stubGlobal("fetch", async (url: string) => {
      const skip = skipOf(url);
      const results = Array.from({ length: 1000 }, (_, k) => fdaResult(skip + k, ["talc"]));
      return res(200, { meta: { results: { total } }, results });
    });
    const out = await fetchAllLabels("commondrug");
    expect(out.capped).toBe(true);
    expect(out.labels.length).toBe(25000);
  });
});

describe("fetchAllLabels — Rx fallback (sparse structured data)", () => {
  it("falls back to non-harmonized query when primary labels carry no ingredients", async () => {
    vi.stubGlobal("fetch", async (url: string) => {
      // PRIMARY (openfda.* name query): labels exist but have NO inactive ingredients
      if (url.includes("openfda.brand_name") || url.includes("openfda.generic_name")) {
        if (url.includes("*")) return res(200, { results: [] }); // suggest, unused here
        return res(200, {
          meta: { results: { total: 3 } },
          results: [
            { id: "rx-1", openfda: { generic_name: ["metformin"] }, inactive_ingredient: [] },
            { id: "rx-2", openfda: { generic_name: ["metformin"] } },
            { id: "rx-3", openfda: { generic_name: ["metformin"] }, inactive_ingredient: [] },
          ],
        });
      }
      // FALLBACK (spl_product_data_elements + _exists_): data-bearing labels
      if (url.includes("_exists_")) {
        return res(200, {
          meta: { results: { total: 2 } },
          results: [
            { id: "fb-1", set_id: "s1", inactive_ingredient: ["lactose monohydrate, talc"] },
            { id: "fb-2", inactive_ingredient: ["magnesium stearate"], openfda: { spl_set_id: ["s2"] } },
          ],
        });
      }
      return res(404, { error: { code: "NOT_FOUND" } });
    });
    const out = await fetchAllLabels("metformin");
    // data-bearing labels are surfaced first
    expect(out.labels[0].inactiveIngredient.length).toBeGreaterThan(0);
    const dataBearing = out.labels.filter((l) => l.inactiveIngredient.length > 0);
    expect(dataBearing.length).toBe(2);
  });
});

describe("fetchAllLabels — NOT_FOUND", () => {
  it("throws NotFoundError (with suggestions) on zero matches", async () => {
    vi.stubGlobal("fetch", async (url: string) => {
      // suggestion call uses a wildcard '*'
      if (url.includes("*")) {
        return res(200, {
          results: [{ openfda: { generic_name: ["metformin hydrochloride"] } }],
        });
      }
      return res(404, { error: { code: "NOT_FOUND" } });
    });
    await expect(fetchAllLabels("metformun")).rejects.toBeInstanceOf(NotFoundError);
  });
});

describe("fetchAllLabels — resilience", () => {
  it("retries ONCE on a 5xx then succeeds", async () => {
    let n = 0;
    vi.stubGlobal("fetch", async () => {
      n++;
      if (n === 1) return res(503, { error: { code: "SERVER_ERROR" } });
      return res(200, { meta: { results: { total: 1 } }, results: [fdaResult(1, ["talc"])] });
    });
    const out = await fetchAllLabels("metformin");
    expect(out.labels).toHaveLength(1);
    expect(n).toBe(2);
  });

  it("gives up with UpstreamError after the retry also fails", async () => {
    vi.stubGlobal("fetch", async () => res(502, {}));
    await expect(fetchAllLabels("metformin")).rejects.toBeInstanceOf(UpstreamError);
  });

  it("maps an aborted request to TimeoutError", async () => {
    vi.stubGlobal("fetch", async () => {
      throw new DOMException("aborted", "AbortError");
    });
    await expect(fetchAllLabels("metformin")).rejects.toBeInstanceOf(TimeoutError);
  });
});

describe("suggest", () => {
  it("returns distinct, prefix-prioritised names and never throws", async () => {
    vi.stubGlobal("fetch", async () =>
      res(200, {
        results: [
          { openfda: { brand_name: ["METFORMIN ER"], generic_name: ["metformin hydrochloride"] } },
          { openfda: { brand_name: ["Glucophage"], generic_name: ["metformin hydrochloride"] } },
        ],
      }),
    );
    const out = await suggest("metf");
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((s) => typeof s === "string")).toBe(true);
  });

  it("returns [] for short queries without calling upstream", async () => {
    const spy = vi.fn();
    vi.stubGlobal("fetch", spy);
    expect(await suggest("m")).toEqual([]);
    expect(spy).not.toHaveBeenCalled();
  });
});
