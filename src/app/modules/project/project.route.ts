import express from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "./project.controller";
import { multerUpload } from "../../config/multer.config";

export const projectRoutes = express.Router();

projectRoutes.post(
    "/",
    multerUpload.array("files"),
    createProject
);
projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.patch(
    "/:id",
    multerUpload.array("files"),
    updateProject
);
projectRoutes.delete("/:id", deleteProject);

