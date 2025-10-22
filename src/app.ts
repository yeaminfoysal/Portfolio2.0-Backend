import express, { Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import { projectRoutes } from "./app/modules/project/project.route";
import blogRoutes from "./app/modules/blogs/blog.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1)
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: ["http://localhost:4000", "https://ride-mate-frontend.vercel.app"],
        credentials: true
    }
));

app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);

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