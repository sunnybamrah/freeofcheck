/** @type {import('tailwindcss').Config} */
// FreeOfCheck design tokens — dark theme first (spec §4.1).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "#0B0F14", // near-black blue-gray background
        surface: "#141A21", // elevated cards
        hairline: "#1F2933", // dividers / card borders
        trust: "#3B82F6", // trust-blue for links/text/focus on dark bg (passes 4.5:1)
        trustBtn: "#2563EB", // darker blue for FILLED buttons w/ white text (5.17:1)
        accent: "#1E3A5F", // deep-blue header accent
        teal: "#34D399", // safe/healthy green accent
        ink: "#F1F5F9", // text primary
        muted: "#94A3B8", // text secondary / captions
        // Verdict states
        verdict: {
          okText: "#34D399",
          okBg: "#0F2A22",
          badText: "#F87171",
          badBg: "#2A1416",
          warnText: "#FBBF24",
          warnBg: "#2A220F",
          noneText: "#94A3B8",
          noneBg: "#1B232B",
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
