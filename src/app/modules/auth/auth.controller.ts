import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { setCookie } from "../../utilies/setCookie";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import { createUserToken } from "../../utilies/createUserTokens";


const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        res.status(200).json({
            message: "User logged out successfull",
            success: true,
            data: null
        })
    } catch (error) {
        next(error)
    }
}

const googleCallbackController = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) {
        throw new AppError(404, "User Not Found")
    }

    const tokenInfo = createUserToken(user)

    setCookie(res, tokenInfo)

    res.redirect(`${process.env.FRONTEND_URL}`)
}


export const AuthController = { logout, googleCallbackController }