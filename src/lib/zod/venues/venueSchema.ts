import z from "zod";
import { venueMetaSchema } from "./venueMetaSchema";
import { venueBaseSchema } from "./venueBaseSchema";
import { locationSchema } from "./locationSchema";
import { bookingBaseSchema } from "@/lib/zod/bookings/bookingBaseSchema";
import { mediaSchema } from "@/lib/zod/shared/mediaSchema";

export const venueSchema = venueBaseSchema.extend({
  bookings: z.array(bookingBaseSchema).optional(),
});

export type Venue = z.infer<typeof venueSchema>;

export const postVenueSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    media: z.array(mediaSchema),
    price: z.number(),
    maxGuests: z.number().int(),
    rating: z.number().optional(),
    meta: venueMetaSchema,
    location: locationSchema.optional(),
  })
  .describe("postVenueSchema");

export type VenuePayload = z.infer<typeof postVenueSchema>;

export const updateVenueSchema = postVenueSchema.extend({ id: z.string() });
