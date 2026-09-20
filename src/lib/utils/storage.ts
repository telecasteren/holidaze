// guard against SSR,
// so we dont try to access localStorage on the server
const isBrowser = typeof window !== "undefined";

/** Saves `value` as JSON in localStorage under `key`. Does nothing on the server. */
export const saveKey = <T = unknown>(key: string, value: T): void => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Reads and parses the JSON stored under `key`.
 *
 * @returns The parsed value, or `null` if missing or on the server.
 * @throws If the stored value isn't valid JSON.
 */
export const loadKey = <T = unknown>(key: string): T | null => {
  if (!isBrowser) return null;
  return JSON.parse(localStorage.getItem(key) || "null");
};

/** Clears ALL localStorage and redirects to `/`. Does nothing on the server. */
export const logoutFromStorage = () => {
  if (!isBrowser) return;
  localStorage.clear();
  window.location.href = "/";
};

/** Removes `key` from localStorage. Does nothing on the server. */
export const removeKey = (key: string) => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};
