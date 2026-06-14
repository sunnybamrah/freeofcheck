// SEO route table used by the build-time prerenderer (scripts/prerender.tsx).
// Expanded in M6 with the per-allergen landing routes + legal/about/FAQ.
export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  jsonLd?: unknown;
}

const SITE = "https://freeofcheck.com";

export const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FreeOfCheck",
  url: SITE + "/",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any (web)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free, no-login tool that checks whether an FDA drug label lists an ingredient you want to avoid — PEG, dyes, lactose, soy, or gluten. Every answer cites its FDA label passage.",
};

export const PRERENDER_ROUTES: PrerenderRoute[] = [
  {
    path: "/",
    title:
      "FreeOfCheck — Know what's NOT in your medicine | FDA-label ingredient check",
    description:
      "Free, no-login tool that checks whether an FDA drug label lists an ingredient you want to avoid — PEG, dyes, lactose, soy, or gluten. Every answer cites its exact FDA label passage. Nothing is stored.",
    jsonLd: webApplicationJsonLd,
  },
];
