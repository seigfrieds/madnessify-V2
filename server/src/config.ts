import { z } from "zod/v4";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    SENTRY_DSN: z.url(),
    PORT: z.int(),
    FRONTEND_URL: z.url(),
});

const processEnv = {
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    PORT: Number(process.env.PORT),
    FRONTEND_URL: process.env.FRONTEND_URL,
};

// throws if the process.env does not match the schema
if (processEnv.NODE_ENV !== "test") {
    envSchema.parse(processEnv);
}

const config = {
    ENV_IS_DEVELOPMENT: process.env.NODE_ENV === "development",
    ENV_IS_TEST: process.env.NODE_ENV === "test",
    ENV_IS_PRODUCTION: process.env.NODE_ENV === "production",
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    PORT: Number(process.env.PORT),
    FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;
