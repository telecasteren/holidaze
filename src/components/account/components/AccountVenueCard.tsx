import { Link } from "@tanstack/react-router";
import { Box, Card, Typography, styled } from '@mui/material';
import { LinkToVenue } from "@/components/LinkToVenue";
import { AccountVenueActions } from "./AccountVenueActions";
import { formatDate } from "@/lib/utils/utils";
import type { Venue } from "@/lib/zod";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  gap: 1,
  border: "1px solid",
  borderRadius: theme.shape.borderRadius,
  padding: "2rem",
  justifyContent: "space-between"
}))

interface AccountVenueCardProps {
  venue: Venue;
}

export const AccountVenueCard = ({ venue }: AccountVenueCardProps) => {
  return (
    <StyledCard key={venue.id}>
      <Box>
        <Typography variant="h6" component="h6">{venue.name}</Typography>
        <Link
          to="/venues/$venueId"
          params={{ venueId: venue.id }}
          style={{ textDecoration: 'none', width: "fit-content" }}
        >
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            style={{ width: 100, height: 100, borderRadius: 4 }}
          />
        </Link>
          <Typography
            variant="body2">
            <strong>Location:</strong> {venue.location?.city} • {venue.location?.country}
          </Typography>
          <Typography variant="body2">
            <strong>Last updated:</strong> {formatDate(venue.updated)}
        </Typography>
        <Typography variant="body2">
          <strong>Total bookings:</strong> {venue._count?.bookings || "No bookings"}
        </Typography>
          <LinkToVenue
            venueId={venue.id}
            styles={{ width: "fit-content" }}
            >
            See venue
          </LinkToVenue>
      </Box>

      <AccountVenueActions />
    </StyledCard>
  )
}
