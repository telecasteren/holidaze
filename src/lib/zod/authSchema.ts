import z from "zod";
import { emptyMetaSchema } from "./metaSchema";

export const loginAuthSchema = z.object({
  data: z.object({
    name: z.string(),
    email: z.string(),
    bio: z.string().nullable(),
    avatar: z.object({ url: z.string(), alt: z.string() }).optional(),
    banner: z.object({ url: z.string(), alt: z.string()}).optional(),
    accessToken: z.string(),
  }),
  meta: emptyMetaSchema
});

export const signupAuthSchema = z.object({
  data: z.object({
    name: z.string(),
    email: z.string(),
    bio: z.string().nullable(),
    avatar: z.object({ url: z.string(), alt: z.string() }).optional(),
    banner: z.object({ url: z.string(), alt: z.string()}).optional(),
  }),
  meta: emptyMetaSchema
});

export type LoginProfile = z.infer<typeof loginAuthSchema>;
export type SignupProfile = z.infer<typeof signupAuthSchema>;
