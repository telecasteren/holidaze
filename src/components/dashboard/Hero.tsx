import { Typography, Box, Container, Stack, styled } from "@mui/material";
import HeroTitle from "@/components/layout/HeroTitle";
import { CarouselDisplay } from "@/components/carousel/CarouselDisplay";

const StyledBox = styled("div")(({ theme }) => ({
  position: "relative",
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(6),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(6),
    height: 600,
  },
}));

export function Hero() {
  return (
    <Box id="hero">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <HeroTitle title="Most popular" span="venues" />

          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
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
  );
}
