export const STORAGE_KEYS = {
  TOKEN: 'token',
  API_KEY: 'apiKey',
  USER_ID: 'profileId',
};

export const saveKey = <T = unknown>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadKey = <T = unknown>(key: string): T | null => {
  return JSON.parse(localStorage.getItem(key) || "null");
};

export const logoutFromStorage = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const removeKey = (key: string) => {
  localStorage.removeItem(key);
};
