import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { S } from "../content/strings";
import { ALL_CONTENT_PAGES, ALLERGEN_PAGES, FAQ } from "../content/pages";
import { ALLERGENS } from "./allergens";
import { buildVerdictCards } from "./verdict";
import { getAllergen } from "./allergens";
import { FIXTURES } from "../../tests/fixtures/labels";
import { VerdictCard } from "../components/VerdictCard";
import { Disclaimer } from "../components/Disclaimer";
import type { VerdictState } from "./types";

// ---------------------------------------------------------------------------
// SAFETY GUARDS (spec §6f) — these protect the product's integrity. Treat any
// failure here as release-blocking.
// ---------------------------------------------------------------------------

const STATES: VerdictState[] = ["contains", "ambiguous", "not_listed", "no_data"];
const SAMPLE_INGREDIENTS = ["PEG", "Lactose", "Gluten", "Red 40", "Soy"];

describe("verdict strings never overclaim", () => {
  it("no verdict label ever contains the phrase 'free of'", () => {
    for (const st of STATES) {
      for (const ing of SAMPLE_INGREDIENTS) {
        expect(S.verdict.label(st, ing).toLowerCase()).not.toContain("free of");
      }
    }
  });

  it("no verdict label ever uses the word 'safe'", () => {
    for (const st of STATES) {
      for (const ing of SAMPLE_INGREDIENTS) {
        expect(S.verdict.label(st, ing).toLowerCase()).not.toMatch(/\bsafe\b/);
      }
    }
  });

  it("the not-listed verdict is a neutral 'not listed' finding — never 'free'/'safe'", () => {
    const label = S.verdict.label("not_listed", "PEG").toLowerCase();
    expect(label).toContain("not listed on this label");
    expect(label).not.toContain("free"); // no "likely free" / "free of"
    expect(label).not.toContain("safe");
  });
});

// Build a corpus of every user-facing string we author.
function corpus(): string {
  const parts: string[] = [];
  // verdict labels + caveats
  for (const st of STATES) for (const ing of SAMPLE_INGREDIENTS) parts.push(S.verdict.label(st, ing));
  parts.push(S.verdict.notListedCaveat("PEG"), S.verdict.ambiguousCaveat, S.verdict.noDataCaveat);
  parts.push(S.disclaimer.full, S.disclaimer.short, S.trust.body, S.trust.method, S.freshness);
  parts.push(S.home.intro, S.home.h1, S.states.error.body);
  // page content
  for (const p of [...ALL_CONTENT_PAGES, ...ALLERGEN_PAGES]) {
    parts.push(p.title, p.intro ?? "");
    for (const s of p.sections) {
      parts.push(s.heading ?? "", ...(s.paragraphs ?? []), ...(s.bullets ?? []));
    }
  }
  for (const f of FAQ) parts.push(f.q, f.a);
  return parts.join("\n").toLowerCase();
}

describe("app generates no dosing / clinical-advice strings", () => {
  const text = corpus();
  const FORBIDDEN: Array<[string, RegExp]> = [
    ["take N mg/ml/tablets", /take\s+\d+\s*(mg|ml|tablet|capsule|drop|teaspoon)/],
    ["a numeric dose", /\b\d+\s*(mg|mcg|ml)\b\s+(once|twice|daily|every|per)/],
    ["recommended/usual/max dose", /\b(recommended|usual|maximum|starting)\s+dose\b/],
    ["frequency advice", /\b(once|twice|three times)\s+(a|per)\s+day\b/],
    ["every-N-hours advice", /\bevery\s+\d+\s*(hours|hrs|h)\b/],
    ["directive 'you should take'", /you should take\b/],
    ["claim 'is safe to take'", /is safe to take\b/],
    ["claim 'safe for you'", /safe for you\b/],
    ["interaction advice", /take .{0,20}(with food|on an empty stomach|with milk)/],
  ];
  it.each(FORBIDDEN)("never contains %s", (_label, re) => {
    expect(text).not.toMatch(re);
  });
});

describe("the persistent disclaimer carries its load-bearing phrases", () => {
  it("full disclaimer states not-advice, not-a-device, and not-a-guarantee", () => {
    const d = S.disclaimer.full.toLowerCase();
    expect(d).toContain("not medical advice");
    expect(d).toContain("not a medical device");
    expect(d).toContain("not a guarantee");
  });
  it("Disclaimer component renders text in both variants", () => {
    const a = render(<Disclaimer variant="inline" />);
    expect(a.getByTestId("disclaimer").textContent).toMatch(/not medical advice/i);
    a.unmount();
    const b = render(<Disclaimer variant="sticky" />);
    expect(b.getByTestId("disclaimer")).toBeInTheDocument();
  });
});

describe("gluten + ambiguous starch NEVER renders green", () => {
  it("renders amber 'possibly contains', not 'likely free'", () => {
    const [card] = buildVerdictCards([FIXTURES.glutenStarchOnly], getAllergen("gluten")!);
    expect(card.state).toBe("ambiguous");
    render(<VerdictCard card={card} ingredientLabel="Gluten" />);
    expect(screen.getByText(/Possibly contains Gluten — source not stated/i)).toBeInTheDocument();
    expect(screen.queryByText(/Likely free/i)).not.toBeInTheDocument();
  });
});

describe("dictionary cannot silently lose its amber gluten guard", () => {
  it("gluten still defines redFlags (the amber path)", () => {
    const gluten = ALLERGENS.find((a) => a.id === "gluten")!;
    expect(gluten.redFlags && gluten.redFlags.length).toBeGreaterThan(0);
  });
});
