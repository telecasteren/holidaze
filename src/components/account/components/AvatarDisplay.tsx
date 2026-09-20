import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { updateProfileFn } from "@/server/profileFunctions";
import type { Profile } from "@/lib/zod/index";

import { Avatar, Box, styled } from "@mui/material";
import { ModalWindow } from "@/components/layout/Modal";
import { EditAvatarForm } from "./EditAvatarForm";
import { EditIcon } from "@/components/layout/icons";
import { toast } from "react-hot-toast";

/** Round wrapper that shows an edit icon over the avatar on hover. */
const BoxHover = styled(Box)(() => ({
  position: "relative",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "opacity 0.3s ease-in-out",
  "& .edit-icon": {
    position: "absolute",
    inset: 0,
    margin: "auto",
    opacity: 0,
    zIndex: 1,
  },
  "&:hover": {
    "& .edit-icon": {
      opacity: 1,
      transition: "opacity 0.3s ease-in-out",
    },
    "& .avatar": {
      opacity: 0.8,
      backdropFilter: "blur(6px)",
    },
  },
}));

/**
 * Shows a user's avatar. Clicking it opens a modal to change the avatar URL,
 * and the new avatar is saved to the profile.
 *
 * @param props.user - The profile whose avatar is shown.
 */
export const AvatarDisplay = ({ user }: { user: Profile }) => {
  const router = useRouter();
  const username = user.name;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  /** Saves the new avatar, then closes the modal and refreshes route data. */
  const updateAvatar = useMutation({
    mutationFn: (payload: Profile["avatar"]) =>
      updateProfileFn({ data: { name: username, avatar: payload } }),
    onMutate: () => {
      toast("Saving...");
    },
    onSuccess: () => {
      toast.remove();
      toast.success("Saved!");
    },
    onError: () => {
      toast.error("Failed to update avatar.");
    },
    onSettled: () => {
      setOpen(false);
      setDisabled(false);
      router.invalidate();
    },
  });

  /** Opens the edit modal. */
  const handleEdit = () => {
    setOpen(true);
  };

  /** Reads the URL from the form and saves it as the new avatar. */
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newAvatarUrl = data.get("avatarUrl") as string;
    const payload = {
      url: newAvatarUrl,
      alt: `Avatar for ${username}`,
    };

    updateAvatar.mutate(payload);
  };

  return (
    <>
      <ModalWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Avatar"
        text={"Please make sure the URL you enter is a valid public link."}
        content={
          <EditAvatarForm
            user={user}
            handleSubmit={handleSubmit}
            disabled={disabled}
          />
        }
      />

      <BoxHover>
        <EditIcon className="edit-icon" onClick={handleEdit} />
        <Avatar
          className="avatar"
          src={user.avatar.url}
          alt={user.avatar.alt}
          sx={{
            width: { xs: 80, md: 150 },
            height: { xs: 80, md: 150 },
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        />
      </BoxHover>
    </>
  );
};
