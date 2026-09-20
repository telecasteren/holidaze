import React, { useState, useEffect } from "react";
import { useVenue } from "@/hooks/useVenue";
import { useBookingSummary } from "@/hooks/useBookingSummary";
import { useRouter, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { createNewBookingFn } from "@/server/bookingFunctions";
import { getApiErrorInfo } from "@/services/api/api-config/apiError";
import type { BookingFormPayload } from "@/lib/zod";

import type { DateValue, RangeValue } from "react-aria-components";
import type { TransitionProps } from "@mui/material/transitions";
import { Dialog, Slide, Container, Divider } from "@mui/material";
import { VenueDetails } from "./booking-components/VenueDetails";
import { PaymentDetails } from "./booking-components/PaymentDetails";
import { BookingAppBar } from "./booking-components/BookingAppBar";
import { WarningToast } from "@/components/layout/WarningToast";
import toast from "react-hot-toast";

/** Slide-up transition for the full-screen booking dialog. */
const Transitions = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/** Props for {@link BookingWindow}. */
interface BookingWindowProps {
  /** ID of the venue being booked. */
  venueId: string;
  /** Whether the dialog is visible. */
  open: boolean;
  /** Called to close the dialog. */
  close: () => void;
  /** The selected guest count and date range. */
  booking: {
    guests: number;
    dateRange: RangeValue<DateValue> | null;
  };
}

/**
 * Full-screen dialog for confirming and paying for a booking.
 *
 * The confirm button stays disabled until a payment provider is checked.
 * On submit it creates the booking: success goes to `/booking/success`, failure shows an error toast.
 * Total price is the venue's price times the number of nights.
 */
export const BookingWindow = ({
  venueId,
  open,
  close,
  booking,
}: BookingWindowProps) => {
  const router = useRouter();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [paymentChecked, setPaymentIsChecked] = useState(false);

  const { venue } = useVenue(venueId);
  const { dates, nights } = useBookingSummary(booking.dateRange);
  const totalPrice = venue.price ? venue.price * nights : 0;

  const addBooking = useMutation({
    mutationFn: (payload: BookingFormPayload) =>
      createNewBookingFn({ data: { ...payload } }),

    onSuccess: () => {
      toast.loading("Processing booking...");
      navigate({ to: "/booking/success" });
    },
    onError: (error) => {
      const errorMessage = getApiErrorInfo(error)?.message;
      toast.error(`Failed to create booking: ${errorMessage}`);
    },
    onSettled: () => {
      router.invalidate();
      toast.remove();
    },
  });

  /** Enables or disables the confirm button based on whether a payment provider is checked. */
  const handlePaymentChange = (_provider: string, checked: boolean) => {
    setIsChecked(checked);
    setPaymentIsChecked(checked);
    setIsDisabled(!checked);
  };

  /** Submits the booking. Shows a warning toast instead if no dates are selected. */
  const handleConfirmBooking = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!booking.dateRange) {
      toast.custom(<WarningToast text="No dates selected. Try again." />);
      return;
    }

    const dateFrom = booking.dateRange.start.toString();
    const dateTo = booking.dateRange.end.toString();
    const guests = booking.guests;
    const payload = { venueId, dateFrom, dateTo, guests };

    addBooking.mutate(payload);
  };

  useEffect(() => {
    if (paymentChecked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [paymentChecked]);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        slots={{
          transition: Transitions,
        }}
      >
        <form onSubmit={handleConfirmBooking}>
          <BookingAppBar close={close} disabled={disabled} />

          <Container
            sx={{
              mt: 4,
              mb: 4,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              gap: 6,
            }}
          >
            <PaymentDetails
              checked={isChecked}
              onCheck={handlePaymentChange}
              onChange={() => {}}
            />

            <VenueDetails
              singleVenue={venue}
              dates={dates}
              totalPrice={totalPrice}
              nights={nights}
              guests={booking.guests}
            />
          </Container>
        </form>
        <Divider />
      </Dialog>
    </>
  );
};
