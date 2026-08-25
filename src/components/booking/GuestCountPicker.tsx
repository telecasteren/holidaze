import { useState } from 'react';
import { Box, InputLabel, MenuItem, TextField } from '@mui/material';

export function GuestCountPicker() {
  const totalGuestsAllowed = 20;
  const [guests, setGuests] = useState(1);

  const handleGuestCount = (e: any) => {
    setGuests(e.target.value);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: "row", sm: "column" },
      justifyContent: "center",
      gap: 0.5,
      flexWrap: 'wrap',
      mt: 2
    }}>
      <InputLabel
        htmlFor="guest-count"
        aria-label="Number of guests"
        sx={{ fontWeight: "bold"}}>
        Number of guests
      </InputLabel>
      <TextField
        id="guest-count"
        aria-label="Select number of guests"
        select
        value={guests}
        onChange={handleGuestCount}
        sx={{ minWidth: 250 }}
      >
        {Array.from({ length: totalGuestsAllowed }, (_, i) => i + 1).map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
