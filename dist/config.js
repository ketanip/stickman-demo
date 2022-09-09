"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    SESSION_SECRET: String(process.env.SESSION_SECRET) || "SESSION_SECRET",
    SALT_ROUNDS: 11,
    PORT: process.env.PORT || 3001,
};
exports.default = config;
