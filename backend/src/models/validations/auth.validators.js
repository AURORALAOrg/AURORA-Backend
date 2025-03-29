"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWalletValidation = exports.resetPasswordValidation = exports.forgotPasswordValidation = exports.verifyEmailValidation = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
        password: joi_1.default.string().min(8).required().messages({
            "string.min": "Password must be at least 8 characters long",
            "any.required": "Password is required",
        }),
        firstName: joi_1.default.string().required().messages({
            "any.required": "First name is required",
        }),
        lastName: joi_1.default.string().required().messages({
            "any.required": "Last name is required",
        }),
        walletAddress: joi_1.default.string().required().messages({
            "any.required": "Wallet address is required",
        }),
    }),
};
exports.loginValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
        password: joi_1.default.string().required().messages({
            "any.required": "Password is required",
        }),
        deviceToken: joi_1.default.string().optional(),
        appVersion: joi_1.default.string().optional(),
    }),
};
exports.verifyEmailValidation = {
    query: joi_1.default.object().keys({
        token: joi_1.default.string().required().messages({
            "any.required": "Verification token is required",
        }),
    }),
};
exports.forgotPasswordValidation = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
    }),
};
exports.resetPasswordValidation = {
    body: joi_1.default.object().keys({
        token: joi_1.default.string().required().messages({
            "any.required": "Reset token is required",
        }),
        newPassword: joi_1.default.string().min(8).required().messages({
            "string.min": "Password must be at least 8 characters long",
            "any.required": "New password is required",
        }),
    }),
};
exports.verifyWalletValidation = {
    body: joi_1.default.object().keys({
        walletAddress: joi_1.default.string().required().messages({
            "any.required": "Wallet address is required",
        }),
        signature: joi_1.default.string().required().messages({
            "any.required": "Signature is required",
        }),
    }),
};
