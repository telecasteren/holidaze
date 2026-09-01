import { Fragment } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/layout/icons";
import type { RangeCalendarProps as AriaRangeCalendarProps, DateValue } from "react-aria-components";
import {
    CalendarGridHeader as AriaCalendarGridHeader,
    RangeCalendarContext,
    useSlottedContext,
} from "react-aria-components";
import { RangeCalendarTitle } from "./calendar-components/RangeCalendarTitle";
import { RangeDateField } from "./calendar-components/RangeDateField";
import { PresetButton } from "./calendar-components/PresetButton";
import { RangeCalendarContextProvider } from "./calendar-components/RangeCalendarContextProvider";
import { NavButton } from "./calendar-components/NavButton";
import { CalendarCell } from "./calendar-components/CalendarCell";
import {
  CalendarRoot,
  CalendarPanel,
  CalendarPanelDivided,
  CalendarTitle,
  CalendarGrid,
  CalendarHeaderCell,
  WeekdayLabel,
  CalendarGridBody,
} from "./calendar-components/CalendarLayout";

interface RangeCalendarProps extends AriaRangeCalendarProps<DateValue> {
    /** The dates to highlight. */
    highlightedDates?: DateValue[];
    /** The date presets to display. */
    presets?: Record<string, { label: string; value: { start: DateValue; end: DateValue } }>
    /** Whether to show out of range dates. */
    showOutOfRangeDates?: boolean;
    /** Whether to show presets on desktop. */
  showPresetsOnDesktop?: boolean;
}

export const RangeCalendar = ({
    presets,
    visibleDuration,
    highlightedDates,
    showOutOfRangeDates = false,
    showPresetsOnDesktop = false,
    className,
    ...props
}: RangeCalendarProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)", { defaultMatches: true });
    const context = useSlottedContext(RangeCalendarContext);

    const ContextWrapper = context ? Fragment : RangeCalendarContextProvider;

  const visibleDurationMonths = visibleDuration?.months || (isDesktop ? 2 : 1);

  const isHighlighted = (date: DateValue) => highlightedDates?.some((highlightedDate) => date.compare(highlightedDate) === 0);

    const renderWeekdayHeader = (day: string) => (
        <CalendarHeaderCell>
            <WeekdayLabel>{day.slice(0, 2)}</WeekdayLabel>
        </CalendarHeaderCell>
    );

  return (

        <ContextWrapper>
            <CalendarRoot
                {...props}
                className={typeof className === "string" ? className : undefined}
                visibleDuration={{
                    months: visibleDurationMonths,
                }}
            >
                <CalendarPanel>
                    <Box
                        component="header"
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: visibleDurationMonths > 1 ? "flex-start" : "space-between",
                        }}
                    >
                        <NavButton slot="previous">
                          <ChevronLeftIcon />
                        </NavButton>

                        <CalendarTitle>
                            <RangeCalendarTitle part="start" />
                        </CalendarTitle>

                        {visibleDurationMonths === 1 && (
                          <NavButton slot="next">
                            <ChevronRightIcon />
                          </NavButton>
                        )}
                    </Box>

                    {!isDesktop && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                            <RangeDateField part="start" />
                            </Box>
                            <Box sx={{ fontSize: "1rem", color: "text.disabled" }}>–</Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <RangeDateField part="end" />
                            </Box>
                        </Box>
                    )}

                    {(showPresetsOnDesktop || !isDesktop) && presets && (
                        <Box sx={{ mt: 0.5, display: "flex", justifyContent: "space-between", gap: 1.5, px: 1 }}>
                            {Object.values(presets).map((preset) => (
                                <PresetButton key={preset.label} value={preset.value}>
                                    {preset.label}
                                </PresetButton>
                            ))}
                        </Box>
                    )}

                    <CalendarGrid weekdayStyle="short">
                        <AriaCalendarGridHeader>{renderWeekdayHeader}</AriaCalendarGridHeader>
                        <CalendarGridBody>{(date) => <CalendarCell date={date} showOutOfRangeDates={showOutOfRangeDates} />}</CalendarGridBody>
                    </CalendarGrid>
                </CalendarPanel>

                {visibleDurationMonths > 1 && (
                    <CalendarPanelDivided>
                        <Box component="header" sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <CalendarTitle>
                                <RangeCalendarTitle part="end" />
                            </CalendarTitle>

                            <NavButton slot="next">
                                <ChevronRightIcon />
                            </NavButton>
                        </Box>

                        <CalendarGrid weekdayStyle="short" offset={{ months: 1 }}>
                            <AriaCalendarGridHeader>{renderWeekdayHeader}</AriaCalendarGridHeader>
                            <CalendarGridBody>
                                {(date) => <CalendarCell date={date} isHighlighted={isHighlighted(date)} showOutOfRangeDates={showOutOfRangeDates} />}
                            </CalendarGridBody>
                        </CalendarGrid>
                    </CalendarPanelDivided>
                )}
        </CalendarRoot>
    </ContextWrapper>
    );
};
