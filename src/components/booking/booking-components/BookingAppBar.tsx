import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { CloseRoundedIcon } from "@/components/layout/icons";

interface BookingAppBarProps {
  disabled: boolean;
  close: () => void;
}

export const BookingAppBar = ({ disabled, close }: BookingAppBarProps) => {
  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={close}
          aria-label="close"
        >
          <CloseRoundedIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flex: 1, px: 1, fontSize: { xs: 16, sm: 20 } }}
        >
          Booking overview
        </Typography>
        <Button type="submit" autoFocus variant="contained" disabled={disabled}>
          Confirm booking
        </Button>
      </Toolbar>
    </AppBar>
  );
};
