import { createContext, useContext } from "react";
import type { Notification } from "@/lib/mock-data/notifications";

interface NotificationsContextValue {
  notifications: Array<Notification>;
  unreadCount: number;
  markAsClicked: (id: string) => void;
}

export const NotifictionsContext =
  createContext<NotificationsContextValue | null>(null);

export const useNotifications = () => {
  const context = useContext(NotifictionsContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside a <NotificationsProvider>",
    );
  }

  return context;
};
