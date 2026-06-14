import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Generates the brand asset kit (favicons, PWA icons, OG share image) from
// inline SVG masters using sharp. Run with: npm run gen:assets
const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS = join(__dirname, "../public/icons");

// Square app icon — rounded tile, teal check in a calm green disc.
const iconSvg = (size, maskable = false) => {
  const s = size;
  // For maskable, keep content in the inner ~80% safe zone (full-bleed bg).
  const pad = maskable ? s * 0.18 : s * 0.06;
  const inner = s - pad * 2;
  const cx = s / 2;
  const cy = s / 2;
  const r = inner * 0.42;
  const sw = inner * 0.12;
  const p1x = cx - r * 0.55;
  const p1y = cy + r * 0.02;
  const p2x = cx - r * 0.16;
  const p2y = cy + r * 0.42;
  const p3x = cx + r * 0.62;
  const p3y = cy - r * 0.45;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" rx="${maskable ? 0 : s * 0.22}" fill="#0B0F14"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0F2A22"/>
    <path d="M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y}" fill="none" stroke="#34D399" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
};

// 1200x630 Open Graph / Twitter share card.
const ogSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0B0F14"/>
  <rect x="0" y="0" width="1200" height="8" fill="#34D399"/>
  <g transform="translate(96,150)">
    <circle cx="70" cy="70" r="64" fill="#0F2A22"/>
    <path d="M 40 74 L 62 96 L 104 44" fill="none" stroke="#34D399" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="96" y="360" font-family="-apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif" font-size="76" font-weight="700" fill="#F1F5F9">FreeOfCheck</text>
  <text x="96" y="430" font-family="-apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif" font-size="40" font-weight="600" fill="#34D399">Know what&#39;s NOT in your medicine.</text>
  <text x="96" y="500" font-family="-apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">Check the FDA label for PEG, dyes, lactose, soy or gluten. Free. Cited. Nothing stored.</text>
</svg>`;

async function png(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(ICONS, out));
  console.log(`[assets] ${out} (${size}x${size})`);
}

async function main() {
  await mkdir(ICONS, { recursive: true });
  await png(iconSvg(512), 512, "icon-512.png");
  await png(iconSvg(192), 192, "icon-192.png");
  await png(iconSvg(512, true), 512, "icon-512-maskable.png");
  await png(iconSvg(180), 180, "apple-touch-icon.png");
  await png(iconSvg(32), 32, "favicon-32.png");
  await png(iconSvg(16), 16, "favicon-16.png");

  await sharp(Buffer.from(ogSvg())).png().toFile(join(ICONS, "og-image.png"));
  console.log("[assets] og-image.png (1200x630)");

  // Also write a wordmark SVG for the in-app header (scalable, no raster).
  const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40" viewBox="0 0 200 40" role="img" aria-label="FreeOfCheck">
  <circle cx="20" cy="20" r="16" fill="#0F2A22"/>
  <path d="M 12 21 L 18 27 L 30 13" fill="none" stroke="#34D399" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="44" y="27" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="700" fill="#F1F5F9">FreeOfCheck</text>
</svg>`;
  await writeFile(join(__dirname, "../public/wordmark.svg"), wordmark, "utf8");
  console.log("[assets] wordmark.svg");
}

main();
