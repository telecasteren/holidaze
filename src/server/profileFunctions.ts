import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { getProfileById, updateProfileById } from "../../services/api/profiles/profiles";
import { baseProfileSchema } from "@/lib/zod/profileSchema";

export const getProfileFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return getProfileById(name);
  });

// POST to server > PUT to API from 'updateProfileById'
export const updateProfileFn = createServerFn({ method: "POST" })
  .validator(baseProfileSchema.extend({ name: z.string() }))
  .handler(async ({ data }) => {
    const { name, ...body } = data;
    return updateProfileById(name, body);
  });
