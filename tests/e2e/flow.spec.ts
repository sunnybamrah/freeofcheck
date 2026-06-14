import { test, expect, type Page } from "@playwright/test";

const CHECK_RESPONSE = {
  query: "ibuprofen",
  resolvedAs: "ibuprofen",
  total: 50,
  capped: true,
  fromCache: false,
  labels: [
    {
      splId: "a",
      splSetId: "set-a",
      brandName: "Ibuprofen Tablets",
      genericName: "ibuprofen",
      manufacturerName: "Acme Pharma",
      dosageForm: "TABLET",
      route: "ORAL",
      effectiveDate: "2024-02-01",
      inactiveIngredient: ["microcrystalline cellulose, lactose monohydrate, magnesium stearate"],
      openfdaPresent: true,
    },
    {
      splId: "b",
      splSetId: "set-b",
      brandName: "Ibuprofen Dye Free",
      genericName: "ibuprofen",
      manufacturerName: "Beta Labs",
      dosageForm: "TABLET",
      route: "ORAL",
      effectiveDate: "2024-03-01",
      inactiveIngredient: ["microcrystalline cellulose, croscarmellose sodium, magnesium stearate"],
      openfdaPresent: true,
    },
    {
      splId: "c",
      splSetId: "set-c",
      brandName: "Mystery IB",
      genericName: "ibuprofen",
      manufacturerName: "Gamma",
      dosageForm: "TABLET",
      route: "ORAL",
      effectiveDate: null,
      inactiveIngredient: [],
      openfdaPresent: true,
    },
  ],
};

async function dismissIntro(page: Page) {
  const accept = page.getByRole("button", { name: /I understand/i });
  if (await accept.isVisible().catch(() => false)) await accept.click();
}

test.describe("FreeOfCheck full flow (mobile)", () => {
  test("type drug -> pick chip -> Check -> cards -> expand source -> DailyMed link", async ({
    page,
  }) => {
    await page.route("**/api/suggest*", (r) => r.fulfill({ json: { suggestions: [] } }));
    await page.route("**/api/check*", (r) => r.fulfill({ json: CHECK_RESPONSE }));

    await page.goto("/");
    await dismissIntro(page);

    await page.getByLabel("Medicine name").fill("ibuprofen");
    await page.getByRole("button", { name: "Lactose", exact: true }).click();
    await page.getByRole("button", { name: /Check the label/i }).click();

    // Contains card renders
    await expect(page.getByText(/Contains Lactose/i)).toBeVisible();
    // capped banner
    await expect(page.getByText(/Showing the first 3 of 50/i)).toBeVisible();
    // count summary mentions a Contains result (never hidden)
    await expect(page.getByText(/contain it/i)).toBeVisible();

    // expand the verbatim FDA source
    await page.getByRole("button", { name: /Show FDA source/i }).first().click();
    await expect(page.getByText(/lactose monohydrate/i).first()).toBeVisible();

    // DailyMed deep link present
    const link = page.getByRole("link", { name: /DailyMed/i }).first();
    await expect(link).toHaveAttribute("href", /dailymed\.nlm\.nih\.gov.*setid=/);

    // persistent disclaimer present
    await expect(page.getByTestId("disclaimer")).toBeVisible();
  });

  test("switching ingredient re-evaluates instantly (no second network call)", async ({ page }) => {
    let checkCalls = 0;
    await page.route("**/api/suggest*", (r) => r.fulfill({ json: { suggestions: [] } }));
    await page.route("**/api/check*", (r) => {
      checkCalls++;
      return r.fulfill({ json: CHECK_RESPONSE });
    });

    await page.goto("/");
    await dismissIntro(page);
    await page.getByLabel("Medicine name").fill("ibuprofen");
    await page.getByRole("button", { name: "Lactose", exact: true }).click();
    await page.getByRole("button", { name: /Check the label/i }).click();
    await expect(page.getByText(/Contains Lactose/i)).toBeVisible();

    // switch to PEG — should NOT trigger another /api/check
    await page.getByRole("button", { name: "PEG", exact: true }).click();
    await expect(page.getByText(/PEG not listed|Possibly contains PEG|Contains PEG/i).first()).toBeVisible();
    expect(checkCalls).toBe(1);
  });

  test("loading shows the skeleton state", async ({ page }) => {
    await page.route("**/api/suggest*", (r) => r.fulfill({ json: { suggestions: [] } }));
    await page.route("**/api/check*", async (r) => {
      await new Promise((res) => setTimeout(res, 800));
      return r.fulfill({ json: CHECK_RESPONSE });
    });
    await page.goto("/");
    await dismissIntro(page);
    await page.getByLabel("Medicine name").fill("ibuprofen");
    await page.getByRole("button", { name: /Check the label/i }).click();
    await expect(page.getByText(/Searching official FDA labels/i)).toBeVisible();
    await expect(page.getByTestId("disclaimer")).toBeVisible();
  });

  test("no-match shows did-you-mean and the disclaimer", async ({ page }) => {
    await page.route("**/api/suggest*", (r) => r.fulfill({ json: { suggestions: [] } }));
    await page.route("**/api/check*", (r) =>
      r.fulfill({
        status: 404,
        json: { error: "not found", code: "not_found", suggestions: ["Ibuprofen"] },
      }),
    );
    await page.goto("/");
    await dismissIntro(page);
    await page.getByLabel("Medicine name").fill("ibuprofun");
    await page.getByRole("button", { name: /Check the label/i }).click();
    await expect(page.getByText(/couldn't find a medicine/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Ibuprofen" })).toBeVisible();
    await expect(page.getByTestId("disclaimer")).toBeVisible();
  });

  test("server error shows a calm message + retry, never a stack trace", async ({ page }) => {
    await page.route("**/api/suggest*", (r) => r.fulfill({ json: { suggestions: [] } }));
    await page.route("**/api/check*", (r) =>
      r.fulfill({ status: 502, json: { error: "We couldn't reach the FDA database just now.", code: "upstream_unavailable" } }),
    );
    await page.goto("/");
    await dismissIntro(page);
    await page.getByLabel("Medicine name").fill("ibuprofen");
    await page.getByRole("button", { name: /Check the label/i }).click();
    await expect(page.getByText(/couldn't reach the FDA database/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Try again/i })).toBeVisible();
    await expect(page.getByTestId("disclaimer")).toBeVisible();
  });
});
