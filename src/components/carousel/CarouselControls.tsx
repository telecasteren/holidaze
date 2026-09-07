import { Box, IconButton } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/layout/icons";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const CarouselControls = ({ onPrev, onNext }: CarouselControlsProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <IconButton
        onClick={onPrev}
        aria-label="Previous"
        sx={{
          pointerEvents: "auto",
          backgroundColor: "background.paper",
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={onNext}
        aria-label="Next"
        sx={{
          pointerEvents: "auto",
          backgroundColor: "background.paper",
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};
