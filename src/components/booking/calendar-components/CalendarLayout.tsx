import { styled } from "@mui/material";
import {
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    RangeCalendar as AriaRangeCalendar,
} from "react-aria-components";
import { CELL_SIZE } from "#/components/booking/calendar-components/CalendarCell";

export const VERTICAL_ROW_SPACING = "4px solid transparent";

export const CalendarRoot = styled(AriaRangeCalendar)({
    display: "flex",
    alignItems: "flex-start",
});

export const CalendarPanel = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    padding: theme.spacing(2.5, 3),
    [theme.breakpoints.up("md")]: {
        gap: theme.spacing(1),
    },
}));

export const CalendarPanelDivided = styled(CalendarPanel)(({ theme }) => ({
    borderLeft: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up("md")]: {
        gap: theme.spacing(1.5),
    },
}));

export const CalendarTitle = styled("h2")(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: 1.25,
    fontWeight: 600,
    color: theme.palette.text.secondary,
}));

export const CalendarGrid = styled(AriaCalendarGrid)({
    width: "max-content",
});

export const CalendarHeaderCell = styled(AriaCalendarHeaderCell)({
    padding: 0,
    borderBottom: VERTICAL_ROW_SPACING,
});

export const WeekdayLabel = styled("div")(({ theme }) => ({
    display: "flex",
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.palette.text.secondary,
}));

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
