import { customRequest } from "../types/types";

export const getOrigin = (req: customRequest) => {
    return req.headers.origin || `${req.protocol}://${req.get('host')}`;
};

