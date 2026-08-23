import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";

import { loginProfile } from "../../services/api/auth/login";
import { registerNewProfile } from "../../services/api/auth/register";
import { createApiKey } from "../../services/api/auth/createApiKey";
import { createSession } from "./createSession";
import { clearSessionCookie } from "./session";
import { readSession } from "@/server/readSession";

const toFormData = (fields: Record<string, string>): FormData => {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  return form;
}

const establishSession = async (email: string, password: string) => {
  const result = await loginProfile(toFormData({ email, password }));
  const { accessToken, name } = result.data;
  const { data: { key: apiKey } } = await createApiKey(accessToken);

  createSession({ name, accessToken, apiKey });
  return { name }
}

export const loginFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.email(), password: z.string().min(1) }))
  .handler(async ({ data }) => {
    return establishSession(data.email, data.password);
  })

export const registerFn = createServerFn({ method: "POST" })
  .validator(z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(1)
  }))
  .handler(async ({ data }) => {
    await registerNewProfile(toFormData(data));
    return establishSession(data.email, data.password);
  })

export const logoutFn = createServerFn({ method: "POST" })
  .handler(async () => {
    clearSessionCookie();
    return { ok: true };
  })

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = readSession();
  if(!session) return null;
  return { name: session.name };
});
