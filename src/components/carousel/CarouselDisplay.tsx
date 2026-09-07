import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { venuesQuery } from '@/lib/queries/venuesQuery'

import { Box, Typography } from '@mui/material'
import { CarouselControls } from './CarouselControls'
import { LinkToVenue } from '@/components/LinkToVenue'

export const CarouselDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data } = useSuspenseQuery(venuesQuery())
  const venues = data.data
  const venue = venues[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((i) => (i - 1 + venues.length) % venues.length)
  }

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % venues.length)
  }

  return (
    <Box
      id="venue-carousel"
      aria-label="Venue image carousel"
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 'inherit',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <LinkToVenue venueId={venue.id}>
          <Box
            key={venue.id}
            component="img"
            src={venue.media[0]?.url || '/logos/no-image-icon.webp'}
            alt={venue.media[0]?.alt || `Image of ${venue.name}`}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit',
            }}
          />
        </LinkToVenue>
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Typography
            variant="h2"
            component={'h6'}
            sx={{
              color: 'white',
              textShadow: '0 4px 10px rgba(0,0,0,1)',
            }}
          >
            {venue.name}
          </Typography>
        </Box>
      </Box>

      <CarouselControls onPrev={handlePrevious} onNext={handleNext} />
    </Box>
  )
}
