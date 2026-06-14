import { S } from "../content/strings";
import { ShieldCheck } from "./Icons";

// "Why you can trust this" — source-proximity is the #1 trust lever (spec §4.9).
export function TrustPanel() {
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-teal" size={22} />
        <h2 className="text-h2 text-ink">{S.trust.title}</h2>
      </div>
      <p className="mt-2 text-body text-muted">{S.trust.body}</p>
      <p className="mt-2 text-body text-muted">{S.trust.method}</p>
      <p className="mt-3 text-caption text-muted">{S.trust.sources}</p>
    </section>
  );
}
