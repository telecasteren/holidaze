import type { Venue } from "@/lib/zod";
import { Stack, Typography, FormControlLabel, Checkbox } from "@mui/material";

const metaFields = {
  wifi: {
    id: "venue-wifi",
    label: "Wifi available",
    name: "venue-wifi",
    value: "wifi",
  },
  pets: {
    id: "venue-pets",
    label: "Pets allowed",
    name: "venue-pets",
    value: "pets",
  },
  parking: {
    id: "venue-parking",
    label: "Parking available",
    name: "venue-parking",
    value: "parking",
  },
  breakfast: {
    id: "venue-breakfast",
    label: "Breakfast included",
    name: "venue-breakfast",
    value: "breakfast",
  },
};

interface VenueMetaFieldsProps {
  venue?: Venue;
}

export const VenueMetaFields = ({ venue }: VenueMetaFieldsProps) => {
  return (
    <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
      <Typography variant="h6" component="h6">
        Select what your venue offers
      </Typography>

      {Object.values(metaFields).map((item) => (
        <FormControlLabel
          key={item.id}
          label={item.label}
          control={
            <Checkbox
              id={item.id}
              name={item.name}
              value={item.value}
              defaultChecked={
                venue?.meta[item.value as keyof typeof venue.meta]
              }
            />
          }
        />
      ))}
    </Stack>
  );
};
