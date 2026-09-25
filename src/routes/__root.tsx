import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ToasterDisplay } from "@/components/layout/ToasterDisplay";

import { getSession } from "@/server/authFunctions";

import "@/styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import AppTheme from "@/components/shared-theme/AppTheme";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

import { brandSettings } from "@/lib/brand/brandSettings";
import { CustomError } from "@/lib/route-states/CustomError";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";

import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitColorSchemeScript defaultMode="light" />
        <HeadContent />
      </head>
      <body>
        <AppTheme disableCustomTheme={disableCustomTheme}>
          <CssBaseline enableColorScheme />
          <ToasterDisplay />
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
