"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const passport_1 = __importDefault(require("passport"));
require("./app/config/passport");
const express_session_1 = __importDefault(require("express-session"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const driver_route_1 = require("./app/modules/driver/driver.route");
const ride_route_1 = require("./app/modules/ride/ride.route");
const payment_route_1 = require("./app/modules/payment/payment.route");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://ride-mate-frontend.vercel.app"],
    credentials: true
}));
app.use("/api/v1/user", user_route_1.UserRoutes);
app.use("/api/v1/auth", auth_route_1.authRoutes);
app.use("/api/v1/driver", driver_route_1.DriverRoute);
app.use("/api/v1/ride", ride_route_1.RideRoute);
app.use("/api/v1/payment", payment_route_1.PaymentRoute);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to RideMate Server"
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
exports.default = app;
