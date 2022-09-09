"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = exports.authRouter = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
const notes_1 = __importDefault(require("./notes"));
exports.notesRouter = notes_1.default;
