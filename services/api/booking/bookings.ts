import { bookingSchema } from "@/lib/zod/bookingSchema";
import { withApiHandler } from "../api-config/handler";
import { API_URL } from "../api-config/endpoints";

export const getAllBookings = withApiHandler({
  endpoint: API_URL,
  schema: bookingSchema,
});

export const getBookingById = withApiHandler({
  endpoint: (id: string) => `${API_URL}/${id}`,
  schema: bookingSchema,
});

export const getBookingsByProfileId = withApiHandler({
  endpoint: (id: string) => `${API_URL}/${id}/bookings`,
  schema: bookingSchema,
});
