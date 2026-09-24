import { z } from "zod";
import { apiAllBookingsSchema } from "@/lib/zod";
import { withApiHandler } from "@/services/api/api-config/handler";
import { loginProfile } from "@/services/api/auth/login";
import { createApiKey } from "@/services/api/auth/createApiKey";
import {
  API_URL,
  BOOKINGS,
  BOOKINGS_PARAMS,
  PROFILES,
} from "@/services/api/api-config/endpoints";

type AuthHeaders = Record<string, string>;

/** Test setup/cleanup helpers
 *
 * Logs into API and returns headers */
export async function getTestAuthHeaders(
  email: string,
  password: string,
): Promise<AuthHeaders> {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);

  const {
    data: { accessToken },
  } = await loginProfile(form);
  const {
    data: { key },
  } = await createApiKey(accessToken);

  return { Authorization: `Bearer ${accessToken}`, "X-Noroff-API-Key": key };
}

const getProfileBookings = withApiHandler({
  label: "e2e:getProfileBookings",
  endpoint: (name: string, _headers: AuthHeaders) =>
    `${API_URL}${PROFILES}/${name}${BOOKINGS}${BOOKINGS_PARAMS}`,
  schema: apiAllBookingsSchema,
  init: (_name: string, headers: AuthHeaders) => ({ headers }),
});

const deleteBookingById = withApiHandler({
  label: "e2e:deleteBookings",
  endpoint: (id: string, _headers: AuthHeaders) =>
    `${API_URL}${BOOKINGS}/${id}`,
  schema: z.void(),
  init: (_id: string, headers: AuthHeaders) => ({ method: "DELETE", headers }),
});

export const getBookingsIds = async (name: string, headers: AuthHeaders) =>
  (await getProfileBookings(name, headers)).data.map((b) => b.id);

export const deleteBookings = async (allIds: string[], headers: AuthHeaders) =>
  Promise.all(allIds.map((id) => deleteBookingById(id, headers)));
