import z from "zod";
import { mediaSchema } from "@/lib/zod/shared/mediaSchema";

export const profileBaseSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    bio: z.string().nullable(),
    avatar: mediaSchema,
    banner: mediaSchema,
  })
  .describe("profileBaseSchema");

export type ProfileBase = z.infer<typeof profileBaseSchema>;
