import { useFindMyLocation } from "@/hooks/useFindMyLocation";
import { Typography, Button, TextField } from "@mui/material";
import { GridBox } from "@/components/GridBox";

export const FindMyLocation = () => {
  const { status, latitude, longitude, getLocation } = useFindMyLocation();

  return (
    <GridBox styles={{ gap: 1 }}>
      <Button
        variant="outlined"
        onClick={getLocation}
        sx={{ width: "fit-content" }}
      >
        Get current location
      </Button>
      <Typography variant="caption">{status}</Typography>

      <TextField
        id="venue-lat"
        name="venue-lat"
        type="number"
        label="Latitude"
        value={latitude ?? ""}
        slotProps={{ input: { readOnly: true } }}
        sx={{ pointerEvents: "none" }}
      />
      <TextField
        id="venue-long"
        name="venue-long"
        type="number"
        label="Longitude"
        value={longitude ?? ""}
        slotProps={{ input: { readOnly: true } }}
        sx={{ pointerEvents: "none" }}
      />
    </GridBox>
  );
};
