"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => (req, res, next, ...rest) => Promise.resolve(fn(req, res, next, ...rest)).catch(next);
exports.default = asyncHandler;
