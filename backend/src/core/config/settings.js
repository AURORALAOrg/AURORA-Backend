"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../../.env") });
const envVarsSchema = joi_1.default.object()
    .keys({
    SERVER_ENVIRONMENT: joi_1.default.string()
        .valid("PRODUCTION", "STAGING", "DEVELOPMENT", "TEST")
        .required(),
    SERVER_PORT: joi_1.default.number().default(8000),
    JWT_SECRET_KEY: joi_1.default.string().required().description("JWT Secret Key"),
    BCRYPT_SALT_ROUNDS: joi_1.default.number().required().description("Bcrypt Salt Rounds"),
    EMAIL_USERNAME: joi_1.default.string().required().description("Email username"),
    EMAIL_PASSWORD: joi_1.default.string().required().description("Email password"),
    EMAIL_FROM_ADDRESS: joi_1.default.string().required().description("Sender email address"),
    AURORA_WEB_APP_BASE_URL: joi_1.default.string().required().description("Base URL for Aurora Web App"),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const serverSettings = {
    serverEnvironment: envVars.SERVER_ENVIRONMENT,
    serverPort: envVars.SERVER_PORT,
    jwtSecretKey: envVars.JWT_SECRET_KEY,
    bcryptHashingSalt: envVars.BCRYPT_SALT_ROUNDS,
    auroraWebApp: {
        baseUrl: envVars.AURORA_WEB_APP_BASE_URL,
    },
    email: {
        username: envVars.EMAIL_USERNAME,
        password: envVars.EMAIL_PASSWORD,
        fromAddress: envVars.EMAIL_FROM_ADDRESS,
    },
};
exports.default = serverSettings;
