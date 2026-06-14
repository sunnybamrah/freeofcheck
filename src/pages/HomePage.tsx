import { Layout } from "../components/Layout";
import { IntroModal } from "../components/IntroModal";
import { Checker } from "../components/Checker";
import { TrustPanel } from "../components/TrustPanel";
import { S } from "../content/strings";

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

      <div className="mt-8">
        <TrustPanel />
      </div>
    </Layout>
  );
}
