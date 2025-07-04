import pino from "pino";
import pretty from "pino-pretty";
import config from "#config.js";

//pretty adds overhead to pino -> only in dev
const logger = config.ENV_IS_DEVELOPMENT ? pino.default(pretty()) : pino.default();

export default logger;
