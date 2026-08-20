import z from "zod";

export const customerSchema = z.object({
  name: z.string(),
  email: z.string(),
  bio: z.string(),
  avatar: z.object({ url: z.string(), alt: z.string() }),
  banner: z.object({ url: z.string(), alt: z.string() }),
});
