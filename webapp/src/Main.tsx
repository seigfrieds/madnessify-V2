import "./Main.css";
import * as Sentry from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Config from "./config.ts";

Sentry.init({
  dsn: Config.SENTRY_DSN,
  environment: Config.ENV_TYPE,
  integrations: [Sentry.browserTracingIntegration()],
  //browser tracing -> for performance tracking
  tracesSampleRate: Config.ENV_TYPE === "production" ? 0.2 : 1.0,
  tracePropagationTargets: ["localhost", Config.API_URL],
});

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element.");
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>Something went terribly wrong...</h1>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
