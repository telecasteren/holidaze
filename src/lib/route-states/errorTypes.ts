import { ApiError } from "../../../services/api/api-config/apiError";

type ErrorType = "network" | "missingPage" | "invalid" | "unknown";

const isNetworkError = (error: Error) => {
  if (error.name === "AbortError") return true;
  if (error instanceof TypeError) {
    return /fetch|network|load failed|internet/i.test(error.message);
  }
  return false;
};

export const classifyError = (error: Error): ErrorType => {
  if (isNetworkError(error)) return "network";
  if (error instanceof ApiError && error.status === 404)
    return "missingPage";
  if (error instanceof ApiError && error.status === 502) return "invalid";
  return "unknown";
};
