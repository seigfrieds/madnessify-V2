import * as Sentry from "@sentry/react";
import "./Main.scss";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Config from "./config.ts";
import { routeTree } from "./routeTree.gen.ts";

Sentry.init({
  dsn: Config.SENTRY_DSN,
  environment: Config.ENV_TYPE,
  integrations: [Sentry.browserTracingIntegration()],
  //browser tracing -> for performance tracking
  tracesSampleRate: Config.ENV_TYPE === "production" ? 0.2 : 1.0,
  tracePropagationTargets: ["localhost", Config.API_URL],
});

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element.");
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>Something went terribly wrong...</h1>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
