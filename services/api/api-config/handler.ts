import type { ApiConfig, ApiHandler } from "./types";
import { ApiError } from "./apiError";
import { BASE_URL } from "./endpoints";
import { logErrors } from "@/lib/utils/logErrors";

export function withApiHandler<TResult, TArgs extends unknown[] = []>({
  endpoint,
  schema,
  init,
  baseUrl = BASE_URL,
  label,
}: ApiConfig<TResult, TArgs>): ApiHandler<TResult, TArgs> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      const resolvedEndpoint =
        typeof endpoint === "function" ? endpoint(...args) : endpoint;
      const resolvedInit = typeof init === "function" ? init(...args) : init;

      const response = await fetch(
        `${baseUrl}${resolvedEndpoint}`,
        resolvedInit,
      );

      if (!response.ok) {
        const body = await response.text().catch(() => "");

        throw new ApiError(
          `Request failed (${response.status})`,
          response.status,
          body,
        );
      }

      if (response.status === 204) {
        return schema.parse(undefined);
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
      if (error instanceof ApiError) {
        throw error;
      }

      // debugging
      logErrors(`withApiHandler failed, ${label} :`, error);
      throw new ApiError("Internal server error", 500, error);
    }
  };
}
