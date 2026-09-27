import { useNavUser } from "@/hooks/useNavUser";
import { Box, Container, Stack } from "@mui/material";
import { SearchDisplay } from "@/components/search/SearchDisplay";
import { HeroCta } from "./HeroCta";
import { HeroText } from "./HeroText";

export function Hero() {
  const { isVenueManager, isAuthenticated, userName } = useNavUser();

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
            <HeroText
              isAuthenticated={isAuthenticated}
              isVenueManager={isVenueManager}
            />
          </Stack>

          <SearchDisplay />

          <HeroCta
            isAuthenticated={isAuthenticated}
            isVenueManager={isVenueManager}
            userName={userName}
          />
        </Container>
      </Box>
    </Box>
  );
}
