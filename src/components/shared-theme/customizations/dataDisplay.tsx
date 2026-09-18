import type { Theme, Components } from "@mui/material/styles";

import {
  MuiTablePagination,
  MuiIcon,
  MuiChip,
  MuiList,
  MuiListItem,
  MuiListItemText,
  MuiListSubheader,
  MuiListItemIcon,
} from "@/components/shared-theme/customizations/dataDisplays/index";

export const dataDisplayCustomizations: Components<Theme> = {
  ...MuiTablePagination,
  ...MuiIcon,
  ...MuiChip,
  ...MuiList,
  ...MuiListItem,
  ...MuiListItemText,
  ...MuiListSubheader,
  ...MuiListItemIcon,
};
