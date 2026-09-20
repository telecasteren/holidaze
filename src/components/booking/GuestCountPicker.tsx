import { useVenue } from "@/hooks/useVenue";
import { Box, MenuItem, TextField } from "@mui/material";

/** Props for {@link GuestCountPicker}. */
interface GuestCountPickerProps {
  /** If set, the maximum is the venue's `maxGuests`. If not, the maximum is 20. */
  venueId?: string;
  /** Currently selected number of guests. */
  value: number;
  /** Called with the new guest count. */
  onChange: (value: number) => void;
}

/**
 * Dropdown for choosing the number of guests, from 1 up to a maximum.
 * The maximum is the venue's `maxGuests` when a `venueId` is given, otherwise 20.
 */
export const GuestCountPicker = ({
  venueId,
  value,
  onChange,
}: GuestCountPickerProps) => {
  if (venueId) {
    return (
      <VenuesGuestCountSelector
        venueId={venueId}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <GuestCountSelector maxGuests={20} value={value} onChange={onChange} />
  );
};

/** Dropdown with the options 1 to `maxGuests`. */
function GuestCountSelector({
  maxGuests,
  value,
  onChange,
}: {
  maxGuests: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: "center",
        gap: 0.5,
        flexWrap: "wrap",
        m: 2,
      }}
    >
      <TextField
        id="guest-count"
        name="guest-count"
        label="Number of guests"
        select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        sx={{ minWidth: 250 }}
      >
        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((amount) => (
          <MenuItem key={amount} value={amount}>
            {amount}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

/** Fetches the venue and limits the dropdown to its `maxGuests` (falls back to 1). */
function VenuesGuestCountSelector({
  venueId,
  value,
  onChange,
}: {
  venueId: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const { venue } = useVenue(venueId);
  const totalGuestsAllowed = venue.maxGuests || 1;

  return (
    <GuestCountSelector
      maxGuests={totalGuestsAllowed}
      value={value}
      onChange={onChange}
    />
  );
}
