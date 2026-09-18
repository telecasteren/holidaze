import { Container, Box } from "@mui/material";

import { BrandSection } from "@/components/layout/footer/BrandSection";
import { FooterLinks } from "@/components/layout/footer/FooterLinks";
import { Copyright } from "@/components/layout/footer/Copyright";
import { SocialLinks } from "@/components/layout/footer/SocialLinks";

export default function Footer() {
  return (
    <Container
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <BrandSection />
        <FooterLinks />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Copyright />
        <SocialLinks />
      </Box>
    </Container>
  );
}
