"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/logout", auth_controller_1.AuthController.logout);
exports.authRoutes.get("/google", (req, res, next) => {
    passport_1.default.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});
exports.authRoutes.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/not-permited` }), auth_controller_1.AuthController.googleCallbackController);
