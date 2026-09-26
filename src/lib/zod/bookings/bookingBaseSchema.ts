import z from "zod";
import { profileBaseSchema } from "@/lib/zod/profile/profileBaseSchema";

export const bookingBaseSchema = z
  .object({
    id: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
    guests: z.number(),
    created: z.string(),
    updated: z.string(),
    customer: profileBaseSchema.optional(),
  })
  .describe("bookingBaseSchema");
