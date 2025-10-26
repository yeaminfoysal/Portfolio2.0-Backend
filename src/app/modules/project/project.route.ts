import express from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";

export const projectRoutes = express.Router();

projectRoutes.post(
    "/",
    checkAuth("ADMIN"),
    multerUpload.array("files"),
    createProject
);
projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.patch(
    "/:id",
    checkAuth("ADMIN"),
    multerUpload.array("files"),
    updateProject
);
projectRoutes.delete(
    "/:id",
    checkAuth("ADMIN"),
    deleteProject
);

