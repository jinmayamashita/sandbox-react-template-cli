import { test, expect } from "@playwright/test";

test("homepage has title and home page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/React app/);

  expect(await page.content()).toContain("Welcome Home!");
});
