import { readSession } from "@/server/readSession.server";

/**
 * Builds request headers from the current session (server-side only).
 * `Authorization` and `X-Noroff-API-Key` are only added when the session has them.
 *
 * @param hasBody - Set to `true` to add `Content-Type: application/json`.
 * @returns Headers object to pass into `fetch`.
 */
export function getAuthHeaders(hasBody = false): Record<string, string> {
  const session = readSession();
  const accessToken = session?.accessToken;
  const apiKey = session?.apiKey;

  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(apiKey ? { "X-Noroff-API-Key": apiKey } : {}),
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
  };
}
