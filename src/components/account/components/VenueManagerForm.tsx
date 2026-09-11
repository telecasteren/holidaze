import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { updateProfileFn } from "@/server/profileFunctions";

import { Stack, FormControlLabel, Checkbox, Button } from "@mui/material";
import { toast } from "react-hot-toast";

export const VenueManagerForm = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { user } = useAuth();
  const userName = user?.name || "";

  const setVenueManager = useMutation({
    mutationFn: () =>
      updateProfileFn({ data: { name: userName, venueManager: true } }),
    onSuccess: () => {
      toast.success("You are registered as venue manager!");
    },
    onError: () => {
      toast.error("Failed to register user as venue manager.");
    },
    onSettled: () => {
      router.invalidate();
    },
  });

  return (
    <Stack direction={"column"}>
      <FormControlLabel
        required
        control={
          <Checkbox
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        }
        label="Yes, sign me up as a venue manager!"
      />
      <Button
        variant="contained"
        onClick={() => setVenueManager.mutate()}
        disabled={!isChecked}
      >
        Submit
      </Button>
    </Stack>
  );
};
