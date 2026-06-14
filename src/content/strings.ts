// All user-facing copy in one place (i18n-readiness, spec §9). Plain language at
// a 4th–6th-grade reading level. Never the word "excipient"; never "safe";
// never "free of" as a verdict.
import type { VerdictState } from "../lib/types";

export const S = {
  brand: "FreeOfCheck",
  tagline: "Know what's NOT in your medicine.",
  taglineAlt: "Type a med. Pick what to avoid. See the label.",

  home: {
    h1: "Check what's in your medicine",
    intro: "Type a medicine and pick an ingredient you want to avoid. We'll read the official FDA label and show you, with the exact label text.",
    drugLabel: "Medicine name",
    drugPlaceholder: "e.g., ibuprofen, Children's Tylenol",
    ingredientLabel: "Ingredient to avoid",
    ingredientHint: "Pick one, or type your own",
    customPlaceholder: "Type another ingredient…",
    checkButton: "Check the label",
    emptyHint: "Type a medicine and choose an ingredient to begin.",
  },

  loading: "Searching official FDA labels…",

  results: {
    forHeading: (drug: string, ingredient: string) => `${ingredient} in ${drug}`,
    showingCapped: (shown: number, total: number) =>
      `Showing the first ${shown} of ${total} FDA labels for this medicine.`,
    countSummary: (counts: Record<VerdictState, number>) => {
      const parts: string[] = [];
      if (counts.not_listed) parts.push(`${counts.not_listed} not listed`);
      if (counts.contains) parts.push(`${counts.contains} contain it`);
      if (counts.ambiguous) parts.push(`${counts.ambiguous} uncertain`);
      if (counts.no_data) parts.push(`${counts.no_data} with no ingredient list`);
      return parts.join(" · ");
    },
    showSource: "Show FDA source",
    hideSource: "Hide FDA source",
    viewDailymed: "View full label on DailyMed",
    labelDated: (d: string | null) => (d ? `FDA label dated ${d}` : "FDA label date not stated"),
    noDataGroupTitle: (n: number) => `${n} label${n === 1 ? "" : "s"} with no ingredient list`,
    noDataGroupHint:
      "These FDA labels don't list inactive ingredients in a readable form. Check the full label on DailyMed or ask your pharmacist.",
    showAll: "Show all formulations",
    showFewer: "Show fewer",
  },

  verdict: {
    label(state: VerdictState, ingredient: string): string {
      switch (state) {
        case "contains":
          return `Contains ${ingredient}`;
        case "ambiguous":
          return `Possibly contains ${ingredient} — source not stated`;
        case "not_listed":
          return `Likely free — ${ingredient} not listed`;
        case "no_data":
          return "The label doesn't say";
      }
    },
    foundText: (hits: string[]) => (hits.length ? `Found on label: ${hits.join(", ")}` : ""),
    // The mandatory per-row absence caveat (spec §3.5) — shown on every not_listed row.
    notListedCaveat: (ingredient: string) =>
      `This FDA label does not list ${ingredient}, but absence from a label is not a guarantee. Formulations change, generics differ by manufacturer, and the FDA does not require the source of every ingredient to be named. Confirm with your pharmacist or the manufacturer before relying on this — especially for a severe allergy.`,
    ambiguousCaveat:
      "This ingredient can come from more than one source, and the label does not say which. Treat this as uncertain — confirm with the manufacturer or your pharmacist.",
    noDataCaveat:
      "This FDA label doesn't list inactive ingredients in a readable form. Check the full label on DailyMed or ask your pharmacist.",
  },

  states: {
    empty: {
      title: "Start a check",
      body: "Type a medicine and choose an ingredient you want to avoid.",
    },
    noMatch: {
      title: (drug: string) => `We couldn't find a medicine named "${drug}"`,
      body: "Check the spelling, or try the active ingredient (for example, “ibuprofen” instead of a brand name).",
      didYouMean: "Did you mean:",
    },
    error: {
      title: "We couldn't reach the FDA database just now",
      body: "This is on our end, not yours. Please try again in a moment.",
      retry: "Try again",
    },
    degraded:
      "We're seeing high traffic right now, so some results may be from our recent cache.",
  },

  disclaimer: {
    // Persistent disclaimer — must render in EVERY state (sticky footer + under results).
    full: "Educational reference only. Not medical advice and not a medical device. Inactive-ingredient data comes directly from FDA labels (openFDA / DailyMed) and may be incomplete — the FDA does not require manufacturers to disclose the source of every ingredient, so a missing allergen is not a guarantee of absence. Always confirm with the manufacturer and your pharmacist before relying on this — especially for severe allergies or anaphylaxis risk.",
    short:
      "Educational reference only — not medical advice. FDA label data can be incomplete, so a missing ingredient is not a guarantee. Always confirm with your pharmacist.",
    modalTitle: "Before you start",
    modalAccept: "I understand",
  },

  trust: {
    title: "Why you can trust this",
    body: "Every answer comes straight from the official FDA drug label, published by the U.S. National Library of Medicine (DailyMed) and the FDA (openFDA). We don't guess, and we don't store anything you type.",
    method: "We search the label's Inactive Ingredients section for the ingredient you named.",
    sources: "Sources: openFDA drug labels + DailyMed.",
  },

  pharmacistView: {
    toggle: "Pharmacist view",
    on: "Pharmacist view on",
    hint: "Shows raw label text and all formulations by default.",
  },

  freshness:
    "Label data from openFDA, refreshed weekly. Newer reformulations may not be reflected — the definitive source is the current package insert.",
} as const;
