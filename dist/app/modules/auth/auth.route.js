"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
const checkAuth_1 = require("../../middlewares/checkAuth");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/login", auth_controller_1.AuthController.credentialsLogin);
exports.authRoutes.post("/logout", auth_controller_1.AuthController.logout);
exports.authRoutes.patch("/change-password", (0, checkAuth_1.checkAuth)("USER", "DRIVER", "ADMIN"), auth_controller_1.AuthController.changePassword);
exports.authRoutes.get("/google", (req, res, next) => {
    const { role } = req.query;
    const redirect = req.query.redirect || "/";
    passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        state: JSON.stringify({ redirect, role }),
    })(req, res, next);
});
exports.authRoutes.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), auth_controller_1.AuthController.googleCallbackController);
