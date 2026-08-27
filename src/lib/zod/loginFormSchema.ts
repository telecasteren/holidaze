import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Email must be a valid email.").includes("@stud.noroff.no"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
