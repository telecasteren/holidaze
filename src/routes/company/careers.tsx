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
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { PageTitle } from "@/components/layout/PageTitle";
import { StyledChip } from "@/components/StyledChip";
import { brandSettings } from "@/lib/brand/brandSettings";

export const Route = createFileRoute("/company/careers")({
  component: Careers,
  head: () => ({
    meta: [
      {
        name: "careers",
        content: "See open roles and what it's like to work at Holidaze.",
      },
      { title: "Careers | Holidaze" },
    ],
  }),
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>;
  },
});

interface Perk {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const perks: Array<Perk> = [
  {
    icon: <HomeWorkRoundedIcon />,
    title: "Remote-friendly",
    description:
      "Work from home, our office, or wherever you do your best work.",
  },
  {
    icon: <TrendingUpRoundedIcon />,
    title: "Growth budget",
    description:
      "An annual budget for courses, conferences and the tools you need to grow.",
  },
  {
    icon: <CelebrationRoundedIcon />,
    title: "Team retreats",
    description:
      "We get together a few times a year to plan, celebrate and recharge.",
  },
  {
    icon: <ScheduleRoundedIcon />,
    title: "Flexible hours",
    description:
      "We care about the work getting done, not what time you log on.",
  },
];

interface OpenPosition {
  title: string;
  department: string;
  location: string;
  type: string;
}

const openPositions: Array<OpenPosition> = [
  {
    title: "Venue Success Manager",
    department: "Operations",
    location: "Oslo, Norway",
    type: "Full-time",
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Support Specialist",
    department: "Support",
    location: "Oslo, Norway",
    type: "Part-time",
  },
  {
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
];

function Careers() {
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
        <PageTitle title="Careers at Holidaze" />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          We&apos;re a small team building the easiest way to book and manage
          venues. Here&apos;s what it&apos;s like to work with us, and where we
          could use your help.
        </Typography>
      </Box>

      <Box sx={{ mb: { xs: 6, sm: 10 } }}>
        <Typography
          component="h2"
          variant="h6"
          gutterBottom
          sx={{ color: "text.primary", textAlign: "center" }}
        >
          Why work with us
        </Typography>
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
      </Box>

      <Divider sx={{ mb: { xs: 6, sm: 10 } }} />

      <Box sx={{ mb: { xs: 6, sm: 10 } }}>
        <Typography
          component="h2"
          variant="h6"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Open positions
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {openPositions.map((position, index) => (
            <Card key={index} variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                    {position.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {position.department} • {position.location}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ alignItems: "center" }}
                >
                  <StyledChip size="small" label={position.type} />
                  <Button
                    variant="outlined"
                    size="small"
                    href={`mailto:${brandSettings.email}?subject=${encodeURIComponent(
                      `Application: ${position.title}`,
                    )}`}
                  >
                    Apply
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography component="h2" variant="h6" sx={{ color: "text.primary" }}>
          Don&apos;t see the right role?
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          We&apos;re always happy to hear from people who care about travel and
          good software.
        </Typography>
        <Button variant="contained" href={`mailto:${brandSettings.email}`}>
          Get in touch
        </Button>
      </Stack>
    </Container>
  );
}
