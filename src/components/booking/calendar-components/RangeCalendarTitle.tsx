import { useContext } from "react";
import { useDateFormatter } from "react-aria";
import { RangeCalendarStateContext } from "react-aria-components";

export const RangeCalendarTitle = ({ part }: { part: "start" | "end" }) => {
    const context = useContext(RangeCalendarStateContext);

    if (!context) {
        throw new Error("<RangeCalendarTitle /> must be used within a <RangeCalendar /> component.");
    }

    const formatter = useDateFormatter({
        month: "long",
        year: "numeric",
        calendar: context.visibleRange.start.calendar.identifier,
        timeZone: context.timeZone,
    });

    return part === "start"
        ? formatter.format(context.visibleRange.start.toDate(context.timeZone))
        : formatter.format(context.visibleRange.end.toDate(context.timeZone));
};
