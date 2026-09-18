import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  TextField,
} from "@mui/material";
import { RequiredField } from "@/components/layout/RequiredField";
import { GridBox } from "@/components/GridBox";
import { contactFormSchema } from "@/lib/zod/contactSchema";
import type { ContactFormSchemaType } from "@/lib/zod/contactSchema";
import { contactSuccessOptions } from "@/lib/link-options/generalOptions";

export function ContactForm() {
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
  );
}
