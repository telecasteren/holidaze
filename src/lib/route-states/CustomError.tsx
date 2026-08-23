import type { ErrorComponentProps } from "@tanstack/react-router";
import { classifyError } from "@/lib/route-states/errorTypes";
import { GoHomeBtn } from "#/components/layout/GoHomeBtn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CustomError = ({ error, reset }: ErrorComponentProps) => {
  const type = classifyError(error);

  const errorInfo =
    type === "network"
      ? {
          title: "Network issue",
          message: "Could not reach the server. Check your connection.",
          showRetry: true,
        }
      : type === "missingPage"
        ? {
            title: "Page not found",
            message: "This page does not exist or the URL is invalid.",
            showRetry: false,
        }
        : type === "invalid"
          ? {
              title: "Unexpected data",
              message:
                "We received invalid data from the server. Please try again.",
              showRetry: true,
            }
          : {
              title: "Something went wrong",
              message: error.message || "An unexpected error occurred.",
              showRetry: true,
            };
  return (
    <Box component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        m: 20,
        p: 2,
        border: '2px dashed #fca5a5',
        color: '#991b1b',
        backgroundColor: '#fef2f2',
      }}>
      <Typography variant="h2">{errorInfo.title}</Typography>{" "}
      <Typography variant="subtitle1">
        <strong>Error: </strong>
        {errorInfo.message}
      </Typography>
      {errorInfo.showRetry && (
        <Button
          onClick={() => reset()}
        >
          Retry
        </Button>
      )}
      <GoHomeBtn />
    </Box>
  );
};
