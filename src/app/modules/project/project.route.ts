import express from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "./project.controller";
import { multerUpload, uploadProjectImages } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";

export const projectRoutes = express.Router();

projectRoutes.post(
    "/",
    checkAuth("ADMIN"),
    uploadProjectImages,
    createProject
);

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.patch(
    "/:id",
    checkAuth("ADMIN"),
    uploadProjectImages,
    updateProject
);
projectRoutes.delete(
    "/:id",
    checkAuth("ADMIN"),
    deleteProject
);

