import { venuesQuery } from "@/lib/queries/venuesQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "@/routes/venues/index";

export const useVenuesList = () => {
  const { page, query } = Route.useSearch();
  const { data } = useSuspenseQuery(venuesQuery(page, query));
  const venues = data.data;

  return {
    venues,
    page,
    query,
    totalPages: data.meta.pageCount,
  };
};
