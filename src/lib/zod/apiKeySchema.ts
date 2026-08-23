import { z } from "zod";

export const apiKeySchema = z.object({
  data: z.object({
    name: z.string(),
    key: z.string(),
  }),
})
