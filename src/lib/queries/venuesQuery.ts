import { queryOptions } from "@tanstack/react-query";
import { getAllVenues, getVenueById } from "../../../services/api/venues/venues";

export const venuesQuery = () => {
  return queryOptions({
    queryKey: ["venues"],
    queryFn: getAllVenues,
    staleTime: 5 * 1000,
  });
};

export const venueByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ["venue", id],
    queryFn: () => getVenueById(id),
    staleTime: 5 * 1000,
  });
};
