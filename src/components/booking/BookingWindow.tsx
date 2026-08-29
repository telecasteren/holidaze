import React, { useState, useEffect } from 'react';
import { useVenue } from "@/hooks/useVenue";
import { useBookingSummary } from '@/hooks/useBookingSummary';
import type { DateValue, RangeValue } from "react-aria-components";
import type { TransitionProps } from '@mui/material/transitions';
import { VenueDetails } from './booking-components/VenueDetails';
import { PaymentDetails } from './booking-components/PaymentDetails';
import { BookingAppBar } from './booking-components/BookingAppBar';
import {
  Dialog,
  Slide,
  Container,
  Divider
} from '@mui/material';
import toast from 'react-hot-toast';

const Transitions = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BookingWindowProps {
  venueId?: string;
  open: boolean;
  close: () => void;
  booking: {
    guests: number;
    dateRange: RangeValue<DateValue> | null;
  }
}

export const BookingWindow = ({ venueId, open, close, booking }: BookingWindowProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [paymentChecked, setPaymentIsChecked] = useState(false);

  const { singleVenue } = useVenue(venueId);
  const venueName = singleVenue?.name;
  const { dates, nights } = useBookingSummary(booking.dateRange);
  const totalPrice = singleVenue?.price ? singleVenue.price * nights : 0;

  const handlePaymentChange = (_provider: string, checked: boolean) => {
    setIsChecked(checked);
    setPaymentIsChecked(checked);
    setIsDisabled(!checked);
  };

  const handleConfirmBooking = () => {
    toast.success('Booking confirmed!');
    close();
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
            <BookingAppBar
              close={close}
              venueName={venueName}
              disabled={disabled}
              handleConfirmBooking={handleConfirmBooking}
            />

            <Container
              sx={{
                mt: 4,
                mb: 4,
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: 6,
              }}>
              <PaymentDetails checked={isChecked} onCheck={handlePaymentChange} onChange={() => {}} />
              <VenueDetails singleVenue={singleVenue} dates={dates} totalPrice={totalPrice} nights={nights} guests={booking.guests} />
            </Container>

            <Divider />
          </Dialog>
        </>
      );
    }
