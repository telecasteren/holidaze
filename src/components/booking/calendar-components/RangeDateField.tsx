import { useContext } from "react";
import type { CalendarDate } from "@internationalized/date";
import { alpha, styled } from "@mui/material";
import type { DateValue } from "react-aria-components";
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  RangeCalendarStateContext,
} from "react-aria-components";

const DateInputRoot = styled(AriaDateInput)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  padding: theme.spacing(0.75, 1.25),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(["border-color", "box-shadow"], {
    duration: 100, easing: "linear"
  }),

  "&[data-focus-within]": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  "&[data-disabled]": {
    opacity: 0.5,
    cursor: "not-allowed",
  }
}))

const DateSegment = styled(AriaDateSegment)(({ theme }) => ({
  padding: theme.spacing(0, 0.25),
  borderRadius: 4,
  fontSize: "0.875rem",
  fontVariantNumeric: "tabular-nums",
  color: theme.palette.text.primary,
  caretColor: "transparent",
  outline: "none",

  "&[data-placeholder]": {
    textTransform: "uppercase",
    color: theme.palette.text.disabled,
  },
  "&[data-type='literal']": {
    color: theme.palette.text.disabled,
  },
  "&[data-focused]": {
    fontWeight: 500,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.disabled,
  }
}))


interface RangeDateFieldProps {
   /** which end of the range this field edits */
  part: "start" | "end";
  "aria-label"?: string;
}

export const RangeDateField = ({ part, "aria-label": ariaLabel }: RangeDateFieldProps) => {
  const state = useContext(RangeCalendarStateContext);

  if (!state) {
    throw new Error("<RangeDateField /> must be used within a <RangeCalendar /> compoment");
  }

  const value = (part === "start" ? state.value?.start : state.value?.end);

  const handleChange = (date: DateValue | null) => {
    if (!date) return;

    const current = state.value;

    if (part === "start") {
      const end = current?.end && current.end.compare(date) >= 0 ? current.end : date;
      state.setValue({ start: date, end })
    } else {
      const start = current?.start && current.start.compare(date) <= 0 ? current.start : date;
      state.setValue({ start, end: date })
    }

    state.setFocusedDate(date as CalendarDate);
  };

  return (
    <AriaDateField
      value={value}
      onChange={handleChange}
      granularity="day"
      aria-label={ariaLabel ?? (part === "start" ? "Start date" : "End date")}
    >
      <DateInputRoot>{(segment) => <DateSegment segment={segment} />}</DateInputRoot>
    </AriaDateField>
  );
};
