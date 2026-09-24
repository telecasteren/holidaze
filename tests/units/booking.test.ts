import { describe, expect, test } from "vitest";
import { parseDate } from "@internationalized/date";
import { hasOverlapBooking } from "@/lib/utils/hasOverlapBooking";
import type { Venue } from "@/lib/zod/index";

const booking = (from: string, to: string) =>
  ({
    dateFrom: `${from}T00:00:00.000Z`,
    dateTo: `${to}T00:00:00.000Z`,
  }) as NonNullable<Venue["bookings"]>[number];

const existingBooking = [booking("2026-09-24", "2026-09-30")];

/** Tests the hasOverlapBooking utility */
describe("hasOverlapBooking", () => {
  test("overlapping bookings return true", () => {
    const start = parseDate("2026-09-28");
    const end = parseDate("2026-10-06");

    expect(hasOverlapBooking(existingBooking, start, end)).toBe(true);
  });

  // starts on the last day of the existingBooking
  test("back-to-back bookings return false", () => {
    const start = parseDate("2026-09-30");
    const end = parseDate("2026-10-01");

    expect(hasOverlapBooking(existingBooking, start, end)).toBe(false);
  });

  // starts and ends within the range of existingBooking
  test("ranges that fully contains a booking return true", () => {
    const start = parseDate("2026-09-26");
    const end = parseDate("2026-09-28");

    expect(hasOverlapBooking(existingBooking, start, end)).toBe(true);
  });
});
