import { apiProfileSchema, apiSingleProfileSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { getAuthHeaders } from "../api-config/headers";
import { API_URL, PROFILES } from "../api-config/endpoints";

export const getAllProfiles = withApiHandler({
  endpoint: `${API_URL}${PROFILES}`,
  schema: apiProfileSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

 // API does not support id lookup, so we use name as the identifier
export const getProfileById = withApiHandler({
  endpoint: (name: string) => `${API_URL}${PROFILES}/${name}`,
  schema: apiSingleProfileSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});
