import { Typography } from "@mui/material"
import type { SxProps, Theme } from "@mui/material";

export function PageTitle({ title, styles }: { title: string; styles?: SxProps<Theme> }) {
  return (
    <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 45 }, ...styles }}>{title}</Typography>
  );
}
