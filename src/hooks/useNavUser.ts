import { useAuth } from "@/hooks/useAuth";
import { profileByIdQuery } from "@/lib/queries/profilesQuery";
import { stringAvatar } from "@/lib/utils/stringAvatar";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

/**
 * @returns `username`, `avatarProps` built from query based on the user from the `useAuth` hook,
 * `isAuthenticated`, and `handleLogout()`, which runs `logout()` and clears the session,
 * refreshes route data and navigates to the login page.
 */
export const useNavUser = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { data } = useQuery({
    ...profileByIdQuery(user?.name ?? ""),
    enabled: isAuthenticated,
  });

  const userName = user?.name as string;
  const avatar = data?.data.avatar;
  const avatarProps = avatar?.url
    ? { src: avatar.url, alt: avatar.alt, sx: {} }
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
