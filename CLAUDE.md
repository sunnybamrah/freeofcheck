# CLAUDE.md — FreeOfCheck

Guidance for working in this repo.

## What this is

A free, stateless, FDA-source-cited medication ingredient/allergen checker. A user enters a medicine + an ingredient to avoid; the app reads the official FDA label and returns per-formulation verdict cards with the verbatim label passage cited and a DailyMed link.

**Live:** https://freeofcheck-production.up.railway.app · **Repo:** sunnybamrah/freeofcheck

## The non-negotiable rule (read before touching anything user-facing)

FDA labels list what a product **contains**, not what it is *free of*. The app may prove "Contains X" but must **never** claim "free of". The most it says is "not listed on this label". Green is reserved **only** for "the label listed ingredients and none matched". Unsourced/ambiguous ingredients (e.g. plain "starch" for gluten) must render **amber**, never green. These rules are enforced by `src/lib/safety.test.tsx` — do not weaken them.

## Architecture

```
Browser (React SPA + dictionary)  ──/api──▶  Hono server  ──▶  openFDA / DailyMed
   matching happens HERE (client)              thin proxy: key, cache, rate-limit, budget
```

- `src/lib/allergens.ts` — versioned synonym dictionary (the core IP; **not** an LLM). Bump `DICTIONARY_VERSION` on change.
- `src/lib/matcher.ts` — word-boundary, case-insensitive matcher; three states + amber; gluten source-suppression. No lookbehind (iOS Safari < 16.4 safe).
- `src/lib/verdict.ts` — groups labels into per-formulation cards, sorts (not-listed → contains → amber → no-data).
- `server/openfda.ts` — name-only query + paginate + label cap + Rx fallback (`spl_product_data_elements + _exists_`). Avoids the `openfda.* AND inactive_ingredient` NOT_FOUND trap.
- `server/{cache,ratelimit,api}.ts` — 24h volatile LRU (drug-key only, never per-user), per-IP token bucket, daily budget counter, clean error mapping.
- `src/components/*`, `src/pages/*` — UI. All strings in `src/content/strings.ts` + `src/content/pages.ts` (i18n-ready). No asset/CSS imports outside `main.tsx` (so the tree prerenders with tsx).
- `scripts/prerender.tsx` — build-time SEO prerender of every marketing/legal route + sitemap.
- `src/content/seo.ts` — per-route title/meta/canonical + JSON-LD.

## Commands

```bash
npm run dev          # client :5173 + API :8787 (FOC_DEV=1 so server skips static)
npm run build        # vite build -> prerender -> esbuild server bundle
npm start            # node server/dist/index.js (serves dist + /api; static unless FOC_DEV=1)
npm run typecheck && npm run lint && npm test
npm run test:coverage           # 70% gate
npm run build && npm run test:e2e   # Playwright mobile E2E + axe (needs chromium)
npm run gen:assets              # regenerate favicons/PWA icons/OG from SVG masters
```

## Conventions

- **No asset/CSS imports** in any component except `src/main.tsx` (keeps the whole tree prerenderable via tsx). Use Tailwind classes, inline SVG (`Icons.tsx`), and `/public` URL strings.
- **All user-facing copy** goes in `src/content/strings.ts` (UI) or `src/content/pages.ts` (pages). Never the word "excipient", "safe", or "free of" as a verdict.
- **Filled buttons** use `bg-trustBtn` (passes WCAG white-on-blue); inline `<a>` links are underlined. Keep every route axe-clean (`tests/e2e/a11y.spec.ts`).
- **Matching is client-side**; the server never decides Contains/Not-listed. Adding an allergen = edit `allergens.ts` + add tests; switching ingredient in the UI does not refetch.

## Deploy

Railway (Nixpacks, `railway.json`): build `npm run build`, start `npm start`, healthcheck `/healthz`. Set `OPENFDA_API_KEY` in Railway → Service → Variables for production rate limits (free from open.fda.gov). CI: `.github/workflows/ci.yml` (typecheck → lint → coverage → build → E2E/axe). Nightly openFDA schema-drift check: `.github/workflows/nightly-schema.yml`.

## When adding/changing matcher behavior

1. Edit `allergens.ts` / `matcher.ts`.
2. Add cases to `matcher.test.ts` — especially **negatives** (false-positives) and **false-greens** (the dangerous class).
3. Run the live probe mentally: OTC drugs have rich data; Rx drugs are sparse (fallback path).
4. Never let a gluten + ambiguous-starch case go green.
