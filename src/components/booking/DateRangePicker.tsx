import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

import { Box, Typography } from '@mui/material';

export function DateRangePicker() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h6" gutterBottom>
        Search venues by dates
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { sm: "column"}, gap: 2, flexWrap: 'wrap' }}>
        <DatePicker
          label="Check-in"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          disablePast
          maxDate={endDate || undefined}
        />
        <DatePicker
          label="Check-out"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          disablePast
          minDate={startDate || undefined}
        />
      </Box>
    </LocalizationProvider>
  );
}
