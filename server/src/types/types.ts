import { Request } from "express";

export interface RequestType extends Request {
    user?: any;
    body: any;
    cookies: any;
    header: any;
    query: any;
    file?: any;
    files?: any;
    params: any;
}
