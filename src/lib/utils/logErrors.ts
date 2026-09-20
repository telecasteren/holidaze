/**
 * Logs an error to the console as `[context] error`. Only logs in development.
 *
 * @param context - Where the error happened.
 * @param error - The error to log.
 */
export const logErrors = (context: string, error: unknown) => {
  if (import.meta.env.DEV) console.error(`[${context}]`, error);
};
