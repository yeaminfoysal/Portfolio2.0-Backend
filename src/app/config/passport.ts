/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

// var GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { User } from "../modules/user/user.model";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value;
                if (!email) {
                    return done(null, false, { mesaage: "No email found" })
                }

                let isUserExist = await User.findOne({ email })

                if (!isUserExist) {
                    return done(null, false, { mesaage: "Ypur are not permitted to login" })
                }
                if (isUserExist.role != "ADMIN") {
                    return done(null, false, { mesaage: "Ypur are not permitted to login" })
                }

                // if (!isUserExist) {
                //     isUserExist = await User.create({
                //         email,
                //         name: profile.displayName,
                //         picture: profile.photos?.[0].value,
                //         role: "USER"
                //     })
                // }
                return done(null, isUserExist)

            } catch (error) {
                console.log("Google Strategy Error", error);
                return done(error)
            }
        }
    )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})