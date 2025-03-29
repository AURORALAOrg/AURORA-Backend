"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../../../middlewares/authentication");
const account_controller_1 = require("../../../controllers/account.controller");
const router = express_1.default.Router();
router.get("/me", (0, authentication_1.isAuthorized)(), account_controller_1.getAuthenticatedUser);
exports.default = router;
