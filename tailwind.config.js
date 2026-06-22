/** @type {import('tailwindcss').Config} */
// FreeOfCheck design tokens — dark theme first (spec §4.1).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // All colors are theme variables (rgb triples in src/index.css). LIGHT is
      // the default (:root); DARK applies under [data-theme="dark"].
      colors: {
        base: "rgb(var(--c-base) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        hairline: "rgb(var(--c-hairline) / <alpha-value>)",
        trust: "rgb(var(--c-trust) / <alpha-value>)",
        trustBtn: "rgb(var(--c-trustBtn) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        teal: "rgb(var(--c-teal) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        verdict: {
          okText: "rgb(var(--c-okText) / <alpha-value>)",
          okBg: "rgb(var(--c-okBg) / <alpha-value>)",
          badText: "rgb(var(--c-badText) / <alpha-value>)",
          badBg: "rgb(var(--c-badBg) / <alpha-value>)",
          warnText: "rgb(var(--c-warnText) / <alpha-value>)",
          warnBg: "rgb(var(--c-warnBg) / <alpha-value>)",
          noneText: "rgb(var(--c-noneText) / <alpha-value>)",
          noneBg: "rgb(var(--c-noneBg) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        // mobile-first; body never below 16px (prevents iOS zoom-on-focus)
        h1: ["28px", { lineHeight: "1.25", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "1.35", fontWeight: "600" }],
        verdict: ["17px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        source: ["15px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
