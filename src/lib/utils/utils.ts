import { parseDate } from "@internationalized/date";
import type { CalendarDate } from "@internationalized/date";

/** Trims whitespace and lowercases a string, for case-insensitive comparison. */
export const normalize = (s: string) => s.trim().toLowerCase();

/** Rounds a number to at most 2 decimals. */
const roundMaxDecimals = (value: number): number => {
  return +value.toFixed(2);
};

/**
 * Formats a number as Norwegian kroner (NOK), e.g. `1 234,5 kr`, with up to 2 decimals.
 *
 * @param value - Amount to format.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: "NOK",
    style: "currency",
  }).format(roundMaxDecimals(value));
};

/**
 * Formats an ISO date string as `dd.mm.yyyy` (Norwegian style), using UTC.
 *
 * @param value - ISO date string.
 */
export const formatDate = (value: string): string => {
  const iso = value;
  const date = new Date(iso);

  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  const formatted = `${dd}.${mm}.${yyyy}`;
  return formatted;
};

/**
 * Converts an ISO date string into a `CalendarDate` (keeps only the `yyyy-mm-dd` part).
 *
 * @param isoDate - ISO date or datetime string.
 */
export const formatCalendarDate = (isoDate: string): CalendarDate => {
  return parseDate(isoDate.slice(0, 10));
};
