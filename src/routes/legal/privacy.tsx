// CoAuthored with Claude Sonnet 5

import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/legal/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      {
        name: "privacy",
        content:
          "Get familiar with and understand our policies and how we follow privacy.",
      },
      { title: "Privacy & Security | Holidaze" },
    ],
  }),
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>;
  },
});

interface PrivacySection {
  title: string;
  content: React.ReactNode;
}

const sections: Array<PrivacySection> = [
  {
    title: "Information we collect",
    content:
      "We collect the details you give us when you create an account or make a booking, such as your name, email address and payment details, as well as basic usage data to help us improve Holidaze.",
  },
  {
    title: "How we use your information",
    content:
      "Your information is used to process bookings, communicate with you about your trips, and improve the venues and features we offer. We don't sell your personal data.",
  },
  {
    title: "Cookies & tracking",
    content:
      "We use cookies to keep you signed in, remember your preferences and understand how Holidaze is used, so we can make it better over time.",
  },
  {
    title: "Data sharing",
    content:
      "We share the booking details a venue manager needs to host your stay, and we may use trusted service providers to help run payments and support. We don't share your data for advertising purposes.",
  },
  {
    title: "Data security",
    content:
      "We use industry-standard measures to protect your data, including encryption in transit and restricted access to personal information within our team.",
  },
  {
    title: "Your rights",
    content:
      "You can request a copy of the data we hold about you, ask us to correct it, or ask us to delete your account at any time.",
  },
  {
    title: "Contact us",
    content: (
      <>
        Questions about your privacy? Reach out at{" "}
        <Link href={`mailto:${brandSettings.email}`}>
          {brandSettings.email}
        </Link>
        .
      </>
    ),
  },
];

function Privacy() {
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
        <PageTitle title="Privacy & Security" />
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
