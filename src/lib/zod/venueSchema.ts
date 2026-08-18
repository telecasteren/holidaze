import z from "zod";
import { metaSchema } from "./metaSchema";

export const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  media: z.array(z.object({ url: z.string(), alt: z.string() })),
  price: z.number(),
  maxGuests: z.number(),
  rating: z.number(),
  created: z.string(),
  updated: z.string(),
  meta: metaSchema,
  location: z.object({
    address: z.string(),
    city: z.string(),
    zip: z.string(),
    country: z.string(),
    continent: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
});

export const apiVenueSchema = z.object({
  data: z.array(venueSchema),
  meta: metaSchema,
});

export const venueByIdSchema = z.object({
  data: venueSchema,
  meta: z.object({}),
});
