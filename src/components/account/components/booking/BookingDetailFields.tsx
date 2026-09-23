import type { Booking } from "@/lib/zod";
import { Box, TextField, InputLabel } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { todayDate } from "@/lib/utils/dates";
import type { RangeValue, DateValue } from "react-aria-components";

/** Props for {@link BookingDetailFields}. */
interface BookingDetailFieldsProps {
  /** Booking to prefill the fields with. Leave out for empty fields. */
  booking?: Booking;
  range: RangeValue<DateValue> | null;
  onRangeChange: (value: RangeValue<DateValue> | null) => void;
  isDateUnavailable: (date: DateValue) => boolean;
}

/**
 * Form fields for a booking's dates and guest count.
 * Guests field is uncontrolled, so the parent reads it from the form's `FormData`,
 */
export const BookingDetailFields = ({
  booking,
  range,
  onRangeChange,
  isDateUnavailable,
}: BookingDetailFieldsProps) => {
  return (
    <>
      <Box sx={{ marginTop: 2 }}>
        <InputLabel htmlFor="booking-guests">Max number of guests</InputLabel>
        <TextField
          id="booking-guests"
          name="guests"
          required
          type="number"
          placeholder="1"
          defaultValue={booking?.guests}
          slotProps={{ htmlInput: { min: 1 } }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <RangeCalendar
          value={range}
          onChange={onRangeChange}
          minValue={todayDate()}
          isDateUnavailable={isDateUnavailable}
        />
      </Box>
    </>
  );
};
