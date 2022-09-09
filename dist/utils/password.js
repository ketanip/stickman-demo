"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const config_1 = __importDefault(require("../config"));
const hashPassword = (raw_password) => {
    return (0, bcrypt_1.hashSync)(raw_password, config_1.default.SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const verifyPassword = (raw_password, encrypted_password) => {
    return (0, bcrypt_1.compareSync)(raw_password, encrypted_password);
};
exports.verifyPassword = verifyPassword;
