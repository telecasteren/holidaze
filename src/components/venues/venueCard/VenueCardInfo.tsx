import { Typography } from "@mui/material";
import { LinkToVenue } from "@/components/LinkToVenue";
import { LocationOnIcon } from "@/components/layout/icons";
import type { Venue } from "@/lib/zod";

interface VenueCardInfoProps {
  venue: Venue;
}

export const VenueCardInfo = ({ venue }: VenueCardInfoProps) => {
  return (
    <>
      <LinkToVenue
        venueId={venue.id}
        children={<Typography variant="h2">{venue.name}</Typography>}
      />

      {venue.location?.city && venue.location.country && (
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <LocationOnIcon fontSize="small" /> {venue.location.city} •{" "}
          {venue.location.country}
        </Typography>
      )}
    </>
  );
};
