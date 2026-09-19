// CoAuthored with Claude Sonnet 5

import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { ExpandMoreIcon } from "@/components/layout/icons";
import { PageTitle } from "@/components/layout/PageTitle";
import { brandSettings } from "@/lib/brand/brandSettings";

export const Route = createFileRoute("/legal/terms")({
  component: Terms,
  head: () => ({
    meta: [
      {
        name: "terms",
        content: "Read the terms and conditions for using Holidaze.",
      },
      { title: "Terms & Conditions | Holidaze" },
    ],
  }),
  notFoundComponent: DefaultNotFound,
});

interface TermsSection {
  title: string;
  content: React.ReactNode;
}

const sections: Array<TermsSection> = [
  {
    title: "1. Acceptance of terms",
    content:
      "By creating an account or booking a venue through Holidaze, you agree to these terms. If you don't agree with any part of them, please don't use the platform.",
  },
  {
    title: "2. Using Holidaze",
    content:
      "You must be at least 18 years old to book a venue or register as a venue manager. You're responsible for keeping your account details accurate and your password secure.",
  },
  {
    title: "3. Bookings & payments",
    content:
      "When you book a venue, you enter into an agreement with the venue manager, not with Holidaze directly. Prices, availability and payment terms are set by the venue and shown at checkout.",
  },
  {
    title: "4. Cancellations & refunds",
    content:
      "Cancellation policies vary by venue and are shown before you confirm a booking. Refunds are processed according to the policy in place at the time of booking.",
  },
  {
    title: "5. User conduct",
    content:
      "We expect guests and venue managers to treat each other fairly and honestly. Fraudulent listings, fake reviews and abusive behaviour may result in account suspension.",
  },
  {
    title: "6. Limitation of liability",
    content:
      "Holidaze connects guests and venue managers but isn't responsible for the condition of a venue or the accuracy of listings beyond what's required by law.",
  },
  {
    title: "7. Changes to these terms",
    content:
      "We may update these terms from time to time. Continuing to use Holidaze after a change means you accept the updated terms.",
  },
  {
    title: "8. Contact us",
    content: (
      <>
        Questions about these terms? Reach out at{" "}
        <Link href={`mailto:${brandSettings.email}`}>
          {brandSettings.email}
        </Link>
        .
      </>
    ),
  },
];

function Terms() {
  const [expanded, setExpanded] = React.useState<Array<string>>([]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Box
        sx={{
          textAlign: "center",
          mx: "auto",
          mb: { xs: 4, sm: 6 },
          width: { sm: "100%", md: "70%" },
        }}
      >
        <PageTitle title="Terms & Conditions" />
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
          Last updated: 1 September 2026
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {sections.map((section, index) => {
          const panel = `panel${index}`;
          return (
            <Accordion
              key={panel}
              expanded={expanded.includes(panel)}
              onChange={handleChange(panel)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
              >
                <Typography component="span" variant="subtitle2">
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
}
