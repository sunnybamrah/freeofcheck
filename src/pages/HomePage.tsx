import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Checker } from "../components/Checker";
import { TrustPanel } from "../components/TrustPanel";
import { FaqList } from "../components/ContentPageView";
import { S } from "../content/strings";
import { HOW_IT_WORKS, FAQ } from "../content/pages";

export function HomePage() {
  return (
    <Layout>
      {/* Glanceable hero: title + one plain line + the action. No intro pop-up,
          no separate "honesty box" — the single persistent disclaimer (footer)
          and the one results-level reminder carry safety without clutter. */}
      <section>
        <h1 className="text-h1 text-ink">{S.home.h1}</h1>
        <p className="mt-2 text-body text-muted">{S.home.intro}</p>
      </section>

      <div className="mt-5">
        <Checker />
      </div>

      {/* How it works */}
      <section className="mt-8">
        <h2 className="text-h2 text-ink">How it works</h2>
        <ol className="mt-3 space-y-3">
          {HOW_IT_WORKS.sections.map((s, i) => (
            <li key={i} className="rounded-2xl border border-hairline bg-surface p-4">
              <p className="text-verdict font-semibold text-ink">{s.heading}</p>
              <p className="mt-1 text-body text-muted">{s.paragraphs?.[0]}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8">
        <TrustPanel />
      </div>

      {/* Visible FAQ (mirrors the FAQPage JSON-LD) */}
      <section className="mt-8">
        <h2 className="text-h2 text-ink">Common questions</h2>
        <div className="mt-3">
          <FaqList items={FAQ.slice(0, 5)} />
        </div>
        <p className="mt-3 text-body text-muted">
          <Link to="/faq" className="text-trust">
            See all questions →
          </Link>
        </p>
      </section>
    </Layout>
  );
}
