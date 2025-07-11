import * as Sentry from "@sentry/node";
import config from "#config.js";
import logger from "#libs/logger.js";

logger.info("Starting Sentry");

Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.NODE_ENV,
    //traces is for perfomrance tracking
    tracesSampleRate: config.ENV_IS_PRODUCTION ? 0.2 : 1.0,
});
