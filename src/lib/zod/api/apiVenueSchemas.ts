import z from "zod";
import { emptyMetaSchema, metaSchema } from "@/lib/zod/shared/metaSchema";
import { venueSchema } from "@/lib/zod/venues/venueSchema";

export const apiVenueSchema = z
  .object({
    data: z.array(venueSchema),
    meta: metaSchema,
  })
  .describe("apiVenueSchema");

export const apiSingleVenueSchema = z
  .object({
    data: venueSchema,
    meta: emptyMetaSchema,
  })
  .describe("apiSingleVenueSchema");
