"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webRoutes = express_1.default.Router();
webRoutes.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h1>WELCOME TO AURORA BACKEND<h1>`);
    setTimeout(() => {
        res.end();
    }, 1000);
});
exports.default = webRoutes;
