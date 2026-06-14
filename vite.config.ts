/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// FreeOfCheck — Vite config.
// Dev: client on 5173, thin API server on 8787, /api proxied to it.
// Build: static client to dist/; server bundled separately (see package.json).
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "icons/apple-touch-icon.png"],
      // We cache the app shell + the (static) synonym dictionary so the UI
      // loads offline. Live FDA lookups still require the network — stated in UI.
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallbackDenylist: [/^\/api/, /^\/healthz/, /^\/sitemap\.xml/, /^\/robots\.txt/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.fda\.gov\/.*/i,
            handler: "NetworkOnly",
          },
        ],
      },
      manifest: {
        name: "FreeOfCheck — Know what's NOT in your medicine",
        short_name: "FreeOfCheck",
        description:
          "Check whether an FDA drug label lists an ingredient you want to avoid (PEG, dyes, lactose, soy, gluten). Free, no login, nothing stored.",
        theme_color: "#0B0F14",
        background_color: "#0B0F14",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8787",
      "/healthz": "http://localhost:8787",
    },
  },
  build: {
    target: "es2020",
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "server/**/*.test.ts"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**", "server/**"],
      exclude: ["**/*.test.ts", "server/dist/**"],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
