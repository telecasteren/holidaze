import {Typography} from "@mui/material"

export function PageTitle({ title, styles }: { title: string; styles?: React.CSSProperties }) {
  return (
    <Typography variant="h1" sx={{ ...styles }}>{title}</Typography>
  );
}
