import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import passport from "passport";

export const authRoutes = Router();

authRoutes.post("/logout", AuthController.logout);

authRoutes.get("/google", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] }
  )(req, res, next);
});

authRoutes.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/not-permited` }), AuthController.googleCallbackController)