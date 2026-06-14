import { describe, it, expect } from "vitest";
import { evaluateText } from "./matcher";
import { getAllergen, adHocAllergen, ALLERGENS } from "./allergens";
import type { VerdictState } from "./types";

function a(id: string) {
  const def = getAllergen(id);
  if (!def) throw new Error("unknown allergen " + id);
  return def;
}

function state(id: string, text: string): VerdictState {
  return evaluateText([text], a(id)).state;
}

describe("matcher — positives (CONTAINS)", () => {
  const cases: Array<[string, string]> = [
    ["lactose", "Contains: lactose monohydrate, magnesium stearate"],
    ["lactose", "ANHYDROUS LACTOSE"],
    ["peg", "polyethylene glycol 3350"],
    ["peg", "macrogol 400"],
    ["peg", "PEG-400"],
    ["peg", "peg3350"],
    ["yellow5", "FD&C Yellow No. 5"],
    ["yellow5", "tartrazine"],
    ["yellow5", "FD&C Yellow #5 Aluminum Lake"],
    ["red40", "FD&C Red No. 40 Aluminum Lake"],
    ["red40", "Allura Red AC"],
    ["yellow6", "FD&C Yellow No. 6"],
    ["yellow6", "Sunset Yellow FCF"],
    ["soy", "soybean oil"],
    ["soy", "soy lecithin"],
    ["gluten", "wheat starch"],
    ["gluten", "contains gluten"],
  ];
  it.each(cases)("%s matches %j", (id, text) => {
    expect(state(id, text)).toBe("contains");
  });
});

describe("matcher — critical NEGATIVES (word boundaries)", () => {
  it("lactose does NOT match galactose", () => {
    expect(state("lactose", "galactose, sucrose")).toBe("not_listed");
  });
  it("lactose does NOT match lactobacillus", () => {
    expect(state("lactose", "lactobacillus acidophilus")).toBe("not_listed");
  });
  it("gluten 'wheat' does NOT match buckwheat", () => {
    expect(state("gluten", "buckwheat flour")).toBe("not_listed");
  });
  it("soy bare 'soy' does NOT falsely fire on unrelated tokens", () => {
    // 'soy' must be a whole token; 'soybean' is covered by its own synonym,
    // but a token like 'soybeans' embedding must still be caught as soybean.
    expect(state("soy", "magnesium stearate, talc")).toBe("not_listed");
  });
  it("PEG numeric form requires digits (no bare false-positive)", () => {
    expect(state("peg", "magnesium stearate")).toBe("not_listed");
  });
  it("Yellow 5 does not match Yellow 6", () => {
    expect(state("yellow5", "FD&C Yellow No. 6")).toBe("not_listed");
  });
});

describe("matcher — gluten AMBIGUITY (amber, never green)", () => {
  it("unsourced 'pregelatinized starch' is amber, NOT green", () => {
    const r = evaluateText(["pregelatinized starch, magnesium stearate"], a("gluten"));
    expect(r.state).toBe("ambiguous");
    expect(r.state).not.toBe("not_listed");
    expect(r.ambiguousHits.length).toBeGreaterThan(0);
  });
  it("bare 'starch' is amber", () => {
    expect(state("gluten", "starch, talc")).toBe("ambiguous");
  });
  it("'sodium starch glycolate' is amber", () => {
    expect(state("gluten", "sodium starch glycolate")).toBe("ambiguous");
  });
  it("'corn starch' is suppressed -> NOT amber (gluten-free source named)", () => {
    expect(state("gluten", "corn starch, magnesium stearate")).toBe("not_listed");
  });
  it("'potato starch' is suppressed -> NOT amber", () => {
    expect(state("gluten", "potato starch")).toBe("not_listed");
  });
  it("'modified starch' (no source) stays amber", () => {
    expect(state("gluten", "modified starch")).toBe("ambiguous");
  });
  it("barley and rye are amber per spec", () => {
    expect(state("gluten", "barley malt extract")).toBe("ambiguous");
    expect(state("gluten", "rye flour")).toBe("ambiguous");
  });
  it("'gluten free' / 'gluten-free' is NOT a CONTAINS", () => {
    expect(state("gluten", "this product is gluten free")).toBe("not_listed");
    expect(state("gluten", "gluten-free formulation")).toBe("not_listed");
  });
  it("wheat beats ambiguity -> CONTAINS even alongside starch", () => {
    expect(state("gluten", "wheat starch, pregelatinized starch")).toBe("contains");
  });
});

describe("matcher — soy ambiguity (bare lecithin)", () => {
  it("bare 'lecithin' is amber for soy", () => {
    expect(state("soy", "lecithin, gelatin")).toBe("ambiguous");
  });
  it("'sunflower lecithin' is suppressed -> NOT amber", () => {
    expect(state("soy", "sunflower lecithin")).toBe("not_listed");
  });
  it("'soy lecithin' is CONTAINS (beats ambiguity)", () => {
    expect(state("soy", "soy lecithin")).toBe("contains");
  });
});

describe("matcher — NO_DATA", () => {
  it("empty inactive-ingredient list is no_data", () => {
    expect(evaluateText([], a("lactose")).state).toBe("no_data");
  });
  it("whitespace-only is no_data", () => {
    expect(evaluateText(["   "], a("lactose")).state).toBe("no_data");
  });
});

describe("matcher — citation hits are verbatim", () => {
  it("returns the matched substring for CONTAINS", () => {
    const r = evaluateText(["Lactose Monohydrate USP"], a("lactose"));
    expect(r.state).toBe("contains");
    expect(r.containsHits.join(" ").toLowerCase()).toContain("lactose");
  });
});

describe("matcher — free-text ad-hoc allergen", () => {
  it("matches a custom typed term as whole token", () => {
    const def = adHocAllergen("titanium dioxide");
    expect(evaluateText(["titanium dioxide, talc"], def).state).toBe("contains");
    expect(evaluateText(["titanium oxide"], def).state).toBe("not_listed");
  });
  it("custom term has no amber state (no redFlags)", () => {
    const def = adHocAllergen("povidone");
    const r = evaluateText(["crospovidone"], def); // boundary: should NOT match
    expect(r.state).toBe("not_listed");
  });
});

describe("matcher — real-world edge cases", () => {
  it("'polyethylene glycol' without a number still matches PEG", () => {
    expect(state("peg", "polyethylene glycol, povidone")).toBe("contains");
  });
  it("'maltodextrin' is NOT gluten-ambiguous (boundary blocks 'dextrin')", () => {
    expect(state("gluten", "maltodextrin, magnesium stearate")).toBe("not_listed");
  });
  it("'pregelatinized corn starch' is suppressed -> NOT amber", () => {
    expect(state("gluten", "pregelatinized corn starch")).toBe("not_listed");
  });
  it("multi-line passage with lactose deep in the text still matches", () => {
    const passage =
      "Inactive Ingredients: microcrystalline cellulose, croscarmellose sodium, " +
      "lactose monohydrate, magnesium stearate, hypromellose.";
    expect(evaluateText([passage], a("lactose")).state).toBe("contains");
  });
  it("Red 40 plain form 'Red 40' matches", () => {
    expect(state("red40", "FD&C Red 40")).toBe("contains");
  });
});

describe("matcher — audit hardening (false-green fixes)", () => {
  it("PEG single-digit grade 'PEG 8' is CONTAINS", () => {
    expect(state("peg", "PEG 8, magnesium stearate")).toBe("contains");
  });
  it("bare 'PEG' is CONTAINS", () => {
    expect(state("peg", "purified water, PEG, glycerin")).toBe("contains");
  });
  it("'polyoxyl 35 castor oil' (PEG derivative) is CONTAINS", () => {
    expect(state("peg", "polyoxyl 35 castor oil")).toBe("contains");
  });
  it("'polyoxyl 40 stearate' is CONTAINS", () => {
    expect(state("peg", "polyoxyl 40 stearate")).toBe("contains");
  });
  it("polysorbate 80 is NOT PEG (no false red)", () => {
    expect(state("peg", "polysorbate 80, water")).toBe("not_listed");
  });
  it("plural 'food starches' is gluten-AMBIGUOUS (was a false green)", () => {
    expect(state("gluten", "food starches, magnesium stearate")).toBe("ambiguous");
  });
  it("wheat botanical synonyms are CONTAINS", () => {
    expect(state("gluten", "spelt flour")).toBe("contains");
    expect(state("gluten", "durum semolina")).toBe("contains");
    expect(state("gluten", "triticale")).toBe("contains");
  });
  it("closed compound 'wheatgerm' is CONTAINS but 'buckwheat' is not", () => {
    expect(state("gluten", "wheatgerm oil")).toBe("contains");
    expect(state("gluten", "buckwheat flour")).toBe("not_listed");
  });
  it("'malt extract' is gluten-AMBIGUOUS but 'maltodextrin' is not", () => {
    expect(state("gluten", "malt extract")).toBe("ambiguous");
    expect(state("gluten", "maltodextrin")).toBe("not_listed");
  });
  it("stated-source-AFTER suppresses: 'starch (corn)' -> green", () => {
    expect(state("gluten", "starch (corn), magnesium stearate")).toBe("not_listed");
  });
  it("'starch derived from corn' -> green", () => {
    expect(state("gluten", "starch derived from corn")).toBe("not_listed");
  });
  it("DANGER GUARD: 'starch, corn syrup' stays AMBIGUOUS (corn is a separate ingredient)", () => {
    expect(state("gluten", "starch, corn syrup, water")).toBe("ambiguous");
  });
  it("'lecithin (sunflower)' suppresses soy to green", () => {
    expect(state("soy", "lecithin (sunflower)")).toBe("not_listed");
  });
});

describe("dictionary integrity", () => {
  it("every allergen has a unique id and non-empty includes", () => {
    const ids = new Set<string>();
    for (const d of ALLERGENS) {
      expect(d.id).toBeTruthy();
      expect(ids.has(d.id)).toBe(false);
      ids.add(d.id);
      expect(d.includes.length).toBeGreaterThan(0);
    }
  });
});
