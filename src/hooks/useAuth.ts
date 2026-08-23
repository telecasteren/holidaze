import { useRouteContext, useRouter } from "@tanstack/react-router";
import { logoutFn } from "@/server/authFunctions";

export const useAuth = () => {
  const router = useRouter();
  const { user } = useRouteContext({ from: "__root__" });

  const logout = async () => {
    await logoutFn();
    await router.invalidate();
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    logout
  }
};
