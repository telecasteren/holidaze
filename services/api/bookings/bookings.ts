import { bookingSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { getAuthHeaders } from "../api-config/headers";
import { API_URL, BOOKINGS } from "../api-config/endpoints";

export const getAllBookings = withApiHandler({
  endpoint: `${API_URL}${BOOKINGS}`,
  schema: bookingSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const getBookingById = withApiHandler({
  endpoint: (id: string) => `${API_URL}${BOOKINGS}/${id}`,
  schema: bookingSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const getBookingsByProfileId = withApiHandler({
  endpoint: (id: string) => `${API_URL}${BOOKINGS}/${id}/bookings`,
  schema: bookingSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});
