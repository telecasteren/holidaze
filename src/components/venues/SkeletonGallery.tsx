// CoAuthored with Claude Sonnet 5

import { ImageList, ImageListItem, Box, Skeleton } from "@mui/material";

type SkeletonGalleryProps = {
  count?: number;
};

const TILE_HEIGHTS = [220, 160, 260, 190, 240, 170];

export const SkeletonGallery = ({ count = 3 }: SkeletonGalleryProps) => {
  if (count <= 1) {
    return (
      <Box
        role="status"
        aria-label="Loading gallery image"
        sx={{ display: "grid", justifyContent: "center" }}
      >
        <Skeleton
          aria-hidden="true"
          variant="rounded"
          animation="wave"
          width="100%"
          height={360}
          sx={{ borderRadius: "4px", maxWidth: 640 }}
        />
      </Box>
    );
  }

  return (
    <Box role="status" aria-label="Loading gallery images">
      <ImageList variant="masonry" cols={count >= 2 ? 2 : 3} gap={8}>
        {Array.from({ length: count }).map((_, index) => (
          <ImageListItem key={index}>
            <Skeleton
              aria-hidden="true"
              variant="rounded"
              animation="wave"
              width="100%"
              height={TILE_HEIGHTS[index % TILE_HEIGHTS.length]}
              sx={{ borderRadius: "4px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
