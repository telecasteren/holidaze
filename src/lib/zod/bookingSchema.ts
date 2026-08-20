import z from "zod";
import { metaSchema } from "./metaSchema";

export const bookingSchema = z.object({
  id: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number(),
  created: z.string(),
  updated: z.string(),
});

export const apiBookingSchema = z.object({
  data: z.array(bookingSchema),
  meta: metaSchema,
});
