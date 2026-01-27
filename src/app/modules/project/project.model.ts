import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const ProjectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        fullImage: {
            type: String,
            required: true,
        },
        technologies: {
            frontend: [String],
            backend: [String],
            database: [String],
            tools: [String],
        },
        repositories: {
            client: { type: String },
            server: { type: String },
        },
        preview: {
            type: String,
            required: true,
        },
        overview: {
            type: String,
        },
        features: {
            type: [String],
            required: true,
        },
        challenges: [String],
        plans: [String],
        status: {
            type: String,
            enum: ["Ongoing", "Completed"],
            default: "Ongoing",
        },
        category: {
            type: String,
            enum: ["Full-stack", "Frontend", "Backend"],
            default: "Full-stack",
        },
        isFeatured: { type: Boolean, default: false },
        position: { type: Number, unique: true, sparse: true },
    },
    {
        timestamps: true,
    }
);

const Project = model<IProject>("Project", ProjectSchema);

export default Project;
