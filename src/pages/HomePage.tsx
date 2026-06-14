import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { IntroModal } from "../components/IntroModal";
import { Checker } from "../components/Checker";
import { TrustPanel } from "../components/TrustPanel";
import { FaqList } from "../components/ContentPageView";
import { AlertTriangle } from "../components/Icons";
import { S } from "../content/strings";
import { HOW_IT_WORKS, FAQ } from "../content/pages";

export function HomePage() {
  return (
    <Layout>
      <IntroModal />
      <section>
        <h1 className="text-h1 text-ink">{S.home.h1}</h1>
        <p className="mt-2 text-body text-muted">{S.home.intro}</p>
      </section>

      <div className="mt-5">
        <Checker />
      </div>

      {/* Honesty / limits box */}
      <section className="mt-8 rounded-2xl border border-hairline bg-surface p-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-verdict-warnText" size={20} />
          <h2 className="text-h2 text-ink">What this can and can't tell you</h2>
        </div>
        <p className="mt-2 text-body text-muted">
          FDA labels list what a medicine <strong>contains</strong>, not what it is free of. So we can prove
          “Contains”, and we can say an ingredient is “not listed on this label” — but a missing ingredient is
          never a guarantee.{" "}
          <Link to="/why-not-safe" className="text-trust">
            Here's why we never say “safe”.
          </Link>
        </p>
      </section>

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
