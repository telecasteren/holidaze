import type { Booking } from "./Booking"

export type ApiVenue = {
  data: Venue[];
  meta: VenueMeta;
};

export type VenueMeta = {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number | null;
  pageCount: number;
  previousPage: number | null;
  totalCount: number;
};

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
  owner?: {
    name: string;
    email: string;
    bio: string;
    avatar: { url: string; alt: string };
    banner: { url: string; alt: string };
  };
  bookings?: Booking[];
};
