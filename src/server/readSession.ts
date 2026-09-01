import { readSessionToken, verifySession } from "./session.server";
import type { SessionPayloadProps } from "./session.server";

export const readSession = (): SessionPayloadProps | null => {
  const token = readSessionToken();
  if (!token) return null;
  return verifySession(token);
}
