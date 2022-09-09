import { db } from "../db";
import { getMembers, updateMember } from "../services";
import { Request, Response, NextFunction } from "express";
import { addMemberValidator, getMembersValidator } from "../validators";

const getMembersController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Validating input data.
        const { error, value, warning } = getMembersValidator.validate(req.query, { stripUnknown: true });
        if (error) {
            res.render("user", { message: error.message });
            return;
        };

        // Getting query value.
        const query: any = value;
        const sort = query.sort;

        // Getting members.
        const members = await getMembers({ visible: true }, sort);

        // Rendering page.
        res.render("admin", { members });

    } catch (error) {
        next(error);
    };

};

const submitMemberController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Validating input data.
        const { error, value, warning } = addMemberValidator.validate(req.body, { stripUnknown: true });
        if (error) {
            res.render("user", { message: error.message });
            return;
        };

        // Getting body value.
        const { member_id } = value;
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        };

        // Updating members.
        await updateMember({ id: member_id }, { visible: true, user_email: user.user_email });

        // Getting members.
        const members = await getMembers({ visible: false }, "desc");

        // Rendering pages.
        res.render("user", { message: "Member set successfully.", members });

    } catch (error) {
        next(error);
    };

};

const createMemberController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Getting user.
        const user = req.session.user;
        if (!user) {
            res.redirect("/auth/sign-in");
            return;
        };

        // Getting members.
        const members = await getMembers({ visible: false }, "desc");

        // Rendering pages.
        res.render("user", { members });

    } catch (error) {
        next(error);
    };

};

export {
    getMembersController,
    submitMemberController,
    createMemberController
};