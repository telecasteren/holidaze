import {
  Typography,
  Box,
  Container,
  Stack,
  Link as MuiLink,
  styled,
} from "@mui/material";
import HeroTitle from "@/components/layout/HeroTitle";
import { ArrowForwardIcon } from "../layout/icons";
import { Link as RouterLink } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { LinkToAccount } from "../LinkToAccount";
// import { CarouselGallery } from "../carousel/CarouselGallery";
import { SearchDisplay } from "@/components/search/SearchDisplay";

const StyledBox = styled(Box)(() => ({
  display: "grid",
  justifyContent: "center",
  borderRadius: 8,
  padding: 8,
}));

export function Hero() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        id="hero"
        sx={{
          width: "100%",
          minHeight: 500,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/hero/ishan-seefromthesky-qE1Y8GQKhEk-unsplash.webp)",
        }}
      >
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
            sx={{
              alignItems: "center",
              width: { xs: "100%", sm: "70%" },
              background:
                "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
              borderRadius: 2,
              padding: 2,
            }}
          >
            <HeroTitle title="Most popular" span="venues" />

            <Typography
              sx={{
                textAlign: "center",
                color: "text.light",
                width: { sm: "100%", md: "80%" },
                borderRadius: 1,
              }}
            >
              Explore our remarkable venues and and find your next destination.
              Be adventurous and discover new places.
            </Typography>
          </Stack>

          <SearchDisplay />

          <Box>
            {isAuthenticated ? (
              <Box sx={{ color: "text.light", fontSize: { xs: 20, sm: 24 } }}>
                <LinkToAccount profileId={user?.name || ""}>
                  Register venue now <ArrowForwardIcon />
                </LinkToAccount>
              </Box>
            ) : (
              <StyledBox sx={{ color: "text.light" }}>
                <MuiLink
                  component={RouterLink}
                  to="/auth/signup"
                  sx={{
                    width: "fit-content",
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    fontSize: { xs: 20, sm: 24 },
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up now <ArrowForwardIcon />
                </MuiLink>
              </StyledBox>
            )}
          </Box>
        </Container>
      </Box>

      {/* <Stack sx={{ mt: 4, maxWidth: 800, mx: "auto" }}>
        <CarouselGallery />
      </Stack>*/}
    </Box>
  );
}
