import type { ErrorComponentProps } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { classifyError } from "@/lib/route-states/errorTypes";
import { GoHomeBtn } from "@/components/layout/GoHomeBtn";
import { Box, Button, Typography } from "@mui/material";

export const CustomError = ({ error, reset }: ErrorComponentProps) => {
  const navigate = useNavigate();
  const type = classifyError(error);

  const errorInfo =
    type === "network"
      ? {
          title: "Network issue",
          message: "Could not reach the server. Check your connection.",
          showRetry: true,
        }
      : type === "badRequest"
        ? {
            title: "Bad request",
            message: "Request could not be read properly.",
            showRetry: false,
            showLogin: false,
          }
        : type === "expiredSession"
          ? {
              title: "Expired session",
              message: "This link has expired. Please sign in again.",
              showRetry: false,
              showLogin: true,
            }
          : type === "invalidSession"
            ? {
                title: "Invalid session",
                message:
                  "This link doesn't work anymore. Please sign in again.",
                showRetry: false,
                showLogin: true,
              }
            : type === "missingPage"
              ? {
                  title: "Page not found",
                  message: "This page does not exist or the URL is invalid.",
                  showRetry: false,
                  showLogin: false,
                }
              : type === "invalid"
                ? {
                    title: "Unexpected data",
                    message:
                      "We received invalid data from the server. Please try again.",
                    showRetry: true,
                    showLogin: false,
                  }
                : type === "conflict"
                  ? {
                      title: "Conflict",
                      message: "Could not update. Try again in a few minutes.",
                      showRetry: true,
                      showLogin: false,
                    }
                  : {
                      title: "Something went wrong",
                      message:
                        (error instanceof Error && error.message) ||
                        "An unexpected error occurred.",
                      showRetry: true,
                      showLogin: false,
                    };
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 20,
        p: 2,
        border: "2px dashed #fca5a5",
        color: "#991b1b",
        backgroundColor: "#fef2f2",
      }}
    >
      <Typography variant="h2">{errorInfo.title}</Typography>{" "}
      <Typography variant="subtitle1">
        <strong>Error: </strong>
        {errorInfo.message}
      </Typography>
      {errorInfo.showRetry && (
        <Button variant="outlined" onClick={() => reset()}>
          Retry
        </Button>
      )}
      {errorInfo.showLogin && (
        <Button
          variant="contained"
          onClick={() => navigate({ to: "/auth/login" })}
        >
          Go to login
        </Button>
      )}
      <GoHomeBtn />
    </Box>
  );
};
