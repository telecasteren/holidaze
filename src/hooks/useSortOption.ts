import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";

export const useSortOption = <T extends string>(options: readonly T[]) => {
  const [option, setOption] = useState<T>(options[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as T);
  };

  return { option, handleChange };
};
