import { ImageList, ImageListItem, Box } from '@mui/material';
import type { Venue } from "@/lib/zod/index";

type GalleryProps = {
  venueMedia: Venue["media"];
};

export const Gallery = ({ venueMedia }: GalleryProps) => {
  if (venueMedia.length === 1) {
    const [item] = venueMedia;
    return (
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <img
          src={item.url}
          alt={item.alt}
          loading="lazy"
          style={{maxWidth: "100%", height: "auto", borderRadius: "4px"}}
        />
      </Box>
    )
  }

  return (
  <ImageList variant="masonry" cols={3} gap={8}>
    {venueMedia.map((item) => (
      <ImageListItem key={item.url}>
        <img
          srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`${item.url}?w=248&fit=crop&auto=format`}
          alt={item.alt}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
  )
}
