import { NextFunction, Request, Response } from "express";
import Project from "./project.model";
import { IProject } from "./project.interface";
import { normalizeTech } from "../../helpers/normalizeTech";

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = JSON.parse(req.body.data);

        const tech = parsedData.technologies || {};
        const formattedTechnologies = {
            frontend: tech.frontend?.[0]?.split(",").map((t: string) => t.trim()) || [],
            backend: tech.backend?.[0]?.split(",").map((t: string) => t.trim()) || [],
            database: tech.database?.[0]?.split(",").map((t: string) => t.trim()) || [],
            tools: tech.tools?.[0]?.split(",").map((t: string) => t.trim()) || [],
        };

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const payload: IProject = {
            ...parsedData,
            technologies: formattedTechnologies,
            thumbnail: files.thumbnail?.[0]?.path || null,
            fullImage: files.fullImage?.[0]?.path || null
        };

        const project = await Project.create(payload);

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });
    } catch (error: any) {
        console.error("Create Project error:", error);
        next(error);
    }
};


export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;

        const tech = parsedData.technologies || {};

        const updatedData: any = {
            ...parsedData,
            technologies: {
                frontend: normalizeTech(tech.frontend),
                backend: normalizeTech(tech.backend),
                database: normalizeTech(tech.database),
                tools: normalizeTech(tech.tools),
            },
        };

        // Handle uploaded files
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if (files) {
            if (files.thumbnail && files.thumbnail[0]) updatedData.thumbnail = files.thumbnail[0].path;
            if (files.fullImage && files.fullImage[0]) updatedData.fullImage = files.fullImage[0].path;
        }

        const project = await Project.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    } catch (error) {
        console.error("Update error:", error);
        next(error);
    }
};



export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: 1 });
        return res.status(200).json({
            success: true,
            message: "Projects retrived successfull",
            count: projects.length,
            data: projects,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message,
        });
    }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error: any) {
        next(error);
    }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error: any) {
        next(error);
    }
};
