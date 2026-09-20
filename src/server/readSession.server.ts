import { readSessionToken, verifySession } from "./session.server";
import type { SessionPayloadProps } from "./session.server";

/**
 * Reads the current session from the request's cookie (server-side only).
 *
 * @returns The session data, or `null` if there is no cookie or it isn't valid.
 */
export const readSession = (): SessionPayloadProps | null => {
  const token = readSessionToken();
  if (!token) return null;
  return verifySession(token);
};
