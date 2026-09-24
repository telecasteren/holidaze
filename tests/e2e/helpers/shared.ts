import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export async function login(page: Page, email: string, password: string) {
  await page.goto("/auth/login", { waitUntil: "commit" });
  await expect(page.getByLabel("Email", { exact: true })).toBeEnabled();

  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/account\//);
}
