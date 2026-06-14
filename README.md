# FreeOfCheck

**Know what's NOT in your medicine.**

FreeOfCheck is a free, no-login, nothing-stored web app that reads the **official FDA drug label** and tells you, in plain language, whether a medicine *lists* an ingredient you want to avoid — **PEG, dyes, lactose, soy, or gluten** — and shows you the exact label passage it found, with a link to the full label on DailyMed.

🔗 **Live:** https://freeofcheck-production.up.railway.app (custom domain `freeofcheck.com` to follow)

---

## The one rule that drives everything

FDA labels enumerate what a product **contains**, not what it is *free of*, and the FDA does **not** require manufacturers to declare the source of every single ingredient. So this app can prove **"Contains X"**, but it can **never** honestly claim a medicine is "free of" anything. The most it says is **"not listed on this label"** — always with the reminder to confirm with your pharmacist.

This is the product's integrity *and* its legal shield. It is enforced in code and in copy, and guarded by tests.

## Three states (+ amber)

| State | Meaning | Color + words |
|---|---|---|
| **Contains** | A synonym matched the label's inactive-ingredient text | red — "Contains X" |
| **Possibly contains** | Ambiguous source (e.g. unsourced "starch" for gluten) | amber — "source not stated" |
| **Likely free — not listed** | The label listed ingredients and none matched (NOT a guarantee) | green |
| **The label doesn't say** | No inactive-ingredient text on the label | slate |

Every verdict is shown with an **icon + words + color** (never color alone), and every non-"no-data" row cites its **verbatim FDA passage** + a working DailyMed link.

## Why it's better than what exists

- **Live FDA-label data** (vs the most-cited gluten list, last updated ~2012, and an app on data frozen in 2021).
- **Every answer cites its exact FDA source passage** inline.
- **Per-formulation / per-manufacturer** detail (generics differ).
- **Many allergens in one tool** — PEG, dyes, lactose, soy, gluten.
- **Free, no login, nothing stored.**

## How the data pipeline works

openFDA silently returns `NOT_FOUND` if you AND-combine a harmonized `openfda.*` field with the free-text `inactive_ingredient` field. So:

1. Resolve the drug by **name only** (`openfda.brand_name` / `openfda.generic_name`).
2. Paginate labels (explicit `limit` + `skip`), capping how many we fetch (each full label doc is ~130KB; "fetch all" for a big drug would be ~95MB). Data-bearing labels are surfaced first; the UI says "showing first N of M".
3. For Rx drugs (whose structured inactive-ingredient field is sparse), fall back to a **non-harmonized** `spl_product_data_elements + _exists_` query to surface labels that do carry ingredients.
4. Match each label's ingredient text **client-side** with a deterministic, versioned synonym dictionary (the core IP — **not** an LLM).

The server stores **nothing per user** — a volatile in-memory cache holds only public FDA label data keyed by the drug name.

## Tech stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind (dark theme), PWA (installable, offline app shell).
- **Server:** thin Hono server — holds the openFDA key, proxies/caches openFDA + DailyMed, per-IP rate limit, daily budget counter. No DB, no cookies, no analytics, no query logs.
- **SEO:** build-time prerender of every marketing/legal route to real HTML, JSON-LD (WebApplication + FAQPage + MedicalWebPage), sitemap, robots, per-allergen landing routes.
- **Tests:** Vitest (unit/integration, 120 tests, coverage gate) + Playwright (mobile E2E + axe accessibility).

## Local development

```bash
npm install
npm run gen:assets   # one-time: generate favicons / PWA icons / OG image
npm run dev          # client on :5173, API on :8787 (proxied)
```

The app works **without** an openFDA key locally (it just uses the lower keyless rate limit).

## Testing

```bash
npm run typecheck            # tsc --noEmit
npm run lint                 # eslint
npm run test                 # vitest (unit + integration)
npm run test:coverage        # with coverage gate
npm run test:e2e:install     # one-time: install Playwright Chromium
npm run build && npm run test:e2e   # Playwright mobile E2E + axe
```

## Build & deploy

```bash
npm run build   # vite build -> prerender (SEO) -> esbuild server bundle
npm start       # node server/dist/index.js  (serves dist + /api)
```

Deployed on **Railway** (Nixpacks; see `railway.json`). Healthcheck: `/healthz`.

### Environment variables (set in Railway → Service → Variables)

| Variable | Required | Purpose |
|---|---|---|
| `OPENFDA_API_KEY` | recommended for prod | Raises the openFDA limit from 1,000/day per IP to 120,000/day. Free from https://open.fda.gov/apis/authentication/ |
| `NODE_ENV` | no | Set to `production` in prod. |
| `OPENFDA_MAX_LABELS` | no | Max labels fetched per drug (default 100). |
| `RATE_LIMIT` | no | Per-IP requests/minute (default 30). |
| `PREWARM` | no | Set to `1` to pre-warm the cache for common OTC drugs at boot. |
| `LLM_API_KEY` / `LLM_DAILY_CAP` | no | Optional fuzzy "did you mean" only; never used for the Contains/Not-listed decision. |

## License & data sources

Drug-label data from the **FDA (openFDA)** and the **U.S. National Library of Medicine (DailyMed)**. Educational reference only — **not medical advice and not a medical device.**
