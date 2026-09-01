import type { ZodType } from "zod";

type EndpointResolver<TArgs extends unknown[]> =
  | string
  | ((...args: TArgs) => string);

type InitResolver<TArgs extends unknown[]> =
  | RequestInit
  | ((...args: TArgs) => RequestInit);

export type ApiConfig<TResult, TArgs extends unknown[] = []> = {
  endpoint: EndpointResolver<TArgs>;
  schema: ZodType<TResult>;
  init?: InitResolver<TArgs>;
  baseUrl?: string;
  label?: string;
};

export type ApiHandler<TResult, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResult>;

export type ApiResponse<T> = {
  data: T;
  meta?: unknown;
};
