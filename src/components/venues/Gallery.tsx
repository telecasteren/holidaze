import { useState, useCallback } from "react";
import { RouteLoader } from "@/components/layout";
import { ImageList, ImageListItem, Box } from "@mui/material";
import type { Venue } from "@/lib/zod/index";

type GalleryProps = {
  venueMedia: Venue["media"];
};

export const Gallery = ({ venueMedia }: GalleryProps) => {
  const [loaded, setLoaded] = useState(0);

  const totalVenueMediaIs2 = venueMedia.length >= 2;
  const isLoading = loaded < venueMedia.length;

  const handleSettled = () => setLoaded((prev) => prev + 1);

  const handleRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) {
      setLoaded((prev) => prev + 1);
    }
  }, []);

  if (venueMedia.length === 1) {
    const [item] = venueMedia;
    return (
      <>
        {isLoading && <RouteLoader />}

        <Box
          sx={{
            opacity: isLoading ? 0 : 1,
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            ref={handleRef}
            src={item.url}
            alt={item.alt || "Gallery image"}
            onLoad={handleSettled}
            onError={handleSettled}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }}
          />
        </Box>
      </>
    );
  }

  return (
    <>
      {isLoading && <RouteLoader />}

      <ImageList
        variant="masonry"
        cols={totalVenueMediaIs2 ? 2 : 3}
        gap={8}
        sx={{ opacity: isLoading ? 0 : 1 }}
      >
        {venueMedia.map((item) => (
          <ImageListItem key={item.url}>
            <img
              ref={handleRef}
              srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=248&fit=crop&auto=format`}
              alt={item.alt || "Gallery image"}
              onLoad={handleSettled}
              onError={handleSettled}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
