import { useVenue } from "@/hooks/useVenue";
import { Box, InputLabel, MenuItem, TextField } from '@mui/material';

interface GuestCountPickerProps {
  venueId?: string;
  value: number;
  onChange: (value: number) => void;
}

export function GuestCountPicker({ venueId, value, onChange }: GuestCountPickerProps) {
  const { singleVenue } = useVenue(venueId);
  const totalGuestsAllowed = singleVenue?.maxGuests ?? 1;

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
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        sx={{ minWidth: 250 }}
      >
        {Array.from({ length: totalGuestsAllowed }, (_, i) => i + 1).map((amount) => (
          <MenuItem key={amount} value={amount}>
            {amount}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
