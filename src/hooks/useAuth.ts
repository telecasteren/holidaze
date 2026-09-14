import {
  useRouteContext,
  useRouter,
  useNavigate,
} from "@tanstack/react-router";
import { logoutFn } from "@/server/authFunctions";

export const useAuth = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { user } = useRouteContext({ from: "__root__" });

  const logout = async () => {
    await logoutFn();
    await router.invalidate();
    navigate({ to: "/auth/login" });
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    logout,
  };
};
