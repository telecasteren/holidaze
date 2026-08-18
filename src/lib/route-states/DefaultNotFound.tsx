import { GoHomeBtn } from "@/components/layout/GoHomeBtn";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const DefaultNotFound = () => {
  return (
    <Box component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        m: 20,
        p: 2,
        border: '2px dashed darkorange',
        color: 'darkorange',
      }}>
      <Typography variant="h2">PAGE NOT FOUND</Typography>{" "}
      <GoHomeBtn />
    </Box>
  );
};
