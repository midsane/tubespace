import { Request, Response, NextFunction } from "express";

interface RequestHandler {
    (req: any, res: Response, next: NextFunction): any;
}

const asyncHandler = (requestHandler: RequestHandler) => {
    return (req: any, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };