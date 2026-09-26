import { Link as RouterLink } from "@tanstack/react-router";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { footerOptions } from "@/lib/link-options/footerOptions";

export const FooterLinks = () => {
  return (
    <>
      {footerOptions().map((option) => (
        <Box
          key={option.group}
          aria-label="footer nav-links columns"
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {option.group}
          </Typography>
          {option.links.map((item) => {
            return (
              <MuiLink
                key={item.label}
                component={RouterLink}
                {...item.link}
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                {item.label}
              </MuiLink>
            );
          })}
        </Box>
      ))}
    </>
  );
};
