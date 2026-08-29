import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@mui/material';
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute('/auth/signup')({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Sign up to Holidaze.",
      },
      {
        title: "Signup — Holidaze",
      },
    ],
  }),
  component: Signup,
})

function Signup() {
  return (
    <Container id="signup" sx={{ py: { xs: 8, sm: 16 } }}>
      <AuthForm isSignup={true} />
    </Container>
  )
}
