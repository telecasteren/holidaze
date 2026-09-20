import { venuesQuery } from "@/lib/queries/venuesQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "@/routes/venues/index";
import { formatCalendarDate } from "@/lib/utils/utils";
import { hasOverlapBooking } from "@/lib/utils/hasOverlapBooking";

/**
 * Loads the venues for the current search params (suspends while loading).
 * Venues are then filtered in the browser: they must fit the guest count and,
 * if dates are set, have no overlapping booking. Also runs during server rendering.
 *
 * @returns `venues`, `page`, `query` and `totalPages`.
 */
export const useVenuesList = () => {
  const { page, query, guests, dateFrom, dateTo } = Route.useSearch();
  const { data } = useSuspenseQuery(
    venuesQuery(page, query, guests, dateFrom, dateTo),
  );
  const venues = data.data.filter((venue) => {
    if (venue.maxGuests < guests) return false;
    if (dateFrom && dateTo) {
      const start = formatCalendarDate(dateFrom);
      const end = formatCalendarDate(dateTo);

      if (hasOverlapBooking(venue.bookings, start, end)) return false;
    }
    return true;
  });

  return {
    venues,
    page,
    query,
    totalPages: data.meta.pageCount,
  };
};
