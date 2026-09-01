import { TooltipWithContent } from "@/components/layout/Tooltips";
import { Typography } from "@mui/material";

export const RequiredField = () => {
  return (
  <TooltipWithContent
    trigger={
      <span style={{ color: "red" }} >*</span>
  }
  >
    <Typography variant="body1">Required field</Typography>
  </TooltipWithContent>

  )
}
