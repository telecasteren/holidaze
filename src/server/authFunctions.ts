import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";

import { loginProfile } from "@/services/api/auth/login";
import { registerNewProfile } from "@/services/api/auth/register";
import { createApiKey } from "@/services/api/auth/createApiKey";
import { createSession } from "./createSession";
import { clearSessionCookie } from "./session.server";
import { readSession } from "@/server/readSession.server";
import { withServerErrors } from "./serverErrors";

/** Converts a plain object of string fields into a `FormData`. */
const toFormData = (fields: Record<string, string>): FormData => {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  return form;
};

/**
 * Logs in, creates an API key with the access token, and stores everything in the session cookie.
 *
 * @returns The profile `name`.
 */
const establishSession = async (email: string, password: string) => {
  const result = await loginProfile(toFormData({ email, password }));
  const { accessToken, name } = result.data;
  const {
    data: { key: apiKey },
  } = await createApiKey(accessToken);

  createSession({ name, accessToken, apiKey });
  return { name };
};

/** Server function: logs in with `email` and `password` and starts a session. */
export const loginFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.email(), password: z.string().min(1) }))
  .handler(async ({ data }) => {
    return withServerErrors(() => establishSession(data.email, data.password));
  });

/** Server function: registers a new profile, then logs it in and starts a session. */
export const registerFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1),
      email: z.email(),
      password: z.string().min(1),
      venueManager: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) =>
    withServerErrors(async () => {
      await registerNewProfile(data);
      return establishSession(data.email, data.password);
    }),
  );

/** Server function: clears the session cookie. */
export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  clearSessionCookie();
  return { ok: true };
});

/** Server function: returns `{ name }` for the current session, or `null` if logged out. */
export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = readSession();
    if (!session) return null;
    return { name: session.name };
  },
);
