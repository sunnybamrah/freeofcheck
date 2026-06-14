import { S } from "../content/strings";

// The persistent disclaimer. MUST render in every UI state (home, loading,
// results, error, no-match). Two variants: an inline block and a sticky footer.
export function Disclaimer({ variant = "inline" }: { variant?: "inline" | "sticky" }) {
  if (variant === "sticky") {
    return (
      <div
        role="note"
        aria-label="Disclaimer"
        data-testid="disclaimer"
        className="sticky bottom-0 z-10 border-t border-hairline bg-base/95 px-4 py-2 backdrop-blur"
      >
        <p className="mx-auto max-w-prose text-center text-caption text-muted">{S.disclaimer.short}</p>
      </div>
    );
  }
  return (
    <p data-testid="disclaimer" className="mx-auto max-w-prose text-caption text-muted">
      {S.disclaimer.full}
    </p>
  );
}
