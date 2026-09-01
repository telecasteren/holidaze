import { setSessionCookie, signSession } from "./session.server";
import type { SessionPayloadProps } from "./session.server";

export const createSession = (payload: SessionPayloadProps): void => {
  setSessionCookie(signSession(payload));
}
