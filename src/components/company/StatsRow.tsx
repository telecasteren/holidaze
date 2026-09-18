import { Grid, Typography } from "@mui/material";
import { stats } from "@/lib/mock-data/about";

export function StatsRow() {
  return (
    <Grid container spacing={2} sx={{ mb: { xs: 6, sm: 10 } }}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 6, sm: 3 }} key={index} sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {stat.value}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {stat.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
