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
exports.getSubmitNoteController = exports.submitNoteController = exports.getNotesController = void 0;
const services_1 = require("../services");
const validators_1 = require("../validators");
const db_1 = require("../db");
const getNotesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value, warning } = validators_1.getMemberActivatorValidator.validate(req.query, { stripUnknown: true });
        if (error) {
            res.render("user", { message: error.message });
            return;
        }
        ;
        const query = value;
        const sort = query.sort;
        const members = yield (0, services_1.getMembers)(sort);
        res.render("admin", { members });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.getNotesController = getNotesController;
const submitNoteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value, warning } = validators_1.addMemberValidator.validate(req.body, { stripUnknown: true });
        if (error) {
            res.render("user", { message: error.message });
            return;
        }
        ;
        const { member_id } = value;
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        }
        ;
        const updated_member = yield (0, services_1.updateMember)({ id: member_id }, { visible: true, username: user.user_email });
        const members = yield db_1.db.member.findMany({ where: { visible: false } });
        res.render("user", { message: "Member set successfully.", members });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.submitNoteController = submitNoteController;
const getSubmitNoteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        }
        ;
        const members = yield db_1.db.member.findMany({ where: { visible: false } });
        res.render("user", { members });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.getSubmitNoteController = getSubmitNoteController;
