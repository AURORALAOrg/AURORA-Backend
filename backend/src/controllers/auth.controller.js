"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.verifyEmail = exports.register = void 0;
const { ethers } = require("ethers");
const async_1 = __importDefault(require("../middlewares/async"));
const ApiResponse_1 = require("../core/api/ApiResponse");
const ApiError_1 = require("../core/api/ApiError");
const user_service_1 = __importDefault(require("../services/user.service"));
const jwt_1 = __importDefault(require("../utils/security/jwt"));
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
const settings_1 = __importDefault(require("../core/config/settings"));
const emailNotifier_1 = __importDefault(require("../utils/service/emailNotifier"));
const bcrypt_1 = __importDefault(require("../utils/security/bcrypt"));
exports.register = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, walletAddress } = req.body;
    const existingUser = yield user_service_1.default.readUserByEmail(email);
    if (existingUser) {
        throw new ApiError_1.BadRequestError("Email already registered");
    }
    // Validate wallet address
    if (!ethers.isAddress(walletAddress)) {
        throw new ApiError_1.BadRequestError("Invalid wallet address");
    }
    // Check if wallet address is already in use
    const existingWallet = yield wallet_service_1.default.readWalletByWalletAddress(walletAddress);
    if (existingWallet) {
        throw new ApiError_1.BadRequestError("Wallet address already registered");
    }
    // Hash password
    const hashedPassword = yield bcrypt_1.default.hashPassword(password);
    const result = yield user_service_1.default.registerUser({
        email,
        hashedPassword,
        firstName,
        lastName,
        walletAddress,
    });
    yield wallet_service_1.default.createWallet(result.id, walletAddress);
    const verificationToken = jwt_1.default.issue({ userId: result.id }, "1d");
    // Send verification email
    const verificationLink = `${settings_1.default.auroraWebApp.baseUrl}/verify-email?token=${verificationToken}`;
    emailNotifier_1.default.sendAccountActivationEmail(email, verificationLink);
    const userResponse = Object.assign({}, result);
    delete userResponse.password;
    return new ApiResponse_1.SuccessResponse("Registration successful. Please verify your email.", userResponse).send(res);
}));
exports.verifyEmail = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            throw new ApiError_1.BadRequestError("Verification token is required");
        }
        const decoded = jwt_1.default.verify(token);
        const userId = decoded.payload.userId;
        // Update user verification status
        const updatedUser = yield user_service_1.default.activateEmail(userId);
        if (!updatedUser) {
            throw new ApiError_1.BadRequestError("User not found");
        }
        return new ApiResponse_1.SuccessResponse("Email verified successfully", {}).send(res);
    }
    catch (err) {
        console.log(err);
        throw new ApiError_1.BadRequestError("Invalid token");
    }
}));
exports.login = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_service_1.default.readUserByEmail(email);
    if (!user) {
        throw new ApiError_1.BadRequestError("Invalid credentials");
    }
    if (!user.isEmailVerified) {
        throw new ApiError_1.BadRequestError("Email not verified. Please verify your email first.");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_1.BadRequestError("Invalid credentials");
    }
    const authenticationToken = jwt_1.default.issue({ id: user.id }, "1d");
    const userResponse = Object.assign({}, user);
    delete userResponse.password;
    return new ApiResponse_1.SuccessResponse("Login successful", {
        userResponse,
        authenticationToken,
    }).send(res);
}));
