import { apiVenueSchema, apiSingleVenueSchema, apiSingleProfileSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { API_URL,VENUES } from "../api-config/endpoints";

export const getAllVenues = withApiHandler({
  endpoint:  `${API_URL}${VENUES}`,
  schema: apiVenueSchema,
});

export const getVenueById = withApiHandler({
  endpoint: (id: string) => `${API_URL}${VENUES}/${id}`,
  schema: apiSingleVenueSchema,
});

export const getVenuesByProfile = withApiHandler({
  endpoint: (name: string) => `${API_URL}/${name}/venues`,
  schema: apiSingleProfileSchema,
});
