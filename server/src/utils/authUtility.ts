import { ApiResponse } from "./apiResponse";
import jwt from "jsonwebtoken";

type Unit =
    | "Years"
    | "Year"
    | "Yrs"
    | "Yr"
    | "Y"
    | "Weeks"
    | "Week"
    | "W"
    | "Days"
    | "Day"
    | "D"
    | "Hours"
    | "Hour"
    | "Hrs"
    | "Hr"
    | "H"
    | "Minutes"
    | "Minute"
    | "Mins"
    | "Min"
    | "M"
    | "Seconds"
    | "Second"
    | "Secs"
    | "Sec"
    | "s"
    | "Milliseconds"
    | "Millisecond"
    | "Msecs"
    | "Msec"
    | "Ms";

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;

export const jwtSign = async ({
    userDataToSend,
    jwtSecret,
    res,
    expiresIn = "10d",
}: {
    userDataToSend: any;
    jwtSecret: string;
    res: any;
    expiresIn?: StringValue;
}) => {
    return new Promise((resolve, _) => {
        jwt.sign(userDataToSend, jwtSecret, { expiresIn: expiresIn }, (err, token) => {
            if (err) {
                return res.status(500).json(new ApiResponse(false, {}, "error generating token"));
            }
            res.cookie("token", "Bearer " + token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                ...(process.env.NODE_ENV === "production" ? { sameSite: "none" } : {}),
            });
            resolve("done");
        });
    });
};
