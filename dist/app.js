"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const project_route_1 = require("./app/modules/project/project.route");
const blog_route_1 = __importDefault(require("./app/modules/blogs/blog.route"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const auth_route_1 = require("./app/modules/auth/auth.route");
require("./app/config/passport");
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
// ✅ CORS সবার আগে
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://yeamin-foysal.vercel.app",
        "https://yeamin-foysal.web.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ✅ Trust proxy (Vercel এর জন্য দরকার)
app.set("trust proxy", 1);
// ✅ Body parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ✅ Session configuration
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // production এ true
        httpOnly: true,
        sameSite: "lax", // cross-origin এর জন্য
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        domain: process.env.NODE_ENV === "production" ? "yeamin-foysal.vercel.app" : "localhost"
    }
}));
// ✅ Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use("/api/projects", project_route_1.projectRoutes);
app.use("/api/blogs", blog_route_1.default);
app.use("/api/auth", auth_route_1.authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Yeamin Foysal's Portfolio Server"
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
