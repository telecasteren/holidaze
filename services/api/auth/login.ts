import { loginAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "@/services/api/api-config/handler";
import { AUTH, LOGIN } from "@/services/api/api-config/endpoints";

/**
 * Logs in with a profile's credentials.
 *
 * @param data - Form data with `email` and `password`.
 * @returns The profile with its access token.
 */
export const loginProfile = withApiHandler({
  label: "loginProfile",
  endpoint: `${AUTH}${LOGIN}`,
  schema: loginAuthSchema,
  init: (data: FormData) => ({
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(Object.fromEntries(data)),
  }),
});
