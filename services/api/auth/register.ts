import { signupAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { getAuthHeaders } from "../api-config/headers";
import { API_URL, AUTH, REGISTER } from "../api-config/endpoints";

export const signUpNewProfile = withApiHandler({
  endpoint: `${API_URL}${AUTH}${REGISTER}`,
  schema: signupAuthSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});
