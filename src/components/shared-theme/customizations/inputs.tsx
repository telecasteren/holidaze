import type { Theme, Components } from "@mui/material/styles";

import {
  MuiButton,
  MuiCheckbox,
  MuiFormLabel,
  MuiIconButton,
  MuiInputAdornment,
  MuiInputBase,
  MuiOutlinedInput,
  MuiToggleButton,
} from "@/components/shared-theme/customizations/inputs/index";

export const inputsCustomizations: Components<Theme> = {
  ...MuiButton,
  ...MuiCheckbox,
  ...MuiFormLabel,
  ...MuiIconButton,
  ...MuiInputAdornment,
  ...MuiInputBase,
  ...MuiOutlinedInput,
  ...MuiToggleButton,
};
