"use strict";
// src/routes/wallet.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("../../../controllers/wallet.controller");
const wallet_validators_1 = require("../../../models/validations/wallet.validators");
const validator_1 = __importDefault(require("../../../middlewares/validator"));
const authentication_1 = require("../../../middlewares/authentication");
const router = express_1.default.Router();
// Generate challenge for wallet verification
router.post("/challenge", (0, authentication_1.isAuthorized)(), (0, validator_1.default)(wallet_validators_1.walletChallengeValidation), wallet_controller_1.generateWalletChallenge);
// Verify wallet with signature
router.post("/verify", (0, authentication_1.isAuthorized)(), (0, validator_1.default)(wallet_validators_1.walletVerificationValidation), wallet_controller_1.verifyWalletSignature);
exports.default = router;
