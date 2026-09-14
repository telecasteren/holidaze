import { Card, Typography, Link as MUILink, Divider } from "@mui/material";
import { LinkToVenue } from "@/components/LinkToVenue";
import { formatDate } from "@/lib/utils/utils";
import type { Booking } from "@/lib/zod/index";

interface AccountBookingCard {
  booking: Booking;
  hasPassed?: boolean;
}

export const AccountBookingCard = ({
  booking,
  hasPassed,
}: AccountBookingCard) => {
  if (!booking.venue || !booking.customer) return null;

  return (
    <Card
      key={booking.id}
      sx={{
        display: "grid",
        gap: 0.5,
        width: { xs: 300, sm: 350 },
        opacity: hasPassed ? 0.6 : 1,
      }}
    >
      <LinkToVenue
        venueId={booking.venue.id || ""}
        styles={{ fontSize: 16, fontWeight: "bold" }}
      >
        {booking.venue.name}
      </LinkToVenue>

      <Typography
        component="span"
        sx={{ fontWeight: "bold", color: "text.secondary", mt: 1 }}
      >
        Booking
      </Typography>

      <Divider />

      <Typography variant="body1">
        <strong>Dates:</strong> {formatDate(booking.dateFrom)} -{" "}
        {formatDate(booking.dateTo)}
      </Typography>

      <Typography variant="body2">
        <strong>Total guests:</strong> {booking.guests}
      </Typography>

      <Typography
        component="span"
        sx={{ fontWeight: "bold", color: "text.secondary", mt: 1 }}
      >
        Customer
      </Typography>

      <Divider />

      <Typography variant="body2">
        <strong>Customer:</strong> {booking.customer.name}
      </Typography>

      <Typography variant="body2">
        <strong>Contact customer:</strong>{" "}
        <MUILink
          href={`mailto:${booking.customer.email}`}
          target="_blank"
          rel="noreferrer"
        >
          {booking.customer.email}
        </MUILink>
      </Typography>
    </Card>
  );
};
