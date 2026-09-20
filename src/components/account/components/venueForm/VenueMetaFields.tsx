import type { Venue } from "@/lib/zod";
import { Stack, Typography, FormControlLabel, Checkbox } from "@mui/material";

/** The amenity checkboxes. Each `name` and `value` matches what `getFormData` reads. */
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

/** Props for {@link VenueMetaFields}. */
interface VenueMetaFieldsProps {
  /** Venue to prefill the checkboxes with. Leave out for all unchecked. */
  venue?: Venue;
}

/** Checkboxes for what a venue offers: wifi, pets, parking and breakfast. Fields are uncontrolled. */
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
