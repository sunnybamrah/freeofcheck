import type { AllergenDef, NormalizedLabel, VerdictState } from "./types";
import { evaluateLabel } from "./matcher";

// Client-side verdict assembly. The deterministic dictionary runs here (in the
// browser) so the matching IP ships with the app and the UI works offline for
// cached data. Never call an LLM for the Contains/Not-listed decision.

export interface VerdictCard {
  key: string;
  state: VerdictState;
  /** brand, else generic, else an honest "Brand not specified on label" */
  title: string;
  manufacturer: string | null;
  dosage: string | null;
  effectiveDate: string | null;
  /** verbatim substrings that triggered Contains / amber (for the chip subtitle) */
  hits: string[];
  /** verbatim FDA inactive-ingredient passages (the citation) */
  passages: string[];
  dailymedUrl: string | null;
  hasIngredientData: boolean;
}

export function dailymedUrl(splSetId: string | null): string | null {
  return splSetId
    ? `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${encodeURIComponent(splSetId)}`
    : null;
}

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\bHcl\b/g, "HCl")
    .trim();
}

function normKey(s: string | null): string {
  return (s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\bhydrochloride\b/g, "hcl")
    .trim();
}

/**
 * Group labels into per-formulation cards (dedup identical casings/versions),
 * one verdict each. Distinct formulations (different manufacturer/brand/dosage
 * or different ingredient text) remain separate cards.
 */
export function buildVerdictCards(labels: NormalizedLabel[], allergen: AllergenDef): VerdictCard[] {
  const map = new Map<string, VerdictCard>();
  for (const l of labels) {
    const m = evaluateLabel(l, allergen);
    const sig = l.inactiveIngredient.join("|").toLowerCase().replace(/\s+/g, " ");
    const key = [normKey(l.manufacturerName), normKey(l.brandName), normKey(l.dosageForm ?? l.route), m.state, sig].join(
      "##",
    );
    if (map.has(key)) continue;
    map.set(key, {
      key,
      state: m.state,
      title:
        (l.brandName && titleCase(l.brandName)) ||
        (l.genericName && titleCase(l.genericName)) ||
        "Brand not specified on label",
      manufacturer: l.manufacturerName ? titleCase(l.manufacturerName) : null,
      dosage: l.dosageForm ?? l.route,
      effectiveDate: l.effectiveDate,
      hits: m.state === "contains" ? m.containsHits : m.state === "ambiguous" ? m.ambiguousHits : [],
      passages: l.inactiveIngredient.filter((s) => s.trim().length > 0),
      dailymedUrl: dailymedUrl(l.splSetId),
      hasIngredientData: l.inactiveIngredient.some((s) => s.trim().length > 0),
    });
  }
  return [...map.values()];
}

// Display order: reassuring (not-listed) first, then Contains, then amber, then
// no-data last. Position is a 4th, non-color cue (spec §4.3). A count summary is
// shown above so a Contains result is never hidden by scrolling.
const STATE_ORDER: VerdictState[] = ["not_listed", "contains", "ambiguous", "no_data"];

export function sortCards(cards: VerdictCard[]): VerdictCard[] {
  return [...cards].sort(
    (a, b) =>
      STATE_ORDER.indexOf(a.state) - STATE_ORDER.indexOf(b.state) ||
      a.title.localeCompare(b.title),
  );
}

export type StateCounts = Record<VerdictState, number>;

export function summarize(cards: VerdictCard[]): StateCounts {
  const c: StateCounts = { contains: 0, ambiguous: 0, not_listed: 0, no_data: 0 };
  for (const card of cards) c[card.state]++;
  return c;
}
