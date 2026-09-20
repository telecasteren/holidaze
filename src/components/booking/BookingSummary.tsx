import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { BookingForm } from "@/lib/zod/index";
import { brandSettings } from "@/lib/brand/brandSettings";

import { Box, Typography, Button, styled } from "@mui/material";
import { GuestCountPicker } from "@/components/booking/GuestCountPicker";
import { BookingWindow } from "@/components/booking/BookingWindow";
import { ModalWindow } from "@/components/layout/Modal";
import { useAuth } from "@/hooks/useAuth";

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
    marginTop: "1rem",
  },
  [theme.breakpoints.up("sm")]: {
    width: 350,
  },
  [theme.breakpoints.up("md")]: {
    marginTop: 0,
  },
}));

/** Props for {@link BookingSummary}. */
interface BookingSummaryProps {
  /** ID of the venue being booked. */
  venueId: string;
  /** Formatted selected dates, or `null` if none. */
  dates: string | null;
  /** Number of nights in the selected range. */
  nights: number | null;
  /** Current form values (guests and date range), passed on to the booking window. */
  values: BookingForm;
  /** react-hook-form control, used for the guest count field. */
  control: Control<BookingForm>;
}

/**
 * Summary of the selected dates, nights and guest count, with a "book" button.
 *
 * Logged-in users get the {@link BookingWindow}. Logged-out users get a modal
 * with links to log in or sign up.
 */
export const BookingSummary = ({
  venueId,
  dates,
  nights,
  values,
  control,
}: BookingSummaryProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openBookingWindow = () => setOpen(true);
  const handleUnAuthenticated = () => setShowLoginModal(true);

  return (
    <Box>
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

      <SummaryBox>
        <Typography variant="h5" component="h2">
          Booking summary
        </Typography>
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
          onClick={isAuthenticated ? openBookingWindow : handleUnAuthenticated}
        >
          BOOK THIS VENUE
        </Button>
      </SummaryBox>
    </Box>
  );
};
