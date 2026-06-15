import type { NormalizedLabel } from "../../src/lib/types";

// Golden fixtures — realistic, pinned FDA inactive-ingredient passages modeled
// on actual openFDA drug/label records. Used by deterministic CI tests; a
// separate nightly job hits the live API to catch upstream drift.

function L(p: Partial<NormalizedLabel>): NormalizedLabel {
  return {
    splId: p.splId ?? "spl-x",
    splSetId: p.splSetId ?? "set-x",
    ndc: p.ndc ?? "12345-678-90",
    brandName: p.brandName ?? null,
    genericName: p.genericName ?? null,
    manufacturerName: p.manufacturerName ?? null,
    dosageForm: p.dosageForm ?? "TABLET",
    route: p.route ?? "ORAL",
    effectiveDate: p.effectiveDate ?? "2023-01-01",
    inactiveIngredient: p.inactiveIngredient ?? [],
    openfdaPresent: p.openfdaPresent ?? true,
  };
}

export const FIXTURES = {
  lactoseMetformin: L({
    splId: "spl-met-lact",
    brandName: "Metformin Hydrochloride",
    genericName: "metformin hydrochloride",
    manufacturerName: "Generic Pharma",
    inactiveIngredient: ["povidone, lactose monohydrate, magnesium stearate, hypromellose"],
  }),
  pegLaxative: L({
    splId: "spl-peg-lax",
    brandName: "ClearLax",
    genericName: "polyethylene glycol 3350",
    manufacturerName: "OTC Co",
    dosageForm: "POWDER, FOR SOLUTION",
    inactiveIngredient: ["polyethylene glycol 3350"],
  }),
  tartrazineTablet: L({
    splId: "spl-tartra",
    brandName: "ColorCoat 25",
    manufacturerName: "Dye Pharma",
    inactiveIngredient: [
      "microcrystalline cellulose, FD&C Yellow No. 5 (tartrazine) aluminum lake, magnesium stearate",
    ],
  }),
  glutenStarchOnly: L({
    splId: "spl-starch",
    brandName: "PlainTab",
    manufacturerName: "Maybe Wheat Inc",
    inactiveIngredient: ["pregelatinized starch, magnesium stearate, talc"],
  }),
  glutenCornStarch: L({
    splId: "spl-corn",
    brandName: "CornTab",
    manufacturerName: "Corn Co",
    inactiveIngredient: ["corn starch, microcrystalline cellulose, magnesium stearate"],
  }),
  soyLipid: L({
    splId: "spl-soy",
    brandName: "LipidEmulsion",
    manufacturerName: "IV Pharma",
    dosageForm: "INJECTION, EMULSION",
    route: "INTRAVENOUS",
    inactiveIngredient: ["soybean oil, egg phospholipids, glycerin, water for injection"],
  }),
  red40Lake: L({
    splId: "spl-red40",
    brandName: "RedChew",
    manufacturerName: "Kid Pharma",
    dosageForm: "TABLET, CHEWABLE",
    inactiveIngredient: ["mannitol, FD&C Red No. 40 Aluminum Lake, stearic acid"],
  }),
  cleanTablet: L({
    splId: "spl-clean",
    brandName: "PureTab",
    manufacturerName: "Clean Labs",
    inactiveIngredient: ["microcrystalline cellulose, croscarmellose sodium, magnesium stearate"],
  }),
  emptyOpenfda: L({
    splId: "spl-empty",
    splSetId: "set-empty",
    brandName: null,
    genericName: null,
    manufacturerName: null,
    dosageForm: null,
    route: null,
    inactiveIngredient: [],
    openfdaPresent: false,
  }),
  noInactiveButBranded: L({
    splId: "spl-nodata",
    brandName: "MysteryRx",
    manufacturerName: "Rx Co",
    inactiveIngredient: [],
  }),
} as const;

export const ALL_FIXTURES: NormalizedLabel[] = Object.values(FIXTURES);
