import { getApiErrorInfo } from "@/services/api/api-config/apiError";

type ErrorType =
  | "network"
  | "badRequest"
  | "expiredSession"
  | "invalidSession"
  | "missingPage"
  | "invalid"
  | "conflict"
  | "unknown";

const isNetworkError = (error: Error) => {
  if (error.name === "AbortError") return true;
  if (error instanceof TypeError) {
    return /fetch|network|load failed|internet/i.test(error.message);
  }
  return false;
};

export const classifyError = (error: unknown): ErrorType => {
  if (!(error instanceof Error)) return "unknown";
  const info = getApiErrorInfo(error);
  const status = info?.status;

  if (isNetworkError(error)) return "network";
  if (status === 400) return "badRequest";
  if (status === 401) return "expiredSession";
  if (status === 403) return "invalidSession";
  if (status === 404) return "missingPage";
  if (status === 409) return "conflict";
  if (status === 502) return "invalid";
  return "unknown";
};
