/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: "development" | "test" | "production";
  readonly VITE_API_URL: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
