import { useMemo } from "react";
import { useSortBookingsForm } from "@/hooks/useSortBookingsForm";
import type { Venue } from "@/lib/zod/index";

import { Stack, Box, Typography } from "@mui/material";
import { CardsStack } from "@/components/CardsStack";
import { SortBookingsForm } from "@/components/sorting/SortBookingsForm";
import { AccountBookingCard } from "@/components/account/components/AccountBookingCard";

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
              <AccountBookingCard booking={booking} />
            )
              :
              (
                <AccountBookingCard booking={booking} hasPassed={true} />
              );
            })
        ) : (
          <Box>
            <Typography variant="body1">All set. No bookings yet.</Typography>
          </Box>
        )}
        </CardsStack>
   </Stack>
  )
};
