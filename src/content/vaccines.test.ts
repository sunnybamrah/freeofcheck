import { describe, it, expect } from "vitest";
import { VACCINES, findVaccineByName, VACCINE_PICKS } from "./vaccines";
import { evaluateText } from "../lib/matcher";
import { getAllergen } from "../lib/allergens";
import type { VerdictState } from "../lib/types";

function v(brand: string, allergenId: string): VerdictState {
  const vax = findVaccineByName(brand);
  if (!vax) throw new Error("vaccine not found: " + brand);
  const a = getAllergen(allergenId);
  if (!a) throw new Error("allergen not found: " + allergenId);
  return evaluateText(vax.ingredients, a).state;
}

describe("vaccine dataset", () => {
  it("has vaccines + quick-picks, each with ingredients + a source", () => {
    expect(VACCINES.length).toBeGreaterThan(20);
    expect(VACCINE_PICKS.length).toBeGreaterThanOrEqual(4);
    for (const vx of VACCINES) {
      expect(vx.brand).toBeTruthy();
      expect(vx.ingredients.length).toBeGreaterThan(0);
      expect(vx.sourceUrl).toMatch(/^https?:\/\//);
    }
  });

  it("resolves vaccines by brand / alias", () => {
    expect(findVaccineByName("comirnaty")?.brand).toMatch(/Comirnaty/i);
    expect(findVaccineByName("shingrix")?.brand).toMatch(/Shingrix/i);
    expect(findVaccineByName("zzz not a vaccine")).toBeUndefined();
  });
});

describe("vaccine + allergen verdicts match known medical facts", () => {
  const CONTAINS: Array<[string, string]> = [
    ["comirnaty", "peg"], // mRNA PEG-lipid (the anaphylaxis concern)
    ["spikevax", "peg"],
    ["nuvaxovid", "polysorbate"],
    ["fluzone", "egg"],
    ["m-m-r ii", "gelatin"],
    ["m-m-r ii", "antibiotics"], // neomycin
    ["varivax", "gelatin"],
    ["engerix-b", "yeast"],
    ["gardasil 9", "yeast"],
  ];
  it.each(CONTAINS)("%s contains %s", (brand, a) => {
    expect(v(brand, a)).toBe("contains");
  });

  const NOT_LISTED: Array<[string, string]> = [
    ["flucelvax", "egg"], // cell-based -> egg-free
    ["flublok", "egg"], // recombinant -> egg-free
    ["shingrix", "gelatin"], // no gelatin
    ["comirnaty", "egg"], // mRNA -> no egg
    ["fluzone", "peg"], // flu shot -> no PEG
  ];
  it.each(NOT_LISTED)("%s does NOT list %s", (brand, a) => {
    expect(v(brand, a)).toBe("not_listed");
  });
});
