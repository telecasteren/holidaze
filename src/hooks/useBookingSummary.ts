import { formatDate, nightsBetween } from "@/lib/utils/dates";
import type { BookingForm } from "@/lib/zod/index";

/**
 * Summarises a selected date range.
 *
 * @param dateRange - Selected start and end dates, or `null`.
 * @returns `dates` as a local-formatted "start - end" string (`null` if no range)
 * and `nights` as the number of nights between them (`0` if no range).
 */
export const useBookingSummary = (dateRange: BookingForm["dateRange"]) => {
  if (!dateRange) return { dates: null, nights: 0 };

  const { start, end } = dateRange;
  const dates = `${formatDate(start)} - ${formatDate(end)}`;
  const nights = nightsBetween(start, end);

  return { dates, nights };
};
