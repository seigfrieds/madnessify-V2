import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

export default function correlator(req: Request, res: Response, next: NextFunction): void {
    const correlationIdHeader = req.headers["X-Correlation-Id"];

    const correlationId = Array.isArray(correlationIdHeader)
        ? correlationIdHeader[0] || uuidv4()
        : correlationIdHeader || uuidv4();

    req.correlationId = correlationId;
    res.setHeader("X-Correlation-Id", correlationId);

    next();
}
