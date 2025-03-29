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
exports.isAuthorized = void 0;
const jwt_1 = __importDefault(require("../utils/security/jwt"));
const ApiError_1 = require("../core/api/ApiError");
const user_service_1 = __importDefault(require("../services/user.service"));
// Middleware to check if the user is authorized
const isAuthorized = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
            if (!token) {
                return next(new ApiError_1.UnauthorizedError("Unauthorized"));
            }
            const decoded = jwt_1.default.verify(token);
            const loggedInUser = yield user_service_1.default.readUserById(decoded.payload.id);
            if (!loggedInUser) {
                return next(new ApiError_1.UnauthorizedError("Unauthorized"));
            }
            res.locals.account = loggedInUser;
            next();
        }
        catch (err) {
            next(new ApiError_1.UnauthorizedError("Unauthorized"));
        }
    });
};
exports.isAuthorized = isAuthorized;
