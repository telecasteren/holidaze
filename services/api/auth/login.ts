import { loginAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { AUTH, LOGIN } from "../api-config/endpoints";

export const loginProfile = withApiHandler({
  label: "loginProfile",
  endpoint: `${AUTH}${LOGIN}`,
  schema: loginAuthSchema,
  init: (data: FormData) => ({
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(Object.fromEntries(data)),
  }),
});
