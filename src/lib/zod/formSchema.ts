import { z } from "zod";

export const formSchema = z.object({
  email: z.email("Email must be a valid email."),
  fullname: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 45 characters."),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(32, "Title must be at most 32 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(200, "Description must be at most 200 characters."),
});

export type formSchemaType = z.infer<typeof formSchema>;
