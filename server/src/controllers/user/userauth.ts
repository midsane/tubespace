import { Response } from "express";
import { ApiResponse } from "../../utils/apiresponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { client } from "../../db/connectToDb";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const saltRounds = 10;

const login = asyncHandler(async (req: any, res: Response) => {
    const { email, password } = req.body;
    const userExist = await client.user.findFirst({ where: { email } });
    if (!userExist) return res.status(400).json(new ApiResponse(null, "user does not exist"));

    if (userExist.Oauth) {
        return;
    }

    const hashedInputPassword = await bcrypt.hash(password, userExist.salt as string)
    if (hashedInputPassword !== userExist.password)
        return res.status(401).json(new ApiResponse(null, "wrong password"));

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server err"))

    const token = jwt.sign({ id: userExist.id }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("token", "Bearer " + token, {
        secure: process.env.MODE !== "development",
        httpOnly: true,
        sameSite: "lax"
    })

    res.status(200).json(new ApiResponse(userExist, "user logged in successfully!"));

})



const signup = asyncHandler(async (req: any, res: Response) => {
    const { email, password, role } = req.body;
    if (typeof email !== "string" || typeof password !== "string" || typeof role !== "string")
        return res.status(400).json(new ApiResponse(null, "invalid data type"));

    const emailExist = await client.user.findFirst({ where: { email } });
    if (emailExist) return res.status(400).json(new ApiResponse(null, "email already exist"));

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await client.user.create({
        data: {
            email,
            password: hashedPassword,
            salt: salt,
            role: role.trim().toLowerCase() === "editor" ? "EDITOR" : "YOUTUBER"
        }
    })

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server err"))

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("token", "Bearer " + token, {
        secure: process.env.MODE !== "development",
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json(new ApiResponse(user, "user created successfully"));

})

export {
    login,
    signup
}