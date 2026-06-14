import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import {
  AboutPage,
  HowItWorksPage,
  WhyNotSafePage,
  DisclaimerPage,
  PrivacyPage,
  TermsPage,
  AccessibilityPage,
  FaqPage,
  FeedbackPage,
  AllergenLandingPage,
  NotFoundPage,
} from "./pages/ContentPages";
import { ALLERGEN_PAGES } from "./content/pages";

// Kept asset-import-free so the whole tree can be prerendered with tsx at build.
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/why-not-safe" element={<WhyNotSafePage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      {ALLERGEN_PAGES.map((p) => (
        <Route key={p.slug} path={`/${p.slug}`} element={<AllergenLandingPage page={p} />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
