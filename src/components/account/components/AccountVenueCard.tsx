import { Card, Box, Typography } from "@mui/material";
import { LinkToVenue } from "@/components/LinkToVenue";
import { AccountVenueActions } from "./AccountVenueActions";
import { formatDate } from "@/lib/utils/utils";
import type { Venue } from "@/lib/zod";

interface AccountVenueCardProps {
  venue: Venue;
}

export const AccountVenueCard = ({ venue }: AccountVenueCardProps) => {
  return (
    <Card
      key={venue.id}
      sx={{
        p: 0,
        border: "none",
        position: "relative",
        width: "fit-content",
        minWidth: 250,
        maxWidth: 400,
      }}
    >
      <LinkToVenue venueId={venue.id} unstyled>
        <Box
          component="img"
          loading="lazy"
          src={venue.media[0]?.url || "/no-image-icon.webp"}
          alt={venue.media[0]?.alt || `Image of ${venue.name}`}
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "100%",
            borderRadius: 1,
            transition: "ease-in-out 0.3s",
            "&:hover": { opacity: 0.8 },
          }}
        />
      </LinkToVenue>

      <Box
        id="venue-text"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "grid",
          p: 2,
          color: "text.tertiary",
          background: "linear-gradient(to top, black, transparent)",
          pointerEvents: "none",
        }}
      >
        <Typography variant="h5" component="h6">
          {venue.name}
        </Typography>

        <Typography variant="body2">
          <strong>Location:</strong> {venue.location?.city} •{" "}
          {venue.location?.country}
        </Typography>
        <Typography variant="body2">
          <strong>Last updated:</strong> {formatDate(venue.updated)}
        </Typography>
      </Box>

      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <AccountVenueActions venue={venue} />
      </Box>
    </Card>
  );
};
