import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useBookingSummary } from "@/hooks/useBookingSummary";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calendarBookingSchema } from "@/lib/zod/calendarSchema";
import type { BookingForm } from "@/lib/zod/index";

import { Stack, Box, Typography, Button } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { GuestCountPicker } from "@/components/booking/GuestCountPicker"
import { BookingWindow } from "@/components/booking/BookingWindow";
import { ModalWindow } from "@/components/layout/Modal";

interface CalendarDisplayProps {
  venueId?: string;
}

export const CalendarDisplay = ({ venueId }: CalendarDisplayProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openBookingWindow = () =>  setOpen(true);
  const handleUnAuthenticated = () => setShowLoginModal(true);

  const { control, watch } = useForm<BookingForm>({
    resolver: zodResolver(calendarBookingSchema),
    defaultValues: {
      guests: 1,
      dateRange: null,
    },
  })
  const values = watch();
  const { dates, nights } = useBookingSummary(values.dateRange);

  return (
    <>
      <BookingWindow venueId={venueId} open={open} close={() => setOpen(false)} booking={values} />
      <ModalWindow
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title={"Log in to book this venue."}
        content={
          <Button
            onClick={() => navigate({ to: "/auth/login" })}
            variant="contained"
          >
            Go to log in
          </Button>
        }
      />

      <Stack sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", justifyItems: "center", width: "100%" }}>
        <Controller
          name="dateRange"
          control={control}
          render={({ field }) => (
           <RangeCalendar value={field.value} onChange={field.onChange} />
          )}
          />

        {/* BOOKING SUMMARY */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Booking information</Typography>
              <Typography variant="body1"><strong>Dates selected: </strong>{dates}</Typography>
              <Typography variant="body2"><strong>Total nights: </strong>{nights}</Typography>

              <Controller
                name="guests"
                control={control}
                render={({ field }) => (
                <GuestCountPicker venueId={venueId} value={field.value} onChange={field.onChange} />
                )}
                />
            <Button
              variant="contained"
              onClick={user ? openBookingWindow : handleUnAuthenticated}
            >
            BOOK THIS VENUE
            </Button>
          </Box>
      </Stack>
    </>
  );
};
