import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 45 characters."),
  email: z.email("Email must be a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  venueManager: z.boolean()
    .optional()});

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
