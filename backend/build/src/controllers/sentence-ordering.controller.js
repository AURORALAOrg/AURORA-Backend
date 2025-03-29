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
exports.deleteExercise = exports.updateExercise = exports.getExerciseById = exports.getExercises = exports.createExercise = void 0;
const async_1 = __importDefault(require("../middlewares/async"));
const ApiResponse_1 = require("../core/api/ApiResponse");
const ApiError_1 = require("../core/api/ApiError");
const sentence_ordering_service_1 = __importDefault(require("../services/sentence-ordering.service"));
exports.createExercise = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.account.id;
    const exercise = yield sentence_ordering_service_1.default.createExercise(Object.assign(Object.assign({}, req.body), { createdBy: userId }));
    return new ApiResponse_1.SuccessResponse('Exercise created successfully', exercise).send(res);
}));
exports.getExercises = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exercises = yield sentence_ordering_service_1.default.getExercises();
    return new ApiResponse_1.SuccessResponse('Exercises retrieved successfully', exercises).send(res);
}));
exports.getExerciseById = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exercise = yield sentence_ordering_service_1.default.getExerciseById(req.params.id);
    if (!exercise) {
        throw new ApiError_1.BadRequestError('Exercise not found');
    }
    return new ApiResponse_1.SuccessResponse('Exercise retrieved successfully', exercise).send(res);
}));
exports.updateExercise = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exercise = yield sentence_ordering_service_1.default.updateExercise(Object.assign({ id: req.params.id }, req.body));
    return new ApiResponse_1.SuccessResponse('Exercise updated successfully', exercise).send(res);
}));
exports.deleteExercise = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sentence_ordering_service_1.default.deleteExercise(req.params.id);
    return new ApiResponse_1.SuccessResponse('Exercise deleted successfully', null).send(res);
}));
