import { Link } from "@tanstack/react-router";
import { Card, Typography, Link as MUILink } from "@mui/material";
import { formatDate } from "@/lib/utils/utils";
import type { Booking } from "@/lib/zod/index";

interface AccountBookingCard {
  booking: Booking;
  hasPassed?: boolean;
}

export const AccountBookingCard = ({ booking, hasPassed }: AccountBookingCard) => {
  if (!booking.venue || !booking.customer) return null;

  return (
    <Card key={booking.id} sx={{ lineHeight: "1.5", opacity: hasPassed ? 0.6 : 1 }}>
      <Typography variant="h6"><strong>Venue:</strong>{" "}
        <Link to="/venues/$venueId"
          params={{ venueId: booking.venue.id || ""}}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {booking.venue.name}
        </Link>
      </Typography>
      <Typography variant="body2">
        <strong>Dates:</strong>{" "}
        {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
      </Typography>
      <Typography variant="body2"><strong>Total guests:</strong> {booking.guests}</Typography>
      <Typography variant="body2"><strong>Customer:</strong> {booking.customer.name}</Typography>
      <Typography variant="body2"><strong>Contact customer:</strong>{" "}
        <MUILink href={`mailto:${booking.customer.email}`} target="_blank" rel="noreferrer">
          {booking.customer.email}
        </MUILink>
      </Typography>
    </Card>
  )
}
