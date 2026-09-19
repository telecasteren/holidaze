import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { SignUpFormSchemaType } from "@/lib/zod/signUpFormSchema";
import { signUpFormSchema } from "@/lib/zod/signUpFormSchema";
import { registerFn } from "@/server/authFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthContainer } from "@/components/auth/AuthContainer";
import FormHelperText from "@mui/material/FormHelperText";

export default function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerFn,
    onMutate: () => {
      toast.loading("Signing you up...");
    },
    onSuccess: ({ name }) => {
      toast.remove();
      toast.success("Signed up successfully!");
      navigate({ to: "/account/$profileId", params: { profileId: name } });
    },
    onError: () => {
      toast.error("Failed to sign you up. Try again.");
    },
    onSettled: () => {
      toast.remove();
    },
  });

  const onSubmit: SubmitHandler<SignUpFormSchemaType> = (data) => {
    mutate({ data });
  };

  const onInvalid: SubmitErrorHandler<SignUpFormSchemaType> = () => {
    toast.error("Please check the form and try again.");
  };

  if (isPending) {
    return (
      <Box sx={{ mx: "auto" }}>
        <Typography variant="h4">
          Signing you up to your next adventure...
        </Typography>
      </Box>
    );
  }

  return (
    <AuthContainer>
      <AuthCard>
        <BrandLogo />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              autoComplete="name"
              required
              fullWidth
              id="name"
              placeholder="Jon Snow"
              {...register("name")}
              aria-invalid={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
              error={!!errors.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your-email@stud.noroff.no"
              autoComplete="email"
              variant="outlined"
              {...register("email")}
              aria-invalid={!!errors.email}
              helperText={errors.email ? errors.email.message : null}
              error={!!errors.email}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              {...register("password")}
              aria-invalid={!!errors.password}
              helperText={errors.password ? errors.password.message : null}
              error={!!errors.password}
            />
          </FormControl>

          <FormControl error={!!errors.email}>
            <FormControlLabel
              label="Sign me up as a venue manager!"
              control={<Checkbox {...register("venueManager")} />}
            />
            {errors.venueManager && (
              <FormHelperText>{errors.venueManager.message}</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </AuthCard>
    </AuthContainer>
  );
}
