import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "@/components/shared-theme/AppTheme";
import { BrandLogo } from "@/components/layout/BrandLogo";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignupForm(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (data) => {
    toast.success("Signing you up...");
    const { name } = await registerFn({ data });

    setTimeout(() => {
      navigate({ to: "/account/$profileId", params: { profileId: name } });
      toast.remove();
    }, 1500);
  };
  const onError: SubmitErrorHandler<SignUpFormSchemaType> = () => {
    console.log(errors);
    toast.error("Failed to sign up.");
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
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
              {errors.name && <p role="alert">{errors.name.message}</p>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
                {...register("email")}
                aria-invalid={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
                error={!!errors.email}
              />
              {errors.email && <p role="alert">{errors.email.message}</p>}
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
              {errors.password && <p role="alert">{errors.password.message}</p>}
            </FormControl>

            <FormControl>
              <FormControlLabel
                label="Sign me up as a venue manager!"
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                }
              />
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
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
