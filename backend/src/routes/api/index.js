"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./modules/auth.routes"));
const account_routes_1 = __importDefault(require("./modules/account.routes"));
const wallet_routes_1 = __importDefault(require("./modules/wallet.routes"));
const question_routes_1 = __importDefault(require("./modules/question.routes"));
const sentence_ordering_routes_1 = __importDefault(require("./modules/sentence-ordering.routes"));
const apiRoutes = express_1.default.Router();
apiRoutes.use("/auth", auth_routes_1.default);
apiRoutes.use("/account", account_routes_1.default);
apiRoutes.use("/wallet", wallet_routes_1.default);
apiRoutes.use("/questions", question_routes_1.default);
apiRoutes.use("/sentence-ordering", sentence_ordering_routes_1.default);
exports.default = apiRoutes;
