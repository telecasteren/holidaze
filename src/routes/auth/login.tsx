import { createFileRoute } from '@tanstack/react-router';
// import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  return <div>Hello "/auth/login"!</div>
}
