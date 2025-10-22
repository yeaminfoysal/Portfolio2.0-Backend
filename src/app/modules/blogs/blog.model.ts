import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Anonymous",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Blog = model<IBlog>("Blog", blogSchema);
