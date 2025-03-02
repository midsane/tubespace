import client from "../db/db";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import userSchema from "../validators/user.validation";
import hashPassword from "../utils/auth.utils";

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

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ data: {}, message: "JWT secret is not defined" });
    return;
  }

  jwt.sign(user, jwtSecret, { expiresIn: "30d" }, (err, token) => {
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

  res
    .status(201)
    .json({ data: { user, youtuber }, message: "Youtuber registered successfully 🐺🗿" });
});

const loginYoutuber = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400);
    throw new Error("user does not exist | invalid email");
  }

  if (user.password !== password) {
    res.status(400);
    throw new Error("invalid password");
  }

  res.status(200).json({ data: user, message: "Youtuber logged in successfully" });
});

export { registerYoutuber, loginYoutuber };
