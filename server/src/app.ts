import errorHandler from "#middlewares/error.js";
import notFoundHandler from "#middlewares/not-found.js";
import express from "express";
import config from "#config.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import correlator from "#middlewares/correlator.js";
import logger from "#libs/logger.js";
import * as Sentry from "@sentry/node";

const app = express();

app.use(morgan("dev"));
app.use(
    cors({
        origin: config.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(helmet());
app.use(correlator);

app.get("/", (req, res) => {
    logger.info({ correlationId: req.correlationId }, "GET /");

    res.send("Hello World!");
});

app.get("/error", (req, _res) => {
    logger.error({ correlationId: req.correlationId }, "GET /error");

    throw Error("Error!");
});

app.use(notFoundHandler); //should be after all routes
Sentry.setupExpressErrorHandler(app); //should be before error-handling middlewares
app.use(errorHandler); //should be very very last

export default app;
