import { AcceptTerms } from "@/components/booking/booking-components/AcceptTerms";
import { Box, Stack, Typography, styled } from "@mui/material";
import { formatCurrency } from "@/lib/utils/utils";
import type { Venue } from "@/lib/zod/index";

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
  gap: 2,
}));

export const VenueDetails = ({
  singleVenue,
  dates,
  totalPrice,
  nights,
  guests,
}: VenueDetailsProps) => {
  const firstImage = singleVenue?.media[0];
  const venuePricePerNight = singleVenue?.price ?? 0;

  return (
    <Stack sx={{ display: "grid", justifyContent: "center", gap: 2 }}>
      <Box sx={{ display: "grid", width: 200, justifySelf: "center" }}>
        <Box
          component="img"
          loading="lazy"
          src={firstImage?.url}
          alt={firstImage?.alt || `Image of ${singleVenue?.name}`}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 8,
          }}
        />
      </Box>

      <Typography variant="h6">{singleVenue?.name}</Typography>

      <BoxSummary>
        <Typography variant="body1">
          <strong>Selected dates:</strong>
        </Typography>
        {dates && <span>{dates}</span>}
        {!dates && <span>No dates selected</span>}
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
        <span>
          {formatCurrency(totalPrice)} ({nights} nights)
        </span>
      </BoxSummary>

      <AcceptTerms />
    </Stack>
  );
};
