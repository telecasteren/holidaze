import type { Profile } from "@/lib/zod/index"
import { Box, Button, TextField } from "@mui/material";

export const EditAvatarForm = ({ user, handleSubmit, disabled }:
  {
    user: Profile;
    handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
    disabled: boolean
  }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="avatarUrl"
          type="text"
          aria-label="Avatar url"
          placeholder={user.avatar.url}
        />
      <Button variant="contained"
        type="submit"
        disabled={disabled}
      >
        Save avatar
      </Button>
    </Box>
  );
};
