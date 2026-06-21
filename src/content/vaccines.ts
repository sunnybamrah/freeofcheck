// US vaccine excipient data — vaccines are FDA BIOLOGICS (CBER), not in the
// openFDA drug/label dataset, so they can't be looked up live. This bundled,
// citation-backed list (compiled + triple-checked from the CDC Pink Book
// Appendix B excipient table, the Institute for Vaccine Safety table, and FDA
// package inserts) lets the same matcher answer "is X in this vaccine?".
// Populated by the foc-vaccine-excipients workflow.

export interface Vaccine {
  id: string;
  /** generic type, e.g. "COVID-19 (mRNA)" */
  name: string;
  brand: string;
  manufacturer: string;
  type: string;
  /** full excipient/ingredient list, verbatim from the authoritative source */
  ingredients: string[];
  /** allergen-relevant components confirmed present (for quick display) */
  confirmedAllergens: string[];
  sourceUrl: string;
}

export const VACCINES: Vaccine[] = [];

/** Brands shown as quick-picks (set to real entries once VACCINES is populated). */
export const VACCINE_PICK_IDS: string[] = [];

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Resolve a typed query to a known vaccine by brand / name / common alias. */
export function findVaccineByName(q: string): Vaccine | undefined {
  const t = norm(q);
  if (t.length < 3) return undefined;
  for (const v of VACCINES) {
    if (norm(v.brand) === t || norm(v.name) === t) return v;
  }
  // contains / prefix (e.g. "comirnaty", "moderna covid", "flu shot")
  for (const v of VACCINES) {
    if (norm(v.brand).includes(t) || t.includes(norm(v.brand))) return v;
  }
  return undefined;
}

export const VACCINE_BRANDS: string[] = VACCINES.map((v) => v.brand);
export const VACCINE_PICKS: Vaccine[] = VACCINE_PICK_IDS.map(
  (id) => VACCINES.find((v) => v.id === id)!,
).filter(Boolean);
