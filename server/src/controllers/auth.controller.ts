import client from "../db/db";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import userSchema from "../validators/user.validation";
import hashPassword, { comparePassword } from "../utils/auth.utils";
import { ApiResponse } from "../utils/apiResponse";

const jwtSecret = process.env.JWT_SECRET;

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

const jwtSign = async ({
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
                sameSite: "none",
            });
            resolve("done");
        });
    });
};

const registerYoutuber = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const { error } = userSchema.validate({ username, email, password });

    if (error) {
        return res.status(400).json(new ApiResponse(false, {}, error.message));
    }

    const existingEmail = await client.user.findFirst({
        where: {
            email,
        },
    });

    if (existingEmail)
        return res.status(401).json(new ApiResponse(false, {}, "email already exists 😟"));

    const existingUsername = await client.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUsername)
        return res.status(401).json(new ApiResponse(false, {}, "username already exists 😟"));

    const hashedPassword = await hashPassword(password);

    const user = await client.user.create({
        data: {
            email,
            password: hashedPassword,
            username,
            role: "youtuber",
        },
    });

    if (!jwtSecret) {
        return res.status(500).json(new ApiResponse(false, {}, "JWT secret is not defined"));
    }

    await jwtSign({ userDataToSend: user, jwtSecret, res });

    const youtuber = await client.youtuber.create({
        data: {
            userId: user.id,
        },
    });

    const { password: psw, ...userDataToSend } = user;

    res.status(201).json(
        new ApiResponse(
            true,
            { user: userDataToSend, youtuber },
            "Youtuber registered successfully 🐺🗿",
        ),
    );
});

const loginYoutuber = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error } = userSchema.validate({ username: "midsane", email, password });

    console.log("here");
    if (error) {
        return res.status(400).json(new ApiResponse(false, {}, error.message));
    }
    const user = await client.user.findUnique({
        where: {
            email,
        },
        include: {
            Youtuber: true,
        },
    });

    if (!user) {
        return res
            .status(400)
            .json(new ApiResponse(false, {}, "user does not exist | invalid email"));
    }

    try {
        await comparePassword(password, user.password);
    } catch (error) {
        return res.status(403).json(new ApiResponse(false, {}, "invalid password!"));
    }

    if (!jwtSecret) {
        return res.status(500).json(new ApiResponse(false, {}, "JWT secret is not defined"));
    }

    const { password: psw, ...userDataToSend } = user;

    await jwtSign({ userDataToSend, jwtSecret, res });

    console.log("here-again");

    res.status(200).json(
        new ApiResponse(
            true,
            {
                user: userDataToSend,
            },
            "Youtuber logged in successfully",
        ),
    );
});

const registerCollaborator = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const { error } = userSchema.validate({ username, email, password });

    if (error) {
        return res.status(400).json(new ApiResponse(false, {}, error.message));
    }

    const existingEmail = await client.user.findFirst({
        where: {
            email,
        },
    });

    if (existingEmail)
        return res.status(401).json(new ApiResponse(false, {}, "email already exists 😟"));

    const existingUsername = await client.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUsername)
        return res.status(401).json(new ApiResponse(false, {}, "username already exists 😟"));

    const hashedPassword = await hashPassword(password);

    const user = await client.user.create({
        data: {
            email,
            password: hashedPassword,
            username,
            role: "collaborator",
        },
    });

    if (!jwtSecret) {
        return res.status(500).json(new ApiResponse(false, {}, "JWT secret is not defined"));
    }

    await jwtSign({ userDataToSend: user, jwtSecret, res });

    const collaborator = await client.collaborator.create({
        data: {
            userId: user.id,
        },
    });

    const { password: psw, ...userDataToSend } = user;

    res.status(201).json(
        new ApiResponse(
            true,
            { user: userDataToSend, collaborator },
            "Collaborator registered successfully 🐺🗿",
        ),
    );
});

const loginCollaborator = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error } = userSchema.validate({ username: "midsane", email, password });

    if (error) {
        return res.status(400).json(new ApiResponse(false, {}, error.message));
    }
    const user = await client.user.findUnique({
        where: {
            email,
        },
        include: {
            Collaborator: true,
        },
    });

    if (!user) {
        return res
            .status(400)
            .json(new ApiResponse(false, {}, "user does not exist | invalid email"));
    }

    try {
        await comparePassword(password, user.password);
    } catch (error) {
        return res.status(403).json(new ApiResponse(false, {}, "invalid password!"));
    }

    if (!jwtSecret) {
        return res.status(500).json(new ApiResponse(false, {}, "JWT secret is not defined"));
    }

    const { password: psw, ...userDataToSend } = user;

    await jwtSign({ userDataToSend, jwtSecret, res });

    res.status(200).json(
        new ApiResponse(true, { user: userDataToSend }, "Collaborator logged in successfully"),
    );
});

const logoutUser = asyncHandler(async (_, res) => {
    res.clearCookie("token");
    res.status(200).json(new ApiResponse(true, {}, "User logged out successfully"));
});

export { registerYoutuber, loginYoutuber, registerCollaborator, loginCollaborator, logoutUser };
