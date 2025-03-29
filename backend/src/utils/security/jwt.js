"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../../core/config/settings"));
class Jwt {
    static issue(payload, expires) {
        return jsonwebtoken_1.default.sign({ payload }, settings_1.default.jwtSecretKey, {
            expiresIn: expires,
        });
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, settings_1.default.jwtSecretKey);
    }
}
exports.default = Jwt;
