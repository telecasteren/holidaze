import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";

/**
 * Holds the selected sort option, starting with the first entry in `options`.
 *
 * @param options - Allowed option values.
 * @returns The current `option` and `handleChange` for a MUI Select.
 */
export const useSortOption = <T extends string>(options: readonly T[]) => {
  const [option, setOption] = useState<T>(options[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as T);
  };

  return { option, handleChange };
};
