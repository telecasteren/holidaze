// CoAuthored with Claude Sonnet 5

import { Box, Container, Divider, Skeleton, Stack } from "@mui/material";

type SkeletonAccountProps = {
  tabCount?: number;
};

export const SkeletonAccount = ({ tabCount = 3 }: SkeletonAccountProps) => {
  return (
    <>
      <Container
        id="profile-skeleton"
        role="status"
        aria-label="Loading account"
        sx={{ py: 16 }}
      >
        {/* Hero: banner with name, stats and avatar overlay */}
        <Box sx={{ mt: 2, position: "relative" }}>
          <Skeleton
            aria-hidden="true"
            variant="rounded"
            animation="wave"
            width="100%"
            sx={{ height: { xs: 120, md: 200 }, borderRadius: "0.2rem" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, md: 6 },
            }}
          >
            <Box sx={{ display: "grid", gap: 1 }}>
              <Skeleton
                aria-hidden="true"
                variant="text"
                animation="wave"
                width={200}
                sx={{ fontSize: "2rem" }}
              />
              <Skeleton
                aria-hidden="true"
                variant="text"
                animation="wave"
                width={260}
              />
            </Box>
            <Skeleton
              aria-hidden="true"
              variant="circular"
              animation="wave"
              sx={{ width: { xs: 64, md: 96 }, height: { xs: 64, md: 96 } }}
            />
          </Box>
        </Box>

        <Stack sx={{ mt: 2 }}>
          {/* Tabs */}
          <Box sx={{ display: "flex", gap: 2, py: 1.5 }}>
            {Array.from({ length: tabCount }).map((_, index) => (
              <Skeleton
                key={index}
                aria-hidden="true"
                variant="rounded"
                animation="wave"
                width={100}
                height={24}
                sx={{ borderRadius: "4px" }}
              />
            ))}
          </Box>

          {/* Tab content */}
          <Stack
            sx={{
              p: "1rem",
              gap: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              mb: 2,
            }}
          >
            {[0, 1, 2].map((row) => (
              <Box key={row} sx={{ display: "grid", gap: 0.5 }}>
                <Skeleton
                  aria-hidden="true"
                  variant="text"
                  animation="wave"
                  width={120}
                />
                <Skeleton
                  aria-hidden="true"
                  variant="rounded"
                  animation="wave"
                  width="100%"
                  height={40}
                  sx={{ borderRadius: "4px" }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
      <Divider />
    </>
  );
};
