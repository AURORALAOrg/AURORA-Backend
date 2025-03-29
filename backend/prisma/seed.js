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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash("password123!", 10);
        const user = yield prisma.user.create({
            data: {
                email: "customer@aurora.com",
                password: hashedPassword,
                firstName: "Aurora",
                lastName: "Admin",
                isEmailVerified: true,
                status: "ACTIVE",
            },
        });
        // Create a wallet for the user separately
        const wallet = yield prisma.wallet.create({
            data: {
                userId: user.id,
                walletAddress: "0x1234567890123456789012345678901234567890",
                isVerified: true,
                status: "ACTIVE",
            },
        });
        console.log({
            user: {
                id: user.id,
                email: user.email,
            },
            wallet: {
                id: wallet.id,
                walletAddress: wallet.walletAddress,
            },
        });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
