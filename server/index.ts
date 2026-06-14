import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { api } from "./api";
import { maybePrewarm } from "./prewarm";

const app = new Hono();

const PORT = Number(process.env.PORT) || 8787;
const __dirname = dirname(fileURLToPath(import.meta.url));
// In dev, server runs from server/ via tsx; dist is ../dist.
// In prod, the bundle runs from server/dist/, so dist is ../../dist.
const DIST = join(__dirname, __dirname.endsWith("dist") ? "../../dist" : "../dist");

// --- Health check (Railway healthcheck target) ---
app.get("/healthz", (c) => c.json({ ok: true, service: "freeofcheck", ts: new Date().toISOString() }));

// --- API routes (openFDA proxy) ---
app.route("/api", api);

// --- Static client + SPA fallback ---
// Serve the built client UNLESS we're in the Vite dev setup (where Vite serves
// the client and proxies /api here). FOC_DEV=1 is set only by the dev:server
// script, so production/Railway serves static without depending on NODE_ENV.
const serveStaticFiles = process.env.FOC_DEV !== "1";
if (serveStaticFiles) {
  app.use("/*", serveStatic({ root: DIST }));
  // SPA fallback: any non-file, non-api route serves index.html (the client
  // router shows a styled 404 for unknown paths).
  app.get("/*", async (c) => {
    try {
      const html = await readFile(join(DIST, "index.html"), "utf8");
      return c.html(html);
    } catch {
      const page = await readFile(join(DIST, "500.html"), "utf8").catch(
        () => "Build not found. Run `npm run build`.",
      );
      return c.html(page, 500);
    }
  });
}

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`[freeofcheck] server listening on http://localhost:${info.port}`);
  maybePrewarm();
});

export { app };
