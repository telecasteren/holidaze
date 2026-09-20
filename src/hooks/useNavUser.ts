import { useAuth } from "@/hooks/useAuth";
import { stringAvatar } from "@/lib/utils/stringAvatar";
import { toast } from "react-hot-toast";

/**
 * @returns `username`, `avatarProps` built from the user from the `useAuth` hook, `isAuthenticated`, and `handleLogout()`,
 * which runs `logout()` and clears the session, refreshes route data and navigates to the login page.
 */
export const useNavUser = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const userName = user?.name as string;
  const avatarProps = user?.avatar?.url
    ? { src: user.avatar.url, alt: user.avatar.alt, sx: {} }
    : stringAvatar(userName || "John Doe");

  const handleLogout = () => {
    toast.loading("Logging out...");
    logout();
  };

  return {
    handleLogout,
    avatarProps,
    isAuthenticated,
    userName,
  };
};
