import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { bindPopover } from "material-ui-popup-state";
import type { PopupState } from "material-ui-popup-state/hooks";

interface PopoverWindowProps {
  popupState: PopupState;
  children: React.ReactNode;
}

export const PopoverWindow = ({ children, popupState }: PopoverWindowProps) => {
  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children}
      <Button variant="outlined" onClick={popupState.close} sx={{ m: 2 }}>
        Close
      </Button>
    </Popover>
  );
};
