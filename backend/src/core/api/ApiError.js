"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NoDataError = exports.BadTokenError = exports.NoEntryError = exports.ForbiddenError = exports.NotFoundError = exports.BadRequestDataError = exports.BadRequestError = exports.InternalError = exports.UnauthorizedError = exports.ApiError = void 0;
const ApiResponse_1 = require("./ApiResponse");
const settings_1 = __importDefault(require("../config/settings"));
var ErrorType;
(function (ErrorType) {
    ErrorType["BAD_TOKEN"] = "BadTokenError";
    ErrorType["UNAUTHORIZED"] = "UnauthorizedError";
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["NO_ENTRY"] = "NoEntryError";
    ErrorType["NO_DATA"] = "NoDataError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
    ErrorType["BAD_REQUEST_DATA"] = "BadRequestDataError";
    ErrorType["FORBIDDEN"] = "ForbiddenError";
    ErrorType["CONFLICT"] = "Conflict";
})(ErrorType || (ErrorType = {}));
class ApiError extends Error {
    // eslint-disable-next-line
    constructor(type, message = "error", data) {
        super(type);
        this.type = type;
        this.message = message;
        this.data = data;
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.UNAUTHORIZED:
                return new ApiResponse_1.UnauthorizedErrorResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new ApiResponse_1.InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new ApiResponse_1.NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new ApiResponse_1.BadRequestResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST_DATA:
                return new ApiResponse_1.BadRequestDataResponse(err.message, err.data).send(res);
            case ErrorType.FORBIDDEN:
                return new ApiResponse_1.ForbiddenResponse(err.message).send(res);
            case ErrorType.CONFLICT:
                return new ApiResponse_1.ConflictResponse(err.message).send(res);
            default: {
                let message = err.message;
                if (settings_1.default.serverEnvironment === "PRODUCTION")
                    message = "Something went wrong.";
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    }
}
exports.ApiError = ApiError;
class UnauthorizedError extends ApiError {
    constructor(message = "Invalid Credentials") {
        super(ErrorType.UNAUTHORIZED, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InternalError extends ApiError {
    constructor(message = "Something went wrong") {
        super(ErrorType.INTERNAL, message);
    }
}
exports.InternalError = InternalError;
class BadRequestError extends ApiError {
    constructor(message = "Bad Request") {
        super(ErrorType.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
class BadRequestDataError extends ApiError {
    // eslint-disable-next-line
    constructor(message = "Bad Request", data) {
        super(ErrorType.BAD_REQUEST_DATA, message, data);
        this.data = data;
    }
}
exports.BadRequestDataError = BadRequestDataError;
class NotFoundError extends ApiError {
    constructor(message = "Not Found") {
        super(ErrorType.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends ApiError {
    constructor(message = "Permission Denied") {
        super(ErrorType.FORBIDDEN, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class NoEntryError extends ApiError {
    constructor(message = "Entry don't exists") {
        super(ErrorType.NO_ENTRY, message);
    }
}
exports.NoEntryError = NoEntryError;
class BadTokenError extends ApiError {
    constructor(message = "Token is not valid") {
        super(ErrorType.BAD_TOKEN, message);
    }
}
exports.BadTokenError = BadTokenError;
class NoDataError extends ApiError {
    constructor(message = "No data available") {
        super(ErrorType.NO_DATA, message);
    }
}
exports.NoDataError = NoDataError;
class ConflictError extends ApiError {
    constructor(message = "Conflict") {
        super(ErrorType.CONFLICT, message);
    }
}
exports.ConflictError = ConflictError;
