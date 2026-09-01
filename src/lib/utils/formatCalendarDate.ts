import { parseDate } from "@internationalized/date";
import type { CalendarDate } from "@internationalized/date";

export const formatCalendarDate = (isoDate: string): CalendarDate => {
  return parseDate(isoDate.slice(0, 10));
}
