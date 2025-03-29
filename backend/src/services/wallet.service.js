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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ApiError_1 = require("../core/api/ApiError");
const prisma = new client_1.PrismaClient();
class WalletService {
    static createWallet(userId, walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const wallet = yield tx.wallet.create({
                    data: {
                        userId,
                        walletAddress,
                        isVerified: false,
                    },
                });
                return wallet;
            }));
        });
    }
    static readWalletByWalletAddress(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.wallet.findUnique({
                where: { walletAddress },
            });
        });
    }
    static storeWalletChallenge(walletAddress, message, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create or update wallet challenge
                yield prisma.walletVerificationChallenge.upsert({
                    where: { walletAddress },
                    update: {
                        message,
                        nonce,
                        createdAt: new Date(),
                        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry
                    },
                    create: {
                        walletAddress,
                        message,
                        nonce,
                        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry
                    },
                });
                return true;
            }
            catch (error) {
                console.error("Error storing wallet challenge:", error);
                throw new ApiError_1.InternalError("Failed to create wallet verification challenge");
            }
        });
    }
    static getWalletChallenge(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const challenge = yield prisma.walletVerificationChallenge.findUnique({
                where: {
                    walletAddress,
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });
            return challenge;
        });
    }
    static removeWalletChallenge(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.walletVerificationChallenge
                .delete({
                where: { walletAddress },
            })
                .catch(() => {
                return;
            });
            return true;
        });
    }
    static verifyWallet(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.wallet.update({
                    where: { walletAddress },
                    data: { isVerified: true, status: client_1.Status.ACTIVE },
                });
                return true;
            }
            catch (error) {
                console.error("Error verifying wallet:", error);
                throw new ApiError_1.InternalError("Failed to verify wallet");
            }
        });
    }
}
exports.default = WalletService;
