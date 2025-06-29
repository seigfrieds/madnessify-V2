import logger from "#libs/logger.js";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
): void {
    logger.error({ correlationId: req.correlationId, err });

    res.status(500).send("Internal Server Error");
}
