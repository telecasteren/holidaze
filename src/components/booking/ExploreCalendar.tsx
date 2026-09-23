import { Box, styled, Typography } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { todayDate } from "@/lib/utils/dates";
import type { BookingForm } from "@/lib/zod/index";

const CalendarBox = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 20,
  ...theme.applyStyles("dark", {
    backgroundColor: "hsla(220, 35%, 3%, 0.4)",
    borderRadius: 8,
  }),
}));

/** Props for {@link ExploreCalendar}. */
interface ExploreCalendarProps {
  /** Currently selected date range, or `null`. */
  value: BookingForm["dateRange"];
  /** Called when the selected range changes. */
  onChange: (value: BookingForm["dateRange"]) => void;
  /** Text shown after "Selected:", e.g. the formatted date range. */
  dates?: string | null;
}

/**
 * Controlled date-range calendar for searching venues, with the selected dates shown below it.
 * Dates in the past can't be selected.
 */
export const ExploreCalendar = ({
  value,
  onChange,
  dates,
}: ExploreCalendarProps) => {
  return (
    <>
      <CalendarBox>
        <RangeCalendar
          value={value}
          onChange={onChange}
          minValue={todayDate()}
        />
      </CalendarBox>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          Selected: {dates}
        </Typography>
      </Box>
    </>
  );
};
