import { apiSingleProfileSchema, apibaseProfileSchema } from "@/lib/zod/index";
import type { ProfilePayload } from "@/lib/zod/index";
import { withApiHandler } from "@/services/api/api-config/handler";
import { getAuthHeaders } from "@/services/api/api-config/headers";
import {
  API_URL,
  PROFILES,
  PROFILE_PARAMS,
} from "@/services/api/api-config/endpoints";

// Global: API does not support id lookup, so we use name as the identifier

/**
 * Fetches a profile with its bookings and venues (requires login).
 *
 * @param name - Profile name.
 */
export const getProfileById = withApiHandler({
  label: "getProfileById",
  endpoint: (name: string) => `${API_URL}${PROFILES}/${name}${PROFILE_PARAMS}`,
  schema: apiSingleProfileSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});

/**
 * Updates a profile with a PUT (requires login).
 *
 * @param name - Profile name.
 * @param body - Fields to update.
 */
export const updateProfileById = withApiHandler({
  label: "updateProfileById",
  endpoint: (name: string, _body: ProfilePayload) =>
    `${API_URL}${PROFILES}/${name}`,
  schema: apibaseProfileSchema,
  init: (_name: string, body: ProfilePayload) => ({
    method: "PUT",
    headers: getAuthHeaders(true),
    body: JSON.stringify(body),
  }),
});
