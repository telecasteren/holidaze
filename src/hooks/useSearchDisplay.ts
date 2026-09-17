import { Route } from "@/routes/venues/index";
import { useBookingSummary } from "@/hooks/useBookingSummary";
import { formatCalendarDate } from "@/lib/utils/formatCalendarDate";
import { useForm } from "react-hook-form";
import type { ExploreSearchForm } from "@/lib/zod/index";

export const useSearchDisplay = () => {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();

  const { control, watch } = useForm<ExploreSearchForm>({
    values: {
      query: searchParams.query,
      guests: searchParams.guests,
      dateRange:
        searchParams.dateFrom && searchParams.dateTo
          ? {
              start: formatCalendarDate(searchParams.dateFrom),
              end: formatCalendarDate(searchParams.dateTo),
            }
          : null,
    },
  });
  const values = watch();
  const { dates } = useBookingSummary(values.dateRange);

  const handleSearch = () => {
    const { query, guests, dateRange } = values;

    navigate({
      search: (prev) => ({
        ...prev,
        query: query.trim(),
        guests,
        dateFrom: dateRange?.start.toString(),
        dateTo: dateRange?.end.toString(),
        page: 1,
      }),
    });
  };

  return {
    control,
    values,
    dates,
    handleSearch,
  };
};
