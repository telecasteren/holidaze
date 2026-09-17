import { venuesQuery } from "@/lib/queries/venuesQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "@/routes/venues/index";
import { formatCalendarDate } from "@/lib/utils/formatCalendarDate";
import { hasOverlapBooking } from "@/lib/utils/hasOverlapBooking";

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
