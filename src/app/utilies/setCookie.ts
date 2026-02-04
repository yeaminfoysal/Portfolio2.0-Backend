import { Response } from "express"

interface AuthTokens {
    accessToken?: string,
    refreshToken?: string
}

export const setCookie = (res: Response, tokenInfo: AuthTokens) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // production check
        sameSite: "lax" as const,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, cookieOptions);
    }

    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days for refresh token
        });
    }
}