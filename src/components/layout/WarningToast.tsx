import { InfoIcon } from "@/components/layout/icons";

interface WarningToastProps {
  text: string;
}

export const WarningToast = ({ text }: WarningToastProps) => {
  return (
    <span
      style={{
        padding: 8,
        color: "#503C02", // orange[800]
        backgroundColor: "#FDF1CE", // orange[100]
        border: "1px solid #F6CE55", // orange[300]
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <InfoIcon /> {text}
    </span>
  );
};
