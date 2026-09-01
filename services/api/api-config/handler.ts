import type { ApiConfig, ApiHandler } from "./types";
import { ApiError } from "./apiError";
import { BASE_URL } from "./endpoints";

export function withApiHandler<TResult, TArgs extends unknown[] = []>({
  endpoint,
  schema,
  init,
  baseUrl = BASE_URL,
  label
}: ApiConfig<TResult, TArgs>): ApiHandler<TResult, TArgs> {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      const resolvedEndpoint =
        typeof endpoint === "function" ? endpoint(...args) : endpoint;
      const resolvedInit =
        typeof init === "function" ? init(...args) : init;
      console.log(`[${label ?? "unlabeled"}] →`, resolvedEndpoint); // debugging

      const response = await fetch(`${baseUrl}${resolvedEndpoint}`, resolvedInit);

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new ApiError(`Request to ${baseUrl}${resolvedEndpoint} failed: ${response.status}, ${body}`,
          response.status, body);
      }

      const payload: unknown = await response.json();
      const parsedPayload = schema.safeParse(payload);

      if (!parsedPayload.success) {
        console.log("parsedPayload: ", parsedPayload) // debugging
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

      console.log("withApiHandler failed: ", error) // debugging
      throw new ApiError("Internal server error", 500, error);
    }
  };
}
