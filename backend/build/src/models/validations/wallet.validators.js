"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletVerificationValidation = exports.walletChallengeValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.walletChallengeValidation = {
    body: joi_1.default.object().keys({
        walletAddress: joi_1.default.string().required().messages({
            'any.required': 'Wallet address is required',
        })
    }),
};
exports.walletVerificationValidation = {
    body: joi_1.default.object().keys({
        walletAddress: joi_1.default.string().required().messages({
            'any.required': 'Wallet address is required',
        }),
        signature: joi_1.default.string().required().messages({
            'any.required': 'Signature is required',
        })
    }),
};
