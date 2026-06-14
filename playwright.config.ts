import { defineConfig } from "@playwright/test";

// E2E runs against the built production server. Mobile is emulated on Chromium
// (iPhone viewport + mobile-Safari UA + touch) so CI needs only one engine.
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  use: {
    baseURL: BASE,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3,
      },
    },
  ],
  webServer: {
    command: `NODE_ENV=production PORT=${PORT} node server/dist/index.js`,
    url: `${BASE}/healthz`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
