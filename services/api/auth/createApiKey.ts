import { apiKeySchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { AUTH, CREATE_API_KEY } from "../api-config/endpoints";

export const createApiKey = withApiHandler({
  endpoint: `${AUTH}${CREATE_API_KEY}`,
  schema: apiKeySchema,
  init: (accessToken: string) => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({name: "Holidaze API key"}),
  }),
});
