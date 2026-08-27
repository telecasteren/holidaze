import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ModalWindow } from "@/components/layout/Modal";
import { VenueManagerForm } from "#/components/account/components/VenueManagerForm";

interface AccountInfoProps {
  user: {
    name: string;
    email: string;
  };
  isManager: boolean;
}

export const AccountInfo = ({ user, isManager }: AccountInfoProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  }
  return (
      <Box>
        <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
        <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
      <Typography variant="body2"><strong>Venue host:</strong> {isManager ? 'Yes' : 'No'}</Typography>

      {!isManager && (
        <Button
          variant="outlined"
          sx={{mt: 2}}
          onClick={openModal}
        >Register as venue manager</Button>
        )}

      <ModalWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Register as venue manager"
        text=""
        content={<VenueManagerForm />}
      />
    </Box>
  )
};
