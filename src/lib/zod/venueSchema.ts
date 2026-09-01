import z from "zod";
import { metaSchema, emptyMetaSchema } from "./metaSchema";

export const venueMetaSchema = z.object({
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
});

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
  }).optional(),
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
      rating: z.number().optional(),
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
      }).optional(),
      owner: z.object({
        name: z.string(),
        email: z.string(),
        bio: z.string(),
        avatar: z.object({ url: z.string(), alt: z.string() }),
        banner: z.object({ url: z.string(), alt: z.string() }),
      }).optional(),
    }).optional(),
  })).optional(),
  _count: z.object({ bookings: z.number().optional()}).optional()
});

export const postVenueSchema = z.object({
    name: z.string(),
    description: z.string(),
    media: z.array(z.object({
      url: z.string(),
      alt: z.string(),
    })).optional(),
    price: z.number(),
    maxGuests: z.number().int(),
    rating: z.number().optional(),
    meta: venueMetaSchema,
    location: z.object({
      address: z.string().nullable(),
      city: z.string().nullable(),
      zip: z.string().nullable(),
      country: z.string().nullable(),
      continent: z.string().nullable(),
      lat: z.float64().nullable(),
      lng: z.float64().nullable(),
    }).optional(),
})

export const apiVenueSchema = z.object({
  data: z.array(venueSchema),
  meta: metaSchema,
});

export const apiSingleVenueSchema = z.object({
  data: venueSchema,
  meta: emptyMetaSchema,
});

export const apiVenueResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string().nullable(),
    description: z.string().nullable(),
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
      lat: z.float64().nullable(),
      lng: z.float64().nullable(),
    }),
  }),
  meta: emptyMetaSchema,
})

export type VenueMeta = z.infer<typeof venueMetaSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type VenuePayload = z.infer<typeof postVenueSchema>;
