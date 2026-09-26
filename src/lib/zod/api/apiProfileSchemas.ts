import z from "zod";
import {
  profileSchema,
  updateProfileSchema,
} from "@/lib/zod/profile/profileSchema";
import { emptyMetaSchema } from "@/lib/zod/shared/metaSchema";

export const apiSingleProfileSchema = z
  .object({
    data: profileSchema,
    meta: emptyMetaSchema,
  })
  .describe("apiSingleProfileSchema");

export const apibaseProfileSchema = z
  .object({
    data: updateProfileSchema,
    meta: emptyMetaSchema,
  })
  .describe("apibaseProfileSchema");
