import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResultsList } from "./ResultsList";
import { VerdictCard } from "./VerdictCard";
import { buildVerdictCards } from "../lib/verdict";
import { getAllergen } from "../lib/allergens";
import { FIXTURES } from "../../tests/fixtures/labels";
import type { CheckResponse } from "../lib/types";

function a(id: string) {
  return getAllergen(id)!;
}

function resp(labels: CheckResponse["labels"], extra: Partial<CheckResponse> = {}): CheckResponse {
  return {
    query: "test",
    resolvedAs: "test",
    total: labels.length,
    capped: false,
    fromCache: false,
    labels,
    ...extra,
  };
}

describe("VerdictCard", () => {
  it("shows Contains verdict, the matched hit, and a DailyMed link", () => {
    const [card] = buildVerdictCards([FIXTURES.lactoseMetformin], a("lactose"));
    render(<VerdictCard card={card} ingredientLabel="Lactose" />);
    expect(screen.getByText(/Contains Lactose/i)).toBeInTheDocument();
    expect(screen.getByText(/Found on label/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /DailyMed/i })).toHaveAttribute("href", expect.stringContaining("dailymed"));
  });

  it("expands the verbatim FDA source passage on click", () => {
    const [card] = buildVerdictCards([FIXTURES.lactoseMetformin], a("lactose"));
    render(<VerdictCard card={card} ingredientLabel="Lactose" />);
    const btn = screen.getByRole("button", { name: /Show FDA source/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    // text unique to the verbatim source passage (not the "Found on label" line)
    expect(screen.getByText(/povidone, lactose monohydrate/i)).toBeInTheDocument();
  });

  it("not-listed card shows the mandatory absence caveat and never the words 'free of'", () => {
    const [card] = buildVerdictCards([FIXTURES.cleanTablet], a("lactose"));
    const { container } = render(<VerdictCard card={card} ingredientLabel="Lactose" />);
    expect(screen.getByText(/Likely free — Lactose not listed/i)).toBeInTheDocument();
    expect(screen.getByText(/absence from a label is not a guarantee/i)).toBeInTheDocument();
    expect(container.textContent?.toLowerCase()).not.toContain("free of");
  });

  it("gluten + ambiguous starch renders the amber 'source not stated' verdict, not green", () => {
    const [card] = buildVerdictCards([FIXTURES.glutenStarchOnly], a("gluten"));
    render(<VerdictCard card={card} ingredientLabel="Gluten" />);
    expect(card.state).toBe("ambiguous");
    expect(screen.getByText(/Possibly contains Gluten — source not stated/i)).toBeInTheDocument();
    expect(screen.queryByText(/Likely free/i)).not.toBeInTheDocument();
  });
});

describe("ResultsList states", () => {
  it("idle shows the empty prompt", () => {
    render(<ResultsList state={{ status: "idle" }} allergen={a("lactose")} ingredientLabel="Lactose" />);
    expect(screen.getByText(/Start a check/i)).toBeInTheDocument();
  });

  it("loading shows the skeleton + authoritative loading text", () => {
    render(<ResultsList state={{ status: "loading" }} allergen={a("lactose")} ingredientLabel="Lactose" />);
    expect(screen.getByText(/Searching official FDA labels/i)).toBeInTheDocument();
  });

  it("error shows retry button and calls onRetry", () => {
    const onRetry = vi.fn();
    render(
      <ResultsList
        state={{ status: "error", message: "boom" }}
        allergen={a("lactose")}
        ingredientLabel="Lactose"
        onRetry={onRetry}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Try again/i }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("nomatch shows did-you-mean suggestions", () => {
    const onPick = vi.fn();
    render(
      <ResultsList
        state={{ status: "nomatch", drug: "metformun", suggestions: ["Metformin"] }}
        allergen={a("lactose")}
        ingredientLabel="Lactose"
        onPickSuggestion={onPick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Metformin" }));
    expect(onPick).toHaveBeenCalledWith("Metformin");
  });

  it("ok renders a count summary + cards, capped banner, and groups no-data last", () => {
    const r = resp(
      [FIXTURES.lactoseMetformin, FIXTURES.cleanTablet, FIXTURES.noInactiveButBranded],
      { total: 50, capped: true },
    );
    render(<ResultsList state={{ status: "ok", response: r }} allergen={a("lactose")} ingredientLabel="Lactose" />);
    expect(screen.getByText(/contain it/i)).toBeInTheDocument();
    expect(screen.getByText(/Showing the first/i)).toBeInTheDocument();
    expect(screen.getByText(/1 label with no ingredient list/i)).toBeInTheDocument();
  });
});
