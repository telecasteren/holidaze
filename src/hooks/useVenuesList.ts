import { venuesQuery } from "@/lib/queries/venuesQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Route } from "@/routes/venues/index";
import { PAGE_SIZE, normalize } from "@/lib/utils/utils";

export const useVenuesList = () => {
  const { page, query } = Route.useSearch();
  const { data } = useSuspenseQuery(venuesQuery());
  const venues = data.data;

  return useMemo(() => {
    const normalizedQuery = normalize(query);

    const filtered = normalizedQuery
      ? venues.filter((v) => {
          const byTitle = normalize(v.name).includes(normalizedQuery);
          const byLocation = v.location?.city?.toLowerCase().includes(normalizedQuery);
          const byDescription = normalize(v.description).includes(
            normalizedQuery,
          );
          return byTitle || byLocation || byDescription;
        })
      : venues;

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const visibleVenues = filtered.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE,
    );
    return { venues, visibleVenues, totalPages, page, query };
  }, [venues, query, page]);
};
