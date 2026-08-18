import { apiVenueSchema, venueByIdSchema } from "@/lib/zod/venueSchema";
import { withApiHandler } from "../api-config/handler";
import { API_URL } from "../api-config/endpoints";

export const getAllVenues = withApiHandler({
  endpoint:  API_URL,
  schema: apiVenueSchema,
});

export const getVenueById = withApiHandler({
  endpoint: (id: string) => `${API_URL}/${id}`,
  schema: venueByIdSchema,
});
