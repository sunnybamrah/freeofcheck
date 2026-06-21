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
export const DICTIONARY_VERSION = "1.1.0";
export const DICTIONARY_UPDATED = "2026-06-15";

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
  // --- triple-checked additions (Decision-Council-style workflow, 27 verified) ---
  {
    id: "blue-1",
    label: "FD&C Blue No. 1 (Brilliant Blue FCF) and its aluminum lake",
    shortLabel: "Blue 1",
    blurb: "A man-made blue color in pills and capsules; some people avoid artificial dyes because of worries about reactions or effects on kids.",
    includes: ["fd&c blue no. 1", "fd&c blue no.1", "fd&c blue #1", "fd&c blue 1", "fdc blue no. 1", "fd&c blue no. 1 aluminum lake", "fd&c blue no. 1 aluminium lake", "fd&c blue no. 1/brilliant blue fcf aluminum lake", "brilliant blue fcf", "brilliant blue", "blue 1 lake", "blue 1 aluminum lake", "acid blue 9", "ci 42090", "c.i. 42090", "e 133", "e133"],
  },
  {
    id: "blue-2",
    label: "FD&C Blue No. 2 (Indigotine / Indigo Carmine) and its aluminum lake",
    shortLabel: "Blue 2",
    blurb: "A man-made deep-blue color used to tint medicines; some people avoid artificial dyes.",
    includes: ["fd&c blue no. 2", "fd&c blue no.2", "fd&c blue #2", "fd&c blue 2", "fdc blue no. 2", "fd&c blue no. 2 aluminum lake", "fd&c blue no. 2 aluminium lake", "fd&c blue no. 2/indigo carmine aluminum lake", "indigotine", "indigo carmine", "indigotindisulfonate sodium", "blue 2 lake", "ci 73015", "c.i. 73015", "e 132", "e132"],
  },
  {
    id: "green-3",
    label: "FD&C Green No. 3 (Fast Green FCF) and its aluminum lake",
    shortLabel: "Green 3",
    blurb: "A man-made green color sometimes used in pills; some people avoid artificial dyes.",
    includes: ["fd&c green no. 3", "fd&c green no.3", "fd&c green #3", "fd&c green 3", "fdc green no. 3", "fd&c green no. 3 aluminum lake", "fd&c green no. 3 aluminium lake", "fast green fcf", "fast green", "green 3 lake", "ci 42053", "c.i. 42053", "e 143", "e143"],
  },
  {
    id: "red-3",
    label: "FD&C Red No. 3 (Erythrosine)",
    shortLabel: "Red 3",
    blurb: "A man-made cherry-red dye now being banned from US food; many people avoid it after safety concerns.",
    includes: ["fd&c red no. 3", "fd&c red no.3", "fd&c red #3", "fd&c red 3", "fdc red no. 3", "fd&c red no. 3 aluminum lake", "fd&c red no. 3 aluminium lake", "erythrosine", "erythrosin", "red 3 lake", "ci 45430", "c.i. 45430", "e 127", "e127"],
  },
  {
    id: "dc-red-27-28",
    label: "D&C Red No. 27 / Red No. 28 (Phloxine B) and lakes",
    shortLabel: "D&C Red 27/28",
    blurb: "Man-made pink/red dyes used in some medicines and coatings; some people avoid artificial dyes.",
    includes: ["d&c red no. 27", "d&c red no.27", "d&c red #27", "d&c red 27", "d&c red no. 27 aluminum lake", "d&c red no. 28", "d&c red no.28", "d&c red #28", "d&c red 28", "phloxine b", "ci 45410", "c.i. 45410"],
  },
  {
    id: "dc-yellow-10",
    label: "D&C Yellow No. 10 (Quinoline Yellow) and its aluminum lake",
    shortLabel: "D&C Yellow 10",
    blurb: "A man-made yellow dye used to color pills and capsules; some people avoid artificial dyes.",
    includes: ["d&c yellow no. 10", "d&c yellow no.10", "d&c yellow #10", "d&c yellow 10", "dc yellow no. 10", "d&c yellow no. 10 aluminum lake", "d&c yellow no. 10 aluminium lake", "quinoline yellow", "quinoline yellow ws", "yellow 10 lake", "ci 47005", "c.i. 47005", "e 104", "e104"],
  },
  {
    id: "carmine",
    label: "Carmine / Cochineal Extract (Carminic Acid)",
    shortLabel: "Carmine",
    blurb: "A red color made from crushed insects; people avoid it for allergy/anaphylaxis risk or because it is not vegan, vegetarian, kosher, or halal.",
    includes: ["carmine", "cochineal", "cochineal extract", "carminic acid", "natural red 4", "c.i. natural red 4", "ci 75470", "c.i. 75470", "e 120", "e120"],
  },
  {
    id: "iron-oxides",
    label: "Iron Oxides (red, yellow, black ferric/ferrous oxides)",
    shortLabel: "Iron Oxides",
    blurb: "Mineral-based colors (rust shades) used to tint pills and capsules; some people prefer to avoid all added colorants.",
    includes: ["iron oxide", "iron oxides", "iron oxide red", "iron oxide yellow", "iron oxide black", "ferric oxide", "red ferric oxide", "ferric oxide red", "yellow ferric oxide", "ferrosoferric oxide", "black iron oxide", "synthetic iron oxide", "ci 77491", "ci 77492", "ci 77499", "e 172", "e172"],
  },
  {
    id: "annatto",
    label: "Annatto / Annatto Extract (Bixin / Norbixin)",
    shortLabel: "Annatto",
    blurb: "A plant-seed orange-yellow color; usually natural but a known allergy trigger for some people.",
    includes: ["annatto", "annatto extract", "bixin", "norbixin", "c.i. natural orange 4", "ci 75120", "c.i. 75120", "e 160b", "e160b"],
  },
  {
    id: "bha",
    label: "Butylated hydroxyanisole",
    shortLabel: "BHA",
    blurb: "A man-made antioxidant added to keep oils from going bad; some people avoid it over safety worries.",
    includes: ["bha", "butylated hydroxyanisole", "butylated hydroxyanisole (bha)", "e 320", "e320"],
  },
  {
    id: "bht",
    label: "Butylated hydroxytoluene",
    shortLabel: "BHT",
    blurb: "A man-made antioxidant that stops fats from spoiling; some people skip it due to safety concerns.",
    includes: ["bht", "butylated hydroxytoluene", "butylated hydroxytoluene (bht)", "e 321", "e321"],
  },
  {
    id: "edta",
    label: "Edetate disodium (EDTA)",
    shortLabel: "EDTA",
    blurb: "A helper that grabs onto metals to keep medicine stable; some people react to it or want to avoid it.",
    includes: ["edetate disodium", "disodium edetate", "edetate disodium anhydrous", "edetate disodium dihydrate", "edetate calcium disodium", "calcium disodium edetate", "edetate sodium", "edetic acid", "edta", "disodium edta", "tetrasodium edta", "e 385", "e385"],
  },
  {
    id: "sorbic-acid",
    label: "Sorbic acid",
    shortLabel: "Sorbic acid",
    blurb: "A preservative that stops mold and yeast; a few people get skin or mouth irritation from it.",
    includes: ["sorbic acid", "e 200", "e200"],
  },
  {
    id: "k-sorbate",
    label: "Potassium sorbate",
    shortLabel: "K sorbate",
    blurb: "A common mold-stopping preservative; some people avoid it because it can irritate skin.",
    includes: ["potassium sorbate", "e 202", "e202"],
  },
  {
    id: "chlorobutanol",
    label: "Chlorobutanol",
    shortLabel: "Chlorobutanol",
    blurb: "A preservative often in eye drops and shots; some people are sensitive to it.",
    includes: ["chlorobutanol", "chlorobutanol hemihydrate", "chlorobutanol anhydrous", "chlorbutanol"],
  },
  {
    id: "phenol",
    label: "Phenol",
    shortLabel: "Phenol",
    blurb: "A preservative used in some shots and skin products; some people are allergic or want to avoid it.",
    includes: ["phenol", "liquefied phenol", "phenol, liquefied"],
  },
  {
    id: "cresol",
    label: "Cresol (metacresol)",
    shortLabel: "Cresol",
    blurb: "A preservative used in insulin and other shots; some people react to it at the injection spot.",
    includes: ["cresol", "m-cresol", "metacresol", "meta-cresol", "p-cresol", "o-cresol"],
  },
  {
    id: "fructose",
    label: "Fructose",
    shortLabel: "Fructose",
    blurb: "A fruit sugar used to sweeten medicines. People with fructose intolerance or diabetes avoid it.",
    includes: ["fructose", "fructose nf", "high fructose corn syrup", "fructose, liquid", "levulose"],
  },
  {
    id: "xylitol",
    label: "Xylitol",
    shortLabel: "Xylitol",
    blurb: "A sugar substitute that can upset the stomach in big amounts and is very poisonous to dogs.",
    includes: ["xylitol", "xylitol nf", "e 967", "e967"],
  },
  {
    id: "maltitol",
    label: "Maltitol",
    shortLabel: "Maltitol",
    blurb: "A sugar alcohol sweetener that can cause gas, bloating, or loose stools for some people.",
    includes: ["maltitol", "maltitol solution", "maltitol syrup", "lycasin", "e 965", "e965", "hydrogenated glucose syrup"],
  },
  {
    id: "isomalt",
    label: "Isomalt",
    shortLabel: "Isomalt",
    blurb: "A sugar-free sweetener and filler that can cause gas or loose stools in large amounts.",
    includes: ["isomalt", "isomalt nf", "e 953", "e953"],
  },
  {
    id: "saccharin",
    label: "Saccharin",
    shortLabel: "Saccharin",
    blurb: "An old artificial sweetener some people avoid for taste or because of past safety worries.",
    includes: ["saccharin", "saccharin sodium", "saccharin calcium", "sodium saccharin", "saccharin sodium dihydrate", "e 954", "e954", "benzosulfimide"],
  },
  {
    id: "sucralose",
    label: "Sucralose",
    shortLabel: "Sucralose",
    blurb: "A no-calorie artificial sweetener (Splenda). Some people avoid it for taste or gut reasons.",
    includes: ["sucralose", "sucralose nf", "splenda", "e 955", "e955"],
  },
  {
    id: "acesulfame-k",
    label: "Acesulfame potassium",
    shortLabel: "Acesulfame K",
    blurb: "A no-calorie artificial sweetener some people avoid for its taste or to dodge added chemicals.",
    includes: ["acesulfame potassium", "acesulfame k", "acesulfame", "potassium acesulfame", "ace-k", "acesulfame potassium nf", "e 950", "e950"],
  },
  {
    id: "shellac",
    label: "Shellac (purified lac resin)",
    shortLabel: "Shellac",
    blurb: "A shiny coating made from a bug's secretion, so people avoiding animal products or eating vegan skip it.",
    includes: ["shellac", "pharmaceutical glaze", "pharmaceutical shellac", "shellac wax", "e 904", "e904", "lac resin", "bleached shellac", "esterified shellac"],
  },
  {
    id: "lanolin",
    label: "Lanolin (wool fat / hydrous wool fat)",
    shortLabel: "Lanolin",
    blurb: "An oily wax taken from sheep's wool, so vegans and some allergy-prone people want to avoid it.",
    includes: ["lanolin", "wool fat", "wool wax", "anhydrous lanolin", "hydrous lanolin", "lanolin alcohol", "wool alcohols", "lanolin alcohols", "modified lanolin", "lanolin oil", "adeps lanae"],
  },
  {
    id: "beeswax",
    label: "Beeswax (yellow / white wax)",
    shortLabel: "Beeswax",
    blurb: "A wax made by honeybees, so people who avoid animal products often skip it.",
    includes: ["beeswax", "yellow wax", "white wax", "yellow beeswax", "white beeswax", "cera alba", "cera flava", "e 901", "e901"],
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
 * Resolve a free-text term the user typed to a rich dictionary entry, so the
 * full (now large) dictionary is reachable by typing — not just via chips.
 * Matches by id, shortLabel, label, exact string alias, or a shortLabel prefix.
 * Returns undefined if nothing matches (caller falls back to adHocAllergen).
 */
export function findAllergenByText(term: string): AllergenDef | undefined {
  const t = term.trim().toLowerCase();
  if (t.length < 2) return undefined;
  // exact id / shortLabel / label / alias
  for (const a of ALLERGENS) {
    if (a.id === t || a.shortLabel.toLowerCase() === t || a.label.toLowerCase() === t) return a;
    for (const inc of a.includes) {
      if (typeof inc === "string" && inc.toLowerCase() === t) return a;
    }
  }
  // shortLabel prefix (e.g. "blue" -> "Blue 1"); first match wins
  for (const a of ALLERGENS) {
    if (a.shortLabel.toLowerCase().startsWith(t)) return a;
  }
  return undefined;
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
