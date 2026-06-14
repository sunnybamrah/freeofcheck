import type { AllergenDef, MatchResult, NormalizedLabel } from "./types";

// ---------------------------------------------------------------------------
// Token-boundary matching.
//
// We must match whole tokens so "lactose" never matches inside "galactose" or
// "lactobacillus". We deliberately avoid lookBEHIND (`(?<!...)`) because it is
// unsupported on iOS Safari < 16.4; instead we consume an optional leading
// non-alphanumeric char and capture the real token in group 1. Lookahead is
// universally supported.
// ---------------------------------------------------------------------------

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Turn a dictionary term (string phrase or RegExp) into a bounded matcher. */
function toBoundedRegex(term: string | RegExp): RegExp {
  const body =
    term instanceof RegExp
      ? term.source
      : escapeRegex(term.trim()).replace(/\s+/g, "\\s+"); // flexible whitespace in phrases
  // group 1 = the real token (no leading boundary char), case-insensitive, global.
  return new RegExp(`(?:^|[^a-z0-9])(${body})(?![a-z0-9])`, "gi");
}

interface Hit {
  text: string; // verbatim substring from the source (for citation)
  index: number; // start index of the token in the source
}

function findHits(source: string, matchers: RegExp[]): Hit[] {
  const hits: Hit[] = [];
  for (const re of matchers) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(source)) !== null) {
      const token = m[1];
      // group 1 sits at the end of the full match (only an optional 1-char
      // prefix precedes it; the trailing lookahead is zero-width).
      const start = m.index + (m[0].length - token.length);
      hits.push({ text: token, index: start });
      if (m.index === re.lastIndex) re.lastIndex++; // guard against zero-length loops
    }
  }
  return hits;
}

/**
 * Is this redFlag hit neutralised by an adjacent stated source?
 *  - BEFORE: "corn starch", "modified corn starch" (source as the preceding word)
 *  - AFTER:  "starch (corn)", "starch derived from corn" (source stated after)
 * The AFTER check never crosses an ingredient separator (comma/semicolon/pipe),
 * so "starch, corn syrup" correctly stays AMBIGUOUS — the corn belongs to a
 * different ingredient. Safety first: when in doubt, do not suppress.
 */
function isSuppressed(
  source: string,
  hitIndex: number,
  hitLen: number,
  suppressors: string[],
): boolean {
  if (suppressors.length === 0) return false;

  // BEFORE: last alphabetic word immediately preceding the hit.
  const before = source.slice(Math.max(0, hitIndex - 18), hitIndex).toLowerCase();
  const bm = before.match(/([a-z]+)[^a-z]*$/);
  if (bm && suppressors.includes(bm[1])) return true;

  // AFTER: only within the same clause (stop at the next separator), and only
  // when the source is explicitly stated — in parentheses or after "from".
  const afterRaw = source.slice(hitIndex + hitLen, hitIndex + hitLen + 30).toLowerCase();
  const after = afterRaw.split(/[,;|]/)[0];
  for (const s of suppressors) {
    const esc = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`\\(\\s*${esc}\\b|\\bfrom\\s+${esc}\\b`).test(after)) return true;
  }
  return false;
}

/** Case-insensitive de-dup that preserves the first original casing seen. */
function uniqHits(hits: Hit[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const h of hits) {
    const key = h.text.toLowerCase().replace(/\s+/g, " ");
    if (!seen.has(key)) {
      seen.add(key);
      out.push(h.text.replace(/\s+/g, " "));
    }
  }
  return out;
}

// Compiled matchers are cached per AllergenDef object (the dictionary is static).
interface Compiled {
  includes: RegExp[];
  redFlags: RegExp[];
}
const cache = new WeakMap<AllergenDef, Compiled>();

function compile(allergen: AllergenDef): Compiled {
  let c = cache.get(allergen);
  if (!c) {
    c = {
      includes: allergen.includes.map(toBoundedRegex),
      redFlags: (allergen.redFlags ?? []).map(toBoundedRegex),
    };
    cache.set(allergen, c);
  }
  return c;
}

/**
 * Evaluate ONE allergen against ONE label's inactive-ingredient text.
 * Precedence: CONTAINS > AMBIGUOUS(amber) > NOT_LISTED(green) > NO_DATA.
 * Green is reserved strictly for "label listed ingredients and none matched".
 */
export function evaluateText(inactiveIngredient: string[], allergen: AllergenDef): MatchResult {
  // Trim/drop empty entries BEFORE joining, so an array of whitespace-only
  // strings (e.g. ["  ", ""]) is treated as no_data, not a green "not listed".
  const source = (inactiveIngredient ?? [])
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(" | ");
  if (!source) {
    return { state: "no_data", containsHits: [], ambiguousHits: [] };
  }

  const { includes, redFlags } = compile(allergen);

  const containsHits = uniqHits(findHits(source, includes));
  if (containsHits.length > 0) {
    return { state: "contains", containsHits, ambiguousHits: [] };
  }

  if (redFlags.length > 0) {
    const suppressors = (allergen.redFlagSuppressors ?? []).map((s) => s.toLowerCase());
    const kept = findHits(source, redFlags).filter(
      (h) => !isSuppressed(source, h.index, h.text.length, suppressors),
    );
    const ambiguousHits = uniqHits(kept);
    if (ambiguousHits.length > 0) {
      return { state: "ambiguous", containsHits: [], ambiguousHits };
    }
  }

  return { state: "not_listed", containsHits: [], ambiguousHits: [] };
}

/** Convenience wrapper: evaluate a normalized label. */
export function evaluateLabel(label: NormalizedLabel, allergen: AllergenDef): MatchResult {
  return evaluateText(label.inactiveIngredient, allergen);
}
