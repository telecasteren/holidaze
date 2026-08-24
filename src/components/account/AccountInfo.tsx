import { Box, Typography, Button } from '@mui/material';

interface AccountInfoProps {
  user: {
    name: string;
    email: string;
  };
  isManager: boolean;
}

export const AccountInfo = ({ user, isManager }: AccountInfoProps) => {
  return (
      <Box>
        <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
        <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
      <Typography variant="body2"><strong>Venue host:</strong> {isManager ? 'Yes' : 'No'}</Typography>

      {!isManager && (
        <Button
          variant="outlined"
          sx={{mt: 2}}
          onClick={() => { }}
        >Register as venue manager</Button>
        )}
      </Box>
  )
};
