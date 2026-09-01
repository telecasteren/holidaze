import { readSession } from "@/server/readSession.server";

export function getAuthHeaders(hasBody = false): Record<string, string> {
  const session = readSession();
  const accessToken = session?.accessToken;
  const apiKey = session?.apiKey;

  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(apiKey ? { 'X-Noroff-API-Key': apiKey } : {}),
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
  };
}
