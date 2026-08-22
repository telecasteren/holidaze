import {Typography} from "@mui/material"

export function PageTitle({ title }: { title: string }) {
  return (
    <Typography variant="h1" align="center" sx={{ m: 2 }}>{title}</Typography>
  );
}
