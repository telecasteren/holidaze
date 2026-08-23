import { signupAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { AUTH, REGISTER } from "../api-config/endpoints";

export const registerNewProfile = withApiHandler({
  endpoint: `${AUTH}${REGISTER}`,
  schema: signupAuthSchema,
  init: (data: FormData) => ({
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(Object.fromEntries(data)),
  }),
});
