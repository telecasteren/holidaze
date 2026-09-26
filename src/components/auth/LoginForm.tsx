import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { LoginFormSchemaType } from "@/lib/zod/index";
import { loginFormSchema } from "@/lib/zod/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFn } from "@/server/authFunctions";
import { toast } from "react-hot-toast";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { BrandLogo } from "@/components/layout/BrandLogo";
import ForgotPassword from "./ForgotPassword";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthContainer } from "@/components/auth/AuthContainer";

/**
 * Sign-in form (email and password), validated with `loginFormSchema` when a field loses focus.
 * On success it goes to the user's account page. While signing in, only a loading message is shown.
 * Includes a "forgot password" dialog and a link to sign up. The "Remember me" checkbox isn't connected to anything.
 */
export default function LoginForm() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onMutate: () => {
      toast.loading("Signing in...");
    },
    onSuccess: ({ name }) => {
      toast.remove();
      navigate({ to: "/account/$profileId", params: { profileId: name } });
    },
    onError: () => {
      toast.error(
        "Failed to log you in. Check your information and try again.",
      );
    },
    onSettled: () => {
      toast.remove();
    },
  });

  /** Runs on valid input: signs the user in. */
  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
    mutate({ data });
  };

  /** Runs on invalid input: shows an error toast. */
  const onInvalid: SubmitErrorHandler<LoginFormSchemaType> = () => {
    toast.error("Please check the form and try again.");
  };

  if (isPending) {
    return (
      <Box sx={{ mx: "auto" }}>
        <Typography variant="h4">
          Logging into your next adventure...
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
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
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              {...register("password")}
              aria-invalid={!!errors.password}
              helperText={errors.password ? errors.password.message : null}
              error={!!errors.password}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>

          <ForgotPassword open={open} handleClose={() => setOpen(false)} />
          <Link
            component="button"
            type="button"
            onClick={() => setOpen(true)}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Forgot your password?
          </Link>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </AuthCard>
    </AuthContainer>
  );
}
