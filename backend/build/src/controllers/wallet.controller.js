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
exports.verifyWalletSignature = exports.generateWalletChallenge = void 0;
const ethers_1 = require("ethers");
const async_1 = __importDefault(require("../middlewares/async"));
const ApiResponse_1 = require("../core/api/ApiResponse");
const ApiError_1 = require("../core/api/ApiError");
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
exports.generateWalletChallenge = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletAddress } = req.body;
    // Validate wallet address format
    if (!ethers_1.ethers.isAddress(walletAddress)) {
        throw new ApiError_1.BadRequestError("Invalid wallet address format");
    }
    // Generate a random nonce
    const nonce = Math.floor(Math.random() * 1000000).toString();
    // Create the challenge message
    const message = `Verify ownership of wallet address ${walletAddress} for AURORA Platform. Nonce: ${nonce}`;
    // Store the challenge in the database
    yield wallet_service_1.default.storeWalletChallenge(walletAddress, message, nonce);
    return new ApiResponse_1.SuccessResponse("Challenge generated successfully", {
        message,
        walletAddress,
    }).send(res);
}));
exports.verifyWalletSignature = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletAddress, signature } = req.body;
    const userId = res.locals.account.id;
    // Get the wallet from the database
    const wallet = yield wallet_service_1.default.readWalletByWalletAddress(walletAddress);
    if (!wallet) {
        throw new ApiError_1.BadRequestError("Wallet address not found");
    }
    if (wallet.userId !== userId) {
        throw new ApiError_1.BadRequestError("Wallet address does not belong to authenticated user");
    }
    // Get the challenge from the database
    const challenge = yield wallet_service_1.default.getWalletChallenge(walletAddress);
    if (!challenge) {
        throw new ApiError_1.BadRequestError("No active challenge found for this wallet address");
    }
    try {
        // Verify signature
        const messageHash = ethers_1.ethers.hashMessage(challenge.message);
        const recoveredAddress = ethers_1.ethers.recoverAddress(messageHash, signature);
        // Check if the recovered address matches the claimed wallet address
        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            throw new ApiError_1.BadRequestError("Invalid signature");
        }
        // Mark the wallet as verified
        yield wallet_service_1.default.verifyWallet(walletAddress);
        // Remove the challenge after verification
        yield wallet_service_1.default.removeWalletChallenge(walletAddress);
        return new ApiResponse_1.SuccessResponse("Wallet verified successfully", {
            walletAddress,
            verified: true,
        }).send(res);
    }
    catch (error) {
        console.error("Wallet verification error:", error);
        throw new ApiError_1.BadRequestError("Failed to verify wallet signature");
    }
}));
