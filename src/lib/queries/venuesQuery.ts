import { queryOptions } from "@tanstack/react-query";
import {
  getAllVenues,
  getVenueById,
} from "../../../services/api/venues/venues";
import { getUserVenuesFn } from "@/server/venueFunctions";

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
    queryFn: () => getUserVenuesFn({ data: name }),
    staleTime: 5 * 1000,
  });
};
