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
exports.deleteQuestion = exports.updateQuestion = exports.getQuestionById = exports.getQuestions = exports.createQuestion = void 0;
const async_1 = __importDefault(require("../middlewares/async"));
const ApiResponse_1 = require("../core/api/ApiResponse");
const ApiError_1 = require("../core/api/ApiError");
const question_service_1 = __importDefault(require("../services/question.service"));
exports.createQuestion = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = '67d918fb-f118-8006-a070-6f441b724db0'; // res.locals.account.id;
    const question = yield question_service_1.default.createQuestion(Object.assign(Object.assign({}, req.body), { createdBy: userId }));
    return new ApiResponse_1.SuccessResponse('Question created successfully', question).send(res);
}));
exports.getQuestions = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.query;
    const questions = yield question_service_1.default.getQuestions();
    console.log(questions);
    return new ApiResponse_1.SuccessResponse('Questions retrieved successfully', questions).send(res);
}));
exports.getQuestionById = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield question_service_1.default.getQuestionById(req.params.id);
    if (!question) {
        throw new ApiError_1.BadRequestError('Question not found');
    }
    return new ApiResponse_1.SuccessResponse('Question retrieved successfully', question).send(res);
}));
exports.updateQuestion = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield question_service_1.default.updateQuestion(Object.assign({ id: req.params.id }, req.body));
    return new ApiResponse_1.SuccessResponse('Question updated successfully', question).send(res);
}));
exports.deleteQuestion = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield question_service_1.default.deleteQuestion(req.params.id);
    return new ApiResponse_1.SuccessResponse('Question deleted successfully', null).send(res);
}));
