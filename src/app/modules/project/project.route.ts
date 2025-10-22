import express from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "./project.controller";

export const projectRoutes = express.Router();

projectRoutes.post("/", createProject);
projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.put("/:id", updateProject);
projectRoutes.delete("/:id", deleteProject);

