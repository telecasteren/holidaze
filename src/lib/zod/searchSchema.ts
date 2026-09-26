import z from "zod";

type DefaultSearchProps = {
  page: number;
  query: string;
  guests: number;
  dateFrom: string;
  dateTo: string;
};

export const defaultSearch: DefaultSearchProps = {
  page: 1,
  query: "",
  guests: 1,
  dateFrom: "",
  dateTo: "",
};

export const searchSchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    query: z.string().trim().default(""),
    guests: z.coerce.number().int().min(1).default(1),
    dateFrom: z.string().default(""),
    dateTo: z.string().default(""),
  })
  .describe("searchSchema");
