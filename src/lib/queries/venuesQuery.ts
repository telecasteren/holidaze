import { queryOptions } from "@tanstack/react-query";
import { getAllVenues, getVenueById } from "../../../services/api/venues/venues";
import { getUserVenuesFn } from "@/server/venueFunctions";

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

export const venuesByProfileQuery = (name: string) => {
  return queryOptions({
    queryKey: ["venues", "profile", name],
    queryFn: () => getUserVenuesFn({data: name}),
    staleTime: 5 * 1000,
  });
};
