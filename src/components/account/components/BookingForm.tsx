import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateBookingFn } from "@/server/bookingFunctions";
import { useAvailability } from "@/hooks/useAvailability";
import type { Booking, BookingPayload } from "@/lib/zod";

import { formatCalendarDate, toApiDate } from "@/lib/utils/dates";
import type { RangeValue, DateValue } from "react-aria-components";

import { toast } from "react-hot-toast";
import { Stack, Button } from "@mui/material";
import { BookingDetailFields } from "./booking/BookingDetailFields";
import { venueByIdQuery } from "@/lib/queries/venuesQuery";

/** Props for {@link BookingForm}. */
interface BookingFormProps {
  /** The booking to edit. */
  booking: Booking;
  /** Called after a successful save, e.g. to close a modal. */
  close?: () => void;
}

/**
 * Form for updating a booking, or editing one when `booking` is passed.
 * Renders nothing if the user isn't logged in.
 */
export const BookingForm = ({ booking, close }: BookingFormProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: venue } = useQuery({
    ...venueByIdQuery(booking.venue?.id ?? ""),
    enabled: Boolean(booking.venue?.id),
  });
  const otherBookings = venue?.data.bookings?.filter(
    (b) => b.id !== booking.id,
  );
  const { isDateUnavailable } = useAvailability(otherBookings);

  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: formatCalendarDate(booking.dateFrom),
    end: formatCalendarDate(booking.dateTo),
  });

  /** Updates the booking, then refreshes the user's booking list. */
  const updateMutation = useMutation({
    mutationFn: (payload: BookingPayload) =>
      updateBookingFn({ data: { id: booking.id, ...payload } }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", "user", user!.name],
      });

      toast.success("Booking is updated.");
      close?.();
    },
    onError: () => {
      toast.error(`Failed to update booking. Check availability at the venue.`);
    },
  });

  /** Builds the booking payload from the form and saves it. */
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!range) {
      toast.error("Please choose both dates.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const guests = Number(data.get("guests"));

    const payload = {
      guests,
      dateFrom: toApiDate(range.start),
      dateTo: toApiDate(range.end),
    };
    updateMutation.mutate(payload);
  };

  if (!user) return;

  return (
    <Stack sx={{ width: { xs: 300, sm: 500, md: 800, lg: 1000 } }}>
      <form
        id="update-booking"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <BookingDetailFields
          booking={booking}
          range={range}
          onRangeChange={setRange}
          isDateUnavailable={isDateUnavailable}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={updateMutation.isPending}
          sx={{ mt: 2 }}
        >
          Update booking
        </Button>
      </form>
    </Stack>
  );
};
