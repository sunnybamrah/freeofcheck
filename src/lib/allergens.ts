import type { AllergenDef } from "./types";

/**
 * Versioned, deterministic allergen dictionary — the product's core IP.
 * This is NOT an LLM. A dictionary is more accurate, auditable, reproducible,
 * and free. Bump DICTIONARY_VERSION on any change and update the golden tests.
 *
 * Matching semantics (see matcher.ts):
 *  - case-insensitive, whole-token (so "lactose" never matches "galactose")
 *  - `includes` -> CONTAINS (red)
 *  - `redFlags` -> AMBIGUOUS (amber) unless an adjacent `redFlagSuppressors`
 *    word neutralises it (e.g. "corn starch" is not amber for gluten)
 */
export const DICTIONARY_VERSION = "1.0.0";
export const DICTIONARY_UPDATED = "2026-06-14";

export const ALLERGENS: AllergenDef[] = [
  {
    id: "peg",
    label: "PEG (polyethylene glycol)",
    shortLabel: "PEG",
    blurb:
      "A hidden allergen in many tablets and injectables. Also called polyethylene glycol or macrogol.",
    chip: true,
    includes: [
      /polyethylene\s+glycols?/,
      /macrogols?/,
      /\bpeg(?:[-\s]?\d{1,5})?/, // PEG, PEG 8, PEG-400, PEG3350 (single-digit grades exist)
      /polyoxyl\s*\d*/, // polyoxyl 35 castor oil / polyoxyl 40 stearate = PEG derivatives
      "e1521",
    ],
  },
  {
    id: "lactose",
    label: "Lactose",
    shortLabel: "Lactose",
    blurb: "Milk sugar used as a tablet/capsule filler. Common in oral medicines.",
    chip: true,
    includes: [
      "lactose",
      "lactose monohydrate",
      "anhydrous lactose",
      "spray-dried lactose",
      "pharmatose",
      "supertab",
      "capsulac",
      "granulac",
      "tablettose",
    ],
  },
  {
    id: "yellow5",
    label: "Yellow 5 (tartrazine)",
    shortLabel: "Yellow 5",
    blurb: "FD&C Yellow No. 5 / tartrazine — a dye linked to sensitivity reactions.",
    chip: true,
    includes: [
      /tartrazine/,
      /fd\s*&\s*c\s+yellow\s+(?:no\.?\s*|#\s*)?5/, // FD&C Yellow No. 5 / #5
      /\byellow\s+(?:no\.?\s*|#\s*)?5\b/,
      /e\s?102\b/,
    ],
  },
  {
    id: "red40",
    label: "Red 40 (Allura Red)",
    shortLabel: "Red 40",
    blurb: "FD&C Red No. 40 / Allura Red — a common synthetic colorant (incl. aluminum lakes).",
    chip: true,
    includes: [
      /fd\s*&\s*c\s+red\s+(?:no\.?\s*|#\s*)?40/,
      /\bred\s+(?:no\.?\s*|#\s*)?40\b/,
      /allura\s+red(?:\s+ac)?/,
      /e\s?129\b/,
    ],
  },
  {
    id: "yellow6",
    label: "Yellow 6 (Sunset Yellow)",
    shortLabel: "Yellow 6",
    blurb: "FD&C Yellow No. 6 / Sunset Yellow — a synthetic colorant (incl. aluminum lakes).",
    chip: false,
    includes: [
      /fd\s*&\s*c\s+yellow\s+(?:no\.?\s*|#\s*)?6/,
      /\byellow\s+(?:no\.?\s*|#\s*)?6\b/,
      /sunset\s+yellow(?:\s+fcf)?/,
      /e\s?110\b/,
    ],
  },
  {
    id: "soy",
    label: "Soy",
    shortLabel: "Soy",
    blurb: "Soy-derived ingredients such as soybean oil or soy lecithin.",
    chip: true,
    // /soybeans?/ catches "soybean", "soybeans", and "soybean(s) oil" — a plain
    // "soybean" string term would miss the real FDA spelling "soybeans".
    includes: ["soy", "soya", /soybeans?/, "soy lecithin", "soya lecithin"],
    // Bare "lecithin" without a stated source is often soy-derived -> amber.
    redFlags: ["lecithin"],
    redFlagSuppressors: ["sunflower", "egg", "rapeseed", "canola"],
  },
  {
    id: "gluten",
    label: "Gluten",
    shortLabel: "Gluten",
    blurb:
      "Wheat/barley/rye proteins. FDA does not require the source of every starch to be named, so unsourced starch is uncertain.",
    chip: true,
    // CONTAINS: wheat (incl. closed compounds like "wheatgerm" + botanical
    // wheat species) or gluten (but NOT "gluten-free").
    includes: [
      /\bwheat[a-z]*/, // wheat, wheatgerm, wheaten — but not buckwheat (prefix boundary)
      /gluten(?![\s-]?free)/,
      "spelt",
      "durum",
      "semolina",
      "kamut",
      "farro",
      "einkorn",
      "triticale", // wheat x rye hybrid
      "graham flour",
    ],
    // AMBIGUOUS (amber): starch-family + barley/rye/malt whose gluten status the
    // label does not pin down. Deliberately conservative: "possibly contains,
    // source not stated" — never green. This is the product's integrity test.
    redFlags: [
      "modified starch",
      "pregelatinized starch",
      "sodium starch glycolate",
      /starch(?:es)?/, // bare/unsourced starch, incl. plural "starches"
      "dextrin",
      "dextrate",
      "dextrates",
      "barley",
      "rye",
      "malt", // malt/malt extract is near-always barley-derived (won't catch maltodextrin)
    ],
    // Suppress a starch redFlag when an adjacent gluten-free source is named.
    redFlagSuppressors: ["corn", "maize", "potato", "tapioca", "rice", "pea", "arrowroot", "sago"],
  },
];

export const ALLERGENS_BY_ID: Record<string, AllergenDef> = Object.fromEntries(
  ALLERGENS.map((a) => [a.id, a]),
);

export const CHIP_ALLERGENS: AllergenDef[] = ALLERGENS.filter((a) => a.chip);

export function getAllergen(id: string): AllergenDef | undefined {
  return ALLERGENS_BY_ID[id];
}

/**
 * Build a one-off allergen definition for a free-text term the user typed that
 * is not in the dictionary. No redFlags (we can't reason about source for an
 * arbitrary term) — only literal CONTAINS / not-listed.
 */
export function adHocAllergen(term: string): AllergenDef {
  const clean = term.trim();
  return {
    id: "custom:" + clean.toLowerCase(),
    label: clean,
    shortLabel: clean,
    blurb: "",
    includes: [clean],
  };
}
