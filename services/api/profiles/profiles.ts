import { apiSingleProfileSchema, apibaseProfileSchema } from "@/lib/zod/index";
import type { ProfilePayload } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { getAuthHeaders } from "../api-config/headers";
import { API_URL, PROFILES, PROFILE_PARAMS } from "../api-config/endpoints";

 // Global: API does not support id lookup, so we use name as the identifier

export const getProfileById = withApiHandler({
  label: "getProfileById",
  endpoint: (name: string) => `${API_URL}${PROFILES}/${name}${PROFILE_PARAMS}`,
  schema: apiSingleProfileSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

export const updateProfileById = withApiHandler({
  label: "updateProfileById",
  endpoint: (name: string, _body: ProfilePayload) => `${API_URL}${PROFILES}/${name}`,
  schema: apibaseProfileSchema,
  init: (_name: string, body: ProfilePayload) => ({
    method: "PUT",
    headers: getAuthHeaders(true),
    body: JSON.stringify(body),
  }),
});
