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

// POST to server > PUT to API from 'updateProfileById'
export const updateProfileFn = createServerFn({ method: "POST" })
  .validator(baseProfileSchema.extend({ name: z.string() }))
  .handler(async ({ data }) => {
    const { name, ...body } = data;
    return withServerErrors(() => updateProfileById(name, body));
  });
