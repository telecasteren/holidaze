import z from "zod";
import { metaSchema, emptyMetaSchema } from "./metaSchema";

export const venueMetaSchema = z.object({
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
});

export type VenueMeta = z.infer<typeof venueMetaSchema>;

export const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  media: z.array(z.object({
    url: z.string(),
    alt: z.string(),
  })),
  price: z.number(),
  maxGuests: z.number().int(),
  rating: z.number(),
  created: z.string(),
  updated: z.string(),
  meta: venueMetaSchema,
  location: z.object({
    address: z.string().nullable(),
    city: z.string().nullable(),
    zip: z.string().nullable(),
    country: z.string().nullable(),
    continent: z.string().nullable(),
    lat: z.number().nullable(),
    lng: z.number().nullable(),
  }),
  owner: z.object({
    name: z.string(),
    email: z.string(),
    bio: z.string(),
    avatar: z.object({ url: z.string(), alt: z.string() }),
    banner: z.object({ url: z.string(), alt: z.string() }),
  }).optional(),
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
      maxGuests: z.number().int(),
      rating: z.number(),
      created: z.string(),
      updated: z.string(),
      meta: venueMetaSchema,
      location: z.object({
        address: z.string().nullable(),
        city: z.string().nullable(),
        zip: z.string().nullable(),
        country: z.string().nullable(),
        continent: z.string().nullable(),
        lat: z.number().nullable(),
        lng: z.number().nullable(),
      }),
      owner: z.object({
        name: z.string(),
        email: z.string(),
        bio: z.string(),
        avatar: z.object({ url: z.string(), alt: z.string() }),
        banner: z.object({ url: z.string(), alt: z.string() }),
      }).optional(),
    }).optional(),
    customer: z.object({
      name: z.string(),
      email: z.string(),
      bio: z.string(),
      avatar: z.object({ url: z.string(), alt: z.string() }),
      banner: z.object({ url: z.string(), alt: z.string() }),
    }).optional(),
  })).optional(),
  _count: z.object({ bookings: z.number()})
});

export type Venue = z.infer<typeof venueSchema>;

export const apiVenueSchema = z.object({
  data: z.array(venueSchema),
  meta: metaSchema,
});

export const apiSingleVenueSchema = z.object({
  data: venueSchema,
  meta: emptyMetaSchema,
});
