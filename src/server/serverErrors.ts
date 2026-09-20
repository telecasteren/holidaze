import { ApiError, ERROR_PREFIX } from "@/services/api/api-config/apiError";

/**
 * Runs `fn` and converts any {@link ApiError} into a plain Error with the message
 * `API_ERROR|<status>|<message>`, so the status survives the server-to-client hop.
 * Read it back with {@link getApiErrorInfo}. Other errors are rethrown unchanged.
 *
 * @param fn - Async work to run.
 * @returns The result of `fn`.
 */
export const withServerErrors = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ApiError) {
      throw new Error(`${ERROR_PREFIX}|${err.status}|${err.message}`);
    }
    throw err;
  }
};
