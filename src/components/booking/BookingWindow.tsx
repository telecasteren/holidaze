import React, { useState, useEffect } from "react";
import { useVenue } from "@/hooks/useVenue";
import { useBookingSummary } from "@/hooks/useBookingSummary";
import { useRouter, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { createNewBookingFn } from "@/server/bookingFunctions";
import type { BookingFormPayload } from "@/lib/zod";

import type { DateValue, RangeValue } from "react-aria-components";
import type { TransitionProps } from "@mui/material/transitions";
import { Dialog, Slide, Container, Divider } from "@mui/material";
import { VenueDetails } from "./booking-components/VenueDetails";
import { PaymentDetails } from "./booking-components/PaymentDetails";
import { BookingAppBar } from "./booking-components/BookingAppBar";
import toast from "react-hot-toast";

const Transitions = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BookingWindowProps {
  venueId: string;
  open: boolean;
  close: () => void;
  booking: {
    guests: number;
    dateRange: RangeValue<DateValue> | null;
  };
}

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
      toast.success("Processing booking...");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Failed to create booking: ${errorMessage}`);
    },
    onSettled: () => {
      router.invalidate();
      setTimeout(() => {
        navigate({ to: "/booking/success" });
      }, 1500);
    },
  });

  const handlePaymentChange = (_provider: string, checked: boolean) => {
    setIsChecked(checked);
    setPaymentIsChecked(checked);
    setIsDisabled(!checked);
  };

  const handleConfirmBooking = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!booking.dateRange) {
      toast.error("No dates selected. Don't you know when to go? Try again.");
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
