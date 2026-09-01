import { ClearIcon } from "@/components/layout/icons";

export const ClearIconButton = ({onClick}: { onClick: () => void}) => {
  return (
    <ClearIcon
      onClick={onClick}
      sx={{ cursor: "pointer", "&:hover": { backgroundColor: "lightgray", borderRadius: "4px" } }} // todo: fix color
    />
  )
}
