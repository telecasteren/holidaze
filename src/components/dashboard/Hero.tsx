import { Typography, Box, Container, Stack, styled } from '@mui/material'
import HeroTitle from '@/components/layout/HeroTitle'
import { CarouselDisplay } from '@/components/carousel/CarouselDisplay'

const StyledBox = styled('div')(({ theme }) => ({
  position: 'relative',
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(6),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(6),
    height: 600,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}))

export function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',

        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <HeroTitle title="Most popular" span="venues" />

          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Explore our remarkable venues and and find your next destination. Be
            adventurous and discover new places to stay.
          </Typography>
        </Stack>

        {/* Venue image Carousel */}
        <StyledBox>
          <CarouselDisplay />
        </StyledBox>
      </Container>
    </Box>
  )
}
