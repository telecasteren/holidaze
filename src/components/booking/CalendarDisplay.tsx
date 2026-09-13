import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useBookingSummary } from "@/hooks/useBookingSummary";
import { useAvailability } from "@/hooks/useAvailability";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calendarBookingSchema } from "@/lib/zod/calendarSchema";
import { brandSettings } from "@/lib/brand/brandSettings";
import type { BookingForm, Venue } from "@/lib/zod/index";

import { Stack, Box, Typography, Button, styled } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { GuestCountPicker } from "@/components/booking/GuestCountPicker";
import { BookingWindow } from "@/components/booking/BookingWindow";
import { ModalWindow } from "@/components/layout/Modal";
import { today, getLocalTimeZone } from "@internationalized/date";

const SummaryBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: 20,
  borderRadius: 8,
  height: "fit-content",
  backgroundColor: theme.palette.background.paper,
  ...theme.applyStyles("dark", {
    backgroundColor: "hsla(220, 35%, 3%, 0.4)",
  }),
  [theme.breakpoints.up("xs")]: {
    width: 300,
    // marginTop: "1rem",
  },
  [theme.breakpoints.up("sm")]: {
    width: 350,
    // marginTop: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    // marginTop: "5.5rem",
  },
}));

const CalendarBox = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 0,
  ...theme.applyStyles("dark", {
    backgroundColor: "hsla(220, 35%, 3%, 0.4)",
    borderRadius: 8,
  }),
}));

interface CalendarDisplayProps {
  venueId: string;
  bookings?: Venue["bookings"];
}

export const CalendarDisplay = ({
  venueId,
  bookings,
}: CalendarDisplayProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isDateUnavailable } = useAvailability(bookings);

  const openBookingWindow = () => setOpen(true);
  const handleUnAuthenticated = () => setShowLoginModal(true);

  const { control, watch } = useForm<BookingForm>({
    resolver: zodResolver(calendarBookingSchema),
    defaultValues: {
      guests: 1,
      dateRange: null,
    },
  });
  const values = watch();
  const { dates, nights } = useBookingSummary(values.dateRange);

  return (
    <>
      <BookingWindow
        venueId={venueId}
        open={open}
        close={() => setOpen(false)}
        booking={values}
      />
      <ModalWindow
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title={"Log in to book this venue."}
        content={
          <>
            <Button
              onClick={() => navigate({ to: "/auth/login" })}
              variant="contained"
            >
              Go to log in
            </Button>
            <Button
              onClick={() => navigate({ to: "/auth/signup" })}
              variant="outlined"
            >
              Sign up to {brandSettings.name}
            </Button>
          </>
        }
      />

      <Typography variant="h4" sx={{ mt: 8, mb: 2 }}>
        See availability
      </Typography>

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          justifyItems: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Controller
          name="dateRange"
          control={control}
          render={({ field }) => (
            <CalendarBox>
              <RangeCalendar
                value={field.value}
                onChange={field.onChange}
                isDateUnavailable={isDateUnavailable}
                minValue={today(getLocalTimeZone())}
              />
            </CalendarBox>
          )}
        />

        {/* BOOKING SUMMARY */}
        <SummaryBox>
          <Typography variant="h5">Booking summary</Typography>
          <Typography variant="body1">
            <strong>Dates selected: </strong>
            {dates}
          </Typography>
          <Typography variant="body2">
            <strong>Total nights: </strong>
            {nights}
          </Typography>

          <Controller
            name="guests"
            control={control}
            render={({ field }) => (
              <GuestCountPicker
                venueId={venueId}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Button
            variant="contained"
            onClick={user ? openBookingWindow : handleUnAuthenticated}
          >
            BOOK THIS VENUE
          </Button>
        </SummaryBox>
      </Stack>
    </>
  );
};
