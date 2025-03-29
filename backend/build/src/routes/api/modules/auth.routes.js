"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../../controllers/auth.controller");
const auth_validators_1 = require("../../../models/validations/auth.validators");
const validator_1 = __importDefault(require("../../../middlewares/validator"));
const router = express_1.default.Router();
// Registration endpoint
router.post("/register", (0, validator_1.default)(auth_validators_1.registerValidation), auth_controller_1.register);
// Email verification endpoint
router.get("/verify-email", (0, validator_1.default)(auth_validators_1.verifyEmailValidation), auth_controller_1.verifyEmail);
// Login endpoint
router.post("/login", (0, validator_1.default)(auth_validators_1.loginValidation), auth_controller_1.login);
exports.default = router;
