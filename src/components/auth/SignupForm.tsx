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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthContainer } from "@/components/auth/AuthContainer";

export default function SignupForm() {
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
      </AuthCard>
    </AuthContainer>
  );
}
