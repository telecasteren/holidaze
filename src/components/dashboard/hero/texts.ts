export type Role = "guest" | "manager" | "customer";

export const heroText: Record<
  Role,
  { title: string; span: string; caption: string }
> = {
  guest: {
    title: "Book or host",
    span: "venues",
    caption:
      "Discover our remarkable venues and get your next destination, or list your own and start your hosting journey today.",
  },
  manager: {
    title: "Boost your",
    span: "revenue",
    caption:
      "Get inspired by talented hosts, join the community and enhance your hosting journey today.",
  },
  customer: {
    title: "Get inspired",
    span: "discover",
    caption: "Explore amazing venues and find your next adventure today.",
  },
};
