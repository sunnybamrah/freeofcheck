import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { App } from "../src/App";
import { PRERENDER_ROUTES, SITEMAP_PATHS, SITE } from "../src/content/seo";

// Post-build prerender (SEO). For each static route we render the real React
// tree to HTML and inject it (plus per-route <title>/meta/JSON-LD) into the
// built index.html template. Crawlers get real on-page text; the client still
// boots the live SPA via createRoot (see main.tsx). No hydration is attempted.
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "../dist");

function injectHead(template: string, headExtras: string): string {
  return template.replace("</head>", `${headExtras}\n  </head>`);
}

function setTitle(template: string, title: string): string {
  return template.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
}

function setMetaDescription(template: string, desc: string): string {
  return template.replace(
    /<meta name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${desc.replace(/"/g, "&quot;")}" />`,
  );
}

function setCanonical(template: string, url: string): string {
  return template.replace(
    /<link rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${url}" />`,
  );
}

async function main() {
  const templatePath = join(DIST, "index.html");
  let template: string;
  try {
    template = await readFile(templatePath, "utf8");
  } catch {
    console.error("[prerender] dist/index.html not found — run `vite build` first.");
    process.exit(1);
    return;
  }

  for (const route of PRERENDER_ROUTES) {
    const appHtml = renderToStaticMarkup(
      createElement(StaticRouter, { location: route.path }, createElement(App)),
    );

    let html = template.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${appHtml}</div>`,
    );
    html = setTitle(html, route.title);
    html = setMetaDescription(html, route.description);
    html = setCanonical(html, `https://freeofcheck.com${route.path === "/" ? "/" : route.path}`);
    if (route.jsonLd) {
      const blocks = Array.isArray(route.jsonLd) ? route.jsonLd : [route.jsonLd];
      const ld = blocks
        .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
        .join("\n  ");
      html = injectHead(html, ld);
    }
    // Per-route OG url
    html = html.replace(
      /<meta property="og:url"[\s\S]*?\/>/,
      `<meta property="og:url" content="${SITE}${route.path === "/" ? "/" : route.path}" />`,
    );

    const outDir = route.path === "/" ? DIST : join(DIST, route.path);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, "index.html"), html, "utf8");
    console.log(`[prerender] ${route.path} -> ${join(outDir, "index.html").replace(DIST, "dist")}`);
  }
  console.log(`[prerender] done (${PRERENDER_ROUTES.length} routes).`);

  // sitemap.xml
  const now = "2026-06-15";
  const urls = SITEMAP_PATHS.map(
    (p) =>
      `  <url><loc>${SITE}${p === "/" ? "/" : p}</loc><lastmod>${now}</lastmod>` +
      `<priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
  ).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");
  console.log(`[prerender] sitemap.xml (${SITEMAP_PATHS.length} urls)`);
}

main();
