// guard against SSR,
// so we dont try to access localStorage on the server
const isBrowser = typeof window !== "undefined";

export const saveKey = <T = unknown>(key: string, value: T): void => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadKey = <T = unknown>(key: string): T | null => {
  if (!isBrowser) return null;
  return JSON.parse(localStorage.getItem(key) || "null");
};

export const logoutFromStorage = () => {
  if (!isBrowser) return;
  localStorage.clear();
  window.location.href = "/";
};

export const removeKey = (key: string) => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};
