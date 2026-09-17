import { formatCalendarDate } from "./formatCalendarDate";
import type { Venue } from "@/lib/zod/index";
import type { CalendarDate } from "@internationalized/date";

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
