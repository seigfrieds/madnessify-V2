import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";

interface ErrorBoundaryProps {
  fallback: React.ReactElement;
  children: React.ReactNode;
}

function ErrorBoundary({ fallback, children }: ErrorBoundaryProps) {
  return <SentryErrorBoundary fallback={fallback}>{children}</SentryErrorBoundary>;
}

export default ErrorBoundary;
