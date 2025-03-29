"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const winston_1 = __importDefault(require("winston"));
const ApiError_1 = require("../core/api/ApiError");
const settings_1 = __importDefault(require("../core/config/settings"));
const TESTING = settings_1.default.serverEnvironment === "TEST";
const files = new winston_1.default.transports.File({ filename: "logs/error.log" });
winston_1.default.add(files);
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    // Log to console for dev
    !TESTING && console.log(err.stack);
    console.log(err instanceof ApiError_1.ApiError, "instance");
    if (err instanceof ApiError_1.ApiError == true) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        // Mongoose bad ObjectId
        if (err.name === "CastError") {
            ApiError_1.ApiError.handle(new ApiError_1.NotFoundError("resource not found"), res);
        }
        // Mongoose duplicate key
        if (err.code === 11000) {
            // get the dup key field out of the err message
            let field = err.message.split("index:")[1];
            // now we have `field_1 dup key`
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_")); // returns field
            field = field.trim();
            const message = `${field} already exists`;
            ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(message), res);
        }
        // Mongoose validation error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors)
                .map((val) => val.message)
                .join(", ");
            ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(message), res);
        }
        if (error.message === "Route Not found") {
            ApiError_1.ApiError.handle(new ApiError_1.NotFoundError("requested resource not found"), res);
        }
        winston_1.default.error(err.stack);
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
};
exports.default = errorHandler;
