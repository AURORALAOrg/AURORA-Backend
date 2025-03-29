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
exports.getAuthenticatedUser = void 0;
const ApiResponse_1 = require("../core/api/ApiResponse");
const async_1 = __importDefault(require("../middlewares/async"));
const user_service_1 = __importDefault(require("../services/user.service"));
exports.getAuthenticatedUser = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.account;
    if (!user || !user.id) {
        return new ApiResponse_1.SuccessResponse("User not found", null).send(res);
    }
    const loggedInUser = yield user_service_1.default.readUserById(user.id);
    // Remove password from response
    const userResponse = Object.assign({}, loggedInUser);
    delete userResponse.password;
    return new ApiResponse_1.SuccessResponse("User profile retrieved successfully", userResponse).send(res);
}));
