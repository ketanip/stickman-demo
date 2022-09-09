import { } from "../types";
import { Request, Response, NextFunction } from "express";
import { getMembers, updateMember } from "../services";
import { addMemberValidator, getMemberActivatorValidator } from "../validators";
import { db } from "../db";

const getNotesController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { error, value, warning } = getMemberActivatorValidator.validate(req.query, { stripUnknown: true });
        if (error) {
            res.render("user", { message: error.message });
            return;
        };

        const query: any = value;
        const sort = query.sort;
        const members = await getMembers(sort);
        res.render("admin", { members });

    } catch (error) {
        next(error);
    };

};

const submitNoteController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { error, value, warning } = addMemberValidator.validate(req.body, { stripUnknown: true });
        if (error) {
            res.render("user", { message: error.message });
            return;
        };

        const { member_id } = value;
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        };

        const updated_member = await updateMember({ id: member_id }, { visible: true, username: user.user_email });
        const members = await db.member.findMany({ where: { visible: false } });
        res.render("user", { message: "Member set successfully.", members });

    } catch (error) {
        next(error);
    };

};

const getSubmitNoteController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        };

        const members = await db.member.findMany({ where: { visible: false } });
        res.render("user", { members });

    } catch (error) {
        next(error);
    };

};

export {
    getNotesController,
    submitNoteController,
    getSubmitNoteController
};