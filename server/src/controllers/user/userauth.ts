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

    const token = jwt.sign({ id: userExist.id, name: userExist.name, email: userExist.email }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("token", "Bearer " + token, {
        secure: process.env.MODE !== "development",
        httpOnly: true,
        sameSite: "lax"
    })
    const { password: psw, salt, ...filteredData } = userExist;
    res.status(200).json(new ApiResponse(filteredData, "user logged in successfully!"));

})



const signup = asyncHandler(async (req: any, res: Response) => {
    const { email, password, role } = req.body;
    if (typeof email !== "string" || !email.includes("@") || typeof password !== "string" || typeof role !== "string")
        return res.status(400).json(new ApiResponse(null, "invalid data type"));

    const emailExist = await client.user.findFirst({ where: { email } });
    if (emailExist) return res.status(400).json(new ApiResponse(null, "email already exist"));

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDetail = await client.user.create({
        data: {
            email,
            password: hashedPassword,
            salt: salt,
            role: role.trim().toLowerCase() === "editor" ? "EDITOR" : "YOUTUBER"
        }
    })

    const user = await client.user.update({
        where: { id: userDetail.id },
        data: {
            name: userDetail.email.trim().split("@")[0] + userDetail.id,
        }
    })

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server err"))

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("token", "Bearer " + token, {
        secure: process.env.MODE !== "development",
        httpOnly: true,
        sameSite: "lax"
    })

    const { password: psw, salt: sl, ...filteredData } = user
    return res.status(200).json(new ApiResponse(filteredData, "user created successfully"));

})

const checkAuth = asyncHandler(async (req: any, res: Response) => {
    const userid = req.user?.id;
    if (!userid) return res.status(403).json(new ApiResponse(null, "user not authenticated"));

    const user = await client.user.findUnique({ where: { id: userid } });
    if (!user) return res.status(404).json(new ApiResponse(null, "user does not exist"));

    const { password: psw, salt, ...filteredData } = user;
    res.status(200).json(new ApiResponse(filteredData, "user is authenticated"));
})

const logout = asyncHandler(async (req: any, res: Response) => {
    res.clearCookie("token", {
        secure: process.env.MODE !== "development",
        httpOnly: true,
        sameSite: "lax"
    });
    res.status(200).json(new ApiResponse(null, "user logged out successfully!"));
})

export {
    login,
    signup,
    checkAuth,
    logout
}