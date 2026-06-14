import { describe, it, expect } from "vitest";
import { buildVerdictCards, sortCards, summarize, dailymedUrl } from "./verdict";
import { evaluateLabel } from "./matcher";
import { getAllergen } from "./allergens";
import { FIXTURES } from "../../tests/fixtures/labels";

function a(id: string) {
  const d = getAllergen(id);
  if (!d) throw new Error(id);
  return d;
}

describe("golden fixtures — exact verdict states (spec §6b)", () => {
  it("lactose-containing metformin -> Contains", () => {
    expect(evaluateLabel(FIXTURES.lactoseMetformin, a("lactose")).state).toBe("contains");
  });
  it("PEG-containing laxative -> Contains", () => {
    expect(evaluateLabel(FIXTURES.pegLaxative, a("peg")).state).toBe("contains");
  });
  it("tartrazine-coated tablet -> Contains (yellow5)", () => {
    expect(evaluateLabel(FIXTURES.tartrazineTablet, a("yellow5")).state).toBe("contains");
  });
  it("CRITICAL: gluten search on starch-only label -> AMBER, never green", () => {
    const r = evaluateLabel(FIXTURES.glutenStarchOnly, a("gluten"));
    expect(r.state).toBe("ambiguous");
    expect(r.state).not.toBe("not_listed");
  });
  it("gluten on explicit corn-starch label -> not_listed (suppressed)", () => {
    expect(evaluateLabel(FIXTURES.glutenCornStarch, a("gluten")).state).toBe("not_listed");
  });
  it("soy-in-lipid product -> Contains (soybean oil)", () => {
    expect(evaluateLabel(FIXTURES.soyLipid, a("soy")).state).toBe("contains");
  });
  it("Red 40 aluminum lake -> Contains", () => {
    expect(evaluateLabel(FIXTURES.red40Lake, a("red40")).state).toBe("contains");
  });
  it("clean tablet -> not_listed for lactose", () => {
    expect(evaluateLabel(FIXTURES.cleanTablet, a("lactose")).state).toBe("not_listed");
  });
  it("empty label (no inactive ingredients) -> no_data", () => {
    expect(evaluateLabel(FIXTURES.emptyOpenfda, a("lactose")).state).toBe("no_data");
    expect(evaluateLabel(FIXTURES.noInactiveButBranded, a("peg")).state).toBe("no_data");
  });
});

describe("buildVerdictCards", () => {
  it("empty openfda object yields 'Brand not specified on label'", () => {
    const cards = buildVerdictCards([FIXTURES.emptyOpenfda], a("lactose"));
    expect(cards[0].title).toBe("Brand not specified on label");
    expect(cards[0].state).toBe("no_data");
    expect(cards[0].hasIngredientData).toBe(false);
  });

  it("dedupes identical labels into one card", () => {
    const dup = { ...FIXTURES.cleanTablet };
    const cards = buildVerdictCards([FIXTURES.cleanTablet, dup], a("lactose"));
    expect(cards).toHaveLength(1);
  });

  it("keeps distinct formulations separate", () => {
    const cards = buildVerdictCards(
      [FIXTURES.lactoseMetformin, FIXTURES.cleanTablet],
      a("lactose"),
    );
    expect(cards.length).toBe(2);
  });

  it("Contains card carries the verbatim matched hit + passage + DailyMed link", () => {
    const [card] = buildVerdictCards([FIXTURES.lactoseMetformin], a("lactose"));
    expect(card.state).toBe("contains");
    expect(card.hits.join(" ").toLowerCase()).toContain("lactose");
    expect(card.passages[0]).toContain("lactose monohydrate");
    expect(card.dailymedUrl).toContain("dailymed.nlm.nih.gov");
    expect(card.dailymedUrl).toContain("setid=");
  });

  it("titles preserve readable casing", () => {
    const [card] = buildVerdictCards([FIXTURES.pegLaxative], a("peg"));
    expect(card.title).toBe("Clearlax");
  });
});

describe("sortCards + summarize", () => {
  const cards = buildVerdictCards(
    [
      FIXTURES.lactoseMetformin, // contains
      FIXTURES.cleanTablet, // not_listed
      FIXTURES.glutenStarchOnly, // not_listed for lactose
      FIXTURES.emptyOpenfda, // no_data
    ],
    a("lactose"),
  );

  it("orders not_listed first, contains next, no_data last", () => {
    const sorted = sortCards(cards);
    expect(sorted[0].state).toBe("not_listed");
    expect(sorted[sorted.length - 1].state).toBe("no_data");
  });

  it("summarize counts each state", () => {
    const s = summarize(cards);
    expect(s.contains).toBe(1);
    expect(s.no_data).toBe(1);
    expect(s.not_listed).toBe(2);
  });
});

describe("dailymedUrl", () => {
  it("returns null without a set id", () => {
    expect(dailymedUrl(null)).toBeNull();
  });
});
