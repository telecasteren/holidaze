import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { venuesQuery } from '@/lib/queries/venuesQuery';
import { useVenuesList } from '@/hooks/useVenuesList';
import { searchSchema } from '@/lib/zod/index';

import { Container, Divider, Typography, Stack, Card, Alert } from '@mui/material';
import { RouteLoader } from '@/components/layout/RouteLoader';
import PageTitle from '@/components/layout/PageTitle';
import DateRangePicker from '@/components/booking/DateRangePicker';
import GuestCountPicker from '@/components/booking/GuestCountPicker';
import SearchForm from '@/components/search/SearchForm';
import Pagination from '@mui/material/Pagination';
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/layout/icons"
import { toast } from 'react-hot-toast';

export const Route = createFileRoute('/venues/')({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Venues page for Holidaze booking application.",
      },
      {
        title: "Venues — Holidaze",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(venuesQuery()),
  component: Venues,
  pendingComponent: RouteLoader,
  shouldReload: false,
  validateSearch: searchSchema,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Venues() {
  const { visibleVenues, totalPages, page, query } = useVenuesList();
  const navigate = useNavigate({ from: Route.fullPath });
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleNextPage = (_event: React.ChangeEvent<unknown>) => {
    navigate({
      search: (prev) => ({ ...prev, page: prev.page + 1 }),
    })
  };

  const handleToggleFavorite = (venueId: string) => {
    setFavorites({ ...favorites, [venueId]: !favorites[venueId] });
    toast.remove();
    toast(`${favorites[venueId] ? 'Removed from' : 'Added to'} favorites`);
  };

  return (
    <Container id="venues" sx={{ py: { xs: 8, sm: 16 } }}>
      <PageTitle title="VENUES" />
      <SearchForm />

      {query.trim() && visibleVenues.length === 0 && (
        <Alert
          severity="warning"
          onClose={() => { }}
          sx={{ m: 4, justifySelf: 'center'}}
        >This search did not give any results.</Alert>
      )}

       <Stack
        direction={{ sm: 'column' }}
        spacing={1}
        useFlexGap
        sx={{ justifySelf: 'center', pt: 2, width: { xs: '100%', sm: '350px'} }}
      >
        <DateRangePicker />
        <GuestCountPicker />
      </Stack>

      <Stack sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 4, m: 4 }}>
      {visibleVenues.map((venue) => (
        <Card key={venue.id}>
          <Stack sx={{ position: 'relative' }}>
            {favorites[venue.id] ? <FavoriteIcon onClick={() => handleToggleFavorite(venue.id)} sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1, color: 'error.light' }} />
              :
              <FavoriteBorderIcon onClick={() => handleToggleFavorite(venue.id)} sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} />
            }
            <img src={venue.media[0]?.url} alt={venue.name} style={{ width: '100%' }} />
          </Stack>
          <Typography variant="h3">{venue.name}</Typography>

          {venue.location.city && venue.location.country && (
          <Typography variant="body1">{venue.location.city} • {venue.location.country}</Typography>
          )}

          {venue.rating > 0 ?
            <Typography variant="body2" sx={{fontSize: '0.8rem', color: 'primary'}}>Rating: {venue.rating}</Typography>
          :
            <Typography variant="body2" sx={{fontSize: '0.8rem', color: 'primary'}}>No rating yet</Typography>
          }
        </Card>
      ))}
      </Stack>

      <Pagination count={totalPages} page={page} onChange={handleNextPage} sx={{ display: 'flex', justifyContent: 'end'}} />
      <Divider sx={{ mt: 2 }} />
    </Container>
  );
}
