import { sortOptions } from "@/hooks/useSortVenuesForm";
import type { SortOption } from "@/hooks/useSortVenuesForm";
import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

interface SortBookingsFormProps {
  option: SortOption;
  onChange: (event: SelectChangeEvent) => void;
}

export const SortVenuesForm = ({ option, onChange }: SortBookingsFormProps) => {
  return (
    <Box sx={{ mt: 2, mb: 2, width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="SortVenuesLabel">Sort venues by</InputLabel>
        <Select
          labelId="SortVenuesLabel"
          id="SortVenues"
          value={option}
          label="Sort venues by"
          aria-label="Sort venues by"
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
  );
};
