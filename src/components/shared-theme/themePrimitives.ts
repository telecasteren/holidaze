import { createTheme, alpha } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    tertiary: string;
  }

  interface TypeSuccess {
    chart: string;
  }

  interface TypeText {
    tertiary: string;
  }

  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

export const brand = {
  50: "hsl(210, 100%, 95%)", // #e3f3ff
  100: "hsl(210, 100%, 92%)", // #bbe1ff
  200: "hsl(210, 100%, 80%)", // #8dceff
  300: "hsl(210, 100%, 65%)", // #5abbff
  400: "hsl(210, 98%, 48%)", // #2babff
  500: "hsl(210, 98%, 42%)", // #009cff
  600: "hsl(210, 98%, 55%)", // #008dff
  700: "hsl(210, 98%, 34%)", // "#0257AC"
  800: "hsl(210, 100%, 16%)", // #0d68e0
  900: "hsl(210, 100%, 21%)", // #1647c1
};
// dark btn: hsl(210, 98%, 34%) // #0257AC
export const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

export const green = {
  50: "hsl(120, 80%, 98%)", // #f6fef6
  100: "hsl(120, 75%, 94%)", // #e4fbe4
  200: "hsl(120, 75%, 87%)", // #c5f7c5
  300: "hsl(120, 61%, 77%)", // #a1e8a1
  400: "hsl(120, 44%, 53%)", // #52bc52
  500: "hsl(120, 59%, 30%)", // #1f7a1f
  600: "hsl(120, 70%, 25%)", // #136c13
  700: "hsl(120, 75%, 16%)", // #0a470a
  800: "hsl(120, 84%, 10%)", // #042f04
  900: "hsl(120, 87%, 6%)", // #021d02
};

export const orange = {
  50: "hsl(45, 100%, 97%)",
  100: "hsl(45, 92%, 90%)",
  200: "hsl(45, 94%, 80%)",
  300: "hsl(45, 90%, 65%)",
  400: "hsl(45, 90%, 40%)",
  500: "hsl(45, 90%, 35%)",
  600: "hsl(45, 91%, 25%)",
  700: "hsl(45, 94%, 20%)",
  800: "hsl(45, 95%, 16%)",
  900: "hsl(45, 93%, 12%)",
};

export const red = {
  50: "hsl(0, 100%, 97%)",
  100: "hsl(0, 92%, 90%)",
  200: "hsl(0, 94%, 80%)",
  300: "hsl(0, 90%, 65%)",
  400: "hsl(0, 90%, 40%)",
  500: "hsl(0, 90%, 30%)",
  600: "hsl(0, 91%, 25%)",
  700: "hsl(0, 94%, 18%)",
  800: "hsl(0, 95%, 12%)",
  900: "hsl(0, 93%, 6%)",
};

// dark btn: #0257AC
// light btn:

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      info: {
        light: brand[100],
        main: brand[400],
        dark: brand[700],
        contrastText: gray[50],
      },
      warning: {
        light: orange[200],
        main: orange[400],
        dark: orange[700],
      },
      error: {
        light: red[100],
        main: red[300],
        dark: red[800],
      },
      success: {
        light: green[100],
        main: green[300],
        dark: green[800],
        chart: green[500],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: "hsl(0, 0%, 99%)", // #fcfcfc
        paper: "hsl(220, 35%, 97%)", // #F5F6FA
        tertiary: gray[50],
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        tertiary: gray[900],
        light: gray[50],
        warning: orange[400],
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400],
        dark: brand[700],
      },
      info: {
        contrastText: brand[300],
        light: brand[100],
        main: brand[400],
        dark: brand[700],
      },
      warning: {
        light: orange[200],
        main: orange[400],
        dark: orange[800],
      },
      error: {
        light: red[200],
        main: red[400],
        dark: red[800],
      },
      success: {
        light: green[200],
        main: green[400],
        dark: green[800],
        chart: green[400],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: "hsl(214, 10%, 14%)", // #202327
        paper: "hsl(220, 30%, 7%)", // #0C1017
        tertiary: gray[50],
      },
      text: {
        primary: "hsl(0, 0%, 100%)",
        secondary: gray[400],
        tertiary: gray[900],
        light: gray[50],
      },
      action: {
        hover: alpha(gray[600], 0.2),
        selected: alpha(gray[600], 0.3),
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
    },
  },
};

export const typography = {
  fontFamily: "Roboto, sans-serif",
  h1: {
    fontFamily: '"Century Gothic", Roboto, sans-serif',
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: '"Century Gothic", Roboto, sans-serif',
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: '"Century Gothic", Roboto, sans-serif',
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(16),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(16),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

// @ts-ignore - ignore types for this
const defaultShadows: Shadows = [
  "none",
  "var(--template-palette-baseShadow)",
  ...defaultTheme.shadows.slice(2),
];
export const shadows = defaultShadows;
