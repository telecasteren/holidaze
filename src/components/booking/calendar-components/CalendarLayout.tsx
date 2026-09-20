import { styled } from "@mui/material";
import {
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  RangeCalendar as AriaRangeCalendar,
} from "react-aria-components";
import { CELL_SIZE } from "@/components/booking/calendar-components/CalendarCell";

/** Invisible border used to space out calendar rows. */
export const VERTICAL_ROW_SPACING = "4px solid transparent";

/** Root element of the range calendar (flex row). */
export const CalendarRoot = styled(AriaRangeCalendar)({
  display: "flex",
  alignItems: "flex-start",
});

/** One month panel: a column with padding, and smaller gaps on desktop. */
export const CalendarPanel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2.5, 3),
  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(1),
  },
}));

/** {@link CalendarPanel} with a left divider, for panels shown after the first. */
export const CalendarPanelDivided = styled(CalendarPanel)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(1.5),
  },
}));

/** Month/year title, absolutely positioned in the center of its parent. */
export const CalendarTitle = styled("h2")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.25,
  fontWeight: 600,
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    color: "white",
  }),
}));

/** Calendar grid, sized to its content. */
export const CalendarGrid = styled(AriaCalendarGrid)({
  width: "max-content",
});

/** Header cell for a weekday column. */
export const CalendarHeaderCell = styled(AriaCalendarHeaderCell)({
  padding: 0,
  borderBottom: VERTICAL_ROW_SPACING,
});

/** Weekday label, sized to match a calendar cell. */
export const WeekdayLabel = styled("div")(({ theme }) => ({
  display: "flex",
  width: CELL_SIZE,
  height: CELL_SIZE,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    color: "white",
  }),
}));

/** Calendar grid body: removes cell padding and spaces rows with {@link VERTICAL_ROW_SPACING}. */
export const CalendarGridBody = styled(AriaCalendarGridBody)({
  "& td": {
    padding: 0,
  },
  "& tr": {
    borderBottom: VERTICAL_ROW_SPACING,
  },
  "& tr:last-of-type": {
    border: "none",
  },
});
