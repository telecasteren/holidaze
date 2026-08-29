import type { Venue } from "@/lib/zod/index";
import { Box, Stack, Typography, Link, styled } from "@mui/material";
import { TooltipWithContent } from "@/components/layout/Tooltips";
import { formatCurrency } from "@/lib/utils/utils";

interface VenueDetailsProps {
  singleVenue: Venue | undefined;
  dates: string | null;
  totalPrice: number;
  nights: number;
  guests: number;
}

const BoxSummary = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2
}));

const HoverBox = styled(Box)(() => ({
  transition: "opacity 0.3s",
  "&:hover": { opacity: 0.8 }
}));

export const VenueDetails = ({ singleVenue, dates, totalPrice, nights, guests }: VenueDetailsProps) => {
  const venueId = singleVenue?.id;
  const firstImage = singleVenue?.media[0];
  const venuePricePerNight = singleVenue?.price ?? 0;

  return (
    <Stack sx={{ display: "grid", justifyContent: "center", gap: 2 }}>
      <Link
        href={`/venues/${venueId}`}
        style={{ textDecoration: "none" }}
      >
        <TooltipWithContent
          trigger={
          <HoverBox>
            <img
              src={firstImage?.url}
              alt={firstImage?.alt}
              style={{ width: 400, height: "auto", borderRadius: 8 }}
            />
          </HoverBox>
        }
        >
          <Typography variant="body1">Click image to go to venue</Typography>
        </TooltipWithContent>
      </Link>

      <BoxSummary>
        <Typography variant="body1">
        <strong>Selected dates:</strong>
        </Typography>
        {dates && (<span>{dates}</span>)}
        {!dates && (<span>No dates selected</span>)}
      </BoxSummary>

      <BoxSummary>
        <Typography variant="body1">
          <strong>Selected number of guests:</strong>
        </Typography>
        <span>{guests}</span>
      </BoxSummary>

       <BoxSummary>
        <Typography variant="body1">
          <strong>Price per night:</strong>
        </Typography>
        <span>{formatCurrency(venuePricePerNight)}</span>
      </BoxSummary>

        <BoxSummary>
          <Typography variant="body1">
            <strong>Total price:</strong>
          </Typography>
          <span>{formatCurrency(totalPrice)} ({nights} nights)</span>
       </BoxSummary>
  </Stack>
  )
};
