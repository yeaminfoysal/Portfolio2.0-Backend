import express from "express";
import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "./blog.controller";

const blogRoutes = express.Router();

blogRoutes.post("/", createBlog);
blogRoutes.get("/", getBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.patch("/:id", updateBlog);
blogRoutes.delete("/:id", deleteBlog);

export default blogRoutes;
