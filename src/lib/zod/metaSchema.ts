import z from "zod";

export const metaSchema = z.object({
  currentPage: z.number().int(),
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  nextPage: z.number().int().nullable(),
  pageCount: z.number().int(),
  previousPage: z.number().int().nullable(),
  totalCount: z.number().int(),
});

export const emptyMetaSchema = z.object({});

export type ApiMeta = z.infer<typeof metaSchema>;
