import { setSessionCookie, signSession } from "./session";
import type { SessionPayloadProps } from "./session";

export const createSession = (payload: SessionPayloadProps): void => {
  setSessionCookie(signSession(payload));
}
