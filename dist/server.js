"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`${process.env.DB_URL}`);
        console.log('✅ Connected to MongoDB databse ✅');
        server = app_1.default.listen(4000, () => {
            console.log(`✅  Server is listening to port 4000 ✅ `);
        });
    }
    catch (error) {
        console.log(error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
}))();
// "Unhandled rejection"
process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection detected.... Server shutting down....", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// "Uncought rejection"
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected.... Server shutting down....", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// "Uncought rejection"
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved.... Server shutting down....");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
