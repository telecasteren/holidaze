import { useSearchForm } from '../../hooks/useSearchForm';
import { visuallyHidden } from '@mui/utils';
import { InputLabel, TextField, Button, FormControl } from '@mui/material';

export function SearchForm() {
  const { inputQuery, showClearSearch, handleSubmit, handleOnChange, handleClearSearch } = useSearchForm();

  return (
    <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '50%', mx: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
      <InputLabel htmlFor="search-hero" sx={visuallyHidden}>
        Search
      </InputLabel>
      <TextField
        id="search-hero"
        hiddenLabel
        size="medium"
        variant="outlined"
        aria-label="Search for venues"
        placeholder="Your next venue"
        fullWidth
        value={inputQuery}
        onChange={handleOnChange}
        slotProps={{
          htmlInput: {
            autoComplete: 'off',
            'aria-label': 'Search for venues',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        fullWidth
        type={showClearSearch ? "button" : "submit"}
        onClick={showClearSearch ? handleClearSearch : undefined}
      >
        {showClearSearch ? "Clear" : "Search"}
      </Button>
    </FormControl>
  );
}
