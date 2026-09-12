import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { CustomPending } from "@/lib/route-states/CustomPending";
import { DefaultNotFound } from "@/lib/route-states/DefaultNotFound";

import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getContext } from "./integrations/tanstack-query/root-provider";

export function getRouter() {
  const context = getContext();

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    defaultPendingComponent: CustomPending,
    defaultPendingMs: 300,
    defaultNotFoundComponent: DefaultNotFound,
  });

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
