import { test, expect } from "@playwright/test";

const email = process.env.E2E_EMAIL!;
const password = process.env.E2E_PASSWORD!;

test("redirects to login if not signed in", async ({ page }) => {
  await page.goto("/account/anyone");
  await expect(page).toHaveURL(/\/auth\/login/);
});

test("reject email domain if not Noroff domain", async ({ page }) => {
  await page.goto("/auth/login", { waitUntil: "commit" });
  await expect(page.getByLabel("Email", { exact: true })).toBeEnabled();

  await page.getByLabel("Email", { exact: true }).fill("anyone@gmail.com");
  await page.getByLabel("Password", { exact: true }).fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByText("Email must end with '@stud.noroff.no'"),
  ).toBeVisible();
});

test("sign in and out", async ({ page }) => {
  // first login user
  await page.goto("/auth/login", { waitUntil: "commit" });
  await expect(page.getByLabel("Email", { exact: true })).toBeEnabled();

  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/account\//);

  // then logout user
  await page.getByRole("button", { name: "Logout button" }).click();
  await expect(page).toHaveURL(/\/auth\/login/);

  // check that user is logged out (session cookie removed)
  await page.goto("/account/anyone");
  await expect(page).toHaveURL(/\/auth\/login/);
});
