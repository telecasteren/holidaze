import { useSuspenseQuery } from "@tanstack/react-query";
import { venueByIdQuery } from "@/lib/queries/venuesQuery";

/**
 * Loads a single venue (suspends while loading).
 *
 * @param venueId - Venue ID.
 * @returns `venue`.
 */
export const useVenue = (venueId: string) => {
  const { data } = useSuspenseQuery(venueByIdQuery(venueId));
  const venue = data.data;
  return { venue };
};
