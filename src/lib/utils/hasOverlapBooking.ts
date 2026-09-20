import { formatCalendarDate } from "./utils";
import type { Venue } from "@/lib/zod/index";
import type { CalendarDate } from "@internationalized/date";

/**
 * Checks whether a date range overlaps any existing booking.
 * Back-to-back stays are allowed (check-out day can be the next check-in day).
 *
 * @param bookings - Existing bookings for the venue.
 * @param start - Requested check-in date.
 * @param end - Requested check-out date.
 * @returns `true` if at least one booking overlaps.
 */
export const hasOverlapBooking = (
  bookings: Venue["bookings"],
  start: CalendarDate,
  end: CalendarDate,
) => {
  return (bookings ?? []).some((booking) => {
    const bookingStart = formatCalendarDate(booking.dateFrom);
    const bookingEnd = formatCalendarDate(booking.dateTo);
    return start.compare(bookingEnd) < 0 && end.compare(bookingStart) > 0;
  });
};
