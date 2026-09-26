import { useState } from "react";
import { NotifictionsContext } from "@/hooks/useNotifications";
import { notifications as mockNotifications } from "@/lib/mock-data/notifications";

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsClicked = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, clicked: true } : n)),
    );
  };

  const unreadCount = notifications.filter((n) => !n.clicked).length;

  return (
    <NotifictionsContext.Provider
      value={{ notifications, unreadCount, markAsClicked }}
    >
      {children}
    </NotifictionsContext.Provider>
  );
};
