import z from "zod";
import type { DateValue, RangeValue } from "react-aria-components";

export const calendarBookingSchema = z
  .object({
    guests: z.number().min(1),
    dateRange: z.custom<RangeValue<DateValue> | null>().nullable(),
  })
  .describe("calendarBookingSchema");

export type BookingForm = z.infer<typeof calendarBookingSchema>;

export const exploreSearchFormSchema = calendarBookingSchema.extend({
  query: z.string().trim().default(""),
});

export type ExploreSearchForm = z.infer<typeof exploreSearchFormSchema>;
