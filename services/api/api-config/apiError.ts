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

export const ERROR_PREFIX = "API_ERROR";

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
