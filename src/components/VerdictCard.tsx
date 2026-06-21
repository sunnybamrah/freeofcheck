import { useState, type ReactNode } from "react";
import type { VerdictCard as Card } from "../lib/verdict";
import { S } from "../content/strings";
import { VERDICT_DISPLAY } from "./verdictDisplay";
import { ChevronDown, ExternalLink } from "./Icons";

interface Props {
  card: Card;
  ingredientLabel: string;
  pharmacistView?: boolean;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Highlight the matched ingredient substrings inside the verbatim FDA passage. */
function highlight(passage: string, hits: string[], cls: string): ReactNode {
  const uniq = [...new Set(hits.map((h) => h.trim()).filter(Boolean))];
  if (uniq.length === 0 || !cls) return passage;
  const re = new RegExp(`(${uniq.map(escapeRe).join("|")})`, "gi");
  return passage.split(re).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className={`rounded px-0.5 ${cls}`}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function VerdictCard({ card, ingredientLabel, pharmacistView = false }: Props) {
  const [open, setOpen] = useState(pharmacistView);
  const d = VERDICT_DISPLAY[card.state];
  const verdictText = S.verdict.label(card.state, ingredientLabel);
  const found = card.state === "contains" || card.state === "ambiguous" ? S.verdict.foundText(card.hits) : "";
  const hlClass =
    card.state === "contains"
      ? "bg-verdict-badText/25 text-ink"
      : card.state === "ambiguous"
        ? "bg-verdict-warnText/25 text-ink"
        : "";

  return (
    <article className="relative overflow-hidden rounded-2xl border border-hairline bg-surface">
      <span className={`absolute inset-y-0 left-0 w-1 ${d.accent}`} aria-hidden="true" />
      <div className="p-4 pl-5">
        {/* verdict chip: icon + text + color (never color alone) */}
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-verdict ${d.chip}`}
        >
          <d.Icon size={18} />
          <span>{verdictText}</span>
        </div>

        <h3 className="mt-3 text-h2 text-ink">{card.title}</h3>
        <p className="mt-0.5 text-caption text-muted">
          {[card.manufacturer, card.dosage].filter(Boolean).join(" · ") || "Manufacturer not stated"}
        </p>
        <p className="text-caption text-muted">
          {S.results.labelDated(card.effectiveDate)}
          {card.ndc ? ` · NDC ${card.ndc}` : ""}
        </p>

        {found && <p className="mt-2 text-body text-ink">{found}</p>}

        {/* Per-card caveats removed (Council: one warning, not four). Safety is
            carried by the scoped verdict text ("…not listed on this label") +
            the single persistent footer disclaimer + the one results reminder. */}

        {card.hasIngredientData && (
          <div className="mt-3">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-body text-trust"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? S.results.hideSource : S.results.showSource}
              <ChevronDown
                size={18}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <blockquote className="mt-2 rounded-lg border border-hairline bg-base p-3">
                <p className="mb-1 text-caption text-muted">FDA label — Inactive Ingredients</p>
                {card.passages.map((p, i) => (
                  <p key={i} className="font-mono text-source text-ink/90 break-words">
                    {highlight(p, card.hits, hlClass)}
                  </p>
                ))}
              </blockquote>
            )}
          </div>
        )}

        {card.dailymedUrl && (
          <a
            href={card.dailymedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-body text-trust"
          >
            {S.results.viewDailymed}
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </article>
  );
}
