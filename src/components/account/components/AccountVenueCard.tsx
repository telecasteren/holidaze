import { Box, Card, Typography, styled } from "@mui/material";
import { LinkToVenue } from "@/components/LinkToVenue";
import { AccountVenueActions } from "./AccountVenueActions";
import { formatDate } from "@/lib/utils/utils";
import type { Venue } from "@/lib/zod";

const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    display: "grid",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  gap: 4,
  padding: 10,
  justifyContent: "space-between",
}));

interface AccountVenueCardProps {
  venue: Venue;
}

export const AccountVenueCard = ({ venue }: AccountVenueCardProps) => {
  return (
    <StyledCard key={venue.id}>
      <Box>
        <LinkToVenue venueId={venue.id} unstyled>
          <Box
            component="img"
            src={venue.media[0].url}
            alt={venue.media[0].alt || `Image of ${venue.name}`}
            sx={{
              width: 500,
              height: "auto",
              maxHeight: 500,
              borderRadius: 1,
              transition: "ease-in-out 0.3s",
              "&:hover": { opacity: 0.8 },
            }}
          />
        </LinkToVenue>

        <Box sx={{ display: "grid", gap: 0.5 }}>
          <Typography variant="h6" component="h6">
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
      </Box>

      <AccountVenueActions venue={venue} />
    </StyledCard>
  );
};
