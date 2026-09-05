import { useMemo } from "react";
import { useNavigate, Link } from '@tanstack/react-router';
import { formatDate } from "@/lib/utils/utils";
import { Stack, Box, Card, Button, Typography } from '@mui/material';
import { CardsStack } from "@/components/CardsStack";
import type { Venue } from '@/lib/zod/index';

interface BookingsInfoProps {
  venueInfo: Venue[];
}

export const BookingsInfo = ({ venueInfo }: BookingsInfoProps) => {
  const navigate = useNavigate();

  const bookings = useMemo(() =>
    venueInfo.flatMap((venue) => (
      venue.bookings ?? []).map((booking) => ({
        ...booking, venue
      }))
    ), [venueInfo]);

  return (

    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>Total bookings: {bookings.length}</Typography>
      <CardsStack
      >
        {bookings.length ? (
          bookings.map((booking) => (
            <Card key={booking.id}>
              <Typography variant="body1"><strong>Venue:</strong>{" "}
                <Link to="/venues/$venueId"
                  params={{ venueId: booking.venue.id }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {booking.venue.name}
                </Link>
              </Typography>
              <Typography variant="body2"><strong>Dates:</strong> {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</Typography>
              <Typography variant="body2"><strong>Total guests:</strong> {booking.guests}</Typography>
              <Typography variant="body2"><strong>Customer:</strong> {booking.customer.name}</Typography>
            </Card>
          ))
        ) : (
          <Box>
            <Typography variant="body1">You haven't got any bookings yet.</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate({ to: "/venues" })}
            >
              Get inspired!
            </Button>
          </Box>
        )}
        </CardsStack>
   </Stack>
  )
};
