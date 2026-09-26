import type { ProfileBase } from "@/lib/zod";
import { Box, Stack, Typography, IconButton, styled } from "@mui/material";
import { TooltipWithContent, RouteLoader } from "@/components/layout";
import { EditIcon } from "@/components/layout/icons";
import toast from "react-hot-toast";

/** Billing info: purely presentational because of API limitations on 'Profile'
 * can be routed to API/user database when supported
 */
const billingInfo = {
  location: { address: "Grønlandsreiret 4", city: "Oslo", zip: "0123" },
};

const StyledStack = styled(Stack)(() => ({
  justifyContent: "space-between",
  alignItems: "center",
}));

/** Props for {@link CustomerDetails}. */
interface CustomerDetailsProps {
  /** The customer to display. Falls back to "unknown" placeholders when undefined. */
  user: ProfileBase | undefined;
  /** When true, renders a loading message instead of the details. */
  isLoading: boolean;
}

/**
 * Displays a customer's account details (username, email) and billing address.
 *
 * The edit buttons are placeholders and only show a "coming soon" toast for now.
 *
 * @param props - {@link CustomerDetailsProps}
 * @returns The details section, or 'RouteLoader' component while `isLoading` is true.
 */
export const CustomerDetails = ({ user, isLoading }: CustomerDetailsProps) => {
  const handleEditInfo = () => {
    toast("Feature coming soon...");
  };

  if (isLoading) {
    return <RouteLoader />;
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <StyledStack direction="row">
        <Box>
          <Typography variant="h4" component="h3">
            CUSTOMER DETAILS
          </Typography>

          <Typography variant="h6" component="h4">
            My information
          </Typography>
          <Typography variant="body1">
            <strong>Username: </strong>
            {user?.name || "could not find username"}
          </Typography>
          <Typography variant="body2">
            <strong>Email: </strong>
            {user?.email || "could not find email"}
          </Typography>
        </Box>

        <TooltipWithContent
          trigger={
            <IconButton onClick={handleEditInfo}>
              <EditIcon />
            </IconButton>
          }
        >
          <Typography variant="body2">Edit my information</Typography>
        </TooltipWithContent>
      </StyledStack>

      <StyledStack direction="row">
        <Box>
          <Typography variant="h6" component="h4">
            Billing information
          </Typography>
          <Typography variant="body1">
            <strong>Address: </strong>
            {billingInfo.location.address}, {billingInfo.location.zip}{" "}
            {billingInfo.location.city}
          </Typography>
        </Box>

        <TooltipWithContent
          trigger={
            <IconButton onClick={handleEditInfo}>
              <EditIcon />
            </IconButton>
          }
        >
          <Typography variant="body2">Edit billing information</Typography>
        </TooltipWithContent>
      </StyledStack>
    </Box>
  );
};
