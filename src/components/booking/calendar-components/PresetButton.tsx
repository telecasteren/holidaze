import { useContext } from "react";
import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import type { CalendarDate, DateValue } from "@internationalized/date";
import { RangeCalendarStateContext } from "react-aria-components";

interface PresetButtonProps extends Omit<MuiButtonProps, "value" | "onClick"> {
    value: { start: DateValue; end: DateValue };
}

export const PresetButton = ({ value, children, ...props }: PresetButtonProps) => {
    const context = useContext(RangeCalendarStateContext);

    return (
        <MuiButton
            {...props}
            size="small"
            variant="text"
            onClick={() => {
                context?.setValue(value);
                context?.setFocusedDate(value.start as CalendarDate);
            }}
            sx={{ minWidth: 0, px: 1, textTransform: "none", fontWeight: 500 }}
        >
            {children}
        </MuiButton>
    );
};
