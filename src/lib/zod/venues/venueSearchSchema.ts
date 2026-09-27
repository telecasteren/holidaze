import z from "zod";

export const venueSearchSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  guests: z.coerce.number().int().min(1).optional(),
});
