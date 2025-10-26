import { NextFunction, Request, Response } from "express";
import { Blog } from "./blog.model";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const parsedData = JSON.parse(req.body.data);
        const payload = {
            ...parsedData,
            thumbnail: req.file?.path
        }
        const blog = await Blog.create(payload);
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog,
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: "Blog creation failed", error: error.message });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch blogs", error: error.message });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to increment views", error: error.message });
    }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.data)
        const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;

        let updatedData = parsedData;
        console.log(parsedData)

        if (req.file && (req.file as Express.Multer.File)) {
            updatedData = {
                ...parsedData,
                thumbnail: req.file?.path
            };
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error: any) {
        console.error("Update error:", error);
        next(error);
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to delete blog", error: error.message });
    }
};
