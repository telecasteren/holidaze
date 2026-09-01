import z from "zod";
import type { DateValue, RangeValue } from "react-aria-components";

export const calendarBookingSchema = z.object({
  guests: z.number().min(1),
  dateRange: z.custom<RangeValue<DateValue> | null>().nullable(),
});

export const apiCalendarBookingSchema = z.object({
  venueId: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number().min(0),
});

export type BookingForm = z.infer<typeof calendarBookingSchema>;
export type BookingFormPayload = z.infer<typeof apiCalendarBookingSchema>;
