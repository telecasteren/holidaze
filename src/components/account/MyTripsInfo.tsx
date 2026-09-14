import { useNavigate } from "@tanstack/react-router";
import { useBookingsList } from "@/hooks/useBookingsList";
import { useSortBookingsForm } from "@/hooks/useSortBookingsForm";
import { formatDate } from "@/lib/utils/utils";

import { Stack, Box, Card, Button, Typography, Divider } from "@mui/material";
import { CardsStack } from "@/components/CardsStack";
import { GridBox } from "@/components/GridBox";
import { LinkToVenue } from "@/components/LinkToVenue";
import { RouteLoader } from "@/components/layout/RouteLoader";
import { SortBookingsForm } from "@/components/sorting/SortBookingsForm";

export const MyTripsInfo = () => {
  const navigate = useNavigate();
  const { bookings, isLoading } = useBookingsList();
  const allBookings = bookings?.data || [];

  const { option, handleChange, sortedBookings } =
    useSortBookingsForm(allBookings);

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

      <Box sx={{ mb: 2 }}>
        <SortBookingsForm option={option} onChange={handleChange} />
      </Box>

      <CardsStack>
        {sortedBookings.length ? (
          sortedBookings.map((booking) => {
            const today = new Date();
            const hasPassed = new Date(booking.dateTo) <= today;

            return (
              <Card
                key={booking.id}
                sx={{
                  display: "grid",
                  width: { xs: 300, sm: 350 },
                  overflow: "hidden",
                  gap: 1,
                  justifyContent: "center",
                  opacity: hasPassed ? 0.6 : 1,
                  padding: 0,
                  border: "none",
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
                      borderTopLeftRadius: 1,
                      borderTopRightRadius: 1,
                      objectFit: "cover",
                      transition: "ease-in-out 0.3s",
                      "&:hover": { opacity: 0.8 },
                    }}
                  />
                </LinkToVenue>

                <GridBox styles={{ gap: 1, padding: 2 }}>
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
                </GridBox>
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
