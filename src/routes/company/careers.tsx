// CoAuthored with Claude Sonnet 5

import { createFileRoute } from "@tanstack/react-router";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { PageTitle } from "@/components/layout/PageTitle";
import { brandSettings } from "@/lib/brand/brandSettings";
import { PerksList } from "@/components/company/PerksList";
import { OpenPositionsList } from "@/components/company/OpenPositionsList";

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
  notFoundComponent: DefaultNotFound,
});

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
        <PerksList />
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
        <OpenPositionsList />
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
