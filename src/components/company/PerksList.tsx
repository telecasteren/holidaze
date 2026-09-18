import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { perks } from "@/lib/mock-data/careers";

export function PerksList() {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {perks.map((perk, index) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={index}
          sx={{ display: "flex" }}
        >
          <Card variant="outlined" sx={{ flexGrow: 1 }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Box sx={{ color: "primary.main" }}>{perk.icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                {perk.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {perk.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
