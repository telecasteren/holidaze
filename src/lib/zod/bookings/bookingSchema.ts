import z from "zod";
import { venueBaseSchema } from "@/lib/zod/venues/venueBaseSchema";
import { bookingBaseSchema } from "./bookingBaseSchema";

export const bookingSchema = bookingBaseSchema.extend({
  venue: venueBaseSchema.optional(),
});

export type Booking = z.infer<typeof bookingSchema>;

export const postBookingSchema = z
  .object({
    dateFrom: z.string(),
    dateTo: z.string(),
    guests: z.number().int().min(1),
  })
  .describe("postBookingSchema");

export type BookingPayload = z.infer<typeof postBookingSchema>;

export const updateBookingSchema = postBookingSchema.extend({ id: z.string() });
export const createBookingSchema = postBookingSchema.extend({
  venueId: z.string(),
});

export type BookingFormPayload = z.infer<typeof createBookingSchema>;
