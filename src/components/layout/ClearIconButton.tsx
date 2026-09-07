import { IconButton } from "@mui/material";
import { ClearIcon } from "@/components/layout/icons";

const iconStyles = {
  cursor: "pointer",
  transition: "ease-in-out 0.2s",
  "&:hover": { backgroundColor: "lightgray", borderRadius: "4px" },
};

export const ClearIconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton aria-label="clear-or-cancel-action">
      <ClearIcon onClick={onClick} sx={iconStyles} />
    </IconButton>
  );
};
