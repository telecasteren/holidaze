import { apiKeySchema } from "@/lib/zod/index";
import { withApiHandler } from "@/services/api/api-config/handler";
import { AUTH, CREATE_API_KEY } from "../api-config/endpoints";

/**
 * Creates an API key for the logged-in profile.
 *
 * @param accessToken - Access token from login.
 * @returns The API key (in `data.key`).
 */
export const createApiKey = withApiHandler({
  label: "createApiKey",
  endpoint: `${AUTH}${CREATE_API_KEY}`,
  schema: apiKeySchema,
  init: (accessToken: string) => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: "Holidaze API key" }),
  }),
});
