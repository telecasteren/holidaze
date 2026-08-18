import z from "zod";
import { metaSchema } from "./metaSchema";
import { venueSchema } from "./venueSchema";
import { customerSchema } from "./customerSchema";

export const bookingSchema = z.object({
  id: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number(),
  created: z.string(),
  updated: z.string(),
  venue: venueSchema,
  customer: customerSchema,
});

export const apiBookingSchema = z.object({
  data: z.array(bookingSchema),
  meta: metaSchema,
});
