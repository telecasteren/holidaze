import { loadKey } from "@/lib/utils/storage";

export function getAuthHeaders(hasBody = false): Record<string, string> {
  const token = loadKey<string>("token");
  const apiKey =
    loadKey<string>("apiKey");

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(apiKey ? { 'X-Noroff-API-Key': apiKey } : {}),
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
  };
}
