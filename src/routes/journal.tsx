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
import { journalPosts } from "@/lib/mock-data/journal";

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
