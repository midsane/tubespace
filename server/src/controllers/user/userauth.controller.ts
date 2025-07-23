import { Response } from "express";
import { ApiResponse } from "../../utils/apiresponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { client } from "../../db/connectToDb";
import bcrypt from "bcrypt"
import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken"
import { jwtSecretConfig, mode, OauthConfig } from "../../config";
import { getOrigin } from "../../utils/getOrigin";

const saltRounds = 10;

const GOOGLE_CLIENT_ID = OauthConfig.GOOGLE_CLIENT_ID
const YOUR_REDIRECT_URI = OauthConfig.YOUR_REDIRECT_URI;
const GOOGLE_CLIENT_SECRET = OauthConfig.GOOGLE_CLIENT_SECRET



const login = asyncHandler(async (req: any, res: Response) => {
    const redirect_uri = getOrigin(req) + YOUR_REDIRECT_URI;
    console.log("redirect_uri:", redirect_uri, "\n");
    const { email, password } = req.body;
    const userExist = await client.user.findFirst({ where: { email } });
    if (!userExist) return res.status(400).json(new ApiResponse(null, "user does not exist"));

    const hashedInputPassword = await bcrypt.hash(password, userExist.salt as string)
    if (hashedInputPassword !== userExist.password)
        return res.status(401).json(new ApiResponse(null, "wrong password"));

    const jwtSecret = jwtSecretConfig
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server err"))

    const token = jwt.sign({ id: userExist.id, name: userExist.name, email: userExist.email, role: userExist.role }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("token", "Bearer " + token, {
        secure: mode !== "development",
        httpOnly: true,
        sameSite: mode === "development" ? "lax" : "none"
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
            name: email,
            password: hashedPassword,
            salt: salt,
            role: role.trim().toLowerCase() === "editor" ? "EDITOR" : "YOUTUBER"
        }
    })


    const jwtSecret = jwtSecretConfig
    if (!jwtSecret)
        return res.status(500).json(new ApiResponse(null, "internal server err"))

    const token = jwt.sign({ id: userDetail.id, name: userDetail.name, email: userDetail.email, role: userDetail.role }, jwtSecret, { expiresIn: "2d" })

    if (!token)
        return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

    res.cookie("token", "Bearer " + token, {
        secure: mode !== "development",
        httpOnly: true,
        sameSite: mode === "development" ? "lax" : "none"
    })

    const { password: psw, salt: sl, ...filteredData } = userDetail
    return res.status(200).json(new ApiResponse(filteredData, "user created successfully"));

})

const resetPassword = asyncHandler(async (req: any, res: Response) => {
    const { password, email } = req.body;
    if (typeof email !== "string" || !email.includes("@") || typeof password !== "string")
        return res.status(400).json(new ApiResponse(null, "invalid data type"));

    const emailExist = await client.user.findFirst({ where: { email } });
    if (!emailExist) return res.status(400).json(new ApiResponse(null, "email doesn't exist"));

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await client.user.update({
        where: { email },
        data: {
            password: hashedPassword,
            salt: salt,
        }
    })

    return res.status(200).json(new ApiResponse(null, "Password changed successfully!"));

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
        secure: mode !== "development",
        httpOnly: true,
        sameSite: mode === "development" ? "lax" : "none"
    });
    res.status(200).json(new ApiResponse(null, "user logged out successfully!"));
})


const getOauthWindow = asyncHandler(async (req: any, res: Response) => {
    if (!GOOGLE_CLIENT_ID || !YOUR_REDIRECT_URI || !GOOGLE_CLIENT_SECRET)
        return res.status(500).json({ message: "could not load google client id" })

    const redirectUri = "https://accounts.google.com/o/oauth2/v2/auth";

    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: YOUR_REDIRECT_URI,
        response_type: "code",
        scope: "email profile",
        access_type: "offline",
        prompt: "consent",
    });
    res.json(new ApiResponse({ url: `${redirectUri}?${params.toString()}` }, "Oauth consent window url generated successfully"));
})

const Oauth = asyncHandler(async (req: any, res: Response) => {
    {
        const { code, role } = req.query;

        try {

            console.log("code:", code, "\n");
            console.log("role:", role, "\n");
            const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: YOUR_REDIRECT_URI,
                grant_type: "authorization_code"
            });

            const { id_token } = tokenRes.data;

            const decoded = jwt.decode(id_token);
          

            const { email, picture } = decoded as { email: string, name: string, picture: string };

            let user = await client.user.findUnique({ where: { email } });
            if (!user) {
                if (role.trim().toLowerCase() !== "editor" && role.trim().toLowerCase() !== "youtuber") {
                    return res.status(400).json(new ApiResponse(null, "invalid role, choose a role before signing up"));
                }
                user = await client.user.create({
                    data: {
                        email,
                        name: email,
                        profileImgUrl: picture,
                        Oauth: true,
                        role: role.trim().toLowerCase() === "editor" ? "EDITOR" : "YOUTUBER"
                    }
                })


            }

            const jwtSecret = jwtSecretConfig
            if (!jwtSecret)
                return res.status(500).json(new ApiResponse(null, "internal server err"))

            const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, jwtSecret, { expiresIn: "2d" })

            if (!token)
                return res.status(500).json(new ApiResponse(null, "internal server err, couldn't sign token"))

            res.cookie("token", "Bearer " + token, {
                secure: mode !== "development",
                httpOnly: true,
                sameSite: mode === "development" ? "lax" : "none"
            })

            const { password: psw, salt: sl, ...filteredData } = user
            return res.status(200).json(new ApiResponse(filteredData, "user logged in/registered successfully"))

        } catch (error) {
            if (error instanceof AxiosError)
                console.error("Error during OAuth process:", error.response?.data || error.message);
            else console.error("Unexpected error during OAuth process:", error);
            return res.status(500).json(new ApiResponse(null, "internal server error during OAuth process"));

        }
    }
})


export {
    login,
    signup,
    resetPassword,
    checkAuth,
    logout,
    getOauthWindow,
    Oauth
}