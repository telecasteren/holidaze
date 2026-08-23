import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

interface AuthFormProps {
  isSignup: boolean;
}

export function AuthForm({ isSignup }: AuthFormProps) {
  return (
    <div>
      {isSignup ? <SignupForm /> : <LoginForm />}
    </div>
  )
}
