import ErrorPage from "@/components/ErrorPage.tsx";
import "./callback.scss";
import { handleSpotifyCallbackAsync } from "@/modules/auth/login-to-spotify.ts";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { z } from "zod/v4";
import Spinner from "@/components/Spinner.tsx";

const queryParamsSchema = z.object({
  code: z.string().optional(),
  state: z.string(),
  error: z.string().optional(),
});

export const Route = createFileRoute("/callback")({
  validateSearch: queryParamsSchema,
  loaderDeps: ({ search: { code, state, error } }) => ({ code, state, error }),
  loader: async ({ deps: { code, state, error } }) => {
    await handleSpotifyCallbackAsync(state, code, error);
  },
  pendingComponent: () => (
    <main id="token-loading-screen">
      <Spinner />
    </main>
  ),
  errorComponent: () => <ErrorPage redirectRoute="/" redirectText="Go back to Login" />,
  component: () => <Navigate to="/home" />,
});
