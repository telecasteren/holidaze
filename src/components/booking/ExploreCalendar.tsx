import { Box, styled, Typography } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { BookingForm } from "@/lib/zod/index";

const CalendarBox = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 20,
  ...theme.applyStyles("dark", {
    backgroundColor: "hsla(220, 35%, 3%, 0.4)",
    borderRadius: 8,
  }),
}));

interface ExploreCalendarProps {
  value: BookingForm["dateRange"];
  onChange: (value: BookingForm["dateRange"]) => void;
  dates?: string | null;
}

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
          minValue={today(getLocalTimeZone())}
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
