import z from "zod";
import { venueSchema } from "@/lib/zod/venues/venueSchema";
import { bookingSchema } from "@/lib/zod/bookings/bookingSchema";
import { profileBaseSchema } from "@/lib/zod/profile/profileBaseSchema";

export const profileSchema = profileBaseSchema
  .extend({
    venueManager: z.boolean(),
    venues: z.array(venueSchema).optional(),
    bookings: z.array(bookingSchema).optional(),
    _count: z.object({
      venues: z.number(),
      bookings: z.number(),
    }),
  })
  .describe("profileSchema");

export type Profile = z.infer<typeof profileSchema>;

export const updateProfileSchema = profileBaseSchema
  .pick({ name: true, bio: true, avatar: true, banner: true })
  .extend({ venueManager: z.boolean() })
  .partial()
  .describe("updateProfileSchema");

export type ProfilePayload = z.infer<typeof updateProfileSchema>;
