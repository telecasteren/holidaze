import z from "zod";
import { emptyMetaSchema, metaSchema } from "@/lib/zod/shared/metaSchema";
import { bookingSchema } from "@/lib/zod/bookings/bookingSchema";
import { bookingBaseSchema } from "@/lib/zod/bookings/bookingBaseSchema";

export const apiAllBookingsSchema = z
  .object({
    data: z.array(bookingSchema),
    meta: metaSchema,
  })
  .describe("apiAllBookingsSchema");

export const apiSingleBookingSchema = z
  .object({
    data: bookingBaseSchema,
    meta: emptyMetaSchema,
  })
  .describe("apiSingleBookingSchema");
