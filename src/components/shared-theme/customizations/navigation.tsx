import type { Theme, Components } from "@mui/material/styles";

import {
  MuiDrawer,
  MuiLink,
  MuiMenu,
  MuiMenuItem,
  MuiPaginationItem,
  MuiSelect,
  MuiStep,
  MuiTabs,
} from "@/components/shared-theme/customizations/navigation/index";

export const navigationCustomizations: Components<Theme> = {
  ...MuiDrawer,
  ...MuiLink,
  ...MuiMenu,
  ...MuiMenuItem,
  ...MuiPaginationItem,
  ...MuiSelect,
  ...MuiStep,
  ...MuiTabs,
};
