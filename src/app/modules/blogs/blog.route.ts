import express from "express";
import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "./blog.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";

const blogRoutes = express.Router();

blogRoutes.post(
    "/",
    checkAuth("ADMIN"),
    multerUpload.single("file"),
    createBlog
);
blogRoutes.get("/", getBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.patch(
    "/:id",
    checkAuth("ADMIN"),
    multerUpload.single("file"),
    updateBlog
);
blogRoutes.delete("/:id",
    checkAuth("ADMIN"),
    deleteBlog);

export default blogRoutes;
