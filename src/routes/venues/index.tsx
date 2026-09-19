import {
  createFileRoute,
  stripSearchParams,
  useNavigate,
} from "@tanstack/react-router";
import { useVenuesList } from "@/hooks/useVenuesList";
import { useSortVenuesForm } from "@/hooks/useSortVenuesForm";
import { venuesQuery } from "@/lib/queries/venuesQuery";
import { searchSchema, defaultSearch } from "@/lib/zod/index";
import { DefaultNotFound, CustomError } from "@/lib/route-states/index";

import { Container, Divider, Alert, Pagination } from "@mui/material";
import { PageTitle } from "@/components/layout/index";
import { SortVenuesForm } from "@/components/sorting/SortVenuesForm";
import { SearchDisplay } from "@/components/search/SearchDisplay";
import { CardsStack } from "@/components/CardsStack";
import { SkeletonVenues } from "@/components/venues/SkeletonVenues";
import { VenueCard } from "@/components/venues/venueCard/VenueCard";

export const Route = createFileRoute("/venues/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Venues page for Holidaze booking application.",
      },
      {
        title: "Venues | Holidaze",
      },
    ],
  }),
  loader: ({ context, location }) => {
    const { page, query, guests, dateFrom, dateTo } = searchSchema.parse(
      location.search,
    );
    return context.queryClient.ensureQueryData(
      venuesQuery(page, query, guests, dateFrom, dateTo),
    );
  },
  shouldReload: true,
  component: Venues,
  validateSearch: searchSchema,
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  pendingComponent: SkeletonVenues,
  notFoundComponent: DefaultNotFound,
  errorComponent: CustomError,
});

function Venues() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { venues, totalPages, page, query } = useVenuesList();
  const { option, handleChange, sortedVenues } = useSortVenuesForm(venues);

  const handleNextPage = (_event: React.ChangeEvent<unknown>) => {
    navigate({
      search: (prev) => ({ ...prev, page: prev.page + 1 }),
    });
  };

  return (
    <Container id="venues" sx={{ py: 16 }}>
      <PageTitle title="EXPLORE VENUES" styles={{ textAlign: "center" }} />

      <SearchDisplay />
      {query.trim() && venues.length === 0 && (
        <Alert severity="warning" sx={{ m: 2, justifySelf: "center" }}>
          This search did not give any results.
        </Alert>
      )}
      <SortVenuesForm option={option} onChange={handleChange} />

      <CardsStack>
        {sortedVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </CardsStack>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleNextPage}
        sx={{ display: "flex", justifyContent: "end" }}
      />
      <Divider sx={{ mt: 2 }} />
    </Container>
  );
}
