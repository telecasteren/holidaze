import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { CloseRoundedIcon } from '@/components/layout/icons';

interface BookingAppBarProps {
  venueName: string | undefined;
  disabled: boolean;
  close: () => void;
}

export const BookingAppBar = ({ venueName, disabled, close }: BookingAppBarProps) => {
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
          type="submit"
          autoFocus
          variant="contained"
          disabled={disabled}
        >
          Confirm booking
        </Button>
      </Toolbar>
    </AppBar>
  )
}
