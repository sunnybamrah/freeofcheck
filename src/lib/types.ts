// FreeOfCheck — shared types for the allergen engine and the FDA proxy.

/**
 * The three load-bearing verdict states (+ amber ambiguity).
 * NEVER collapse these, never add a fourth, never use the words "free of".
 * Green (`not_listed`) is reserved ONLY for "the label listed ingredients and
 * none matched" — it is NOT a guarantee of absence.
 */
export type VerdictState = "contains" | "ambiguous" | "not_listed" | "no_data";

/** One avoidable ingredient and how to recognise it in free-text label prose. */
export interface AllergenDef {
  /** stable id / SEO slug fragment, e.g. "peg" */
  id: string;
  /** full user-facing label, e.g. "PEG (polyethylene glycol)" */
  label: string;
  /** short chip label, e.g. "PEG" */
  shortLabel: string;
  /** one-line plain explanation for chips / landing pages */
  blurb: string;
  /** terms whose presence means CONTAINS (red) */
  includes: Array<string | RegExp>;
  /**
   * ambiguous-source terms whose presence means AMBIGUOUS (amber, never green).
   * e.g. unsourced "starch" for gluten.
   */
  redFlags?: Array<string | RegExp>;
  /**
   * Source qualifiers that NEUTRALISE a redFlag when adjacent to it, e.g. a
   * starch redFlag is suppressed by a preceding "corn"/"potato" (gluten-free
   * source). Only applied to redFlag matches, never to `includes`.
   */
  redFlagSuppressors?: string[];
  /** whether this allergen is offered as a quick chip on the home screen */
  chip?: boolean;
}

/** Result of matching ONE allergen against ONE label's inactive-ingredient text. */
export interface MatchResult {
  state: VerdictState;
  /** verbatim substrings from the source that triggered CONTAINS */
  containsHits: string[];
  /** verbatim substrings from the source that triggered AMBIGUOUS (amber) */
  ambiguousHits: string[];
}

/** A normalized FDA label returned by the proxy (the wire shape the client uses). */
export interface NormalizedLabel {
  /** openFDA SPL document id (unique per label version) */
  splId: string;
  /** SPL set id — used for the DailyMed deep link */
  splSetId: string | null;
  brandName: string | null;
  genericName: string | null;
  manufacturerName: string | null;
  dosageForm: string | null;
  route: string | null;
  /** SPL effective_time, normalized to YYYY-MM-DD when possible */
  effectiveDate: string | null;
  /** raw inactive_ingredient passages, verbatim (for citation) */
  inactiveIngredient: string[];
  /** whether the label carried any openfda harmonization object */
  openfdaPresent: boolean;
}

/** The proxy response for a drug lookup. */
export interface CheckResponse {
  query: string;
  resolvedAs: string | null;
  total: number;
  capped: boolean;
  fromCache: boolean;
  /** true when the daily upstream budget is nearly spent (client shows a soft banner) */
  degraded?: boolean;
  labels: NormalizedLabel[];
}

/** A standard API error payload (never leaks stack traces to the SPA). */
export interface ApiError {
  error: string;
  code:
    | "not_found"
    | "upstream_unavailable"
    | "rate_limited"
    | "budget_exhausted"
    | "bad_request"
    | "timeout";
  suggestions?: string[];
}
