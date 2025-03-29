"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../../middlewares/authentication");
const validator_1 = __importDefault(require("../../../middlewares/validator"));
const sentence_ordering_controller_1 = require("../../../controllers/sentence-ordering.controller");
const sentence_ordering_validators_1 = require("../../../models/validations/sentence-ordering.validators");
const router = express_1.default.Router();
// Protected routes (require authentication)
router.use((0, authentication_1.isAuthorized)());
// Sentence ordering exercise routes
router.post("/", (0, validator_1.default)(sentence_ordering_validators_1.createSentenceOrderingValidation), sentence_ordering_controller_1.createExercise);
router.get("/", sentence_ordering_controller_1.getExercises);
router.get("/:id", sentence_ordering_controller_1.getExerciseById);
router.put("/:id", (0, validator_1.default)(sentence_ordering_validators_1.updateSentenceOrderingValidation), sentence_ordering_controller_1.updateExercise);
router.delete("/:id", sentence_ordering_controller_1.deleteExercise);
exports.default = router;
