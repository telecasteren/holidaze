import { Card, Typography, Link as MUILink, Divider } from "@mui/material";
import { LinkToVenue } from "@/components/LinkToVenue";
import { formatDate } from "@/lib/utils/dates";
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
        boxShadow: 1,
        border: "none",
      }}
    >
      <LinkToVenue
        venueId={booking.venue.id || ""}
        styles={{ fontSize: 20, fontWeight: "bold" }}
      >
        {booking.venue.name}
      </LinkToVenue>

      <Divider />

      <Typography
        component="span"
        sx={{ fontWeight: "bold", color: "text.secondary", mt: 1 }}
      >
        Booking
      </Typography>

      <Typography variant="body1">
        <strong>Dates:</strong> {formatDate(booking.dateFrom)} -{" "}
        {formatDate(booking.dateTo)}
      </Typography>

      <Typography variant="body2">
        <strong>Guest total:</strong> {booking.guests}
      </Typography>

      <Divider />

      <Typography
        component="span"
        sx={{
          fontWeight: "bold",
          color: "text.secondary",
          mt: 1,
        }}
      >
        Customer
      </Typography>

      <Typography variant="body2">
        <strong>Name:</strong> {booking.customer.name}
      </Typography>

      <Typography variant="body2">
        <strong>Email:</strong>{" "}
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
