import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

// M1 scaffold router. Routes are expanded in later milestones (legal, about,
// per-allergen SEO pages, 404). Kept asset-import-free so the whole tree can be
// prerendered with tsx at build time.
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
