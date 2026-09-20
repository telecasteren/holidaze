import { withApiHandler } from "@/services/api/api-config/handler";
import { getAuthHeaders } from "@/services/api/api-config/headers";
import {
  API_URL,
  BOOKINGS,
  BOOKINGS_PARAMS,
  PROFILES,
} from "@/services/api/api-config/endpoints";
import { apiSingleBookingSchema, apiAllBookingsSchema } from "@/lib/zod/index";
import type { BookingFormPayload } from "@/lib/zod/index";

/** Fetches all bookings (requires login). */
export const getAllBookings = withApiHandler({
  label: "getAllBookings",
  endpoint: `${API_URL}${BOOKINGS}`,
  schema: apiAllBookingsSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

/**
 * Fetches a profile's bookings, including venue and customer (requires login).
 *
 * @param name - Profile name.
 */
export const getBookingsByProfileId = withApiHandler({
  label: "getBookingsByProfileId",
  endpoint: (name: string) =>
    `${API_URL}${PROFILES}/${name}${BOOKINGS}${BOOKINGS_PARAMS}`,
  schema: apiAllBookingsSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

/**
 * Creates a booking (requires login).
 *
 * @param body - Venue ID, dates and guest count.
 */
export const postNewBooking = withApiHandler({
  label: "postNewBooking",
  endpoint: `${API_URL}${BOOKINGS}`,
  schema: apiSingleBookingSchema,
  init: (body: BookingFormPayload) => ({
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify(body),
  }),
});
