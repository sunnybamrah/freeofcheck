import type { ReactNode } from "react";
import type { ContentPage, FaqItem } from "../content/pages";
import { Layout } from "./Layout";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <dl className="space-y-4">
      {items.map((item) => (
        <div key={item.q} className="rounded-2xl border border-hairline bg-surface p-4">
          <dt className="text-verdict font-semibold text-ink">{item.q}</dt>
          <dd className="mt-1 text-body text-muted">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ContentBody({ page }: { page: ContentPage }) {
  return (
    <>
      <h1 className="text-h1 text-ink">{page.title}</h1>
      {page.updated && (
        <p className="mt-1 text-caption text-muted">Last updated {page.updated}</p>
      )}
      {page.intro && <p className="mt-3 text-body text-muted">{page.intro}</p>}

      <div className="mt-5 space-y-6">
        {page.sections.map((s, i) => (
          <section key={i}>
            {s.heading && <h2 className="text-h2 text-ink">{s.heading}</h2>}
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="mt-2 text-body text-muted">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-body text-muted">
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {page.faq && page.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="text-h2 text-ink">Common questions</h2>
          <div className="mt-3">
            <FaqList items={page.faq} />
          </div>
        </section>
      )}
    </>
  );
}

export function ContentPageView({ page, children }: { page: ContentPage; children?: ReactNode }) {
  return (
    <Layout>
      <article className="max-w-prose">
        <ContentBody page={page} />
        {children}
      </article>
    </Layout>
  );
}
