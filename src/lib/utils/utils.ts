export const PAGE_SIZE = 10;

export const normalize = (s: string) => s.trim().toLowerCase();

const roundMaxDecimals = (value: number): number => {
  return +value.toFixed(2);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: "NOK",
    style: "currency",
  }).format(roundMaxDecimals(value));
};

// format date to fit Norwegian date formats
export const formatDate = (value: string): string => {
  const iso = value;
  const date = new Date(iso);

  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  const formatted = `${dd}.${mm}.${yyyy}`;
  return formatted;
}

export const getAllMediaUrls = (urls: string[]) => urls.map((url) => url.trim()).filter(Boolean);
