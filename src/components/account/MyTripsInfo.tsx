import { useNavigate } from "@tanstack/react-router";
import { useBookingsList } from "@/hooks/useBookingsList";
import { formatDate } from "@/lib/utils/utils";

import { Stack, Box, Card, Button, Typography } from "@mui/material";
import { CardsStack } from "@/components/CardsStack";
import { LinkToVenue } from "@/components/LinkToVenue";
import { RouteLoader } from "@/components/layout/RouteLoader";

export const MyTripsInfo = () => {
  const navigate = useNavigate();
  const { bookings, isLoading } = useBookingsList();

  if (isLoading)
    return (
      <Box sx={{ mx: "auto" }}>
        <RouteLoader />
      </Box>
    );

  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Total trips: {bookings?.meta.totalCount}
      </Typography>
      <CardsStack>
        {bookings?.data.length ? (
          bookings.data.map((booking) => {
            const today = new Date();
            const hasPassed = new Date(booking.dateTo) <= today;

            return (
              <Card
                key={booking.id}
                sx={{
                  display: "grid",
                  cursor: "pointer",
                  width: { xs: 300, sm: 350 },
                  overflow: "hidden",
                  gap: 1,
                  justifyContent: "center",
                  opacity: hasPassed ? 0.6 : 1,
                }}
              >
                <LinkToVenue venueId={booking.venue?.id || ""} unstyled>
                  <Box
                    component="img"
                    src={booking.venue?.media[0]?.url}
                    alt={
                      booking.venue?.media[0]?.alt ||
                      `Image of ${booking.venue?.name}`
                    }
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 1,
                      objectFit: "cover",
                      transition: "ease-in-out 0.3s",
                      "&:hover": { opacity: 0.8 },
                    }}
                  />
                </LinkToVenue>

                <Typography variant="h6">{booking.venue?.name}</Typography>

                <Typography variant="body2">
                  <strong>Dates:</strong> {formatDate(booking.dateFrom)} -{" "}
                  {formatDate(booking.dateTo)}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Booked for {booking.guests}{" "}
                  {booking.guests > 1 ? "guests" : "guest"}
                </Typography>
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
