import { Request, Response } from "express";
import Project from "./project.model";

// CREATE a new project
export const createProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message,
        });
    }
};

// UPDATE a project by ID
export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: error.message,
        });
    }
};

// GET all projects
export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
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

// GET single project by ID
export const getProjectById = async (req: Request, res: Response) => {
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
        return res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error: error.message,
        });
    }
};

// DELETE project
export const deleteProject = async (req: Request, res: Response) => {
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
        return res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message,
        });
    }
};
