import { z } from "zod";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ApiError } from "@/services/api/api-config/apiError";
import {
  getProfileById,
  updateProfileById,
} from "@/services/api/profiles/profiles";
import { baseProfileSchema } from "@/lib/zod/profileSchema";
import { withServerErrors } from "@/server/serverErrors";

/** Server function: gets a profile by name. Throws `notFound()` if the API returns 404. */
export const getProfileFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) =>
    withServerErrors(async () => {
      try {
        return await getProfileById(name);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) throw notFound();
        throw err;
      }
    }),
  );

/**
 * Server function: updates a profile. The input must include the profile `name`.
 * Receives a POST here and sends a PUT to the API (via `updateProfileById`).
 */
export const updateProfileFn = createServerFn({ method: "POST" })
  .validator(baseProfileSchema.extend({ name: z.string() }))
  .handler(async ({ data }) => {
    const { name, ...body } = data;
    return withServerErrors(() => updateProfileById(name, body));
  });
