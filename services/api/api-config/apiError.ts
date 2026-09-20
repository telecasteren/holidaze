/** Error thrown for failed API calls. Carries the HTTP status and optional raw details. */
export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/** Prefix for ApiErrors flattened into a plain message (`API_ERROR|<status>|<message>`). */
export const ERROR_PREFIX = "API_ERROR";

/**
 * Extracts status and message from an error, whether it is a real {@link ApiError}
 * (SSR) or a plain Error with an `API_ERROR|<status>|<message>` message (client).
 *
 * @param error - Any caught value.
 * @returns `{ status, message }`, or `null` if it isn't an API error.
 */
export const getApiErrorInfo = (
  error: unknown,
): { status: number; message: string } | null => {
  // real ApiError on SSR
  if (error instanceof ApiError) {
    return { status: error.status, message: error.message };
  }

  // plain error message on client
  if (error instanceof Error && error.message.startsWith(`${ERROR_PREFIX}|`)) {
    const [, status, ...rest] = error.message.split("|");
    const errorCode = Number(status);
    if (Number.isInteger(errorCode)) {
      return { status: errorCode, message: rest.join("|") };
    }
  }

  return null;
};
