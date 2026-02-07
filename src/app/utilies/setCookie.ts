import { Response } from "express"

interface AuthTokens {
    accessToken?: string,
    refreshToken?: string
}

export const setCookie = (res: Response, tokenInfo: AuthTokens) => {
    const baseOptions = {
        // httpOnly: true,
        // secure: true,
        sameSite: "none" as const,
        domain: process.env.NODE_ENV === "production" ? "yeamin-foysal.vercel.app" : "localhost"
    };

    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            ...baseOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            ...baseOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    }
};
