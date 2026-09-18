import { useAuth } from "@/hooks/useAuth";
import { stringAvatar } from "@/lib/utils/stringAvatar";
import { toast } from "react-hot-toast";

export const useNavUser = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const userName = user?.name as string;
  const avatarProps = stringAvatar(userName || "John Doe");

  const handleLogout = () => {
    toast("Logging out...");
    setTimeout(() => {
      logout();
    }, 1500);
  };

  return {
    handleLogout,
    avatarProps,
    isAuthenticated,
    userName,
  };
};
