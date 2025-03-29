"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const nodemailer = __importStar(require("nodemailer"));
const settings_1 = __importDefault(require("../../core/config/settings"));
class ZohoMailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: settings_1.default.email.username,
                pass: settings_1.default.email.password,
            },
        });
        this.fromAddress = settings_1.default.email.fromAddress;
        this.initializeTransport();
    }
    initializeTransport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.verify();
                console.log("✅ Connected to email server");
            }
            catch (error) {
                console.warn("❌ Unable to connect to email server:", error);
            }
        });
    }
    sendTextEmail(email, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: this.fromAddress,
                    to: email,
                    subject: subject,
                    text: text,
                };
                const info = yield this.transporter.sendMail(mailOptions);
                console.log(`📨 Text email sent to ${email}:, info.messageId`);
                return info;
            }
            catch (error) {
                console.error(`❌ Failed to send text email to ${email}:, error`);
                throw error;
            }
        });
    }
    sendHtmlEmail(email, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: this.fromAddress,
                    to: email,
                    subject: subject,
                    html: html,
                };
                const info = yield this.transporter.sendMail(mailOptions);
                console.log(`📧 HTML email sent to ${email}:, info.messageId`);
                return info;
            }
            catch (error) {
                console.error(`❌ Failed to send HTML email to ${email}:, error`);
                throw error;
            }
        });
    }
}
exports.default = ZohoMailer;
