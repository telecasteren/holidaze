import { setSessionCookie, signSession } from "./session.server";
import type { SessionPayloadProps } from "./session.server";

/**
 * Signs the session data and stores it in the session cookie.
 *
 * @param payload - Session data (name, access token, API key).
 */
export const createSession = (payload: SessionPayloadProps): void => {
  setSessionCookie(signSession(payload));
};
