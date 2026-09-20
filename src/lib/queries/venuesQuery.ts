import { queryOptions } from "@tanstack/react-query";
import { getAllVenues, getVenueById } from "@/services/api/venues/venues";
import { getUserVenuesFn } from "@/server/venueFunctions";

/**
 * Query options for a page of venues. Bookings are only requested when both dates are set.
 * Data is considered fresh for 30 seconds (same for all queries in this file).
 *
 * @param page - Page number.
 * @param query - Search text (empty for all venues).
 * @param guests - Number of guests (part of the cache key).
 * @param dateFrom - Check-in date (part of the cache key).
 * @param dateTo - Check-out date (part of the cache key).
 */
export const venuesQuery = (
  page: number,
  query: string,
  guests: number,
  dateFrom: string,
  dateTo: string,
) => {
  return queryOptions({
    queryKey: ["venues", page, query, guests, dateFrom, dateTo],
    queryFn: () => getAllVenues(page, query, Boolean(dateFrom && dateTo)),
    staleTime: 30 * 1000,
  });
};

/**
 * Query options for a single venue.
 *
 * @param id - Venue ID.
 */
export const venueByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ["venue", id],
    queryFn: () => getVenueById(id),
    staleTime: 30 * 1000,
  });
};

/**
 * Query options for the venues owned by a profile.
 *
 * @param name - Profile name.
 */
export const venuesByProfileQuery = (name: string) => {
  return queryOptions({
    queryKey: ["venues", "profile", name],
    queryFn: () => getUserVenuesFn({ data: name }),
    staleTime: 30 * 1000,
  });
};
