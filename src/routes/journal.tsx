import { createFileRoute } from "@tanstack/react-router";
import { Container, Divider } from "@mui/material";
import { PageTitle } from "@/components/layout/PageTitle";

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

function Journal() {
  return (
    <Container id="services" sx={{ py: 16 }}>
      <PageTitle
        title="Holidaze Travel Journal"
        styles={{ textAlign: "center" }}
      />

      <p>This will be the BLOG page. Here comes news and stuff.</p>
      <Divider />
    </Container>
  );
}
