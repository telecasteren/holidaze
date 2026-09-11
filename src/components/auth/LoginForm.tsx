import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import type { LoginFormSchemaType } from "@/lib/zod/loginFormSchema";
import { loginFormSchema } from "@/lib/zod/loginFormSchema";
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
  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    toast.success("Signing in...");
    const { name } = await loginFn({ data });

    setTimeout(() => {
      navigate({ to: "/account/$profileId", params: { profileId: name } });
      toast.remove();
    }, 1500);
  };
  const onError: SubmitErrorHandler<LoginFormSchemaType> = () => {
    toast.error("Failed to log you in.");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          onSubmit={handleSubmit(onSubmit, onError)}
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

          <ForgotPassword open={open} handleClose={handleClose} />
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
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
