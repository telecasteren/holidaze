import { test, expect } from "@playwright/test";
import { login } from "./helpers/shared";

// Stress test by running: pnpm exec playwright test venue --repeat-each=5

const managerEmail = process.env.E2E_EMAIL_VM!;
const managerPassword = process.env.E2E_PASSWORD_VM!;

const customerEmail = process.env.E2E_EMAIL!;
const customerPassword = process.env.E2E_PASSWORD!;

test("user without venue manager role don't see 'Manage venue' tab", async ({
  page,
}) => {
  await login(page, customerEmail, customerPassword);
  await expect(page).toHaveURL(/\/account\//);

  await page.getByRole("tab", { name: "Account" }).click();
  await expect(page.getByRole("tab", { name: "Manage venues" })).toHaveCount(0);
});

// register a venue
test("logged in venue manager user can register venue", async ({ page }) => {
  await login(page, managerEmail, managerPassword);
  await expect(page).toHaveURL(/\/account\//);

  await page.getByRole("tab", { name: "Manage venues" }).click();
  await page.getByRole("button", { name: "Register a venue" }).click();
});
