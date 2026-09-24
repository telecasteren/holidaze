import { test, expect } from "@playwright/test";
import { login } from "./helpers/shared";
import { getVenuesIds, deleteVenues, getTestAuthHeaders } from "./helpers/api";
import { testVenueFormData } from "./helpers/testVenueFormData";

// Stress test by running: pnpm exec playwright test venue --repeat-each=5

const managerName = process.env.E2E_USERNAME_VM!;
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

test.describe("logged in venue manager", () => {
  let headers: Record<string, string>;
  let venuesBeforeTest: string[] = [];

  // log in and get user credentials
  test.beforeAll(async () => {
    headers = await getTestAuthHeaders(managerEmail, managerPassword);
  });

  // get booking ids to cleanup
  test.beforeEach(async () => {
    venuesBeforeTest = await getVenuesIds(managerName, headers);
  });

  // make sure we cleanup after each test
  test.afterEach(async () => {
    const after = await getVenuesIds(managerName, headers);
    await deleteVenues(
      after.filter((id) => !venuesBeforeTest.includes(id)),
      headers,
    );
  });

  // registers a venue
  test("logged in venue manager user can register venue", async ({ page }) => {
    const { name, maxGuests, pricePerNight } = testVenueFormData();

    await login(page, managerEmail, managerPassword);
    await expect(page).toHaveURL(/\/account\//);

    await page.getByRole("tab", { name: "Manage venues" }).click();
    await page.getByRole("button", { name: "Register a venue" }).click();

    // fill required fields
    await page.getByLabel("Name of the venue").fill(name);
    await page.getByLabel("Max number of guests").fill(String(maxGuests));
    await page.getByLabel(/Price per night/).fill(String(pricePerNight));

    // optional things
    await page.getByLabel("wifi available").check();

    // fire submit
    await page.getByRole("button", { name: "Register venue" }).click();
    await expect(page.getByText("Venue is registered.")).toBeVisible();
  });
});
