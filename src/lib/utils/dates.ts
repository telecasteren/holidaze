import {
  parseDate,
  parseAbsolute,
  today,
  getLocalTimeZone,
  DateFormatter,
} from "@internationalized/date";
import type { CalendarDate, DateValue } from "@internationalized/date";

const timeZone = getLocalTimeZone();
const nbFormatter = new DateFormatter("nb-NO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/**
 * Converts an ISO date string into a `CalendarDate` (keeps only the `yyyy-mm-dd` part).
 *
 * @param isoDate - ISO date or datetime string.
 */
export const formatCalendarDate = (isoDate: string): CalendarDate => {
  return parseDate(isoDate.slice(0, 10));
};

/** Today's date as a 'CalendarDate' */
export const todayDate = () => today(timeZone);

/** Formats a 'DateValue' or ISO string as 'dd.mm.yyyy', using local timezone */
export const formatDate = (value: string | DateValue) => {
  const date = typeof value === "string" ? formatCalendarDate(value) : value;
  return nbFormatter.format(date.toDate(timeZone));
};

/** Nights between two dates */
export const nightsBetween = (start: DateValue, end: DateValue) =>
  end.compare(start);

/** Converts a `DateValue` to an API-compatible ISO string */
export const toApiDate = (date: DateValue) => date.toString();

/** Checks if a date is in the past relative to today */
export const isPast = (iso: string) =>
  formatCalendarDate(iso).compare(todayDate()) < 0;

/** For full timestamps where time matters (createdAt) */
export const toFullTimestamp = (iso: string) => parseAbsolute(iso, "UTC");
