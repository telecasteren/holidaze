// CoAuthored with Claude Sonnet 5

import { createFileRoute } from "@tanstack/react-router";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";
import { Box, Container, Grid, Typography } from "@mui/material";
import { PageTitle } from "@/components/layout/PageTitle";
import { ContactForm } from "@/components/company/ContactForm";
import { ContactInfoCard } from "@/components/company/ContactInfoCard";

export const Route = createFileRoute("/company/contact/")({
  component: Contact,
  head: () => ({
    meta: [
      {
        name: "contact",
        content:
          "Get in touch with the Holidaze team for questions, feedback or support.",
      },
      { title: "Contact us | Holidaze" },
    ],
  }),
  notFoundComponent: DefaultNotFound,
});

function Contact() {
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
        <PageTitle title="Get in touch" />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Questions about a booking, feedback on the platform, or something else
          on your mind? Send us a message and we&apos;ll get back to you as soon
          as we can.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ContactForm />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <ContactInfoCard />
        </Grid>
      </Grid>
    </Container>
  );
}
