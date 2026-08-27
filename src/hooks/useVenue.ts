import { useSuspenseQuery } from "@tanstack/react-query";
import { venuesQuery } from "@/lib/queries/venuesQuery";

export const useVenue = (venueId?: string) => {
  const { data } = useSuspenseQuery(venuesQuery());
  const venues = data.data;
  const singleVenue = venues.find((venue) => venue.id === venueId);
  return { singleVenue };
}
