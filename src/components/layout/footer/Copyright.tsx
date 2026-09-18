import { Typography, Link } from "@mui/material";
import { brandSettings } from "@/lib/brand/brandSettings";

export const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {currentYear} {"Copyright © "}
      <Link
        href="/"
        sx={{
          color: "text.secondary",
        }}
      >
        {brandSettings.name}
      </Link>
    </Typography>
  );
};
