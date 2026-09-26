import z from "zod";
import { emptyMetaSchema } from "@/lib/zod/shared/metaSchema";
import { mediaSchema } from "@/lib/zod/shared/mediaSchema";

export const loginAuthSchema = z
  .object({
    data: z.object({
      name: z.string(),
      email: z.string(),
      bio: z.string().nullable(),
      avatar: mediaSchema.optional(),
      banner: mediaSchema.optional(),
      accessToken: z.string(),
    }),
    meta: emptyMetaSchema,
  })
  .describe("loginAuthSchema");

export const signupAuthSchema = z
  .object({
    data: z.object({
      name: z.string(),
      email: z.string(),
      bio: z.string().nullable(),
      avatar: mediaSchema.optional(),
      banner: mediaSchema.optional(),
      venueManager: z.boolean().optional(),
    }),
    meta: emptyMetaSchema,
  })
  .describe("signupAuthSchema");
