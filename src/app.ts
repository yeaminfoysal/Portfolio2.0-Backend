import express, { Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import { projectRoutes } from "./app/modules/project/project.route";
import blogRoutes from "./app/modules/blogs/blog.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { authRoutes } from "./app/modules/auth/auth.route";
import "./app/config/passport";
import passport from "passport";

const app = express();

// ✅ CORS সবার আগে
app.use(cors({
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session configuration
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // production এ true
        httpOnly: true,
         sameSite: "lax" as const, // cross-origin এর জন্য
        maxAge: 24 * 60 * 60 * 1000 ,// 1 day
        domain: process.env.NODE_ENV === "production" ? "yeamin-foysal.vercel.app" : "localhost"
    }
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Yeamin Foysal's Portfolio Server"
    })
})

app.use(globalErrorHandler)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
});

export default app;