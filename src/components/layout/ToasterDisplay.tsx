import { useTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

export const ToasterDisplay = () => {
  const theme = useTheme();
  const v = theme.vars || theme;

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          color: v.palette.info.dark,
          backgroundColor: v.palette.info.light,
          border: `1px solid ${v.palette.info.main}`,
        },
        success: {
          style: {
            color: v.palette.success.dark,
            backgroundColor: v.palette.success.light,
            border: `1px solid ${v.palette.success.main}`,
          },
        },
        error: {
          style: {
            color: v.palette.error.dark,
            backgroundColor: v.palette.error.light,
            border: `1px solid ${v.palette.error.main}`,
          },
        },
      }}
    />
  );
};
