import { toast } from "react-hot-toast";
import { Stack, Box, Typography, Button } from "@mui/material";
import { RangeCalendar } from "@/components/booking/RangeCalendar";
import { GuestCountPicker } from "@/components/booking/index"

interface CalendarDisplayProps {
  venueId?: string;
}

export const CalendarDisplay = ({ venueId }: CalendarDisplayProps) => {
  return (
    <Stack sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", justifyItems: "center", width: "100%" }}>
      <RangeCalendar />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Booking information</Typography>
        <Typography variant="body1">here is info on price and dates for {venueId} </Typography>

        <GuestCountPicker venueId={venueId} />

        <Button
          variant="contained"
          onClick={() => toast.success("Booking successful!")}
        >
        BOOK THIS VENUE
        </Button>
      </Box>
    </Stack>
  );
};
