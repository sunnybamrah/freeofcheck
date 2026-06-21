import { useState, type ReactNode } from "react";
import type { AllergenDef } from "../lib/types";
import type { Vaccine } from "../content/vaccines";
import { evaluateText } from "../lib/matcher";
import { S } from "../content/strings";
import { VERDICT_DISPLAY } from "./verdictDisplay";
import { ChevronDown, ExternalLink } from "./Icons";

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlight(text: string, hits: string[], cls: string): ReactNode {
  const uniq = [...new Set(hits.map((h) => h.trim()).filter(Boolean))];
  if (uniq.length === 0 || !cls) return text;
  const re = new RegExp(`(${uniq.map(escapeRe).join("|")})`, "gi");
  return text.split(re).map((p, i) =>
    i % 2 === 1 ? (
      <mark key={i} className={`rounded px-0.5 ${cls}`}>
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function VaccineResult({
  vaccine,
  allergen,
  ingredientLabel,
}: {
  vaccine: Vaccine;
  allergen: AllergenDef;
  ingredientLabel: string;
}) {
  const [open, setOpen] = useState(true); // vaccine ingredient lists are short — show by default
  const m = evaluateText(vaccine.ingredients, allergen);
  const d = VERDICT_DISPLAY[m.state];
  const hits = m.state === "contains" ? m.containsHits : m.state === "ambiguous" ? m.ambiguousHits : [];
  const hlClass =
    m.state === "contains"
      ? "bg-verdict-badText/25 text-ink"
      : m.state === "ambiguous"
        ? "bg-verdict-warnText/25 text-ink"
        : "";

  return (
    <div className="space-y-3">
      <h2 className="text-h2 text-ink">
        {S.results.forHeading(vaccine.brand, ingredientLabel)}
      </h2>

      <article className="relative overflow-hidden rounded-2xl border border-hairline bg-surface">
        <span className={`absolute inset-y-0 left-0 w-1 ${d.accent}`} aria-hidden="true" />
        <div className="p-4 pl-5">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-verdict ${d.chip}`}>
            <d.Icon size={18} />
            <span>{S.verdict.label(m.state, ingredientLabel)}</span>
          </div>

          <h3 className="mt-3 text-h2 text-ink">{vaccine.brand}</h3>
          <p className="mt-0.5 text-caption text-muted">
            {[vaccine.type || vaccine.name, vaccine.manufacturer].filter(Boolean).join(" · ")}
          </p>

          {hits.length > 0 && (
            <p className="mt-2 text-body text-ink">{S.verdict.foundText(hits)}</p>
          )}

          {vaccine.ingredients.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-body text-trust"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "Hide ingredients" : "Show ingredients"}
                <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <blockquote className="mt-2 rounded-lg border border-hairline bg-base p-3">
                  <p className="mb-1 text-caption text-muted">Vaccine ingredients</p>
                  <p className="font-mono text-source text-ink/90 break-words">
                    {highlight(vaccine.ingredients.join(", "), hits, hlClass)}
                  </p>
                </blockquote>
              )}
            </div>
          )}

          {vaccine.sourceUrl && (
            <a
              href={vaccine.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-body text-trust"
            >
              View the source
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </article>

      <p className="rounded-lg border border-hairline bg-surface px-3 py-2 text-caption text-muted">
        {S.vaccine.sourceNote}
      </p>
    </div>
  );
}
