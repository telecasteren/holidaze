import { useMemo } from "react";
import { formatCalendarDate } from "@/lib/utils/utils";
import type { DateValue } from "react-aria-components";
import type { Venue } from "@/lib/zod/index";

/**
 * Provides a calendar callback that marks booked dates as unavailable.
 * A booking's check-in day is blocked; its check-out day is not.
 *
 * @param bookings - Existing bookings for the venue.
 * @returns `isDateUnavailable(date)`, `true` if the date falls inside a booking.
 */
export const useAvailability = (bookings?: Venue["bookings"]) => {
  const isDateUnavailable = useMemo(() => {
    const ranges = (bookings ?? []).map((booking) => ({
      start: formatCalendarDate(booking.dateFrom),
      end: formatCalendarDate(booking.dateTo),
    }));

    return (date: DateValue) =>
      ranges.some(
        (range) =>
          date.compare(range.start) >= 0 && date.compare(range.end) < 0,
      );
  }, [bookings]);

  return { isDateUnavailable };
};
