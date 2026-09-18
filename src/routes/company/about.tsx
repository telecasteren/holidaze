// CoAuthored with Claude Sonnet 5

import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PageTitle } from "@/components/layout/PageTitle";
import { brandSettings } from "@/lib/brand/brandSettings";
import { ValuesGrid } from "@/components/company/ValuesGrid";
import { StatsRow } from "@/components/company/StatsRow";

export const Route = createFileRoute("/company/about")({
  component: About,
  head: () => ({
    meta: [
      {
        name: "about",
        content:
          "Learn about Holidaze and our mission to serve the greatest venues.",
      },
      { title: "About us | Holidaze" },
    ],
  }),
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>;
  },
});

function About() {
  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          mx: "auto",
          mb: { xs: 6, sm: 10 },
          width: { sm: "100%", md: "70%" },
        }}
      >
        <PageTitle title="About Holidaze" />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {brandSettings.description} {brandSettings.tagline}.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: { xs: 6, sm: 10 } }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Our story
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Holidaze started with a simple idea: booking a place to stay
            shouldn&apos;t feel like a gamble. We set out to build a platform
            where venue managers could showcase what makes their space special,
            and travellers could book with confidence.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Where we&apos;re headed
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Today we&apos;re growing our network of venues while investing in
            the tools that make managing bookings easier, from real-time
            availability to a calendar built around how our managers actually
            work.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mb: { xs: 6, sm: 10 } }}>
        <Typography
          component="h2"
          variant="h6"
          gutterBottom
          sx={{ color: "text.primary", textAlign: "center" }}
        >
          What we stand for
        </Typography>
        <ValuesGrid />
      </Box>

      <Divider sx={{ mb: { xs: 6, sm: 10 } }} />

      <StatsRow />

      <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography component="h2" variant="h6" sx={{ color: "text.primary" }}>
          Ready to find your next stay?
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" href="/venues">
            Explore venues
          </Button>
          <Button variant="outlined" href="/company/careers">
            View open roles
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
