import { signupAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { AUTH, REGISTER } from "../api-config/endpoints";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
};

export const registerNewProfile = withApiHandler({
  endpoint: `${AUTH}${REGISTER}`,
  schema: signupAuthSchema,
  init: (data: RegisterPayload) => ({
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(data),
  }),
});
