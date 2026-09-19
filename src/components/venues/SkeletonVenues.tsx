// CoAuthored with Claude Sonnet 5

import { Box, Card, Container, Divider, Skeleton } from "@mui/material";
import { CardsStack } from "@/components/CardsStack";

type SkeletonVenuesProps = {
  count?: number;
};

export const SkeletonVenues = ({ count = 6 }: SkeletonVenuesProps) => {
  return (
    <Container
      id="venues-skeleton"
      role="status"
      aria-label="Loading venues"
      sx={{ py: 16 }}
    >
      {/* Page title */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Skeleton
          aria-hidden="true"
          variant="rounded"
          animation="wave"
          width={280}
          height={48}
          sx={{ borderRadius: "4px" }}
        />
      </Box>

      {/* Search and sort */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Skeleton
          aria-hidden="true"
          variant="rounded"
          animation="wave"
          width={320}
          height={56}
          sx={{ borderRadius: "4px", maxWidth: "100%" }}
        />
        <Skeleton
          aria-hidden="true"
          variant="rounded"
          animation="wave"
          width={160}
          height={56}
          sx={{ borderRadius: "4px" }}
        />
      </Box>

      {/* Venue cards */}
      <CardsStack>
        {Array.from({ length: count }).map((_, index) => (
          <Card
            key={index}
            sx={{
              display: "grid",
              width: { xs: 300, sm: 350 },
              overflow: "hidden",
              padding: 0,
              border: "none",
              boxShadow: 1,
            }}
          >
            <Skeleton
              aria-hidden="true"
              variant="rectangular"
              animation="wave"
              width="100%"
              height={250}
            />
            <Box sx={{ display: "grid", gap: 2, p: 2 }}>
              <Skeleton
                aria-hidden="true"
                variant="text"
                animation="wave"
                width="70%"
                sx={{ fontSize: "1.75rem" }}
              />
              <Skeleton
                aria-hidden="true"
                variant="text"
                animation="wave"
                width="45%"
              />
              <Divider />
              <Skeleton
                aria-hidden="true"
                variant="text"
                animation="wave"
                width="35%"
              />
              <Skeleton
                aria-hidden="true"
                variant="text"
                animation="wave"
                width="25%"
              />
            </Box>
          </Card>
        ))}
      </CardsStack>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Skeleton
          aria-hidden="true"
          variant="rounded"
          animation="wave"
          width={220}
          height={32}
          sx={{ borderRadius: "4px" }}
        />
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Container>
  );
};
