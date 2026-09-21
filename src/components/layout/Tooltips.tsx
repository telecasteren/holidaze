import React from "react";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import type { TooltipProps } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip describeChild {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: (theme.vars || theme).palette.background.tertiary,
    color: (theme.vars || theme).palette.text.tertiary,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

type TooltipWithContentProps = {
  trigger: React.ReactElement;
  children: React.ReactNode;
};

export const TooltipWithContent = ({
  trigger,
  children,
}: TooltipWithContentProps) => {
  return (
    <HtmlTooltip title={<React.Fragment>{children}</React.Fragment>}>
      {trigger}
    </HtmlTooltip>
  );
};
