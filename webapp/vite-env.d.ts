/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: "development" | "test" | "production";
  readonly VITE_API_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_REDIRECT_URI: string;
  readonly VITE_SPOTIFY_AUTH_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
