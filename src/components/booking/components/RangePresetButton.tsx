import { RangeCalendarContext, useSlottedContext } from "react-aria-components";
import { PresetButtonRoot } from "../RangeCalendar";
import type { DateValue } from "@internationalized/date";

interface RangePresetButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: { start: DateValue; end: DateValue };
}

export const RangePresetButton = ({ value, children, ...props }: RangePresetButtonProps) => {
    const context = useSlottedContext(RangeCalendarContext);

    const isSelected = context?.value?.start?.compare(value.start) === 0 && context.value.end?.compare(value.end) === 0;

    return (
        <PresetButtonRoot {...props} type="button" isSelected={isSelected}>
            {children}
        </PresetButtonRoot>
    );
};
