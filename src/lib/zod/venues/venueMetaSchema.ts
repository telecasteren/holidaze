import z from "zod";

export const venueMetaSchema = z
  .object({
    wifi: z.boolean(),
    parking: z.boolean(),
    breakfast: z.boolean(),
    pets: z.boolean(),
  })
  .describe("venueMetaSchema");

export type VenueMeta = z.infer<typeof venueMetaSchema>;
