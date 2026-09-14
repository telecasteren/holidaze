// CoAuthored with Claude Sonnet 5

import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { PageTitle } from "@/components/layout/PageTitle";
import { brandSettings } from "@/lib/brand/brandSettings";

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

interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: Array<CompanyValue> = [
  {
    icon: <PublicRoundedIcon />,
    title: "Global reach",
    description:
      "From city guesthouses to countryside cabins, we connect travellers with venues across the globe.",
  },
  {
    icon: <GroupsRoundedIcon />,
    title: "Community first",
    description:
      "We build tools that help venue managers grow their business and help guests find a place that feels right.",
  },
  {
    icon: <VerifiedUserRoundedIcon />,
    title: "Trust & safety",
    description:
      "Every listing and booking runs through the same standards, so you know what to expect before you arrive.",
  },
  {
    icon: <FavoriteRoundedIcon />,
    title: "Loved by travellers",
    description:
      "Thousands of stays booked and reviewed by a community that keeps coming back for their next trip.",
  },
];

const stats = [
  { value: "10K+", label: "Venues listed" },
  { value: "120+", label: "Countries covered" },
  { value: "500K+", label: "Bookings made" },
  { value: "4.8/5", label: "Average guest rating" },
];

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
      </Box>

      <Divider sx={{ mb: { xs: 6, sm: 10 } }} />

      <Grid container spacing={2} sx={{ mb: { xs: 6, sm: 10 } }}>
        {stats.map((stat, index) => (
          <Grid
            size={{ xs: 6, sm: 3 }}
            key={index}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>

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
