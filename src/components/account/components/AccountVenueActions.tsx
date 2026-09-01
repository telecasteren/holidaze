import { EditIcon, DeleteIcon } from "@/components/layout/icons";
import { Box, styled, IconButton } from "@mui/material";
import { toast } from "react-hot-toast";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  gap: 12,
  alignItems: "center",
  width: "fit-content"
}))

const iconStyles = {
  cursor: "pointer",
  transition: "ease-in-out 0.2s",
  "&:hover": { transform: "scale(1.2)" }
}

export const AccountVenueActions = () => {

  const handleEdit = () => {
    console.log("EDIT VENUE")
    toast("EDIT VENUE clicked");
  }

  const handleDelete = () => {
    console.log("DELETE VENUE")
    toast("DELETE VENUE clicked");
  }

  return (
    <StyledBox>
      <IconButton onClick={handleEdit}><EditIcon sx={iconStyles} /></IconButton>
      <IconButton onClick={handleDelete}><DeleteIcon sx={iconStyles}/></IconButton>
    </StyledBox>
  )
}
