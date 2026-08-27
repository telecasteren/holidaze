import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import type { Profile } from "@/lib/zod/index"
import { updateProfileFn } from "@/server/profileFunctions";
import { Avatar, Box, styled } from "@mui/material";
import { ModalWindow } from "@/components/layout/Modal";
import { EditAvatarForm } from "./EditAvatarForm";
import { EditIcon } from "@/components/layout/icons";

const BoxHover = styled(Box)(() => ({
  position: 'relative',
  borderRadius: "50%",
  cursor: "pointer",
  transition: "opacity 0.3s ease-in-out",
  '& .edit-icon': {
    position: 'absolute',
    inset: 0,
    margin: "auto",
    opacity: 0,
    zIndex: 1
  },
  '&:hover': {
    '& .edit-icon': {
      opacity: 1,
      transition: "opacity 0.3s ease-in-out",
    },
    '& .avatar': {
      opacity: 0.8,
      backdropFilter: "blur(6px)",
    },
  },
}));

export const AvatarDisplay = ({ user }: { user: Profile }) => {
  const router = useRouter();
  const username = user.name;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newAvatarUrl = data.get("avatarUrl") as string;

    toast("Saving...");
    await updateProfileFn({ data: { name: username, avatar: { url: newAvatarUrl, alt: username } } });
    router.invalidate();

    setTimeout(() => {
      toast.remove();
      toast("Saved!");
      setOpen(false);
      setDisabled(false);
    }, 1000)
  };

  return (
    <>
      <ModalWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Avatar"
        text={"Please make sure the URL you enter is a valid public link."}
        content={<EditAvatarForm user={user} handleSubmit={handleSubmit} disabled={disabled} />}
      />

      <BoxHover>
        <EditIcon
          className="edit-icon"
        onClick={handleEdit} />
        <Avatar
          className="avatar"
          src={user.avatar.url}
          alt={user.avatar.alt}
          sx={{
            width: 150,
            height: 150,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
          }}
        />
      </BoxHover>
    </>
  )
}
