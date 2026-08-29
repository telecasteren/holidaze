import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@mui/material';
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute('/auth/login')({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Sign in to your account at Holidaze.",
      },
      {
        title: "Signin — Holidaze",
      },
    ],
  }),
  component: Login,
})

function Login() {
  return (
    <Container id="login" sx={{ py: { xs: 8, sm: 16 } }}>
      <AuthForm isSignup={false} />
    </Container>
  )
}
