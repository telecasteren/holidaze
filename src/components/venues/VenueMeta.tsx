import { Stack } from "@mui/material";
import { StyledChip } from "@/components/StyledChip";
import type { Venue } from "@/lib/zod/index";

type VenueMetaProps = {
  venue: Venue;
};

const metaLabels: Record<keyof Venue["meta"], string> = {
  wifi: "Wifi available",
  parking: "Parking available",
  breakfast: "Breakfast included",
  pets: "Pets allowed",
};

export const VenueMeta = ({ venue }: VenueMetaProps) => {
  // filter out meta items that are not available (e.g. false)
  const activeMeta = Object.entries(venue.meta).filter(([, value]) => value);
  if (activeMeta.length === 0) return null;

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          mt: 1,
        }}
      >
        {activeMeta.map(([key]) => (
          <StyledChip
            selected
            size="medium"
            key={key}
            label={metaLabels[key as keyof Venue["meta"]]}
          />
        ))}
      </Stack>
    </>
  );
};

{
  /* <Chip
  size="medium"
  key={key}
  label={metaLabels[key as keyof Venue["meta"]]}
  color="primary"
  sx={{ border: "none" }}
  />*/
}
