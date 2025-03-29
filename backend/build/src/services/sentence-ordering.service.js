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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ApiError_1 = require("../core/api/ApiError");
const prisma = new client_1.PrismaClient();
class SentenceOrderingService {
    static createExercise(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const exercise = yield tx.sentenceOrdering.create({
                        data: {
                            content: data.content,
                            metadata: data.metadata,
                            gameMetadata: data.gameMetadata,
                            createdBy: data.createdBy,
                            status: client_1.Status.ACTIVE,
                        },
                    });
                    return exercise;
                }));
            }
            catch (error) {
                console.error("Exercise creation error:", error);
                throw new ApiError_1.InternalError("Failed to create sentence ordering exercise");
            }
        });
    }
    static getExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.sentenceOrdering.findMany({
                    where: {
                        status: client_1.Status.ACTIVE,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
            }
            catch (error) {
                console.error("Error fetching exercises:", error);
                throw new ApiError_1.InternalError("Failed to fetch sentence ordering exercises");
            }
        });
    }
    static getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercise = yield prisma.sentenceOrdering.findFirst({
                    where: {
                        id,
                        status: client_1.Status.ACTIVE,
                    },
                });
                if (!exercise) {
                    throw new ApiError_1.BadRequestError("Sentence ordering exercise not found");
                }
                return exercise;
            }
            catch (error) {
                if (error instanceof ApiError_1.BadRequestError) {
                    throw error;
                }
                console.error("Error fetching exercise:", error);
                throw new ApiError_1.InternalError("Failed to fetch sentence ordering exercise");
            }
        });
    }
    static updateExercise(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = data, updateData = __rest(data, ["id"]);
            try {
                return yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const exercise = yield tx.sentenceOrdering.update({
                        where: { id },
                        data: Object.assign(Object.assign(Object.assign(Object.assign({}, (updateData.content && { content: updateData.content })), (updateData.metadata && { metadata: updateData.metadata })), (updateData.gameMetadata && { gameMetadata: updateData.gameMetadata })), (updateData.createdBy && { createdBy: updateData.createdBy })),
                    });
                    return exercise;
                }));
            }
            catch (error) {
                console.error("Exercise update error:", error);
                throw new ApiError_1.InternalError("Failed to update sentence ordering exercise");
            }
        });
    }
    static deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.sentenceOrdering.update({
                    where: { id },
                    data: { status: client_1.Status.INACTIVE },
                });
            }
            catch (error) {
                console.error("Exercise deletion error:", error);
                throw new ApiError_1.InternalError("Failed to delete sentence ordering exercise");
            }
        });
    }
}
exports.default = SentenceOrderingService;
