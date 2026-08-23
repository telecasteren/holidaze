import { readSessionToken, verifySession } from "./session";
import type { SessionPayloadProps } from "./session";

export const readSession = (): SessionPayloadProps | null => {
  const token = readSessionToken();
  if (!token) return null;
  return verifySession(token);
}
