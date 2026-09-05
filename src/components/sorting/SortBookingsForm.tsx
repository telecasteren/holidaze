import { sortOptions } from "@/hooks/useSortBookingsForm";
import type { SortOption } from "@/hooks/useSortBookingsForm";
import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

interface SortBookingsFormProps {
  option: SortOption;
  onChange: (event: SelectChangeEvent) => void;
}

export const SortBookingsForm = ({option, onChange}: SortBookingsFormProps) => {
  return (
    <Box>
    <FormControl fullWidth>
      <InputLabel id="SortBookings">Sort bookings by</InputLabel>
      <Select
        labelId="SortBookings"
        id="SortBookings"
        value={option}
        label="Sort bookings by"
        onChange={onChange}
      >
        {sortOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
    </Box>
  )
}
