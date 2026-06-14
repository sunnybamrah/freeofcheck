// Nightly schema-drift check (spec §5.7). Hits the LIVE openFDA API and asserts
// the inactive_ingredient field is still a string array we can read. Exits non-zero
// if the upstream shape changes, so CI can alert. Run: node scripts/check-schema.mjs
const KEY = process.env.OPENFDA_API_KEY;
const url =
  "https://api.fda.gov/drug/label.json?search=openfda.generic_name:%22ibuprofen%22&limit=20" +
  (KEY ? `&api_key=${encodeURIComponent(KEY)}` : "");

const ctrl = new AbortController();
const t = setTimeout(() => ctrl.abort(), 20000);
try {
  const res = await fetch(url, { signal: ctrl.signal });
  if (!res.ok) {
    console.error(`[schema-check] upstream HTTP ${res.status}`);
    process.exit(2);
  }
  const json = await res.json();
  const results = json.results ?? [];
  if (!Array.isArray(results) || results.length === 0) {
    console.error("[schema-check] no results returned");
    process.exit(3);
  }
  const withInactive = results.filter(
    (r) => Array.isArray(r.inactive_ingredient) && r.inactive_ingredient.some((s) => typeof s === "string"),
  );
  if (withInactive.length === 0) {
    console.error(
      "[schema-check] DRIFT: no result had a readable inactive_ingredient string array — the matcher may be broken!",
    );
    process.exit(4);
  }
  const sampleOpenfda = results.find((r) => r.openfda && r.openfda.spl_set_id);
  if (!sampleOpenfda) {
    console.error("[schema-check] WARN: no spl_set_id seen (DailyMed links may break)");
  }
  console.log(
    `[schema-check] OK — ${withInactive.length}/${results.length} ibuprofen labels carry inactive_ingredient strings; spl_set_id present: ${!!sampleOpenfda}`,
  );
  process.exit(0);
} catch (err) {
  console.error("[schema-check] request failed:", err?.message ?? err);
  process.exit(5);
} finally {
  clearTimeout(t);
}
