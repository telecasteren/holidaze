import type { ZodType } from "zod";

type EndpointResolver<TArgs extends unknown[]> =
  | string
  | ((...args: TArgs) => string);

export type ApiConfig<TResult, TArgs extends unknown[] = []> = {
  endpoint: EndpointResolver<TArgs>;
  schema: ZodType<TResult>;
  init?: RequestInit;
  baseUrl?: string;
};

export type ApiHandler<TResult, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResult>;
