import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/",
  "/faq",
  "/about",
  "/how-it-works",
  "/why-not-safe",
  "/disclaimer",
  "/privacy",
  "/terms",
  "/accessibility",
  "/feedback",
  "/peg",
  "/lactose",
  "/gluten",
  "/dye-free",
  "/soy",
];

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function dismissIntro(page: Page) {
  const accept = page.getByRole("button", { name: /I understand/i });
  if (await accept.isVisible().catch(() => false)) await accept.click();
}

function summarize(violations: { id: string; impact?: string | null; nodes: unknown[] }[]) {
  return JSON.stringify(violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), null, 2);
}

for (const route of ROUTES) {
  test(`axe clean: ${route}`, async ({ page }) => {
    await page.goto(route);
    await dismissIntro(page);
    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(results.violations, summarize(results.violations)).toEqual([]);
  });
}

const CHECK_RESPONSE = {
  query: "ibuprofen",
  resolvedAs: "ibuprofen",
  total: 12,
  capped: true,
  fromCache: false,
  labels: [
    {
      splId: "a", splSetId: "set-a", brandName: "Ibuprofen Tablets", genericName: "ibuprofen",
      manufacturerName: "Acme", dosageForm: "TABLET", route: "ORAL", effectiveDate: "2024-02-01",
      inactiveIngredient: ["lactose monohydrate, FD&C Yellow No. 6, pregelatinized starch"], openfdaPresent: true,
    },
    {
      splId: "b", splSetId: "set-b", brandName: "Dye Free IB", genericName: "ibuprofen",
      manufacturerName: "Beta", dosageForm: "TABLET", route: "ORAL", effectiveDate: "2024-03-01",
      inactiveIngredient: ["microcrystalline cellulose, magnesium stearate"], openfdaPresent: true,
    },
    {
      splId: "c", splSetId: "set-c", brandName: "Mystery", genericName: "ibuprofen",
      manufacturerName: "Gamma", dosageForm: "TABLET", route: "ORAL", effectiveDate: null,
      inactiveIngredient: [], openfdaPresent: true,
    },
  ],
};

test("axe clean: results state (all four verdict colors on screen)", async ({ page }) => {
  await page.route("**/api/suggest*", (r) => r.fulfill({ json: { suggestions: [] } }));
  await page.route("**/api/check*", (r) => r.fulfill({ json: CHECK_RESPONSE }));
  await page.goto("/");
  await dismissIntro(page);
  await page.getByLabel("Medicine name").fill("ibuprofen");
  // gluten -> produces amber (pregelatinized starch) + green + no-data
  await page.getByRole("button", { name: "Gluten", exact: true }).click();
  await page.getByRole("button", { name: /Check the label/i }).click();
  await page.getByText(/no ingredient list|not listed|Possibly contains|Contains/i).first().waitFor();
  // expand a source passage so the monospace block is on screen too
  await page.getByRole("button", { name: /Show FDA source/i }).first().click();
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(results.violations, summarize(results.violations)).toEqual([]);
});
