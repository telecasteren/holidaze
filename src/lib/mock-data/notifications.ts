export type NotificationType = "message" | "booking";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  href: string;
  clicked: boolean;
}

export const notifications: Array<Notification> = [
  {
    id: "1",
    type: "message",
    title: "Whats the best way to get to the venue?",
    subtitle: "by John Show",
    href: "#",
    clicked: false,
  },
  {
    id: "2",
    type: "booking",
    title: "Upcoming booking!",
    subtitle: "at Palm Beach House",
    href: "#",
    clicked: false,
  },
  {
    id: "3",
    type: "booking",
    title: "Upcoming booking!",
    subtitle: "at Sunrise Inn",
    href: "#",
    clicked: true,
  },
];
