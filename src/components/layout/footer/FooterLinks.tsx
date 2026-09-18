import { Box, Link, Typography } from "@mui/material";

export const FooterLinks = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          Product
        </Typography>
        <Link
          variant="body2"
          href="#services"
          sx={{
            color: "text.secondary",
          }}
        >
          Services
        </Link>
        <Link
          variant="body2"
          href="/#reviews"
          sx={{
            color: "text.secondary",
          }}
        >
          Reviews
        </Link>
        <Link
          variant="body2"
          href="/#faqs"
          sx={{
            color: "text.secondary",
          }}
        >
          FAQs
        </Link>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          Company
        </Typography>
        <Link
          variant="body2"
          href="/company/about"
          sx={{
            color: "text.secondary",
          }}
        >
          About us
        </Link>
        <Link
          variant="body2"
          href="/company/careers"
          sx={{
            color: "text.secondary",
          }}
        >
          Careers
        </Link>
        <Link
          variant="body2"
          href="/company/contact"
          sx={{
            color: "text.secondary",
          }}
        >
          Contact
        </Link>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          Legal
        </Typography>
        <Link
          variant="body2"
          href="/legal/terms"
          sx={{
            color: "text.secondary",
          }}
        >
          Terms
        </Link>
        <Link
          variant="body2"
          href="/legal/privacy"
          sx={{
            color: "text.secondary",
          }}
        >
          Privacy
        </Link>
      </Box>
    </>
  );
};
