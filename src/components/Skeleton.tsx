import { S } from "../content/strings";

// Skeleton cards (not a spinner) — sets an authoritative "reading the FDA label"
// expectation while the proxy paginates (spec §4.5).
export function SkeletonCards({ count = 3 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-live="polite" className="space-y-3">
      <p className="text-body text-muted">{S.loading}</p>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-hairline bg-surface p-4">
          <div className="skeleton h-7 w-40 rounded-full" />
          <div className="skeleton mt-3 h-5 w-2/3 rounded" />
          <div className="skeleton mt-2 h-4 w-1/3 rounded" />
          <div className="skeleton mt-3 h-4 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
}
