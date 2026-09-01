import { withApiHandler } from "../api-config/handler";
import { getAuthHeaders } from "../api-config/headers";
import { API_URL, BOOKINGS, BOOKINGS_WITH_VENUES, PROFILES } from "../api-config/endpoints";
import { apiSingleBookingSchema, apiAllBookingsSchema } from "@/lib/zod/index";
import type { BookingFormPayload } from "@/lib/zod/index";

export const getAllBookings = withApiHandler({
  label: "getAllBookings",
  endpoint: `${API_URL}${BOOKINGS}`,
  schema: apiAllBookingsSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const getBookingById = withApiHandler({
  label: "getBookingById",
  endpoint: (id: string) => `${API_URL}${BOOKINGS}/${id}`,
  schema: apiSingleBookingSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const getBookingsByProfileId = withApiHandler({
  label: "getBookingsByProfileId",
  endpoint: (name: string) => `${API_URL}${PROFILES}/${name}${BOOKINGS_WITH_VENUES}`,
  schema: apiAllBookingsSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

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
