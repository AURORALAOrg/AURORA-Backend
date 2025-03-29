"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResponse = exports.CreatedResponse = exports.SuccessResponse = exports.FailureMsgResponse = exports.SuccessMsgResponse = exports.InternalErrorResponse = exports.BadRequestDataResponse = exports.BadRequestResponse = exports.ForbiddenResponse = exports.NotFoundResponse = exports.UnauthorizedErrorResponse = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(success, status, message) {
        this.success = success;
        this.status = status;
        this.message = message;
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === "undefined")
                delete clone[i];
        return clone;
    }
    send(res) {
        return this.prepare(res, this);
    }
    prepare(res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
}
class UnauthorizedErrorResponse extends ApiResponse {
    constructor(message = "Authentication Failure") {
        super(false, ResponseStatus.UNAUTHORIZED, message);
    }
}
exports.UnauthorizedErrorResponse = UnauthorizedErrorResponse;
class NotFoundResponse extends ApiResponse {
    constructor(message = "Not Found") {
        super(false, ResponseStatus.NOT_FOUND, message);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = "Forbidden") {
        super(false, ResponseStatus.FORBIDDEN, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = "Bad Parameters") {
        super(false, ResponseStatus.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class BadRequestDataResponse extends ApiResponse {
    constructor(message = "Bad Parameters", data) {
        super(false, ResponseStatus.BAD_REQUEST, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.BadRequestDataResponse = BadRequestDataResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = "Internal Error") {
        super(false, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class SuccessMsgResponse extends ApiResponse {
    constructor(message) {
        super(true, ResponseStatus.SUCCESS, message);
    }
}
exports.SuccessMsgResponse = SuccessMsgResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(false, ResponseStatus.SUCCESS, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
class SuccessResponse extends ApiResponse {
    constructor(message, data) {
        super(true, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
class CreatedResponse extends ApiResponse {
    constructor(message, data) {
        super(true, ResponseStatus.CREATED, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.CreatedResponse = CreatedResponse;
class ConflictResponse extends ApiResponse {
    constructor(message) {
        super(false, ResponseStatus.CONFLICT, message);
    }
}
exports.ConflictResponse = ConflictResponse;
