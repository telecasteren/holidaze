import type { ZodType } from "zod";

/** An endpoint path, or a function that builds it from the call arguments. */
type EndpointResolver<TArgs extends unknown[]> =
  string | ((...args: TArgs) => string);

/** A `fetch` init object, or a function that builds it from the call arguments. */
type InitResolver<TArgs extends unknown[]> =
  RequestInit | ((...args: TArgs) => RequestInit);

/** Configuration for {@link withApiHandler}. */
export type ApiConfig<TResult, TArgs extends unknown[] = []> = {
  /** Path appended to `baseUrl`. */
  endpoint: EndpointResolver<TArgs>;
  /** Zod schema the response is validated against. */
  schema: ZodType<TResult>;
  /** Options for `fetch` (method, headers, body). */
  init?: InitResolver<TArgs>;
  /** Overrides the default API base URL. */
  baseUrl?: string;
  /** Name shown in error logs. */
  label?: string;
};

/** Async function returned by {@link withApiHandler}. */
export type ApiHandler<TResult, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResult>;

/** Standard API response envelope: `data` plus optional `meta`. */
export type ApiResponse<T> = {
  data: T;
  meta?: unknown;
};
