"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const setCookie_1 = require("../../utilies/setCookie");
const createUserTokens_1 = require("../../utilies/createUserTokens");
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({
            message: "User logged out successfull",
            success: true,
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
const googleCallbackController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const tokenInfo = (0, createUserTokens_1.createUserToken)(user);
    (0, setCookie_1.setCookie)(res, tokenInfo);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});
exports.AuthController = { logout, googleCallbackController };
