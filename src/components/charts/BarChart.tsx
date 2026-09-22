import { useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { MonthlyRevenue } from "@/lib/utils/getMonthlyRevenue";

interface BarChartDisplayProps {
  revenue: MonthlyRevenue[];
}

const SERIES_VALUES = [{ dataKey: "revenue" }];
const Y_AXIS_VALUES = [{}];
const X_AXIS_VALUES = [
  {
    dataKey: "month",
    scaleType: "band" as const,
  },
];

export const BarChartDisplay = ({ revenue }: BarChartDisplayProps) => {
  const theme = useTheme();
  const colors = [(theme.vars || theme).palette.primary.main];

  return (
    <BarChart
      dataset={revenue}
      yAxis={Y_AXIS_VALUES}
      xAxis={X_AXIS_VALUES}
      series={SERIES_VALUES}
      height={300}
      colors={colors}
      borderRadius={8}
    />
  );
};
