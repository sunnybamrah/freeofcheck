// SEO route table used by the build-time prerenderer (scripts/prerender.tsx).
// Every route gets a unique title/description, a canonical URL, and the right
// JSON-LD (WebApplication, FAQPage, MedicalWebPage).
import {
  ALL_CONTENT_PAGES,
  ALLERGEN_PAGES,
  ABOUT,
  HOW_IT_WORKS,
  FAQ,
  type ContentPage,
} from "./pages";

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  jsonLd?: unknown;
}

export const SITE = "https://freeofcheck.com";

const HOME_TITLE = "FreeOfCheck — Know what's NOT in your medicine | FDA-label ingredient check";
const HOME_DESC =
  "Free, no-login tool that checks whether an FDA drug label lists an ingredient you want to avoid — PEG, dyes, lactose, soy, or gluten. Every answer cites its exact FDA label passage. Nothing is stored.";

export const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FreeOfCheck",
  url: SITE + "/",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any (web)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: HOME_DESC,
};

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function medicalWebPageJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url: SITE + path,
    lastReviewed: "2026-06-15",
    audience: { "@type": "MedicalAudience", audienceType: ["Patient", "Caregiver", "Pharmacist"] },
    publisher: { "@type": "Organization", name: "FreeOfCheck" },
  };
}

function contentRoute(page: ContentPage, jsonLd?: unknown): PrerenderRoute {
  return {
    path: "/" + page.slug,
    title: page.metaTitle,
    description: page.metaDescription,
    jsonLd: jsonLd ?? medicalWebPageJsonLd(page.title, page.metaDescription, "/" + page.slug),
  };
}

export const PRERENDER_ROUTES: PrerenderRoute[] = [
  // Home: WebApplication + an embedded FAQ on the page mirrored as FAQPage.
  {
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESC,
    jsonLd: [webApplicationJsonLd, faqJsonLd(FAQ.slice(0, 5))],
  },
  // Dedicated FAQ route with the full FAQPage schema.
  {
    path: "/faq",
    title: "FAQ — FreeOfCheck | What an FDA label can and can't tell you",
    description:
      "Answers to how FreeOfCheck works and why a label can never prove a medicine is free of an ingredient.",
    jsonLd: faqJsonLd(FAQ),
  },
  // About + How-it-works use MedicalWebPage.
  contentRoute(ABOUT),
  contentRoute(HOW_IT_WORKS),
  // The remaining static/legal pages.
  ...ALL_CONTENT_PAGES.filter((p) => p.slug !== ABOUT.slug && p.slug !== HOW_IT_WORKS.slug).map((p) =>
    contentRoute(p),
  ),
  // Per-allergen landing pages (each a MedicalWebPage).
  ...ALLERGEN_PAGES.map((p) => contentRoute(p)),
];

export const SITEMAP_PATHS: string[] = PRERENDER_ROUTES.map((r) => r.path);
