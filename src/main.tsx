import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";

// Client-side render (CSR). Marketing/legal/FAQ routes are prerendered to static
// HTML at build time for crawlers (scripts/prerender.tsx); on the client we do a
// fresh createRoot render that replaces that static markup — so there is no
// hydration-mismatch class of bug. Users always get the live SPA.
const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}
