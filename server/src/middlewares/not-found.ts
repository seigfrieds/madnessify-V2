import { Request, Response, NextFunction } from "express";

export default function notFoundHandler(req: Request, res: Response, _next: NextFunction): void {
    res.status(404).send("Not Found");
}
