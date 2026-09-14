// CoAuthored with Claude Sonnet 5

import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { PageTitle } from "@/components/layout/PageTitle";
import { StyledChip } from "@/components/StyledChip";
import { ArrowForwardIcon } from "@/components/layout/icons";

export const Route = createFileRoute("/journal")({
  component: Journal,
  head: () => ({
    meta: [
      {
        name: "journal",
        content: "Get the latest news with Holidaze own travel journal.",
      },
      { title: "Travel Journal | Holidaze" },
    ],
  }),
  notFoundComponent: () => {
    return <p>This page doesn't exist.</p>;
  },
});

interface JournalPost {
  title: string;
  excerpt: string;
  category: "Guides" | "Destinations" | "Tips";
  date: string;
  readTime: string;
  image: string;
  alt: string;
}

const journalPosts: Array<JournalPost> = [
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

const categories = ["All", "Guides", "Destinations", "Tips"] as const;

function Journal() {
  const [selectedCategory, setSelectedCategory] =
    React.useState<(typeof categories)[number]>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? journalPosts
      : journalPosts.filter((post) => post.category === selectedCategory);

  const handleSubscribe = () => {
    toast.remove();
    toast.success("Subscribed! Fresh stories heading your way.");
  };

  return (
    <Container id="journal" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          mx: "auto",
          mb: { xs: 4, sm: 6 },
          width: { sm: "100%", md: "70%" },
        }}
      >
        <PageTitle title="Holidaze Travel Journal" />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Stories, guides and destination inspiration from the Holidaze team —
          here to help you plan your next stay and get more out of every trip.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          mb: { xs: 4, sm: 6 },
        }}
      >
        {categories.map((category) => (
          <StyledChip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            selected={selectedCategory === category}
          />
        ))}
      </Stack>

      <Grid container spacing={2}>
        {filteredPosts.map((post, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <CardMedia
                component="img"
                loading="lazy"
                image={post.image}
                alt={post.alt}
                sx={{ height: 180, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                <StyledChip
                  size="small"
                  label={post.category}
                  sx={{ alignSelf: "flex-start" }}
                />

                <Typography variant="h6" component="h3">
                  {post.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", flexGrow: 1 }}
                >
                  {post.excerpt}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pt: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {post.date} • {post.readTime}
                  </Typography>

                  <Link
                    href="#"
                    className="link-underline"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "primary.main",
                    }}
                  >
                    Read more
                    <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: { xs: 6, sm: 10 } }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
          mx: "auto",
          width: { xs: "100%", sm: "60%" },
        }}
      >
        <Typography component="h2" variant="h6" sx={{ color: "text.primary" }}>
          Never miss a story
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Subscribe to get new journal posts and venue updates straight to your
          inbox.
        </Typography>

        <InputLabel htmlFor="email-journal-newsletter">Email</InputLabel>
        <Stack direction="row" spacing={1} useFlexGap>
          <TextField
            id="email-journal-newsletter"
            hiddenLabel
            size="small"
            variant="outlined"
            placeholder="Your email address"
            slotProps={{
              htmlInput: {
                autoComplete: "off",
                "aria-label": "Enter your email address",
              },
            }}
            sx={{ width: "250px" }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ flexShrink: 0 }}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
