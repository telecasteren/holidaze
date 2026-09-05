import { useMemo } from "react";
import { useSortBookingsForm } from "@/hooks/useSortBookingsForm";
import { Link } from '@tanstack/react-router';
import { formatDate } from "@/lib/utils/utils";
import type { Venue } from '@/lib/zod/index';

import { Stack, Box, Card, Typography } from '@mui/material';
import { CardsStack } from "@/components/CardsStack";
import { SortBookingsForm } from "#/components/sorting/SortBookingsForm";

interface BookingsInfoProps {
  venueInfo: Venue[];
}

export const BookingsInfo = ({ venueInfo }: BookingsInfoProps) => {
  const today = new Date();

  const allBookings = useMemo(() =>
    venueInfo.flatMap((venue) => (
      venue.bookings ?? []).map((booking) => ({
        ...booking, venue
      }))
    ), [venueInfo]);

  const { option, handleChange, sortedBookings } = useSortBookingsForm(allBookings);

  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>Total bookings: {sortedBookings.length}</Typography>
      <SortBookingsForm option={option} onChange={handleChange} />
      <CardsStack>
        {sortedBookings.length ? (
          sortedBookings.map((booking) => {
            const hasPassed = new Date(booking.dateTo) <= today;

            return !hasPassed ? (
              <Card key={booking.id}>
                <Typography variant="body1"><strong>Venue:</strong>{" "}
                  <Link to="/venues/$venueId"
                    params={{ venueId: booking.venue.id || ""}}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {booking.venue.name}
                  </Link>
                </Typography>
                <Typography variant="body2"><strong>Dates:</strong> {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</Typography>
                <Typography variant="body2"><strong>Total guests:</strong> {booking.guests}</Typography>
                <Typography variant="body2"><strong>Customer:</strong> {booking.customer.name}</Typography>
              </Card>
            )
              :
              (
                <Card key={booking.id} sx={{ opacity: 0.6 }}>
                  <Typography variant="body1">
                    <strong>Venue:</strong>{" "}
                    {booking.venue.name}
                  </Typography>
                  <Typography variant="body2"><strong>Dates:</strong> {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</Typography>
                  <Typography variant="body2"><strong>Total guests:</strong> {booking.guests}</Typography>
                  <Typography variant="body2"><strong>Customer:</strong> {booking.customer.name}</Typography>
                </Card>
              );
            })
        ) : (
          <Box>
            <Typography variant="body1">You haven't got any bookings yet.</Typography>
          </Box>
        )}
        </CardsStack>
   </Stack>
  )
};
