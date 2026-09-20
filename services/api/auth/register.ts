import { signupAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "@/services/api/api-config/handler";
import { AUTH, REGISTER } from "@/services/api/api-config/endpoints";

/** Data needed to register a profile. */
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
};

/**
 * Registers a new profile.
 *
 * @param data - Name, email, password, and optionally `venueManager`.
 */
export const registerNewProfile = withApiHandler({
  label: "registerNewProfile",
  endpoint: `${AUTH}${REGISTER}`,
  schema: signupAuthSchema,
  init: (data: RegisterPayload) => ({
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }),
});
