import { useState } from "react";
import { Stack, IconButton } from "@mui/material";
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/layout/icons";
import { toast } from "react-hot-toast";
import type { Venue } from "@/lib/zod/index";

interface FavouritesProps {
  children?: React.ReactNode;
  venue: Venue;
}

export const Favourites = ({ children, venue }: FavouritesProps) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleToggleFavorite = (venueId: string) => {
    setFavorites({ ...favorites, [venueId]: !favorites[venueId] });
    toast.remove();
    toast(`${favorites[venueId] ? "Removed from" : "Added to"} favorites`);
  };

  return (
    <Stack sx={{ position: "relative", justifySelf: "center", width: "100%" }}>
      {favorites[venue.id] ? (
        <IconButton
          aria-label="favourite-on"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
            color: "error.light",
          }}
        >
          <FavoriteIcon onClick={() => handleToggleFavorite(venue.id)} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="favourite-off"
          sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}
        >
          <FavoriteBorderIcon onClick={() => handleToggleFavorite(venue.id)} />
        </IconButton>
      )}
      {children}
    </Stack>
  );
};
