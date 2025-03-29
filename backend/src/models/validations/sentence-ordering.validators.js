"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSentenceOrderingValidation = exports.createSentenceOrderingValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSentenceOrderingValidation = {
    body: joi_1.default.object({
        content: joi_1.default.object({
            sentence: joi_1.default.string().required(),
            words: joi_1.default.array().items(joi_1.default.string()).min(2).required(),
            explanation: joi_1.default.string().required()
        }).required(),
        metadata: joi_1.default.object({
            englishLevel: joi_1.default.string().required(),
            difficulty: joi_1.default.string().required(),
            category: joi_1.default.string().required(),
            subCategory: joi_1.default.string().required(),
            tags: joi_1.default.array().items(joi_1.default.string()).required(),
            type: joi_1.default.string().valid('drag-and-drop-sentence-builder').required()
        }).required(),
        gameMetadata: joi_1.default.object({
            pointsValue: joi_1.default.number().required(),
            timeLimit: joi_1.default.number().required(),
            difficultyMultiplier: joi_1.default.number().required()
        }).required()
    })
};
exports.updateSentenceOrderingValidation = {
    body: joi_1.default.object({
        content: joi_1.default.object({
            sentence: joi_1.default.string(),
            words: joi_1.default.array().items(joi_1.default.string()).min(2),
            explanation: joi_1.default.string()
        }),
        metadata: joi_1.default.object({
            englishLevel: joi_1.default.string(),
            difficulty: joi_1.default.string(),
            category: joi_1.default.string(),
            subCategory: joi_1.default.string(),
            tags: joi_1.default.array().items(joi_1.default.string()),
            type: joi_1.default.string().valid('drag-and-drop-sentence-builder')
        }),
        gameMetadata: joi_1.default.object({
            pointsValue: joi_1.default.number(),
            timeLimit: joi_1.default.number(),
            difficultyMultiplier: joi_1.default.number()
        })
    })
};
