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
  {
    id: "gelatin",
    label: "Gelatin",
    shortLabel: "Gelatin",
    blurb: "Animal-derived capsule shells and coatings. Matters for vegetarian, vegan, halal, and kosher needs.",
    chip: true,
    includes: [/gelatine?/],
  },
  {
    id: "titanium-dioxide",
    label: "Titanium dioxide",
    shortLabel: "Titanium dioxide",
    blurb: "A white colorant/opacifier (E171), banned in EU food. Common in tablet coatings.",
    chip: true,
    includes: [/titanium\s+dioxide/, /\be\s?171\b/, /ci\s?77891/],
  },
  {
    id: "sesame",
    label: "Sesame",
    shortLabel: "Sesame",
    blurb: "A major U.S. allergen (FALCPA). Rare in medicines but serious for those allergic.",
    includes: [/sesames?/, /sesamum/, "sesame oil"],
  },
  {
    id: "peanut",
    label: "Peanut",
    shortLabel: "Peanut",
    blurb: "Peanut (arachis / groundnut) oil appears in some injectables and softgels.",
    includes: [/peanuts?/, /arachis/, /groundnut/],
  },
  {
    id: "corn",
    label: "Corn",
    shortLabel: "Corn",
    blurb: "Corn-derived fillers and sugars. Many corn excipients aren't labeled by source.",
    includes: [/\bcorn\b/, /\bmaize\b/, /corn\s?starch/, /corn\s+syrup/],
    // Often corn-derived, but the label may not say -> uncertain (amber).
    redFlags: [/maltodextrin/, /dextrose/, /\bdextrin\b/],
  },
  {
    id: "sulfites",
    label: "Sulfites",
    shortLabel: "Sulfites",
    blurb: "Preservatives that can trigger asthma or sensitivity reactions.",
    includes: [/sul(?:f|ph)ites?/, /metabisul(?:f|ph)ite/, /bisul(?:f|ph)ite/, /\be\s?22[0-8]\b/],
  },
  {
    id: "aspartame",
    label: "Aspartame / phenylalanine",
    shortLabel: "Aspartame",
    blurb: "Sweetener containing phenylalanine — important for people with PKU.",
    includes: [/aspartame/, /phenylalanine/, /\be\s?951\b/],
  },
  {
    id: "propylene-glycol",
    label: "Propylene glycol",
    shortLabel: "Propylene glycol",
    blurb: "A solvent some people are sensitive to. NOT the same as PEG.",
    includes: [/propylene\s+glycol/, /\be\s?1520\b/],
  },
  {
    id: "benzyl-alcohol",
    label: "Benzyl alcohol / benzoates",
    shortLabel: "Benzyl alcohol",
    blurb: "Preservatives cautioned in newborns and for those sensitive to benzoates.",
    includes: [/benzyl\s+alcohol/, /benzoic\s+acid/, /benzoates?/, /\be\s?21[0-3]\b/],
  },
  {
    id: "parabens",
    label: "Parabens",
    shortLabel: "Parabens",
    blurb: "Preservatives (methyl-, propyl-paraben) some people prefer to avoid.",
    includes: [/(?:methyl|ethyl|propyl|butyl|isobutyl)?parabens?/, /\be\s?21[4-9]\b/],
  },
  {
    id: "sorbitol",
    label: "Sorbitol / mannitol",
    shortLabel: "Sorbitol",
    blurb: "Sugar alcohols (FODMAPs) that can cause GI upset in sensitive people.",
    includes: [/sorbitol/, /mannitol/, /\be\s?42[01]\b/],
  },
  {
    id: "milk",
    label: "Milk (dairy protein)",
    shortLabel: "Milk protein",
    blurb: "Milk proteins (casein, whey) — for a milk allergy, which is different from lactose intolerance.",
    includes: [/\bmilk\b/, "milk protein", /caseinates?/, /\bcasein\b/, /\bwhey\b/, /lactalbumin/],
  },
  {
    id: "egg",
    label: "Egg",
    shortLabel: "Egg",
    blurb: "Egg-derived ingredients such as egg lecithin, ovalbumin, or lysozyme.",
    includes: [/\beggs?\b/, /ovalbumin/, /lysozyme/],
  },
  {
    id: "polysorbate",
    label: "Polysorbate (80 / 20)",
    shortLabel: "Polysorbate",
    blurb: "Polysorbate 80/20 (Tween) — matters for PEG-sensitive people; explicitly named on labels.",
    includes: [/polysorbate\s?\d{2}/, /\be\s?43[23]\b/, /tween\s?\d{2}/],
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
