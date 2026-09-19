import type { Venue } from "@/lib/zod";
import { localCurrency } from "@/lib/utils/config";
import { Typography, styled } from "@mui/material";

const StyledCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  ...theme.applyStyles("dark", {
    color: (theme.vars || theme).palette.primary.light,
  }),
}));

interface VenueCardFooterProps {
  venue: Venue;
}

export const VenueCardFooter = ({ venue }: VenueCardFooterProps) => {
  return (
    <>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        <strong>
          {venue.price} {localCurrency}
        </strong>{" "}
        / night
      </Typography>

      {venue.rating > 0 ? (
        <StyledCaption variant="caption">Rating: {venue.rating}</StyledCaption>
      ) : (
        <StyledCaption variant="caption" sx={{ fontStyle: "italic" }}>
          No rating yet
        </StyledCaption>
      )}
    </>
  );
};
