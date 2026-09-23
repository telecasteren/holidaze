import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { login } from "./shared";

// Stress test by running: pnpm exec playwright test booking --repeat-each=5

const VENUE_ID = "8263ff7c-e6c0-4956-ac14-a8d3a8a8993b";
const email = process.env.E2E_EMAIL!;
const password = process.env.E2E_PASSWORD!;

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const dateLabel = (d: Date) => {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const pickADate = async (page: Page, date: Date) => {
  const day = page.getByRole("button", { name: new RegExp(dateLabel(date)) });

  for (let i = 0; i < 24 && !(await day.isVisible()); i++) {
    await page.locator('button[slot="next"]').click();
  }
  await expect(day).toBeEnabled();
  await day.click();
};

// reject if not logged in
test("logged out users cannot book venues", async ({ page }) => {
  await page.goto(`/venues/${VENUE_ID}`, { waitUntil: "commit" });
  const bookBtn = page.getByRole("button", { name: "Book this venue" });
  await expect(bookBtn).toBeEnabled();
  await bookBtn.click();
});

// books a venue
test("logged in user can book venue", async ({ page }) => {
  await login(page, email, password);
  await page.goto(`/venues/${VENUE_ID}`, { waitUntil: "commit" });
  const bookBtn = page.getByRole("button", { name: "Book this venue" });
  await expect(bookBtn).toBeEnabled();

  const randomDates = 30 + Math.floor(Math.random() * 300);
  await pickADate(page, addDays(randomDates));
  await pickADate(page, addDays(randomDates + 2));

  await bookBtn.click();
  await page.getByLabel("Klarna").click();
  await page.getByRole("button", { name: "Confirm booking" }).click();

  await expect(page).toHaveURL(/\/booking\/success/);
  await expect(page.getByText("Booking success!")).toBeVisible();
});
