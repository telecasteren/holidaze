import { Box, Card, Typography, styled } from '@mui/material'
import { LinkToVenue } from '@/components/LinkToVenue'
import { ArrowForwardIcon } from '@/components/layout/icons'
import { AccountVenueActions } from './AccountVenueActions'
import { formatDate } from '@/lib/utils/utils'
import type { Venue } from '@/lib/zod'

const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'grid',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
  gap: 4,
  padding: '2rem',
  justifyContent: 'space-between',
  lineHeight: '1.5',
}))

interface AccountVenueCardProps {
  venue: Venue
}

export const AccountVenueCard = ({ venue }: AccountVenueCardProps) => {
  return (
    <StyledCard key={venue.id}>
      <Box>
        <Typography variant="h6" component="h6">
          {venue.name}
        </Typography>

        <LinkToVenue venueId={venue.id} unstyled>
          <Box
            component="img"
            src={venue.media[0].url}
            alt={venue.media[0].alt || `Image of ${venue.name}`}
            sx={{
              width: 100,
              height: 100,
              borderRadius: 1,
              objectFit: 'contain',
              transition: 'ease-in-out 0.3s',
              '&:hover': { opacity: 0.8 },
            }}
          />
        </LinkToVenue>

        <Typography variant="body2">
          <strong>Location:</strong> {venue.location?.city} •{' '}
          {venue.location?.country}
        </Typography>
        <Typography variant="body2">
          <strong>Last updated:</strong> {formatDate(venue.updated)}
        </Typography>
        <Typography variant="body2">
          <strong>Total bookings:</strong>{' '}
          {venue._count?.bookings || 'No bookings'}
        </Typography>

        <LinkToVenue
          venueId={venue.id}
          children="See venue"
          icon={<ArrowForwardIcon />}
        />
      </Box>

      <AccountVenueActions venue={venue} />
    </StyledCard>
  )
}
