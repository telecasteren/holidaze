import { apiProfileSchema, profileByIdSchema } from "@/lib/zod/profileSchema";
import { withApiHandler } from "../api-config/handler";
import { API_URL } from "../api-config/endpoints";

export const getAllProfiles = withApiHandler({
  endpoint: API_URL,
  schema: apiProfileSchema,
});

 // API does not support id lookup, so we use name as the identifier
export const getProfileById = withApiHandler({
  endpoint: (name: string) => `${API_URL}/${name}`,
  schema: profileByIdSchema,
});

export const getProfileBookings = withApiHandler({
  endpoint: (name: string) => `${API_URL}/${name}/bookings`,
  schema: apiProfileSchema,
});

export const getProfileVenues = withApiHandler({
  endpoint: (name: string) => `${API_URL}/${name}/venues`,
  schema: apiProfileSchema,
});
