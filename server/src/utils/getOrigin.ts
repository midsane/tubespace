import { customRequest } from "../types/types";

export const getOrigin = (req: customRequest) => {
    return req.headers.origin || `${req.protocol}://${req.get('host')}`;
};

export const getRedirectUri = (req: customRequest) => {
    const origin = getOrigin(req);
    console.log("Origin:", origin);
    const redirectUri = new URL(origin);
    redirectUri.pathname = req.baseUrl + req.path;
    return redirectUri.toString();
}