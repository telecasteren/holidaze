// CoAuthored with Claude Sonnet 5

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { PageTitle } from "@/components/layout/PageTitle";
import { RequiredField } from "@/components/layout/RequiredField";
import { GridBox } from "@/components/GridBox";
import {
  LinkedInIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/layout/icons";
import { brandSettings } from "@/lib/brand/brandSettings";
import { contactSuccessOptions } from "@/lib/link-options/generalOptions";

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
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>;
  },
});

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(64, "Name must be at most 64 characters."),
  email: z.email("Email must be a valid email."),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters.")
    .max(80, "Subject must be at most 80 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message must be at most 1000 characters."),
});

type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

const contactDetails = [
  { icon: <MailOutlineRoundedIcon />, label: brandSettings.email },
  { icon: <LocalPhoneRoundedIcon />, label: brandSettings.phone },
  {
    icon: <LocationOnRoundedIcon />,
    label: `${brandSettings.address}, ${brandSettings.postalCode} ${brandSettings.city}, ${brandSettings.country}`,
  },
  { icon: <AccessTimeRoundedIcon />, label: brandSettings.phoneHours },
];

function Contact() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ContactFormSchemaType> = async () => {
    toast.success("Sending your message...");

    setTimeout(() => {
      navigate(contactSuccessOptions);
      toast.remove();
    }, 1500);
  };

  const onError: SubmitErrorHandler<ContactFormSchemaType> = () => {
    toast.error("Please check the form and try again.");
  };

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
          <Card variant="outlined">
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <GridBox>
                  <InputLabel htmlFor="contact-name">
                    Full name <RequiredField />
                  </InputLabel>
                  <TextField
                    id="contact-name"
                    placeholder="Jon Snow"
                    autoComplete="name"
                    required
                    fullWidth
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    helperText={errors.name ? errors.name.message : null}
                    error={!!errors.name}
                  />
                </GridBox>

                <GridBox>
                  <InputLabel htmlFor="contact-email">
                    Email <RequiredField />
                  </InputLabel>
                  <TextField
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                    fullWidth
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    helperText={errors.email ? errors.email.message : null}
                    error={!!errors.email}
                  />
                </GridBox>

                <GridBox>
                  <InputLabel htmlFor="contact-subject">
                    Subject <RequiredField />
                  </InputLabel>
                  <TextField
                    id="contact-subject"
                    placeholder="How can we help?"
                    required
                    fullWidth
                    {...register("subject")}
                    aria-invalid={!!errors.subject}
                    helperText={errors.subject ? errors.subject.message : null}
                    error={!!errors.subject}
                  />
                </GridBox>

                <GridBox>
                  <InputLabel htmlFor="contact-message">
                    Message <RequiredField />
                  </InputLabel>
                  <TextField
                    id="contact-message"
                    placeholder="Tell us what's on your mind..."
                    required
                    fullWidth
                    multiline
                    rows={5}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    helperText={errors.message ? errors.message.message : null}
                    error={!!errors.message}
                  />
                </GridBox>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
                >
                  Send message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent
              sx={{
                p: { xs: 2, sm: 3 },
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                sx={{ color: "text.primary" }}
              >
                Contact information
              </Typography>

              <Stack spacing={2}>
                {contactDetails.map((detail, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Box sx={{ color: "primary.main", display: "flex" }}>
                      {detail.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {detail.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ color: "text.secondary" }}
              >
                <IconButton
                  color="inherit"
                  size="small"
                  href="#"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  size="small"
                  href="#"
                  aria-label="X"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  size="small"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
