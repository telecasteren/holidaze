import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { values } from "@/lib/mock-data/about";

export function ValuesGrid() {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {values.map((value, index) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          key={index}
          sx={{ display: "flex" }}
        >
          <Card variant="outlined" sx={{ flexGrow: 1 }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Box sx={{ color: "primary.main" }}>{value.icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                {value.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {value.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
