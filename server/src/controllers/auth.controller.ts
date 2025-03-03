import client from "../db/db";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import userSchema from "../validators/user.validation";
import hashPassword, { comparePassword } from "../utils/auth.utils";

const jwtSecret = process.env.JWT_SECRET;

const registerYoutuber = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const { error, value } = userSchema.validate({ username, email, password });

    if (error) {
        res.status(400).json({ data: {}, message: error.message });
    }

    const existingEmail = await client.user.findFirst({
        where: {
            email,
        },
    });

    if (existingEmail) res.status(401).json({ data: {}, message: "email already exists 😟" });

    const existingUsername = await client.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUsername) res.status(401).json({ data: {}, message: "username already exists 😟" });

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
        res.status(500).json({ data: {}, message: "JWT secret is not defined" });
        return;
    }

    jwt.sign(user, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            res.status(500).json({ data: {}, message: "error generating token" });
        }
        res.cookie("token", "Bearer " + token, { httpOnly: true });
    });

    const youtuber = await client.youtuber.create({
        data: {
            userId: user.id,
        },
    });

    const { password: psw, ...userDataToSend } = user;

    res.status(201).json({
        data: { user: userDataToSend, youtuber },
        message: "Youtuber registered successfully 🐺🗿",
    });
});

const loginYoutuber = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error, value } = userSchema.validate({ username: "midsane", email, password });

    if (error) {
        res.status(400).json({ data: {}, message: error.message });
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
        res.status(400);
        throw new Error("user does not exist | invalid email");
    }

    console.log(user);

    try {
        await comparePassword(password, user.password);
    } catch (error) {
        res.status(403).json({ data: {}, message: "invalid password!" });
    }

    if (!jwtSecret) {
        res.status(500).json({ data: {}, message: "JWT secret is not defined" });
        return;
    }

    const { password: psw, ...userDataToSend } = user;

    jwt.sign(userDataToSend, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            res.status(500).json({ data: {}, message: "error generating token" });
        }
        res.cookie("token", "Bearer " + token, { httpOnly: true });
    });

    res.status(200).json({ data: userDataToSend, message: "Youtuber logged in successfully" });
});

const registerCollaborator = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const { error } = userSchema.validate({ username, email, password });

    if (error) {
        res.status(400).json({ data: {}, message: error.message });
    }

    const existingEmail = await client.user.findFirst({
        where: {
            email,
        },
    });

    if (existingEmail) res.status(401).json({ data: {}, message: "email already exists 😟" });

    const existingUsername = await client.user.findFirst({
        where: {
            username,
        },
    });

    if (existingUsername) res.status(401).json({ data: {}, message: "username already exists 😟" });

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
        res.status(500).json({ data: {}, message: "JWT secret is not defined" });
        return;
    }

    jwt.sign(user, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            res.status(500).json({ data: {}, message: "error generating token" });
        }
        res.cookie("token", "Bearer " + token, { httpOnly: true });
    });

    const collaborator = await client.collaborator.create({
        data: {
            userId: user.id,
        },
    });

    const { password: psw, ...userDataToSend } = user;

    res.status(201).json({
        data: { user: userDataToSend, collaborator },
        message: "Collaborator registered successfully 🐺🗿",
    });
});

const loginCollaborator = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error, value } = userSchema.validate({ username: "midsane", email, password });

    if (error) {
        res.status(400).json({ data: {}, message: error.message });
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
        res.status(400);
        throw new Error("user does not exist | invalid email");
    }

    try {
        await comparePassword(password, user.password);
    } catch (error) {
        res.status(403).json({ data: {}, message: "invalid password!" });
    }

    if (!jwtSecret) {
        res.status(500).json({ data: {}, message: "JWT secret is not defined" });
        return;
    }

    const { password: psw, ...userDataToSend } = user;

    jwt.sign(userDataToSend, jwtSecret, { expiresIn: "10d" }, (err, token) => {
        if (err) {
            res.status(500).json({ data: {}, message: "error generating token" });
        }
        res.cookie("token", "Bearer " + token, { httpOnly: true });
    });

    res.status(200).json({ data: userDataToSend, message: "Collaborator logged in successfully" });
});

export { registerYoutuber, loginYoutuber, registerCollaborator, loginCollaborator };
