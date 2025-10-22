import express from "express";
import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "./blog.controller";
import { multerUpload } from "../../config/multer.config";

const blogRoutes = express.Router();

blogRoutes.post(
    "/",
    multerUpload.single("file"),
    createBlog
);
blogRoutes.get("/", getBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.patch("/:id", updateBlog);
blogRoutes.delete("/:id", deleteBlog);

export default blogRoutes;
