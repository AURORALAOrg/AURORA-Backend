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
class UserService {
    static registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, hashedPassword, firstName, lastName, walletAddress } = userData;
            try {
                const result = yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const newUser = yield tx.user.create({
                        data: {
                            email,
                            password: hashedPassword,
                            firstName,
                            lastName,
                            isEmailVerified: false,
                        },
                    });
                    return newUser;
                }));
                return result;
            }
            catch (error) {
                console.error("Registration error:", error);
                throw new ApiError_1.InternalError("Failed to register user");
            }
        });
    }
    static activateEmail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.user.update({
                    where: { id: userId },
                    data: { isEmailVerified: true, status: client_1.Status.ACTIVE },
                });
            }
            catch (error) {
                throw new ApiError_1.InternalError("Failed to verify email");
            }
        });
    }
    static readUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: { email },
            });
        });
    }
    static readUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: { id },
            });
        });
    }
}
exports.default = UserService;
