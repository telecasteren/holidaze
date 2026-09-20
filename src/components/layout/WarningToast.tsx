import { InfoIcon } from "@/components/layout/icons";
import { useTheme } from "@mui/material/styles";

interface WarningToastProps {
  text: string;
}

export const WarningToast = ({ text }: WarningToastProps) => {
  const theme = useTheme();
  const v = theme.vars || theme;

  return (
    <span
      style={{
        padding: 8,
        color: v.palette.warning.dark,
        backgroundColor: v.palette.warning.light,
        border: `1px solid ${v.palette.warning.main}`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <InfoIcon /> {text}
    </span>
  );
};
