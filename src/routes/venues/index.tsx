import { createFileRoute } from '@tanstack/react-router'
import { venuesQuery } from '@/lib/queries/venuesQuery';
import { useVenuesList } from '@/hooks/useVenuesList';
import { searchSchema } from '@/lib/zod/index';

import { Container, Divider, Typography, Stack, Card, Alert } from '@mui/material';
import { RouteLoader } from '@/components/layout/RouteLoader';
import PageTitle from '@/components/layout/PageTitle';
import DateRangePicker from '@/components/booking/DateRangePicker';
import GuestCountPicker from '@/components/booking/GuestCountPicker';
import SearchForm from '@/components/search/SearchForm';


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

  return (
    <Container id="venues" sx={{ py: { xs: 8, sm: 16 } }}>

      <PageTitle title="VENUES" />
      <SearchForm />

      {query.trim() && visibleVenues.length === 0 && (
        <Alert
          severity="warning"
          onClose={() => {}}
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
          <img src={venue.media[0]?.url} alt={venue.name} style={{ width: '100%' }} />
          <Typography variant="h3">{venue.name}</Typography>
          <Typography variant="body1">{venue.description}</Typography>
        </Card>
      ))}
        </Stack>

        <Divider />
    </Container>
  );
}
