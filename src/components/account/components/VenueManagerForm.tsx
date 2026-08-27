import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@tanstack/react-router";
import { updateProfileFn } from "@/server/profileFunctions";
import { Stack, FormControlLabel, Checkbox, Button } from "@mui/material";
import { toast } from "react-hot-toast";

export const VenueManagerForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async () => {
    if (!isChecked || !user) return;
    await updateProfileFn({ data: { name: user.name, venueManager: true } });
    toast.success("You've registered as a venue manager!")
    router.invalidate();
  }

  return (
    <Stack
      direction={"column"}
      sx={{

      }}>
      <FormControlLabel required control={
        <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      } label="Yes, sign me up as a venue manager!" />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!isChecked}
      >
        Submit
      </Button>
    </Stack>
  );
};
