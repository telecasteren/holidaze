import { useNavigate } from '@tanstack/react-router';
import { useProfileBookings } from "@/hooks/useBookingsList";
import { formatDate } from "@/lib/utils/utils";
import { Stack, Box, Card, Button, Typography } from '@mui/material';
import { CardsStack } from "@/components/CardsStack";
import { LinkToVenue } from "@/components/LinkToVenue";

export const MyTripsInfo = () => {
  const navigate = useNavigate();
  const { bookings, isLoading } = useProfileBookings();

  if (isLoading) return <Box>Loading...</Box>;

  return (

    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>Total trips: {bookings?.meta.totalCount}</Typography>
      <CardsStack
      >
        {bookings?.data.length ? (
          bookings.data.map((booking) => {
            const today = new Date();
            const hasPassed = new Date(booking.dateTo) <= today;

            return (
            <Card key={booking.id} sx={{ opacity: hasPassed ? 0.6 : 1 }}>
              <Typography variant="body1"><strong>Venue booked:</strong> {booking.venue?.name}</Typography>
              <img
                src={booking.venue?.media[0].url}
                alt={booking.venue?.media[0].alt}
                style={{ width: 200, height: 200, borderRadius: 4, objectFit: "contain"}}
              />
              <Typography variant="body2"><strong>Dates:</strong> {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</Typography>
              <Typography variant="body2"><strong>Total guests:</strong> {booking.guests}</Typography>

              <LinkToVenue
                venueId={`${booking.venue?.id}`}
              >
                See venue
              </LinkToVenue>
            </Card>
            )})
        ) : (
          <Box>
            <Typography variant="body1">You have no bookings yet.</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate({ to: "/venues" })}
            >
              Browse venues
            </Button>
          </Box>
        )}
        </CardsStack>
   </Stack>
  )
};
