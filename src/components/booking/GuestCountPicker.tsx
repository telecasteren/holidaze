import { useVenue } from "@/hooks/useVenue";
import { Box, MenuItem, TextField } from "@mui/material";

interface GuestCountPickerProps {
  venueId?: string;
  value: number;
  onChange: (value: number) => void;
}

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
