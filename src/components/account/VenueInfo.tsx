import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import type { Venue } from '@/../services/Venue';

interface VenueInfoProps {
  venueInfo: Venue[];
}

export const VenueInfo = ({ venueInfo }: VenueInfoProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      {venueInfo.length > 0 ? (
        venueInfo.map((venue) => (
          <Box key={venue.id}>
            <Typography variant="body1"><strong>Name:</strong> {venue.name}</Typography>
            <Typography variant="body2">Location: {venue.location.city}, {venue.location.country}</Typography>
            <Typography variant="body2">{venue.description}</Typography>
          </Box>
          ))
    ) : (
      <Box>
        <Typography variant="body1">You haven't registered any venues yet.</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate({ to: "/venues" })}
        >
          Get inspired!
        </Button>
      </Box>
    )}
   </Box>
  )
};
