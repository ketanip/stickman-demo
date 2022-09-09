"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemberValidator = exports.getMemberActivatorValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const getMemberActivatorValidator = joi_1.default.object({
    sort: joi_1.default.string().allow("asc", "desc").default("asc"),
});
exports.getMemberActivatorValidator = getMemberActivatorValidator;
const addMemberValidator = joi_1.default.object({
    member_id: joi_1.default.number().required(),
});
exports.addMemberValidator = addMemberValidator;
