"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ApiError_1 = require("../core/api/ApiError");
const validation_1 = require("../utils/helpers/validation");
const validateRequest = (schema) => (req, res, next) => {
    var _a;
    const validSchema = (0, validation_1.pick)(schema, ["body", "params", "query"]);
    const object = (0, validation_1.pick)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);
    if (((_a = value.body) === null || _a === void 0 ? void 0 : _a.stockType) === "unlimited") {
        delete value.body.stockLimit;
    }
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");
        return next(new ApiError_1.BadRequestError(errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validateRequest;
