"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("./core/config/morgan"));
const ApiError_1 = require("./core/api/ApiError");
// securing api packages
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
// Load Environment
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// cookie parser
app.use((0, cookie_parser_1.default)());
// import routes files
const index_1 = __importDefault(require("./routes/api/index"));
const index_2 = __importDefault(require("./routes/web/index"));
const settings_1 = __importDefault(require("./core/config/settings"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
if (settings_1.default.serverEnvironment !== "TEST") {
    app.use(morgan_1.default.successHandler);
    app.use(morgan_1.default.errorHandler);
}
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// api request rate limiting default : 100 requests in 10minutes
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 20000,
});
app.use(limiter);
// Prevent http param pollution
app.use((0, hpp_1.default)());
// initialize routers
app.use("/api/v1", index_1.default);
app.use("/", index_2.default);
app.get("/error", (req, res) => {
    throw new Error("DOn't play games");
});
// Handle 404 Requests
app.use("*", (req, res, next) => next(new ApiError_1.NotFoundError()));
// error handler
app.use(errorHandler_1.default);
exports.default = app;
