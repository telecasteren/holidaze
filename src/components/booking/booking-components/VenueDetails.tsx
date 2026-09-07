import { Box, Stack, Typography, styled } from '@mui/material'
import { TooltipWithContent } from '@/components/layout/Tooltips'
import { LinkToVenue } from '@/components/LinkToVenue'
import { formatCurrency } from '@/lib/utils/utils'
import type { Venue } from '@/lib/zod/index'

interface VenueDetailsProps {
  singleVenue: Venue | undefined
  dates: string | null
  totalPrice: number
  nights: number
  guests: number
}

const BoxSummary = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
}))

const HoverBox = styled(Box)(({ theme }) => ({
  width: 320,
  [theme.breakpoints.up('md')]: {
    width: 400,
  },
  transition: 'opacity 0.3s',
  '&:hover': { opacity: 0.8 },
}))

export const VenueDetails = ({
  singleVenue,
  dates,
  totalPrice,
  nights,
  guests,
}: VenueDetailsProps) => {
  const venueId = singleVenue?.id
  const firstImage = singleVenue?.media[0]
  const venuePricePerNight = singleVenue?.price ?? 0

  return (
    <Stack sx={{ display: 'grid', justifyContent: 'center', gap: 2 }}>
      <LinkToVenue venueId={venueId || ''} unstyled>
        <TooltipWithContent
          trigger={
            <HoverBox>
              <Box
                component="img"
                src={firstImage?.url}
                alt={firstImage?.alt || `Image of ${singleVenue?.name}`}
                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
              />
            </HoverBox>
          }
        >
          <Typography variant="body1">Click image to go to venue</Typography>
        </TooltipWithContent>
      </LinkToVenue>

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
    </Stack>
  )
}
