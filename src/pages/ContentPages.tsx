import { Link } from "react-router-dom";
import { ContentPageView } from "../components/ContentPageView";
import { Layout } from "../components/Layout";
import { Checker } from "../components/Checker";
import {
  ABOUT,
  HOW_IT_WORKS,
  WHY_NOT_SAFE_PAGE,
  DISCLAIMER_PAGE,
  PRIVACY_PAGE,
  TERMS_PAGE,
  ACCESSIBILITY_PAGE,
  FEEDBACK_PAGE,
  FAQ,
  ALLERGEN_PAGES,
  FEEDBACK_EMAIL,
  GITHUB_REPO_URL,
  type AllergenPage,
} from "../content/pages";
import { FaqList } from "../components/ContentPageView";
import { S } from "../content/strings";

export const AboutPage = () => <ContentPageView page={ABOUT} />;
export const HowItWorksPage = () => <ContentPageView page={HOW_IT_WORKS} />;
export const WhyNotSafePage = () => <ContentPageView page={WHY_NOT_SAFE_PAGE} />;
export const DisclaimerPage = () => <ContentPageView page={DISCLAIMER_PAGE} />;
export const PrivacyPage = () => <ContentPageView page={PRIVACY_PAGE} />;
export const TermsPage = () => <ContentPageView page={TERMS_PAGE} />;
export const AccessibilityPage = () => <ContentPageView page={ACCESSIBILITY_PAGE} />;

export function FaqPage() {
  return (
    <Layout>
      <article className="max-w-prose">
        <h1 className="text-h1 text-ink">Frequently asked questions</h1>
        <p className="mt-3 text-body text-muted">
          The honest answers to how FreeOfCheck works — and what it can and can't tell you.
        </p>
        <div className="mt-5">
          <FaqList items={FAQ} />
        </div>
        <p className="mt-6 text-body text-muted">
          Ready to try it? <Link to="/" className="text-trust">Check a medicine</Link>.
        </p>
      </article>
    </Layout>
  );
}

export function FeedbackPage() {
  return (
    <ContentPageView page={FEEDBACK_PAGE}>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${FEEDBACK_EMAIL}?subject=FreeOfCheck%20feedback`}
          className="inline-flex min-h-[44px] items-center rounded-xl bg-trustBtn px-5 text-body font-semibold text-white"
        >
          Email feedback
        </a>
        <a
          href={`${GITHUB_REPO_URL}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center rounded-xl border border-hairline bg-surface px-5 text-body text-trust"
        >
          Open a GitHub issue
        </a>
      </div>
      <p className="mt-4 text-caption text-muted">
        Reminder: please don't include personal health information.
      </p>
    </ContentPageView>
  );
}

export function AllergenLandingPage({ page }: { page: AllergenPage }) {
  return (
    <Layout>
      <article className="max-w-prose">
        <h1 className="text-h1 text-ink">{page.title}</h1>
        {page.intro && <p className="mt-3 text-body text-muted">{page.intro}</p>}
        <div className="mt-5">
          <Checker defaultAllergenId={page.allergenId} />
        </div>
        <div className="mt-8 space-y-6">
          {page.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="text-h2 text-ink">{s.heading}</h2>}
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-2 text-body text-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-6 text-caption text-muted">{S.disclaimer.short}</p>
      </article>
    </Layout>
  );
}

export const allergenPageBySlug = (slug: string): AllergenPage | undefined =>
  ALLERGEN_PAGES.find((p) => p.slug === slug);

export function NotFoundPage() {
  return (
    <Layout>
      <div className="py-10 text-center">
        <p className="text-h1 text-ink">Page not found</p>
        <p className="mt-2 text-body text-muted">
          We couldn't find that page. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex min-h-[44px] items-center rounded-xl bg-trustBtn px-5 text-body font-semibold text-white"
        >
          Check a medicine
        </Link>
      </div>
    </Layout>
  );
}
