import z from "zod";

export const customerSchema = z.object({
  name: z.string(),
  email: z.string(),
});
