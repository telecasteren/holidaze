import { useManagerRevenue } from "@/hooks/useManagerRevenue";
import { localCurrency } from "@/lib/utils/config";
import { setColorByTrend } from "@/lib/utils/setColorByTrend";

import { Stack, Box, Typography, Divider } from "@mui/material";
import { BarChartDisplay } from "@/components/charts/BarChart";
import { SentimentSatisfiedAltIcon } from "@/components/layout/icons";

export const MetricsInfo = () => {
  const currentYear = new Date().getFullYear();
  const revenuePerMonth = useManagerRevenue();
  const earningsTotal = revenuePerMonth.reduce(
    (sum, month) => sum + month.revenue,
    0,
  );
  const totalsColor = setColorByTrend(earningsTotal);

  const best = revenuePerMonth.reduce(
    (max, current) => (current.revenue > max.revenue ? current : max),
    revenuePerMonth[0],
  );
  const highestRevMonth = best.revenue > 0 ? best.month : null;

  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Totals in {currentYear}:{" "}
        <Box component="span" sx={{ color: totalsColor }}>
          {earningsTotal} {localCurrency}
        </Box>
      </Typography>

      <BarChartDisplay revenue={revenuePerMonth} />

      <Divider />

      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          mt: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {highestRevMonth && (
          <>
            <SentimentSatisfiedAltIcon />
            <Typography variant="h6" component="span">
              Hit the spot in {highestRevMonth}, huh? Keep up the good work!
            </Typography>
          </>
        )}
      </Box>
    </Stack>
  );
};
