import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Toaster } from "react-hot-toast";

import { getSession } from "@/server/authFunctions";

import "../styles.css";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "@/components/shared-theme/AppTheme";
import Header from "#/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

import { brandSettings } from "@/lib/brand/brandSettings";
import { CustomError } from "@/lib/route-states/CustomError";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content: `${brandSettings.description}`,
      },
      {
        title: `${brandSettings.name} — ${brandSettings.tagline}`,
      },
    ],
    links: [
      {
        rel: "icon",
        href: `${brandSettings.logo}`,
      },
    ],
  }),
  beforeLoad: async () => {
    const user = await getSession();
    return {
      user,
    };
  },
  shellComponent: RootDocument,
  errorComponent: CustomError,
  notFoundComponent: DefaultNotFound,
});

function RootDocument({
  children,
  disableCustomTheme,
}: {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}) {
  const theme = useTheme();
  const v = theme.vars || theme;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              color: v.palette.info.dark,
              backgroundColor: v.palette.info.light,
              border: `1px solid ${v.palette.info.main}`,
            },
            success: {
              style: {
                color: v.palette.success.dark,
                backgroundColor: v.palette.success.light,
                border: `1px solid ${v.palette.success.main}`,
              },
            },
            error: {
              style: {
                color: v.palette.error.dark,
                backgroundColor: v.palette.error.light,
                border: `1px solid ${v.palette.error.main}`,
              },
            },
          }}
        />
        <AppTheme disableCustomTheme={disableCustomTheme}>
          <CssBaseline enableColorScheme />
          <Header />
          <main>{children}</main>
          <Footer />
        </AppTheme>
        <TanStackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
