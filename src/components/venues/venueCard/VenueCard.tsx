import type { Venue } from "@/lib/zod";
import { VenueCardFooter } from "@/components/venues/venueCard/VenueCardFooter";
import { VenueCardInfo } from "@/components/venues/venueCard/VenueCardInfo";
import { VenueCardTop } from "@/components/venues/venueCard/VenueCardTop";
import { Divider, Card, Box } from "@mui/material";

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <Card
      key={venue.id}
      sx={{
        display: "grid",
        justifySelf: "center",
        width: { xs: 300, sm: 350 },
        overflow: "hidden",
        padding: 0,
        border: "none",
        boxShadow: 1,
      }}
    >
      <VenueCardTop venue={venue} />

      <Box sx={{ display: "grid", gap: 2, p: 2 }}>
        <VenueCardInfo venue={venue} />
        <Divider />
        <VenueCardFooter venue={venue} />
      </Box>
    </Card>
  );
};
