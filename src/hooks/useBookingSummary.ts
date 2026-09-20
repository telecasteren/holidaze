import { getLocalTimeZone } from "@internationalized/date";
import type { BookingForm } from "@/lib/zod/index";

/**
 * Summarises a selected date range.
 *
 * @param dateRange - Selected start and end dates, or `null`.
 * @returns `dates` as a local-formatted "start - end" string (`null` if no range)
 * and `nights` as the number of nights between them (`0` if no range).
 */
export const useBookingSummary = (dateRange: BookingForm["dateRange"]) => {
  const startDate = dateRange?.start.toDate(getLocalTimeZone());
  const endDate = dateRange?.end.toDate(getLocalTimeZone());
  const dates =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : null;
  const nights =
    startDate && endDate
      ? (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      : 0;
  return { dates, nights };
};
