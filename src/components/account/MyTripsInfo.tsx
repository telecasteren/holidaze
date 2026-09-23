import { useNavigate } from "@tanstack/react-router";
import { useBookingsList } from "@/hooks/useBookingsList";
import { useSortBookingsForm } from "@/hooks/useSortBookingsForm";
import { formatDate, isPast } from "@/lib/utils/dates";

import { Stack, Box, Card, Button, Typography, Divider } from "@mui/material";
import { CardsStack } from "@/components/CardsStack";
import { LinkToVenue } from "@/components/LinkToVenue";
import { SortBookingsForm } from "@/components/sorting/SortBookingsForm";

import { AccountBookingActions } from "@/components/account/components/AccountBookingActions";

export const MyTripsInfo = () => {
  const navigate = useNavigate();
  const { bookings } = useBookingsList();

  const { option, handleChange, sortedBookings } = useSortBookingsForm(
    bookings.data,
  );

  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Total trips: {bookings.meta.totalCount}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <SortBookingsForm option={option} onChange={handleChange} />
      </Box>

      <CardsStack>
        {sortedBookings.length ? (
          sortedBookings.map((booking) => {
            const hasPassed = isPast(booking.dateTo);

            return (
              <Card
                key={booking.id}
                sx={{
                  opacity: hasPassed ? 0.4 : 1,
                  p: 0,
                  border: "none",
                  position: "relative",
                  width: "fit-content",
                  minWidth: 250,
                  maxWidth: 400,
                }}
              >
                <LinkToVenue venueId={booking.venue?.id || ""} unstyled>
                  <Box
                    component="img"
                    loading="lazy"
                    src={booking.venue?.media[0]?.url}
                    alt={
                      booking.venue?.media[0]?.alt ||
                      `Image of ${booking.venue?.name}`
                    }
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxHeight: "100%",
                      borderRadius: 1,
                      transition: "ease-in-out 0.3s",
                      "&:hover": { opacity: hasPassed ? 1 : 0.8 },
                    }}
                  />
                </LinkToVenue>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "grid",
                    p: 2,
                    color: "text.light",
                    background: "linear-gradient(to top, black, transparent)",
                    pointerEvents: "none",
                  }}
                >
                  <Typography variant="h6">{booking.venue?.name}</Typography>

                  <Divider />

                  <Typography variant="body2">
                    <strong>Dates:</strong> {formatDate(booking.dateFrom)} -{" "}
                    {formatDate(booking.dateTo)}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Booked for {booking.guests}{" "}
                    {booking.guests > 1 ? "guests" : "guest"}
                  </Typography>
                </Box>

                <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                  <AccountBookingActions booking={booking} />
                </Box>
              </Card>
            );
          })
        ) : (
          <Box>
            <Typography variant="body1">
              You haven't booked any trips yet.
            </Typography>
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
  );
};
