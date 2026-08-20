import { loginAuthSchema } from "@/lib/zod/index";
import { withApiHandler } from "../api-config/handler";
import { getAuthHeaders } from "../api-config/headers";
import { API_URL, AUTH, LOGIN } from "../api-config/endpoints";

export const loginProfile = withApiHandler({
  endpoint: `${API_URL}${AUTH}${LOGIN}`,
  schema: loginAuthSchema,
  init: () => ({
    headers: getAuthHeaders(),
  }),
});
