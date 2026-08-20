import z from "zod";

type DefaultSearchProps = {
  page: number;
  query: string;
};

export const defaultSearch: DefaultSearchProps = {
  page: 1,
  query: "",
};

export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  query: z.string().trim().default(""),
});
