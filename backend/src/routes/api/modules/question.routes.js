"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../../../middlewares/validator"));
const question_controller_1 = require("../../../controllers/question.controller");
const question_validators_1 = require("../../../models/validations/question.validators");
const router = express_1.default.Router();
// Protected routes (require authentication)
// router.use(isAuthorized());
// Question routes
router.post("/", (0, validator_1.default)(question_validators_1.createQuestionValidation), question_controller_1.createQuestion);
router.get("/", question_controller_1.getQuestions);
router.get("/:id", question_controller_1.getQuestionById);
router.put("/:id", (0, validator_1.default)(question_validators_1.updateQuestionValidation), question_controller_1.updateQuestion);
router.delete("/:id", question_controller_1.deleteQuestion);
exports.default = router;
