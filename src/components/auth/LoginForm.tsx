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
  Stack,
} from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "@/components/shared-theme/AppTheme";
import { BrandLogo } from "@/components/layout/BrandLogo";
import ForgotPassword from "./ForgotPassword";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function LoginForm(props: { disableCustomTheme?: boolean }) {
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
    console.log(errors);
    toast.error("Failed to log you in.");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <LoginContainer
        direction="column"
        sx={{ justifyContent: "space-between" }}
      >
        <Card variant="outlined">
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
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
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
        </Card>
      </LoginContainer>
    </AppTheme>
  );
}
