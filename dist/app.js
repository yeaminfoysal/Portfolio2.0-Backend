"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:4000", "https://ride-mate-frontend.vercel.app"],
    credentials: true
}));
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to RideMate Server"
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
exports.default = app;
