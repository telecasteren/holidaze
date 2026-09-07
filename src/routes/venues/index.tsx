import {
  createFileRoute,
  stripSearchParams,
  useNavigate,
} from '@tanstack/react-router'
import { venuesQuery } from '@/lib/queries/venuesQuery'
import { useVenuesList } from '@/hooks/useVenuesList'
import { searchSchema, defaultSearch } from '@/lib/zod/index'

import {
  Container,
  Divider,
  Typography,
  Card,
  Alert,
  Pagination,
  Box,
} from '@mui/material'
import { RouteLoader, PageTitle } from '@/components/layout/index'
import { SearchForm } from '@/components/search/SearchForm'
import { CardsStack } from '@/components/CardsStack'
import { Favourites } from '@/components/venues/Favourites'
import { LinkToVenue } from '@/components/LinkToVenue'

export const Route = createFileRoute('/venues/')({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Venues page for Holidaze booking application.',
      },
      {
        title: 'Venues — Holidaze',
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(venuesQuery()),
  component: Venues,
  pendingComponent: RouteLoader,
  shouldReload: false,
  validateSearch: searchSchema,
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>
  },
})

function Venues() {
  const { visibleVenues, totalPages, page, query } = useVenuesList()
  const navigate = useNavigate({ from: Route.fullPath })

  const handleNextPage = (_event: React.ChangeEvent<unknown>) => {
    navigate({
      search: (prev) => ({ ...prev, page: prev.page + 1 }),
    })
  }

  return (
    <Container id="venues" sx={{ py: 16 }}>
      <PageTitle title="VENUES" styles={{ textAlign: 'center' }} />

      <SearchForm />
      {query.trim() && visibleVenues.length === 0 && (
        <Alert severity="warning" sx={{ m: 2, justifySelf: 'center' }}>
          This search did not give any results.
        </Alert>
      )}

      <CardsStack>
        {visibleVenues.map((venue) => (
          <Card key={venue.id} sx={{ cursor: 'pointer' }}>
            <Favourites
              venue={venue}
              children={
                <LinkToVenue venueId={venue.id}>
                  <Box
                    component="img"
                    src={venue.media[0]?.url || "/no-image-icon.webp"}
                    alt={venue.media[0]?.alt || `Image of ${venue.name}`}
                    sx={{
                      width: 300,
                      height: 300,
                      borderRadius: "inherit",
                      objectFit: "contain",
                      transition: "ease-in-out 0.3s",
                      "&:hover": { opacity: 0.8 },
                    }}
                  />
                </LinkToVenue>
              }
            />

            <LinkToVenue
              venueId={venue.id}
              children={<Typography variant="h2">{venue.name}</Typography>}
            />

            {venue.location?.city && venue.location.country && (
              <Typography variant="body1">
                {venue.location.city} • {venue.location.country}
              </Typography>
            )}

            {venue.rating > 0 ? (
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem', color: 'primary' }}
              >
                Rating: {venue.rating}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem', color: 'primary' }}
              >
                No rating yet
              </Typography>
            )}
          </Card>
        ))}
      </CardsStack>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleNextPage}
        sx={{ display: 'flex', justifyContent: 'end' }}
      />
      <Divider sx={{ mt: 2 }} />
    </Container>
  )
}
