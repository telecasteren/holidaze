import { Chip, Stack } from '@mui/material';
import type { Venue } from "@/lib/zod/index";

type VenueMetaProps = {
  venue: Venue;
};

const metaLabels: Record<keyof Venue["meta"], string> = {
  wifi: "Wifi available",
  parking: "Parking available",
  breakfast: "Breakfast included",
  pets: "Pets allowed",
}

export const VenueMeta = ({ venue }: VenueMetaProps) => {
  // filter out meta items that are not available (e.g. false)
  const activeMeta = Object.entries(venue.meta).filter(([, value]) => value);
  if (activeMeta.length === 0) return null;

  return (
    <>
      <Stack direction="row" spacing={1}>
        {activeMeta.map(([key]) => (
          <Chip
            key={key}
            label={metaLabels[key as keyof Venue["meta"]]}
            color="primary"
          />
        ))}
      </Stack>
    </>
  )
}
