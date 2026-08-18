import z from "zod";
import { metaSchema } from "./metaSchema";

export const profileSchema = z.object({
  name: z.string(),
  email: z.string(),
  bio: z.string(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  banner: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  venueManager: z.boolean(),
  _count: z.object({
    venues: z.number(),
    bookings: z.number(),
  }),
});

export const apiProfileSchema = z.object({
  data: z.array(profileSchema),
  meta: metaSchema,
});

export const profileByIdSchema = z.object({
  data: profileSchema,
  meta: z.object({}),
});
