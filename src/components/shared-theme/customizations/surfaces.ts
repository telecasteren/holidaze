import type { Theme, Components } from "@mui/material/styles";

import {
  MuiAccordion,
  MuiCard,
  MuiPaper,
} from "@/components/shared-theme/customizations/surfaces/index";

export const surfacesCustomizations: Components<Theme> = {
  ...MuiAccordion,
  ...MuiCard,
  ...MuiPaper,
};
