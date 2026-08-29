import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { CloseRoundedIcon } from '@/components/layout/icons';

interface BookingAppBarProps {
  venueName: string | undefined;
  disabled: boolean;
  handleConfirmBooking: () => void;
  close: () => void;
}

export const BookingAppBar = ({ venueName, disabled, handleConfirmBooking, close }: BookingAppBarProps) => {
  return (
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={close}
          aria-label="close"
        >
          <CloseRoundedIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Booking overview for {venueName}
        </Typography>
        <Button
          autoFocus
          variant="contained"
          onClick={handleConfirmBooking}
          disabled={disabled}
        >
          Confirm booking
        </Button>
      </Toolbar>
    </AppBar>
  )
}
