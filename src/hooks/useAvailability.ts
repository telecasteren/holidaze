import { useMemo } from "react";
import { formatCalendarDate } from "@/lib/utils/formatCalendarDate";
import type { DateValue } from "react-aria-components";
import type { Venue } from "@/lib/zod/index";

export const useAvailability = (bookings?: Venue["bookings"]) => {
  const isDateUnavailable = useMemo(() => {
    const ranges = (bookings ?? []).map((booking) => ({
      start: formatCalendarDate(booking.dateFrom),
      end: formatCalendarDate(booking.dateTo),
    }));

    return (date: DateValue) =>
      ranges.some((range) => date.compare(range.start) >= 0 && date.compare(range.end) < 0)
  }, [bookings]);

  return { isDateUnavailable };
};
