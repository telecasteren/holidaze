import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from "react-hot-toast";

import '../styles.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/components/shared-theme/AppTheme';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { brandSettings } from '@/lib/brand/brandSettings';
import { CustomError } from "@/lib/route-states/CustomError";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
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
  shellComponent: RootDocument,
  errorComponent: CustomError,
  notFoundComponent: DefaultNotFound,
})

function RootDocument({ children, disableCustomTheme }: { children: React.ReactNode; disableCustomTheme?: boolean }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 4000,
            style: {
              color: "#1e40af",
              backgroundColor: "#dbeafe",
              border: "1px solid #93c5fd",
            },
            success: {
              style: {
                color: "#166534",
                backgroundColor: "#f0fdf4",
                border: "1px solid #86efac",
              },
            },
            error: {
              style: {
                color: "#991b1b",
                backgroundColor: "#fef2f2",
                border: "1px solid #fca5a5",
              },
            },
          }}
        />
        <AppTheme disableCustomTheme={disableCustomTheme}>
          <CssBaseline enableColorScheme />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AppTheme>
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
