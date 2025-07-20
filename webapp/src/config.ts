import { z } from "zod/v4";

const viteEnvSchema = z.object({
  MODE: z.enum(["development", "production"]),
  VITE_API_URL: z.url(),
  VITE_SENTRY_DSN: z.url(),
  VITE_SPOTIFY_CLIENT_ID: z.string(),
  VITE_SPOTIFY_REDIRECT_URI: z.url(),
  VITE_SPOTIFY_AUTH_SCOPE: z.string(),
});

// throws if the .env does not match the schema
viteEnvSchema.parse(import.meta.env);

// if any of these are imported, the validation above will be run
export const validateConfig = (): void => {};
export default {
  ENV_TYPE: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_URL,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
  SPOTIFY_AUTH_SCOPE: import.meta.env.VITE_SPOTIFY_AUTH_SCOPE,
};
