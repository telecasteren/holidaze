import z from "zod";
import { emptyMetaSchema, metaSchema } from "./metaSchema";

export const bookingSchema = z.object({
  id: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number(),
  created: z.string(),
  updated: z.string(),
  venue: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    media: z.array(z.object({
      url: z.string(),
      alt: z.string(),
    })),
    price: z.number(),
    maxGuests: z.number(),
    rating: z.number(),
    created: z.string(),
    updated: z.string(),
    meta: z.object({
      wifi: z.boolean(),
      parking: z.boolean(),
      breakfast: z.boolean(),
      pets: z.boolean(),
    }),
    location: z.object({
      address: z.string().nullable(),
      city: z.string().nullable(),
      zip: z.string().nullable(),
      country: z.string().nullable(),
      continent: z.string().nullable(),
      lat: z.number().nullable(),
      lng: z.number().nullable(),
    }),
  }).optional()
});

export const apiAllBookingsSchema = z.object({
  data: z.array(bookingSchema),
  meta: metaSchema,
});

export const apiSingleBookingSchema = z.object({
  data: z.object({
    id: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
    guests: z.number(),
    created: z.string(),
    updated: z.string(),
  }),
  meta: emptyMetaSchema,
});

export type Booking = z.infer<typeof bookingSchema>;
export type Bookings = z.infer<typeof apiAllBookingsSchema>;
