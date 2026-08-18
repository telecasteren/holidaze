import type { ApiConfig, ApiHandler } from "./types";
import { ApiError } from "./apiError";
import { BASE_URL } from "./endpoints";

export function withApiHandler<TResult, TArgs extends unknown[] = []>({
  endpoint,
  schema,
  init,
  baseUrl = BASE_URL,
}: ApiConfig<TResult, TArgs>): ApiHandler<TResult, TArgs> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      const result =
        typeof endpoint === "function" ? endpoint(...args) : endpoint;

      const response = await fetch(`${baseUrl}${result}`, init);

      if (!response.ok) {
        throw new ApiError("Invalid response", response.status);
      }

      const payload: unknown = await response.json();
      const parsedPayload = schema.safeParse(payload);

      if (!parsedPayload.success) {
        throw new ApiError(
          "Payload failed schema validation",
          500,
          parsedPayload.error,
        );
      }

      return parsedPayload.data;
    } catch (error) {
      console.error("API error:", error); // for debugging

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError("Internal server error", 500, error);
    }
  };
}
