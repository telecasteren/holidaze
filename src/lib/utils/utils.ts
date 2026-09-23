/** Trims whitespace and lowercases a string, for case-insensitive comparison. */
export const normalize = (s: string) => s.trim().toLowerCase();

/** Rounds a number to at most 2 decimals. */
const roundMaxDecimals = (value: number): number => {
  return +value.toFixed(2);
};

/**
 * Formats a number as Norwegian kroner (NOK), e.g. `1 234,5 kr`, with up to 2 decimals.
 *
 * @param value - Amount to format.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: "NOK",
    style: "currency",
  }).format(roundMaxDecimals(value));
};
