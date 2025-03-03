import { Request, Response, NextFunction } from "express";
import { RequestType } from "../types/types";

interface RequestHandler {
    (req: RequestType, res: Response, next: NextFunction): any;
}

const asyncHandler = (requestHandler: RequestHandler) => {
    return (req: RequestType, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };
