import { createFileRoute } from '@tanstack/react-router';
// import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute('/auth/signup')({
  component: Signup,
})

function Signup() {
  return <div>Hello "/auth/signup"!</div>
}
