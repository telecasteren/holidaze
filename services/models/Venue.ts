// import type { Booking } from "./Booking"
// import type { ApiMeta } from "@/lib/zod/metaSchema"
// import type { VenueMeta } from "@/lib/zod/venueSchema"

// export type ApiVenue = {
//   data: Venue[];
//   meta: ApiMeta;
// };

// export type Venue = {
//   id: string;
//   name: string;
//   description: string;
//   media: { url: string; alt: string }[];
//   price: number;
//   maxGuests: number;
//   rating: number;
//   created: string;
//   updated: string;
//   meta: VenueMeta;
//   location: {
//     address: string | null;
//     city: string | null;
//     zip: string | null;
//     country: string | null;
//     continent: string | null;
//     lat: number | null;
//     lng: number | null;
//   };
//   owner?: {
//     name: string;
//     email: string;
//     bio: string;
//     avatar: { url: string; alt: string };
//     banner: { url: string; alt: string };
//   } | null;
//   bookings?: Booking[] | null;
//   _count?: { bookings: number } | null;
// };
