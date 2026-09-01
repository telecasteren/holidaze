import { createFileRoute } from '@tanstack/react-router'
import { brandSettings } from '@/lib/brand/brandSettings'
import { venueByIdQuery } from "@/lib/queries/venuesQuery";
import type { Venue } from "../../lib/zod/venueSchema";

import { Container, Typography, Divider, Stack, Box, Avatar } from '@mui/material';
import { PageTitle } from '@/components/layout/index';
import { CalendarDisplay } from "@/components/booking/CalendarDisplay";
import { Gallery } from '@/components/venues/Gallery';
import { VenueMeta } from '@/components/venues/VenueMeta';

export const Route = createFileRoute('/venues/$venueId')({
  loader: async ({ context, params }): Promise<Venue> => {
    const data = await context.queryClient.ensureQueryData(
      venueByIdQuery(params.venueId),
    );
    return data.data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        name: "description",
        content: `Venue details for ${loaderData?.name ?? "Venue"} at ${brandSettings.name}.`,
      },
      { title: loaderData?.name ?? "Venue" },
    ],
  }),
  component: VenueById,
})

function VenueById() {
  const venue = Route.useLoaderData();
  const hasRatings = venue.rating > 0;
  const venueCity = venue.location?.city || "unknown city";
  const venueCountry = venue.location?.country || "unknown country";

  return (
    <>
    <Container id="venue-details" sx={{ py: { xs: 8, sm: 16 } }}>
        <Gallery venueMedia={venue.media} />
        <PageTitle title={venue.name} styles={{ textAlign: "left", marginTop: 4 }} />
        <Typography variant="body2"
          sx={{ fontWeight: "semibold" }}
        >
          {venueCity} • {venueCountry}
        </Typography>

        <Stack sx={{ mt: 2 }}>
          <Box>
            <Typography variant="h4"><strong>About:</strong></Typography>
            <Typography variant="body1">{venue.description}</Typography>
          </Box>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
          >
             <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography variant="body2"><strong>Managed by</strong></Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={venue.owner?.avatar.url}
                  alt={venue.owner?.avatar.alt}
                  sx={{ width: 25, height: 25 }}
                />
                 <Typography variant="body2">{venue.owner?.name || "unknown"}</Typography>
              </Box>
              </Stack>

              <Typography variant="body2"><strong>Rating:</strong> {hasRatings ? venue.rating : "No rating yet"}</Typography>
              <Typography variant="body2">Max {venue.maxGuests} guests</Typography>

              <Typography variant="h5" sx={{ mt: 2 }}>What this place offers</Typography>
               <VenueMeta venue={venue} />
              </Box>
          </Stack>
        </Stack>

        {/* Calendar */}
        <Typography
          variant="h5"
          sx={{ mt: 8, textAlign: "center" }}
        >
          See availability
        </Typography>
        <CalendarDisplay venueId={venue.id} bookings={venue.bookings} />
    </Container>
      <Divider />
    </>
  );
}
