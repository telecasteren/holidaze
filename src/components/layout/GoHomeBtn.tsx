import { useNavigate } from "@tanstack/react-router";
import { ArrowBack } from "@/components/layout/icons";
import Button from "@mui/material/Button";

export const GoHomeBtn = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() =>
        navigate({ to: "/",})}>
      <ArrowBack />
      Back home
    </Button>
  )
}
