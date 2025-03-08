import { Request } from "express";

export interface RequestType extends Request {
    user?: any;
    body: any;    
    cookies: any; 
    header: any; 
}
