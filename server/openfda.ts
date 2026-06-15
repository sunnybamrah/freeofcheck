import type { CheckResponse, NormalizedLabel } from "../src/lib/types";

// ---------------------------------------------------------------------------
// openFDA drug/label client.
//
// THE DECISIVE FACT (live-verified, spec §3.4): openFDA silently returns
// NOT_FOUND when you AND-combine a harmonized openfda.* field with the free-text
// inactive_ingredient field. So we query by DRUG NAME ONLY, paginate ALL labels,
// and match ingredients client-side with the deterministic dictionary.
// ---------------------------------------------------------------------------

const BASE = "https://api.fda.gov/drug/label.json";
const SKIP_CAP = 25000; // openFDA hard pagination ceiling
const DAILY_KEYED_CEILING = 120000; // openFDA per-key/day limit

// Config is read at call-time (not module load) so it is testable and tunable
// via env without restarts. Each full openFDA label document is ~130KB, so
// "fetch ALL labels" (e.g. 379 for metformin = ~95MB) is impractical. We cap
// the labels fetched — dedup means distinct formulations appear in the first
// few dozen — and tell the user transparently ("showing first N of M labels").
function cfg() {
  return {
    MAX_LABELS: Number(process.env.OPENFDA_MAX_LABELS) || 100,
    PAGE: Math.min(Number(process.env.OPENFDA_PAGE) || 50, Number(process.env.OPENFDA_MAX_LABELS) || 100),
    TIMEOUT_MS: Number(process.env.OPENFDA_TIMEOUT_MS) || 12000,
    FETCH_BUDGET_MS: Number(process.env.OPENFDA_FETCH_BUDGET_MS) || 20000,
  };
}
function dailyCeiling(): number {
  return Number(process.env.OPENFDA_DAILY_BUDGET) || DAILY_KEYED_CEILING - 5000;
}

export class NotFoundError extends Error {
  suggestions: string[];
  constructor(suggestions: string[] = []) {
    super("not_found");
    this.suggestions = suggestions;
  }
}
export class UpstreamError extends Error {}
export class TimeoutError extends Error {}
export class BudgetError extends Error {}

// --- Global daily upstream-call budget counter (resets on calendar day) ---
let callCount = 0;
let budgetDay = new Date().toISOString().slice(0, 10);
function tickBudget() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== budgetDay) {
    budgetDay = today;
    callCount = 0;
  }
  if (callCount >= dailyCeiling()) throw new BudgetError("daily openFDA budget exhausted");
  callCount++;
}
export function budgetStatus() {
  return { day: budgetDay, used: callCount, ceiling: dailyCeiling() };
}
/** test-only reset */
export function _resetBudget() {
  callCount = 0;
  budgetDay = new Date().toISOString().slice(0, 10);
}

function withKey(url: string): string {
  const key = process.env.OPENFDA_API_KEY;
  return key ? `${url}&api_key=${encodeURIComponent(key)}` : url;
}

/** Encode a phrase value for the openFDA search param: "a b" -> %22a+b%22 */
function phrase(value: string): string {
  const parts = value.trim().split(/\s+/).map(encodeURIComponent);
  return `%22${parts.join("+")}%22`;
}

interface FdaPage {
  meta?: { results?: { total?: number } };
  results?: FdaResult[];
  error?: { code?: string; message?: string };
}
interface FdaResult {
  id?: string;
  set_id?: string; // top-level SPL set id (present even when openfda is empty)
  effective_time?: string;
  inactive_ingredient?: string[];
  dosage_form?: string | string[];
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    route?: string[];
    spl_set_id?: string[];
    spl_id?: string[];
    product_ndc?: string[];
  };
}

async function fetchJson(url: string): Promise<FdaPage> {
  tickBudget();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), cfg().TIMEOUT_MS);
  try {
    const res = await fetch(withKey(url), { signal: ctrl.signal });
    if (res.status === 404) {
      // openFDA returns 404 + {error:{code:"NOT_FOUND"}} for zero matches.
      return (await res.json().catch(() => ({}))) as FdaPage;
    }
    if (res.status === 429 || res.status >= 500) {
      const e = new UpstreamError(`upstream ${res.status}`);
      (e as UpstreamError & { retryable?: boolean }).retryable = true;
      throw e;
    }
    if (!res.ok) throw new UpstreamError(`upstream ${res.status}`);
    return (await res.json()) as FdaPage;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new TimeoutError("openFDA request timed out");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/** fetch with one retry on retryable (5xx/429/timeout) failures */
async function fetchJsonRetry(url: string): Promise<FdaPage> {
  try {
    return await fetchJson(url);
  } catch (err) {
    const retryable =
      err instanceof TimeoutError ||
      (err instanceof UpstreamError &&
        (err as UpstreamError & { retryable?: boolean }).retryable === true);
    if (!retryable) throw err;
    await new Promise((r) => setTimeout(r, 400));
    return fetchJson(url);
  }
}

function ymd(effective?: string): string | null {
  if (!effective) return null;
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(effective);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function firstStr(arr?: string[]): string | null {
  return arr && arr.length > 0 ? arr[0] : null;
}

function normalize(r: FdaResult): NormalizedLabel {
  const o = r.openfda ?? {};
  const dosage = Array.isArray(r.dosage_form) ? r.dosage_form.join(", ") : r.dosage_form ?? null;
  return {
    splId: r.id ?? firstStr(o.spl_id) ?? "",
    splSetId: firstStr(o.spl_set_id) ?? r.set_id ?? null,
    ndc: firstStr(o.product_ndc),
    brandName: firstStr(o.brand_name),
    genericName: firstStr(o.generic_name),
    manufacturerName: firstStr(o.manufacturer_name),
    dosageForm: dosage,
    route: firstStr(o.route),
    effectiveDate: ymd(r.effective_time),
    inactiveIngredient: Array.isArray(r.inactive_ingredient) ? r.inactive_ingredient : [],
    openfdaPresent: !!r.openfda && Object.keys(r.openfda).length > 0,
  };
}

/** Normalize a drug name for the query / cache key. */
export function normalizeDrug(drug: string): string {
  return drug.trim().toLowerCase().replace(/\s+/g, " ");
}

interface PageResult {
  labels: NormalizedLabel[];
  total: number;
  capped: boolean;
  notFound: boolean;
}

function hasInactive(l: NormalizedLabel): boolean {
  return l.inactiveIngredient.some((s) => s.trim().length > 0);
}

/** Paginate one openFDA search expression up to the configured caps. */
async function paginate(search: string, stopIfFirstPageEmpty: boolean): Promise<PageResult> {
  const { MAX_LABELS, PAGE, FETCH_BUDGET_MS } = cfg();
  const labels: NormalizedLabel[] = [];
  let total = 0;
  let capped = false;
  let skip = 0;
  const startedAt = Date.now();

  while (true) {
    const url = `${BASE}?search=${search}&limit=${PAGE}&skip=${skip}`;
    const page = await fetchJsonRetry(url);

    if (page.error?.code === "NOT_FOUND" || !page.results || page.results.length === 0) {
      if (skip === 0) return { labels, total: 0, capped: false, notFound: true };
      break; // ran past the end
    }

    if (skip === 0) total = page.meta?.results?.total ?? page.results.length;
    const normalized = page.results.map(normalize);
    labels.push(...normalized);

    // Avoid wasting bandwidth paginating a label set that carries no structured
    // inactive ingredients at all (the Rx case) — bail to the fallback query.
    if (skip === 0 && stopIfFirstPageEmpty && !normalized.some(hasInactive)) {
      capped = total > labels.length;
      break;
    }

    skip += PAGE;
    if (labels.length >= MAX_LABELS) {
      if (labels.length > MAX_LABELS) labels.length = MAX_LABELS;
      capped = total > labels.length;
      break;
    }
    if (skip >= SKIP_CAP && skip < total) {
      capped = true;
      break;
    }
    if (Date.now() - startedAt > FETCH_BUDGET_MS && skip < total) {
      capped = true;
      break;
    }
    if (skip >= total) break;
  }
  return { labels, total, capped, notFound: false };
}

/**
 * Fetch labels for a drug, normalized, with data-bearing labels surfaced first.
 *
 * Strategy (driven by live openFDA behaviour):
 *  1. PRIMARY: query by harmonized name — rich metadata, great for OTC products
 *     where the structured inactive_ingredient field is well populated.
 *  2. FALLBACK: if the primary set carries NO structured inactive ingredients
 *     (common for Rx drugs), query a NON-harmonized field + _exists_ to surface
 *     the labels that do carry them. We can't AND a harmonized openfda.* field
 *     with inactive_ingredient (silent NOT_FOUND, spec §3.4), so the fallback
 *     uses spl_product_data_elements (free-text) which is "same-family".
 *
 * Throws NotFoundError (with suggestions) only when BOTH queries are empty.
 */
export async function fetchAllLabels(drugRaw: string): Promise<CheckResponse> {
  const drug = normalizeDrug(drugRaw);
  const v = phrase(drug);

  const primary = await paginate(
    `(openfda.brand_name:${v})+OR+(openfda.generic_name:${v})`,
    true,
  );
  const labels = [...primary.labels];
  let total = primary.total;
  let capped = primary.capped;

  if (!labels.some(hasInactive)) {
    const fb = await paginate(`spl_product_data_elements:${v}+AND+_exists_:inactive_ingredient`, false);
    if (!fb.notFound && fb.labels.length > 0) {
      const seen = new Set(labels.map((l) => l.splSetId ?? l.splId));
      for (const l of fb.labels) {
        const k = l.splSetId ?? l.splId;
        if (!seen.has(k)) {
          seen.add(k);
          labels.push(l);
        }
      }
      total = Math.max(total, fb.total);
      capped = capped || fb.capped;
    }
  }

  if (labels.length === 0) {
    const suggestions = await suggest(drug).catch(() => []);
    throw new NotFoundError(suggestions);
  }

  // Surface labels that carry ingredient data first (stable sort preserves order).
  labels.sort((a, b) => Number(hasInactive(b)) - Number(hasInactive(a)));
  const { MAX_LABELS } = cfg();
  if (labels.length > MAX_LABELS) labels.length = MAX_LABELS;

  const resolvedAs =
    labels.find((l) => l.genericName)?.genericName ??
    labels.find((l) => l.brandName)?.brandName ??
    drug;

  return { query: drugRaw, resolvedAs, total, capped, fromCache: false, labels };
}

/**
 * Type-ahead suggestions. Best-effort, never load-bearing: returns up to 8
 * distinct brand/generic names matching the prefix; [] on any failure.
 */
export async function suggest(qRaw: string): Promise<string[]> {
  const q = normalizeDrug(qRaw);
  if (q.length < 2) return [];
  const w = `${q.split(/\s+/).map(encodeURIComponent).join("+")}*`;
  const search = `(openfda.brand_name:${w})+OR+(openfda.generic_name:${w})`;
  const url = `${BASE}?search=${search}&limit=25`;
  let page: FdaPage;
  try {
    page = await fetchJsonRetry(url);
  } catch {
    return [];
  }
  if (!page.results) return [];
  const names = new Set<string>();
  for (const r of page.results) {
    for (const n of [...(r.openfda?.brand_name ?? []), ...(r.openfda?.generic_name ?? [])]) {
      if (n && n.toLowerCase().includes(q)) names.add(titleCase(n));
    }
  }
  const arr = [...names];
  arr.sort((a, b) => {
    const ap = a.toLowerCase().startsWith(q) ? 0 : 1;
    const bp = b.toLowerCase().startsWith(q) ? 0 : 1;
    return ap - bp || a.length - b.length;
  });
  return arr.slice(0, 8);
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .trim();
}
