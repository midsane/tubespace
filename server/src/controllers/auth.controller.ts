import client from "../db/db";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import userSchema from "../validators/user.validation";
import hashPassword, { comparePassword } from "../utils/auth.utils";
import { ApiResponse } from "../utils/apiResponse";

const jwtSecret = process.env.JWT_SECRET;

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

    if (existingEmail) return res.status(401).json(new ApiResponse(false, {}, "email already exists 😟"));

    const existingUsername = await client.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUsername) return res.status(401).json(new ApiResponse(false, {}, "username already exists 😟"));

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

    jwt.sign(user, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            return res.status(500).json(new ApiResponse(false, {}, "error generating token"));
        }
        res.cookie("token", "Bearer " + token, { httpOnly: true });
    });

    const youtuber = await client.youtuber.create({
        data: {
            userId: user.id,
        },
    });

    const { password: psw, ...userDataToSend } = user;

    res.status(201).json(new ApiResponse(true, { user: userDataToSend, youtuber }, "Youtuber registered successfully 🐺🗿"));
});

const loginYoutuber = asyncHandler(async (req, res) => {
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
            Youtuber: true,
        },
    });

    if (!user) {
        return res.status(400).json(new ApiResponse(false, {}, "user does not exist | invalid email"));
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


    res.status(200).json(new ApiResponse(true, {
        user: userDataToSend,
    }, "Youtuber logged in successfully"));
});

const jwtSign = async ({ userDataToSend, jwtSecret, res }) => {
    return new Promise((resolve, _) => {
        jwt.sign(userDataToSend, jwtSecret, { expiresIn: "10d" }, (err, token) => {
            if (err) {
                return res.status(500).json(new ApiResponse(false, {}, "error generating token"));
            }
            res.cookie("token", "Bearer " + token, { httpOnly: true });
            resolve("done");
        });
    });
};

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

    if (existingEmail) return res.status(401).json(new ApiResponse(false, {}, "email already exists 😟"));

    const existingUsername = await client.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUsername) return res.status(401).json(new ApiResponse(false, {}, "username already exists 😟"));

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
        return;
    }

    jwt.sign(user, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            return res.status(500).json(new ApiResponse(false, {}, "error generating token"));
        }
        res.cookie("token", "Bearer " + token, {
            httpOnly: true,
        });
    });

    const collaborator = await client.collaborator.create({
        data: {
            userId: user.id,
        },
    });

    const { password: psw, ...userDataToSend } = user;

    res.status(201).json(new ApiResponse(true, { user: userDataToSend, collaborator }, "Collaborator registered successfully 🐺🗿"));
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
        return res.status(400).json(new ApiResponse(false, {}, "user does not exist | invalid email"));
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

    jwt.sign(userDataToSend, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            return res.status(500).json(new ApiResponse(false, {}, "error generating token"));
        }
        res.cookie("token", "Bearer " + token, { httpOnly: true });
    });

    res.status(200).json(new ApiResponse(true, { user: userDataToSend }, "Collaborator logged in successfully"));
});

const logoutUser = asyncHandler(async (_, res) => {
    res.clearCookie("token");
    res.status(200).json(new ApiResponse(true, {}, "User logged out successfully"));
})

export { registerYoutuber, loginYoutuber, registerCollaborator, loginCollaborator, logoutUser };
