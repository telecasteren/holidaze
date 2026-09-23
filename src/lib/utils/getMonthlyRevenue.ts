import {
  formatCalendarDate,
  nightsBetween,
  todayDate,
} from "@/lib/utils/dates";
import type { CalendarDate } from "@internationalized/date";
import type { Venue } from "@/lib/zod/index";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Sums revenue per month for a venue managers, from completed bookings only.
 *
 * @param venues - Venues with embedded `bookings` (from `venuesByProfileQuery`).
 * @param year - Calendar year to bucket into.
 * @param now - Injectable "today" for testing; defaults to the real current date.
 */
export const getMonthlyRevenue = (
  venues: Venue[],
  year: number,
  now: CalendarDate = todayDate(),
) => {
  const totals: number[] = new Array(12).fill(0);

  for (const venue of venues) {
    for (const booking of venue.bookings ?? []) {
      const startDate = formatCalendarDate(booking.dateFrom);
      const endDate = formatCalendarDate(booking.dateTo);

      if (endDate.compare(now) > 0) continue;
      if (endDate.year !== year) continue;

      const nights = nightsBetween(startDate, endDate);
      totals[endDate.month - 1] += nights * venue.price;
    }
  }

  return MONTHS.map((month, index) => ({
    month,
    revenue: totals[index],
  }));
};

export type MonthlyRevenue = ReturnType<typeof getMonthlyRevenue>[number];
