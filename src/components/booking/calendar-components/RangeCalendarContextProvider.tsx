import { useState } from "react";
import type { PropsWithChildren } from "react";
import type { DateValue } from "@internationalized/date";
import { RangeCalendarContext } from "react-aria-components";

/**
 * Holds a selected date range and focused date in state and shares them through
 * react-aria's `RangeCalendarContext`, so range calendars inside it share the same selection.
 */
export const RangeCalendarContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [value, onChange] = useState<{
    start: DateValue;
    end: DateValue;
  } | null>(null);
  const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

  return (
    <RangeCalendarContext.Provider
      value={{ value, onChange, focusedValue, onFocusChange }}
    >
      {children}
    </RangeCalendarContext.Provider>
  );
};
