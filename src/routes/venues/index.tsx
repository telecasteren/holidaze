import {
  createFileRoute,
  stripSearchParams,
  useNavigate,
} from "@tanstack/react-router";
import { venuesQuery } from "@/lib/queries/venuesQuery";
import { useVenuesList } from "@/hooks/useVenuesList";
import { useSortVenuesForm } from "@/hooks/useSortVenuesForm";
import { searchSchema, defaultSearch } from "@/lib/zod/index";
import { CustomPending } from "@/lib/route-states/CustomPending";
import { localCurrency } from "@/lib/utils/config";

import {
  Container,
  Divider,
  Typography,
  Card,
  Alert,
  Pagination,
  Box,
} from "@mui/material";
import { LocationOnIcon } from "@/components/layout/icons";
import { PageTitle } from "@/components/layout/index";
import { SearchForm } from "@/components/search/SearchForm";
import { SortVenuesForm } from "@/components/sorting/SortVenuesForm";
import { CardsStack } from "@/components/CardsStack";
import { Favourites } from "@/components/venues/Favourites";
import { LinkToVenue } from "@/components/LinkToVenue";

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
    const { page, query } = searchSchema.parse(location.search);
    return context.queryClient.ensureQueryData(venuesQuery(page, query));
  },
  pendingComponent: CustomPending,
  shouldReload: false,
  component: Venues,
  validateSearch: searchSchema,
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>;
  },
});

function Venues() {
  const { venues, totalPages, page, query } = useVenuesList();
  const navigate = useNavigate({ from: Route.fullPath });

  const { option, handleChange, sortedVenues } = useSortVenuesForm(venues);

  const handleNextPage = (_event: React.ChangeEvent<unknown>) => {
    navigate({
      search: (prev) => ({ ...prev, page: prev.page + 1 }),
    });
  };

  return (
    <Container id="venues" sx={{ py: 16 }}>
      <PageTitle title="EXPLORE VENUES" styles={{ textAlign: "center" }} />

      <SearchForm />
      {query.trim() && venues.length === 0 && (
        <Alert severity="warning" sx={{ m: 2, justifySelf: "center" }}>
          This search did not give any results.
        </Alert>
      )}
      <SortVenuesForm option={option} onChange={handleChange} />

      <CardsStack>
        {sortedVenues.map((venue) => (
          <Card
            key={venue.id}
            sx={{
              display: "grid",
              width: { xs: 300, sm: 350 },
              overflow: "hidden",
              padding: 0,
              border: "none",
              boxShadow: 1,
            }}
          >
            <Favourites
              venue={venue}
              children={
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: 250,
                    overflow: "hidden",
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                  }}
                >
                  <LinkToVenue venueId={venue.id}>
                    <Box
                      component="img"
                      src={venue.media[0]?.url || "/no-image-icon.webp"}
                      alt={venue.media[0]?.alt || `Image of ${venue.name}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "ease-in-out 0.3s",
                        "&:hover": { opacity: 0.8 },
                      }}
                    />
                  </LinkToVenue>
                </Box>
              }
            />

            <Box sx={{ display: "grid", gap: 2, p: 2 }}>
              <LinkToVenue
                venueId={venue.id}
                children={<Typography variant="h2">{venue.name}</Typography>}
              />

              {venue.location?.city && venue.location.country && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    alignItems: "center",
                    color: "text.secondary",
                  }}
                >
                  <LocationOnIcon fontSize="small" /> {venue.location.city} •{" "}
                  {venue.location.country}
                </Typography>
              )}

              <Divider />

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>
                  {venue.price} {localCurrency}
                </strong>{" "}
                / night
              </Typography>

              {venue.rating > 0 ? (
                <Typography variant="caption" sx={{ color: "primary.main" }}>
                  Rating: {venue.rating}
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  sx={{ color: "primary.main", fontStyle: "italic" }}
                >
                  No rating yet
                </Typography>
              )}
            </Box>
          </Card>
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
