// later, when we have more data we can decide based on previous year
// to show trending
export const setColorByTrend = (target: number) => {
  if (target > 5000) return "success.chart";
  if (target < 5000) return "error.main";
  return "text.primary";
};
