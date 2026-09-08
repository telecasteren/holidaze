import { useSuspenseQuery } from "@tanstack/react-query";
import { venueByIdQuery } from "@/lib/queries/venuesQuery";

export const useVenue = (venueId: string) => {
  const { data } = useSuspenseQuery(venueByIdQuery(venueId));
  const venue = data.data;
  return { venue };
};
