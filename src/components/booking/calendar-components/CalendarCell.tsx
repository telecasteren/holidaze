import { getDayOfWeek, getLocalTimeZone, isToday } from "@internationalized/date";
import { alpha, styled } from "@mui/material";
import type { CalendarCellProps as AriaCalendarCellProps } from "react-aria-components";
import { CalendarCell as AriaCalendarCell, RangeCalendarContext, useLocale, useSlottedContext } from "react-aria-components";

/** Size of a single day cell. The weekday header cells must match it. */
export const CELL_SIZE = 40;

/** Classes used to target the parts of a cell from the styled root. */
const CONTENT_CLASS = "HolidazeCalendarCell-content";
const DOT_CLASS = "HolidazeCalendarCell-dot";

interface CellRootProps {
    /** Whether the cell belongs to a range calendar. */
    isRangeCalendar: boolean;
    /** Whether the cell is today. */
    isTodayDate: boolean;
    /** Round the left edge because the day starts a week. */
    isWeekStart: boolean;
    /** Round the right edge because the day ends a week. */
    isWeekEnd: boolean;
    /** The cell falls inside the selected range, even if it is disabled and therefore never marked as selected. */
    isInRange: boolean;
    /** Bleed the range band past the end of the month. */
    hasTrailingBand: boolean;
    /** Bleed the range band past the start of the month. */
    hasLeadingBand: boolean;
    /** Hide days that belong to a neighbouring month. */
    hideOutsideMonth: boolean;
}

const rootProps = new Set<PropertyKey>([
    "isRangeCalendar",
    "isTodayDate",
    "isWeekStart",
    "isWeekEnd",
    "isInRange",
    "hasTrailingBand",
    "hasLeadingBand",
    "hideOutsideMonth",
]);

const CellRoot = styled(AriaCalendarCell, {
    shouldForwardProp: (prop) => !rootProps.has(prop),
})<CellRootProps>(({ theme, isRangeCalendar, isTodayDate, isWeekStart, isWeekEnd, isInRange, hasTrailingBand, hasLeadingBand, hideOutsideMonth }) => {
    /** Soft background for the days between the range endpoints. */
    const bandColor = alpha(theme.palette.primary.main, 0.14);

    // In a range calendar only the endpoints are filled; every other selected day shows
    // the band. In a single calendar the selected day itself is filled.
    const solidStates = isRangeCalendar ? ["[data-selection-start]", "[data-selection-end]"] : ["[data-selected]:not([data-disabled])"];
    const solidSelector = (child: string, extra = "") => solidStates.map((state) => `&${extra}${state} .${child}`).join(", ");

    return {
        position: "relative",
        display: "block",
        width: CELL_SIZE,
        height: CELL_SIZE,
        outline: "none",
        cursor: "pointer",
        zIndex: 0,
        borderTopLeftRadius: isWeekStart ? "50%" : 0,
        borderBottomLeftRadius: isWeekStart ? "50%" : 0,
        borderTopRightRadius: isWeekEnd ? "50%" : 0,
        borderBottomRightRadius: isWeekEnd ? "50%" : 0,
        backgroundColor: isRangeCalendar && isInRange ? bandColor : "transparent",

        "&[data-disabled]": {
            pointerEvents: "none",
        },
        "&[data-outside-month]": {
            opacity: 0.5,
            ...(hideOutsideMonth && { display: "none" }),
        },
        "&[data-focus-visible]": {
            zIndex: 1,
        },

        // The range band. The endpoints get a circular edge, the days in between stay
        // square so the band reads as one continuous strip.
        ...(isRangeCalendar && {
            "&[data-selected]": {
                backgroundColor: bandColor,
            },
            "&[data-selection-start]": {
                borderTopLeftRadius: "50%",
                borderBottomLeftRadius: "50%",
            },
            "&[data-selection-end]": {
                borderTopRightRadius: "50%",
                borderBottomRightRadius: "50%",
            },
        }),

        // Continue the band past the month boundary so a range spanning two months does
        // not appear to stop abruptly. Hidden at the edges of a week row.
        ...((hasTrailingBand || hasLeadingBand) && {
            "&[data-selected]::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                transform: hasTrailingBand ? "translateX(100%)" : "translateX(-100%)",
                backgroundImage: `linear-gradient(to ${hasTrailingBand ? "left" : "right"}, transparent, ${bandColor})`,
            },
            [`[role="gridcell"]:${hasTrailingBand ? "last-of-type" : "first-of-type"} &[data-selected]::after`]: {
                display: "none",
            },
        }),

        [`& .${CONTENT_CLASS}`]: {
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            fontSize: "0.875rem",
            lineHeight: 1,
            fontWeight: 400,
            color: theme.palette.text.secondary,
            backgroundColor: isTodayDate ? theme.palette.action.selected : "transparent",
            transition: theme.transitions.create(["background-color", "color"], {
                duration: 100,
                easing: "linear",
            }),
        },

        ...(isRangeCalendar && {
            [`&[data-selected] .${CONTENT_CLASS}`]: {
                fontWeight: 500,
                backgroundColor: "transparent",
            },
        }),

        // Hover on any day that is not a filled endpoint.
        [`&[data-hovered]:not([data-selection-start]):not([data-selection-end]) .${CONTENT_CLASS}`]: {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.primary,
            fontWeight: 500,
        },

        // Selected day(s), rendered as a filled circle.
        [solidSelector(CONTENT_CLASS)]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 600,
        },
        [solidSelector(CONTENT_CLASS, "[data-hovered]")]: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
        },

        [`&[data-disabled] .${CONTENT_CLASS}`]: {
            color: alpha(theme.palette.text.secondary, 0.5),
            backgroundColor: "transparent",
            fontWeight: 400,
        },

        // Keyboard focus ring.
        [`&[data-focus-visible] .${CONTENT_CLASS}`]: {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
        },

        [`& .${DOT_CLASS}`]: {
            position: "absolute",
            bottom: 4,
            left: "50%",
            width: 5,
            height: 5,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary.main,
        },
        [solidSelector(DOT_CLASS)]: {
            backgroundColor: theme.palette.primary.contrastText,
        },
        [`&[data-disabled] .${DOT_CLASS}`]: {
            opacity: 0.5,
        },
    };
});

interface CalendarCellProps extends AriaCalendarCellProps {
    isHighlighted?: boolean;
    showOutOfRangeDates?: boolean;
}

export const CalendarCell = ({ date, isHighlighted, showOutOfRangeDates = false, ...props }: CalendarCellProps) => {
    const { locale } = useLocale();
    const dayOfWeek = getDayOfWeek(date, locale);
    const rangeCalendarContext = useSlottedContext(RangeCalendarContext);

    const isRangeCalendar = !!rangeCalendarContext;

    const start = rangeCalendarContext?.value?.start;
    const end = rangeCalendarContext?.value?.end;

    const isAfterStart = start ? date.compare(start) > 0 : true;
    const isBeforeEnd = end ? date.compare(end) < 0 : true;

    const isAfterOrOnStart = !!start && date.compare(start) >= 0;
    const isBeforeOrOnEnd = !!end && date.compare(end) <= 0;
    const isInRange = isAfterOrOnStart && isBeforeOrOnEnd;

    const lastDayOfMonth = new Date(date.year, date.month, 0).getDate();
    const isLastDayOfMonth = date.day === lastDayOfMonth;
    const isFirstDayOfMonth = date.day === 1;

    const isTodayDate = isToday(date, getLocalTimeZone());

    return (
        <CellRoot
            {...props}
            date={date}
            isRangeCalendar={isRangeCalendar}
            isTodayDate={isTodayDate}
            isWeekStart={dayOfWeek === 0}
            isWeekEnd={dayOfWeek === 6}
            isInRange={isInRange}
            hasTrailingBand={isRangeCalendar && isLastDayOfMonth && isBeforeEnd}
            hasLeadingBand={isRangeCalendar && isFirstDayOfMonth && isAfterStart}
            hideOutsideMonth={isRangeCalendar && !showOutOfRangeDates}
        >
            {({ formattedDate }) => (
                <span className={CONTENT_CLASS}>
                    {formattedDate}
                    {(isHighlighted || isTodayDate) && <span className={DOT_CLASS} />}
                </span>
            )}
        </CellRoot>
    );
};
