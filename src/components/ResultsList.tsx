import { useMemo, useState } from "react";
import type { AllergenDef, CheckResponse } from "../lib/types";
import { buildVerdictCards, sortCards, summarize } from "../lib/verdict";
import { S } from "../content/strings";
import { VerdictCard } from "./VerdictCard";
import { SkeletonCards } from "./Skeleton";
import { HelpCircle } from "./Icons";

export type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "nomatch"; drug: string; suggestions: string[] }
  | { status: "ok"; response: CheckResponse };

interface Props {
  state: SearchState;
  allergen: AllergenDef;
  ingredientLabel: string;
  pharmacistView?: boolean;
  onRetry?: () => void;
  onPickSuggestion?: (s: string) => void;
}

const INITIAL_VISIBLE = 6;

export function ResultsList(props: Props) {
  const { state } = props;
  if (state.status === "idle") return <IdleState />;
  if (state.status === "loading") return <SkeletonCards />;
  if (state.status === "error") return <ErrorState message={state.message} onRetry={props.onRetry} />;
  if (state.status === "nomatch")
    return (
      <NoMatchState
        drug={state.drug}
        suggestions={state.suggestions}
        onPick={props.onPickSuggestion}
      />
    );
  return <OkState {...props} response={state.response} />;
}

function IdleState() {
  return (
    <div className="rounded-2xl border border-dashed border-hairline bg-surface/50 p-6 text-center">
      <p className="text-h2 text-ink">{S.states.empty.title}</p>
      <p className="mt-1 text-body text-muted">{S.states.empty.body}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-hairline bg-surface p-6 text-center">
      <p className="text-h2 text-ink">{S.states.error.title}</p>
      <p className="mt-1 text-body text-muted">{message || S.states.error.body}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-trustBtn px-5 text-body font-semibold text-white"
        >
          {S.states.error.retry}
        </button>
      )}
    </div>
  );
}

function NoMatchState({
  drug,
  suggestions,
  onPick,
}: {
  drug: string;
  suggestions: string[];
  onPick?: (s: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 text-center">
      <p className="text-h2 text-ink">{S.states.noMatch.title(drug)}</p>
      <p className="mt-1 text-body text-muted">{S.states.noMatch.body}</p>
      {suggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-caption text-muted">{S.states.noMatch.didYouMean}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onPick?.(s)}
                className="min-h-[44px] rounded-full border border-hairline bg-base px-4 text-body text-trust"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OkState({
  response,
  allergen,
  ingredientLabel,
  pharmacistView = false,
}: Props & { response: CheckResponse }) {
  const [showAll, setShowAll] = useState(false);
  const [showNoData, setShowNoData] = useState(pharmacistView);

  const { dataCards, noDataCards, counts } = useMemo(() => {
    const all = sortCards(buildVerdictCards(response.labels, allergen));
    return {
      dataCards: all.filter((c) => c.state !== "no_data"),
      noDataCards: all.filter((c) => c.state === "no_data"),
      counts: summarize(all),
    };
  }, [response, allergen]);

  const visible = pharmacistView || showAll ? dataCards : dataCards.slice(0, INITIAL_VISIBLE);

  return (
    <div className="space-y-3">
      {/* Clear, stable heading of WHAT is being shown — so instant ingredient
          switching can't be skimmed without noticing the subject changed. */}
      <h2 className="text-h2 text-ink">
        {S.results.forHeading(response.query, ingredientLabel)}
      </h2>
      {/* aria-live announces the result count + makes a Contains result audible
          even though not-listed cards sort first */}
      <p aria-live="polite" className="text-body text-muted">
        {S.results.countSummary(counts)}
      </p>

      {response.capped && (
        <p className="rounded-lg border border-hairline bg-surface px-3 py-2 text-caption text-muted">
          {S.results.showingCapped(response.labels.length, response.total)}
        </p>
      )}
      {response.degraded && (
        <p className="rounded-lg border border-hairline bg-surface px-3 py-2 text-caption text-muted">
          {S.states.degraded}
        </p>
      )}

      {dataCards.length === 0 && noDataCards.length > 0 && (
        <div className="rounded-2xl border border-hairline bg-surface p-5 text-center">
          <HelpCircle className="mx-auto text-verdict-noneText" size={28} />
          <p className="mt-2 text-body text-ink">{S.verdict.noDataCaveat}</p>
        </div>
      )}

      <div key={`${response.query}:${allergen.id}`} className="foc-stagger space-y-3">
        {visible.map((card) => (
          <VerdictCard
            key={card.key}
            card={card}
            ingredientLabel={ingredientLabel}
            pharmacistView={pharmacistView}
          />
        ))}
      </div>

      {!pharmacistView && dataCards.length > INITIAL_VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="min-h-[44px] w-full rounded-xl border border-hairline bg-surface text-body text-trust"
        >
          {showAll ? S.results.showFewer : S.results.showAll} ({dataCards.length})
        </button>
      )}

      {noDataCards.length > 0 && dataCards.length > 0 && (
        <div className="rounded-2xl border border-hairline bg-surface/60 p-4">
          <button
            type="button"
            aria-expanded={showNoData}
            onClick={() => setShowNoData((v) => !v)}
            className="min-h-[44px] text-left text-body text-muted"
          >
            {S.results.noDataGroupTitle(noDataCards.length)}
          </button>
          {showNoData && (
            <div className="mt-3 space-y-3">
              <p className="text-caption text-muted">{S.results.noDataGroupHint}</p>
              {noDataCards.map((card) => (
                <VerdictCard
                  key={card.key}
                  card={card}
                  ingredientLabel={ingredientLabel}
                  pharmacistView={pharmacistView}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
