import { useBookingSummary } from "@/hooks/useBookingSummary";
import { useAvailability } from "@/hooks/useAvailability";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calendarBookingSchema } from "@/lib/zod/calendarSchema";
import type { BookingForm, Venue } from "@/lib/zod/index";

import { Stack, Box, Typography, styled } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BookingSummary } from "@/components/booking/BookingSummary";

const CalendarBox = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 0,
  ...theme.applyStyles("dark", {
    backgroundColor: "hsla(220, 35%, 3%, 0.4)",
    borderRadius: 8,
  }),
}));

/** Props for {@link CalendarDisplay}. */
interface CalendarDisplayProps {
  /** ID of the venue to check availability for. */
  venueId: string;
  /** Existing bookings; their dates are shown as unavailable. */
  bookings?: Venue["bookings"];
}

/**
 * Availability calendar for a venue, next to a booking summary.
 *
 * Booked dates and dates in the past can't be selected. The selected dates and
 * guest count (default 1) are held in a local form and passed to {@link BookingSummary}.
 */
export const CalendarDisplay = ({
  venueId,
  bookings,
}: CalendarDisplayProps) => {
  const { isDateUnavailable } = useAvailability(bookings);

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
      <Typography
        variant="h4"
        sx={{
          xs: { justifySelf: "center" },
          md: { justifySelf: "start", mt: 8, mb: 2 },
        }}
      >
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

        <BookingSummary
          venueId={venueId}
          dates={dates}
          nights={nights}
          values={values}
          control={control}
        />
      </Stack>
    </>
  );
};
