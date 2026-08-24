import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import type { Booking } from '@/lib/zod/index';

interface BookingInfoProps {
  bookingInfo: Booking[];
}

export const BookingInfo = ({ bookingInfo }: BookingInfoProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      {bookingInfo.length > 0 ? (
        bookingInfo.map((booking) => (
          <Box key={booking.id}>
            <Typography variant="body1"><strong>Venue booked:</strong> {booking.venue?.name}</Typography>
          </Box>
          ))
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
   </Box>
  )
};
