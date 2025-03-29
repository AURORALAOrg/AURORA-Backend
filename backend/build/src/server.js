"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const settings_1 = __importDefault(require("./core/config/settings"));
const db_1 = require("./db");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../../.env") });
const server = app_1.default;
const port = settings_1.default.serverPort || 8000;
// Test the database connection before starting the server
(0, db_1.connectDB)();
server.listen(port, () => {
    console.log(`🚀🚀🚀 Aurora's server is running at http://localhost:${port} 🚀🚀🚀`);
});
