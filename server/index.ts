import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = new Hono();

const PORT = Number(process.env.PORT) || 8787;
const __dirname = dirname(fileURLToPath(import.meta.url));
// In dev, server runs from server/ via tsx; dist is ../dist.
// In prod, the bundle runs from server/dist/, so dist is ../../dist.
const DIST = join(__dirname, __dirname.endsWith("dist") ? "../../dist" : "../dist");

// --- Health check (Railway healthcheck target) ---
app.get("/healthz", (c) => c.json({ ok: true, service: "freeofcheck", ts: new Date().toISOString() }));

// --- API routes (full openFDA proxy added in M3) ---
// Mounted in M3: import { api } from "./api"; app.route("/api", api);

// --- Static client + SPA fallback (production only) ---
const isProd = process.env.NODE_ENV === "production";
if (isProd) {
  app.use("/*", serveStatic({ root: DIST }));
  // SPA fallback: any non-file, non-api route serves index.html.
  app.get("/*", async (c) => {
    try {
      const html = await readFile(join(DIST, "index.html"), "utf8");
      return c.html(html);
    } catch {
      return c.text("Build not found. Run `npm run build`.", 500);
    }
  });
}

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`[freeofcheck] server listening on http://localhost:${info.port}`);
});

export { app };
