import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { StyledChip } from "@/components/StyledChip";
import { brandSettings } from "@/lib/brand/brandSettings";
import { openPositions } from "@/lib/mock-data/careers";

export function OpenPositionsList() {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {openPositions.map((position, index) => (
        <Card key={index} variant="outlined">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                {position.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {position.department} • {position.location}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ alignItems: "center" }}
            >
              <StyledChip size="small" label={position.type} />
              <Button
                variant="outlined"
                size="small"
                href={`mailto:${brandSettings.email}?subject=${encodeURIComponent(
                  `Application: ${position.title}`,
                )}`}
              >
                Apply
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
