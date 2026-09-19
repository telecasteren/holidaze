import { Favourites } from "@/components/venues/Favourites";
import { LinkToVenue } from "@/components/LinkToVenue";
import { Box } from "@mui/material";
import type { Venue } from "@/lib/zod";

interface VenueCardTopProps {
  venue: Venue;
}

export const VenueCardTop = ({ venue }: VenueCardTopProps) => {
  return (
    <>
      <Favourites
        venue={venue}
        children={
          <Box
            sx={{
              width: "100%",
              height: 250,
              overflow: "hidden",
              borderTopLeftRadius: 1,
              borderTopRightRadius: 1,
            }}
          >
            <LinkToVenue
              venueId={venue.id}
              styles={{ width: "100%", height: "100%" }}
            >
              <Box
                component="img"
                loading="lazy"

                src={`${venue.media[0]?.url}?w=248&fit=crop&auto=format`}
                alt={venue.media[0]?.alt || `Image of ${venue.name}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "ease-in-out 0.6s",
                  transform: "scale(1.08)",
                  "&:hover": { opacity: 0.8, transform: "scale(1)" },
                }}
              />
            </LinkToVenue>
          </Box>
        }
      />
    </>
  );
};
