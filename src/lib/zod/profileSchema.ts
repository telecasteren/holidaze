import z from "zod";
import { emptyMetaSchema } from "./metaSchema";
import { venueSchema } from "./venueSchema";

export const profileSchema = z.object({
  name: z.string(),
  email: z.string(),
  bio: z.string().nullable(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  banner: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  venueManager: z.boolean(),
  venues: z.array(venueSchema).optional(),
  bookings: z.array(z.object({
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
      }).optional(),
    }),
  })).optional(),
  _count: z.object({
    venues: z.number(),
    bookings: z.number(),
  }),
});

export const baseProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().nullable().optional(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }).optional(),
  banner: z.object({
    url: z.string(),
    alt: z.string(),
  }).optional(),
  venueManager: z.boolean().optional(),
});

export const apiSingleProfileSchema = z.object({
  data: profileSchema,
  meta: emptyMetaSchema,
});

export const apibaseProfileSchema = z.object({
  data: baseProfileSchema,
  meta: emptyMetaSchema,
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfilePayload = z.infer<typeof baseProfileSchema>;
