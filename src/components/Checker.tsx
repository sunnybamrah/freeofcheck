import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CHIP_ALLERGENS, adHocAllergen, getAllergen, findAllergenByText } from "../lib/allergens";
import { checkDrug, fetchSuggestions, ApiClientError } from "../lib/api";
import type { CheckResponse } from "../lib/types";
import { S } from "../content/strings";
import { ResultsList, type SearchState } from "./ResultsList";
import { SearchIcon } from "./Icons";

type Ingredient = { kind: "preset"; id: string } | { kind: "custom"; term: string };

const PHARM_KEY = "foc_pharmacist_view";

export function Checker({ defaultAllergenId }: { defaultAllergenId?: string }) {
  const [params, setParams] = useSearchParams();
  const [drugInput, setDrugInput] = useState("");
  const [committedDrug, setCommittedDrug] = useState("");
  const [ingredient, setIngredient] = useState<Ingredient>({
    kind: "preset",
    id: defaultAllergenId ?? CHIP_ALLERGENS[0].id,
  });
  const [customTerm, setCustomTerm] = useState("");
  const [view, setView] = useState<SearchState>({ status: "idle" });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSug, setShowSug] = useState(false);
  const [pharmacistView, setPharmacistView] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const ranInitial = useRef(false);

  const activeAllergen = useMemo(() => {
    if (ingredient.kind === "custom")
      return findAllergenByText(ingredient.term) ?? adHocAllergen(ingredient.term);
    return getAllergen(ingredient.id) ?? adHocAllergen(ingredient.id);
  }, [ingredient]);

  const runSearch = useCallback(
    async (rawDrug: string, force = false) => {
      const drug = rawDrug.trim();
      if (!drug) return;
      if (!force && drug.toLowerCase() === committedDrug.toLowerCase()) {
        if (view.status === "ok") return; // ingredient switch is client-side only
      }
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setShowSug(false);
      setView({ status: "loading" });
      try {
        const r: CheckResponse = await checkDrug(drug, ctrl.signal);
        setCommittedDrug(drug);
        setView({ status: "ok", response: r });
      } catch (e) {
        if (ctrl.signal.aborted) return;
        if (e instanceof ApiClientError && e.code === "not_found") {
          setCommittedDrug(drug);
          setView({ status: "nomatch", drug, suggestions: e.suggestions });
        } else {
          setView({ status: "error", message: e instanceof Error ? e.message : "" });
        }
      }
    },
    [committedDrug, view.status],
  );

  // Load pharmacist-view preference (client only).
  useEffect(() => {
    try {
      if (localStorage.getItem(PHARM_KEY) === "1") setPharmacistView(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Deep-link support: ?drug=&avoid= (run once on mount).
  useEffect(() => {
    if (ranInitial.current) return;
    ranInitial.current = true;
    const d = params.get("drug");
    const avoid = params.get("avoid");
    if (avoid) {
      if (getAllergen(avoid)) setIngredient({ kind: "preset", id: avoid });
      else {
        setIngredient({ kind: "custom", term: avoid });
        setCustomTerm(avoid);
      }
    }
    if (d) {
      setDrugInput(d);
      void runSearch(d, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced type-ahead suggestions.
  useEffect(() => {
    const q = drugInput.trim();
    if (q.length < 2 || q.toLowerCase() === committedDrug.toLowerCase()) {
      setSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      const s = await fetchSuggestions(q, ctrl.signal);
      setSuggestions(s);
      setShowSug(s.length > 0);
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [drugInput, committedDrug]);

  // Keep the URL shareable when a search commits.
  useEffect(() => {
    if (!committedDrug) return;
    const avoid = ingredient.kind === "custom" ? ingredient.term : ingredient.id;
    setParams({ drug: committedDrug, avoid }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [committedDrug, ingredient]);

  function togglePharmacist() {
    setPharmacistView((v) => {
      const next = !v;
      try {
        localStorage.setItem(PHARM_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function pickCustom() {
    const t = customTerm.trim();
    if (t) setIngredient({ kind: "custom", term: t });
  }

  const ingredientLabel = activeAllergen.shortLabel;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(drugInput);
        }}
        className="space-y-4"
      >
        {/* Drug name + type-ahead */}
        <div className="relative">
          <label htmlFor="drug" className="block text-body font-semibold text-ink">
            {S.home.drugLabel}
          </label>
          <input
            id="drug"
            name="drug"
            type="text"
            autoComplete="off"
            inputMode="search"
            value={drugInput}
            placeholder={S.home.drugPlaceholder}
            onChange={(e) => setDrugInput(e.target.value)}
            onFocus={() => suggestions.length && setShowSug(true)}
            className="mt-1 min-h-[48px] w-full rounded-xl border border-hairline bg-surface px-4 text-body text-ink placeholder:text-muted/70"
          />
          {showSug && suggestions.length > 0 && (
            <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-hairline bg-surface shadow-lg">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDrugInput(s);
                      runSearch(s, true);
                    }}
                    className="block min-h-[44px] w-full px-4 py-2 text-left text-body text-ink hover:bg-base"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ingredient chips + free text */}
        <fieldset>
          <legend className="block text-body font-semibold text-ink">
            {S.home.ingredientLabel}
          </legend>
          <p className="text-caption text-muted">{S.home.ingredientHint}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CHIP_ALLERGENS.map((al) => {
              const selected = ingredient.kind === "preset" && ingredient.id === al.id;
              return (
                <button
                  key={al.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setIngredient({ kind: "preset", id: al.id })}
                  className={`min-h-[44px] rounded-full border px-4 text-body ${
                    selected
                      ? "border-trust bg-trust/15 text-ink"
                      : "border-hairline bg-surface text-muted"
                  }`}
                >
                  {al.shortLabel}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              aria-label={S.home.customPlaceholder}
              value={customTerm}
              placeholder={S.home.customPlaceholder}
              onChange={(e) => setCustomTerm(e.target.value)}
              onBlur={pickCustom}
              className={`min-h-[44px] flex-1 rounded-xl border bg-surface px-4 text-body text-ink placeholder:text-muted/70 ${
                ingredient.kind === "custom" ? "border-trust" : "border-hairline"
              }`}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-trustBtn px-5 text-verdict font-semibold text-white"
        >
          <SearchIcon size={20} />
          {S.home.checkButton}
        </button>
      </form>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          role="switch"
          aria-checked={pharmacistView}
          onClick={togglePharmacist}
          className="min-h-[44px] text-caption text-muted"
        >
          {pharmacistView ? `✓ ${S.pharmacistView.on}` : S.pharmacistView.toggle}
        </button>
      </div>

      <div className="mt-4">
        <ResultsList
          state={view}
          allergen={activeAllergen}
          ingredientLabel={ingredientLabel}
          pharmacistView={pharmacistView}
          onRetry={() => runSearch(committedDrug || drugInput, true)}
          onPickSuggestion={(s) => {
            setDrugInput(s);
            runSearch(s, true);
          }}
        />
      </div>
    </div>
  );
}
