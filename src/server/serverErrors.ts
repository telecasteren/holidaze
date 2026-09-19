import { ApiError, ERROR_PREFIX } from "@/services/api/api-config/apiError";

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
