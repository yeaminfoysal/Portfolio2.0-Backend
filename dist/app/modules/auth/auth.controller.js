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
const passport_1 = __importDefault(require("passport"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createUserTokens_1 = require("../../utils/createUserTokens");
const setCookie_1 = require("../../utils/setCookie");
const driver_model_1 = require("../driver/driver.model");
const auth_services_1 = require("./auth.services");
const credentialsLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(new AppError_1.default(401, err));
            }
            if (!user) {
                return next(new AppError_1.default(404, info.message));
            }
            let driverId;
            if (user.role == "DRIVER") {
                const driver = yield driver_model_1.Driver.findOne({ user: user._id });
                driverId = driver === null || driver === void 0 ? void 0 : driver._id.toString();
            }
            const userTokens = (0, createUserTokens_1.createUserToken)(user, driverId);
            const userObj = user.toObject();
            delete userObj.password;
            (0, setCookie_1.setCookie)(res, userTokens);
            res.status(200).json({
                message: "User Logged In Successfully",
                success: true,
                data: {
                    accessToken: userTokens.accessToken,
                    refreshToken: userTokens.refreshToken,
                    user: userObj
                }
            });
        }))(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
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
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const decodedToken = req.user;
        if (!decodedToken) {
            throw new AppError_1.default(400, "Invalid decoded token");
        }
        yield auth_services_1.authServices.changePassword(oldPassword, newPassword, decodedToken);
        res.status(200).json({
            message: "Password changed successfull",
            success: true,
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
const googleCallbackController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    // /booking => booking , => "/" => ""
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const tokenInfo = (0, createUserTokens_1.createUserToken)(user);
    (0, setCookie_1.setCookie)(res, tokenInfo);
    res.redirect(`${process.env.FRONTEND_URL}/`);
});
exports.AuthController = { credentialsLogin, changePassword, logout, googleCallbackController };
