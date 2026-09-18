export interface JournalPost {
  title: string;
  excerpt: string;
  category: "Guides" | "Destinations" | "Tips";
  date: string;
  readTime: string;
  image: string;
  alt: string;
}

export const journalPosts: Array<JournalPost> = [
  {
    title: "5 things to check before booking your next stay",
    excerpt:
      "From cancellation policies to hidden fees, here's what to look for so your next Holidaze booking goes smoothly from start to finish.",
    category: "Guides",
    date: "2026-08-14",
    readTime: "4 min read",
    image: "/no-image-icon.webp",
    alt: "Placeholder cover image for journal post",
  },
  {
    title: "Norway's most underrated coastal towns",
    excerpt:
      "Skip the crowds and discover the quiet fishing villages and guesthouses that make the Norwegian coastline worth the detour.",
    category: "Destinations",
    date: "2026-07-29",
    readTime: "6 min read",
    image: "/no-image-icon.webp",
    alt: "Placeholder cover image for journal post",
  },
  {
    title: "Packing smart: a venue manager's carry-on essentials",
    excerpt:
      "We asked a handful of Holidaze venue managers what they never travel without. Here's the shortlist worth stealing.",
    category: "Tips",
    date: "2026-07-02",
    readTime: "3 min read",
    image: "/no-image-icon.webp",
    alt: "Placeholder cover image for journal post",
  },
  {
    title: "How to spot a great venue from the listing alone",
    excerpt:
      "Photos, reviews and fine print all tell a story. Learn how to read a venue listing like a seasoned traveller before you book.",
    category: "Guides",
    date: "2026-06-18",
    readTime: "5 min read",
    image: "/no-image-icon.webp",
    alt: "Placeholder cover image for journal post",
  },
  {
    title: "Off-season getaways worth planning around",
    excerpt:
      "Lower prices, fewer crowds and a different side of your favourite destinations — here's why off-season travel deserves a chance.",
    category: "Destinations",
    date: "2026-05-30",
    readTime: "5 min read",
    image: "/no-image-icon.webp",
    alt: "Placeholder cover image for journal post",
  },
  {
    title: "Making the most of your Holidaze account",
    excerpt:
      "From saving favourites to tracking upcoming trips, a quick tour of the account features that make repeat bookings easier.",
    category: "Tips",
    date: "2026-05-11",
    readTime: "3 min read",
    image: "/no-image-icon.webp",
    alt: "Placeholder cover image for journal post",
  },
];
