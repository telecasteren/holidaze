import z from "zod";
import { venueMetaSchema } from "./venueMetaSchema";
import { locationSchema } from "./locationSchema";
import { profileBaseSchema } from "@/lib/zod/profile/profileBaseSchema";
import { mediaSchema } from "@/lib/zod/shared/mediaSchema";

export const venueBaseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    media: z.array(mediaSchema),
    price: z.number(),
    maxGuests: z.number().int(),
    rating: z.number(),
    created: z.string(),
    updated: z.string(),
    meta: venueMetaSchema,
    location: locationSchema.optional(),
    owner: profileBaseSchema.optional(),
    _count: z.object({ bookings: z.number().optional() }).optional(),
  })
  .describe("venueBaseSchema");
